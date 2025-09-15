import React from 'react'
import {
  Page,
  Masthead,
  MastheadMain,
  MastheadContent,
  Nav,
  NavList,
  NavItem,
  Card,
  CardBody,
  CardTitle,
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
} from '@patternfly/react-core'
import {
  CaretDownIcon,
  UserIcon,
  CogIcon,
  CodeIcon,
  RocketIcon,
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

const App: React.FC = () => {
  const [activeItem, setActiveItem] = React.useState('dashboard')
  const [selectedRole, setSelectedRole] = React.useState<Role>('data-scientist')
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = React.useState(false)
  
  const currentRole = roles.find(role => role.id === selectedRole)!

  const getNavigationItems = () => {
    const commonItems = [
      { id: 'dashboard', label: 'Dashboard' }
    ]
    
    const roleSpecificItems = {
      'data-scientist': [
        { id: 'experiments', label: 'Experiments' },
        { id: 'datasets', label: 'Datasets' },
        { id: 'training-jobs', label: 'Training Jobs' },
        { id: 'notebooks', label: 'Notebooks' }
      ],
      'ai-engineer': [
        { id: 'model-registry', label: 'Model Registry' },
        { id: 'deployments', label: 'Deployments' },
        { id: 'monitoring', label: 'Monitoring' },
        { id: 'pipelines', label: 'ML Pipelines' }
      ],
      'site-engineer': [
        { id: 'edge-devices', label: 'Edge Devices' },
        { id: 'deployments', label: 'Model Deployments' },
        { id: 'device-health', label: 'Device Health' },
        { id: 'fleet-management', label: 'Fleet Management' }
      ],
      'developer': [
        { id: 'api-explorer', label: 'API Explorer' },
        { id: 'documentation', label: 'API Documentation' },
        { id: 'api-keys', label: 'API Keys' },
        { id: 'usage-analytics', label: 'Usage Analytics' }
      ]
    }
    
    return [
      ...commonItems,
      ...roleSpecificItems[selectedRole],
      { id: 'settings', label: 'Settings' }
    ]
  }

  const navigation = (
    <Nav onSelect={(result) => setActiveItem(result.itemId as string)} aria-label="Nav">
      <NavList>
        {getNavigationItems().map(item => (
          <NavItem 
            key={item.id}
            itemId={item.id} 
            isActive={activeItem === item.id}
          >
            {item.label}
          </NavItem>
        ))}
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
              setSelectedRole(role.id)
              setActiveItem('dashboard')
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
          <Flex alignItems={{ default: 'alignItemsCenter' }} justifyContent={{ default: 'justifyContentSpaceBetween' }}>
            <FlexItem>
              {roleSelector}
            </FlexItem>
            <FlexItem>
              <Title headingLevel="h1" size="lg">
                MLOps Platform
              </Title>
            </FlexItem>
            <FlexItem flex={{ default: 'flex_1' }} />
          </Flex>
        </MastheadContent>
      </MastheadMain>
    </Masthead>
  )

  const sidebar = <PageSidebar nav={navigation} />

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
          <br />
          <Gallery hasGutter>
            <GalleryItem>
              <Card>
                <CardTitle>API Endpoints</CardTitle>
                <CardBody>
                  <p>Available APIs: <strong>24</strong></p>
                  <p>Rate limit: <strong>1000/hr</strong></p>
                  <Button variant="primary" size="sm">API Explorer</Button>
                </CardBody>
              </Card>
            </GalleryItem>
            <GalleryItem>
              <Card>
                <CardTitle>Usage Statistics</CardTitle>
                <CardBody>
                  <p>API calls today: <strong>2,341</strong></p>
                  <p>Success rate: <strong>99.7%</strong></p>
                  <Button variant="secondary" size="sm">View Analytics</Button>
                </CardBody>
              </Card>
            </GalleryItem>
            <GalleryItem>
              <Card>
                <CardTitle>API Keys</CardTitle>
                <CardBody>
                  <p>Active keys: <strong>3</strong></p>
                  <p>Expires soon: <strong>1</strong></p>
                  <Button variant="tertiary" size="sm">Manage Keys</Button>
                </CardBody>
              </Card>
            </GalleryItem>
          </Gallery>
        </PageSection>
      )
    }
    
    return dashboards[selectedRole]
  }

  const renderRoleSpecificContent = () => {
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
    
    return contentMap[selectedRole]?.[activeItem] || (
      <PageSection>
        <Alert variant="warning" title={`${activeItem} section is coming soon for ${currentRole.name}`} />
      </PageSection>
    )
  }

  const renderContent = () => {
    if (activeItem === 'dashboard') {
      return renderDashboard()
    }
    
    if (activeItem === 'settings') {
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
    <Page masthead={masthead} sidebar={sidebar}>
      {renderContent()}
    </Page>
  )
}

export default App
