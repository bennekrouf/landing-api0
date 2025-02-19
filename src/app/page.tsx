import React from 'react';
import { MessageSquare, Zap, Lock } from 'lucide-react';
import Image from 'next/image';

const Logo = ({ variant = 'color', className = 'h-8 w-auto' }) => {
  // Choose the correct logo based on variant
  const logoSrc = variant === 'white' 
    ? '/logo_transparent_background.png'  // Use the white version for dark backgrounds
    : '/dark_logo_transparent_background.png'; // Use the orange version for light backgrounds

  return (
    <Image
      src={logoSrc}
      alt="Mayo"
      height={100}
      width={128} // Adjusted based on logo's aspect ratio
      className={className}
      priority // Load logo with high priority
    />
  );
};

const LandingPage = () => {
  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo without text */}
            <Logo className="h-8 w-auto" />
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">Testimonials</a>
              <a 
                href="app.mayo.ai" 
                className="inline-flex items-center px-4 py-2 rounded-lg bg-[#FF6B00] text-white font-medium hover:bg-[#FF6B00]/90 transition-all shadow-lg shadow-orange-500/20"
              >
                Try Demo
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 bg-gradient-to-b from-orange-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-6xl font-bold mb-8 text-gray-900">
            No More Forms. <span className="text-[#FF6B00]">Just Ask.</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Mayo connects users to the right APIs instantly.
          </p>
          <a 
            href="app.mayo.ai"
            className="inline-flex items-center px-8 py-4 rounded-lg bg-[#FF6B00] text-white text-lg font-semibold hover:bg-[#FF6B00]/90 transform transition duration-200 hover:-translate-y-1 shadow-xl shadow-orange-500/20"
          >
            Try the Demo
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-900">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-orange-50 border border-orange-100">
              <div className="mb-6 p-4 bg-[#FF6B00]/10 rounded-full">
                <MessageSquare size={32} className="text-[#FF6B00]" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Natural Language Processing</h3>
              <p className="text-gray-600">Transform user requests into precise API calls without complex forms.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-orange-50 border border-orange-100">
              <div className="mb-6 p-4 bg-[#FF6B00]/10 rounded-full">
                <Zap size={32} className="text-[#FF6B00]" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Instant Matching</h3>
              <p className="text-gray-600">Connect to the right API endpoints in milliseconds using our smart matching engine.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-orange-50 border border-orange-100">
              <div className="mb-6 p-4 bg-[#FF6B00]/10 rounded-full">
                <Lock size={32} className="text-[#FF6B00]" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Secure Integration</h3>
              <p className="text-gray-600">Enterprise-grade security with encrypted connections and API key management.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Logo variant="white" className="h-8 w-auto mb-4" />
              <p className="text-gray-400">Transforming API integration with natural language processing.</p>
            </div>
            {footerLinks.map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold text-white mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                        {link.label}
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
    </main>
  );
};

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
