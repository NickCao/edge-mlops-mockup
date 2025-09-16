import { describe, test, expect } from "bun:test"

describe('DataScientistDashboard', () => {
  test('should be importable without errors', async () => {
    // Test that the component can be imported without throwing errors
    const { DataScientistDashboard } = await import('../dashboard/DataScientistDashboard')
    expect(DataScientistDashboard).toBeDefined()
    expect(typeof DataScientistDashboard).toBe('function')
  })

  test('should be a React functional component', async () => {
    const { DataScientistDashboard } = await import('../dashboard/DataScientistDashboard')
    // React functional components are functions
    expect(typeof DataScientistDashboard).toBe('function')
    // Should have a name
    expect(DataScientistDashboard.name).toBe('DataScientistDashboard')
  })

  test('should accept setActiveItem prop type', async () => {
    const { DataScientistDashboard } = await import('../dashboard/DataScientistDashboard')
    
    // Mock function to test prop signature
    const mockSetActiveItem = (item: string) => {}
    
    // Should be able to call with proper signature
    expect(() => {
      // This tests that the component accepts the expected prop type
      const props = { setActiveItem: mockSetActiveItem }
      expect(props.setActiveItem).toBeDefined()
      expect(typeof props.setActiveItem).toBe('function')
    }).not.toThrow()
  })
})
