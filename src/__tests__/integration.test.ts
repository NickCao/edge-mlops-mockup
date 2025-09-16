import { describe, test, expect } from "bun:test"
import { roles } from '../data/mockData'
import { isValidRole, validateModelConfig, validateImportConfig } from '../utils/testHelpers'
import type { Role, RoleConfig } from '../types'

describe('Integration Tests', () => {
  describe('Role Integration', () => {
    test('should have consistent roles between mockData and validation', () => {
      // Test that all roles in mockData are considered valid
      roles.forEach(role => {
        expect(isValidRole(role.id)).toBe(true)
      })
    })

    test('should have all expected role properties', () => {
      const expectedRoleIds: Role[] = ['data-scientist', 'ai-engineer', 'site-engineer', 'developer']
      
      // Verify all expected roles exist in mock data
      expectedRoleIds.forEach(expectedId => {
        const role = roles.find(r => r.id === expectedId)
        expect(role).toBeDefined()
        expect(role?.name).toBeDefined()
        expect(role?.description).toBeDefined()
        expect(role?.color).toBeDefined()
      })
    })

    test('should have unique role colors', () => {
      const colors = roles.map(role => role.color)
      const uniqueColors = new Set(colors)
      expect(uniqueColors.size).toBe(colors.length)
    })

    test('should have descriptive role names', () => {
      roles.forEach(role => {
        expect(role.name.length).toBeGreaterThan(5) // Reasonable name length
        expect(role.name).not.toBe(role.id) // Name should be different from ID
        expect(role.description.length).toBeGreaterThan(10) // Descriptive description
      })
    })
  })

  describe('Model Configuration Integration', () => {
    test('should validate complete model workflow', () => {
      const modelConfig = {
        name: 'Customer Sentiment Classifier',
        description: 'Advanced sentiment analysis model for customer feedback',
        type: 'text-classification',
        framework: 'pytorch'
      }

      const errors = validateModelConfig(modelConfig)
      expect(errors).toHaveLength(0)
    })

    test('should handle model configuration edge cases', () => {
      const edgeCases = [
        {
          name: 'A', // Very short name
          description: 'Valid description',
          type: 'classification',
          framework: 'pytorch'
        },
        {
          name: 'Very long model name that might be used in some cases but should still be valid',
          description: 'Valid description',
          type: 'classification',
          framework: 'tensorflow'
        }
      ]

      edgeCases.forEach(config => {
        const errors = validateModelConfig(config)
        expect(errors).toHaveLength(0) // All should be valid
      })
    })
  })

  describe('Import Configuration Integration', () => {
    test('should validate Hugging Face Hub integration', () => {
      const hfConfigs = [
        {
          source: 'huggingface',
          modelId: 'microsoft/DialoGPT-medium',
          name: 'DialoGPT Conversational Model'
        },
        {
          source: 'huggingface',
          modelId: 'google/bert-base-uncased',
          name: 'BERT Base Model'
        },
        {
          source: 'huggingface',
          modelId: 'openai/clip-vit-base-patch32',
          name: 'CLIP Vision-Text Model'
        }
      ]

      hfConfigs.forEach(config => {
        const errors = validateImportConfig(config)
        expect(errors).toHaveLength(0)
      })
    })

    test('should validate OCI Registry integration', () => {
      const ociConfigs = [
        {
          source: 'oci',
          modelId: 'registry.example.com/models/sentiment:v1.0.0',
          name: 'Sentiment Analysis OCI Model'
        },
        {
          source: 'oci',
          modelId: 'docker.io/myorg/custom-model:latest',
          name: 'Custom Docker Model'
        }
      ]

      ociConfigs.forEach(config => {
        const errors = validateImportConfig(config)
        expect(errors).toHaveLength(0)
      })
    })

    test('should reject invalid Hugging Face model IDs', () => {
      const invalidHfConfigs = [
        {
          source: 'huggingface',
          modelId: 'invalid-format', // Missing organization/
          name: 'Invalid Model'
        },
        {
          source: 'huggingface',
          modelId: 'org/', // Missing model name
          name: 'Invalid Model 2'
        },
        {
          source: 'huggingface',
          modelId: '/model-name', // Missing organization
          name: 'Invalid Model 3'
        }
      ]

      invalidHfConfigs.forEach(config => {
        const errors = validateImportConfig(config)
        expect(errors.length).toBeGreaterThan(0)
        expect(errors.some(error => error.includes('Hugging Face model ID must be in format'))).toBe(true)
      })
    })
  })

  describe('Data Type Consistency', () => {
    test('should maintain consistent data types across mock data', () => {
      const roleTypes = roles.map(role => ({
        id: typeof role.id,
        name: typeof role.name,
        description: typeof role.description,
        color: typeof role.color
      }))

      // All roles should have consistent types
      roleTypes.forEach(roleType => {
        expect(roleType.id).toBe('string')
        expect(roleType.name).toBe('string')
        expect(roleType.description).toBe('string')
        expect(roleType.color).toBe('string')
      })
    })

    test('should have consistent role ID format', () => {
      roles.forEach(role => {
        expect(role.id).toMatch(/^[a-z-]+$/) // Only lowercase letters and hyphens
        expect(role.id).not.toContain('_') // No underscores
        expect(role.id).not.toContain(' ') // No spaces
        expect(role.id.length).toBeGreaterThan(3) // Reasonable minimum length
      })
    })
  })

  describe('Cross-Component Validation', () => {
    test('should validate model creation to import workflow', () => {
      // Test creating a model and then validating it could be imported
      const createdModel = {
        name: 'My Custom Model',
        description: 'A custom trained model',
        type: 'classification',
        framework: 'pytorch'
      }

      const createErrors = validateModelConfig(createdModel)
      expect(createErrors).toHaveLength(0)

      // Simulate importing the same model
      const importConfig = {
        source: 'oci',
        modelId: 'registry.local/my-custom-model:v1',
        name: createdModel.name
      }

      const importErrors = validateImportConfig(importConfig)
      expect(importErrors).toHaveLength(0)
    })

    test('should maintain consistency between validation rules', () => {
      // Test that the same validation rules apply consistently
      const testConfig = {
        name: '   ', // Whitespace only
        description: 'Valid description',
        type: 'valid-type',
        framework: 'pytorch'
      }

      const errors = validateModelConfig(testConfig)
      expect(errors).toContain('Model name is required')
      expect(errors.length).toBe(1) // Only one error for name
    })
  })

  describe('Error Message Consistency', () => {
    test('should provide consistent error message format', () => {
      const invalidModel = {
        name: '',
        description: '',
        type: '',
        framework: ''
      }

      const modelErrors = validateModelConfig(invalidModel)
      
      // All error messages should follow consistent pattern
      modelErrors.forEach(error => {
        expect(error).toMatch(/^[A-Z]/) // Start with capital letter
        expect(error.endsWith('is required')).toBe(true) // End with 'is required'
        expect(error.includes('Model')).toBe(true) // Include context
      })
    })

    test('should provide consistent import error messages', () => {
      const invalidImport = {
        source: '',
        modelId: '',
        name: ''
      }

      const importErrors = validateImportConfig(invalidImport)
      
      // All error messages should follow consistent pattern
      importErrors.forEach(error => {
        expect(error).toMatch(/^[A-Z]/) // Start with capital letter
        expect(error.endsWith('is required')).toBe(true) // End with 'is required'
      })
    })
  })

  describe('Performance Validation', () => {
    test('should handle large validation workloads efficiently', () => {
      const startTime = Date.now()
      
      // Validate 100 models
      for (let i = 0; i < 100; i++) {
        const config = {
          name: `Model ${i}`,
          description: `Description for model ${i}`,
          type: 'classification',
          framework: 'pytorch'
        }
        validateModelConfig(config)
      }
      
      const endTime = Date.now()
      const duration = endTime - startTime
      
      // Should complete within reasonable time (less than 1 second for 100 validations)
      expect(duration).toBeLessThan(1000)
    })

    test('should handle role validation efficiently', () => {
      const startTime = Date.now()
      
      // Validate 1000 roles
      for (let i = 0; i < 1000; i++) {
        isValidRole('data-scientist')
        isValidRole('invalid-role')
      }
      
      const endTime = Date.now()
      const duration = endTime - startTime
      
      // Should complete very quickly (less than 100ms for 1000 validations)
      expect(duration).toBeLessThan(100)
    })
  })
})
