import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ToolSchema,
  CallToolRequest,
  ListToolsRequest,
} from "@modelcontextprotocol/sdk/types.js";
import { spawn } from "child_process";
import { promisify } from "util";

/**
 * MCP Test Server
 * 
 * Provides AI agents with tools to execute testing operations on the meal planner application.
 * Implements the Model Context Protocol using the official SDK.
 */

// ==========================================
// Core Components
// ==========================================

/**
 * MCP Server Framework
 * Implements the Model Context Protocol using the official SDK
 */
class MCPTestServer {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: "meal-planner-test-server",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
    this.setupErrorHandling();
  }

  /**
   * Tool Handlers
   * Fixed operations - each tool executes a specific, predefined npm command
   */
  private setupToolHandlers(): void {
    // Register available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: "run_lint",
            description: "Run ESLint and return linting results",
            inputSchema: {
              type: "object",
              properties: {},
              required: [],
            },
          },
          {
            name: "run_tests", 
            description: "Run Vitest unit tests and return test report",
            inputSchema: {
              type: "object",
              properties: {},
              required: [],
            },
          },
          {
            name: "run_e2e_tests",
            description: "Run Playwright E2E tests and return execution summary",
            inputSchema: {
              type: "object",
              properties: {},
              required: [],
            },
          },
        ],
      };
    });

    // Handle tool execution requests
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name } = request.params;

      switch (name) {
        case "run_lint":
          return await this.executeLintTool();
        case "run_tests":
          return await this.executeTestsTool();
        case "run_e2e_tests":
          return await this.executeE2ETestsTool();
        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    });
  }

  /**
   * Security Layer & Error Handling
   * No arbitrary execution - commands are hardcoded into specific tool implementations
   */
  private setupErrorHandling(): void {
    this.server.onerror = (error) => {
      console.error("[MCP Error]", error);
    };

    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  /**
   * Process Executor & Output Capture
   * Spawns child processes for npm script execution with timeout handling
   */
  private async executeCommand(command: string, args: string[]): Promise<{ stdout: string; stderr: string; exitCode: number }> {
    return new Promise((resolve, reject) => {
      // Path validation: Ensure commands execute in correct project context
      const projectRoot = process.cwd();
      const validCommands = ['npm', 'npx'];
      
      if (!validCommands.includes(command)) {
        reject(new Error(`Invalid command: ${command}. Only ${validCommands.join(', ')} are allowed.`));
        return;
      }

      console.error(`[MCP] Executing: ${command} ${args.join(' ')} in ${projectRoot}`);

      let stdout = '';
      let stderr = '';
      let isTimedOut = false;

      // Spawn child process with resource limits
      const childProcess = spawn(command, args, {
        cwd: projectRoot,
        stdio: ['ignore', 'pipe', 'pipe'],
        env: {
          ...process.env,
          // Resource limits via environment variables
          NODE_OPTIONS: '--max-old-space-size=512', // 512MB memory limit
        },
        // Timeout will be handled separately
      });

      // Set up timeout handling (5 minutes for most operations)
      const timeout = setTimeout(() => {
        if (!childProcess.killed) {
          isTimedOut = true;
          console.error(`[MCP] Command timed out: ${command} ${args.join(' ')}`);
          childProcess.kill('SIGTERM');
          
          // Force kill after additional grace period
          setTimeout(() => {
            if (!childProcess.killed) {
              childProcess.kill('SIGKILL');
            }
          }, 5000);
        }
      }, 5 * 60 * 1000); // 5 minutes

      // Output capture for stdout
      if (childProcess.stdout) {
        childProcess.stdout.on('data', (data) => {
          const chunk = data.toString();
          stdout += chunk;
          // Log progress for long-running commands
          if (chunk.includes('%') || chunk.includes('PASS') || chunk.includes('FAIL')) {
            console.error(`[MCP] Progress: ${chunk.trim()}`);
          }
        });
      }

      // Output capture for stderr
      if (childProcess.stderr) {
        childProcess.stderr.on('data', (data) => {
          const chunk = data.toString();
          stderr += chunk;
          // Log errors immediately
          console.error(`[MCP] Error output: ${chunk.trim()}`);
        });
      }

      // Handle process completion
      childProcess.on('close', (code) => {
        clearTimeout(timeout);
        
        const exitCode = code ?? (isTimedOut ? 124 : 1); // 124 is conventional timeout exit code
        
        console.error(`[MCP] Command completed with exit code: ${exitCode}`);

        if (isTimedOut) {
          resolve({
            stdout: stdout,
            stderr: stderr + '\n[MCP] Process timed out after 5 minutes',
            exitCode: 124
          });
        } else {
          resolve({
            stdout: this.sanitizeOutput(stdout),
            stderr: this.sanitizeOutput(stderr),
            exitCode: exitCode
          });
        }
      });

      // Handle process errors
      childProcess.on('error', (error) => {
        clearTimeout(timeout);
        console.error(`[MCP] Process error: ${error.message}`);
        reject(new Error(`Failed to execute command: ${error.message}`));
      });

      // Handle unexpected process termination
      childProcess.on('disconnect', () => {
        clearTimeout(timeout);
        console.error(`[MCP] Process disconnected unexpectedly`);
        resolve({
          stdout: this.sanitizeOutput(stdout),
          stderr: this.sanitizeOutput(stderr + '\n[MCP] Process disconnected unexpectedly'),
          exitCode: 1
        });
      });
    });
  }

  /**
   * Data Sanitization
   * Filters sensitive information from command outputs
   */
  private sanitizeOutput(output: string): string {
    if (!output) return '';
    
    // Remove potential sensitive patterns
    let sanitized = output
      // Remove absolute paths, keep relative ones
      .replace(new RegExp(process.cwd(), 'g'), '.')
      // Remove potential API keys or tokens (basic patterns)
      .replace(/([A-Za-z0-9_-]*[Kk]ey|[Tt]oken|[Pp]assword)[=:]?\s*[A-Za-z0-9+/=]{10,}/g, '[REDACTED]')
      // Remove npm authentication tokens
      .replace(/_authToken[=:]?\s*[A-Za-z0-9+/=]+/g, '_authToken=[REDACTED]')
      // Limit output size to prevent memory issues
      .substring(0, 50000); // 50KB limit
    
    // Add truncation notice if needed
    if (output.length > 50000) {
      sanitized += '\n\n[MCP] Output truncated - original was larger than 50KB';
    }
    
    return sanitized;
  }

  /**
   * MCP Response Formatter
   * Returns responses in MCP tool result format with data sanitization
   */
  private formatToolResult(output: { stdout: string; stderr: string; exitCode: number }, toolName: string) {
    // Data sanitization: Filter sensitive information from command outputs
    const sanitizedStdout = this.sanitizeOutput(output.stdout);
    const sanitizedStderr = this.sanitizeOutput(output.stderr);

    // Error handling: Provide structured error responses with proper MCP error codes
    if (output.exitCode !== 0) {
      const errorOutput = sanitizedStderr || sanitizedStdout || 'Command failed with no output';
      
      return {
        content: [
          {
            type: "text",
            text: `${toolName} failed (exit code ${output.exitCode}):\n\n${errorOutput}`,
          },
        ],
        isError: true,
      };
    }

    // Standardization: Convert command outputs to MCP tool result format
    const successOutput = sanitizedStdout || 'Command completed successfully with no output';
    
    return {
      content: [
        {
          type: "text",
          text: successOutput,
        },
      ],
    };
  }

  // ==========================================
  // Available Tools Implementation Stubs
  // ==========================================

  /**
   * run_lint Tool
   * Purpose: Executes `npm run lint` and returns linting results
   * Command: Fixed to `npm run lint`
   * Arguments: None
   * Returns: Lint errors, warnings, and summary statistics in text format
   */
  private async executeLintTool() {
    try {
      const result = await this.executeCommand("npm", ["run", "lint"]);
      return this.formatToolResult(result, "run_lint");
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Failed to execute lint command: ${error}`,
          },
        ],
        isError: true,
      };
    }
  }

  /**
   * run_tests Tool  
   * Purpose: Executes `npm run test` and returns unit test results
   * Command: Fixed to `npm run test`
   * Arguments: None
   * Returns: Test results, coverage data, and pass/fail status in text format
   */
  private async executeTestsTool() {
    try {
      const result = await this.executeCommand("npm", ["run", "test"]);
      return this.formatToolResult(result, "run_tests");
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Failed to execute test command: ${error}`,
          },
        ],
        isError: true,
      };
    }
  }

  /**
   * run_e2e_tests Tool
   * Purpose: Executes `npm run test:e2e` and returns end-to-end test results  
   * Command: Fixed to `npm run test:e2e`
   * Arguments: None
   * Returns: E2E test results, screenshots on failures, and execution summary in text format
   */
  private async executeE2ETestsTool() {
    try {
      const result = await this.executeCommand("npm", ["run", "test:e2e"]);
      return this.formatToolResult(result, "run_e2e_tests");
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Failed to execute e2e test command: ${error}`,
          },
        ],
        isError: true,
      };
    }
  }

  /**
   * Start the MCP server
   * Transport: Stdio-based communication with AI agents
   * Protocol: JSON-RPC 2.0 messaging for tool invocation
   */
  async start(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("MCP Test Server running on stdio");
  }
}

// ==========================================
// Server Initialization
// ==========================================

async function main() {
  const server = new MCPTestServer();
  await server.start();
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error("Failed to start MCP server:", error);
    process.exit(1);
  });
}