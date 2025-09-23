---
title: "Handle 3 Intent Types in TypeScript"
date: "2025-09-23"
excerpt: "Learn how to properly handle actionable requests, general questions, and help requests in your TypeScript frontend when integrating with API0's natural language processing."
author:
  name: "API0 Team"
tags: ["TypeScript", "Frontend", "Intent Management", "Natural Language"]
svg: "/svg/blog/intent-types.svg"
---

# Handle 3 Intent Types in TypeScript

When users interact with your natural language interface, their requests fall into three distinct categories. Understanding and properly handling these intent types is crucial for creating a smooth user experience.

## The Three Intent Types

API0 automatically classifies user input into these categories:

- **ACTIONABLE_REQUEST (0)**: Commands that execute actions ("Generate CV for john-doe")
- **GENERAL_QUESTION (1)**: Informational queries ("What is a good CV format?")
- **HELP_REQUEST (2)**: Capability inquiries ("What can you do?")

Each requires different handling in your frontend application.

## TypeScript Interface Setup

First, define the proper types for API0 responses:

```typescript
interface API0AnalysisResult {
  api_group_id: string;
  endpoint_name: string;
  intent: number; // 0, 1, or 2
  json_output: string;
  conversation_id: string;
  parameters: Array<{
    name: string;
    semantic_value?: string;
  }>;
  base: string;
  path: string;
  verb: string;
}

type IntentType = 0 | 1 | 2;

interface ProcessedResponse {
  type: 'action' | 'text' | 'help' | 'error';
  message: string;
  data?: any;
  needsExecution?: boolean;
}
```

## Intent-Based Response Handler

Create a clean handler that routes responses based on intent:

```typescript
class IntentHandler {
  static process(analysisResult: API0AnalysisResult): ProcessedResponse {
    const { intent, json_output, endpoint_name } = analysisResult;
    
    switch (intent) {
      case 0: // ACTIONABLE_REQUEST
        return this.handleActionableRequest(analysisResult);
      
      case 1: // GENERAL_QUESTION
        return this.handleGeneralQuestion(json_output);
      
      case 2: // HELP_REQUEST
        return this.handleHelpRequest(json_output);
      
      default:
        return {
          type: 'error',
          message: 'Unknown intent type received'
        };
    }
  }

  private static handleActionableRequest(result: API0AnalysisResult): ProcessedResponse {
    return {
      type: 'action',
      message: `Ready to execute: ${result.endpoint_name}`,
      data: result,
      needsExecution: true
    };
  }

  private static handleGeneralQuestion(jsonOutput: string): ProcessedResponse {
    try {
      const parsed = JSON.parse(jsonOutput);
      return {
        type: 'text',
        message: parsed.response || 'Here\'s the information you requested.',
        needsExecution: false
      };
    } catch (error) {
      return {
        type: 'text',
        message: 'I can help answer your questions about the system.',
        needsExecution: false
      };
    }
  }

  private static handleHelpRequest(jsonOutput: string): ProcessedResponse {
    try {
      const parsed = JSON.parse(jsonOutput);
      const helpText = parsed.response || 'Here are the available capabilities:';
      
      return {
        type: 'help',
        message: `ℹ️ **Available Capabilities**\n\n${helpText}`,
        needsExecution: false
      };
    } catch (error) {
      return {
        type: 'help',
        message: 'ℹ️ I can help you with various commands. Try asking "What can you do?" for details.',
        needsExecution: false
      };
    }
  }
}
```

## Frontend Integration

Here's how to integrate intent handling in your frontend application:

```typescript
class NaturalLanguageInterface {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://gateway.api0.ai';
  }

  async processUserInput(userInput: string): Promise<ProcessedResponse> {
    try {
      // Step 1: Analyze with API0
      const analysisResponse = await fetch(`${this.baseUrl}/api/analyze`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sentence: userInput })
      });

      const results: API0AnalysisResult[] = await analysisResponse.json();
      
      if (results.length === 0) {
        throw new Error("I didn't understand that request");
      }

      // Step 2: Process based on intent
      const processed = IntentHandler.process(results[0]);
      
      // Step 3: Execute if needed
      if (processed.needsExecution) {
        return await this.executeAction(results[0]);
      }
      
      return processed;

    } catch (error) {
      return {
        type: 'error',
        message: error instanceof Error ? error.message : 'Something went wrong',
        needsExecution: false
      };
    }
  }

  private async executeAction(result: API0AnalysisResult): Promise<ProcessedResponse> {
    try {
      // Extract parameters
      const params: Record<string, string> = {};
      result.parameters.forEach(param => {
        if (param.semantic_value) {
          params[param.name] = param.semantic_value;
        }
      });

      // Make the actual API call
      const apiResponse = await fetch(`${result.base}${result.path}`, {
        method: result.verb,
        headers: { 'Content-Type': 'application/json' },
        body: ['POST', 'PUT', 'PATCH'].includes(result.verb.toUpperCase()) 
          ? JSON.stringify(params) 
          : undefined
      });

      if (apiResponse.ok) {
        const data = await apiResponse.json();
        return {
          type: 'action',
          message: `${result.endpoint_name} completed successfully`,
          data,
          needsExecution: false
        };
      } else {
        throw new Error(`Failed to execute ${result.endpoint_name}`);
      }

    } catch (error) {
      return {
        type: 'error',
        message: error instanceof Error ? error.message : 'Execution failed',
        needsExecution: false
      };
    }
  }
}
```

## Error Boundaries

Wrap your intent handling in proper error boundaries:

```typescript
const SafeIntentHandler = {
  process: (result: API0AnalysisResult): ProcessedResponse => {
    try {
      return IntentHandler.process(result);
    } catch (error) {
      console.error('Intent processing failed:', error);
      return {
        type: 'error',
        message: 'Failed to process your request. Please try again.',
        needsExecution: false
      };
    }
  }
};
```

## Key Takeaways

1. **Always check the intent field** before processing API0 responses
2. **Route different intents appropriately** - some need execution, others don't
3. **Provide clear visual feedback** for different response types
4. **Handle errors gracefully** at the intent processing level
5. **Consider user context** when determining if actions can be executed

This intent-based approach ensures your application responds appropriately to user input, whether they're asking questions, requesting help, or commanding actions.
