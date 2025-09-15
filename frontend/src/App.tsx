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
} from '@patternfly/react-core'

const App: React.FC = () => {
  const [activeItem, setActiveItem] = React.useState('dashboard')

  const navigation = (
    <Nav onSelect={(result) => setActiveItem(result.itemId as string)} aria-label="Nav">
      <NavList>
        <NavItem 
          itemId="dashboard" 
          isActive={activeItem === 'dashboard'}
        >
          Dashboard
        </NavItem>
        <NavItem 
          itemId="models" 
          isActive={activeItem === 'models'}
        >
          Models
        </NavItem>
        <NavItem 
          itemId="users" 
          isActive={activeItem === 'users'}
        >
          Users
        </NavItem>
        <NavItem 
          itemId="settings" 
          isActive={activeItem === 'settings'}
        >
          Settings
        </NavItem>
      </NavList>
    </Nav>
  )

  const masthead = (
    <Masthead>
      <MastheadMain>
        <MastheadContent>MLOps Platform</MastheadContent>
      </MastheadMain>
    </Masthead>
  )

  const sidebar = <PageSidebar nav={navigation} />

  const renderContent = () => {
    switch (activeItem) {
      case 'dashboard':
        return (
          <PageSection>
            <Alert variant="info" title="Welcome to MLOps Platform" />
            <br />
            <Gallery hasGutter>
              <GalleryItem>
                <Card>
                  <CardTitle>Model Training Jobs</CardTitle>
                  <CardBody>
                    <p>Active training jobs: <strong>3</strong></p>
                    <p>Queued jobs: <strong>5</strong></p>
                    <Button variant="primary" size="sm">View Details</Button>
                  </CardBody>
                </Card>
              </GalleryItem>
              <GalleryItem>
                <Card>
                  <CardTitle>Model Performance</CardTitle>
                  <CardBody>
                    <p>Average accuracy: <strong>94.2%</strong></p>
                    <p>Models in production: <strong>12</strong></p>
                    <Button variant="secondary" size="sm">View Metrics</Button>
                  </CardBody>
                </Card>
              </GalleryItem>
              <GalleryItem>
                <Card>
                  <CardTitle>System Health</CardTitle>
                  <CardBody>
                    <p>CPU Usage: <strong>67%</strong></p>
                    <p>Memory Usage: <strong>45%</strong></p>
                    <Button variant="tertiary" size="sm">Monitor</Button>
                  </CardBody>
                </Card>
              </GalleryItem>
            </Gallery>
          </PageSection>
        )
      case 'models':
        return (
          <PageSection>
            <Card>
              <CardTitle>Model Management</CardTitle>
              <CardBody>
                <p>Manage your machine learning models here.</p>
                <Flex>
                  <FlexItem>
                    <Button variant="primary">Deploy Model</Button>
                  </FlexItem>
                  <FlexItem>
                    <Button variant="secondary">Train New Model</Button>
                  </FlexItem>
                  <FlexItem>
                    <Button variant="link">View Model Registry</Button>
                  </FlexItem>
                </Flex>
              </CardBody>
            </Card>
          </PageSection>
        )
      case 'users':
        return (
          <PageSection>
            <Card>
              <CardTitle>User Management</CardTitle>
              <CardBody>
                <p>Manage user accounts and permissions.</p>
                <Button variant="primary">Add New User</Button>
              </CardBody>
            </Card>
          </PageSection>
        )
      case 'settings':
        return (
          <PageSection>
            <Card>
              <CardTitle>System Settings</CardTitle>
              <CardBody>
                <p>Configure your MLOps platform settings.</p>
                <Button variant="primary">Update Configuration</Button>
              </CardBody>
            </Card>
          </PageSection>
        )
      default:
        return (
          <PageSection>
            <Alert variant="warning" title="Page not found" />
          </PageSection>
        )
    }
  }

  return (
    <Page masthead={masthead} sidebar={sidebar}>
      {renderContent()}
    </Page>
  )
}

export default App
