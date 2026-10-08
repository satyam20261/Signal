import React, { useState } from 'react';
import { CATEGORIES } from '../data/articles';
import { Check, Send, ArrowUp, Rss } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'home' | 'articles' | 'categories' | 'about') => void;
  onSelectCategory: (categorySlug: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onSelectCategory
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1C1917] text-[#EDE8DE] border-t border-[#38332B]">
      
      {/* Newsletter Dispatch Bar */}
      <div className="border-b border-[#332E27] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#D97706] font-bold">
                Weekly Strategic Dispatch
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Get the Frontline AI &amp; Marketing Playbook.
              </h2>
              <p className="text-sm text-[#A8A29E] leading-relaxed max-w-xl">
                Every Thursday, our editorial desk sends one comprehensive breakdown covering algorithm changes, conversion formulas, and emerging generative tools. Zero spam.
              </p>
            </div>

            <div className="lg:col-span-6">
              {subscribed ? (
                <div className="p-4 bg-[#292524] border border-emerald-700/50 rounded-sm flex items-center gap-3 text-emerald-400">
                  <Check className="w-5 h-5 shrink-0" />
                  <div className="text-xs sm:text-sm">
                    <strong>Subscription confirmed.</strong> Welcome to Signal &amp; Prompt. Check your inbox for our latest briefing.
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your professional email address..."
                    className="flex-1 px-4 py-3 bg-[#292524] border border-[#44403C] rounded-sm text-sm text-white placeholder-[#78716C] focus:outline-none focus:border-[#D97706]"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-white text-[#1C1917] hover:bg-[#F5EFE6] font-semibold text-xs uppercase tracking-wider rounded-sm transition-colors whitespace-nowrap flex items-center justify-center gap-2"
                  >
                    Subscribe <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="font-serif text-2xl font-bold text-white tracking-tight">
              Signal &amp; Prompt
            </div>
            <p className="text-xs sm:text-sm text-[#A8A29E] leading-relaxed max-w-sm">
              The premier editorial publication for growth leaders, founders, and marketing strategists navigating the intersection of artificial intelligence, search visibility, and brand architecture.
            </p>
            <div className="pt-2 text-xs text-[#78716C] space-y-1">
              <div>ISSN 2841-0984 · Independent Journal</div>
              <div>Published globally with verified operational case studies.</div>
            </div>
          </div>

          {/* Publication Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-bold text-white">
              Publication
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-[#A8A29E]">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors text-left"
                >
                  Front Page
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('articles')}
                  className="hover:text-white transition-colors text-left"
                >
                  All 10 Articles
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('categories')}
                  className="hover:text-white transition-colors text-left"
                >
                  Topics Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors text-left"
                >
                  About the Journal
                </button>
              </li>
            </ul>
          </div>

          {/* Topical Categories */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-bold text-white">
              Core Disciplines
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs text-[#A8A29E]">
              {CATEGORIES.slice(0, 8).map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => onSelectCategory(cat.slug)}
                  className="hover:text-white text-left transition-colors truncate"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Back to top & RSS */}
          <div className="lg:col-span-2 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-wider font-bold text-white">
                Syndication
              </h3>
              <div className="flex items-center gap-2 text-xs text-[#A8A29E]">
                <Rss className="w-4 h-4 text-[#D97706]" />
                <span>RSS feed enabled</span>
              </div>
            </div>

            <div>
              <button
                onClick={scrollToTop}
                className="w-full sm:w-auto px-4 py-2 bg-[#292524] hover:bg-[#38332B] text-xs font-medium text-[#EDE8DE] rounded-sm transition-colors flex items-center justify-center gap-1.5"
              >
                Back to top <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Legal / Copyright Strip */}
        <div className="pt-12 mt-12 border-t border-[#2E2923] flex flex-col sm:flex-row items-center justify-between text-xs text-[#78716C] gap-4">
          <div>
            © 2026 Signal &amp; Prompt. All rights reserved. Original editorial content.
          </div>
          <div className="flex items-center gap-6">
            <span>Ethical AI Disclosure</span>
            <span>Privacy &amp; Data Rights</span>
            <span>Terms of Editorial Service</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
