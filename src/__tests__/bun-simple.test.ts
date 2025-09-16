import { test, expect, describe } from "bun:test"

describe("Simple Bun Test", () => {
  test("basic arithmetic", () => {
    expect(1 + 1).toBe(2)
  })

  test("string operations", () => {
    expect("hello world".toUpperCase()).toBe("HELLO WORLD")
  })

  test("array operations", () => {
    const arr = [1, 2, 3]
    expect(arr.length).toBe(3)
    expect(arr.includes(2)).toBe(true)
  })
})
