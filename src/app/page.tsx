"use client";

import React from 'react';
import { MessageSquare, Zap, Settings } from 'lucide-react';

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

      {/* Examples Section */}
      <section id="examples" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-foreground">Start building conversational apps in 30 seconds</h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Chat API */}
            <div className="bg-card border border-border rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-[#FF6B00]">/chat</h3>
              <p className="text-muted-foreground mb-6 text-lg">
                Add ChatGPT-like conversation to any app with streaming, function calling, and context management.
              </p>
              <div className="bg-muted rounded-lg p-6 overflow-x-auto">
                <pre className="text-sm">
                  <code className="text-muted-foreground">
                    {`# Add conversational AI to your app
curl -X POST https://api0.ai/chat \\
  -H "Authorization: Bearer YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "messages": [
      {"role": "user", "content": "Create a new order for 5 laptops"}
    ]
  }'`}
                  </code>
                </pre>
              </div>
            </div>

            {/* Semantic API */}
            <div className="bg-card border border-border rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-[#FF6B00]">/semantic</h3>
              <p className="text-muted-foreground mb-6 text-lg">
                Connect natural language to your app&apos;s functions. Users speak, your app executes.
              </p>
              <div className="bg-muted rounded-lg p-6 overflow-x-auto">
                <pre className="text-sm">
                  <code className="text-muted-foreground">
                    {`# Route user intent to app functions
curl -X POST https://api0.ai/semantic \\
  -H "Authorization: Bearer YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "show me this month sales report"
  }'`}
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
          <h2 className="text-3xl font-bold text-center mb-16 text-foreground">The chatbot infrastructure layer</h2>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center p-6">
              <div className="mb-6 p-4 bg-[#FF6B00]/10 rounded-full">
                <MessageSquare size={32} className="text-[#FF6B00]" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">Any App → Chatbot</h3>
              <p className="text-muted-foreground">Transform existing applications into conversational interfaces. Users chat, your app responds with real actions and data.</p>
            </div>

            <div className="flex flex-col items-center text-center p-6">
              <div className="mb-6 p-4 bg-[#FF6B00]/10 rounded-full">
                <Zap size={32} className="text-[#FF6B00]" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">Beyond Support Bots</h3>
              <p className="text-muted-foreground">Not just Q&amp;A - execute workflows, trigger actions, manage data. Turn natural language into application commands.</p>
            </div>

            <div className="flex flex-col items-center text-center p-6">
              <div className="mb-6 p-4 bg-[#FF6B00]/10 rounded-full">
                <Settings size={32} className="text-[#FF6B00]" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">Plug & Play Infrastructure</h3>
              <p className="text-muted-foreground">Two endpoints, infinite possibilities. No ML knowledge required. Your data stays in your systems.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
