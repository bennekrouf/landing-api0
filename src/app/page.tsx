"use client";

import React from 'react';
import { Zap, DollarSign, Settings } from 'lucide-react';
import SemanticWorkflow from '@/components/SemanticWorkflow';

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 pb-24 bg-gradient-to-b from-accent to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-6xl font-bold mb-8 text-foreground">
            AI plugin for APIs that <span className="text-[#FF6B00]">just work</span>
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Two powerful endpoints. Zero setup. Pay per use.
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


<SemanticWorkflow />

      {/* Examples Section */}
      <section id="examples" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-foreground">Start building in 30 seconds</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Chat API */}
            <div className="bg-card border border-border rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-[#FF6B00]">/chat</h3>
              <p className="text-muted-foreground mb-6 text-lg">
                General-purpose AI chat API with streaming support and function calling.
              </p>
              <div className="bg-muted rounded-lg p-6 overflow-x-auto">
                <pre className="text-sm">
                  <code className="text-muted-foreground">
{`# Chat with AI
curl -X POST https://api0.ai/chat \\
  -H "Authorization: Bearer YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "messages": [
      {"role": "user", "content": "Explain async/await"}
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
                Matches user queries to your imported APIs using semantic understanding.
              </p>
              <div className="bg-muted rounded-lg p-6 overflow-x-auto">
                <pre className="text-sm">
                  <code className="text-muted-foreground">
{`# Find matching APIs
curl -X POST https://api0.ai/semantic \\
  -H "Authorization: Bearer YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "get user profile data for user John Rush"
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
          <h2 className="text-3xl font-bold text-center mb-16 text-foreground">Built for developers</h2>
          
          <div className="grid md:grid-cols-3 gap-12">
  <div className="flex flex-col items-center text-center p-6">
    <div className="mb-6 p-4 bg-[#FF6B00]/10 rounded-full">
      <Zap size={32} className="text-[#FF6B00]" />
    </div>
    <h3 className="text-xl font-semibold mb-4 text-foreground">Turn APIs into AI</h3>
    <p className="text-muted-foreground">Transform your existing APIs into intelligent, natural language interfaces without ML expertise or additional AI providers.</p>
  </div>
  
  <div className="flex flex-col items-center text-center p-6">
    <div className="mb-6 p-4 bg-[#FF6B00]/10 rounded-full">
      <DollarSign size={32} className="text-[#FF6B00]" />
    </div>
    <h3 className="text-xl font-semibold mb-4 text-foreground">Non-Intrusive Integration</h3>
    <p className="text-muted-foreground">We compute which API matches your request, you execute the call. Complete separation - your data and systems remain entirely under your control.</p>
  </div>
  
  <div className="flex flex-col items-center text-center p-6">
    <div className="mb-6 p-4 bg-[#FF6B00]/10 rounded-full">
      <Settings size={32} className="text-[#FF6B00]" />
    </div>
    <h3 className="text-xl font-semibold mb-4 text-foreground">AI Without Complexity</h3>
    <p className="text-muted-foreground">Get enterprise-grade LLM capabilities without learning machine learning, managing models, or paying multiple AI vendors.</p>
  </div>
</div>
          
          {/* <div className="mt-16 text-center p-8 bg-[#FF6B00]/5 border border-[#FF6B00]/20 rounded-xl"> */}
          {/*   <h3 className="text-xl font-semibold mb-4 text-[#FF6B00]">Flexible Payment</h3> */}
          {/*   <p className="text-muted-foreground mb-4"> */}
          {/*     Pay with credit card, bank transfer, or crypto (BTC, ETH, USDC). Automatic billing based on usage. */}
          {/*   </p> */}
          {/*   <p className="text-muted-foreground"> */}
          {/*     <a  */}
          {/*       href="https://app.api0.ai"  */}
          {/*       target="_blank" */}
          {/*       rel="noopener noreferrer" */}
          {/*       className="text-[#FF6B00] hover:underline font-medium" */}
          {/*     > */}
          {/*       Manage usage and import APIs in your dashboard → */}
          {/*     </a> */}
          {/*   </p> */}
          {/* </div> */}
        </div>
      </section>
    </>
  );
};

export default HomePage;
