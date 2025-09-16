// Data transformation utilities for the MLOps platform

import type { 
  ModelInfo, 
  Fleet, 
  Dataset, 
  PerformanceMetrics, 
  ModelEvaluation,
  ModelDeployment 
} from '../types'

/**
 * Transforms raw model data into display format
 */
export const transformModelForDisplay = (model: ModelInfo): {
  displayName: string
  statusBadge: 'success' | 'warning' | 'danger'
  parametersFormatted: string
  performanceScore?: number
} => {
  const displayName = `${model.name} v${model.version}`
  
  let statusBadge: 'success' | 'warning' | 'danger'
  switch (model.status) {
    case 'active':
      statusBadge = 'success'
      break
    case 'updating':
      statusBadge = 'warning'
      break
    case 'inactive':
      statusBadge = 'danger'
      break
    default:
      statusBadge = 'warning'
  }

  const parametersFormatted = model.parameters.toUpperCase()
  
  // Calculate performance score if accuracy is available
  let performanceScore: number | undefined
  if (model.accuracy) {
    const accuracyValue = parseFloat(model.accuracy.replace('%', ''))
    performanceScore = Math.round(accuracyValue)
  }

  return {
    displayName,
    statusBadge,
    parametersFormatted,
    performanceScore
  }
}

/**
 * Calculates fleet utilization statistics
 */
export const calculateFleetUtilization = (fleets: Fleet[]): {
  totalDevices: number
  averageCpu: number
  averageMemory: number
  averageStorage: number
  utilizationScore: number
} => {
  if (fleets.length === 0) {
    return {
      totalDevices: 0,
      averageCpu: 0,
      averageMemory: 0,
      averageStorage: 0,
      utilizationScore: 0
    }
  }

  const totalDevices = fleets.reduce((sum, fleet) => sum + fleet.deviceCount, 0)
  const avgCpu = fleets.reduce((sum, fleet) => sum + fleet.deviceSpecs.cpu, 0) / fleets.length
  const avgMemory = fleets.reduce((sum, fleet) => sum + fleet.deviceSpecs.memory, 0) / fleets.length
  const avgStorage = fleets.reduce((sum, fleet) => sum + fleet.deviceSpecs.storage, 0) / fleets.length

  // Calculate utilization score based on resource allocation
  const utilizationScore = Math.min(100, Math.round((avgCpu + avgMemory / 10 + avgStorage / 100) / 3))

  return {
    totalDevices,
    averageCpu: Math.round(avgCpu),
    averageMemory: Math.round(avgMemory),
    averageStorage: Math.round(avgStorage),
    utilizationScore
  }
}

/**
 * Aggregates performance metrics over time
 */
