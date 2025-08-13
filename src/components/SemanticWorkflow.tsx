import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Copy, Check, Zap, Code, Rocket, ChevronDown } from 'lucide-react';

const SemanticWorkflow = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    const code = `import { API0Client } from 'api0-client';

const api0 = new API0Client({
  apiKey: 'your-key',
  apis: ['users', 'orders']
});

// Natural language query
const result = await api0.query(
  &ldquo;Get profile for john@example.com&rdquo;
);`;
    
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    {
      id: 1,
      title: "Step 1: Describe APIs",
      subtitle: "Any format works",
      icon: <Zap className="w-5 h-5" />,
      content: (
        <div className="space-y-3">
          <div className="bg-gray-900 text-green-400 p-3 rounded-lg text-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-orange-500">💬</span>
              <span className="text-gray-300 text-xs">Natural Description</span>
            </div>
            <p className="text-xs leading-relaxed">
              &ldquo;User service: authentication, profiles, account creation. 
              Order service: create orders, get history.&rdquo;
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span>🔗</span>
              <span className="font-medium text-sm">Existing Endpoints</span>
            </div>
            <div className="space-y-1 text-xs text-gray-600 dark:text-gray-300 font-mono">
              <div>POST /api/users/create</div>
              <div>GET /api/users/&#123;id&#125;</div>
              <div>GET /api/orders/&#123;userId&#125;</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-orange-600 text-xs">
            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></div>
            AI processing...
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "Step 2: Get Code",
      subtitle: "Auto-generated",
      icon: <Code className="w-5 h-5" />,
      content: (
        <div className="space-y-3">
          <div className="bg-gray-900 text-gray-100 p-3 rounded-lg relative">
            <button
              onClick={copyCode}
              className="absolute top-2 right-2 p-1.5 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
              title="Copy code"
            >
              {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
            </button>
            <pre className="text-xs overflow-x-auto pr-8">
              <code>{`import { API0Client } from 'api0-client';

const api0 = new API0Client({
  apiKey: 'your-key',
  apis: ['users', 'orders']
});

// Natural language query
const result = await api0.query(
  "Get profile for john@example.com"
);`}</code>
            </pre>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-3 rounded-lg">
            <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
              <Check className="w-3 h-3" />
              <span className="font-medium text-sm">Ready to integrate</span>
            </div>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
              Powered by blazing fast Rust semantic engine
            </p>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Step 3: Deploy & Use",
      subtitle: "Natural language",
      icon: <Rocket className="w-5 h-5" />,
      content: (
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-3 rounded-lg border border-orange-200 dark:border-orange-800">
            <div className="font-medium text-orange-800 dark:text-orange-200 mb-2 text-sm">
              Natural Language → API
            </div>
            <div className="space-y-2 text-xs">
              <div className="bg-white dark:bg-gray-800 p-2 rounded border">
                <div className="text-gray-500 mb-1">Input:</div>
                <div className="font-mono text-orange-600 dark:text-orange-400">
                  &ldquo;Get profile for john@example.com&rdquo;
                </div>
              </div>
              <div className="flex justify-center">
                <ChevronDown className="w-3 h-3 text-orange-500" />
              </div>
              <div className="bg-white dark:bg-gray-800 p-2 rounded border">
                <div className="text-gray-500 mb-1">Result:</div>
                <div className="font-mono text-green-600 dark:text-green-400">
                  GET /api/users/123/profile
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg text-center">
              <div className="text-lg font-bold text-blue-600 dark:text-blue-400">90%</div>
              <div className="text-xs text-blue-700 dark:text-blue-300">Less code</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-lg text-center">
              <div className="text-lg font-bold text-green-600 dark:text-green-400">5min</div>
              <div className="text-xs text-green-700 dark:text-green-300">Setup</div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-background to-accent/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold mb-3 text-foreground">
            From Description to Deployment
          </h2>
          <p className="text-base md:text-xl text-muted-foreground max-w-xl mx-auto">
            Transform APIs into natural language interfaces in minutes
          </p>
        </div>

        {/* Mobile-First Step Navigation */}
        <div className="flex flex-col space-y-4 mb-8 md:hidden">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`w-full flex items-center gap-3 p-4 rounded-lg transition-all duration-300 ${
                activeStep === step.id
                  ? 'bg-[#FF6B00] text-white shadow-lg'
                  : 'bg-card text-muted-foreground border border-border'
              }`}
            >
              <div className={`p-2 rounded-full flex-shrink-0 ${
                activeStep === step.id ? 'bg-white/20' : 'bg-accent'
              }`}>
                {React.cloneElement(step.icon, { 
                  className: `w-4 h-4 ${activeStep === step.id ? 'text-white' : 'text-[#FF6B00]'}` 
                })}
              </div>
              <div className="text-left flex-1">
                <div className="font-semibold text-sm">{step.title}</div>
                <div className="text-xs opacity-75">{step.subtitle}</div>
              </div>
              <ChevronRight className={`w-4 h-4 transition-transform ${
                activeStep === step.id ? 'rotate-90' : ''
              }`} />
            </button>
          ))}
        </div>

        {/* Desktop Step Navigation */}
        <div className="hidden md:flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <button
                  onClick={() => setActiveStep(step.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-lg transition-all duration-300 ${
                    activeStep === step.id
                      ? 'bg-[#FF6B00] text-white shadow-lg'
                      : 'bg-card text-muted-foreground hover:bg-accent'
                  }`}
                >
                  <div className={`p-2 rounded-full ${
                    activeStep === step.id ? 'bg-white/20' : 'bg-accent'
                  }`}>
                    {React.cloneElement(step.icon, { 
                      className: `w-4 h-4 ${activeStep === step.id ? 'text-white' : 'text-[#FF6B00]'}` 
                    })}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">{step.title}</div>
                    <div className="text-sm opacity-75">{step.subtitle}</div>
                  </div>
                </button>
                {index < steps.length - 1 && (
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-card border border-border rounded-xl p-4 md:p-8 shadow-lg">
            <div className="md:hidden mb-4">
              <h3 className="text-lg font-bold text-foreground">
                {steps.find(step => step.id === activeStep)?.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {steps.find(step => step.id === activeStep)?.subtitle}
              </p>
            </div>
            {steps.find(step => step.id === activeStep)?.content}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-[#FF6B00]/10 to-orange-100/50 dark:to-orange-900/20 border border-[#FF6B00]/20 rounded-xl p-6 max-w-xl mx-auto">
            <h3 className="text-xl font-bold mb-3 text-foreground">
              Ready to transform your APIs?
            </h3>
            <p className="text-muted-foreground mb-6 text-sm">
              Join developers using natural language with their APIs
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://app.api0.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#FF6B00] text-white font-semibold hover:bg-[#FF6B00]/90 transition duration-200"
              >
                Start Building
                <ChevronRight className="w-4 h-4 ml-2" />
              </a>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border text-foreground font-semibold hover:border-[#FF6B00] hover:text-[#FF6B00] transition duration-200"
              >
                Documentation
              </Link>
            </div>
          </div>
        </div>

        {/* Powered by Mayorana */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Powered by{' '}
            <a
              href="https://mayorana.ch"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF6B00] hover:text-[#FF6B00]/80 font-medium transition-colors"
            >
              Mayorana
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SemanticWorkflow;
