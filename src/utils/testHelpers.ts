// Test helper utilities for the MLOps platform

/**
 * Validates if a role ID is valid
 */
export const isValidRole = (roleId: string): boolean => {
  const validRoles = ['data-scientist', 'ai-engineer', 'site-engineer', 'developer']
  return validRoles.includes(roleId)
}

/**
 * Formats model parameters for display
 */
export const formatModelParameters = (params: string): string => {
  if (!params) return 'Unknown'
  
  // Handle different parameter formats
  if (params.toLowerCase().includes('m')) {
    return params.toUpperCase()
  }
  if (params.toLowerCase().includes('b')) {
    return params.toUpperCase()
  }
  if (params.toLowerCase().includes('k')) {
    return params.toUpperCase()
  }
  
  return params
}

/**
 * Calculates deployment success rate
 */
export const calculateSuccessRate = (successful: number, failed: number): number => {
  const total = successful + failed
  if (total === 0) return 0
  return Math.round((successful / total) * 100)
}

/**
 * Validates model configuration
 */
export const validateModelConfig = (config: {
  name: string
  description: string
  type: string
  framework: string
}): string[] => {
  const errors: string[] = []
  
  if (!config.name || config.name.trim().length === 0) {
    errors.push('Model name is required')
  }
  
  if (!config.description || config.description.trim().length === 0) {
    errors.push('Model description is required')
  }
  
  if (!config.type || config.type.trim().length === 0) {
    errors.push('Model type is required')
  }
  
  if (!config.framework || config.framework.trim().length === 0) {
    errors.push('Model framework is required')
  }
  
  return errors
}

/**
 * Generates a unique model ID
 */
export const generateModelId = (name: string, timestamp?: number): string => {
  const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, '-')
  const time = timestamp || Date.now()
  return `${cleanName}-${time.toString().slice(-6)}`
}

/**
 * Formats file size for display
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B'
  
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

/**
 * Calculates dataset quality score
 */
export const calculateDataQuality = (metrics: {
  completeness: number
  validity: number
  consistency: number
}): number => {
  const { completeness, validity, consistency } = metrics
  return Math.round((completeness + validity + consistency) / 3)
}

/**
 * Validates import configuration
 */
export const validateImportConfig = (config: {
  source: string
  modelId: string
  name: string
}): string[] => {
  const errors: string[] = []
  
  if (!config.source || config.source.trim().length === 0) {
    errors.push('Import source is required')
  }
  
  if (!config.modelId || config.modelId.trim().length === 0) {
    errors.push('Model ID is required')
  }
  
  if (!config.name || config.name.trim().length === 0) {
    errors.push('Model name is required')
  }
  
  // Validate Hugging Face model ID format
  if (config.source === 'huggingface' && config.modelId) {
    const hfPattern = /^[a-zA-Z0-9_-]+\/[a-zA-Z0-9_.-]+$/
    if (!hfPattern.test(config.modelId)) {
      errors.push('Hugging Face model ID must be in format: organization/model-name')
    }
  }
  
  return errors
}

/**
 * Formats duration for display
 */
export const formatDuration = (milliseconds: number): string => {
  const seconds = Math.floor(milliseconds / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  
  if (days > 0) return `${days}d ${hours % 24}h`
  if (hours > 0) return `${hours}h ${minutes % 60}m`
  if (minutes > 0) return `${minutes}m ${seconds % 60}s`
  return `${seconds}s`
}
