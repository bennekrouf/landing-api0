"use client";

import React from 'react';
import { MessageSquare, Search, Target } from 'lucide-react';
import { Twitter, Linkedin, Github } from 'lucide-react';
import { ThemeToggle } from '@/components/theme/theme-provider';
import Image from 'next/image';

const Logo = ({ variant = 'color', className = 'h-8 w-auto' }) => {
  const logoSrc = variant === 'white'
    ? '/images/white_logo_dark_background.jpg'
    : '/images/logo_transparent_background.png'
  return (
    <Image
      src={logoSrc}
      alt="api0"
      height={100}
      width={128} // Adjusted based on logo's aspect ratio
      className={className}
      priority // Load logo with high priority
    />
  );
};

const LandingPage = () => {
  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm z-50 border-b border-border shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Text logo with ninja icon */}
            <div className="flex items-center space-x-2">
              {/* <Sword className="h-6 w-6 text-[#FF6B00]" /> */}
              <span className="text-xl font-bold tracking-tight group">
                api<span className="relative inline-block text-[#FF6B00] font-black transform -rotate-12 transition-transform duration-300 group-hover:rotate-0">
                  <span className="relative z-10">0</span>
                  <span className="absolute inset-0 flex items-center justify-center z-20">
                    <span className="h-px w-4 bg-white dark:bg-gray-900 transform rotate-45 opacity-90"></span>
                  </span>
                </span>
              </span>


            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <ThemeToggle className="mr-2" />
              <a href="https://app.api0.ai"
                className="inline-flex items-center px-4 py-2 rounded-lg bg-[#FF6B00] text-white font-medium hover:bg-[#FF6B00]/90 transition-all shadow-lg shadow-orange-500/20"
              >
                Try Demo
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 bg-gradient-to-b from-accent to-background">
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

      {/* Footer */}
      <footer className="bg-gray-900 py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Logo/Brand Section */}
            <div>
              <span className="text-xl font-bold tracking-tight text-white group">
                api<span className="relative inline-block text-[#FF6B00] font-black transform -rotate-12 transition-transform duration-300 group-hover:rotate-0">
                  <span className="relative z-10">0</span>
                  <span className="absolute inset-0 flex items-center justify-center z-20">
                    <span className="h-px w-4 bg-gray-900 transform rotate-45 opacity-90"></span>
                  </span>
                </span>
              </span>
              <p className="text-gray-400 mt-2">The Enterprise AI bridge</p>
            </div>

            {/* Dynamic Footer Links */}
            {footerLinks.map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold text-white mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                        {section.title === "Connect" ? (
                          <div className="flex items-center gap-2">
                            {link.label === "X" && <Twitter size={18} />}
                            {link.label === "LinkedIn" && <Linkedin size={18} />}
                            {link.label === "GitHub" && <Github size={18} />}
                            <span>{link.label === "X" ? "@mayoranax" : link.label}</span>
                          </div>
                        ) : (
                          link.label
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Mayorana. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main >
  );
};

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Documentation", href: "#" },
      { label: "Pricing", href: "#" }
    ]
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
    ]
  },
  {
    title: "Connect",
    links: [
      { label: "X", href: "https://x.com/mayoranax" },
      { label: "LinkedIn", href: "https://linkedin.com/in/bennekrouf" },
      { label: "GitHub", href: "https://github.com/bennekrouf" }
    ]
  }
];

export default LandingPage;
