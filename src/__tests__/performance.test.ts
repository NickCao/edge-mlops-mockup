import { describe, test, expect } from "bun:test"
import {
  isValidRole,
  formatModelParameters,
  calculateSuccessRate,
  validateModelConfig,
  generateModelId,
  formatFileSize,
  calculateDataQuality,
  validateImportConfig,
  formatDuration
} from '../utils/testHelpers'
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

describe('Performance and Stress Tests', () => {
  describe('High Volume Data Processing', () => {
    test('should handle 10,000 model validations efficiently', () => {
      const startTime = performance.now()
      
      for (let i = 0; i < 10000; i++) {
        validateModelConfig({
          name: `Model ${i}`,
          description: `Description for model ${i}`,
          type: 'classification',
          framework: 'pytorch'
        })
      }
      
      const endTime = performance.now()
      const duration = endTime - startTime
      
      expect(duration).toBeLessThan(2000) // Should complete within 2 seconds
    })

    test('should process large fleet datasets efficiently', () => {
      const fleets: Fleet[] = []
      for (let i = 0; i < 1000; i++) {
        fleets.push({
          id: `fleet-${i}`,
          name: `Fleet ${i}`,
          description: `Description ${i}`,
          deviceCount: Math.floor(Math.random() * 100) + 1,
          deviceSpecs: {
            cpu: Math.floor(Math.random() * 64) + 1,
            memory: Math.floor(Math.random() * 512) + 1,
            storage: Math.floor(Math.random() * 2048) + 1
          },
          models: []
        })
      }

      const startTime = performance.now()
      const result = calculateFleetUtilization(fleets)
      const endTime = performance.now()

      expect(endTime - startTime).toBeLessThan(100)
      expect(result.totalDevices).toBeGreaterThan(0)
      expect(result.averageCpu).toBeGreaterThan(0)
    })

    test('should handle massive performance metrics aggregation', () => {
      const metrics: PerformanceMetrics[] = []
      for (let i = 0; i < 50000; i++) {
        metrics.push({
          timestamp: Date.now() + i * 1000,
          cpuUsage: Math.random() * 100,
          memoryUsage: Math.random() * 100,
          latency: Math.random() * 100,
          throughput: Math.random() * 2000,
          errorRate: Math.random() * 0.1
        })
      }

      const startTime = performance.now()
      const result = aggregatePerformanceMetrics(metrics)
      const endTime = performance.now()

      expect(endTime - startTime).toBeLessThan(1000) // Should complete within 1 second
      expect(result.avgCpuUsage).toBeGreaterThanOrEqual(0)
      expect(result.avgCpuUsage).toBeLessThanOrEqual(100)
    })

    test('should process large dataset statistics efficiently', () => {
      const datasets: Dataset[] = []
      for (let i = 0; i < 5000; i++) {
        datasets.push({
          id: `dataset-${i}`,
          name: `Dataset ${i}`,
          description: `Description ${i}`,
          type: ['training', 'validation', 'test', 'production'][i % 4] as any,
          format: ['CSV', 'JSON', 'Parquet', 'HDF5'][i % 4],
          size: `${Math.floor(Math.random() * 1000)}MB`,
          recordCount: Math.floor(Math.random() * 1000000),
          createdBy: `User ${i % 100}`,
          createdDate: '2024-01-01',
          lastModified: '2024-01-01',
          version: '1.0.0',
          tags: [`tag${i % 50}`],
          schema: { columns: 10, features: ['feature1'] },
          storage: { location: `s3://bucket/dataset-${i}`, checksum: `hash${i}` },
          quality: { score: Math.floor(Math.random() * 100), issues: [], lastValidated: '2024-01-01' },
          usage: { accessCount: Math.floor(Math.random() * 100), lastAccessed: '2024-01-01', usedByModels: [] }
        })
      }

      const startTime = performance.now()
      const result = processDatasetStats(datasets)
      const endTime = performance.now()

      expect(endTime - startTime).toBeLessThan(500)
      expect(result.totalRecords).toBeGreaterThan(0)
      expect(Object.keys(result.formatDistribution).length).toBeGreaterThan(0)
    })

    test('should evaluate many deployments efficiently', () => {
      const deployments: ModelDeployment[] = []
      for (let i = 0; i < 2000; i++) {
        const deviceCount = Math.floor(Math.random() * 100) + 1
        const failedDevices = Math.floor(Math.random() * deviceCount * 0.2)
        deployments.push({
          id: `deploy-${i}`,
          deploymentName: `Deployment ${i}`,
          modelName: `Model ${i % 100}`,
          modelVersion: '1.0.0',
          fleetName: `Fleet ${i % 50}`,
          fleetId: `fleet-${i % 50}`,
          status: ['active', 'deploying', 'failed', 'stopped'][i % 4] as any,
          deployedDate: '2024-01-01',
          deviceCount,
          successfulDevices: deviceCount - failedDevices,
          failedDevices,
          lastUpdated: '2024-01-01'
        })
      }

      const startTime = performance.now()
      const result = evaluateDeploymentHealth(deployments)
      const endTime = performance.now()

      expect(endTime - startTime).toBeLessThan(300)
      expect(result.totalDevicesDeployed).toBeGreaterThan(0)
      expect(typeof result.overallHealthScore).toBe('number')
    })
  })

  describe('Memory Usage Optimization', () => {
    test('should not leak memory during repeated validations', () => {
      const initialMemory = process.memoryUsage().heapUsed

      // Perform many operations that could potentially leak memory
      for (let iteration = 0; iteration < 10; iteration++) {
        const configs = []
        for (let i = 0; i < 1000; i++) {
          configs.push({
            name: `Model ${i}`,
            description: `Description ${i}`,
            type: 'classification',
            framework: 'pytorch'
          })
        }

        configs.forEach(config => validateModelConfig(config))
      }

      // Force garbage collection if available
      if (global.gc) {
        global.gc()
      }

      const finalMemory = process.memoryUsage().heapUsed
      const memoryIncrease = finalMemory - initialMemory

      // Memory increase should be reasonable (less than 10MB)
      expect(memoryIncrease).toBeLessThan(10 * 1024 * 1024)
    })

    test('should handle large string operations without excessive memory usage', () => {
      const initialMemory = process.memoryUsage().heapUsed

      for (let i = 0; i < 1000; i++) {
        const largeString = 'x'.repeat(10000)
        sanitizeUserInput(largeString)
        generateModelId(largeString)
        parseTimeToMilliseconds(`${i}s`)
      }

      // Force garbage collection if available
      if (global.gc) {
        global.gc()
      }

      const finalMemory = process.memoryUsage().heapUsed
      const memoryIncrease = finalMemory - initialMemory

      // Memory increase should be reasonable
      expect(memoryIncrease).toBeLessThan(20 * 1024 * 1024)
    })
  })

  describe('Concurrent Operations', () => {
    test('should handle concurrent model ID generation', async () => {
      const promises = []
      const timestamp = Date.now()

      for (let i = 0; i < 1000; i++) {
        promises.push(
          new Promise(resolve => {
            setTimeout(() => {
              resolve(generateModelId(`Model ${i}`, timestamp + i))
            }, Math.random() * 10)
          })
        )
      }

      const startTime = performance.now()
      const results = await Promise.all(promises)
      const endTime = performance.now()

      expect(endTime - startTime).toBeLessThan(2000)
      expect(results).toHaveLength(1000)
      
      // Check that all IDs are unique
      const uniqueIds = new Set(results)
      expect(uniqueIds.size).toBe(1000)
    })

    test('should handle concurrent validation operations', async () => {
      const promises = []

      for (let i = 0; i < 500; i++) {
        promises.push(
          Promise.resolve().then(() => {
            const config = {
              name: `Model ${i}`,
              description: `Description ${i}`,
              type: 'classification',
              framework: 'pytorch'
            }
            return validateModelConfig(config)
          })
        )

        promises.push(
          Promise.resolve().then(() => {
            const importConfig = {
              source: 'huggingface',
              modelId: `org/model-${i}`,
              name: `Model ${i}`
            }
            return validateImportConfig(importConfig)
          })
        )
      }

      const startTime = performance.now()
      const results = await Promise.all(promises)
      const endTime = performance.now()

      expect(endTime - startTime).toBeLessThan(1000)
      expect(results).toHaveLength(1000)
      results.forEach(result => {
        expect(Array.isArray(result)).toBe(true)
      })
    })
  })

  describe('CPU-Intensive Operations', () => {
    test('should handle complex aggregation calculations efficiently', () => {
      // Generate complex nested data structure
      const complexData = []
      for (let i = 0; i < 1000; i++) {
        complexData.push({
          models: Array.from({ length: 50 }, (_, j) => ({
            id: `model-${i}-${j}`,
            name: `Model ${i}-${j}`,
            version: '1.0.0',
            type: 'classification',
            parameters: '10M',
            apiUrl: 'https://test.com',
            status: ['active', 'inactive', 'updating'][j % 3] as any,
            description: `Description ${i}-${j}`
          })),
          fleets: Array.from({ length: 20 }, (_, j) => ({
            id: `fleet-${i}-${j}`,
            name: `Fleet ${i}-${j}`,
            description: `Description ${i}-${j}`,
            deviceCount: Math.floor(Math.random() * 100),
            deviceSpecs: {
              cpu: Math.floor(Math.random() * 64),
              memory: Math.floor(Math.random() * 512),
              storage: Math.floor(Math.random() * 2048)
            },
            models: []
          })),
          metrics: Array.from({ length: 100 }, (_, j) => ({
            timestamp: Date.now() + j * 1000,
            cpuUsage: Math.random() * 100,
            memoryUsage: Math.random() * 100,
            latency: Math.random() * 50,
            throughput: Math.random() * 2000,
            errorRate: Math.random() * 0.1
          }))
        })
      }

      const startTime = performance.now()
      
      complexData.forEach(data => {
        calculateFleetUtilization(data.fleets)
        aggregatePerformanceMetrics(data.metrics)
        generatePerformanceSummary(data.models, data.fleets, data.metrics)
      })

      const endTime = performance.now()
      const duration = endTime - startTime

      expect(duration).toBeLessThan(5000) // Should complete within 5 seconds
    })

    test('should handle intensive string processing efficiently', () => {
      const startTime = performance.now()

      for (let i = 0; i < 10000; i++) {
        const testString = `<script>alert('xss-${i}')</script>javascript:evil()onclick=bad()${'a'.repeat(100)}`
        sanitizeUserInput(testString)
        
        validateEmail(`user${i}@domain${i % 100}.com`)
        
        formatFileSize(Math.floor(Math.random() * 1000000000))
        formatDuration(Math.floor(Math.random() * 86400000))
        formatModelParameters(`${Math.floor(Math.random() * 1000)}M`)
      }

      const endTime = performance.now()
      const duration = endTime - startTime

      expect(duration).toBeLessThan(3000) // Should complete within 3 seconds
    })
  })

  describe('Scalability Tests', () => {
    test('should scale linearly with input size', () => {
      const inputSizes = [100, 500, 1000, 2500, 5000]
      const timings = []

      inputSizes.forEach(size => {
        const metrics: PerformanceMetrics[] = Array.from({ length: size }, (_, i) => ({
          timestamp: Date.now() + i,
          cpuUsage: Math.random() * 100,
          memoryUsage: Math.random() * 100,
          latency: Math.random() * 50,
          throughput: Math.random() * 2000,
          errorRate: Math.random() * 0.1
        }))

        const startTime = performance.now()
        aggregatePerformanceMetrics(metrics)
        const endTime = performance.now()

        timings.push(endTime - startTime)
      })

      // Check that timing doesn't grow exponentially
      for (let i = 1; i < timings.length; i++) {
        const ratio = timings[i] / timings[i - 1]
        const sizeRatio = inputSizes[i] / inputSizes[i - 1]
        
        // Timing ratio should not be significantly larger than size ratio
        expect(ratio).toBeLessThan(sizeRatio * 2)
      }
    })

    test('should maintain performance with increasing complexity', () => {
      const complexityLevels = [10, 25, 50, 100, 200]
      const timings = []

      complexityLevels.forEach(complexity => {
        const startTime = performance.now()

        for (let i = 0; i < complexity; i++) {
          validateModelConfig({
            name: `Model ${i}`,
            description: 'a'.repeat(complexity * 10),
            type: 'classification',
            framework: 'pytorch'
          })

          validateImportConfig({
            source: 'huggingface',
            modelId: `org/model-${'x'.repeat(complexity)}`,
            name: `Model ${i}`
          })

          isValidRole('data-scientist')
          calculateSuccessRate(
            Math.floor(Math.random() * complexity),
            Math.floor(Math.random() * 10)
          )
        }

        const endTime = performance.now()
        timings.push(endTime - startTime)
      })

      // Performance should degrade gracefully, not exponentially
      for (let i = 1; i < timings.length; i++) {
        const ratio = timings[i] / timings[i - 1]
        expect(ratio).toBeLessThan(5) // Should not increase by more than 5x
      }
    })
  })

  describe('Resource Cleanup and Efficiency', () => {
    test('should clean up temporary objects efficiently', () => {
      const initialObjectCount = Object.keys(global).length

      // Create and destroy many temporary objects
      for (let i = 0; i < 1000; i++) {
        const tempConfig = {
          name: `Temp Model ${i}`,
          description: `Temporary description ${i}`,
          type: 'classification',
          framework: 'pytorch'
        }

        validateModelConfig(tempConfig)
        
        // Simulate object cleanup
        Object.keys(tempConfig).forEach(key => {
          delete (tempConfig as any)[key]
        })
      }

      const finalObjectCount = Object.keys(global).length

      // Should not have significantly more global objects
      expect(finalObjectCount - initialObjectCount).toBeLessThan(10)
    })

    test('should handle repeated operations without performance degradation', () => {
      const iterations = 10
      const operationsPerIteration = 100
      const timings = []

      for (let iteration = 0; iteration < iterations; iteration++) {
        const startTime = performance.now()

        for (let i = 0; i < operationsPerIteration; i++) {
          generateModelId(`Model ${iteration}-${i}`)
          calculateSuccessRate(90 + i, 10)
          sanitizeUserInput(`Test input ${iteration}-${i}`)
          parseTimeToMilliseconds(`${i}ms`)
        }

        const endTime = performance.now()
        timings.push(endTime - startTime)
      }

      // Performance should remain consistent across iterations
      const avgTiming = timings.reduce((a, b) => a + b, 0) / timings.length
      timings.forEach(timing => {
        // Each iteration should be within 50% of average
        expect(timing).toBeLessThan(avgTiming * 1.5)
        expect(timing).toBeGreaterThan(avgTiming * 0.5)
      })
    })
  })
})
