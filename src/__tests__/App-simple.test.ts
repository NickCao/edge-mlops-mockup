import { describe, test, expect } from "bun:test"

describe('App Component', () => {
  test('should be importable without errors', async () => {
    // Test that the main App component can be imported
    const App = await import('../App')
    expect(App.default).toBeDefined()
    expect(typeof App.default).toBe('function')
  })

  test('should be a React functional component', async () => {
    const App = await import('../App')
    // React functional components are functions
    expect(typeof App.default).toBe('function')
    // Should have a name (might be 'default' for default export)
    expect(App.default.name).toBeDefined()
  })

  test('should import required dependencies', async () => {
    // Test that all the required modules can be imported
    try {
      await import('../types/index')
      await import('../data/mockData')
      await import('../components/dashboard/DataScientistDashboard')
      // If we get here, all imports succeeded
      expect(true).toBe(true)
    } catch (error) {
      // If any import fails, the test should fail
      expect(error).toBeUndefined()
    }
  })

  test('should export App component as default', async () => {
    const AppModule = await import('../App')
    expect(AppModule.default).toBeDefined()
    expect(typeof AppModule.default).toBe('function')
    
    // Should not export anything else as named exports for the main App
    const namedExports = Object.keys(AppModule).filter(key => key !== 'default')
    expect(namedExports.length).toBe(0)
  })
})
