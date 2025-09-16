import React from 'react'

export type Role = 'data-scientist' | 'ai-engineer' | 'site-engineer' | 'developer'

export interface RoleConfig {
  id: Role
  name: string
  description: string
  icon: React.ReactNode
  color: string
}

export interface ModelInfo {
  id: string
  name: string
  version: string
  type: string
  parameters: string
  apiUrl: string
  status: 'active' | 'inactive' | 'updating'
  accuracy?: string
  latency?: string
  description: string
}

export interface Fleet {
  id: string
  name: string
  description: string
  deviceCount: number
  deviceSpecs: {
    cpu: number // cores
    memory: number // GB
    storage: number // GB
  }
  models: ModelInfo[]
}

export interface PerformanceMetrics {
  timestamp: number
  cpuUsage: number
  memoryUsage: number
  latency: number
  throughput: number
  errorRate: number
}

export interface ModelMonitoringInfo extends ModelInfo {
  currentMetrics: {
    cpuUsage: number
    memoryUsage: number
    avgLatency: number
    throughput: number
    errorRate: number
    uptime: number
  }
  historicalData: PerformanceMetrics[]
  deviceHealth: {
    healthy: number
    warning: number
    error: number
  }
}

export interface AvailableModel {
  id: string
  name: string
  version: string
  type: string
  description: string
  publishedBy: string
  publishDate: string
  modelSize: string
  requirements: {
    minCpu: string
    minMemory: string
    minStorage: string
  }
  deploymentStatus: {
    [fleetId: string]: {
      status: 'deployed' | 'deploying' | 'failed' | 'not-deployed'
      deployedVersion?: string
      lastDeployed?: string
      deviceCount?: number
    }
  }
  compatibleFleets: string[]
}

export interface ModelDeployment {
  id: string
  deploymentName: string
  modelName: string
  modelVersion: string
  fleetName: string
  fleetId: string
  status: 'active' | 'deploying' | 'failed' | 'stopped' | 'updating'
  deployedDate: string
  deviceCount: number
  successfulDevices: number
  failedDevices: number
  lastUpdated: string
}

export interface ModelVersion {
  id: string
  version: string
  createdDate: string
  status: 'draft' | 'ready' | 'published' | 'deprecated' | 'unpublished'
  accuracy?: string
  modelSize: string
  trainingDataset: string
  lastEvaluated?: string
  evaluations: {
    accuracy: number
    precision: number
    recall: number
    f1Score: number
    bias: number
    fairness: number
    latency: number
  }
  artifacts: {
    modelFile: string
    configFile: string
    requirementsFile: string
  }
  publishedDate?: string
  unpublishedDate?: string
}

export interface ModelFamily {
  id: string
  name: string
  type: string
  framework: string
  description: string
  developedBy: string
  versions: ModelVersion[]
  currentVersion?: string // latest/active version
}

export interface ModelEvaluation {
  id: string
  modelId: string
  modelName: string
  modelVersion: string
  evaluationType: 'accuracy' | 'bias' | 'fairness' | 'performance' | 'robustness'
  status: 'running' | 'completed' | 'failed' | 'queued'
  startedDate: string
  completedDate?: string
  executedBy: string
  dataset: string
  metrics: {
    overall: number
    detailed: Record<string, number>
  }
  report?: string
}

export interface Dataset {
  id: string
  name: string
  description: string
  type: 'training' | 'validation' | 'test' | 'production' 
  format: 'CSV' | 'JSON' | 'Parquet' | 'HDF5' | 'TFRecord' | 'Images' | 'Text'
  size: string
  recordCount: number
  createdBy: string
  createdDate: string
  lastModified: string
  version: string
  tags: string[]
  schema: {
    columns: number
    features: string[]
    target?: string
  }
  storage: {
    location: string
    checksum: string
  }
  quality: {
    score: number
    issues: string[]
    lastValidated: string
  }
  usage: {
    accessCount: number
    lastAccessed: string
    usedByModels: string[]
  }
}