export const aggregatePerformanceMetrics = (metrics: PerformanceMetrics[]): {
  avgCpuUsage: number
  avgMemoryUsage: number
  avgLatency: number
  avgThroughput: number
  avgErrorRate: number
  trends: {
    cpu: 'improving' | 'stable' | 'degrading'
    memory: 'improving' | 'stable' | 'degrading'
    latency: 'improving' | 'stable' | 'degrading'
  }
} => {
  if (metrics.length === 0) {
    return {
      avgCpuUsage: 0,
      avgMemoryUsage: 0,
      avgLatency: 0,
      avgThroughput: 0,
      avgErrorRate: 0,
      trends: {
        cpu: 'stable',
        memory: 'stable',
        latency: 'stable'
      }
    }
  }

  const avgCpuUsage = metrics.reduce((sum, m) => sum + m.cpuUsage, 0) / metrics.length
  const avgMemoryUsage = metrics.reduce((sum, m) => sum + m.memoryUsage, 0) / metrics.length
  const avgLatency = metrics.reduce((sum, m) => sum + m.latency, 0) / metrics.length
  const avgThroughput = metrics.reduce((sum, m) => sum + m.throughput, 0) / metrics.length
  const avgErrorRate = metrics.reduce((sum, m) => sum + m.errorRate, 0) / metrics.length

  // Calculate trends by comparing first and last quarter of data
  const quarterSize = Math.floor(metrics.length / 4)
  if (quarterSize < 1) {
    return {
      avgCpuUsage: Math.round(avgCpuUsage * 100) / 100,
      avgMemoryUsage: Math.round(avgMemoryUsage * 100) / 100,
      avgLatency: Math.round(avgLatency * 100) / 100,
      avgThroughput: Math.round(avgThroughput),
      avgErrorRate: Math.round(avgErrorRate * 10000) / 10000,
      trends: {
        cpu: 'stable',
        memory: 'stable',
        latency: 'stable'
      }
    }
  }

  const firstQuarter = metrics.slice(0, quarterSize)
  const lastQuarter = metrics.slice(-quarterSize)

  const firstQuarterCpu = firstQuarter.reduce((sum, m) => sum + m.cpuUsage, 0) / firstQuarter.length
  const lastQuarterCpu = lastQuarter.reduce((sum, m) => sum + m.cpuUsage, 0) / lastQuarter.length

  const firstQuarterMemory = firstQuarter.reduce((sum, m) => sum + m.memoryUsage, 0) / firstQuarter.length
  const lastQuarterMemory = lastQuarter.reduce((sum, m) => sum + m.memoryUsage, 0) / lastQuarter.length

  const firstQuarterLatency = firstQuarter.reduce((sum, m) => sum + m.latency, 0) / firstQuarter.length
  const lastQuarterLatency = lastQuarter.reduce((sum, m) => sum + m.latency, 0) / lastQuarter.length

  const cpuTrend = Math.abs(lastQuarterCpu - firstQuarterCpu) < 2 ? 'stable' : 
    lastQuarterCpu < firstQuarterCpu ? 'improving' : 'degrading'
  
  const memoryTrend = Math.abs(lastQuarterMemory - firstQuarterMemory) < 2 ? 'stable' :
    lastQuarterMemory < firstQuarterMemory ? 'improving' : 'degrading'
  
  const latencyTrend = Math.abs(lastQuarterLatency - firstQuarterLatency) < 1 ? 'stable' :
    lastQuarterLatency < firstQuarterLatency ? 'improving' : 'degrading'

  return {
    avgCpuUsage: Math.round(avgCpuUsage * 100) / 100,
    avgMemoryUsage: Math.round(avgMemoryUsage * 100) / 100,
    avgLatency: Math.round(avgLatency * 100) / 100,
    avgThroughput: Math.round(avgThroughput),
    avgErrorRate: Math.round(avgErrorRate * 10000) / 10000,
    trends: {
      cpu: cpuTrend,
      memory: memoryTrend,
      latency: latencyTrend
    }
  }
}

/**
 * Processes dataset statistics for analysis
 */
