import { describe, test, expect } from "bun:test"
import type { 
  Role, 
  RoleConfig, 
  ModelInfo, 
  Fleet, 
  PerformanceMetrics, 
  ModelMonitoringInfo,
  AvailableModel,
  ModelDeployment,
  ModelVersion,
  ModelFamily,
  ModelEvaluation,
  Dataset 
} from '../types'

describe('Type Definitions', () => {
  describe('Role type', () => {
    test('should accept valid role values', () => {
      const validRoles: Role[] = ['data-scientist', 'ai-engineer', 'site-engineer', 'developer']
      
      validRoles.forEach(role => {
        const roleValue: Role = role
        expect(typeof roleValue).toBe('string')
      })
    })

    test('should be assignable to string', () => {
      const role: Role = 'data-scientist'
      const stringValue: string = role
      expect(typeof stringValue).toBe('string')
    })
  })

  describe('RoleConfig interface', () => {
    test('should match expected structure', () => {
      const roleConfig: RoleConfig = {
        id: 'data-scientist',
        name: 'Data Scientist',
        description: 'Train and experiment with models',
        icon: null, // React.ReactNode can be null
        color: 'blue'
      }

      expect(roleConfig.id).toBe('data-scientist')
      expect(roleConfig.name).toBe('Data Scientist')
      expect(roleConfig.description).toContain('Train')
      expect(roleConfig.color).toBe('blue')
    })

    test('should require all mandatory fields', () => {
      // This test ensures TypeScript compilation would fail if required fields are missing
      const roleConfig: RoleConfig = {
        id: 'ai-engineer',
        name: 'AI Engineer',
        description: 'Publish and monitor models',
        icon: null,
        color: 'green'
      }

      // All fields should be present
      expect(roleConfig).toHaveProperty('id')
      expect(roleConfig).toHaveProperty('name')
      expect(roleConfig).toHaveProperty('description')
      expect(roleConfig).toHaveProperty('icon')
      expect(roleConfig).toHaveProperty('color')
    })
  })

  describe('ModelInfo interface', () => {
    test('should have correct structure', () => {
      const model: ModelInfo = {
        id: 'model-1',
        name: 'Test Model',
        version: '1.0.0',
        type: 'classification',
        parameters: '10M',
        apiUrl: 'https://api.example.com/model-1',
        status: 'active',
        accuracy: '95%',
        latency: '10ms',
        description: 'A test model'
      }

      expect(model.status).toMatch(/^(active|inactive|updating)$/)
      expect(model.accuracy).toBeDefined()
      expect(model.latency).toBeDefined()
    })

    test('should allow optional fields to be undefined', () => {
      const model: ModelInfo = {
        id: 'model-2',
        name: 'Basic Model',
        version: '1.0.0',
        type: 'regression',
        parameters: '5M',
        apiUrl: 'https://api.example.com/model-2',
        status: 'inactive',
        description: 'A basic model'
        // accuracy and latency are optional
      }

      expect(model.accuracy).toBeUndefined()
      expect(model.latency).toBeUndefined()
    })
  })

  describe('Fleet interface', () => {
    test('should have proper structure with device specs', () => {
      const fleet: Fleet = {
        id: 'fleet-1',
        name: 'Production Fleet',
        description: 'Main production deployment',
        deviceCount: 10,
        deviceSpecs: {
          cpu: 4,
          memory: 8,
          storage: 128
        },
        models: []
      }

      expect(fleet.deviceSpecs).toHaveProperty('cpu')
      expect(fleet.deviceSpecs).toHaveProperty('memory') 
      expect(fleet.deviceSpecs).toHaveProperty('storage')
      expect(typeof fleet.deviceSpecs.cpu).toBe('number')
      expect(Array.isArray(fleet.models)).toBe(true)
    })
  })

  describe('PerformanceMetrics interface', () => {
    test('should contain all required metrics', () => {
      const metrics: PerformanceMetrics = {
        timestamp: Date.now(),
        cpuUsage: 75.5,
        memoryUsage: 60.2,
        latency: 25.8,
        throughput: 1000,
        errorRate: 0.05
      }

      expect(typeof metrics.timestamp).toBe('number')
      expect(typeof metrics.cpuUsage).toBe('number')
      expect(typeof metrics.memoryUsage).toBe('number')
      expect(typeof metrics.latency).toBe('number')
      expect(typeof metrics.throughput).toBe('number')
      expect(typeof metrics.errorRate).toBe('number')
    })
  })

  describe('ModelMonitoringInfo interface', () => {
    test('should extend ModelInfo with monitoring data', () => {
      const monitoringInfo: ModelMonitoringInfo = {
        // ModelInfo fields
        id: 'model-1',
        name: 'Monitored Model',
        version: '2.0.0',
        type: 'classification',
        parameters: '50M',
        apiUrl: 'https://api.example.com/model-1',
        status: 'active',
        description: 'A monitored model',
        
        // Monitoring specific fields
        currentMetrics: {
          cpuUsage: 70,
          memoryUsage: 80,
          avgLatency: 15,
          throughput: 500,
          errorRate: 0.01,
          uptime: 99.9
        },
        historicalData: [],
        deviceHealth: {
          healthy: 8,
          warning: 2,
          error: 0
        }
      }

      expect(monitoringInfo).toHaveProperty('currentMetrics')
      expect(monitoringInfo).toHaveProperty('historicalData')
      expect(monitoringInfo).toHaveProperty('deviceHealth')
      expect(monitoringInfo.currentMetrics).toHaveProperty('uptime')
      expect(Array.isArray(monitoringInfo.historicalData)).toBe(true)
    })
  })

  describe('AvailableModel interface', () => {
    test('should contain deployment and compatibility info', () => {
      const availableModel: AvailableModel = {
        id: 'available-1',
        name: 'Available Model',
        version: '1.0.0',
        type: 'nlp',
        description: 'An available model',
        publishedBy: 'Data Team',
        publishDate: '2024-01-01',
        modelSize: '100MB',
        requirements: {
          minCpu: '2 cores',
          minMemory: '4GB',
          minStorage: '10GB'
        },
        deploymentStatus: {},
        compatibleFleets: ['fleet-1', 'fleet-2']
      }

      expect(availableModel.requirements).toHaveProperty('minCpu')
      expect(availableModel.requirements).toHaveProperty('minMemory')
      expect(availableModel.requirements).toHaveProperty('minStorage')
      expect(Array.isArray(availableModel.compatibleFleets)).toBe(true)
      expect(typeof availableModel.deploymentStatus).toBe('object')
    })
  })

  describe('ModelDeployment interface', () => {
    test('should track deployment status and device counts', () => {
      const deployment: ModelDeployment = {
        id: 'deploy-1',
        deploymentName: 'Prod Deployment',
        modelName: 'Production Model',
        modelVersion: '2.1.0',
        fleetName: 'Production Fleet',
        fleetId: 'fleet-prod',
        status: 'active',
        deployedDate: '2024-01-15',
        deviceCount: 20,
        successfulDevices: 18,
        failedDevices: 2,
        lastUpdated: '2024-01-16'
      }

      const validStatuses = ['active', 'deploying', 'failed', 'stopped', 'updating']
      expect(validStatuses).toContain(deployment.status)
      expect(deployment.successfulDevices + deployment.failedDevices).toBeLessThanOrEqual(deployment.deviceCount)
    })
  })

  describe('ModelVersion interface', () => {
    test('should contain version details and evaluations', () => {
      const version: ModelVersion = {
        id: 'version-1',
        version: '1.2.3',
        createdDate: '2024-01-01',
        status: 'published',
        modelSize: '50MB',
        trainingDataset: 'Dataset v1',
        evaluations: {
          accuracy: 95.5,
          precision: 94.2,
          recall: 96.1,
          f1Score: 95.1,
          bias: 0.05,
          fairness: 0.92,
          latency: 12.5
        },
        artifacts: {
          modelFile: 'model.pkl',
          configFile: 'config.json',
          requirementsFile: 'requirements.txt'
        }
      }

      const validStatuses = ['draft', 'ready', 'published', 'deprecated', 'unpublished']
      expect(validStatuses).toContain(version.status)
      expect(version.evaluations).toHaveProperty('accuracy')
      expect(version.evaluations).toHaveProperty('f1Score')
      expect(version.artifacts).toHaveProperty('modelFile')
    })
  })

  describe('ModelFamily interface', () => {
    test('should group related model versions', () => {
      const family: ModelFamily = {
        id: 'family-1',
        name: 'Sentiment Models',
        type: 'text-classification',
        framework: 'PyTorch',
        description: 'Family of sentiment analysis models',
        developedBy: 'ML Team',
        versions: [],
        currentVersion: '2.0.0'
      }

      expect(Array.isArray(family.versions)).toBe(true)
      expect(family).toHaveProperty('currentVersion')
    })
  })

  describe('ModelEvaluation interface', () => {
    test('should track evaluation results', () => {
      const evaluation: ModelEvaluation = {
        id: 'eval-1',
        modelId: 'model-1',
        modelName: 'Test Model',
        modelVersion: '1.0.0',
        evaluationType: 'accuracy',
        status: 'completed',
        startedDate: '2024-01-01',
        completedDate: '2024-01-02',
        executedBy: 'Data Scientist',
        dataset: 'Test Dataset',
        metrics: {
          overall: 94.5,
          detailed: {
            precision: 93.2,
            recall: 95.8
          }
        }
      }

      const validTypes = ['accuracy', 'bias', 'fairness', 'performance', 'robustness']
      const validStatuses = ['running', 'completed', 'failed', 'queued']
      
      expect(validTypes).toContain(evaluation.evaluationType)
      expect(validStatuses).toContain(evaluation.status)
      expect(evaluation.metrics).toHaveProperty('overall')
      expect(evaluation.metrics).toHaveProperty('detailed')
    })
  })

  describe('Dataset interface', () => {
    test('should contain comprehensive dataset metadata', () => {
      const dataset: Dataset = {
        id: 'dataset-1',
        name: 'Test Dataset',
        description: 'A test dataset',
        type: 'training',
        format: 'CSV',
        size: '1.5GB',
        recordCount: 1000000,
        createdBy: 'Data Engineer',
        createdDate: '2024-01-01',
        lastModified: '2024-01-05',
        version: '1.0.0',
        tags: ['nlp', 'classification'],
        schema: {
          columns: 10,
          features: ['text', 'label'],
          target: 'label'
        },
        storage: {
          location: 's3://bucket/dataset',
          checksum: 'abc123'
        },
        quality: {
          score: 95.5,
          issues: [],
          lastValidated: '2024-01-05'
        },
        usage: {
          accessCount: 50,
          lastAccessed: '2024-01-15',
          usedByModels: ['model-1', 'model-2']
        }
      }

      const validTypes = ['training', 'validation', 'test', 'production']
      const validFormats = ['CSV', 'JSON', 'Parquet', 'HDF5', 'TFRecord', 'Images', 'Text']
      
      expect(validTypes).toContain(dataset.type)
      expect(validFormats).toContain(dataset.format)
      expect(Array.isArray(dataset.tags)).toBe(true)
      expect(Array.isArray(dataset.schema.features)).toBe(true)
      expect(Array.isArray(dataset.quality.issues)).toBe(true)
      expect(Array.isArray(dataset.usage.usedByModels)).toBe(true)
      expect(dataset.schema).toHaveProperty('columns')
      expect(dataset.storage).toHaveProperty('location')
      expect(dataset.quality).toHaveProperty('score')
      expect(dataset.usage).toHaveProperty('accessCount')
    })

    test('should handle optional target field in schema', () => {
      const dataset: Dataset = {
        id: 'dataset-2',
        name: 'Unsupervised Dataset',
        description: 'Dataset without target labels',
        type: 'training',
        format: 'JSON',
        size: '500MB',
        recordCount: 100000,
        createdBy: 'Data Engineer',
        createdDate: '2024-01-01',
        lastModified: '2024-01-01',
        version: '1.0.0',
        tags: ['unsupervised'],
        schema: {
          columns: 5,
          features: ['feature1', 'feature2']
          // target is optional
        },
        storage: {
          location: 's3://bucket/unsupervised',
          checksum: 'def456'
        },
        quality: {
          score: 88.0,
          issues: ['missing values'],
          lastValidated: '2024-01-01'
        },
        usage: {
          accessCount: 10,
          lastAccessed: '2024-01-10',
          usedByModels: []
        }
      }

      expect(dataset.schema.target).toBeUndefined()
      expect(dataset.usage.usedByModels).toHaveLength(0)
    })
  })

  describe('Type Compatibility', () => {
    test('should allow proper type assignments', () => {
      // Test that types can be used in generic contexts
      const roles: Role[] = ['data-scientist', 'ai-engineer']
      const models: ModelInfo[] = []
      const fleets: Fleet[] = []
      
      expect(Array.isArray(roles)).toBe(true)
      expect(Array.isArray(models)).toBe(true)
      expect(Array.isArray(fleets)).toBe(true)
    })

    test('should support union types correctly', () => {
      const statuses: ModelInfo['status'][] = ['active', 'inactive', 'updating']
      const evalTypes: ModelEvaluation['evaluationType'][] = ['accuracy', 'bias', 'fairness']
      
      statuses.forEach(status => {
        expect(['active', 'inactive', 'updating']).toContain(status)
      })
      
      evalTypes.forEach(type => {
        expect(['accuracy', 'bias', 'fairness', 'performance', 'robustness']).toContain(type)
      })
    })
  })
})
