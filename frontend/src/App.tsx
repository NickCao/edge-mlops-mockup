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
  models: ModelInfo[]
}

const mockFleets: Fleet[] = [
  {
    id: 'edge-retail',
    name: 'Retail Edge Fleet',
    description: 'Point-of-sale and inventory management devices',
    deviceCount: 45,
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

const App: React.FC = () => {
  const [activeItem, setActiveItem] = React.useState<string>('dashboard')
  const [selectedRole, setSelectedRole] = React.useState<Role>('data-scientist')
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = React.useState(false)
  
  const currentRole = roles.find(role => role.id === selectedRole)!
  
  // Ensure activeItem is always valid
  React.useEffect(() => {
    if (!activeItem) {
      setActiveItem('dashboard')
    }
  }, [activeItem])

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
              console.log('Switching to role:', role.id);
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
          <Alert variant="info" title={`Welcome, ${currentRole.name}!`} />
          <br />
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
          <Alert variant="info" title={`Welcome, ${currentRole.name}!`} />
          <br />
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
          <Alert variant="info" title={`Welcome, ${currentRole.name}!`} />
          <br />
          <Gallery hasGutter>
            <GalleryItem>
              <Card>
                <CardTitle>Edge Devices</CardTitle>
                <CardBody>
                  <p>Connected devices: <strong>128</strong></p>
                  <p>Offline devices: <strong>3</strong></p>
                  <Button variant="primary" size="sm">Manage Fleet</Button>
                </CardBody>
              </Card>
            </GalleryItem>
            <GalleryItem>
              <Card>
                <CardTitle>Model Deployments</CardTitle>
                <CardBody>
                  <p>Deployed models: <strong>15</strong></p>
                  <p>Pending updates: <strong>4</strong></p>
                  <Button variant="secondary" size="sm">Deploy Models</Button>
                </CardBody>
              </Card>
            </GalleryItem>
            <GalleryItem>
              <Card>
                <CardTitle>Device Health</CardTitle>
                <CardBody>
                  <p>Healthy: <strong>125</strong></p>
                  <p>Alerts: <strong>3</strong></p>
                  <Button variant="tertiary" size="sm">Health Check</Button>
                </CardBody>
              </Card>
            </GalleryItem>
          </Gallery>
        </PageSection>
      ),
      'developer': (
        <PageSection>
          <Alert variant="info" title={`Welcome, ${currentRole.name}!`} />
          <p style={{ marginTop: '16px', marginBottom: '24px', color: 'var(--pf-v6-global--Color--200)' }}>
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
    <Page 
      masthead={masthead} 
      sidebar={sidebar}
      isManagedSidebar
    >
      {renderContent()}
    </Page>
  )
}

export default App