export const processDatasetStats = (datasets: Dataset[]): {
  totalSize: number
  totalRecords: number
  formatDistribution: { [format: string]: number }
  qualityDistribution: { excellent: number; good: number; needsWork: number }
  typeDistribution: { [type: string]: number }
  avgQualityScore: number
} => {
  if (datasets.length === 0) {
    return {
      totalSize: 0,
      totalRecords: 0,
      formatDistribution: {},
      qualityDistribution: { excellent: 0, good: 0, needsWork: 0 },
      typeDistribution: {},
      avgQualityScore: 0
    }
  }

  const totalRecords = datasets.reduce((sum, d) => sum + d.recordCount, 0)
  
  // Calculate total size (convert size strings to bytes for calculation)
  const totalSize = datasets.reduce((sum, d) => {
    const sizeStr = d.size.toLowerCase()
    if (sizeStr.includes('gb')) {
      return sum + parseFloat(sizeStr) * 1024 * 1024 * 1024
    } else if (sizeStr.includes('mb')) {
      return sum + parseFloat(sizeStr) * 1024 * 1024
    } else if (sizeStr.includes('kb')) {
      return sum + parseFloat(sizeStr) * 1024
    }
    return sum + parseFloat(sizeStr)
  }, 0)

  // Format distribution
  const formatDistribution: { [format: string]: number } = {}
  datasets.forEach(d => {
    formatDistribution[d.format] = (formatDistribution[d.format] || 0) + 1
  })

  // Type distribution
  const typeDistribution: { [type: string]: number } = {}
  datasets.forEach(d => {
    typeDistribution[d.type] = (typeDistribution[d.type] || 0) + 1
  })

  // Quality distribution
  const qualityDistribution = { excellent: 0, good: 0, needsWork: 0 }
  datasets.forEach(d => {
    if (d.quality.score >= 90) {
      qualityDistribution.excellent++
    } else if (d.quality.score >= 70) {
      qualityDistribution.good++
    } else {
      qualityDistribution.needsWork++
    }
  })

  const avgQualityScore = datasets.reduce((sum, d) => sum + d.quality.score, 0) / datasets.length

  return {
    totalSize,
    totalRecords,
    formatDistribution,
    qualityDistribution,
    typeDistribution,
    avgQualityScore: Math.round(avgQualityScore * 100) / 100
  }
}

/**
 * Evaluates model deployment health
 */
export const evaluateDeploymentHealth = (deployments: ModelDeployment[]): {
  overallHealthScore: number
  healthyDeployments: number
  unhealthyDeployments: number
  totalDevicesDeployed: number
  averageSuccessRate: number
  recommendations: string[]
} => {
  if (deployments.length === 0) {
    return {
      overallHealthScore: 0,
      healthyDeployments: 0,
      unhealthyDeployments: 0,
      totalDevicesDeployed: 0,
      averageSuccessRate: 0,
      recommendations: ['No deployments found']
    }
  }

  const totalDevicesDeployed = deployments.reduce((sum, d) => sum + d.deviceCount, 0)
  const totalSuccessfulDevices = deployments.reduce((sum, d) => sum + d.successfulDevices, 0)
  const averageSuccessRate = (totalSuccessfulDevices / totalDevicesDeployed) * 100

  let healthyDeployments = 0
  let unhealthyDeployments = 0
  const recommendations: string[] = []

  deployments.forEach(deployment => {
    const successRate = (deployment.successfulDevices / deployment.deviceCount) * 100
    
    if (successRate >= 95 && deployment.status === 'active') {
      healthyDeployments++
    } else {
      unhealthyDeployments++
      
      if (deployment.status === 'failed') {
        recommendations.push(`Investigate failed deployment: ${deployment.deploymentName}`)
      } else if (successRate < 80) {
        recommendations.push(`Low success rate (${Math.round(successRate)}%) for: ${deployment.deploymentName}`)
      } else if (deployment.failedDevices > 0) {
        recommendations.push(`${deployment.failedDevices} device failures in: ${deployment.deploymentName}`)
      }
    }
  })

  // Calculate overall health score
  const activeHealthyRate = (healthyDeployments / deployments.length) * 100
  const deviceSuccessRate = averageSuccessRate
  const overallHealthScore = Math.round((activeHealthyRate + deviceSuccessRate) / 2)

  // Add general recommendations
  if (overallHealthScore < 70) {
    recommendations.push('Consider reviewing deployment strategy and rollback procedures')
  }
  if (averageSuccessRate < 90) {
    recommendations.push('Investigate device compatibility and network connectivity issues')
  }

  return {
    overallHealthScore,
    healthyDeployments,
    unhealthyDeployments,
    totalDevicesDeployed,
    averageSuccessRate: Math.round(averageSuccessRate * 100) / 100,
    recommendations: [...new Set(recommendations)] // Remove duplicates
  }
}

/**
 * Converts various time formats to milliseconds
 */
