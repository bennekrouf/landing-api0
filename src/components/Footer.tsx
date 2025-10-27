import React from 'react';
import Link from 'next/link';
import { Twitter, Linkedin, Github } from 'lucide-react';

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Dashboard", href: "https://app.api0.ai" }
    ]
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" }
    ]
  },
  {
    title: "Connect",
    links: [
      { label: "X", href: "https://x.com/mayoranax" },
      { label: "LinkedIn", href: "https://linkedin.com/company/mayorana" },
      { label: "GitHub", href: "https://github.com/bennekrouf" }
    ]
  }
];

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
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
                    {link.href.startsWith('http') ? (
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {section.title === "Connect" ? (
                          <div className="flex items-center gap-1.5">
                            {link.label === "X" && <Twitter size={14} />}
                            {link.label === "LinkedIn" && <Linkedin size={14} />}
                            {link.label === "GitHub" && <Github size={14} />}
                            <span className="text-sm">{link.label}</span>
                          </div>
                        ) : (
                          link.label
                        )}
                      </a>
                    ) : (
                      <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                        {link.label}
                      </Link>
                    )}
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
  );
};

export default Footer;
