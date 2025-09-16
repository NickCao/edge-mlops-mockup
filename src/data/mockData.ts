import React from 'react'
import { 
  UserIcon,
  CogIcon,
  RocketIcon,
  CodeIcon,
} from '@patternfly/react-icons'

import {
  RoleConfig,
  Fleet,
  ModelMonitoringInfo,
  AvailableModel,
  ModelFamily,
  ModelEvaluation,
  ModelDeployment,
  Dataset,
  PerformanceMetrics,
  Role
} from '../types'

export const roles: RoleConfig[] = [
  {
    id: 'data-scientist',
    name: 'Data Scientist',
    description: 'Train and experiment with models',
    icon: React.createElement(UserIcon),
    color: '#06c'
  },
  {
    id: 'ai-engineer',
    name: 'AI Engineer',
    description: 'Publish and monitor models',
    icon: React.createElement(CogIcon),
    color: '#3e8635'
  },
  {
    id: 'site-engineer',
    name: 'Site Engineer',
    description: 'Deploy models to edge devices',
    icon: React.createElement(RocketIcon),
    color: '#c9190b'
  },
  {
    id: 'developer',
    name: 'Developer',
    description: 'Consume models via APIs',
    icon: React.createElement(CodeIcon),
    color: '#8440f2'
  }
]

// Generate mock historical data for the last 24 hours
export const generateHistoricalData = (baseLatency: number, baseCpu: number, baseMemory: number): PerformanceMetrics[] => {
  const data: PerformanceMetrics[] = []
  const now = Date.now()
  
  for (let i = 23; i >= 0; i--) {
    const timestamp = now - (i * 60 * 60 * 1000) // Every hour
    data.push({
      timestamp,
      cpuUsage: Math.max(0, Math.min(100, baseCpu + (Math.random() - 0.5) * 20)),
      memoryUsage: Math.max(0, Math.min(100, baseMemory + (Math.random() - 0.5) * 15)),
      latency: Math.max(1, baseLatency + (Math.random() - 0.5) * 10),
      throughput: Math.max(0, 1000 + (Math.random() - 0.5) * 200),
      errorRate: Math.max(0, Math.min(10, Math.random() * 2))
    })
  }
  
  return data
}

// I'll add the rest of the mock data in smaller chunks to avoid hitting file size limits
// This will be completed in the next step
