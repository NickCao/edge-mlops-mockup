import React from 'react'
import {
  PageSection,
  Gallery,
  GalleryItem,
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  Title,
  Button,
  Alert,
} from '@patternfly/react-core'
import { VictoryChart, VictoryLine, VictoryAxis, VictoryArea, VictoryPie } from 'victory'

interface DataScientistDashboardProps {
  setActiveItem: (item: string) => void
}

export const DataScientistDashboard: React.FC<DataScientistDashboardProps> = ({ setActiveItem }) => {
  return (
    <PageSection>
      {/* Welcome Section */}
      <div style={{ marginBottom: '24px' }}>
        <Title headingLevel="h1" size="2xl" style={{ marginBottom: '8px' }}>
          Welcome back, Data Scientist! 👩‍🔬
        </Title>
        <p style={{ color: 'var(--pf-v6-global--Color--200)', fontSize: '16px' }}>
          Here's your ML development overview for today
        </p>
      </div>

      {/* Quick Stats Row */}
      <Gallery hasGutter minWidths={{ default: '250px' }} style={{ marginBottom: '24px' }}>
        <GalleryItem>
          <Card style={{ height: '120px' }}>
            <CardBody style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--pf-v6-global--palette--blue--600)' }}>7</div>
                <div style={{ fontSize: '14px', color: 'var(--pf-v6-global--Color--200)' }}>Active Experiments</div>
                <div style={{ fontSize: '12px', color: 'var(--pf-v6-global--palette--green--600)', marginTop: '4px' }}>
                  ↑ 23 completed this week
                </div>
              </div>
              <div style={{ fontSize: '32px' }}>🧪</div>
            </CardBody>
          </Card>
        </GalleryItem>
        <GalleryItem>
          <Card style={{ height: '120px' }}>
            <CardBody style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--pf-v6-global--palette--purple--600)' }}>3</div>
                <div style={{ fontSize: '14px', color: 'var(--pf-v6-global--Color--200)' }}>Training Jobs</div>
                <div style={{ fontSize: '12px', color: 'var(--pf-v6-global--palette--orange--600)', marginTop: '4px' }}>
                  5 queued • 2h avg runtime
                </div>
              </div>
              <div style={{ fontSize: '32px' }}>🏃‍♀️</div>
            </CardBody>
          </Card>
        </GalleryItem>
        <GalleryItem>
          <Card style={{ height: '120px' }}>
            <CardBody style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--pf-v6-global--palette--green--600)' }}>94.2%</div>
                <div style={{ fontSize: '14px', color: 'var(--pf-v6-global--Color--200)' }}>Best Model Accuracy</div>
                <div style={{ fontSize: '12px', color: 'var(--pf-v6-global--palette--green--600)', marginTop: '4px' }}>
                  ↑ +1.3% from last week
                </div>
              </div>
              <div style={{ fontSize: '32px' }}>🎯</div>
            </CardBody>
          </Card>
        </GalleryItem>
        <GalleryItem>
          <Card style={{ height: '120px' }}>
            <CardBody style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--pf-v6-global--palette--cyan--600)' }}>2.3TB</div>
                <div style={{ fontSize: '14px', color: 'var(--pf-v6-global--Color--200)' }}>Dataset Storage</div>
                <div style={{ fontSize: '12px', color: 'var(--pf-v6-global--palette--blue--600)', marginTop: '4px' }}>
                  15 datasets available
                </div>
              </div>
              <div style={{ fontSize: '32px' }}>💾</div>
            </CardBody>
          </Card>
        </GalleryItem>
      </Gallery>

      {/* Main Content Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '24px' }}>
        {/* Training Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Training Performance Trends</CardTitle>
          </CardHeader>
          <CardBody>
            <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <VictoryChart
                theme={{ axis: { style: { tickLabels: { fontSize: 12, fill: '#666' } } } }}
                width={500}
                height={280}
                padding={{ left: 60, top: 20, right: 60, bottom: 50 }}
              >
                <VictoryAxis dependentAxis tickFormat={(t) => `${t}%`} />
                <VictoryAxis tickFormat={() => ''} />
                <VictoryLine
                  data={[
                    { x: 1, y: 76 }, { x: 2, y: 82 }, { x: 3, y: 87 }, { x: 4, y: 89 }, 
                    { x: 5, y: 91 }, { x: 6, y: 92 }, { x: 7, y: 94.2 }
                  ]}
                  style={{ data: { stroke: '#06c', strokeWidth: 3 } }}
                />
                <VictoryArea
                  data={[
                    { x: 1, y: 76 }, { x: 2, y: 82 }, { x: 3, y: 87 }, { x: 4, y: 89 }, 
                    { x: 5, y: 91 }, { x: 6, y: 92 }, { x: 7, y: 94.2 }
                  ]}
                  style={{ data: { fill: '#06c', fillOpacity: 0.1 } }}
                />
              </VictoryChart>
            </div>
            <div style={{ textAlign: 'center', color: 'var(--pf-v6-global--Color--200)', fontSize: '12px' }}>
              Model accuracy improvement over the last 7 experiments
            </div>
          </CardBody>
        </Card>

        {/* Quick Actions & Status */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Resource Utilization */}
          <Card>
            <CardHeader>
              <CardTitle>Resource Usage</CardTitle>
            </CardHeader>
            <CardBody>
              <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '14px' }}>GPU Cluster</span>
                  <span style={{ fontSize: '14px', fontWeight: 'bold' }}>73%</span>
                </div>
                <div style={{ 
                  height: '8px', 
                  backgroundColor: 'var(--pf-v6-global--BackgroundColor--200)', 
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: '73%',
                    height: '100%',
                    backgroundColor: 'var(--pf-v6-global--palette--orange--500)'
                  }} />
                </div>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '14px' }}>Storage</span>
                  <span style={{ fontSize: '14px', fontWeight: 'bold' }}>45%</span>
                </div>
                <div style={{ 
                  height: '8px', 
                  backgroundColor: 'var(--pf-v6-global--BackgroundColor--200)', 
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: '45%',
                    height: '100%',
                    backgroundColor: 'var(--pf-v6-global--palette--green--500)'
                  }} />
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '14px' }}>Compute Credits</span>
                  <span style={{ fontSize: '14px', fontWeight: 'bold' }}>1,247</span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--pf-v6-global--Color--200)' }}>
                  $3,741 remaining this month
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardBody>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Button variant="primary" size="sm" onClick={() => setActiveItem('models')}>
                  🚀 Create New Model
                </Button>
                <Button variant="secondary" size="sm" onClick={() => setActiveItem('datasets')}>
                  📊 Browse Datasets
                </Button>
                <Button variant="tertiary" size="sm">
                  📈 View Experiment Logs
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Recent Activities & Insights Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { icon: '🎯', action: 'Model "Sentiment Classifier v2.1.3" achieved 94.2% accuracy', time: '2 hours ago', type: 'success' },
                { icon: '🏃‍♀️', action: 'Started training "Image Classifier" on Medical Dataset', time: '4 hours ago', type: 'info' },
                { icon: '📊', action: 'Uploaded "Customer Reviews Dataset v3" (2.1GB)', time: '6 hours ago', type: 'info' },
                { icon: '⚠️', action: 'Training job "Text Generator" failed - out of memory', time: '8 hours ago', type: 'warning' },
                { icon: '✅', action: 'Completed evaluation on "Fraud Detection Model"', time: '1 day ago', type: 'success' }
              ].map((activity, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  padding: '8px', 
                  borderLeft: `3px solid ${
                    activity.type === 'success' ? 'var(--pf-v6-global--palette--green--500)' :
                    activity.type === 'warning' ? 'var(--pf-v6-global--palette--orange--500)' :
                    'var(--pf-v6-global--palette--blue--500)'
                  }`,
                  backgroundColor: 'var(--pf-v6-global--BackgroundColor--100)'
                }}>
                  <div style={{ fontSize: '16px', marginRight: '12px' }}>{activity.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: '500' }}>{activity.action}</div>
                    <div style={{ fontSize: '12px', color: 'var(--pf-v6-global--Color--200)' }}>{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* AI Insights & Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle>💡 AI Insights & Recommendations</CardTitle>
          </CardHeader>
          <CardBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Alert variant="info" title="Performance Optimization" style={{ marginBottom: '12px' }}>
                Your "Sentiment Classifier" could benefit from data augmentation. Consider adding 20% more diverse samples to improve generalization.
              </Alert>
              
              <div style={{ padding: '12px', backgroundColor: 'var(--pf-v6-global--BackgroundColor--100)', borderRadius: '8px' }}>
                <div style={{ fontWeight: '600', marginBottom: '8px', color: 'var(--pf-v6-global--palette--green--600)' }}>
                  🚀 Trending Models in Your Domain
                </div>
                <div style={{ fontSize: '14px', marginBottom: '4px' }}>• BERT-large-uncased (NLP)</div>
                <div style={{ fontSize: '14px', marginBottom: '4px' }}>• ResNet-50 (Computer Vision)</div>
                <div style={{ fontSize: '14px' }}>• XGBoost (Tabular Data)</div>
              </div>

              <div style={{ padding: '12px', backgroundColor: 'var(--pf-v6-global--BackgroundColor--100)', borderRadius: '8px' }}>
                <div style={{ fontWeight: '600', marginBottom: '8px', color: 'var(--pf-v6-global--palette--purple--600)' }}>
                  📈 Data Quality Insights
                </div>
                <div style={{ fontSize: '14px', marginBottom: '4px' }}>• 2 datasets need attention</div>
                <div style={{ fontSize: '14px', marginBottom: '4px' }}>• Overall quality score: 94.2%</div>
                <div style={{ fontSize: '14px' }}>• Recommend cleaning "User Logs v2"</div>
              </div>

              <Button variant="link" size="sm" style={{ alignSelf: 'flex-start', padding: 0 }}>
                View detailed recommendations →
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Model Performance Distribution */}
      <Card style={{ marginBottom: '24px' }}>
        <CardHeader>
          <CardTitle>Model Performance Distribution</CardTitle>
        </CardHeader>
        <CardBody>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ flex: 1 }}>
              <VictoryPie
                data={[
                  { x: "Production Ready (>90%)", y: 8, label: "8 models" },
                  { x: "Good (80-90%)", y: 12, label: "12 models" },
                  { x: "Needs Improvement (<80%)", y: 5, label: "5 models" }
                ]}
                width={300}
                height={200}
                colorScale={["#3e8635", "#f0ab00", "#c9190b"]}
                labelRadius={({ innerRadius }) => innerRadius + 30}
                style={{ labels: { fontSize: 11, fill: "#333" } }}
              />
            </div>
            <div style={{ flex: 1, paddingLeft: '24px' }}>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ width: '12px', height: '12px', backgroundColor: '#3e8635', marginRight: '8px', borderRadius: '2px' }}></div>
                  <span style={{ fontSize: '14px' }}>Production Ready (&gt;90%): <strong>8 models</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ width: '12px', height: '12px', backgroundColor: '#f0ab00', marginRight: '8px', borderRadius: '2px' }}></div>
                  <span style={{ fontSize: '14px' }}>Good Performance (80-90%): <strong>12 models</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ width: '12px', height: '12px', backgroundColor: '#c9190b', marginRight: '8px', borderRadius: '2px' }}></div>
                  <span style={{ fontSize: '14px' }}>Needs Improvement (&lt;80%): <strong>5 models</strong></span>
                </div>
              </div>
              <div style={{ fontSize: '13px', color: 'var(--pf-v6-global--Color--200)' }}>
                <p><strong>Recommendation:</strong> Focus on improving the 5 underperforming models. Consider feature engineering, hyperparameter tuning, or more training data.</p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Upcoming Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>📅 Scheduled Activities</CardTitle>
        </CardHeader>
        <CardBody>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            <div style={{ padding: '12px', border: '1px solid var(--pf-v6-global--BorderColor--100)', borderRadius: '8px' }}>
              <div style={{ fontWeight: '600', color: 'var(--pf-v6-global--palette--blue--600)', marginBottom: '4px' }}>Today, 3:00 PM</div>
              <div style={{ fontSize: '14px', marginBottom: '2px' }}>Model Review Meeting</div>
              <div style={{ fontSize: '12px', color: 'var(--pf-v6-global--Color--200)' }}>Review Sentiment Classifier v2.1.3 results</div>
            </div>
            <div style={{ padding: '12px', border: '1px solid var(--pf-v6-global--BorderColor--100)', borderRadius: '8px' }}>
              <div style={{ fontWeight: '600', color: 'var(--pf-v6-global--palette--green--600)', marginBottom: '4px' }}>Tomorrow, 10:00 AM</div>
              <div style={{ fontSize: '14px', marginBottom: '2px' }}>Dataset Quality Audit</div>
              <div style={{ fontSize: '12px', color: 'var(--pf-v6-global--Color--200)' }}>Monthly data quality assessment</div>
            </div>
            <div style={{ padding: '12px', border: '1px solid var(--pf-v6-global--BorderColor--100)', borderRadius: '8px' }}>
              <div style={{ fontWeight: '600', color: 'var(--pf-v6-global--palette--purple--600)', marginBottom: '4px' }}>Friday, 2:00 PM</div>
              <div style={{ fontSize: '14px', marginBottom: '2px' }}>ML Pipeline Demo</div>
              <div style={{ fontSize: '12px', color: 'var(--pf-v6-global--Color--200)' }}>Showcase new automated training pipeline</div>
            </div>
          </div>
        </CardBody>
      </Card>
    </PageSection>
  )
}