export const parseTimeToMilliseconds = (timeStr: string): number => {
  if (typeof timeStr !== 'string' || !timeStr) return 0
  
  const timeStr_lower = timeStr.toLowerCase().trim()
  
  if (timeStr_lower.includes('ms')) {
    const parsed = parseFloat(timeStr_lower)
    return isNaN(parsed) ? 0 : Math.max(0, parsed)
  } else if (timeStr_lower.includes('s') && !timeStr_lower.includes('ms')) {
    const parsed = parseFloat(timeStr_lower) * 1000
    return isNaN(parsed) ? 0 : Math.max(0, parsed)
  } else if (timeStr_lower.includes('m') && !timeStr_lower.includes('ms')) {
    const parsed = parseFloat(timeStr_lower) * 60 * 1000
    return isNaN(parsed) ? 0 : Math.max(0, parsed)
  } else if (timeStr_lower.includes('h')) {
    const parsed = parseFloat(timeStr_lower) * 60 * 60 * 1000
    return isNaN(parsed) ? 0 : Math.max(0, parsed)
  } else if (timeStr_lower.includes('d')) {
    const parsed = parseFloat(timeStr_lower) * 24 * 60 * 60 * 1000
    return isNaN(parsed) ? 0 : Math.max(0, parsed)
  }
  
  // Default to treating as milliseconds
  const parsed = parseFloat(timeStr_lower)
  return isNaN(parsed) ? 0 : Math.max(0, parsed)
}

/**
 * Sanitizes user input for safe display
 */
export const sanitizeUserInput = (input: string): string => {
  if (typeof input !== 'string') {
    return ''
  }
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+\s*=/gi, '') // Remove event handlers (with optional whitespace)
    .slice(0, 1000) // Limit length
}

/**
 * Validates email format
 */
export const validateEmail = (email: string): boolean => {
  if (typeof email !== 'string') return false
  
  // More strict email validation that rejects double dots
  const emailRegex = /^[^\s@.]+[^\s@]*@[^\s@]+\.[^\s@]+$/
  const hasDoubleDot = email.includes('..')
  
  return emailRegex.test(email) && !hasDoubleDot
}

/**
 * Generates performance summary report
 */
export const generatePerformanceSummary = (
  models: ModelInfo[],
  fleets: Fleet[],
  metrics: PerformanceMetrics[]
): {
  summary: string
  score: number
  recommendations: string[]
  alerts: string[]
} => {
  const activeModels = models.filter(m => m.status === 'active').length
  const fleetStats = calculateFleetUtilization(fleets)
  const perfStats = aggregatePerformanceMetrics(metrics)
  
  let score = 0
  const recommendations: string[] = []
  const alerts: string[] = []
  
  // Calculate score based on various factors
  if (activeModels > 0) score += 20
  if (fleetStats.utilizationScore > 70) score += 20
  if (perfStats.avgCpuUsage < 80) score += 20
  if (perfStats.avgMemoryUsage < 80) score += 20
  if (perfStats.avgErrorRate < 0.01) score += 20
  
  // Generate recommendations
  if (activeModels === 0) {
    alerts.push('No active models found')
  } else if (activeModels < 3) {
    recommendations.push('Consider activating more models for redundancy')
  }
  
  if (fleetStats.utilizationScore < 50) {
    recommendations.push('Fleet utilization is low - consider optimizing resource allocation')
  }
  
  if (perfStats.avgCpuUsage > 90) {
    alerts.push('High CPU usage detected - consider scaling resources')
  }
  
  if (perfStats.avgErrorRate > 0.05) {
    alerts.push('High error rate detected - investigate system reliability')
  }
  
  const summary = `System running with ${activeModels} active models across ${fleets.length} fleets. ` +
    `Average CPU usage: ${perfStats.avgCpuUsage.toFixed(1)}%, ` +
    `Memory usage: ${perfStats.avgMemoryUsage.toFixed(1)}%, ` +
    `Error rate: ${(perfStats.avgErrorRate * 100).toFixed(3)}%`
  
  return {
    summary,
    score,
    recommendations,
    alerts
  }
}
