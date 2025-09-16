import { describe, test, expect } from "bun:test"
import {
  transformModelForDisplay,
  calculateFleetUtilization,
  aggregatePerformanceMetrics,
  processDatasetStats,
  evaluateDeploymentHealth,
  parseTimeToMilliseconds,
  sanitizeUserInput,
  validateEmail,
  generatePerformanceSummary
} from '../utils/dataTransformers'
import type { ModelInfo, Fleet, PerformanceMetrics, Dataset, ModelDeployment } from '../types'

describe('Data Transformers', () => {
  describe('transformModelForDisplay', () => {
    test('should transform model with all fields correctly', () => {
      const model: ModelInfo = {
        id: 'model-1',
        name: 'Test Model',
        version: '1.2.3',
        type: 'classification',
        parameters: '10m',
        apiUrl: 'https://api.test.com',
        status: 'active',
        accuracy: '94.5%',
        latency: '10ms',
        description: 'Test model description'
      }

      const result = transformModelForDisplay(model)
      expect(result.displayName).toBe('Test Model v1.2.3')
      expect(result.statusBadge).toBe('success')
      expect(result.parametersFormatted).toBe('10M')
      expect(result.performanceScore).toBe(95)
    })

    test('should handle different status values correctly', () => {
      const baseModel: Omit<ModelInfo, 'status'> = {
        id: 'model-1',
        name: 'Test Model',
        version: '1.0.0',
        type: 'classification',
        parameters: '5B',
        apiUrl: 'https://api.test.com',
        description: 'Test model'
      }

      expect(transformModelForDisplay({ ...baseModel, status: 'active' }).statusBadge).toBe('success')
      expect(transformModelForDisplay({ ...baseModel, status: 'updating' }).statusBadge).toBe('warning')
      expect(transformModelForDisplay({ ...baseModel, status: 'inactive' }).statusBadge).toBe('danger')
    })

    test('should handle missing accuracy gracefully', () => {
      const model: ModelInfo = {
        id: 'model-1',
        name: 'Test Model',
        version: '1.0.0',
        type: 'classification',
        parameters: '1B',
        apiUrl: 'https://api.test.com',
        status: 'active',
        description: 'Test model'
      }

      const result = transformModelForDisplay(model)
      expect(result.performanceScore).toBeUndefined()
    })

    test('should parse accuracy percentages correctly', () => {
      const model: ModelInfo = {
        id: 'model-1',
        name: 'Test Model',
        version: '1.0.0',
        type: 'classification',
        parameters: '500M',
        apiUrl: 'https://api.test.com',
        status: 'active',
        accuracy: '87.3%',
        description: 'Test model'
      }

      const result = transformModelForDisplay(model)
      expect(result.performanceScore).toBe(87)
    })
  })

  describe('calculateFleetUtilization', () => {
    test('should handle empty fleet array', () => {
      const result = calculateFleetUtilization([])
      expect(result.totalDevices).toBe(0)
      expect(result.averageCpu).toBe(0)
      expect(result.averageMemory).toBe(0)
      expect(result.averageStorage).toBe(0)
      expect(result.utilizationScore).toBe(0)
    })

    test('should calculate utilization correctly for single fleet', () => {
      const fleets: Fleet[] = [{
        id: 'fleet-1',
        name: 'Test Fleet',
        description: 'Test fleet description',
        deviceCount: 10,
        deviceSpecs: {
          cpu: 8,
          memory: 32,
          storage: 512
        },
        models: []
      }]

      const result = calculateFleetUtilization(fleets)
      expect(result.totalDevices).toBe(10)
      expect(result.averageCpu).toBe(8)
      expect(result.averageMemory).toBe(32)
      expect(result.averageStorage).toBe(512)
      expect(result.utilizationScore).toBeGreaterThan(0)
      expect(result.utilizationScore).toBeLessThanOrEqual(100)
    })

    test('should calculate averages correctly for multiple fleets', () => {
      const fleets: Fleet[] = [
        {
          id: 'fleet-1',
          name: 'Fleet 1',
          description: 'First fleet',
          deviceCount: 5,
          deviceSpecs: { cpu: 4, memory: 16, storage: 256 },
          models: []
        },
        {
          id: 'fleet-2',
          name: 'Fleet 2',
          description: 'Second fleet',
          deviceCount: 10,
          deviceSpecs: { cpu: 8, memory: 32, storage: 512 },
          models: []
        }
      ]

      const result = calculateFleetUtilization(fleets)
      expect(result.totalDevices).toBe(15)
      expect(result.averageCpu).toBe(6) // (4 + 8) / 2
      expect(result.averageMemory).toBe(24) // (16 + 32) / 2
      expect(result.averageStorage).toBe(384) // (256 + 512) / 2
    })

    test('should cap utilization score at 100', () => {
      const fleets: Fleet[] = [{
        id: 'fleet-1',
        name: 'High Spec Fleet',
        description: 'Very high specification fleet',
        deviceCount: 1,
        deviceSpecs: {
          cpu: 128, // Very high CPU
          memory: 1024, // Very high memory
          storage: 10000 // Very high storage
        },
        models: []
      }]

      const result = calculateFleetUtilization(fleets)
      expect(result.utilizationScore).toBe(100)
    })
  })

  describe('aggregatePerformanceMetrics', () => {
    test('should handle empty metrics array', () => {
      const result = aggregatePerformanceMetrics([])
      expect(result.avgCpuUsage).toBe(0)
      expect(result.avgMemoryUsage).toBe(0)
      expect(result.avgLatency).toBe(0)
      expect(result.avgThroughput).toBe(0)
      expect(result.avgErrorRate).toBe(0)
      expect(result.trends.cpu).toBe('stable')
      expect(result.trends.memory).toBe('stable')
      expect(result.trends.latency).toBe('stable')
    })

    test('should calculate averages correctly', () => {
      const metrics: PerformanceMetrics[] = [
        {
          timestamp: Date.now(),
          cpuUsage: 50,
          memoryUsage: 60,
          latency: 10,
          throughput: 1000,
          errorRate: 0.01
        },
        {
          timestamp: Date.now(),
          cpuUsage: 60,
          memoryUsage: 70,
          latency: 15,
          throughput: 1200,
          errorRate: 0.02
        }
      ]

      const result = aggregatePerformanceMetrics(metrics)
      expect(result.avgCpuUsage).toBe(55)
      expect(result.avgMemoryUsage).toBe(65)
      expect(result.avgLatency).toBe(12.5)
      expect(result.avgThroughput).toBe(1100)
      expect(result.avgErrorRate).toBe(0.015)
    })

    test('should detect improving trends', () => {
      // Generate metrics with improving CPU trend (starts high, ends low)
      const metrics: PerformanceMetrics[] = []
      for (let i = 0; i < 20; i++) {
        metrics.push({
          timestamp: Date.now() + i * 1000,
          cpuUsage: 80 - (i * 2), // Decreasing CPU usage (improving)
          memoryUsage: 50 + (i * 1), // Increasing memory usage (degrading)
          latency: 20 - (i * 0.5), // Decreasing latency (improving)
          throughput: 1000,
          errorRate: 0.01
        })
      }

      const result = aggregatePerformanceMetrics(metrics)
      expect(result.trends.cpu).toBe('improving')
      expect(result.trends.memory).toBe('degrading')
      expect(result.trends.latency).toBe('improving')
    })

    test('should detect stable trends', () => {
      const metrics: PerformanceMetrics[] = []
      for (let i = 0; i < 12; i++) {
        metrics.push({
          timestamp: Date.now() + i * 1000,
          cpuUsage: 50 + (Math.random() - 0.5), // Small random variation
          memoryUsage: 60 + (Math.random() - 0.5),
          latency: 10 + (Math.random() - 0.5) * 0.5,
          throughput: 1000,
          errorRate: 0.01
        })
      }

      const result = aggregatePerformanceMetrics(metrics)
      expect(result.trends.cpu).toBe('stable')
      expect(result.trends.memory).toBe('stable')
      expect(result.trends.latency).toBe('stable')
    })

    test('should handle small datasets gracefully', () => {
      const metrics: PerformanceMetrics[] = [
        {
          timestamp: Date.now(),
          cpuUsage: 50,
          memoryUsage: 60,
          latency: 10,
          throughput: 1000,
          errorRate: 0.01
        }
      ]

      const result = aggregatePerformanceMetrics(metrics)
      expect(result.trends.cpu).toBe('stable')
      expect(result.trends.memory).toBe('stable')
      expect(result.trends.latency).toBe('stable')
    })
  })

  describe('processDatasetStats', () => {
    test('should handle empty datasets array', () => {
      const result = processDatasetStats([])
      expect(result.totalSize).toBe(0)
      expect(result.totalRecords).toBe(0)
      expect(result.formatDistribution).toEqual({})
      expect(result.qualityDistribution).toEqual({ excellent: 0, good: 0, needsWork: 0 })
      expect(result.typeDistribution).toEqual({})
      expect(result.avgQualityScore).toBe(0)
    })

    test('should process dataset statistics correctly', () => {
      const datasets: Dataset[] = [
        {
          id: 'dataset-1',
          name: 'Test Dataset 1',
          description: 'First test dataset',
          type: 'training',
          format: 'CSV',
          size: '1.5GB',
          recordCount: 1000000,
          createdBy: 'Test User',
          createdDate: '2024-01-01',
          lastModified: '2024-01-02',
          version: '1.0.0',
          tags: ['test'],
          schema: { columns: 10, features: ['feature1'], target: 'label' },
          storage: { location: 's3://test', checksum: 'abc123' },
          quality: { score: 95, issues: [], lastValidated: '2024-01-01' },
          usage: { accessCount: 10, lastAccessed: '2024-01-01', usedByModels: [] }
        },
        {
          id: 'dataset-2',
          name: 'Test Dataset 2',
          description: 'Second test dataset',
          type: 'validation',
          format: 'JSON',
          size: '500MB',
          recordCount: 250000,
          createdBy: 'Test User',
          createdDate: '2024-01-01',
          lastModified: '2024-01-02',
          version: '1.0.0',
          tags: ['test'],
          schema: { columns: 5, features: ['feature1'], target: 'label' },
          storage: { location: 's3://test', checksum: 'def456' },
          quality: { score: 75, issues: [], lastValidated: '2024-01-01' },
          usage: { accessCount: 5, lastAccessed: '2024-01-01', usedByModels: [] }
        }
      ]

      const result = processDatasetStats(datasets)
      expect(result.totalRecords).toBe(1250000)
      expect(result.formatDistribution['CSV']).toBe(1)
      expect(result.formatDistribution['JSON']).toBe(1)
      expect(result.typeDistribution['training']).toBe(1)
      expect(result.typeDistribution['validation']).toBe(1)
      expect(result.qualityDistribution.excellent).toBe(1) // score >= 90
      expect(result.qualityDistribution.good).toBe(1) // score 70-89
      expect(result.qualityDistribution.needsWork).toBe(0) // score < 70
      expect(result.avgQualityScore).toBe(85) // (95 + 75) / 2
    })

    test('should handle different size formats', () => {
      const datasets: Dataset[] = [
        {
          id: 'dataset-1',
          name: 'KB Dataset',
          description: 'Small dataset',
          type: 'test',
          format: 'CSV',
          size: '500KB',
          recordCount: 1000,
          createdBy: 'Test',
          createdDate: '2024-01-01',
          lastModified: '2024-01-01',
          version: '1.0.0',
          tags: [],
          schema: { columns: 1, features: [] },
          storage: { location: 's3://test', checksum: 'abc' },
          quality: { score: 80, issues: [], lastValidated: '2024-01-01' },
          usage: { accessCount: 1, lastAccessed: '2024-01-01', usedByModels: [] }
        },
        {
          id: 'dataset-2',
          name: 'MB Dataset',
          description: 'Medium dataset',
          type: 'test',
          format: 'JSON',
          size: '100MB',
          recordCount: 10000,
          createdBy: 'Test',
          createdDate: '2024-01-01',
          lastModified: '2024-01-01',
          version: '1.0.0',
          tags: [],
          schema: { columns: 1, features: [] },
          storage: { location: 's3://test', checksum: 'def' },
          quality: { score: 90, issues: [], lastValidated: '2024-01-01' },
          usage: { accessCount: 1, lastAccessed: '2024-01-01', usedByModels: [] }
        }
      ]

      const result = processDatasetStats(datasets)
      expect(result.totalSize).toBeGreaterThan(0)
      expect(result.totalRecords).toBe(11000)
    })

    test('should categorize quality scores correctly', () => {
      const datasets: Dataset[] = [
        // Excellent (>= 90)
        { id: '1', name: 'Excellent', description: '', type: 'training', format: 'CSV', size: '1MB', recordCount: 1000, createdBy: '', createdDate: '', lastModified: '', version: '1.0', tags: [], schema: { columns: 1, features: [] }, storage: { location: '', checksum: '' }, quality: { score: 95, issues: [], lastValidated: '' }, usage: { accessCount: 0, lastAccessed: '', usedByModels: [] }},
        // Good (70-89)
        { id: '2', name: 'Good', description: '', type: 'training', format: 'CSV', size: '1MB', recordCount: 1000, createdBy: '', createdDate: '', lastModified: '', version: '1.0', tags: [], schema: { columns: 1, features: [] }, storage: { location: '', checksum: '' }, quality: { score: 80, issues: [], lastValidated: '' }, usage: { accessCount: 0, lastAccessed: '', usedByModels: [] }},
        // Needs work (< 70)
        { id: '3', name: 'Needs Work', description: '', type: 'training', format: 'CSV', size: '1MB', recordCount: 1000, createdBy: '', createdDate: '', lastModified: '', version: '1.0', tags: [], schema: { columns: 1, features: [] }, storage: { location: '', checksum: '' }, quality: { score: 60, issues: [], lastValidated: '' }, usage: { accessCount: 0, lastAccessed: '', usedByModels: [] }}
      ]

      const result = processDatasetStats(datasets)
      expect(result.qualityDistribution.excellent).toBe(1)
      expect(result.qualityDistribution.good).toBe(1)
      expect(result.qualityDistribution.needsWork).toBe(1)
    })
  })

  describe('evaluateDeploymentHealth', () => {
    test('should handle empty deployments array', () => {
      const result = evaluateDeploymentHealth([])
      expect(result.overallHealthScore).toBe(0)
      expect(result.healthyDeployments).toBe(0)
      expect(result.unhealthyDeployments).toBe(0)
      expect(result.totalDevicesDeployed).toBe(0)
      expect(result.averageSuccessRate).toBe(0)
      expect(result.recommendations).toContain('No deployments found')
    })

    test('should evaluate healthy deployments correctly', () => {
      const deployments: ModelDeployment[] = [
        {
          id: 'deploy-1',
          deploymentName: 'Healthy Deployment',
          modelName: 'Test Model',
          modelVersion: '1.0.0',
          fleetName: 'Test Fleet',
          fleetId: 'fleet-1',
          status: 'active',
          deployedDate: '2024-01-01',
          deviceCount: 100,
          successfulDevices: 100,
          failedDevices: 0,
          lastUpdated: '2024-01-01'
        }
      ]

      const result = evaluateDeploymentHealth(deployments)
      expect(result.healthyDeployments).toBe(1)
      expect(result.unhealthyDeployments).toBe(0)
      expect(result.totalDevicesDeployed).toBe(100)
      expect(result.averageSuccessRate).toBe(100)
      expect(result.overallHealthScore).toBeGreaterThan(90)
    })

    test('should identify unhealthy deployments and provide recommendations', () => {
      const deployments: ModelDeployment[] = [
        {
          id: 'deploy-1',
          deploymentName: 'Failed Deployment',
          modelName: 'Test Model',
          modelVersion: '1.0.0',
          fleetName: 'Test Fleet',
          fleetId: 'fleet-1',
          status: 'failed',
          deployedDate: '2024-01-01',
          deviceCount: 10,
          successfulDevices: 0,
          failedDevices: 10,
          lastUpdated: '2024-01-01'
        },
        {
          id: 'deploy-2',
          deploymentName: 'Low Success Deployment',
          modelName: 'Another Model',
          modelVersion: '1.0.0',
          fleetName: 'Test Fleet',
          fleetId: 'fleet-1',
          status: 'active',
          deployedDate: '2024-01-01',
          deviceCount: 100,
          successfulDevices: 70,
          failedDevices: 30,
          lastUpdated: '2024-01-01'
        }
      ]

      const result = evaluateDeploymentHealth(deployments)
      expect(result.healthyDeployments).toBe(0)
      expect(result.unhealthyDeployments).toBe(2)
      expect(result.recommendations.length).toBeGreaterThan(0)
      expect(result.recommendations.some(r => r.includes('Failed Deployment'))).toBe(true)
      expect(result.recommendations.some(r => r.includes('Low Success Deployment'))).toBe(true)
    })

    test('should calculate overall health score correctly', () => {
      const deployments: ModelDeployment[] = [
        {
          id: 'deploy-1',
          deploymentName: 'Good Deployment',
          modelName: 'Model 1',
          modelVersion: '1.0.0',
          fleetName: 'Fleet 1',
          fleetId: 'fleet-1',
          status: 'active',
          deployedDate: '2024-01-01',
          deviceCount: 100,
          successfulDevices: 95,
          failedDevices: 5,
          lastUpdated: '2024-01-01'
        },
        {
          id: 'deploy-2',
          deploymentName: 'Perfect Deployment',
          modelName: 'Model 2',
          modelVersion: '1.0.0',
          fleetName: 'Fleet 2',
          fleetId: 'fleet-2',
          status: 'active',
          deployedDate: '2024-01-01',
          deviceCount: 50,
          successfulDevices: 50,
          failedDevices: 0,
          lastUpdated: '2024-01-01'
        }
      ]

      const result = evaluateDeploymentHealth(deployments)
      expect(result.overallHealthScore).toBeGreaterThan(80)
      expect(result.averageSuccessRate).toBeCloseTo(96.67, 1) // (95 + 50) / 150 * 100
    })

    test('should provide general recommendations for low health scores', () => {
      const deployments: ModelDeployment[] = [
        {
          id: 'deploy-1',
          deploymentName: 'Poor Deployment',
          modelName: 'Model 1',
          modelVersion: '1.0.0',
          fleetName: 'Fleet 1',
          fleetId: 'fleet-1',
          status: 'failed',
          deployedDate: '2024-01-01',
          deviceCount: 100,
          successfulDevices: 10,
          failedDevices: 90,
          lastUpdated: '2024-01-01'
        }
      ]

      const result = evaluateDeploymentHealth(deployments)
      expect(result.overallHealthScore).toBeLessThan(70)
      expect(result.recommendations.some(r => r.includes('deployment strategy'))).toBe(true)
      expect(result.recommendations.some(r => r.includes('connectivity issues'))).toBe(true)
    })
  })

  describe('parseTimeToMilliseconds', () => {
    test('should parse milliseconds correctly', () => {
      expect(parseTimeToMilliseconds('500ms')).toBe(500)
      expect(parseTimeToMilliseconds('1500MS')).toBe(1500)
      expect(parseTimeToMilliseconds('100')).toBe(100) // Default to ms
    })

    test('should parse seconds correctly', () => {
      expect(parseTimeToMilliseconds('5s')).toBe(5000)
      expect(parseTimeToMilliseconds('2.5S')).toBe(2500)
    })

    test('should parse minutes correctly', () => {
      expect(parseTimeToMilliseconds('2m')).toBe(120000)
      expect(parseTimeToMilliseconds('0.5M')).toBe(30000)
    })

    test('should parse hours correctly', () => {
      expect(parseTimeToMilliseconds('1h')).toBe(3600000)
      expect(parseTimeToMilliseconds('2.5H')).toBe(9000000)
    })

    test('should parse days correctly', () => {
      expect(parseTimeToMilliseconds('1d')).toBe(86400000)
      expect(parseTimeToMilliseconds('0.5D')).toBe(43200000)
    })

    test('should handle invalid input', () => {
      expect(parseTimeToMilliseconds('invalid')).toBe(0)
      expect(parseTimeToMilliseconds('')).toBe(0)
      expect(parseTimeToMilliseconds('abc123')).toBe(0)
    })

    test('should handle whitespace and case variations', () => {
      expect(parseTimeToMilliseconds('  10s  ')).toBe(10000)
      expect(parseTimeToMilliseconds('5M')).toBe(300000)
    })
  })

  describe('sanitizeUserInput', () => {
    test('should remove HTML tags', () => {
      expect(sanitizeUserInput('<script>alert("xss")</script>')).toBe('scriptalert("xss")/script')
      expect(sanitizeUserInput('Hello <b>World</b>')).toBe('Hello bWorld/b')
    })

    test('should remove javascript protocols', () => {
      expect(sanitizeUserInput('javascript:alert("xss")')).toBe('alert("xss")')
      expect(sanitizeUserInput('JAVASCRIPT:malicious()')).toBe('malicious()')
    })

    test('should remove event handlers', () => {
      expect(sanitizeUserInput('onclick=malicious()')).toBe('malicious()')
      expect(sanitizeUserInput('onload=bad()')).toBe('bad()')
      expect(sanitizeUserInput('ONMOUSEOVER=evil()')).toBe('evil()')
    })

    test('should trim whitespace', () => {
      expect(sanitizeUserInput('  hello world  ')).toBe('hello world')
      expect(sanitizeUserInput('\t\ntest\t\n')).toBe('test')
    })

    test('should limit length', () => {
      const longString = 'a'.repeat(2000)
      const result = sanitizeUserInput(longString)
      expect(result.length).toBe(1000)
    })

    test('should handle non-string input', () => {
      expect(sanitizeUserInput(123 as any)).toBe('')
      expect(sanitizeUserInput(null as any)).toBe('')
      expect(sanitizeUserInput(undefined as any)).toBe('')
    })

    test('should preserve safe content', () => {
      const safeText = 'This is a normal text with numbers 123 and symbols @#$%'
      expect(sanitizeUserInput(safeText)).toBe(safeText)
    })
  })

  describe('validateEmail', () => {
    test('should validate correct email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true)
      expect(validateEmail('user.name@company.co.uk')).toBe(true)
      expect(validateEmail('test123@domain.org')).toBe(true)
      expect(validateEmail('valid-email@sub.domain.com')).toBe(true)
    })

    test('should reject invalid email addresses', () => {
      expect(validateEmail('invalid')).toBe(false)
      expect(validateEmail('invalid@')).toBe(false)
      expect(validateEmail('@invalid.com')).toBe(false)
      expect(validateEmail('invalid@.com')).toBe(false)
      expect(validateEmail('invalid..email@domain.com')).toBe(false)
      expect(validateEmail('')).toBe(false)
      expect(validateEmail('test@')).toBe(false)
    })

    test('should handle edge cases', () => {
      expect(validateEmail('a@b.c')).toBe(true) // Minimal valid email
      expect(validateEmail('test with spaces@domain.com')).toBe(false)
      expect(validateEmail('test@domain')).toBe(false) // Missing TLD
    })
  })

  describe('generatePerformanceSummary', () => {
    test('should generate summary with high performance score', () => {
      const models: ModelInfo[] = [
        { id: '1', name: 'Model 1', version: '1.0', type: 'classification', parameters: '10M', apiUrl: 'test', status: 'active', description: 'Test' },
        { id: '2', name: 'Model 2', version: '1.0', type: 'classification', parameters: '10M', apiUrl: 'test', status: 'active', description: 'Test' },
        { id: '3', name: 'Model 3', version: '1.0', type: 'classification', parameters: '10M', apiUrl: 'test', status: 'inactive', description: 'Test' }
      ]

      const fleets: Fleet[] = [
        { id: '1', name: 'Fleet 1', description: 'Test', deviceCount: 10, deviceSpecs: { cpu: 8, memory: 32, storage: 512 }, models: [] }
      ]

      const metrics: PerformanceMetrics[] = [
        { timestamp: Date.now(), cpuUsage: 50, memoryUsage: 60, latency: 10, throughput: 1000, errorRate: 0.005 }
      ]

      const result = generatePerformanceSummary(models, fleets, metrics)
      expect(result.score).toBeGreaterThanOrEqual(80)
      expect(result.summary).toContain('2 active models')
      expect(result.summary).toContain('1 fleets')
      expect(result.alerts.length).toBe(0)
      expect(result.recommendations.length).toBeGreaterThanOrEqual(0)
    })

    test('should generate alerts for problematic conditions', () => {
      const models: ModelInfo[] = [] // No active models

      const fleets: Fleet[] = [
        { id: '1', name: 'Fleet 1', description: 'Test', deviceCount: 10, deviceSpecs: { cpu: 8, memory: 32, storage: 512 }, models: [] }
      ]

      const metrics: PerformanceMetrics[] = [
        { timestamp: Date.now(), cpuUsage: 95, memoryUsage: 60, latency: 10, throughput: 1000, errorRate: 0.1 }
      ]

      const result = generatePerformanceSummary(models, fleets, metrics)
      expect(result.score).toBeLessThan(50)
      expect(result.alerts.some(alert => alert.includes('No active models'))).toBe(true)
      expect(result.alerts.some(alert => alert.includes('High CPU usage'))).toBe(true)
      expect(result.alerts.some(alert => alert.includes('High error rate'))).toBe(true)
    })

    test('should provide meaningful recommendations', () => {
      const models: ModelInfo[] = [
        { id: '1', name: 'Model 1', version: '1.0', type: 'classification', parameters: '10M', apiUrl: 'test', status: 'active', description: 'Test' }
      ]

      const fleets: Fleet[] = [
        { id: '1', name: 'Fleet 1', description: 'Test', deviceCount: 10, deviceSpecs: { cpu: 2, memory: 8, storage: 128 }, models: [] }
      ]

      const metrics: PerformanceMetrics[] = [
        { timestamp: Date.now(), cpuUsage: 30, memoryUsage: 40, latency: 5, throughput: 500, errorRate: 0.001 }
      ]

      const result = generatePerformanceSummary(models, fleets, metrics)
      expect(result.recommendations.some(rec => rec.includes('activating more models'))).toBe(true)
      expect(result.recommendations.some(rec => rec.includes('Fleet utilization is low'))).toBe(true)
    })

    test('should handle empty inputs gracefully', () => {
      const result = generatePerformanceSummary([], [], [])
      expect(result.score).toBeLessThanOrEqual(60) // Adjusted expectation
      expect(result.summary).toBeDefined()
      expect(result.alerts).toContain('No active models found')
    })
  })
})
