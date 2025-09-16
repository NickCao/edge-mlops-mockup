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

describe('Utility Functions', () => {
  describe('isValidRole', () => {
    test('should return true for valid roles', () => {
      expect(isValidRole('data-scientist')).toBe(true)
      expect(isValidRole('ai-engineer')).toBe(true)
      expect(isValidRole('site-engineer')).toBe(true)
      expect(isValidRole('developer')).toBe(true)
    })

    test('should return false for invalid roles', () => {
      expect(isValidRole('invalid-role')).toBe(false)
      expect(isValidRole('')).toBe(false)
      expect(isValidRole('admin')).toBe(false)
      expect(isValidRole('user')).toBe(false)
    })
  })

  describe('formatModelParameters', () => {
    test('should format parameter strings correctly', () => {
      expect(formatModelParameters('10m')).toBe('10M')
      expect(formatModelParameters('5.2b')).toBe('5.2B')
      expect(formatModelParameters('100k')).toBe('100K')
      expect(formatModelParameters('LARGE')).toBe('LARGE')
    })

    test('should handle empty or invalid inputs', () => {
      expect(formatModelParameters('')).toBe('Unknown')
      expect(formatModelParameters(null as any)).toBe('Unknown')
      expect(formatModelParameters(undefined as any)).toBe('Unknown')
    })

    test('should preserve already uppercase parameters', () => {
      expect(formatModelParameters('10M')).toBe('10M')
      expect(formatModelParameters('5B')).toBe('5B')
    })
  })

  describe('calculateSuccessRate', () => {
    test('should calculate success rate correctly', () => {
      expect(calculateSuccessRate(8, 2)).toBe(80)
      expect(calculateSuccessRate(10, 0)).toBe(100)
      expect(calculateSuccessRate(0, 10)).toBe(0)
      expect(calculateSuccessRate(7, 3)).toBe(70)
    })

    test('should handle edge cases', () => {
      expect(calculateSuccessRate(0, 0)).toBe(0)
      expect(calculateSuccessRate(1, 1)).toBe(50)
      expect(calculateSuccessRate(3, 1)).toBe(75)
    })
  })

  describe('validateModelConfig', () => {
    test('should return no errors for valid config', () => {
      const validConfig = {
        name: 'Test Model',
        description: 'A test model',
        type: 'classification',
        framework: 'pytorch'
      }
      expect(validateModelConfig(validConfig)).toEqual([])
    })

    test('should return errors for missing required fields', () => {
      const invalidConfig = {
        name: '',
        description: '',
        type: '',
        framework: ''
      }
      const errors = validateModelConfig(invalidConfig)
      expect(errors).toContain('Model name is required')
      expect(errors).toContain('Model description is required')
      expect(errors).toContain('Model type is required')
      expect(errors).toContain('Model framework is required')
      expect(errors).toHaveLength(4)
    })

    test('should handle whitespace-only values', () => {
      const configWithSpaces = {
        name: '   ',
        description: '\t\t',
        type: '\n\n',
        framework: '  \n  '
      }
      const errors = validateModelConfig(configWithSpaces)
      expect(errors).toHaveLength(4)
    })
  })

  describe('generateModelId', () => {
    test('should generate consistent IDs for same input', () => {
      const timestamp = 1640995200000
      const id1 = generateModelId('Test Model', timestamp)
      const id2 = generateModelId('Test Model', timestamp)
      expect(id1).toBe(id2)
      expect(id1).toBe('test-model-200000')
    })

    test('should handle special characters in names', () => {
      const id = generateModelId('My @Model! v2.1', 1640995200000)
      expect(id).toBe('my--model--v2-1-200000') // @ becomes -, so "My @Model!" becomes "my--model-"
    })

    test('should generate different IDs for different timestamps', () => {
      const id1 = generateModelId('Test Model', 1640995200000)
      const id2 = generateModelId('Test Model', 1640995200001)
      expect(id1).not.toBe(id2)
    })

    test('should use current timestamp when not provided', () => {
      const id = generateModelId('Test Model')
      expect(id).toMatch(/^test-model-\d{6}$/)
    })
  })

  describe('formatFileSize', () => {
    test('should format bytes correctly', () => {
      expect(formatFileSize(0)).toBe('0 B')
      expect(formatFileSize(512)).toBe('512 B')
      expect(formatFileSize(1024)).toBe('1 KB')
      expect(formatFileSize(1536)).toBe('1.5 KB')
      expect(formatFileSize(1048576)).toBe('1 MB')
      expect(formatFileSize(1073741824)).toBe('1 GB')
      expect(formatFileSize(1099511627776)).toBe('1 TB')
    })

    test('should handle large file sizes', () => {
      expect(formatFileSize(2097152)).toBe('2 MB')
      expect(formatFileSize(5368709120)).toBe('5 GB')
    })

    test('should handle decimal precision', () => {
      expect(formatFileSize(1536)).toBe('1.5 KB')
      expect(formatFileSize(2621440)).toBe('2.5 MB')
    })
  })

  describe('calculateDataQuality', () => {
    test('should calculate average quality score', () => {
      expect(calculateDataQuality({ completeness: 90, validity: 85, consistency: 95 })).toBe(90)
      expect(calculateDataQuality({ completeness: 100, validity: 100, consistency: 100 })).toBe(100)
      expect(calculateDataQuality({ completeness: 0, validity: 0, consistency: 0 })).toBe(0)
    })

    test('should handle partial scores', () => {
      expect(calculateDataQuality({ completeness: 80, validity: 90, consistency: 85 })).toBe(85)
      expect(calculateDataQuality({ completeness: 75, validity: 85, consistency: 88 })).toBe(83)
    })

    test('should round to nearest integer', () => {
      expect(calculateDataQuality({ completeness: 83, validity: 87, consistency: 85 })).toBe(85)
      expect(calculateDataQuality({ completeness: 82, validity: 86, consistency: 84 })).toBe(84)
    })
  })

  describe('validateImportConfig', () => {
    test('should return no errors for valid Hugging Face config', () => {
      const validConfig = {
        source: 'huggingface',
        modelId: 'microsoft/DialoGPT-medium',
        name: 'DialoGPT Medium'
      }
      expect(validateImportConfig(validConfig)).toEqual([])
    })

    test('should return errors for invalid Hugging Face model ID format', () => {
      const invalidConfig = {
        source: 'huggingface',
        modelId: 'invalid-format',
        name: 'Test Model'
      }
      const errors = validateImportConfig(invalidConfig)
      expect(errors).toContain('Hugging Face model ID must be in format: organization/model-name')
    })

    test('should validate required fields', () => {
      const emptyConfig = {
        source: '',
        modelId: '',
        name: ''
      }
      const errors = validateImportConfig(emptyConfig)
      expect(errors).toContain('Import source is required')
      expect(errors).toContain('Model ID is required')
      expect(errors).toContain('Model name is required')
      expect(errors).toHaveLength(3)
    })

    test('should allow non-Hugging Face sources without format validation', () => {
      const ociConfig = {
        source: 'oci',
        modelId: 'registry.example.com/model:latest',
        name: 'OCI Model'
      }
      expect(validateImportConfig(ociConfig)).toEqual([])
    })

    test('should validate valid Hugging Face model ID formats', () => {
      const validConfigs = [
        { source: 'huggingface', modelId: 'bert-base-uncased', name: 'BERT' }, // This should fail
        { source: 'huggingface', modelId: 'google/bert-base-uncased', name: 'BERT' },
        { source: 'huggingface', modelId: 'microsoft/DialoGPT-medium', name: 'DialoGPT' },
        { source: 'huggingface', modelId: 'openai/clip-vit-base-patch32', name: 'CLIP' }
      ]
      
      expect(validateImportConfig(validConfigs[0]).length).toBeGreaterThan(0) // Should have error
      expect(validateImportConfig(validConfigs[1])).toEqual([])
      expect(validateImportConfig(validConfigs[2])).toEqual([])
      expect(validateImportConfig(validConfigs[3])).toEqual([])
    })
  })

  describe('formatDuration', () => {
    test('should format seconds correctly', () => {
      expect(formatDuration(5000)).toBe('5s')
      expect(formatDuration(30000)).toBe('30s')
      expect(formatDuration(59000)).toBe('59s')
    })

    test('should format minutes correctly', () => {
      expect(formatDuration(60000)).toBe('1m 0s')
      expect(formatDuration(90000)).toBe('1m 30s')
      expect(formatDuration(3540000)).toBe('59m 0s')
    })

    test('should format hours correctly', () => {
      expect(formatDuration(3600000)).toBe('1h 0m')
      expect(formatDuration(5400000)).toBe('1h 30m')
      expect(formatDuration(7200000)).toBe('2h 0m')
    })

    test('should format days correctly', () => {
      expect(formatDuration(86400000)).toBe('1d 0h')
      expect(formatDuration(90000000)).toBe('1d 1h')
      expect(formatDuration(172800000)).toBe('2d 0h')
    })

    test('should handle zero and very small durations', () => {
      expect(formatDuration(0)).toBe('0s')
      expect(formatDuration(999)).toBe('0s')
      expect(formatDuration(1001)).toBe('1s')
    })
  })
})
