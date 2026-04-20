"use client";

import React from 'react';
import { Upload, Key, Code } from 'lucide-react';
import ScopeSection from '@/components/ScopeSection';

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 pb-24 bg-gradient-to-b from-accent to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-6xl font-bold mb-8 text-foreground">
            The secure <span className="text-[#FF6B00]">MCP Gateway</span> for your APIs
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Instantly bridge your standard REST APIs to Claude and other MCP clients. 
            We handle the JSON-RPC 2.0 protocol, security, and usage governance natively.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://app.api0.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 rounded-lg bg-[#FF6B00] text-white text-lg font-semibold hover:bg-[#FF6B00]/90 transform transition duration-200 hover:-translate-y-1 shadow-xl shadow-orange-500/20"
            >
              Get MCP Server URL
            </a>
            <a
              href="https://app.api0.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 rounded-lg border border-border text-foreground text-lg font-semibold hover:border-[#FF6B00] hover:text-[#FF6B00] transition duration-200"
            >
              View Dashboard
            </a>
          </div>
        </div>
      </section>

      {/* Scope Section */}
      <ScopeSection />

      {/* 3-Step Integration */}
      <section id="integration" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-foreground">Deploy in 3 steps</h2>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Step 1: Import Your APIs */}
            <div className="flex flex-col items-center text-center p-6">
              <div className="mb-6 p-4 bg-[#FF6B00]/10 rounded-full">
                <Upload size={32} className="text-[#FF6B00]" />
              </div>
              <div className="bg-[#FF6B00] text-white text-sm font-bold px-3 py-1 rounded-full mb-4">
                STEP 1
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">Import Standard APIs</h3>
              <p className="text-muted-foreground mb-6">
                From the dashboard, securely connect your REST endpoints: handwrite routes, upload OpenAPI specs, or sync with GitHub.
              </p>
              <div className="bg-muted rounded-lg p-4 w-full">
                <pre className="text-sm text-left">
                  <code className="text-muted-foreground">
                    {`POST /users/create
GET /users/search
PUT /users/{id}/update
DELETE /users/{id}`}
                  </code>
                </pre>
              </div>
            </div>

            {/* Step 2: Get API Key & Connect */}
            <div className="flex flex-col items-center text-center p-6">
              <div className="mb-6 p-4 bg-[#FF6B00]/10 rounded-full">
                <Key size={32} className="text-[#FF6B00]" />
              </div>
              <div className="bg-[#FF6B00] text-white text-sm font-bold px-3 py-1 rounded-full mb-4">
                STEP 2
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">Connect MCP Client</h3>
              <p className="text-muted-foreground mb-6">
                Get your secure Streamable HTTP Server URL with API key, and add it directly to Claude Desktop or any MCP-compatible client.
              </p>
              <div className="bg-muted rounded-lg p-4 w-full">
                <pre className="text-sm text-left">
                  <code className="text-muted-foreground">
                    {`"mcpServers": {
  "my-api": {
    "command": "curl",
    "args": ["https://api.api0.ai/mcp/YOUR_KEY"]
  }
}`}
                  </code>
                </pre>
              </div>
            </div>

            {/* Step 3: Govern & Execute */}
            <div className="flex flex-col items-center text-center p-6">
              <div className="mb-6 p-4 bg-[#FF6B00]/10 rounded-full">
                <Code size={32} className="text-[#FF6B00]" />
              </div>
              <div className="bg-[#FF6B00] text-white text-sm font-bold px-3 py-1 rounded-full mb-4">
                STEP 3
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">Govern & Execute</h3>
              <p className="text-muted-foreground mb-6">
                API0 natively handles permissions, checks credit balances, and proxies the tools/call to your exact REST backend methods.
              </p>
              <div className="bg-muted rounded-lg p-4 w-full overflow-hidden">
                <pre className="text-sm text-left">
                  <code className="text-muted-foreground">
                    {`{
  "method": "tools/call",
  "params": {
    "name": "create_user",
    "arguments": { "name": "John" }
  }
}`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-accent/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-foreground">Native MCP Capabilities for Standard APIs</h2>

          <div className="max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-xl p-8 mb-8">
              <h3 className="text-2xl font-bold mb-6 text-center text-[#FF6B00]">Smart Proxying & Substitution</h3>

              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-muted rounded-lg flex-col sm:flex-row text-center sm:text-left">
                  <div className="text-foreground font-mono text-xs sm:text-sm flex-1 break-all">
                    tools/call: search{"\n"}
                    &#123;&quot;dept&quot;: &quot;eng&quot;&#125;
                  </div>
                  <div className="text-[#FF6B00] font-bold text-xl my-2 sm:my-0">→</div>
                  <div className="text-muted-foreground font-mono text-xs sm:text-sm flex-1 break-all">
                    GET /users/search?dept=eng
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-muted rounded-lg flex-col sm:flex-row text-center sm:text-left">
                  <div className="text-foreground font-mono text-xs sm:text-sm flex-1 break-all">
                    tools/call: gen_cv{"\n"}
                    &#123;&quot;lang&quot;: &quot;en&quot;&#125;
                  </div>
                  <div className="text-[#FF6B00] font-bold text-xl my-2 sm:my-0">→</div>
                  <div className="text-muted-foreground font-mono text-xs sm:text-sm flex-1 break-all">
                    POST /cv/gen &#123;&quot;lang&quot;: &quot;en&quot;&#125;
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-muted rounded-lg flex-col sm:flex-row text-center sm:text-left">
                  <div className="text-foreground font-mono text-xs sm:text-sm flex-1 break-all">
                    tools/call: update{"\n"}
                    &#123;&quot;id&quot;: &quot;1&quot;, &quot;em&quot;: &quot;x@y.z&quot;&#125;
                  </div>
                  <div className="text-[#FF6B00] font-bold text-xl my-2 sm:my-0">→</div>
                  <div className="text-muted-foreground font-mono text-xs sm:text-sm flex-1 break-all">
                    PUT /users/1/update &#123;&quot;em&quot;: &quot;x@y.z&quot;&#125;
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center text-sm sm:text-base">
                <p className="text-muted-foreground">
                  The gateway translates tool calls flawlessly, injecting parameters into URLs and bodies using the correct HTTP verbs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
