# MCP Test Server

A simple MCP server providing a simplified API for AI agents to run test commands.

## Execution

To run, run `npx tsx mcp/server.ts`

## Architecture Overview

This MCP (Model Context Protocol) server is designed as a lightweight middleware layer that enables AI agents to interact with development and testing workflows in a controlled manner. The server uses the @modelcontextprotocol/sdk to provide a standardized interface for AI systems to execute testing operations on the meal planner application.

### Core Components

#### 1. MCP Server Framework
- **Purpose**: Implements the Model Context Protocol using the official SDK
- **Transport**: Stdio-based communication with AI agents
- **Protocol**: JSON-RPC 2.0 messaging for tool invocation
- **Capabilities**: Exposes tools for lint, test, and e2e operations

#### 2. Tool Handlers
- **Fixed Operations**: Each tool executes a specific, predefined npm command
- **Process Management**: Spawns child processes for npm script execution
- **Timeout Handling**: Prevents long-running commands from blocking the server
- **Output Capture**: Collects stdout, stderr, and exit codes for each operation

#### 3. MCP Response Formatter
- **Standardization**: Returns responses in MCP tool result format
- **Data Sanitization**: Filters sensitive information from command outputs
- **Error Handling**: Provides structured error responses with proper MCP error codes

#### 4. Security Layer
- **No Arbitrary Execution**: Commands are hardcoded into specific tool implementations
- **Path Validation**: Ensures commands execute in correct project context
- **Resource Limits**: Memory and CPU constraints for executed processes
- **Input Validation**: Tool argument validation without command injection risks

### Data Flow

```
AI Agent → MCP Client → Tool Invocation → Tool Handler → Process Executor → Output Formatter → MCP Tool Result
```

1. **Tool Request**: AI agent requests tool execution via MCP protocol
2. **Tool Dispatch**: MCP server routes request to appropriate tool handler
3. **Process Execution**: Handler executes its predefined npm command
4. **Output Processing**: Captures and formats command output
5. **Result Return**: Returns structured MCP tool result with execution data

### Available Tools

#### `run_lint`
- **Purpose**: Executes `npm run lint` and returns linting results
- **Command**: Fixed to `npm run lint`
- **Arguments**: None
- **Returns**: Lint errors, warnings, and summary statistics in text format

#### `run_tests`
- **Purpose**: Executes `npm run test` and returns unit test results  
- **Command**: Fixed to `npm run test`
- **Arguments**: None
- **Returns**: Test results, coverage data, and pass/fail status in text format

#### `run_e2e_tests`
- **Purpose**: Executes `npm run test:e2e` and returns end-to-end test results
- **Command**: Fixed to `npm run test:e2e`
- **Arguments**: None
- **Returns**: E2E test results, screenshots on failures, and execution summary in text format

### Integration Points

#### With Meal Planner Application
- **Lint Tool**: Executes ESLint checks via `run_lint` tool
- **Test Tool**: Runs Vitest unit tests via `run_tests` tool  
- **E2E Tool**: Triggers Playwright tests via `run_e2e_tests` tool
- **Build Validation**: Future tool for TypeScript compilation checks

#### With Development Workflow
- **AI Agents**: Direct integration with Claude, GPT, and other MCP-compatible AI systems
- **IDE Integration**: Compatible with MCP-enabled editors and development tools
- **Local Development**: Supports developer testing workflows via MCP protocol

### Error Handling Strategy

- **Command Failures**: Returns structured error with exit code and stderr
- **Timeout Scenarios**: Graceful termination with timeout indication  
- **System Errors**: Server-level error responses with appropriate MCP error codes
- **Invalid Tools**: Error responses for unsupported tool requests
- **Process Errors**: Detailed error context when npm commands fail

### Scalability Considerations

- **Stateless Design**: Each request is independent, enabling horizontal scaling
- **Process Isolation**: Each command runs in isolated child process
- **Resource Management**: Memory and CPU limits per operation
- **Concurrent Requests**: Support for multiple simultaneous tool invocations

## Supported Operations

| Tool Name       | Command Executed    | Usage                                                 |
| ---             | ---                 | ---                                                   |
| `run_lint`      | `npm run lint`      | Run ESLint and return linting results                |
| `run_tests`     | `npm run test`      | Run Vitest unit tests and return test report         |
| `run_e2e_tests` | `npm run test:e2e`  | Run Playwright E2E tests and return execution summary|