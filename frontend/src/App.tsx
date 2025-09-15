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

const App: React.FC = () => {
  const [activeItem, setActiveItem] = React.useState<string>('dashboard')
  const [selectedRole, setSelectedRole] = React.useState<Role>('data-scientist')
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = React.useState(false)
  const [isDeployModalOpen, setIsDeployModalOpen] = React.useState(false)
  const [selectedModelForDeployment, setSelectedModelForDeployment] = React.useState<AvailableModel | null>(null)
  const [selectedFleet, setSelectedFleet] = React.useState<string>('')
  const [deploymentName, setDeploymentName] = React.useState<string>('')
  
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

  const getNavigationGroups = () => {
    const roleConfigs = {
      'data-scientist': {
        title: 'Data Science',
        items: [
          { id: 'experiments', label: 'Experiments', icon: <FlaskIcon /> },
          { id: 'datasets', label: 'Datasets', icon: <DatabaseIcon /> },
          { id: 'training-jobs', label: 'Training Jobs', icon: <PlayIcon /> },
          { id: 'notebooks', label: 'Notebooks', icon: <BookIcon /> }
        ]
      },
      'ai-engineer': {
        title: 'AI Engineering',
        items: [
          { id: 'model-registry', label: 'Model Registry', icon: <RepositoryIcon /> },
          { id: 'deployments', label: 'Deployments', icon: <CloudIcon /> },
          { id: 'monitoring', label: 'Monitoring', icon: <MonitoringIcon /> },
          { id: 'pipelines', label: 'ML Pipelines', icon: <TopologyIcon /> }
        ]
      },
      'site-engineer': {
        title: 'Site Reliability',
        items: [
          { id: 'available-models', label: 'Available Models', icon: <RepositoryIcon /> },
          { id: 'edge-devices', label: 'Edge Devices', icon: <CubeIcon /> },
          { id: 'deployments', label: 'Model Deployments', icon: <ServerIcon /> },
          { id: 'device-health', label: 'Device Health', icon: <HeartIcon /> },
          { id: 'fleet-management', label: 'Fleet Management', icon: <UsersIcon /> }
        ]
      },
      'developer': {
        title: 'API Development',
        items: [
          { id: 'model-catalog', label: 'Overview', icon: <ChartBarIcon /> },
          { id: 'api-explorer', label: 'API Explorer', icon: <ExternalLinkAltIcon /> },
          { id: 'documentation', label: 'API Documentation', icon: <FileIcon /> },
          { id: 'api-keys', label: 'API Keys', icon: <KeyIcon /> },
          { id: 'usage-analytics', label: 'Usage Analytics', icon: <RepositoryIcon /> }
        ]
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
        
        {/* Role-specific navigation group */}
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
        'experiments': (
          <PageSection>
            <Card>
              <CardTitle>ML Experiments</CardTitle>
              <CardBody>
                <p>Manage your machine learning experiments, track metrics, and compare results.</p>
                <Flex>
                  <FlexItem><Button variant="primary">New Experiment</Button></FlexItem>
                  <FlexItem><Button variant="secondary">Compare Results</Button></FlexItem>
                  <FlexItem><Button variant="link">View History</Button></FlexItem>
                </Flex>
              </CardBody>
            </Card>
          </PageSection>
        ),
        'datasets': (
          <PageSection>
            <Card>
              <CardTitle>Dataset Management</CardTitle>
              <CardBody>
                <p>Access and manage your training datasets.</p>
                <Button variant="primary">Upload Dataset</Button>
              </CardBody>
            </Card>
          </PageSection>
        ),
        'training-jobs': (
          <PageSection>
            <Card>
              <CardTitle>Training Jobs</CardTitle>
              <CardBody>
                <p>Monitor and manage your model training jobs.</p>
                <Button variant="primary">Start Training</Button>
              </CardBody>
            </Card>
          </PageSection>
        ),
        'notebooks': (
          <PageSection>
            <Card>
              <CardTitle>Jupyter Notebooks</CardTitle>
              <CardBody>
                <p>Access your development notebooks and create new ones.</p>
                <Button variant="primary">Launch Notebook</Button>
              </CardBody>
            </Card>
          </PageSection>
        )
      },
      'ai-engineer': {
        'model-registry': (
          <PageSection>
            <Card>
              <CardTitle>Model Registry</CardTitle>
              <CardBody>
                <p>Browse and manage registered ML models.</p>
                <Button variant="primary">Register Model</Button>
              </CardBody>
            </Card>
          </PageSection>
        ),
        'deployments': (
          <PageSection>
            <Card>
              <CardTitle>Model Deployments</CardTitle>
              <CardBody>
                <p>Deploy and manage models in different environments.</p>
                <Button variant="primary">Deploy Model</Button>
              </CardBody>
            </Card>
          </PageSection>
        ),
        'monitoring': (
          <PageSection>
            <Card>
              <CardTitle>Model Monitoring</CardTitle>
              <CardBody>
                <p>Monitor model performance and data drift.</p>
                <Button variant="primary">View Metrics</Button>
              </CardBody>
            </Card>
          </PageSection>
        ),
        'pipelines': (
          <PageSection>
            <Card>
              <CardTitle>ML Pipelines</CardTitle>
              <CardBody>
                <p>Create and manage automated ML workflows.</p>
                <Button variant="primary">Create Pipeline</Button>
              </CardBody>
            </Card>
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
        'edge-devices': (
          <PageSection>
            <Card>
              <CardTitle>Edge Device Management</CardTitle>
              <CardBody>
                <p>Monitor and manage edge computing devices.</p>
                <Button variant="primary">Add Device</Button>
              </CardBody>
            </Card>
          </PageSection>
        ),
        'deployments': (
          <PageSection>
            <Card>
              <CardTitle>Edge Deployments</CardTitle>
              <CardBody>
                <p>Deploy models to edge devices and IoT systems.</p>
                <Button variant="primary">Deploy to Edge</Button>
              </CardBody>
            </Card>
          </PageSection>
        ),
        'device-health': (
          <PageSection>
            <Card>
              <CardTitle>Device Health Monitoring</CardTitle>
              <CardBody>
                <p>Monitor the health and performance of edge devices.</p>
                <Button variant="primary">Health Dashboard</Button>
              </CardBody>
            </Card>
          </PageSection>
        ),
        'fleet-management': (
          <PageSection>
            <Card>
              <CardTitle>Fleet Management</CardTitle>
              <CardBody>
                <p>Manage large fleets of edge devices and their configurations.</p>
                <Button variant="primary">Fleet Overview</Button>
              </CardBody>
            </Card>
          </PageSection>
        )
      },
      'developer': {
        'model-catalog': (
          <PageSection>
            <Title headingLevel="h2" size="xl" style={{ marginBottom: '24px' }}>
              Model Overview
            </Title>
            <Gallery hasGutter>
              <GalleryItem>
                <Card>
                  <CardTitle>Available Models</CardTitle>
                  <CardBody>
                    <p>Total models: <strong>{mockFleets.reduce((acc, fleet) => acc + fleet.models.length, 0)}</strong></p>
                    <p>Active models: <strong>{mockFleets.reduce((acc, fleet) => acc + fleet.models.filter(m => m.status === 'active').length, 0)}</strong></p>
                    <Button variant="primary" size="sm" onClick={() => setActiveItem('dashboard')}>View Full Catalog</Button>
                  </CardBody>
                </Card>
              </GalleryItem>
              <GalleryItem>
                <Card>
                  <CardTitle>API Usage</CardTitle>
                  <CardBody>
                    <p>API calls today: <strong>2,341</strong></p>
                    <p>Success rate: <strong>99.7%</strong></p>
                    <Button variant="secondary" size="sm" onClick={() => setActiveItem('usage-analytics')}>View Analytics</Button>
                  </CardBody>
                </Card>
              </GalleryItem>
              <GalleryItem>
                <Card>
                  <CardTitle>Fleet Status</CardTitle>
                  <CardBody>
                    <p>Total devices: <strong>{mockFleets.reduce((acc, fleet) => acc + fleet.deviceCount, 0)}</strong></p>
                    <p>Active fleets: <strong>{mockFleets.length}</strong></p>
                    <Button variant="tertiary" size="sm" onClick={() => setActiveItem('dashboard')}>View Fleet Models</Button>
                  </CardBody>
                </Card>
              </GalleryItem>
            </Gallery>
          </PageSection>
        ),
        'api-explorer': (
          <PageSection>
            <Card>
              <CardTitle>API Explorer</CardTitle>
              <CardBody>
                <p>Test and explore available ML model APIs.</p>
                <Button variant="primary">Open Explorer</Button>
              </CardBody>
            </Card>
          </PageSection>
        ),
        'documentation': (
          <PageSection>
            <Card>
              <CardTitle>API Documentation</CardTitle>
              <CardBody>
                <p>Browse comprehensive API documentation and examples.</p>
                <Button variant="primary">View Docs</Button>
              </CardBody>
            </Card>
          </PageSection>
        ),
        'api-keys': (
          <PageSection>
            <Card>
              <CardTitle>API Key Management</CardTitle>
              <CardBody>
                <p>Manage your API keys and access permissions.</p>
                <Button variant="primary">Generate Key</Button>
              </CardBody>
            </Card>
          </PageSection>
        ),
        'usage-analytics': (
          <PageSection>
            <Card>
              <CardTitle>Usage Analytics</CardTitle>
              <CardBody>
                <p>View detailed analytics of your API usage and performance.</p>
                <Button variant="primary">View Analytics</Button>
              </CardBody>
            </Card>
          </PageSection>
        )
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
