import React from 'react';
import { MessageSquare, Zap, Lock } from 'lucide-react';

const LandingPage = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm z-50 border-b border-border">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <div className="text-2xl font-bold">Gate42.ai</div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">Testimonials</a>
              <a 
                href="app.gate42.ai" 
                className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                Try Demo
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24">
        <div className="container text-center">
          <h1 className="text-4xl sm:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            No More Forms. Just Ask.
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Gate42 connects users to the right APIs instantly.
          </p>
          <a 
            href="app.gate42.ai"
            className="inline-flex items-center px-8 py-4 rounded-md bg-primary text-primary-foreground text-lg font-semibold hover:bg-primary/90 transform transition duration-200 hover:-translate-y-1"
          >
            Try the Demo
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-secondary/20">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-16">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center bg-card rounded-lg p-6 shadow-lg">
              <div className="mb-6 p-4 bg-primary/10 rounded-full">
                <MessageSquare size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Natural Language Processing</h3>
              <p className="text-muted-foreground">Transform user requests into precise API calls without complex forms.</p>
            </div>
            <div className="flex flex-col items-center text-center bg-card rounded-lg p-6 shadow-lg">
              <div className="mb-6 p-4 bg-primary/10 rounded-full">
                <Zap size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Instant Matching</h3>
              <p className="text-muted-foreground">Connect to the right API endpoints in milliseconds using our smart matching engine.</p>
            </div>
            <div className="flex flex-col items-center text-center bg-card rounded-lg p-6 shadow-lg">
              <div className="mb-6 p-4 bg-primary/10 rounded-full">
                <Lock size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Secure Integration</h3>
              <p className="text-muted-foreground">Enterprise-grade security with encrypted connections and API key management.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-16">Trusted By Industry Leaders</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-card rounded-lg p-6 shadow-lg">
                <p className="text-muted-foreground mb-4">"{testimonial.quote}"</p>
                <div className="font-semibold">{testimonial.author}</div>
                <div className="text-sm text-muted-foreground">{testimonial.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary/20 py-12 mt-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Gate42.ai</h3>
              <p className="text-muted-foreground">Transforming API integration with natural language processing.</p>
            </div>
            {footerLinks.map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 Gate42.ai. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
};

const testimonials = [
  {
    quote: "Gate42 reduced our API integration time by 80%. It's a game-changer.",
    author: "Sarah Chen",
    title: "CTO, TechFlow"
  },
  {
    quote: "The natural language interface is brilliant. Our developers love it.",
    author: "Mark Thompson",
    title: "Lead Developer, DataStack"
  },
  {
    quote: "Seamless integration with our existing workflows. Highly recommended.",
    author: "Lisa Rodriguez",
    title: "Engineering Manager, CloudPro"
  }
];

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#" },
      { label: "Documentation", href: "#" },
      { label: "Pricing", href: "#" }
    ]
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" }
    ]
  },
  {
    title: "Connect",
    links: [
      { label: "Twitter", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "GitHub", href: "#" }
    ]
  }
];

export default LandingPage;
