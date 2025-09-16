import { describe, test, expect } from "bun:test"
import { roles, generateHistoricalData } from '../mockData'
import type { Role, RoleConfig } from '../../types/index'

describe('mockData', () => {
  describe('roles', () => {
    test('should contain all 4 user roles', () => {
      expect(roles.length).toBe(4)
      const roleIds = roles.map(role => role.id)
      expect(roleIds).toContain('data-scientist')
      expect(roleIds).toContain('ai-engineer')
      expect(roleIds).toContain('site-engineer')
      expect(roleIds).toContain('developer')
    })

    test('should have proper structure for each role', () => {
      roles.forEach(role => {
        expect(role).toHaveProperty('id')
        expect(role).toHaveProperty('name')
        expect(role).toHaveProperty('description')
        expect(role).toHaveProperty('icon')
        expect(role).toHaveProperty('color')
        expect(typeof role.id).toBe('string')
        expect(typeof role.name).toBe('string')
        expect(typeof role.description).toBe('string')
        expect(typeof role.color).toBe('string')
      })
    })

    test('should have unique role IDs', () => {
      const roleIds = roles.map(role => role.id)
      const uniqueIds = new Set(roleIds)
      expect(uniqueIds.size).toBe(roleIds.length)
    })

    test('should contain expected role data', () => {
      const dataScientist = roles.find(role => role.id === 'data-scientist')
      expect(dataScientist).toBeDefined()
      expect(dataScientist?.name).toBe('Data Scientist')
      expect(dataScientist?.description).toContain('Train and experiment')

      const aiEngineer = roles.find(role => role.id === 'ai-engineer')
      expect(aiEngineer).toBeDefined()
      expect(aiEngineer?.name).toBe('AI Engineer')
      expect(aiEngineer?.description).toContain('Publish and monitor')
    })
  })

  describe('generateHistoricalData', () => {
    test('should generate data with correct parameters', () => {
      const data = generateHistoricalData(50, 60, 70)
      
      expect(data.length).toBe(24) // 24 hours of data
      expect(Array.isArray(data)).toBe(true)
    })

    test('should generate data with proper structure', () => {
      const data = generateHistoricalData(25, 40, 50)
      
      data.forEach(point => {
        expect(point).toHaveProperty('timestamp')
        expect(point).toHaveProperty('cpuUsage')
        expect(point).toHaveProperty('memoryUsage')
        expect(point).toHaveProperty('latency')
        expect(point).toHaveProperty('throughput')
        expect(point).toHaveProperty('errorRate')

        expect(typeof point.timestamp).toBe('number')
        expect(typeof point.cpuUsage).toBe('number')
        expect(typeof point.memoryUsage).toBe('number')
        expect(typeof point.latency).toBe('number')
        expect(typeof point.throughput).toBe('number')
        expect(typeof point.errorRate).toBe('number')
      })
    })

    test('should generate realistic values', () => {
      const data = generateHistoricalData(30, 50, 60)
      
      data.forEach(point => {
        expect(point.cpuUsage).toBeGreaterThanOrEqual(0)
        expect(point.cpuUsage).toBeLessThanOrEqual(100)
        expect(point.memoryUsage).toBeGreaterThanOrEqual(0)
        expect(point.memoryUsage).toBeLessThanOrEqual(100)
        expect(point.latency).toBeGreaterThan(0)
        expect(point.throughput).toBeGreaterThan(0)
        expect(point.errorRate).toBeGreaterThanOrEqual(0)
        expect(point.errorRate).toBeLessThanOrEqual(10)
      })
    })

    test('should generate chronological timestamps', () => {
      const data = generateHistoricalData(20, 30, 40)
      
      for (let i = 1; i < data.length; i++) {
        expect(data[i].timestamp).toBeGreaterThan(data[i - 1].timestamp)
      }
    })

    test('should respect base values', () => {
      const baseLatency = 25
      const baseCpu = 60
      const baseMemory = 70
      const data = generateHistoricalData(baseLatency, baseCpu, baseMemory)
      
      // Values should be roughly around the base values (within reasonable variance)
      const avgCpu = data.reduce((sum, point) => sum + point.cpuUsage, 0) / data.length
      const avgMemory = data.reduce((sum, point) => sum + point.memoryUsage, 0) / data.length
      const avgLatency = data.reduce((sum, point) => sum + point.latency, 0) / data.length
      
      expect(avgCpu).toBeGreaterThan(baseCpu - 15) // Allow for variance
      expect(avgCpu).toBeLessThan(baseCpu + 15)
      expect(avgMemory).toBeGreaterThan(baseMemory - 10)
      expect(avgMemory).toBeLessThan(baseMemory + 10)
      expect(avgLatency).toBeGreaterThan(baseLatency - 8)
      expect(avgLatency).toBeLessThan(baseLatency + 8)
    })
  })
})
