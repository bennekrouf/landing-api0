"use client";

import React from 'react';
import { MessageSquare, Search, Target } from 'lucide-react';

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 pb-24 bg-gradient-to-b from-accent to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-6xl font-bold mb-8 text-foreground">
            No More Forms. <span className="text-[#FF6B00]">Just Ask.</span>
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            api0 connects users to the right APIs instantly.
          </p>
          <a
            href="https://app.api0.ai"
            className="inline-flex items-center px-8 py-4 rounded-lg bg-[#FF6B00] text-white text-lg font-semibold hover:bg-[#FF6B00]/90 transform transition duration-200 hover:-translate-y-1 shadow-xl shadow-orange-500/20"
          >
            Try the Demo
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-foreground">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-accent/50 border border-border">
              <div className="mb-6 p-4 bg-[#FF6B00]/10 rounded-full">
                <MessageSquare size={32} className="text-[#FF6B00]" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">Natural Language Processing</h3>
              <p className="text-muted-foreground">Transform conversational requests into structured API parameters without complex forms.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-accent/50 border border-border">
              <div className="mb-6 p-4 bg-[#FF6B00]/10 rounded-full">
                <Search size={32} className="text-[#FF6B00]" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">API Discovery</h3>
              <p className="text-muted-foreground">Automatically identify and surface the most relevant APIs from your ecosystem based on user needs.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-accent/50 border border-border">
              <div className="mb-6 p-4 bg-[#FF6B00]/10 rounded-full">
                <Target size={32} className="text-[#FF6B00]" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">Intent Matching</h3>
              <p className="text-muted-foreground">Advanced contextual analysis to understand user intent and map it to the perfect API endpoints.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
