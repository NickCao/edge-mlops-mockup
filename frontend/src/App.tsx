import React from 'react'
import { 
  Page, 
  Masthead, 
  MastheadMain, 
  MastheadContent, 
  Nav, 
  NavList, 
  NavItem, 
  NavGroup, 
  Card, 
  CardBody, 
  CardTitle, 
  CardHeader, 
  Gallery, 
  GalleryItem, 
  Button, 
  Alert, 
  Flex, 
  FlexItem, 
  PageSection, 
  Sidebar, 
  PageSidebar, 
  Dropdown, 
  DropdownList, 
  DropdownItem, 
  MenuToggle, 
  Title, 
  Divider, 
  Label, 
  Badge, 
  Split, 
  SplitItem, 
  DescriptionList, 
  DescriptionListGroup, 
  DescriptionListTerm, 
  DescriptionListDescription, 
  Modal,
  ModalVariant,
  Form,
  FormGroup,
  TextInput,
  FormSelect,
  FormSelectOption,
} from '@patternfly/react-core'
import { Table, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table'
import {
  CaretDownIcon,
  UserIcon,
  CogIcon,
  CodeIcon,
  RocketIcon,
  HomeIcon,
  FlaskIcon,
  DatabaseIcon,
  PlayIcon,
  BookIcon,
  RepositoryIcon,
  CloudIcon,
  MonitoringIcon,
  TopologyIcon,
  CubeIcon,
  ServerIcon,
  HeartIcon,
  UsersIcon,
  ExternalLinkAltIcon,
  FileIcon,
  KeyIcon,
  ChartBarIcon,
} from '@patternfly/react-icons'
import { VictoryChart, VictoryLine, VictoryAxis, VictoryArea, VictoryBar, VictoryPie } from 'victory'

type Role = 'data-scientist' | 'ai-engineer' | 'site-engineer' | 'developer'

interface RoleConfig {
  id: Role
  name: string
  description: string
  icon: React.ReactNode
  color: string
}

const roles: RoleConfig[] = [
  {
    id: 'data-scientist',
    name: 'Data Scientist',
    description: 'Train and experiment with models',
    icon: <UserIcon />,
    color: '#06c'
  },
  {
    id: 'ai-engineer',
    name: 'AI Engineer',
    description: 'Publish and monitor models',
    icon: <CogIcon />,
    color: '#3e8635'
  },
  {
    id: 'site-engineer',
    name: 'Site Engineer',
    description: 'Deploy models to edge devices',
    icon: <RocketIcon />,
    color: '#c9190b'
  },
  {
    id: 'developer',
    name: 'Developer',
    description: 'Consume models via APIs',
    icon: <CodeIcon />,
    color: '#8440f2'
  }
]

interface ModelInfo {
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

interface Fleet {
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

interface PerformanceMetrics {
  timestamp: number
  cpuUsage: number
  memoryUsage: number
  latency: number
  throughput: number
  errorRate: number
}

interface ModelMonitoringInfo extends ModelInfo {
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

interface AvailableModel {
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

interface ModelDeployment {
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

const mockFleets: Fleet[] = [
  {
    id: 'edge-retail',
    name: 'Retail Edge Fleet',
    description: 'Point-of-sale and inventory management devices',
    deviceCount: 45,
    deviceSpecs: {
      cpu: 2, // 2 cores
      memory: 4, // 4GB RAM
      storage: 2 // 2GB storage
    },
    models: [
      {
        id: 'prod-classifier-v2',
        name: 'Product Classifier',
        version: 'v2.1.3',
        type: 'Classification',
        parameters: '50M params',
        apiUrl: 'http://localhost:8080/api/v1/classify',
        status: 'active',
        accuracy: '94.2%',
        latency: '12ms',
        description: 'Real-time product identification from camera feeds'
      },
      {
        id: 'inventory-pred-v1',
        name: 'Inventory Predictor',
        version: 'v1.2.0',
        type: 'Regression',
        parameters: '25M params',
        apiUrl: 'http://localhost:8081/api/v1/predict',
        status: 'active',
        accuracy: '91.8%',
        latency: '8ms',
        description: 'Predict inventory demand based on historical data'
      }
    ]
  },
  {
    id: 'manufacturing-iot',
    name: 'Manufacturing IoT Fleet',
    description: 'Factory floor sensors and quality control systems',
    deviceCount: 128,
    deviceSpecs: {
      cpu: 4, // 4 cores
      memory: 8, // 8GB RAM
      storage: 4 // 4GB storage
    },
    models: [
      {
        id: 'anomaly-detector-v3',
        name: 'Anomaly Detector',
        version: 'v3.0.1',
        type: 'Anomaly Detection',
        parameters: '35M params',
        apiUrl: 'http://localhost:8082/api/v1/detect',
        status: 'active',
        accuracy: '97.5%',
        latency: '5ms',
        description: 'Detect equipment anomalies from sensor data'
      },
      {
        id: 'quality-inspector-v2',
        name: 'Quality Inspector',
        version: 'v2.3.1',
        type: 'Computer Vision',
        parameters: '120M params',
        apiUrl: 'http://localhost:8083/api/v1/inspect',
        status: 'updating',
        accuracy: '98.1%',
        latency: '18ms',
        description: 'Automated visual quality control inspection'
      },
      {
        id: 'predictive-maint-v1',
        name: 'Predictive Maintenance',
        version: 'v1.4.2',
        type: 'Time Series',
        parameters: '75M params',
        apiUrl: 'http://localhost:8084/api/v1/maintenance',
        status: 'active',
        accuracy: '89.3%',
        latency: '25ms',
        description: 'Predict when equipment needs maintenance'
      }
    ]
  },
  {
    id: 'autonomous-vehicles',
    name: 'Autonomous Vehicle Fleet',
    description: 'Self-driving cars and delivery robots',
    deviceCount: 23,
    deviceSpecs: {
      cpu: 8, // 8 cores (high performance for real-time processing)
      memory: 16, // 16GB RAM
      storage: 8 // 8GB storage
    },
    models: [
      {
        id: 'object-detection-v4',
        name: 'Object Detection',
        version: 'v4.1.0',
        type: 'Computer Vision',
        parameters: '200M params',
        apiUrl: 'http://localhost:8085/api/v1/detect',
        status: 'active',
        accuracy: '96.8%',
        latency: '15ms',
        description: 'Real-time object detection for autonomous navigation'
      },
      {
        id: 'path-planner-v2',
        name: 'Path Planning AI',
        version: 'v2.0.5',
        type: 'Reinforcement Learning',
        parameters: '45M params',
        apiUrl: 'http://localhost:8086/api/v1/plan',
        status: 'inactive',
        latency: '30ms',
        description: 'Optimize routing and path planning decisions'
      }
    ]
  }
]

// Generate mock historical data for the last 24 hours
const generateHistoricalData = (baseLatency: number, baseCpu: number, baseMemory: number): PerformanceMetrics[] => {
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

const mockMonitoringFleets: { [key: string]: ModelMonitoringInfo[] } = {
  'edge-retail': [
    {
      id: 'prod-classifier-v2',
      name: 'Product Classifier',
      version: 'v2.1.3',
      type: 'Classification',
      parameters: '50M params',
      apiUrl: 'http://localhost:8080/api/v1/classify',
      status: 'active',
      accuracy: '94.2%',
      latency: '12ms',
      description: 'Real-time product identification from camera feeds',
      currentMetrics: {
        cpuUsage: 67,
        memoryUsage: 45,
        avgLatency: 11.8,
        throughput: 1250,
        errorRate: 0.3,
        uptime: 99.8
      },
      historicalData: generateHistoricalData(12, 67, 45),
      deviceHealth: { healthy: 40, warning: 4, error: 1 }
    },
    {
      id: 'inventory-pred-v1',
      name: 'Inventory Predictor',
      version: 'v1.2.0',
      type: 'Regression',
      parameters: '25M params',
      apiUrl: 'http://localhost:8081/api/v1/predict',
      status: 'active',
      accuracy: '91.8%',
      latency: '8ms',
      description: 'Predict inventory demand based on historical data',
      currentMetrics: {
        cpuUsage: 34,
        memoryUsage: 28,
        avgLatency: 7.9,
        throughput: 890,
        errorRate: 0.1,
        uptime: 99.9
      },
      historicalData: generateHistoricalData(8, 34, 28),
      deviceHealth: { healthy: 43, warning: 2, error: 0 }
    }
  ],
  'manufacturing-iot': [
    {
      id: 'anomaly-detector-v3',
      name: 'Anomaly Detector',
      version: 'v3.0.1',
      type: 'Anomaly Detection',
      parameters: '35M params',
      apiUrl: 'http://localhost:8082/api/v1/detect',
      status: 'active',
      accuracy: '97.5%',
      latency: '5ms',
      description: 'Detect equipment anomalies from sensor data',
      currentMetrics: {
        cpuUsage: 78,
        memoryUsage: 62,
        avgLatency: 4.8,
        throughput: 2100,
        errorRate: 0.05,
        uptime: 99.9
      },
      historicalData: generateHistoricalData(5, 78, 62),
      deviceHealth: { healthy: 120, warning: 6, error: 2 }
    },
    {
      id: 'quality-inspector-v2',
      name: 'Quality Inspector',
      version: 'v2.3.1',
      type: 'Computer Vision',
      parameters: '120M params',
      apiUrl: 'http://localhost:8083/api/v1/inspect',
      status: 'updating',
      accuracy: '98.1%',
      latency: '18ms',
      description: 'Automated visual quality control inspection',
      currentMetrics: {
        cpuUsage: 45,
        memoryUsage: 38,
        avgLatency: 19.2,
        throughput: 450,
        errorRate: 0.8,
        uptime: 97.2
      },
      historicalData: generateHistoricalData(18, 45, 38),
      deviceHealth: { healthy: 115, warning: 10, error: 3 }
    }
  ],
  'autonomous-vehicles': [
    {
      id: 'object-detection-v4',
      name: 'Object Detection',
      version: 'v4.1.0',
      type: 'Computer Vision',
      parameters: '200M params',
      apiUrl: 'http://localhost:8085/api/v1/detect',
      status: 'active',
      accuracy: '96.8%',
      latency: '15ms',
      description: 'Real-time object detection for autonomous navigation',
      currentMetrics: {
        cpuUsage: 89,
        memoryUsage: 76,
        avgLatency: 14.5,
        throughput: 720,
        errorRate: 0.2,
        uptime: 99.5
      },
      historicalData: generateHistoricalData(15, 89, 76),
      deviceHealth: { healthy: 20, warning: 2, error: 1 }
    }
  ]
}

const mockAvailableModels: AvailableModel[] = [
  {
    id: 'sentiment-analyzer-v3',
    name: 'Sentiment Analyzer',
    version: 'v3.2.1',
    type: 'NLP Classification',
    description: 'Advanced sentiment analysis for customer feedback and social media monitoring',
    publishedBy: 'Sarah Chen (AI Engineer)',
    publishDate: '2025-01-10',
    modelSize: '120MB',
    requirements: {
      minCpu: '2 cores',
      minMemory: '4GB',
      minStorage: '500MB'
    },
    deploymentStatus: {
      'edge-retail': {
        status: 'not-deployed'
      },
      'manufacturing-iot': {
        status: 'deployed',
        deployedVersion: 'v3.1.0',
        lastDeployed: '2025-01-08',
        deviceCount: 45
      },
      'autonomous-vehicles': {
        status: 'not-deployed'
      }
    },
    compatibleFleets: ['edge-retail', 'manufacturing-iot']
  },
  {
    id: 'fraud-detector-v2',
    name: 'Fraud Detection Model',
    version: 'v2.4.3',
    type: 'Anomaly Detection',
    description: 'Real-time fraud detection for payment processing and transaction monitoring',
    publishedBy: 'Michael Rodriguez (AI Engineer)',
    publishDate: '2025-01-12',
    modelSize: '95MB',
    requirements: {
      minCpu: '1.5 cores',
      minMemory: '3GB',
      minStorage: '400MB'
    },
    deploymentStatus: {
      'edge-retail': {
        status: 'deploying',
        deployedVersion: 'v2.3.1',
        lastDeployed: '2025-01-12',
        deviceCount: 12
      },
      'manufacturing-iot': {
        status: 'not-deployed'
      },
      'autonomous-vehicles': {
        status: 'not-deployed'
      }
    },
    compatibleFleets: ['edge-retail']
  },
  {
    id: 'predictive-maintenance-v4',
    name: 'Predictive Maintenance AI',
    version: 'v4.1.0',
    type: 'Time Series Forecasting',
    description: 'Advanced predictive maintenance for industrial equipment and machinery',
    publishedBy: 'David Kim (AI Engineer)',
    publishDate: '2025-01-15',
    modelSize: '180MB',
    requirements: {
      minCpu: '3 cores',
      minMemory: '6GB',
      minStorage: '800MB'
    },
    deploymentStatus: {
      'edge-retail': {
        status: 'not-deployed'
      },
      'manufacturing-iot': {
        status: 'deployed',
        deployedVersion: 'v4.1.0',
        lastDeployed: '2025-01-15',
        deviceCount: 85
      },
      'autonomous-vehicles': {
        status: 'failed',
        deployedVersion: 'v4.0.2',
        lastDeployed: '2025-01-14',
        deviceCount: 0
      }
    },
    compatibleFleets: ['manufacturing-iot', 'autonomous-vehicles']
  },
  {
    id: 'traffic-optimizer-v1',
    name: 'Traffic Flow Optimizer',
    version: 'v1.3.0',
    type: 'Reinforcement Learning',
    description: 'Intelligent traffic flow optimization for autonomous vehicle navigation',
    publishedBy: 'Lisa Wang (AI Engineer)',
    publishDate: '2025-01-16',
    modelSize: '220MB',
    requirements: {
      minCpu: '4 cores',
      minMemory: '8GB',
      minStorage: '1GB'
    },
    deploymentStatus: {
      'edge-retail': {
        status: 'not-deployed'
      },
      'manufacturing-iot': {
        status: 'not-deployed'
      },
      'autonomous-vehicles': {
        status: 'deployed',
        deployedVersion: 'v1.3.0',
        lastDeployed: '2025-01-16',
        deviceCount: 18
      }
    },
    compatibleFleets: ['autonomous-vehicles']
  },
  {
    id: 'quality-assurance-v5',
    name: 'Visual Quality Assurance',
    version: 'v5.0.1',
    type: 'Computer Vision',
    description: 'Advanced visual quality control for manufacturing and product inspection',
    publishedBy: 'Jennifer Park (AI Engineer)',
    publishDate: '2025-01-18',
    modelSize: '340MB',
    requirements: {
      minCpu: '4 cores',
      minMemory: '10GB',
      minStorage: '1.5GB'
    },
    deploymentStatus: {
      'edge-retail': {
        status: 'deployed',
        deployedVersion: 'v4.8.2',
        lastDeployed: '2025-01-10',
        deviceCount: 22
      },
      'manufacturing-iot': {
        status: 'not-deployed'
      },
      'autonomous-vehicles': {
        status: 'not-deployed'
      }
    },
    compatibleFleets: ['edge-retail', 'manufacturing-iot']
  }
]

// Mock data for AI Engineer - Models developed by Data Scientists with versioning
interface ModelVersion {
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

interface ModelFamily {
  id: string
  name: string
  type: string
  framework: string
  description: string
  developedBy: string
  versions: ModelVersion[]
  currentVersion?: string // latest/active version
}

interface ModelEvaluation {
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

const mockModelFamilies: ModelFamily[] = [
  {
    id: 'sentiment-classifier',
    name: 'Customer Sentiment Classifier',
    type: 'Text Classification',
    framework: 'PyTorch',
    description: 'Advanced sentiment analysis model for customer reviews and feedback processing',
    developedBy: 'Sarah Chen (Data Scientist)',
    currentVersion: 'v2.1.3',
    versions: [
      {
        id: 'sentiment-v2.1.3',
        version: 'v2.1.3',
        createdDate: '2025-01-10',
        status: 'ready',
        accuracy: '94.2%',
        modelSize: '125MB',
        trainingDataset: 'Customer Reviews Dataset v3',
        lastEvaluated: '2025-01-15',
        evaluations: {
          accuracy: 94.2,
          precision: 93.8,
          recall: 94.5,
          f1Score: 94.1,
          bias: 0.15,
          fairness: 0.82,
          latency: 12.3
        },
        artifacts: {
          modelFile: 'sentiment_classifier_v2.1.3.pth',
          configFile: 'model_config.json',
          requirementsFile: 'requirements.txt'
        }
      },
      {
        id: 'sentiment-v2.1.2',
        version: 'v2.1.2',
        createdDate: '2025-01-08',
        status: 'published',
        accuracy: '93.8%',
        modelSize: '120MB',
        trainingDataset: 'Customer Reviews Dataset v3',
        lastEvaluated: '2025-01-12',
        publishedDate: '2025-01-12',
        evaluations: {
          accuracy: 93.8,
          precision: 93.2,
          recall: 94.1,
          f1Score: 93.6,
          bias: 0.18,
          fairness: 0.79,
          latency: 11.8
        },
        artifacts: {
          modelFile: 'sentiment_classifier_v2.1.2.pth',
          configFile: 'model_config.json',
          requirementsFile: 'requirements.txt'
        }
      },
      {
        id: 'sentiment-v2.1.1',
        version: 'v2.1.1',
        createdDate: '2025-01-05',
        status: 'unpublished',
        accuracy: '93.1%',
        modelSize: '118MB',
        trainingDataset: 'Customer Reviews Dataset v2',
        lastEvaluated: '2025-01-10',
        publishedDate: '2025-01-08',
        unpublishedDate: '2025-01-12',
        evaluations: {
          accuracy: 93.1,
          precision: 92.8,
          recall: 93.4,
          f1Score: 93.1,
          bias: 0.21,
          fairness: 0.75,
          latency: 12.1
        },
        artifacts: {
          modelFile: 'sentiment_classifier_v2.1.1.pth',
          configFile: 'model_config.json',
          requirementsFile: 'requirements.txt'
        }
      }
    ]
  },
  {
    id: 'fraud-detector',
    name: 'Fraud Detection Neural Network',
    type: 'Anomaly Detection',
    framework: 'TensorFlow',
    description: 'Deep learning model for real-time fraud detection in financial transactions',
    developedBy: 'Michael Rodriguez (Data Scientist)',
    currentVersion: 'v1.8.0',
    versions: [
      {
        id: 'fraud-v1.8.0',
        version: 'v1.8.0',
        createdDate: '2025-01-08',
        status: 'published',
        accuracy: '97.8%',
        modelSize: '89MB',
        trainingDataset: 'Financial Transactions Dataset 2024',
        lastEvaluated: '2025-01-14',
        publishedDate: '2025-01-15',
        evaluations: {
          accuracy: 97.8,
          precision: 97.2,
          recall: 98.1,
          f1Score: 97.6,
          bias: 0.09,
          fairness: 0.91,
          latency: 8.7
        },
        artifacts: {
          modelFile: 'fraud_detector_v1.8.0.h5',
          configFile: 'fraud_model_config.json',
          requirementsFile: 'requirements.txt'
        }
      },
      {
        id: 'fraud-v1.7.5',
        version: 'v1.7.5',
        createdDate: '2025-01-03',
        status: 'unpublished',
        accuracy: '96.9%',
        modelSize: '85MB',
        trainingDataset: 'Financial Transactions Dataset 2024',
        lastEvaluated: '2025-01-08',
        publishedDate: '2025-01-05',
        unpublishedDate: '2025-01-15',
        evaluations: {
          accuracy: 96.9,
          precision: 96.2,
          recall: 97.3,
          f1Score: 96.7,
          bias: 0.12,
          fairness: 0.87,
          latency: 9.2
        },
        artifacts: {
          modelFile: 'fraud_detector_v1.7.5.h5',
          configFile: 'fraud_model_config.json',
          requirementsFile: 'requirements.txt'
        }
      }
    ]
  },
  {
    id: 'recommendation-engine',
    name: 'Product Recommendation Engine',
    type: 'Recommendation System',
    framework: 'Scikit-learn',
    description: 'Collaborative filtering model for personalized product recommendations',
    developedBy: 'David Kim (Data Scientist)',
    currentVersion: 'v3.0.1',
    versions: [
      {
        id: 'rec-v3.0.1',
        version: 'v3.0.1',
        createdDate: '2025-01-12',
        status: 'draft',
        modelSize: '45MB',
        trainingDataset: 'E-commerce User Behavior Dataset',
        evaluations: {
          accuracy: 89.4,
          precision: 88.9,
          recall: 90.1,
          f1Score: 89.5,
          bias: 0.22,
          fairness: 0.76,
          latency: 15.2
        },
        artifacts: {
          modelFile: 'recommendation_engine_v3.0.1.pkl',
          configFile: 'rec_config.json',
          requirementsFile: 'requirements.txt'
        }
      },
      {
        id: 'rec-v2.9.8',
        version: 'v2.9.8',
        createdDate: '2025-01-09',
        status: 'published',
        accuracy: '87.2%',
        modelSize: '42MB',
        trainingDataset: 'E-commerce User Behavior Dataset',
        lastEvaluated: '2025-01-11',
        publishedDate: '2025-01-11',
        evaluations: {
          accuracy: 87.2,
          precision: 86.8,
          recall: 87.9,
          f1Score: 87.3,
          bias: 0.19,
          fairness: 0.78,
          latency: 14.8
        },
        artifacts: {
          modelFile: 'recommendation_engine_v2.9.8.pkl',
          configFile: 'rec_config.json',
          requirementsFile: 'requirements.txt'
        }
      }
    ]
  },
  {
    id: 'medical-classifier',
    name: 'Medical Image Classifier',
    type: 'Computer Vision',
    framework: 'PyTorch',
    description: 'CNN model for automated medical image analysis and diagnosis assistance',
    developedBy: 'Dr. Lisa Wang (Data Scientist)',
    currentVersion: 'v1.2.0',
    versions: [
      {
        id: 'medical-v1.2.0',
        version: 'v1.2.0',
        createdDate: '2025-01-05',
        status: 'ready',
        accuracy: '96.1%',
        modelSize: '220MB',
        trainingDataset: 'Medical Images Dataset 2024',
        lastEvaluated: '2025-01-16',
        evaluations: {
          accuracy: 96.1,
          precision: 95.8,
          recall: 96.4,
          f1Score: 96.1,
          bias: 0.11,
          fairness: 0.88,
          latency: 18.5
        },
        artifacts: {
          modelFile: 'medical_classifier_v1.2.0.pth',
          configFile: 'medical_config.json',
          requirementsFile: 'requirements.txt'
        }
      }
    ]
  }
]

const mockModelEvaluations: ModelEvaluation[] = [
  {
    id: 'eval-001',
    modelId: 'ds-model-001',
    modelName: 'Customer Sentiment Classifier',
    modelVersion: 'v2.1.3',
    evaluationType: 'bias',
    status: 'completed',
    startedDate: '2025-01-15 09:00:00',
    completedDate: '2025-01-15 09:45:00',
    executedBy: 'AI Engineer System',
    dataset: 'Bias Test Dataset v2',
    metrics: {
      overall: 0.15,
      detailed: {
        'gender_bias': 0.12,
        'age_bias': 0.18,
        'location_bias': 0.14,
        'language_bias': 0.16
      }
    },
    report: 'bias_evaluation_report_001.pdf'
  },
  {
    id: 'eval-002',
    modelId: 'ds-model-002',
    modelName: 'Fraud Detection Neural Network',
    modelVersion: 'v1.8.0',
    evaluationType: 'accuracy',
    status: 'running',
    startedDate: '2025-01-17 14:30:00',
    executedBy: 'AI Engineer System',
    dataset: 'Validation Dataset Q1 2025',
    metrics: {
      overall: 0,
      detailed: {}
    }
  },
  {
    id: 'eval-003',
    modelId: 'ds-model-004',
    modelName: 'Medical Image Classifier',
    modelVersion: 'v1.2.0',
    evaluationType: 'fairness',
    status: 'completed',
    startedDate: '2025-01-16 11:15:00',
    completedDate: '2025-01-16 13:22:00',
    executedBy: 'AI Engineer System',
    dataset: 'Medical Fairness Test Set',
    metrics: {
      overall: 0.88,
      detailed: {
        'demographic_parity': 0.89,
        'equalized_odds': 0.87,
        'equal_opportunity': 0.88,
        'calibration': 0.90
      }
    },
    report: 'fairness_evaluation_report_003.pdf'
  },
  {
    id: 'eval-004',
    modelId: 'ds-model-005',
    modelName: 'Supply Chain Optimizer',
    modelVersion: 'v2.3.1',
    evaluationType: 'performance',
    status: 'queued',
    startedDate: '2025-01-17 16:00:00',
    executedBy: 'AI Engineer System',
    dataset: 'Performance Benchmark Dataset',
    metrics: {
      overall: 0,
      detailed: {}
    }
  },
  {
    id: 'eval-005',
    modelId: 'ds-model-001',
    modelName: 'Customer Sentiment Classifier',
    modelVersion: 'v2.1.3',
    evaluationType: 'robustness',
    status: 'failed',
    startedDate: '2025-01-14 10:00:00',
    completedDate: '2025-01-14 10:15:00',
    executedBy: 'AI Engineer System',
    dataset: 'Robustness Test Dataset',
    metrics: {
      overall: 0,
      detailed: {}
    }
  },
  {
    id: 'eval-006',
    modelId: 'ds-model-003',
    modelName: 'Product Recommendation Engine',
    modelVersion: 'v3.0.1',
    evaluationType: 'accuracy',
    status: 'completed',
    startedDate: '2025-01-13 15:30:00',
    completedDate: '2025-01-13 16:45:00',
    executedBy: 'AI Engineer System',
    dataset: 'Recommendation Accuracy Test Set',
    metrics: {
      overall: 89.4,
      detailed: {
        'precision_at_5': 91.2,
        'precision_at_10': 89.8,
        'recall_at_5': 88.6,
        'recall_at_10': 87.9,
        'ndcg_at_5': 90.1,
        'ndcg_at_10': 89.4
      }
    },
    report: 'accuracy_evaluation_report_006.pdf'
  }
]

const mockDeployments: ModelDeployment[] = [
  {
    id: 'deploy-001',
    deploymentName: 'Sentiment Analyzer - Production',
    modelName: 'Sentiment Analyzer',
    modelVersion: 'v3.1.0',
    fleetName: 'Manufacturing IoT Fleet',
    fleetId: 'manufacturing-iot',
    status: 'active',
    deployedDate: '2025-01-08',
    deviceCount: 45,
    successfulDevices: 44,
    failedDevices: 1,
    lastUpdated: '2025-01-15 14:30:00'
  },
  {
    id: 'deploy-002', 
    deploymentName: 'Fraud Detector - East Coast',
    modelName: 'Fraud Detection Model',
    modelVersion: 'v2.3.1',
    fleetName: 'Retail Edge Fleet',
    fleetId: 'edge-retail',
    status: 'deploying',
    deployedDate: '2025-01-12',
    deviceCount: 12,
    successfulDevices: 8,
    failedDevices: 0,
    lastUpdated: '2025-01-15 15:45:00'
  },
  {
    id: 'deploy-003',
    deploymentName: 'Predictive Maintenance - Factory Floor',
    modelName: 'Predictive Maintenance AI',
    modelVersion: 'v4.1.0',
    fleetName: 'Manufacturing IoT Fleet',
    fleetId: 'manufacturing-iot',
    status: 'active',
    deployedDate: '2025-01-15',
    deviceCount: 85,
    successfulDevices: 85,
    failedDevices: 0,
    lastUpdated: '2025-01-15 16:00:00'
  },
  {
    id: 'deploy-004',
    deploymentName: 'Traffic Optimizer - Beta',
    modelName: 'Traffic Flow Optimizer',
    modelVersion: 'v1.3.0',
    fleetName: 'Autonomous Vehicle Fleet',
    fleetId: 'autonomous-vehicles',
    status: 'active',
    deployedDate: '2025-01-16',
    deviceCount: 18,
    successfulDevices: 18,
    failedDevices: 0,
    lastUpdated: '2025-01-16 09:15:00'
  },
  {
    id: 'deploy-005',
    deploymentName: 'Visual QA - Rollback Test',
    modelName: 'Visual Quality Assurance',
    modelVersion: 'v4.8.2',
    fleetName: 'Retail Edge Fleet', 
    fleetId: 'edge-retail',
    status: 'failed',
    deployedDate: '2025-01-10',
    deviceCount: 22,
    successfulDevices: 15,
    failedDevices: 7,
    lastUpdated: '2025-01-14 11:20:00'
  },
  {
    id: 'deploy-006',
    deploymentName: 'Predictive Maintenance - AV Test',
    modelName: 'Predictive Maintenance AI',
    modelVersion: 'v4.0.2',
    fleetName: 'Autonomous Vehicle Fleet',
    fleetId: 'autonomous-vehicles',
    status: 'stopped',
    deployedDate: '2025-01-14',
    deviceCount: 5,
    successfulDevices: 0,
    failedDevices: 5,
    lastUpdated: '2025-01-14 17:45:00'
  }
]

// Dataset management interfaces and mock data  
interface Dataset {
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
    provider: 'S3' | 'Azure Blob' | 'GCS' | 'Local' | 'HDFS'
    accessLevel: 'public' | 'private' | 'restricted'
  }
  quality: {
    completeness: number
    validity: number
    consistency: number
    duplicates: number
  }
  usage: {
    modelsUsing: number
    lastAccessed: string
    downloadCount: number
  }
  lineage: {
    sources: string[]
    transformations: string[]
    derived: string[]
  }
}

const mockDatasets: Dataset[] = [
  {
    id: 'ds-001',
    name: 'Customer Reviews Dataset v3',
    description: 'Comprehensive collection of customer reviews and ratings from multiple e-commerce platforms for sentiment analysis training',
    type: 'training',
    format: 'CSV',
    size: '2.1 GB',
    recordCount: 5_200_000,
    createdBy: 'Sarah Chen (Data Scientist)',
    createdDate: '2024-11-15',
    lastModified: '2025-01-10',
    version: 'v3.2.1',
    tags: ['sentiment', 'nlp', 'customer-feedback', 'e-commerce'],
    schema: {
      columns: 12,
      features: ['review_text', 'rating', 'product_category', 'user_demographics', 'review_length', 'product_price_range', 'verified_purchase', 'review_helpfulness', 'language', 'sentiment_label', 'emotion_tags'],
      target: 'sentiment_score'
    },
    storage: {
      location: 's3://mlops-datasets/customer-reviews/v3.2.1/',
      provider: 'S3',
      accessLevel: 'restricted'
    },
    quality: {
      completeness: 94.8,
      validity: 96.2,
      consistency: 92.5,
      duplicates: 0.8
    },
    usage: {
      modelsUsing: 3,
      lastAccessed: '2025-01-15 14:23:00',
      downloadCount: 127
    },
    lineage: {
      sources: ['Amazon Reviews API', 'Shopify Store Reviews', 'Google Reviews Export'],
      transformations: ['text_preprocessing', 'sentiment_labeling', 'data_augmentation'],
      derived: ['Customer Reviews Mini v3', 'Sentiment Test Set v3']
    }
  },
  {
    id: 'ds-002',
    name: 'Financial Transactions Dataset 2024',
    description: 'Anonymized financial transaction data for fraud detection model training with comprehensive feature engineering',
    type: 'training',
    format: 'Parquet',
    size: '8.7 GB',
    recordCount: 45_000_000,
    createdBy: 'Michael Rodriguez (Data Scientist)',
    createdDate: '2024-08-20',
    lastModified: '2025-01-08',
    version: 'v2.1.0',
    tags: ['fraud-detection', 'financial', 'transactions', 'anomaly'],
    schema: {
      columns: 28,
      features: ['transaction_amount', 'merchant_category', 'transaction_time', 'user_location', 'device_type', 'payment_method', 'account_age', 'transaction_frequency', 'velocity_features', 'merchant_risk_score', 'geo_velocity', 'amount_deviation'],
      target: 'is_fraud'
    },
    storage: {
      location: 's3://mlops-datasets/financial-fraud/v2.1.0/',
      provider: 'S3',
      accessLevel: 'restricted'
    },
    quality: {
      completeness: 99.2,
      validity: 97.8,
      consistency: 96.1,
      duplicates: 0.2
    },
    usage: {
      modelsUsing: 2,
      lastAccessed: '2025-01-14 10:45:00',
      downloadCount: 89
    },
    lineage: {
      sources: ['Payment Gateway Logs', 'Merchant Transaction History', 'User Behavior Analytics'],
      transformations: ['feature_engineering', 'anonymization', 'fraud_labeling', 'temporal_splitting'],
      derived: ['Fraud Detection Test Set', 'Mini Fraud Dataset']
    }
  },
  {
    id: 'ds-003', 
    name: 'E-commerce User Behavior Dataset',
    description: 'Comprehensive user interaction data from e-commerce platforms for building recommendation systems',
    type: 'training',
    format: 'JSON',
    size: '1.9 GB',
    recordCount: 12_500_000,
    createdBy: 'David Kim (Data Scientist)',
    createdDate: '2024-10-05',
    lastModified: '2024-12-20',
    version: 'v1.5.2',
    tags: ['recommendation', 'user-behavior', 'e-commerce', 'collaborative-filtering'],
    schema: {
      columns: 18,
      features: ['user_id', 'product_id', 'interaction_type', 'timestamp', 'session_duration', 'page_views', 'cart_actions', 'purchase_history', 'product_categories', 'ratings_given', 'reviews_written', 'search_queries'],
      target: 'purchase_intent'
    },
    storage: {
      location: 'gcs://mlops-datasets/user-behavior/v1.5.2/',
      provider: 'GCS',
      accessLevel: 'private'
    },
    quality: {
      completeness: 91.7,
      validity: 94.3,
      consistency: 89.2,
      duplicates: 1.4
    },
    usage: {
      modelsUsing: 1,
      lastAccessed: '2025-01-12 16:30:00',
      downloadCount: 67
    },
    lineage: {
      sources: ['Website Analytics', 'Mobile App Events', 'Purchase History'],
      transformations: ['session_reconstruction', 'feature_extraction', 'user_segmentation'],
      derived: ['User Behavior Test Set', 'Recommendation Engine Training Data']
    }
  },
  {
    id: 'ds-004',
    name: 'Production Images Dataset Q4 2024',
    description: 'High-resolution industrial product images for computer vision quality control model training',
    type: 'validation',
    format: 'Images',
    size: '15.3 GB',
    recordCount: 78_000,
    createdBy: 'Lisa Park (Data Scientist)',
    createdDate: '2024-12-01',
    lastModified: '2025-01-05',
    version: 'v1.2.0',
    tags: ['computer-vision', 'quality-control', 'manufacturing', 'defect-detection'],
    schema: {
      columns: 8,
      features: ['image_path', 'product_type', 'manufacturing_date', 'quality_label', 'defect_type', 'confidence_score', 'inspector_id'],
      target: 'quality_status'
    },
    storage: {
      location: 'azure://mlops-datasets/production-images/v1.2.0/',
      provider: 'Azure Blob',
      accessLevel: 'private'
    },
    quality: {
      completeness: 97.1,
      validity: 95.8,
      consistency: 94.2,
      duplicates: 0.3
    },
    usage: {
      modelsUsing: 2,
      lastAccessed: '2025-01-11 09:15:00',
      downloadCount: 34
    },
    lineage: {
      sources: ['Production Line Cameras', 'Quality Control Database', 'Manual Inspections'],
      transformations: ['image_preprocessing', 'augmentation', 'quality_labeling'],
      derived: ['QC Test Images', 'Defect Classification Dataset']
    }
  },
  {
    id: 'ds-005',
    name: 'Multi-Language Support Tickets',
    description: 'Customer support tickets in multiple languages for automated classification and response generation',
    type: 'training',
    format: 'Text',
    size: '950 MB',
    recordCount: 890_000,
    createdBy: 'Emma Watson (Data Scientist)',
    createdDate: '2024-09-12',
    lastModified: '2024-12-18',
    version: 'v2.0.3',
    tags: ['nlp', 'multilingual', 'support-tickets', 'classification', 'text-generation'],
    schema: {
      columns: 15,
      features: ['ticket_text', 'language', 'category', 'priority', 'resolution_time', 'customer_satisfaction', 'agent_response', 'escalation_needed', 'product_area', 'sentiment'],
      target: 'ticket_category'
    },
    storage: {
      location: 's3://mlops-datasets/support-tickets/v2.0.3/',
      provider: 'S3',
      accessLevel: 'restricted'
    },
    quality: {
      completeness: 88.9,
      validity: 92.1,
      consistency: 87.5,
      duplicates: 2.1
    },
    usage: {
      modelsUsing: 1,
      lastAccessed: '2025-01-09 13:42:00',
      downloadCount: 23
    },
    lineage: {
      sources: ['Support System Database', 'Email Tickets', 'Chat Transcripts'],
      transformations: ['text_cleaning', 'language_detection', 'category_mapping', 'anonymization'],
      derived: ['Support Tickets Test Set', 'Multilingual Classification Data']
    }
  },
  {
    id: 'ds-006',
    name: 'Sensor Data Archive 2024',
    description: 'Time-series sensor data from IoT devices for predictive maintenance model development',
    type: 'production',
    format: 'HDF5',
    size: '12.4 GB',
    recordCount: 156_000_000,
    createdBy: 'Alex Thompson (Data Scientist)',
    createdDate: '2024-01-01',
    lastModified: '2025-01-01',
    version: 'v3.1.1',
    tags: ['time-series', 'iot', 'sensors', 'predictive-maintenance', 'manufacturing'],
    schema: {
      columns: 22,
      features: ['timestamp', 'device_id', 'temperature', 'pressure', 'vibration', 'humidity', 'power_consumption', 'operational_status', 'maintenance_history', 'failure_indicators'],
      target: 'maintenance_needed'
    },
    storage: {
      location: 'hdfs://mlops-cluster/sensor-data/v3.1.1/',
      provider: 'HDFS',
      accessLevel: 'restricted'
    },
    quality: {
      completeness: 96.5,
      validity: 98.1,
      consistency: 95.7,
      duplicates: 0.1
    },
    usage: {
      modelsUsing: 3,
      lastAccessed: '2025-01-16 08:20:00',
      downloadCount: 156
    },
    lineage: {
      sources: ['IoT Device Telemetry', 'Maintenance Logs', 'Equipment Specifications'],
      transformations: ['time_series_aggregation', 'feature_engineering', 'anomaly_labeling'],
      derived: ['Sensor Data Test Set', 'Maintenance Prediction Training Data', 'Anomaly Detection Dataset']
    }
  }
]

const App: React.FC = () => {
  const [activeItem, setActiveItem] = React.useState<string>('dashboard')
  const [selectedRole, setSelectedRole] = React.useState<Role>('data-scientist')
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = React.useState(false)
  const [isDeployModalOpen, setIsDeployModalOpen] = React.useState(false)
  const [selectedModelForDeployment, setSelectedModelForDeployment] = React.useState<AvailableModel | null>(null)
  const [selectedFleet, setSelectedFleet] = React.useState<string>('')
  const [deploymentName, setDeploymentName] = React.useState<string>('')
  const [selectedDeployment, setSelectedDeployment] = React.useState<ModelDeployment | null>(null)
  const [showDeploymentDetail, setShowDeploymentDetail] = React.useState(false)
  const [selectedModelVersions, setSelectedModelVersions] = React.useState<{ [familyId: string]: string }>({})
  const [expandedModelFamilies, setExpandedModelFamilies] = React.useState<{ [familyId: string]: boolean }>({})
  
  const currentRole = roles.find(role => role.id === selectedRole)!
  
  // Ensure activeItem is always valid
  React.useEffect(() => {
    if (!activeItem) {
      setActiveItem('dashboard')
    }
  }, [activeItem])

  // Helper function to parse requirement strings (e.g., "4GB" -> 4)
  const parseRequirement = (requirement: string): number => {
    const match = requirement.match(/(\d+(?:\.\d+)?)/);
    return match ? parseFloat(match[1]) : 0;
  }

  // Check if a model is compatible with a fleet based on device specs
  const isModelCompatibleWithFleet = (model: AvailableModel, fleet: Fleet): boolean => {
    const requiredCpu = parseRequirement(model.requirements.minCpu);
    const requiredMemory = parseRequirement(model.requirements.minMemory);
    const requiredStorage = parseRequirement(model.requirements.minStorage);
    
    return (
      fleet.deviceSpecs.cpu >= requiredCpu &&
      fleet.deviceSpecs.memory >= requiredMemory &&
      fleet.deviceSpecs.storage >= requiredStorage
    );
  }

  // Handle opening deployment modal
  const handleDeployModel = (model: AvailableModel) => {
    setSelectedModelForDeployment(model);
    setSelectedFleet('');
    setDeploymentName(`${model.name} - ${new Date().toLocaleDateString()}`);
    setIsDeployModalOpen(true);
  }

  // Handle deployment submission
  const handleDeploymentSubmit = () => {
    if (selectedModelForDeployment && selectedFleet && deploymentName.trim()) {
      // In a real app, this would make an API call to deploy the model
      console.log('Deploying model:', {
        model: selectedModelForDeployment.name,
        fleet: selectedFleet,
        deploymentName: deploymentName.trim()
      });
      
      // Close modal and reset state
      setIsDeployModalOpen(false);
      setSelectedModelForDeployment(null);
      setSelectedFleet('');
      setDeploymentName('');
      
      // Navigate to Model Deployments tab
      setActiveItem('deployments');
    }
  }

  // Handle viewing deployment details
  const handleViewDeploymentDetails = (deployment: ModelDeployment) => {
    setSelectedDeployment(deployment);
    setShowDeploymentDetail(true);
  }

  // Handle going back to deployments list
  const handleBackToDeployments = () => {
    setShowDeploymentDetail(false);
    setSelectedDeployment(null);
  }

  // Helper functions for version management
  const getSelectedVersionForFamily = (familyId: string): ModelVersion | null => {
    const family = mockModelFamilies.find(f => f.id === familyId)
    if (!family) return null
    
    const selectedVersionId = selectedModelVersions[familyId] || family.currentVersion
    return family.versions.find(v => v.version === selectedVersionId) || family.versions[0] || null
  }

  const handleVersionSelection = (familyId: string, version: string) => {
    setSelectedModelVersions(prev => ({
      ...prev,
      [familyId]: version
    }))
  }

  const handlePublishVersion = (familyId: string, versionId: string) => {
    console.log('Publishing version:', { familyId, versionId })
    // In a real app, this would make an API call to publish the version
    // For now, we'll just log it
  }

  const handleUnpublishVersion = (familyId: string, versionId: string) => {
    console.log('Unpublishing version:', { familyId, versionId })
    // In a real app, this would make an API call to unpublish the version
    // For now, we'll just log it
  }

  const toggleModelFamilyExpansion = (familyId: string) => {
    setExpandedModelFamilies(prev => ({
      ...prev,
      [familyId]: !prev[familyId]
    }))
  }

  // Generate mock performance data for deployment details
  const generateDeploymentPerformanceData = (baseLatency: number, baseCpu: number, baseMemory: number) => {
    const data = []
    const now = Date.now()
    
    for (let i = 23; i >= 0; i--) {
      const timestamp = now - (i * 60 * 60 * 1000) // Every hour for 24 hours
      data.push({
        timestamp,
        cpuUsage: Math.max(0, Math.min(100, baseCpu + (Math.random() - 0.5) * 20)),
        memoryUsage: Math.max(0, Math.min(100, baseMemory + (Math.random() - 0.5) * 15)),
        latency: Math.max(1, baseLatency + (Math.random() - 0.5) * 10),
        throughput: Math.max(0, 50 + (Math.random() - 0.5) * 30),
        errorRate: Math.max(0, Math.min(10, 2 + (Math.random() - 0.5) * 3))
      })
    }
    return data
  }

  const getNavigationGroups = () => {
    const roleConfigs = {
      'data-scientist': {
        title: 'Data Science',
        items: [
          { id: 'datasets', label: 'Datasets', icon: <DatabaseIcon /> }
        ]
      },
      'ai-engineer': {
        title: 'AI Engineering',
        items: [
          { id: 'models', label: 'Models', icon: <CubeIcon /> },
          { id: 'evaluations', label: 'Evaluations', icon: <ChartBarIcon /> },
          { id: 'datasets', label: 'Datasets', icon: <DatabaseIcon /> }
        ]
      },
      'site-engineer': {
        title: 'Site Reliability',
        items: [
          { id: 'available-models', label: 'Available Models', icon: <RepositoryIcon /> },
          { id: 'deployments', label: 'Model Deployments', icon: <ServerIcon /> }
        ]
      },
      'developer': {
        title: 'API Development',
        items: []
      }
    }
    
    return roleConfigs[selectedRole]
  }

  const navigation = (
    <Nav aria-label="Nav">
      <NavList>
        {/* Dashboard - Always visible */}
        <NavItem 
          itemId="dashboard" 
          isActive={activeItem === 'dashboard'}
          icon={<HomeIcon />}
          onClick={() => setActiveItem('dashboard')}
        >
          Dashboard
        </NavItem>
        
        {/* Role-specific navigation group - only show if there are items */}
        {getNavigationGroups().items.length > 0 && (
          <NavGroup title={getNavigationGroups().title}>
            {getNavigationGroups().items.map(item => (
              <NavItem 
                key={item.id}
                itemId={item.id} 
                isActive={activeItem === item.id}
                icon={item.icon}
                onClick={() => setActiveItem(item.id)}
              >
                {item.label}
              </NavItem>
            ))}
          </NavGroup>
        )}
        
        {/* Settings - Always visible */}
        <NavItem 
          itemId="settings" 
          isActive={activeItem === 'settings'}
          icon={<CogIcon />}
          onClick={() => setActiveItem('settings')}
        >
          Settings
        </NavItem>
      </NavList>
    </Nav>
  )

  const roleSelector = (
    <Dropdown
      isOpen={isRoleDropdownOpen}
      onSelect={() => setIsRoleDropdownOpen(false)}
      onOpenChange={(isOpen: boolean) => setIsRoleDropdownOpen(isOpen)}
      toggle={(toggleRef: React.Ref<any>) => (
        <MenuToggle 
          ref={toggleRef}
          onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
          isExpanded={isRoleDropdownOpen}
          style={{
            backgroundColor: 'var(--pf-v6-global--Color--light-100)',
            border: '1px solid var(--pf-v6-global--BorderColor--300)',
            borderRadius: 'var(--pf-v6-global--border-radius--sm)'
          }}
        >
          <Flex alignItems={{ default: 'alignItemsCenter' }} spaceItems={{ default: 'spaceItemsSm' }}>
            <FlexItem style={{ color: currentRole.color }}>
              {currentRole.icon}
            </FlexItem>
            <FlexItem>
              <strong>{currentRole.name}</strong>
            </FlexItem>
            <FlexItem>
              <CaretDownIcon />
            </FlexItem>
          </Flex>
        </MenuToggle>
      )}
    >
      <DropdownList>
        {roles.map(role => (
          <DropdownItem
            key={role.id}
            onClick={() => {
              setSelectedRole(role.id);
              setActiveItem('dashboard');
            }}
            isSelected={role.id === selectedRole}
          >
            <Flex alignItems={{ default: 'alignItemsCenter' }} spaceItems={{ default: 'spaceItemsSm' }}>
              <FlexItem style={{ color: role.color }}>
                {role.icon}
              </FlexItem>
              <FlexItem>
                <div>
                  <div><strong>{role.name}</strong></div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--pf-v6-global--Color--200)' }}>
                    {role.description}
                  </div>
                </div>
              </FlexItem>
            </Flex>
          </DropdownItem>
        ))}
      </DropdownList>
    </Dropdown>
  )

  const masthead = (
    <Masthead>
      <MastheadMain>
        <MastheadContent>
          <Flex direction={{ default: 'column' }} alignItems={{ default: 'alignItemsCenter' }}>
            <FlexItem>
              <Title headingLevel="h1" size="lg" style={{ marginBottom: '8px' }}>
                MLOps Platform
              </Title>
            </FlexItem>
            <FlexItem>
              {roleSelector}
            </FlexItem>
          </Flex>
        </MastheadContent>
      </MastheadMain>
    </Masthead>
  )

  const sidebar = (
    <PageSidebar>
      {navigation}
    </PageSidebar>
  )

  const renderDashboard = () => {
    const dashboards = {
      'data-scientist': (
        <PageSection>
          <Gallery hasGutter>
            <GalleryItem>
              <Card>
                <CardTitle>Active Experiments</CardTitle>
                <CardBody>
                  <p>Running experiments: <strong>7</strong></p>
                  <p>Completed this week: <strong>23</strong></p>
                  <Button variant="primary" size="sm">View Experiments</Button>
                </CardBody>
              </Card>
            </GalleryItem>
            <GalleryItem>
              <Card>
                <CardTitle>Training Jobs</CardTitle>
                <CardBody>
                  <p>Active training: <strong>3</strong></p>
                  <p>Queued jobs: <strong>5</strong></p>
                  <Button variant="secondary" size="sm">Manage Jobs</Button>
                </CardBody>
              </Card>
            </GalleryItem>
            <GalleryItem>
              <Card>
                <CardTitle>Datasets</CardTitle>
                <CardBody>
                  <p>Available datasets: <strong>15</strong></p>
                  <p>Total storage: <strong>2.3TB</strong></p>
                  <Button variant="tertiary" size="sm">Browse</Button>
                </CardBody>
              </Card>
            </GalleryItem>
          </Gallery>
        </PageSection>
      ),
      'ai-engineer': (
        <PageSection>
          <Gallery hasGutter>
            <GalleryItem>
              <Card>
                <CardTitle>Model Registry</CardTitle>
                <CardBody>
                  <p>Registered models: <strong>45</strong></p>
                  <p>Ready for deployment: <strong>8</strong></p>
                  <Button variant="primary" size="sm">View Registry</Button>
                </CardBody>
              </Card>
            </GalleryItem>
            <GalleryItem>
              <Card>
                <CardTitle>Active Deployments</CardTitle>
                <CardBody>
                  <p>Production models: <strong>12</strong></p>
                  <p>Staging models: <strong>6</strong></p>
                  <Button variant="secondary" size="sm">Monitor</Button>
                </CardBody>
              </Card>
            </GalleryItem>
            <GalleryItem>
              <Card>
                <CardTitle>Model Performance</CardTitle>
                <CardBody>
                  <p>Avg accuracy: <strong>94.2%</strong></p>
                  <p>Alerts: <strong>2</strong></p>
                  <Button variant="tertiary" size="sm">View Metrics</Button>
                </CardBody>
              </Card>
            </GalleryItem>
          </Gallery>
        </PageSection>
      ),
      'site-engineer': (
        <PageSection>
          <p style={{ marginBottom: '24px', color: 'var(--pf-v6-global--Color--200)' }}>
            Real-time performance monitoring and resource usage for deployed models across edge device fleets.
          </p>
          
          {mockFleets.map((fleet, fleetIndex) => (
            <div key={fleet.id} style={{ marginBottom: '40px' }}>
              <Split hasGutter style={{ marginBottom: '16px' }}>
                <SplitItem isFilled>
                  <Title headingLevel="h2" size="lg">
                    {fleet.name}
                  </Title>
                </SplitItem>
                <SplitItem>
                  <Badge isRead>{fleet.deviceCount} devices</Badge>
                </SplitItem>
              </Split>
              
              <p style={{ color: 'var(--pf-v6-global--Color--200)', marginBottom: '16px', fontSize: '14px' }}>
                {fleet.description}
              </p>
              
              <Gallery hasGutter minWidths={{ default: '400px' }}>
                {(mockMonitoringFleets[fleet.id] || []).map((model) => (
                  <GalleryItem key={model.id}>
                    <Card style={{ height: '100%' }}>
                      <CardHeader>
                        <Split hasGutter>
                          <SplitItem isFilled>
                            <Title headingLevel="h3" size="md">
                              {model.name}
                            </Title>
                          </SplitItem>
                          <SplitItem>
                            <Label 
                              color={
                                model.status === 'active' ? 'green' : 
                                model.status === 'updating' ? 'orange' : 'red'
                              }
                            >
                              {model.status}
                            </Label>
                          </SplitItem>
                        </Split>
                        <p style={{ fontSize: '14px', color: 'var(--pf-v6-global--Color--200)', margin: 0 }}>
                          {model.version} • Uptime: {model.currentMetrics.uptime}%
                        </p>
                      </CardHeader>
                      
                      <CardBody>
                        {/* Real-time Metrics */}
                        <div style={{ marginBottom: '16px' }}>
                          <DescriptionList isCompact isHorizontal>
                            <DescriptionListGroup>
                              <DescriptionListTerm>CPU</DescriptionListTerm>
                              <DescriptionListDescription>
                                <strong style={{ color: model.currentMetrics.cpuUsage > 80 ? '#c9190b' : model.currentMetrics.cpuUsage > 60 ? '#f0ab00' : '#3e8635' }}>
                                  {model.currentMetrics.cpuUsage}%
                                </strong>
                              </DescriptionListDescription>
                            </DescriptionListGroup>
                            <DescriptionListGroup>
                              <DescriptionListTerm>Memory</DescriptionListTerm>
                              <DescriptionListDescription>
                                <strong style={{ color: model.currentMetrics.memoryUsage > 80 ? '#c9190b' : model.currentMetrics.memoryUsage > 60 ? '#f0ab00' : '#3e8635' }}>
                                  {model.currentMetrics.memoryUsage}%
                                </strong>
                              </DescriptionListDescription>
                            </DescriptionListGroup>
                            <DescriptionListGroup>
                              <DescriptionListTerm>Latency</DescriptionListTerm>
                              <DescriptionListDescription>
                                <strong>{model.currentMetrics.avgLatency}ms</strong>
                              </DescriptionListDescription>
                            </DescriptionListGroup>
                            <DescriptionListGroup>
                              <DescriptionListTerm>Throughput</DescriptionListTerm>
                              <DescriptionListDescription>
                                <strong>{model.currentMetrics.throughput}/min</strong>
                              </DescriptionListDescription>
                            </DescriptionListGroup>
                          </DescriptionList>
                        </div>
                        
                        {/* Performance Chart */}
                        <div style={{ marginBottom: '16px' }}>
                          <Title headingLevel="h5" size="sm" style={{ marginBottom: '8px' }}>
                            CPU & Memory Usage (24h)
                          </Title>
                          <div style={{ height: '120px' }}>
                            <VictoryChart
                              height={120}
                              width={350}
                              padding={{ left: 40, top: 10, right: 10, bottom: 30 }}
                              scale={{ x: 'time' }}
                            >
                              <VictoryAxis dependentAxis
                                tickFormat={(value) => `${value}%`}
                                style={{ tickLabels: { fontSize: 10 } }}
                              />
                              <VictoryAxis
                                tickFormat={() => ''}
                                style={{ tickLabels: { fontSize: 10 } }}
                              />
                              <VictoryArea
                                data={model.historicalData.map(d => ({ x: new Date(d.timestamp), y: d.cpuUsage }))}
                                style={{ data: { fill: '#06c', fillOpacity: 0.3, stroke: '#06c', strokeWidth: 2 } }}
                              />
                              <VictoryArea
                                data={model.historicalData.map(d => ({ x: new Date(d.timestamp), y: d.memoryUsage }))}
                                style={{ data: { fill: '#3e8635', fillOpacity: 0.3, stroke: '#3e8635', strokeWidth: 2 } }}
                              />
                            </VictoryChart>
                          </div>
                        </div>
                        
                        {/* Device Health */}
                        <div style={{ marginBottom: '16px' }}>
                          <Title headingLevel="h5" size="sm" style={{ marginBottom: '8px' }}>
                            Device Health
                          </Title>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{ width: '100px', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                              <VictoryPie
                                data={[
                                  { x: 'Healthy', y: model.deviceHealth.healthy },
                                  { x: 'Warning', y: model.deviceHealth.warning },
                                  { x: 'Error', y: model.deviceHealth.error }
                                ]}
                                innerRadius={30}
                                padAngle={3}
                                colorScale={['#3e8635', '#f0ab00', '#c9190b']}
                                width={100}
                                height={100}
                                padding={10}
                                labelComponent={<></>}
                                standalone={true}
                              />
                            </div>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                <div style={{ 
                                  width: '12px', 
                                  height: '12px', 
                                  backgroundColor: '#3e8635', 
                                  borderRadius: '50%',
                                  border: '2px solid #3e8635'
                                }}></div>
                                <span style={{ fontSize: '14px', fontWeight: '500' }}>
                                  Healthy: <strong>{model.deviceHealth.healthy}</strong>
                                </span>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                <div style={{ 
                                  width: '12px', 
                                  height: '12px', 
                                  backgroundColor: '#f0ab00', 
                                  borderRadius: '50%',
                                  border: '2px solid #f0ab00'
                                }}></div>
                                <span style={{ fontSize: '14px', fontWeight: '500' }}>
                                  Warning: <strong>{model.deviceHealth.warning}</strong>
                                </span>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ 
                                  width: '12px', 
                                  height: '12px', 
                                  backgroundColor: '#c9190b', 
                                  borderRadius: '50%',
                                  border: '2px solid #c9190b'
                                }}></div>
                                <span style={{ fontSize: '14px', fontWeight: '500' }}>
                                  Error: <strong>{model.deviceHealth.error}</strong>
                                </span>
                              </div>
                              <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--pf-v6-global--Color--200)' }}>
                                Total: {model.deviceHealth.healthy + model.deviceHealth.warning + model.deviceHealth.error} devices
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Error Rate */}
                        <div style={{ marginBottom: '16px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '14px' }}>Error Rate:</span>
                            <strong style={{ color: model.currentMetrics.errorRate > 1 ? '#c9190b' : '#3e8635' }}>
                              {model.currentMetrics.errorRate}%
                            </strong>
                          </div>
                        </div>
                        
                        <div style={{ marginTop: '16px' }}>
                          <Flex spaceItems={{ default: 'spaceItemsSm' }}>
                            <FlexItem>
                              <Button variant="primary" size="sm">
                                View Details
                              </Button>
                            </FlexItem>
                            <FlexItem>
                              <Button variant="secondary" size="sm">
                                Restart Model
                              </Button>
                            </FlexItem>
                          </Flex>
                        </div>
                      </CardBody>
                    </Card>
                  </GalleryItem>
                ))}
              </Gallery>
              
              {fleetIndex < mockFleets.length - 1 && (
                <Divider style={{ marginTop: '32px' }} />
              )}
            </div>
          ))}
        </PageSection>
      ),
      'developer': (
        <PageSection>
          <p style={{ marginBottom: '24px', color: 'var(--pf-v6-global--Color--200)' }}>
            Browse available models organized by device fleets. Each model provides a local API endpoint for integration.
          </p>
          
          {mockFleets.map((fleet, fleetIndex) => (
            <div key={fleet.id} style={{ marginBottom: '40px' }}>
              <Split hasGutter style={{ marginBottom: '16px' }}>
                <SplitItem isFilled>
                  <Title headingLevel="h2" size="lg">
                    {fleet.name}
                  </Title>
                </SplitItem>
                <SplitItem>
                  <Badge isRead>{fleet.deviceCount} devices</Badge>
                </SplitItem>
              </Split>
              
              <p style={{ color: 'var(--pf-v6-global--Color--200)', marginBottom: '16px', fontSize: '14px' }}>
                {fleet.description}
              </p>
              
              <Gallery hasGutter minWidths={{ default: '300px' }}>
                {fleet.models.map((model) => (
                  <GalleryItem key={model.id}>
                    <Card style={{ height: '100%' }}>
                      <CardHeader>
                        <Split hasGutter>
                          <SplitItem isFilled>
                            <Title headingLevel="h3" size="md">
                              {model.name}
                            </Title>
                          </SplitItem>
                          <SplitItem>
                            <Label 
                              color={
                                model.status === 'active' ? 'green' : 
                                model.status === 'updating' ? 'orange' : 'red'
                              }
                            >
                              {model.status}
                            </Label>
                          </SplitItem>
                        </Split>
                        <p style={{ fontSize: '14px', color: 'var(--pf-v6-global--Color--200)', margin: 0 }}>
                          {model.version} • {model.type}
                        </p>
                      </CardHeader>
                      
                      <CardBody>
                        <p style={{ fontSize: '14px', marginBottom: '16px' }}>
                          {model.description}
                        </p>
                        
                        <DescriptionList isCompact>
                          <DescriptionListGroup>
                            <DescriptionListTerm>Parameters</DescriptionListTerm>
                            <DescriptionListDescription>{model.parameters}</DescriptionListDescription>
                          </DescriptionListGroup>
                          
                          {model.accuracy && (
                            <DescriptionListGroup>
                              <DescriptionListTerm>Accuracy</DescriptionListTerm>
                              <DescriptionListDescription>{model.accuracy}</DescriptionListDescription>
                            </DescriptionListGroup>
                          )}
                          
                          {model.latency && (
                            <DescriptionListGroup>
                              <DescriptionListTerm>Latency</DescriptionListTerm>
                              <DescriptionListDescription>{model.latency}</DescriptionListDescription>
                            </DescriptionListGroup>
                          )}
                          
                          <DescriptionListGroup>
                            <DescriptionListTerm>API URL</DescriptionListTerm>
                            <DescriptionListDescription>
                              <code 
                                style={{ 
                                  fontFamily: 'var(--pf-v6-global--FontFamily--monospace)',
                                  backgroundColor: 'var(--pf-v6-global--BackgroundColor--200)',
                                  padding: '4px 8px',
                                  borderRadius: '4px',
                                  fontSize: '12px',
                                  display: 'inline-block'
                                }}
                              >
                                {model.apiUrl}
                              </code>
                            </DescriptionListDescription>
                          </DescriptionListGroup>
                        </DescriptionList>
                        
                        <div style={{ marginTop: '16px' }}>
                          <Flex spaceItems={{ default: 'spaceItemsSm' }}>
                            <FlexItem>
                              <Button 
                                variant="primary" 
                                size="sm" 
                                isDisabled={model.status !== 'active'}
                                onClick={() => navigator.clipboard.writeText(model.apiUrl)}
                              >
                                Copy API URL
                              </Button>
                            </FlexItem>
                            <FlexItem>
                              <Button variant="link" size="sm">
                                View Docs
                              </Button>
                            </FlexItem>
                          </Flex>
                        </div>
                      </CardBody>
                    </Card>
                  </GalleryItem>
                ))}
              </Gallery>
              
              {fleetIndex < mockFleets.length - 1 && (
                <Divider style={{ marginTop: '32px' }} />
              )}
            </div>
          ))}
        </PageSection>
      )
    }
    
    return dashboards[selectedRole]
  }

  const renderRoleSpecificContent = () => {
    const currentItem = activeItem || 'dashboard'
    
    // Role-specific content for non-dashboard items
    const contentMap = {
      'data-scientist': {
        'datasets': (
          <PageSection>
            <div style={{ marginBottom: '24px' }}>
              <Title headingLevel="h1" size="2xl" style={{ marginBottom: '8px' }}>
                Dataset Repository
              </Title>
              <p style={{ color: 'var(--pf-v6-global--Color--200)' }}>
                Manage and explore datasets for machine learning model development. Monitor quality, usage, and lineage across your ML pipeline.
              </p>
            </div>
            
            <Gallery hasGutter minWidths={{ default: '350px' }}>
              {mockDatasets.map((dataset) => (
                <GalleryItem key={dataset.id}>
                  <Card style={{ height: '100%' }}>
                    <CardHeader>
                      <Split hasGutter>
                        <SplitItem isFilled>
                          <Title headingLevel="h3" size="md">
                            {dataset.name}
                          </Title>
                        </SplitItem>
                        <SplitItem>
                          <Label 
                            color={
                              dataset.type === 'production' ? 'green' :
                              dataset.type === 'training' ? 'blue' :
                              dataset.type === 'validation' ? 'purple' : 'orange'
                            }
                          >
                            {dataset.type.charAt(0).toUpperCase() + dataset.type.slice(1)}
                          </Label>
                        </SplitItem>
                      </Split>
                      <div style={{ fontSize: '14px', color: 'var(--pf-v6-global--Color--200)', marginTop: '4px' }}>
                        {dataset.format} • {dataset.size} • {dataset.recordCount.toLocaleString()} records
                      </div>
                    </CardHeader>
                    <CardBody>
                      <p style={{ fontSize: '14px', marginBottom: '16px', color: 'var(--pf-v6-global--Color--200)' }}>
                        {dataset.description}
                      </p>
                      
                      {/* Dataset Metadata */}
                      <div style={{ marginBottom: '16px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '13px' }}>
                          <div>
                            <strong>Created by:</strong><br />
                            <span style={{ color: 'var(--pf-v6-global--Color--200)' }}>{dataset.createdBy}</span>
                          </div>
                          <div>
                            <strong>Version:</strong><br />
                            <span style={{ color: 'var(--pf-v6-global--Color--200)' }}>{dataset.version}</span>
                          </div>
                          <div>
                            <strong>Created:</strong><br />
                            <span style={{ color: 'var(--pf-v6-global--Color--200)' }}>{dataset.createdDate}</span>
                          </div>
                          <div>
                            <strong>Modified:</strong><br />
                            <span style={{ color: 'var(--pf-v6-global--Color--200)' }}>{dataset.lastModified}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Quality Metrics */}
                      <div style={{ marginBottom: '16px' }}>
                        <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '8px' }}>Data Quality</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', fontSize: '12px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Completeness:</span>
                            <span style={{ 
                              color: dataset.quality.completeness >= 95 ? 'var(--pf-v6-global--palette--green--600)' : 
                                     dataset.quality.completeness >= 90 ? 'var(--pf-v6-global--palette--orange--600)' : 
                                     'var(--pf-v6-global--palette--red--600)'
                            }}>
                              {dataset.quality.completeness}%
                            </span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Validity:</span>
                            <span style={{ 
                              color: dataset.quality.validity >= 95 ? 'var(--pf-v6-global--palette--green--600)' : 
                                     dataset.quality.validity >= 90 ? 'var(--pf-v6-global--palette--orange--600)' : 
                                     'var(--pf-v6-global--palette--red--600)'
                            }}>
                              {dataset.quality.validity}%
                            </span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Consistency:</span>
                            <span style={{ 
                              color: dataset.quality.consistency >= 95 ? 'var(--pf-v6-global--palette--green--600)' : 
                                     dataset.quality.consistency >= 90 ? 'var(--pf-v6-global--palette--orange--600)' : 
                                     'var(--pf-v6-global--palette--red--600)'
                            }}>
                              {dataset.quality.consistency}%
                            </span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Duplicates:</span>
                            <span style={{ 
                              color: dataset.quality.duplicates <= 1 ? 'var(--pf-v6-global--palette--green--600)' : 
                                     dataset.quality.duplicates <= 5 ? 'var(--pf-v6-global--palette--orange--600)' : 
                                     'var(--pf-v6-global--palette--red--600)'
                            }}>
                              {dataset.quality.duplicates}%
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Storage & Usage Info */}
                      <div style={{ marginBottom: '16px', fontSize: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span>Storage:</span>
                          <span style={{ color: 'var(--pf-v6-global--Color--200)' }}>{dataset.storage.provider}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span>Access Level:</span>
                          <Label size="sm" color={
                            dataset.storage.accessLevel === 'public' ? 'green' :
                            dataset.storage.accessLevel === 'private' ? 'blue' : 'orange'
                          }>
                            {dataset.storage.accessLevel}
                          </Label>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span>Models Using:</span>
                          <span style={{ color: 'var(--pf-v6-global--Color--200)' }}>{dataset.usage.modelsUsing}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>Downloads:</span>
                          <span style={{ color: 'var(--pf-v6-global--Color--200)' }}>{dataset.usage.downloadCount}</span>
                        </div>
                      </div>
                      
                      {/* Tags */}
                      {dataset.tags.length > 0 && (
                        <div style={{ marginBottom: '16px' }}>
                          <div style={{ marginBottom: '4px', fontSize: '12px', fontWeight: '600' }}>Tags:</div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                            {dataset.tags.slice(0, 3).map(tag => (
                              <Label key={tag} size="sm" color="grey">
                                {tag}
                              </Label>
                            ))}
                            {dataset.tags.length > 3 && (
                              <Label size="sm" color="grey">
                                +{dataset.tags.length - 3} more
                              </Label>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {/* Action Buttons */}
                      <Flex spaceItems={{ default: 'spaceItemsSm' }}>
                        <FlexItem>
                          <Button variant="primary" size="sm">
                            <DatabaseIcon style={{ marginRight: '4px' }} />
                            Explore Data
                          </Button>
                        </FlexItem>
                        <FlexItem>
                          <Button variant="secondary" size="sm">
                            Download
                          </Button>
                        </FlexItem>
                        <FlexItem>
                          <Button variant="link" size="sm">
                            View Schema
                          </Button>
                        </FlexItem>
                      </Flex>
                    </CardBody>
                  </Card>
                </GalleryItem>
              ))}
            </Gallery>
          </PageSection>
        )
      },
      'ai-engineer': {
        'models': (
          <PageSection>
            <div style={{ marginBottom: '24px' }}>
              <Title headingLevel="h1" size="2xl" style={{ marginBottom: '8px' }}>
                Models Repository
              </Title>
              <p style={{ color: 'var(--pf-v6-global--Color--200)' }}>
                Review, evaluate, and publish models developed by Data Scientists. Manage model lifecycle from development to production.
              </p>
            </div>
            
            <Gallery hasGutter minWidths={{ default: '400px' }}>
              {mockModelFamilies.map((family) => {
                const selectedVersion = getSelectedVersionForFamily(family.id)
                const isExpanded = expandedModelFamilies[family.id]
                return (
                <GalleryItem key={family.id}>
                  <Card style={{ height: '100%' }}>
                    <CardHeader>
                      <Split hasGutter>
                        <SplitItem isFilled>
                          <Title headingLevel="h3" size="md">
                            {family.name}
                          </Title>
                        </SplitItem>
                        <SplitItem>
                          <Button
                            variant="plain"
                            onClick={() => toggleModelFamilyExpansion(family.id)}
                            style={{ padding: '4px' }}
                          >
                            {isExpanded ? '▼' : '▶'} {family.versions.length} versions
                          </Button>
                        </SplitItem>
                      </Split>
                      <p style={{ fontSize: '14px', color: 'var(--pf-v6-global--Color--200)', margin: 0 }}>
                        {family.type} • {family.framework}
                      </p>
                      <p style={{ fontSize: '12px', color: 'var(--pf-v6-global--Color--300)', margin: '4px 0 0 0' }}>
                        Developed by {family.developedBy}
                      </p>
                    </CardHeader>
                    
                    <CardBody>
                      <p style={{ fontSize: '14px', marginBottom: '16px', lineHeight: '1.4' }}>
                        {family.description}
                      </p>
                      
                      {selectedVersion && (
                        <>
                          {/* Version Selector */}
                          <div style={{ marginBottom: '16px' }}>
                            <Title headingLevel="h5" size="sm" style={{ marginBottom: '8px' }}>
                              Version Selection
                            </Title>
                            <FormSelect
                              value={selectedModelVersions[family.id] || family.currentVersion || family.versions[0]?.version}
                              onChange={(event, value) => handleVersionSelection(family.id, value)}
                            >
                              {family.versions.map((version) => (
                                <FormSelectOption
                                  key={version.version}
                                  value={version.version}
                                  label={`${version.version} (${version.status}${version.accuracy ? ` - ${version.accuracy}` : ''})`}
                                />
                              ))}
                            </FormSelect>
                          </div>

                          {/* Selected Version Details */}
                          <div style={{ marginBottom: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                              <Title headingLevel="h5" size="sm" style={{ margin: 0 }}>
                                {selectedVersion.version} Details
                              </Title>
                              <Label 
                                color={
                                  selectedVersion.status === 'published' ? 'green' :
                                  selectedVersion.status === 'ready' ? 'blue' :
                                  selectedVersion.status === 'draft' ? 'orange' : 
                                  selectedVersion.status === 'unpublished' ? 'grey' : 'red'
                                }
                              >
                                {selectedVersion.status === 'published' ? 'Published' :
                                 selectedVersion.status === 'ready' ? 'Ready' :
                                 selectedVersion.status === 'draft' ? 'Draft' :
                                 selectedVersion.status === 'unpublished' ? 'Unpublished' : 'Deprecated'}
                              </Label>
                            </div>
                            
                            <p style={{ fontSize: '12px', color: 'var(--pf-v6-global--Color--200)', marginBottom: '8px' }}>
                              Created: {selectedVersion.createdDate} • Size: {selectedVersion.modelSize}
                              {selectedVersion.publishedDate && ` • Published: ${selectedVersion.publishedDate}`}
                              {selectedVersion.unpublishedDate && ` • Unpublished: ${selectedVersion.unpublishedDate}`}
                            </p>
                          </div>

                          {/* Performance Metrics */}
                          <div style={{ marginBottom: '16px' }}>
                            <Title headingLevel="h5" size="sm" style={{ marginBottom: '8px' }}>
                              Performance Metrics
                            </Title>
                            <DescriptionList isCompact isHorizontal>
                              {selectedVersion.accuracy && (
                                <DescriptionListGroup>
                                  <DescriptionListTerm>Accuracy</DescriptionListTerm>
                                  <DescriptionListDescription>
                                    <strong style={{ color: 'var(--pf-v6-global--palette--green--500)' }}>
                                      {selectedVersion.accuracy}
                                    </strong>
                                  </DescriptionListDescription>
                                </DescriptionListGroup>
                              )}
                              <DescriptionListGroup>
                                <DescriptionListTerm>F1 Score</DescriptionListTerm>
                                <DescriptionListDescription>
                                  <strong>{selectedVersion.evaluations.f1Score.toFixed(1)}%</strong>
                                </DescriptionListDescription>
                              </DescriptionListGroup>
                              <DescriptionListGroup>
                                <DescriptionListTerm>Fairness</DescriptionListTerm>
                                <DescriptionListDescription>
                                  <strong style={{ 
                                    color: selectedVersion.evaluations.fairness > 0.8 ? 'var(--pf-v6-global--palette--green--500)' : 
                                           selectedVersion.evaluations.fairness > 0.6 ? 'var(--pf-v6-global--palette--orange--500)' : 
                                           'var(--pf-v6-global--palette--red--500)' 
                                  }}>
                                    {selectedVersion.evaluations.fairness.toFixed(2)}
                                  </strong>
                                </DescriptionListDescription>
                              </DescriptionListGroup>
                              <DescriptionListGroup>
                                <DescriptionListTerm>Bias Score</DescriptionListTerm>
                                <DescriptionListDescription>
                                  <strong style={{ 
                                    color: selectedVersion.evaluations.bias < 0.2 ? 'var(--pf-v6-global--palette--green--500)' : 
                                           selectedVersion.evaluations.bias < 0.4 ? 'var(--pf-v6-global--palette--orange--500)' : 
                                           'var(--pf-v6-global--palette--red--500)' 
                                  }}>
                                    {selectedVersion.evaluations.bias.toFixed(2)}
                                  </strong>
                                </DescriptionListDescription>
                              </DescriptionListGroup>
                            </DescriptionList>
                          </div>
                          
                          {/* Training Details */}
                          <div style={{ marginBottom: '16px' }}>
                            <Title headingLevel="h5" size="sm" style={{ marginBottom: '8px' }}>
                              Training Details
                            </Title>
                            <DescriptionList isCompact>
                              <DescriptionListGroup>
                                <DescriptionListTerm>Dataset</DescriptionListTerm>
                                <DescriptionListDescription>{selectedVersion.trainingDataset}</DescriptionListDescription>
                              </DescriptionListGroup>
                              {selectedVersion.lastEvaluated && (
                                <DescriptionListGroup>
                                  <DescriptionListTerm>Last Evaluated</DescriptionListTerm>
                                  <DescriptionListDescription>{selectedVersion.lastEvaluated}</DescriptionListDescription>
                                </DescriptionListGroup>
                              )}
                            </DescriptionList>
                          </div>

                          {/* Expanded Version List */}
                          {isExpanded && (
                            <div style={{ marginBottom: '16px' }}>
                              <Title headingLevel="h5" size="sm" style={{ marginBottom: '8px' }}>
                                All Versions
                              </Title>
                              <div style={{ 
                                maxHeight: '200px', 
                                overflowY: 'auto',
                                border: '1px solid var(--pf-v6-global--BorderColor--200)',
                                borderRadius: '4px',
                                padding: '8px'
                              }}>
                                {family.versions.map((version, index) => (
                                  <div key={version.version} style={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center',
                                    padding: '8px',
                                    borderBottom: index < family.versions.length - 1 ? '1px solid var(--pf-v6-global--BorderColor--100)' : 'none'
                                  }}>
                                    <div>
                                      <strong>{version.version}</strong>
                                      <div style={{ fontSize: '12px', color: 'var(--pf-v6-global--Color--200)' }}>
                                        Created: {version.createdDate}
                                        {version.accuracy && ` • Accuracy: ${version.accuracy}`}
                                      </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                      <Label 
                                        color={
                                          version.status === 'published' ? 'green' :
                                          version.status === 'ready' ? 'blue' :
                                          version.status === 'draft' ? 'orange' : 
                                          version.status === 'unpublished' ? 'grey' : 'red'
                                        }
                                        style={{ fontSize: '11px' }}
                                      >
                                        {version.status}
                                      </Label>
                                      <div style={{ display: 'flex', gap: '4px' }}>
                                        {version.status === 'ready' && (
                                          <Button 
                                            variant="link" 
                                            size="sm"
                                            onClick={() => handlePublishVersion(family.id, version.id)}
                                            style={{ padding: '2px 4px', fontSize: '11px' }}
                                          >
                                            Publish
                                          </Button>
                                        )}
                                        {version.status === 'published' && (
                                          <Button 
                                            variant="link" 
                                            size="sm"
                                            onClick={() => handleUnpublishVersion(family.id, version.id)}
                                            style={{ padding: '2px 4px', fontSize: '11px' }}
                                          >
                                            Unpublish
                                          </Button>
                                        )}
                                        {version.status === 'unpublished' && (
                                          <Button 
                                            variant="link" 
                                            size="sm"
                                            onClick={() => handlePublishVersion(family.id, version.id)}
                                            style={{ padding: '2px 4px', fontSize: '11px' }}
                                          >
                                            Re-publish
                                          </Button>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {/* Action Buttons */}
                          <div style={{ marginTop: '16px' }}>
                            <Flex spaceItems={{ default: 'spaceItemsSm' }} direction={{ default: 'column' }}>
                              <FlexItem>
                                <Flex spaceItems={{ default: 'spaceItemsSm' }}>
                                  <FlexItem>
                                    {selectedVersion.status === 'ready' && (
                                      <Button 
                                        variant="primary" 
                                        size="sm"
                                        onClick={() => handlePublishVersion(family.id, selectedVersion.id)}
                                      >
                                        <CloudIcon style={{ marginRight: '4px' }} />
                                        Publish Version
                                      </Button>
                                    )}
                                    {selectedVersion.status === 'published' && (
                                      <Button 
                                        variant="danger" 
                                        size="sm"
                                        onClick={() => handleUnpublishVersion(family.id, selectedVersion.id)}
                                      >
                                        <CloudIcon style={{ marginRight: '4px' }} />
                                        Unpublish Version
                                      </Button>
                                    )}
                                    {selectedVersion.status === 'unpublished' && (
                                      <Button 
                                        variant="primary" 
                                        size="sm"
                                        onClick={() => handlePublishVersion(family.id, selectedVersion.id)}
                                      >
                                        <CloudIcon style={{ marginRight: '4px' }} />
                                        Re-publish Version
                                      </Button>
                                    )}
                                    {(selectedVersion.status === 'draft' || selectedVersion.status === 'deprecated') && (
                                      <Button 
                                        variant="primary" 
                                        size="sm"
                                        isDisabled={true}
                                      >
                                        <CloudIcon style={{ marginRight: '4px' }} />
                                        {selectedVersion.status === 'draft' ? 'Not Ready' : 'Deprecated'}
                                      </Button>
                                    )}
                                  </FlexItem>
                                  <FlexItem>
                                    <Button 
                                      variant="secondary" 
                                      size="sm"
                                      onClick={() => {
                                        console.log('Starting evaluation for model:', family.name, selectedVersion.version);
                                      }}
                                    >
                                      <PlayIcon style={{ marginRight: '4px' }} />
                                      Run Evaluation
                                    </Button>
                                  </FlexItem>
                                </Flex>
                              </FlexItem>
                              <FlexItem>
                                <Flex spaceItems={{ default: 'spaceItemsSm' }}>
                                  <FlexItem>
                                    <Button variant="link" size="sm">
                                      <FileIcon style={{ marginRight: '4px' }} />
                                      View Artifacts
                                    </Button>
                                  </FlexItem>
                                  <FlexItem>
                                    <Button variant="link" size="sm">
                                      <ChartBarIcon style={{ marginRight: '4px' }} />
                                      Detailed Metrics
                                    </Button>
                                  </FlexItem>
                                </Flex>
                              </FlexItem>
                            </Flex>
                          </div>
                        </>
                      )}
                    </CardBody>
                  </Card>
                </GalleryItem>
                )
              })}
            </Gallery>
          </PageSection>
        ),
        'evaluations': (
          <PageSection>
            <div style={{ marginBottom: '24px' }}>
              <Title headingLevel="h1" size="2xl" style={{ marginBottom: '8px' }}>
                Model Evaluations
              </Title>
              <p style={{ color: 'var(--pf-v6-global--Color--200)' }}>
                Monitor and review all model evaluations including bias, fairness, accuracy, and robustness testing.
              </p>
            </div>
            
            <Card>
              <CardBody>
                <Table aria-label="Model Evaluations Table" variant="compact">
                  <Thead>
                    <Tr>
                      <Th width={25}>Model & Version</Th>
                      <Th width={15}>Evaluation Type</Th>
                      <Th width={15}>Status</Th>
                      <Th width={15}>Overall Score</Th>
                      <Th width={15}>Date</Th>
                      <Th width={15}>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {mockModelEvaluations.map((evaluation) => (
                      <Tr key={evaluation.id}>
                        <Td>
                          <div>
                            <div style={{ fontWeight: '600' }}>{evaluation.modelName}</div>
                            <div style={{ fontSize: '12px', color: 'var(--pf-v6-global--Color--200)' }}>
                              {evaluation.modelVersion}
                            </div>
                          </div>
                        </Td>
                        <Td>
                          <Label 
                            color={
                              evaluation.evaluationType === 'bias' ? 'red' :
                              evaluation.evaluationType === 'fairness' ? 'purple' :
                              evaluation.evaluationType === 'accuracy' ? 'blue' :
                              evaluation.evaluationType === 'performance' ? 'green' : 'orange'
                            }
                            variant="outline"
                          >
                            {evaluation.evaluationType.charAt(0).toUpperCase() + evaluation.evaluationType.slice(1)}
                          </Label>
                        </Td>
                        <Td>
                          <Label 
                            color={
                              evaluation.status === 'completed' ? 'green' :
                              evaluation.status === 'running' ? 'blue' :
                              evaluation.status === 'failed' ? 'red' : 'orange'
                            }
                          >
                            {evaluation.status === 'completed' ? 'Completed' :
                             evaluation.status === 'running' ? 'Running' :
                             evaluation.status === 'failed' ? 'Failed' : 'Queued'}
                          </Label>
                        </Td>
                        <Td>
                          {evaluation.status === 'completed' ? (
                            <div>
                              <strong style={{ 
                                color: evaluation.evaluationType === 'bias' ? 
                                  (evaluation.metrics.overall < 0.2 ? 'var(--pf-v6-global--palette--green--500)' : 
                                   evaluation.metrics.overall < 0.4 ? 'var(--pf-v6-global--palette--orange--500)' : 
                                   'var(--pf-v6-global--palette--red--500)') :
                                  (evaluation.metrics.overall > 80 ? 'var(--pf-v6-global--palette--green--500)' : 
                                   evaluation.metrics.overall > 60 ? 'var(--pf-v6-global--palette--orange--500)' : 
                                   'var(--pf-v6-global--palette--red--500)')
                              }}>
                                {evaluation.evaluationType === 'bias' ? 
                                  evaluation.metrics.overall.toFixed(2) : 
                                  evaluation.evaluationType === 'fairness' ?
                                    evaluation.metrics.overall.toFixed(2) :
                                    `${evaluation.metrics.overall.toFixed(1)}%`}
                              </strong>
                            </div>
                          ) : (
                            <span style={{ color: 'var(--pf-v6-global--Color--200)', fontSize: '12px' }}>
                              {evaluation.status === 'running' ? 'In Progress...' : 'Pending'}
                            </span>
                          )}
                        </Td>
                        <Td>
                          <div>
                            <div style={{ fontSize: '13px' }}>
                              {evaluation.startedDate.split(' ')[0]}
                            </div>
                            <div style={{ fontSize: '11px', color: 'var(--pf-v6-global--Color--200)' }}>
                              {evaluation.completedDate ? 
                                `Completed: ${evaluation.completedDate.split(' ')[1]}` :
                                `Started: ${evaluation.startedDate.split(' ')[1]}`}
                            </div>
                          </div>
                        </Td>
                        <Td>
                          <Flex spaceItems={{ default: 'spaceItemsSm' }}>
                            {evaluation.status === 'completed' && evaluation.report && (
                              <FlexItem>
                                <Button variant="link" size="sm">
                                  <ExternalLinkAltIcon style={{ marginRight: '4px' }} />
                                  Report
                                </Button>
                              </FlexItem>
                            )}
                            {evaluation.status === 'completed' && (
                              <FlexItem>
                                <Button variant="secondary" size="sm">
                                  View Details
                                </Button>
                              </FlexItem>
                            )}
                            {evaluation.status === 'failed' && (
                              <FlexItem>
                                <Button variant="tertiary" size="sm">
                                  Retry
                                </Button>
                              </FlexItem>
                            )}
                          </Flex>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
                
                {mockModelEvaluations.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '48px' }}>
                    <p style={{ color: 'var(--pf-v6-global--Color--200)' }}>
                      No evaluations found. Start evaluating models from the Models tab.
                    </p>
                  </div>
                )}
              </CardBody>
            </Card>
            
            {/* Summary Cards */}
            <div style={{ marginTop: '32px' }}>
              <Title headingLevel="h2" size="xl" style={{ marginBottom: '16px' }}>
                Evaluation Summary
              </Title>
              <Gallery hasGutter minWidths={{ default: '200px' }}>
                <GalleryItem>
                  <Card>
                    <CardBody>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '24px', fontWeight: '600', marginBottom: '4px', color: 'var(--pf-v6-global--palette--green--500)' }}>
                          {mockModelEvaluations.filter(e => e.status === 'completed').length}
                        </div>
                        <div style={{ color: 'var(--pf-v6-global--Color--200)' }}>Completed</div>
                      </div>
                    </CardBody>
                  </Card>
                </GalleryItem>
                <GalleryItem>
                  <Card>
                    <CardBody>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '24px', fontWeight: '600', marginBottom: '4px', color: 'var(--pf-v6-global--palette--blue--500)' }}>
                          {mockModelEvaluations.filter(e => e.status === 'running').length}
                        </div>
                        <div style={{ color: 'var(--pf-v6-global--Color--200)' }}>Running</div>
                      </div>
                    </CardBody>
                  </Card>
                </GalleryItem>
                <GalleryItem>
                  <Card>
                    <CardBody>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '24px', fontWeight: '600', marginBottom: '4px', color: 'var(--pf-v6-global--palette--orange--500)' }}>
                          {mockModelEvaluations.filter(e => e.status === 'queued').length}
                        </div>
                        <div style={{ color: 'var(--pf-v6-global--Color--200)' }}>Queued</div>
                      </div>
                    </CardBody>
                  </Card>
                </GalleryItem>
                <GalleryItem>
                  <Card>
                    <CardBody>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '24px', fontWeight: '600', marginBottom: '4px', color: 'var(--pf-v6-global--palette--red--500)' }}>
                          {mockModelEvaluations.filter(e => e.status === 'failed').length}
                        </div>
                        <div style={{ color: 'var(--pf-v6-global--Color--200)' }}>Failed</div>
                      </div>
                    </CardBody>
                  </Card>
                </GalleryItem>
              </Gallery>
            </div>
          </PageSection>
        ),
        'datasets': (
          <PageSection>
            <div style={{ marginBottom: '24px' }}>
              <Title headingLevel="h1" size="2xl" style={{ marginBottom: '8px' }}>
                Dataset Repository
              </Title>
              <p style={{ color: 'var(--pf-v6-global--Color--200)' }}>
                Manage and explore datasets for machine learning model development. Monitor quality, usage, and lineage across your ML pipeline.
              </p>
            </div>
            
            <Gallery hasGutter minWidths={{ default: '350px' }}>
              {mockDatasets.map((dataset) => (
                <GalleryItem key={dataset.id}>
                  <Card style={{ height: '100%' }}>
                    <CardHeader>
                      <Split hasGutter>
                        <SplitItem isFilled>
                          <Title headingLevel="h3" size="md">
                            {dataset.name}
                          </Title>
                        </SplitItem>
                        <SplitItem>
                          <Label 
                            color={
                              dataset.type === 'production' ? 'green' :
                              dataset.type === 'training' ? 'blue' :
                              dataset.type === 'validation' ? 'purple' : 'orange'
                            }
                          >
                            {dataset.type.charAt(0).toUpperCase() + dataset.type.slice(1)}
                          </Label>
                        </SplitItem>
                      </Split>
                      <div style={{ fontSize: '14px', color: 'var(--pf-v6-global--Color--200)', marginTop: '4px' }}>
                        {dataset.format} • {dataset.size} • {dataset.recordCount.toLocaleString()} records
                      </div>
                    </CardHeader>
                    <CardBody>
                      <p style={{ fontSize: '14px', marginBottom: '16px', color: 'var(--pf-v6-global--Color--200)' }}>
                        {dataset.description}
                      </p>
                      
                      {/* Dataset Metadata */}
                      <div style={{ marginBottom: '16px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '13px' }}>
                          <div>
                            <strong>Created by:</strong><br />
                            <span style={{ color: 'var(--pf-v6-global--Color--200)' }}>{dataset.createdBy}</span>
                          </div>
                          <div>
                            <strong>Version:</strong><br />
                            <span style={{ color: 'var(--pf-v6-global--Color--200)' }}>{dataset.version}</span>
                          </div>
                          <div>
                            <strong>Created:</strong><br />
                            <span style={{ color: 'var(--pf-v6-global--Color--200)' }}>{dataset.createdDate}</span>
                          </div>
                          <div>
                            <strong>Modified:</strong><br />
                            <span style={{ color: 'var(--pf-v6-global--Color--200)' }}>{dataset.lastModified}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Quality Metrics */}
                      <div style={{ marginBottom: '16px' }}>
                        <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '8px' }}>Data Quality</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', fontSize: '12px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Completeness:</span>
                            <span style={{ 
                              color: dataset.quality.completeness >= 95 ? 'var(--pf-v6-global--palette--green--600)' : 
                                     dataset.quality.completeness >= 90 ? 'var(--pf-v6-global--palette--orange--600)' : 
                                     'var(--pf-v6-global--palette--red--600)'
                            }}>
                              {dataset.quality.completeness}%
                            </span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Validity:</span>
                            <span style={{ 
                              color: dataset.quality.validity >= 95 ? 'var(--pf-v6-global--palette--green--600)' : 
                                     dataset.quality.validity >= 90 ? 'var(--pf-v6-global--palette--orange--600)' : 
                                     'var(--pf-v6-global--palette--red--600)'
                            }}>
                              {dataset.quality.validity}%
                            </span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Consistency:</span>
                            <span style={{ 
                              color: dataset.quality.consistency >= 95 ? 'var(--pf-v6-global--palette--green--600)' : 
                                     dataset.quality.consistency >= 90 ? 'var(--pf-v6-global--palette--orange--600)' : 
                                     'var(--pf-v6-global--palette--red--600)'
                            }}>
                              {dataset.quality.consistency}%
                            </span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Duplicates:</span>
                            <span style={{ 
                              color: dataset.quality.duplicates <= 1 ? 'var(--pf-v6-global--palette--green--600)' : 
                                     dataset.quality.duplicates <= 5 ? 'var(--pf-v6-global--palette--orange--600)' : 
                                     'var(--pf-v6-global--palette--red--600)'
                            }}>
                              {dataset.quality.duplicates}%
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Storage & Usage Info */}
                      <div style={{ marginBottom: '16px', fontSize: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span>Storage:</span>
                          <span style={{ color: 'var(--pf-v6-global--Color--200)' }}>{dataset.storage.provider}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span>Access Level:</span>
                          <Label size="sm" color={
                            dataset.storage.accessLevel === 'public' ? 'green' :
                            dataset.storage.accessLevel === 'private' ? 'blue' : 'orange'
                          }>
                            {dataset.storage.accessLevel}
                          </Label>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span>Models Using:</span>
                          <span style={{ color: 'var(--pf-v6-global--Color--200)' }}>{dataset.usage.modelsUsing}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>Downloads:</span>
                          <span style={{ color: 'var(--pf-v6-global--Color--200)' }}>{dataset.usage.downloadCount}</span>
                        </div>
                      </div>
                      
                      {/* Tags */}
                      {dataset.tags.length > 0 && (
                        <div style={{ marginBottom: '16px' }}>
                          <div style={{ marginBottom: '4px', fontSize: '12px', fontWeight: '600' }}>Tags:</div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                            {dataset.tags.slice(0, 3).map(tag => (
                              <Label key={tag} size="sm" color="grey">
                                {tag}
                              </Label>
                            ))}
                            {dataset.tags.length > 3 && (
                              <Label size="sm" color="grey">
                                +{dataset.tags.length - 3} more
                              </Label>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {/* Action Buttons */}
                      <Flex spaceItems={{ default: 'spaceItemsSm' }}>
                        <FlexItem>
                          <Button variant="primary" size="sm">
                            <DatabaseIcon style={{ marginRight: '4px' }} />
                            Explore Data
                          </Button>
                        </FlexItem>
                        <FlexItem>
                          <Button variant="secondary" size="sm">
                            Download
                          </Button>
                        </FlexItem>
                        <FlexItem>
                          <Button variant="link" size="sm">
                            View Schema
                          </Button>
                        </FlexItem>
                      </Flex>
                    </CardBody>
                  </Card>
                </GalleryItem>
              ))}
            </Gallery>
          </PageSection>
        )
      },
      'site-engineer': {
        'available-models': (
          <PageSection>
            <p style={{ marginBottom: '24px', color: 'var(--pf-v6-global--Color--200)' }}>
              Deploy AI Engineer published models to your managed fleets. Monitor deployment status and manage model versions.
            </p>
            
            <Gallery hasGutter minWidths={{ default: '400px' }}>
              {mockAvailableModels.map((model) => (
                <GalleryItem key={model.id}>
                  <Card style={{ height: '100%' }}>
                    <CardHeader>
                      <Split hasGutter>
                        <SplitItem isFilled>
                          <Title headingLevel="h3" size="md">
                            {model.name}
                          </Title>
                        </SplitItem>
                        <SplitItem>
                          <Label color="blue">{model.version}</Label>
                        </SplitItem>
                      </Split>
                      <p style={{ fontSize: '14px', color: 'var(--pf-v6-global--Color--200)', margin: 0 }}>
                        {model.type} • {model.modelSize} • Published {model.publishDate}
                      </p>
                      <p style={{ fontSize: '12px', color: 'var(--pf-v6-global--Color--300)', margin: '4px 0 0 0' }}>
                        by {model.publishedBy}
                      </p>
                    </CardHeader>
                    
                    <CardBody>
                      <p style={{ fontSize: '14px', marginBottom: '16px' }}>
                        {model.description}
                      </p>
                      
                      {/* System Requirements */}
                      <div style={{ marginBottom: '16px' }}>
                        <Title headingLevel="h5" size="sm" style={{ marginBottom: '8px' }}>
                          System Requirements
                        </Title>
                        <DescriptionList isCompact isHorizontal>
                          <DescriptionListGroup>
                            <DescriptionListTerm>CPU</DescriptionListTerm>
                            <DescriptionListDescription>{model.requirements.minCpu}</DescriptionListDescription>
                          </DescriptionListGroup>
                          <DescriptionListGroup>
                            <DescriptionListTerm>Memory</DescriptionListTerm>
                            <DescriptionListDescription>{model.requirements.minMemory}</DescriptionListDescription>
                          </DescriptionListGroup>
                          <DescriptionListGroup>
                            <DescriptionListTerm>Storage</DescriptionListTerm>
                            <DescriptionListDescription>{model.requirements.minStorage}</DescriptionListDescription>
                          </DescriptionListGroup>
                        </DescriptionList>
                      </div>
                      
                      <div style={{ marginTop: '16px' }}>
                        <Flex spaceItems={{ default: 'spaceItemsSm' }}>
                          <FlexItem>
                            <Button 
                              variant="primary" 
                              size="sm" 
                              onClick={() => handleDeployModel(model)}
                            >
                              Deploy to Fleet
                            </Button>
                          </FlexItem>
                          <FlexItem>
                            <Button variant="link" size="sm">
                              View Details
                            </Button>
                          </FlexItem>
                        </Flex>
                      </div>
                    </CardBody>
                  </Card>
                </GalleryItem>
              ))}
            </Gallery>
          </PageSection>
        ),
        'deployments': (
          <PageSection>
            {!showDeploymentDetail ? (
              // Deployments List View
              <>
                <div style={{ marginBottom: '24px' }}>
                  <Title headingLevel="h1" size="2xl" style={{ marginBottom: '8px' }}>
                    Model Deployments
                  </Title>
                  <p style={{ color: 'var(--pf-v6-global--Color--200)' }}>
                    Monitor and manage all model deployments across your managed fleets.
                  </p>
                </div>
                
                <Card>
                  <CardBody>
                    <Table aria-label="Model Deployments Table" variant="compact">
                      <Thead>
                        <Tr>
                          <Th width={25}>Deployment Name</Th>
                          <Th width={20}>Model</Th>
                          <Th width={20}>Fleet</Th>
                          <Th width={15}>Status</Th>
                          <Th width={10}>Devices</Th>
                          <Th width={10}>Actions</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {mockDeployments.map((deployment) => (
                          <Tr key={deployment.id}>
                            <Td>
                              <div>
                                <div style={{ fontWeight: '600' }}>{deployment.deploymentName}</div>
                                <div style={{ fontSize: '12px', color: 'var(--pf-v6-global--Color--200)' }}>
                                  Deployed: {deployment.deployedDate}
                                </div>
                              </div>
                            </Td>
                            <Td>
                              <div>
                                <div>{deployment.modelName}</div>
                                <div style={{ fontSize: '12px', color: 'var(--pf-v6-global--Color--200)' }}>
                                  {deployment.modelVersion}
                                </div>
                              </div>
                            </Td>
                            <Td>
                              <div>{deployment.fleetName}</div>
                            </Td>
                            <Td>
                              <Label 
                                color={
                                  deployment.status === 'active' ? 'green' :
                                  deployment.status === 'deploying' ? 'orange' :
                                  deployment.status === 'failed' ? 'red' :
                                  deployment.status === 'updating' ? 'blue' : 'grey'
                                }
                              >
                                {deployment.status === 'active' ? 'Active' :
                                 deployment.status === 'deploying' ? 'Deploying' :
                                 deployment.status === 'failed' ? 'Failed' :
                                 deployment.status === 'updating' ? 'Updating' : 'Stopped'}
                              </Label>
                              <div style={{ fontSize: '11px', color: 'var(--pf-v6-global--Color--200)', marginTop: '4px' }}>
                                {deployment.successfulDevices}/{deployment.deviceCount} successful
                              </div>
                            </Td>
                            <Td>
                              <div style={{ fontSize: '14px' }}>
                                {deployment.deviceCount}
                              </div>
                            </Td>
                            <Td>
                              <Button 
                                variant="secondary" 
                                size="sm"
                                onClick={() => handleViewDeploymentDetails(deployment)}
                              >
                                Details
                              </Button>
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                    
                    {mockDeployments.length === 0 && (
                      <div style={{ textAlign: 'center', padding: '48px' }}>
                        <p style={{ color: 'var(--pf-v6-global--Color--200)' }}>
                          No deployments found. Deploy models from the Available Models tab.
                        </p>
                      </div>
                    )}
                  </CardBody>
                </Card>
              </>
            ) : (
              // Deployment Detail View
              selectedDeployment && (
                <>
                  {/* Header with back button */}
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                      <Button variant="link" onClick={handleBackToDeployments} style={{ padding: '0', marginRight: '16px' }}>
                        ← Back to Deployments
                      </Button>
                      <Title headingLevel="h1" size="2xl" style={{ margin: 0 }}>
                        {selectedDeployment.deploymentName}
                      </Title>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Label 
                        color={
                          selectedDeployment.status === 'active' ? 'green' :
                          selectedDeployment.status === 'deploying' ? 'orange' :
                          selectedDeployment.status === 'failed' ? 'red' :
                          selectedDeployment.status === 'updating' ? 'blue' : 'grey'
                        }
                      >
                        {selectedDeployment.status === 'active' ? 'Active' :
                         selectedDeployment.status === 'deploying' ? 'Deploying' :
                         selectedDeployment.status === 'failed' ? 'Failed' :
                         selectedDeployment.status === 'updating' ? 'Updating' : 'Stopped'}
                      </Label>
                      <span style={{ color: 'var(--pf-v6-global--Color--200)' }}>
                        {selectedDeployment.modelName} {selectedDeployment.modelVersion} → {selectedDeployment.fleetName}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ marginBottom: '24px' }}>
                    <Flex spaceItems={{ default: 'spaceItemsSm' }}>
                      <FlexItem>
                        <Button variant="primary">
                          Upgrade Deployment
                        </Button>
                      </FlexItem>
                      <FlexItem>
                        <Button variant="secondary">
                          Edit Configuration
                        </Button>
                      </FlexItem>
                      <FlexItem>
                        <Button variant="danger">
                          Stop Deployment
                        </Button>
                      </FlexItem>
                    </Flex>
                  </div>

                  {/* Performance Overview Cards */}
                  <div style={{ marginBottom: '24px' }}>
                    <Title headingLevel="h2" size="xl" style={{ marginBottom: '16px' }}>
                      Performance Overview
                    </Title>
                    <Gallery hasGutter minWidths={{ default: '200px' }}>
                      <GalleryItem>
                        <Card>
                          <CardBody>
                            <div style={{ textAlign: 'center' }}>
                              <div style={{ fontSize: '24px', fontWeight: '600', marginBottom: '4px' }}>
                                {selectedDeployment.successfulDevices}/{selectedDeployment.deviceCount}
                              </div>
                              <div style={{ color: 'var(--pf-v6-global--Color--200)' }}>Successful Devices</div>
                            </div>
                          </CardBody>
                        </Card>
                      </GalleryItem>
                      <GalleryItem>
                        <Card>
                          <CardBody>
                            <div style={{ textAlign: 'center' }}>
                              <div style={{ fontSize: '24px', fontWeight: '600', marginBottom: '4px', color: 'var(--pf-v6-global--palette--green--500)' }}>
                                12ms
                              </div>
                              <div style={{ color: 'var(--pf-v6-global--Color--200)' }}>Avg Latency</div>
                            </div>
                          </CardBody>
                        </Card>
                      </GalleryItem>
                      <GalleryItem>
                        <Card>
                          <CardBody>
                            <div style={{ textAlign: 'center' }}>
                              <div style={{ fontSize: '24px', fontWeight: '600', marginBottom: '4px', color: 'var(--pf-v6-global--palette--blue--500)' }}>
                                97.2%
                              </div>
                              <div style={{ color: 'var(--pf-v6-global--Color--200)' }}>Uptime</div>
                            </div>
                          </CardBody>
                        </Card>
                      </GalleryItem>
                      <GalleryItem>
                        <Card>
                          <CardBody>
                            <div style={{ textAlign: 'center' }}>
                              <div style={{ fontSize: '24px', fontWeight: '600', marginBottom: '4px', color: 'var(--pf-v6-global--palette--orange--500)' }}>
                                0.3%
                              </div>
                              <div style={{ color: 'var(--pf-v6-global--Color--200)' }}>Error Rate</div>
                            </div>
                          </CardBody>
                        </Card>
                      </GalleryItem>
                    </Gallery>
                  </div>

                  {/* Performance Charts */}
                  <div style={{ marginBottom: '24px' }}>
                    <Title headingLevel="h2" size="xl" style={{ marginBottom: '16px' }}>
                      Performance Metrics (24h)
                    </Title>
                    <Gallery hasGutter minWidths={{ default: '400px' }}>
                      <GalleryItem>
                        <Card>
                          <CardHeader>
                            <CardTitle>CPU & Memory Usage</CardTitle>
                          </CardHeader>
                          <CardBody>
                            <div style={{ height: '200px' }}>
                              <VictoryChart
                                padding={{ left: 50, top: 20, right: 20, bottom: 50 }}
                                height={200}
                                scale={{ x: 'time' }}
                              >
                                <VictoryAxis dependentAxis />
                                <VictoryAxis />
                                <VictoryArea
                                  data={generateDeploymentPerformanceData(15, 65, 70)}
                                  x="timestamp"
                                  y="cpuUsage"
                                  style={{ data: { fill: '#06c', fillOpacity: 0.3, stroke: '#06c', strokeWidth: 2 } }}
                                />
                                <VictoryArea
                                  data={generateDeploymentPerformanceData(15, 65, 70)}
                                  x="timestamp"
                                  y="memoryUsage"
                                  style={{ data: { fill: '#f0ab00', fillOpacity: 0.3, stroke: '#f0ab00', strokeWidth: 2 } }}
                                />
                              </VictoryChart>
                            </div>
                          </CardBody>
                        </Card>
                      </GalleryItem>
                      <GalleryItem>
                        <Card>
                          <CardHeader>
                            <CardTitle>Response Time & Throughput</CardTitle>
                          </CardHeader>
                          <CardBody>
                            <div style={{ height: '200px' }}>
                              <VictoryChart
                                padding={{ left: 50, top: 20, right: 20, bottom: 50 }}
                                height={200}
                                scale={{ x: 'time' }}
                              >
                                <VictoryAxis dependentAxis />
                                <VictoryAxis />
                                <VictoryLine
                                  data={generateDeploymentPerformanceData(15, 65, 70)}
                                  x="timestamp"
                                  y="latency"
                                  style={{ data: { stroke: '#3e8635', strokeWidth: 3 } }}
                                />
                                <VictoryLine
                                  data={generateDeploymentPerformanceData(15, 65, 70)}
                                  x="timestamp"
                                  y="throughput"
                                  style={{ data: { stroke: '#8b43c7', strokeWidth: 3 } }}
                                />
                              </VictoryChart>
                            </div>
                          </CardBody>
                        </Card>
                      </GalleryItem>
                    </Gallery>
                  </div>

                  {/* Device Health Status */}
                  <div>
                    <Title headingLevel="h2" size="xl" style={{ marginBottom: '16px' }}>
                      Device Health Status
                    </Title>
                    <Card>
                      <CardBody>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                          <div style={{ width: '120px', height: '120px' }}>
                            <VictoryPie
                              data={[
                                { x: 'Healthy', y: selectedDeployment.successfulDevices },
                                { x: 'Failed', y: selectedDeployment.failedDevices },
                                { x: 'Warning', y: Math.max(0, selectedDeployment.deviceCount - selectedDeployment.successfulDevices - selectedDeployment.failedDevices) }
                              ]}
                              innerRadius={40}
                              padAngle={3}
                              colorScale={['#3e8635', '#c9190b', '#f0ab00']}
                              width={120}
                              height={120}
                              padding={10}
                              labelComponent={<></>}
                              standalone={true}
                            />
                          </div>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                              <div style={{ 
                                width: '12px', 
                                height: '12px', 
                                backgroundColor: '#3e8635', 
                                borderRadius: '50%',
                                border: '2px solid #3e8635'
                              }}></div>
                              <span style={{ fontSize: '14px', fontWeight: '500' }}>
                                Healthy: <strong>{selectedDeployment.successfulDevices}</strong>
                              </span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                              <div style={{ 
                                width: '12px', 
                                height: '12px', 
                                backgroundColor: '#c9190b', 
                                borderRadius: '50%',
                                border: '2px solid #c9190b'
                              }}></div>
                              <span style={{ fontSize: '14px', fontWeight: '500' }}>
                                Failed: <strong>{selectedDeployment.failedDevices}</strong>
                              </span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <div style={{ 
                                width: '12px', 
                                height: '12px', 
                                backgroundColor: '#f0ab00', 
                                borderRadius: '50%',
                                border: '2px solid #f0ab00'
                              }}></div>
                              <span style={{ fontSize: '14px', fontWeight: '500' }}>
                                Warning: <strong>{Math.max(0, selectedDeployment.deviceCount - selectedDeployment.successfulDevices - selectedDeployment.failedDevices)}</strong>
                              </span>
                            </div>
                            <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--pf-v6-global--Color--200)' }}>
                              Total: {selectedDeployment.deviceCount} devices
                            </div>
                            <div style={{ marginTop: '4px', fontSize: '12px', color: 'var(--pf-v6-global--Color--200)' }}>
                              Last updated: {selectedDeployment.lastUpdated}
                            </div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                </>
              )
            )}
          </PageSection>
        ),
      },
      'developer': {
        // Only dashboard is implemented for developer
      }
    }
    
    return contentMap[selectedRole]?.[currentItem] || (
      <PageSection>
        <Alert variant="warning" title={`${currentItem} section is coming soon for ${currentRole.name}`} />
      </PageSection>
    )
  }

  const renderContent = () => {
    // Default to dashboard if activeItem is undefined or empty
    const currentItem = activeItem || 'dashboard'
    
    if (currentItem === 'dashboard') {
      return renderDashboard()
    }
    
    if (currentItem === 'settings') {
      return (
        <PageSection>
          <Card>
            <CardTitle>Settings</CardTitle>
            <CardBody>
              <p>Configure your MLOps platform settings for {currentRole.name}.</p>
              <Button variant="primary">Update Configuration</Button>
            </CardBody>
          </Card>
        </PageSection>
      )
    }
    
    return renderRoleSpecificContent()
  }

  return (
    <>
      <Page 
        masthead={masthead} 
        sidebar={sidebar}
        isManagedSidebar
      >
        {renderContent()}
      </Page>
      
      {/* Deployment Modal */}
      <Modal
        variant={ModalVariant.large}
        title="Deploy Model to Fleet"
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
      >
        {selectedModelForDeployment && (
          <div style={{ padding: '24px' }}>
            <Form>
            <FormGroup label="Model Information" fieldId="model-info" style={{ marginBottom: '16px' }}>
              <div style={{ 
                padding: '16px', 
                backgroundColor: 'var(--pf-v6-global--BackgroundColor--200)', 
                borderRadius: '4px'
              }}>
                <Title headingLevel="h4" size="md" style={{ margin: 0, marginBottom: '8px' }}>
                  {selectedModelForDeployment.name}
                </Title>
                <div style={{ marginBottom: '8px', fontSize: '14px', color: 'var(--pf-v6-global--Color--200)' }}>
                  {selectedModelForDeployment.type} • {selectedModelForDeployment.version} • {selectedModelForDeployment.modelSize}
                </div>
                <div style={{ marginBottom: '12px', fontSize: '14px', lineHeight: '1.4' }}>
                  {selectedModelForDeployment.description}
                </div>
                <div style={{ fontSize: '13px' }}>
                  <strong>System Requirements:</strong> {selectedModelForDeployment.requirements.minCpu} CPU, {selectedModelForDeployment.requirements.minMemory} RAM, {selectedModelForDeployment.requirements.minStorage} storage
                </div>
              </div>
            </FormGroup>
          
            <FormGroup 
              label="Target Fleet" 
              fieldId="fleet-select" 
              isRequired
              helperText="Select the fleet where you want to deploy this model. Incompatible fleets are disabled based on device specifications."
              style={{ marginBottom: '16px' }}
            >
              <FormSelect
                value={selectedFleet}
                onChange={(event, value) => setSelectedFleet(value)}
                id="fleet-select"
                name="fleet-select"
              >
                <FormSelectOption value="" label="Select a fleet..." />
                {mockFleets.map((fleet) => {
                  const isCompatible = selectedModelForDeployment && isModelCompatibleWithFleet(selectedModelForDeployment, fleet);
                  return (
                    <FormSelectOption
                      key={fleet.id}
                      value={fleet.id}
                      label={`${fleet.name} (${fleet.deviceCount} devices)${!isCompatible ? ' - ⚠️ Insufficient Resources' : ''}`}
                      isDisabled={!isCompatible}
                    />
                  );
                })}
              </FormSelect>
              {selectedFleet && (
                <div style={{ 
                  marginTop: '12px',
                  padding: '12px', 
                  backgroundColor: 'var(--pf-v6-global--BackgroundColor--200)', 
                  borderRadius: '4px',
                  border: '1px solid var(--pf-v6-global--BorderColor--200)',
                  fontSize: '14px'
                }}>
                  {(() => {
                    const fleet = mockFleets.find(f => f.id === selectedFleet);
                    return fleet ? (
                      <div>
                        <div style={{ fontWeight: '600', marginBottom: '6px', fontSize: '15px' }}>
                          📊 {fleet.name}
                        </div>
                        <div style={{ marginBottom: '8px', color: 'var(--pf-v6-global--Color--200)', fontSize: '13px' }}>
                          {fleet.description}
                        </div>
                        <div style={{ fontSize: '13px' }}>
                          <strong>Device Specifications:</strong> {fleet.deviceSpecs.cpu} cores CPU, {fleet.deviceSpecs.memory}GB RAM, {fleet.deviceSpecs.storage}GB storage
                        </div>
                      </div>
                    ) : null;
                  })()}
                </div>
              )}
            </FormGroup>
          
            <FormGroup 
              label="Deployment Name" 
              fieldId="deployment-name" 
              isRequired
              helperText="Give this deployment a unique name to identify it among multiple deployments of the same model."
              style={{ marginBottom: '16px' }}
            >
              <TextInput
                value={deploymentName}
                onChange={(event, value) => setDeploymentName(value)}
                id="deployment-name"
                name="deployment-name"
                placeholder="e.g., Sentiment Analyzer - Production East Coast"
              />
            </FormGroup>
          
            {selectedFleet && selectedModelForDeployment && (
              <Alert 
                variant="info" 
                title="🚀 Deployment Summary"
                style={{ marginBottom: '16px' }}
                isInline
              >
                <div style={{ fontSize: '14px', lineHeight: '1.4' }}>
                  <strong>{selectedModelForDeployment.name}</strong> ({selectedModelForDeployment.version}) will be deployed to all devices in the <strong>{mockFleets.find(f => f.id === selectedFleet)?.name}</strong> fleet.
                  <div style={{ marginTop: '8px', fontSize: '13px', color: 'var(--pf-v6-global--Color--200)' }}>
                    This deployment will affect <strong>{mockFleets.find(f => f.id === selectedFleet)?.deviceCount} devices</strong> and may take a few minutes to complete.
                  </div>
                </div>
              </Alert>
            )}
            
            {/* Action Buttons */}
            <div style={{ 
              marginTop: '20px', 
              paddingTop: '16px', 
              borderTop: '1px solid var(--pf-v6-global--BorderColor--200)',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px'
            }}>
              <Button
                variant="link"
                onClick={() => setIsDeployModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleDeploymentSubmit}
                isDisabled={!selectedFleet || !deploymentName.trim()}
              >
                Deploy Model to Fleet
              </Button>
            </div>
          </Form>
          </div>
        )}
      </Modal>
    </>
  )
}

export default App
