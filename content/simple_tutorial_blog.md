---
title: "Add Natural Language to Any App in 5 Minutes"
date: "2025-01-20"
excerpt: "A step-by-step tutorial showing how to integrate conversational AI into your existing application with minimal code changes."
author:
  name: "API0 Team"
tags: ["Tutorial", "Integration", "Natural Language", "Quick Start"]
svg: "/svg/blog/simple-tutorial.svg"
---

# Add Natural Language to Any App in 5 Minutes

Transform your application into a conversational interface with these four simple steps. No complex setup, no AI knowledge required.

## What You'll Build

By the end of this tutorial, users will be able to type natural commands like:
- "Send email to john@company.com about the meeting"
- "Create high priority support ticket for login issues"
- "Get user profile for jane-smith"

Your existing APIs will handle these requests automatically.

## Prerequisites

- An existing application with APIs
- 5 minutes of your time
- Basic JavaScript knowledge

## Step 1: Get Your API Key

Visit [app.api0.ai](https://app.api0.ai) and create an account. Generate your API key from the dashboard - you'll need this for authentication and billing.

The free tier includes 1,000 requests to get you started.

## Step 2: Import Your Endpoints

This is where API0 shines - the AI-powered import system accepts any format:

1. Go to the **Endpoints** section in your dashboard
2. Click **Import Endpoints**
3. Describe your APIs in any format you prefer

**Option A: Informal Description**
```
We have three main endpoints:

1. Send Email - POST /api/send-email
   Takes recipient email, subject, and message body
   
2. Create Support Ticket - POST /api/tickets  
   Takes title, description, and priority level
   
3. Get User Profile - GET /api/users/{email}
   Returns user information by email address
```

**Option B: Code Comments**
```javascript
// POST /api/send-email - Send emails to users
// Parameters: recipient (string), subject (string), body (string)

// POST /api/tickets - Create customer support tickets  
// Parameters: title (string), description (string), priority (string)

// GET /api/users/{email} - Fetch user profile data
// Parameters: email (string)
```

**Option C: OpenAPI Spec**
Upload your existing OpenAPI/Swagger documentation directly.

The AI automatically converts any of these formats into the proper API0 configuration. No manual mapping required.

## Step 3: Add the Client Code

Copy this 30-line client into your project:

```javascript
class API0Client {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://gateway.api0.ai';
  }

  async execute(userInput) {
    // Step 1: Analyze the natural language
    const response = await fetch(`${this.baseUrl}/api/analyze`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sentence: userInput }),
    });

    const results = await response.json();
    if (results.length === 0) {
      throw new Error("I didn't understand that request");
    }

    // Step 2: Get the best matching endpoint
    const match = results[0];
    
    // Step 3: Extract parameters from natural language
    const params = {};
    match.parameters.forEach(param => {
      if (param.semantic_value) {
        params[param.name] = param.semantic_value;
      }
    });
    
    // Step 4: Execute your API
    return this.callAPI(match, params);
  }

  async callAPI(endpoint, params) {
    const url = `${endpoint.base}${endpoint.path}`;
    const options = {
      method: endpoint.verb,
      headers: { 'Content-Type': 'application/json' },
    };

    if (['POST', 'PUT', 'PATCH'].includes(endpoint.verb.toUpperCase())) {
      options.body = JSON.stringify(params);
    }

    const response = await fetch(url, options);
    const data = await response.json();
    
    return {
      success: response.ok,
      data,
      message: `${endpoint.endpoint_name} ${response.ok ? 'completed' : 'failed'}`
    };
  }
}
```

## Step 4: Connect to Your UI

Add a single input field to your existing interface:

```javascript
// Initialize the client
const api0 = new API0Client('sk_live_your_api_key_here');

// Handle user commands
async function handleCommand(userInput) {
  try {
    const result = await api0.execute(userInput);
    console.log('Success:', result.message);
    return result.data;
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Connect to your input field
document.getElementById('command-input').addEventListener('keypress', async (e) => {
  if (e.key === 'Enter') {
    const result = await handleCommand(e.target.value);
    e.target.value = ''; // Clear input
    // Handle the result in your UI
  }
});
```

## React Version

For React applications:

```javascript
import { useState } from 'react';

function CommandInterface() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  
  const api0 = new API0Client(process.env.REACT_APP_API0_KEY);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setLoading(true);
    try {
      const response = await api0.execute(input);
      setResult(`Success: ${response.message}`);
      setInput('');
    } catch (error) {
      setResult(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="command-interface">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type what you want to do..."
          disabled={loading}
          className="w-full p-3 border rounded"
        />
        <button 
          type="submit" 
          disabled={loading || !input.trim()}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Execute'}
        </button>
      </form>
      {result && (
        <div className="mt-4 p-3 bg-gray-100 rounded">
          {result}
        </div>
      )}
    </div>
  );
}
```

## Testing Your Integration

Once implemented, test with these example commands:

**Email Commands:**
- "Send email to support@company.com with subject Bug Report"
- "Email the team about tomorrow's standup meeting"

**Support Tickets:**
- "Create urgent ticket for payment processing issue"
- "Open low priority ticket about UI improvement suggestion"

**User Management:**
- "Get profile information for john.doe@company.com"
- "Show me user details for the admin account"

## Environment Variables

For production, store your API key securely:

```bash
# .env
REACT_APP_API0_KEY=sk_live_your_actual_key_here
# or for Node.js
API0_API_KEY=sk_live_your_actual_key_here
```

## What Happens Under the Hood

1. **User types:** "Send email to john@company.com about the meeting"
2. **API0 analyzes** the sentence and identifies the email endpoint
3. **Parameters extracted:** recipient="john@company.com", subject="the meeting"
4. **Your API called:** POST /api/send-email with the extracted parameters
5. **Result returned** to your application

## Next Steps

Your application now has natural language capabilities. Users can:
- Perform complex actions through simple text commands
- Skip navigation and forms entirely
- Interact more intuitively with your application

The complete integration is about 40 lines of code and works with any existing API structure.

## Troubleshooting

**"I didn't understand that request"**
- Check that your endpoint descriptions are clear in the dashboard
- Try rephrasing the command more specifically

**API calls failing**
- Verify your API endpoints are accessible
- Check authentication headers if required
- Review the extracted parameters in the console

**Rate limits**
- Free tier: 50 requests/month
- Upgrade in the dashboard for higher limits

Your application is now equipped with conversational AI capabilities that understand natural language and execute real actions.