// === Jest Testing Syllabus (Beginner to Master) ===

// === 1. Beginner Foundations ===
// Why Test?
// - Ensure code reliability and prevent regressions
// - Serve as living documentation and design feedback
//
// Introduction to Jest
// - What Jest is and why it’s popular for JavaScript/TypeScript
// - Zero-config setup, snapshot testing, built-in coverage
//
// Getting Started
// - Install: npm install --save-dev jest
// - Add "test": "jest" to package.json scripts
// - Run: npx jest
//
// Basic Test Structure
// - File naming: *.test.js / *.spec.js
// - test() / it() syntax
// - Common matchers: toBe, toEqual, toMatch

// === 2. Core Jest API & Patterns ===
// Organizing Tests
// - describe() for grouping related tests
// - Lifecycle hooks: beforeAll, afterAll, beforeEach, afterEach
// - Focusing/skipping: test.only, test.skip, describe.only
//
// Deep Dive into Matchers
// - Number/String/Array/Object matchers: toBeGreaterThan, toContain, toMatchObject
// - Truthiness & exceptions: toBeTruthy, toThrow
//
// Asynchronous Testing
// - Callback style with done
// - Promise style with resolves/rejects
// - async/await tests
//
// Snapshot Testing
// - When to use (UI, serialized data)
// - Generating/updating snapshots: npx jest --updateSnapshot

// === 3. Intermediate Techniques ===
// Mocking & Spying
// - jest.fn() for dummy functions
// - jest.spyOn() to observe real module methods
// - jest.mock('moduleName') for module mocks
//
// Fake Timers
// - jest.useFakeTimers() to control timers
// - jest.advanceTimersByTime(ms) to simulate time
//
// DOM & React Component Testing
// - Integrate with @testing-library/react
// - Render, query, fire events, assert behavior
// - Snapshot vs behavior-driven assertions
//
// Jest Configuration
// - jest.config.js: testEnvironment, moduleNameMapper, setupFiles
// - Babel & TS support: babel-jest, ts-jest

// === 4. Advanced Practices ===
// Code Coverage
// - Enable with npx jest --coverage
// - Interpret reports: statements, branches, functions, lines
// - Enforce thresholds: coverageThreshold in config
//
// Custom Matchers & Reporters
// - Write matchers via expect.extend()
// - Add custom reporters for HTML/JSON dashboards
//
// Integration & API Testing
// - Use SuperTest for HTTP endpoints
// - Mock databases vs in-memory instances (e.g., SQLite, MongoDB Memory Server)
//
// Performance & Parallelization
// - Tune maxWorkers in config
// - Use test.concurrent for parallel runs
// - Cache transforms to speed up subsequent runs

// === 5. Mastery & Scaling ===
// Test-Driven Development (TDD)
// - Follow "Red → Green → Refactor" workflow
// - Refactor with confidence
//
// Monorepos & Multi-Project Setups
// - Use "projects" array in jest.config.js
// - Share setup/teardown across packages
//
// CI/CD Integration
// - Examples: GitHub Actions, GitLab CI, Jenkins
// - Fail builds on coverage regressions
//
// Test Architecture & Best Practices
// - Co-locate tests with code vs central test folders
// - Naming conventions & test granularity
// - Strategies to avoid flaky tests (isolation, retries)
//
// Contributing to Jest Ecosystem
// - Explore Jest source (TypeScript)
// - Build plugins, serializers, custom runners
// - Engage with community: issues & PRs on GitHub
