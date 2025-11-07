"use client";

import React from 'react';
import { Upload, Key, Code } from 'lucide-react';

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 pb-24 bg-gradient-to-b from-accent to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-6xl font-bold mb-8 text-foreground">
            Turn any app into a <span className="text-[#FF6B00]">conversational AI</span>
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            The infrastructure layer that adds ChatGPT-like capabilities to your existing applications. Execute real actions through natural language.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://app.api0.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 rounded-lg bg-[#FF6B00] text-white text-lg font-semibold hover:bg-[#FF6B00]/90 transform transition duration-200 hover:-translate-y-1 shadow-xl shadow-orange-500/20"
            >
              Get API Key
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

      {/* 3-Step Integration */}
      <section id="integration" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-foreground">Integrate api0 in 3 steps</h2>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Step 1: Import Your APIs */}
            <div className="flex flex-col items-center text-center p-6">
              <div className="mb-6 p-4 bg-[#FF6B00]/10 rounded-full">
                <Upload size={32} className="text-[#FF6B00]" />
              </div>
              <div className="bg-[#FF6B00] text-white text-sm font-bold px-3 py-1 rounded-full mb-4">
                STEP 1
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">Import Your Endpoints</h3>
              <p className="text-muted-foreground mb-6">
                From the dashboard, bring in your APIs however you like: handwrite endpoints, upload OpenAPI specs, or point us to your GitHub repo.
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

            {/* Step 2: Get API Key & Test */}
            <div className="flex flex-col items-center text-center p-6">
              <div className="mb-6 p-4 bg-[#FF6B00]/10 rounded-full">
                <Key size={32} className="text-[#FF6B00]" />
              </div>
              <div className="bg-[#FF6B00] text-white text-sm font-bold px-3 py-1 rounded-full mb-4">
                STEP 2
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">Generate API Key</h3>
              <p className="text-muted-foreground mb-6">
                Generate your API key, test natural language queries in the dashboard, and add synonym sentences to improve matching.
              </p>
              <div className="bg-muted rounded-lg p-4 w-full">
                <pre className="text-sm text-left">
                  <code className="text-muted-foreground">
                    {`"Create a new user named John"
↓
POST /users/create
{"name": "John"}`}
                  </code>
                </pre>
              </div>
            </div>

            {/* Step 3: Integrate & Build */}
            <div className="flex flex-col items-center text-center p-6">
              <div className="mb-6 p-4 bg-[#FF6B00]/10 rounded-full">
                <Code size={32} className="text-[#FF6B00]" />
              </div>
              <div className="bg-[#FF6B00] text-white text-sm font-bold px-3 py-1 rounded-full mb-4">
                STEP 3
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">Build Your App</h3>
              <p className="text-muted-foreground mb-6">
                Add conversational AI to your existing app, build a new chatbot interface, or call api0 from your backend code.
              </p>
              <div className="bg-muted rounded-lg p-4 w-full">
                <pre className="text-sm text-left">
                  <code className="text-muted-foreground">
                    {`const response = await fetch('/api/semantic', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    query: "Find John"
  })
});`}
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
          <h2 className="text-3xl font-bold text-center mb-16 text-foreground">From sentences to actions</h2>

          <div className="max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-xl p-8 mb-8">
              <h3 className="text-2xl font-bold mb-6 text-center text-[#FF6B00]">Natural Language → API Execution</h3>

              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                  <div className="text-foreground font-mono text-sm flex-1">
                    &quot;Search for users in engineering department&quot;
                  </div>
                  <div className="text-[#FF6B00] font-bold">→</div>
                  <div className="text-muted-foreground font-mono text-sm flex-1">
                    GET /users/search?department=engineering
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                  <div className="text-foreground font-mono text-sm flex-1">
                    &quot;Generate a CV in english using default template&quot;
                  </div>
                  <div className="text-[#FF6B00] font-bold">→</div>
                  <div className="text-muted-foreground font-mono text-sm flex-1">
                    POST /cv/generate {`{"lang": "en", "template": "default"}`}
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                  <div className="text-foreground font-mono text-sm flex-1">
                    &quot;Update user profile with new email&quot;
                  </div>
                  <div className="text-[#FF6B00] font-bold">→</div>
                  <div className="text-muted-foreground font-mono text-sm flex-1">
                    PUT /users/&#123;id&#125;/update {`{"email": "new@email.com"}`}
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-muted-foreground">
                  Your users chat naturally. Your app executes real actions.
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
