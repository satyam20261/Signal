import React, { useState } from 'react';
import { AUTHORS } from '../data/articles';
import { AuthorAvatar } from './AuthorAvatar';
import { Check, Mail, Send, Sparkles, BookOpen, Target, ShieldCheck } from 'lucide-react';

export const AboutView: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] pb-24">
      {/* Editorial Masthead Hero */}
      <section className="border-b border-[#ECE7DA] py-16 sm:py-20 bg-[#F5F1E8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-5 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs uppercase tracking-widest text-[#9A3412] font-bold">
            <Sparkles className="w-4 h-4" /> Editorial Mission &amp; Standards
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1917] leading-[1.12]">
            Bridging High-Conviction Strategy &amp; Generative Intelligence.
          </h1>
          <p className="text-base sm:text-lg text-[#57534E] leading-relaxed max-w-3xl">
            Signal &amp; Prompt is an independent digital publication dedicated to practical digital marketing, advanced SEO, algorithmic advertising, lifecycle email, community-led social media, personal branding, and real-world AI implementation.
          </p>
        </div>
      </section>

      {/* Main Content Body */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-14 space-y-16">
        
        {/* Core Editorial Purpose */}
        <section className="space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917]">
            Why We Publish
          </h2>
          <div className="prose prose-stone text-base text-[#44403C] space-y-4 leading-relaxed">
            <p>
              The digital marketing landscape is undergoing its most severe structural transformation since the inception of the commercial web browser. Generative AI tools have made generic content virtually costless to produce, flooding search engines and social feeds with synthetic mediocrity.
            </p>
            <p>
              At <strong>Signal &amp; Prompt</strong>, we operate on a contrarian premise: <em>when synthetic content becomes infinite, rigorous human insight, verified case benchmarks, and mathematical discipline become the highest-leverage competitive advantages.</em>
            </p>
            <p>
              Every article published in our catalog is engineered to be immediately actionable. We don’t write theoretical fluff or recycle textbook definitions. We document the messy unit economics of customer acquisition cost (CAC), the evolving mechanics of AI Overviews and citation graphs, and the operational systems required to turn organic attention into lasting balance sheet equity.
            </p>
          </div>
        </section>

        {/* The 7 Editorial Topic Pillars */}
        <section className="space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917]">
            Core Disciplines Covered
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white border border-[#E8E2D5] rounded-sm space-y-2">
              <div className="text-xs uppercase tracking-wider font-bold text-[#9A3412]">01. Practical Digital Marketing</div>
              <h3 className="font-serif text-lg font-bold text-[#1C1917]">Foundations &amp; Unit Economics</h3>
              <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                Full-funnel customer journey mapping, customer acquisition cost benchmarks, lifetime value ratios, and multi-touch attribution.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#E8E2D5] rounded-sm space-y-2">
              <div className="text-xs uppercase tracking-wider font-bold text-[#9A3412]">02. Search Engine Optimization</div>
              <h3 className="font-serif text-lg font-bold text-[#1C1917]">AI Overviews &amp; Entity Search</h3>
              <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                Information Gain scoring, structured semantic data (JSON-LD), technical crawl health, and earning citations in generative search engines.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#E8E2D5] rounded-sm space-y-2">
              <div className="text-xs uppercase tracking-wider font-bold text-[#9A3412]">03. Artificial Intelligence &amp; Agents</div>
              <h3 className="font-serif text-lg font-bold text-[#1C1917]">Autonomous Workflows &amp; LLMs</h3>
              <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                Human-in-the-loop content pipelines, algorithmic bid optimization, predictive customer modeling, and agentic commerce frameworks.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#E8E2D5] rounded-sm space-y-2">
              <div className="text-xs uppercase tracking-wider font-bold text-[#9A3412]">04. Paid Media &amp; Advertising</div>
              <h3 className="font-serif text-lg font-bold text-[#1C1917]">Google Ads vs. Meta Advantage+</h3>
              <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                Intent capture versus demand creation, creative fatigue management, algorithmic broad targeting, and blended ROAS optimization.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#E8E2D5] rounded-sm space-y-2">
              <div className="text-xs uppercase tracking-wider font-bold text-[#9A3412]">05. Social Media &amp; Community</div>
              <h3 className="font-serif text-lg font-bold text-[#1C1917]">Organic Reach &amp; Distribution</h3>
              <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                The Rule of One platform focus, authentic founder storytelling, behind-the-scenes craft, and turning viral views into owned email subscribers.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#E8E2D5] rounded-sm space-y-2">
              <div className="text-xs uppercase tracking-wider font-bold text-[#9A3412]">06. Brand Systems &amp; Reputation</div>
              <h3 className="font-serif text-lg font-bold text-[#1C1917]">Executive Positioning &amp; Authority</h3>
              <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                Establishing distinctive points of view (POV), writing contrarian analyses, and converting professional experience into inbound deal flow.
              </p>
            </div>
          </div>
        </section>

        {/* Editorial Standards & Guarantees */}
        <section className="p-8 bg-[#F3EEE2] border border-[#E5DECFA] rounded-sm space-y-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#1C1917]">
            <ShieldCheck className="w-4 h-4 text-[#9A3412]" /> Our Editorial Pledge
          </div>
          <h3 className="font-serif text-xl font-bold text-[#1C1917]">
            Independent, Verified, and Zero-Filler Content
          </h3>
          <ul className="space-y-3 text-sm text-[#44403C]">
            <li className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-white text-[#9A3412] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-sm">1</span>
              <span><strong>No Synthetic Slop:</strong> We never publish unedited raw LLM drafts. Every sentence is scrutinized, fact-checked, and grounded in operational reality.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-white text-[#9A3412] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-sm">2</span>
              <span><strong>Unit-Economic Truth:</strong> We reject vanity metrics like follower counts in favor of net cash contribution, payback velocity, and customer lifetime value.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-white text-[#9A3412] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-sm">3</span>
              <span><strong>Action-First Architecture:</strong> Every guide includes reproducible tables, step-by-step checklists, or copy formulas ready for direct implementation.</span>
            </li>
          </ul>
        </section>

        {/* Editorial Masthead / Authors */}
        <section className="space-y-8">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917]">
              The Editorial Masthead
            </h2>
            <p className="text-sm text-[#57534E] mt-1">
              Practitioners and advisors bringing frontline operational experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Object.values(AUTHORS).map((author) => (
              <div key={author.id} className="p-6 bg-white border border-[#E8E2D5] rounded-sm flex items-start gap-4">
                <AuthorAvatar
                  src={author.avatar}
                  name={author.name}
                  sizeClass="w-14 h-14"
                />
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-bold text-[#1C1917]">{author.name}</h3>
                  <div className="text-xs font-semibold text-[#9A3412]">{author.role}</div>
                  <p className="text-xs text-[#57534E] leading-relaxed pt-1">{author.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact / Reader Inquiry Form */}
        <section className="p-8 bg-white border border-[#E8E2D5] rounded-sm space-y-6">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#1C1917]">
              Contact the Editorial Desk
            </h2>
            <p className="text-xs sm:text-sm text-[#57534E] mt-1">
              Have a strategic inquiry, contrarian case study, or critique to share with our editors?
            </p>
          </div>

          {formSubmitted ? (
            <div className="p-6 bg-[#EDF6EE] border border-emerald-200 rounded-sm text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <Check className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-emerald-900">Message Received</h3>
              <p className="text-xs text-emerald-800">
                Thank you for contacting Signal &amp; Prompt. Our editorial desk reviews incoming inquiries within two business days.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#57534E] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#DCD5C8] rounded-sm focus:outline-none focus:ring-1 focus:ring-[#1C1917]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#57534E] mb-1">
                    Work Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#DCD5C8] rounded-sm focus:outline-none focus:ring-1 focus:ring-[#1C1917]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#57534E] mb-1">
                  Message or Editorial Pitch
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share your question, data benchmark, or feedback with our team..."
                  className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#DCD5C8] rounded-sm focus:outline-none focus:ring-1 focus:ring-[#1C1917]"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#1C1917] text-white text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-[#38332B] transition-colors inline-flex items-center gap-2"
              >
                Send Message <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </section>

      </main>
    </div>
  );
};
