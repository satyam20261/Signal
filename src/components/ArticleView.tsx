import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Bookmark,
  Share2,
  Clock,
  Calendar,
  CheckCircle2,
  Check,
  Type,
  ChevronRight,
  Sparkles,
  Quote,
  Lightbulb
} from 'lucide-react';
import { Article } from '../types/blog';
import { ArticleImage } from './ArticleImage';
import { ArticleCard } from './ArticleCard';

interface ArticleViewProps {
  article: Article;
  allArticles: Article[];
  onBack: () => void;
  onSelectArticle: (slug: string) => void;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  isBookmarked: boolean;
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  article,
  allArticles,
  onBack,
  onSelectArticle,
  onToggleBookmark,
  isBookmarked
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSectionId, setActiveSectionId] = useState<string>(
    article.sections[0]?.id || ''
  );
  const [fontSize, setFontSize] = useState<'standard' | 'large'>('standard');
  const [copiedLink, setCopiedLink] = useState(false);

  // Scroll progress listener
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }

      // Track active section
      for (const section of article.sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 100) {
            setActiveSectionId(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article]);

  // Update document title for SEO
  useEffect(() => {
    const originalTitle = document.title;
    document.title = `${article.title} | Signal & Prompt`;
    
    // Inject structured data for this article
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'article-structured-data';
    script.innerHTML = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      'headline': article.title,
      'description': article.excerpt,
      'image': article.featuredImage,
      'datePublished': article.publishedAt,
      'author': {
        '@type': 'Person',
        'name': article.author.name,
        'jobTitle': article.author.role
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'Signal & Prompt'
      }
    });
    document.head.appendChild(script);

    return () => {
      document.title = originalTitle;
      const existing = document.getElementById('article-structured-data');
      if (existing) {
        existing.remove();
      }
    };
  }, [article]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href
        });
      } catch (err) {
        // Fallback to clipboard
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FAF9F5] pb-24">
      {/* Reading Progress Bar */}
      <div
        className="fixed top-20 left-0 h-1 bg-[#9A3412] z-50 transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      {/* Top Utility Sub-Header */}
      <div className="sticky top-20 z-30 bg-[#FAF9F5]/90 backdrop-blur-sm border-b border-[#ECE7DA] py-3">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#57534E] hover:text-[#1C1917] transition-colors focus:outline-none"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to articles
          </button>

          <div className="flex items-center gap-2">
            {/* Font size toggle */}
            <button
              onClick={() => setFontSize(fontSize === 'standard' ? 'large' : 'standard')}
              className="p-1.5 text-xs rounded text-[#57534E] hover:text-[#1C1917] hover:bg-[#EFECE3] transition-colors"
              title="Toggle reading font size"
              aria-label="Toggle font size"
            >
              <Type className={`w-4 h-4 ${fontSize === 'large' ? 'text-[#9A3412]' : ''}`} />
            </button>

            {/* Bookmark button */}
            <button
              onClick={(e) => onToggleBookmark(article.id, e)}
              className={`p-1.5 text-xs rounded transition-colors ${
                isBookmarked
                  ? 'text-[#9A3412] bg-[#F5ECE5]'
                  : 'text-[#57534E] hover:text-[#1C1917] hover:bg-[#EFECE3]'
              }`}
              title={isBookmarked ? 'Saved in reading list' : 'Save to reading list'}
              aria-label="Save to reading list"
            >
              <Bookmark className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>

            {/* Share button */}
            <button
              onClick={handleShare}
              className="relative flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-[#57534E] hover:text-[#1C1917] hover:bg-[#EFECE3] rounded transition-colors"
              title="Share article"
              aria-label="Share article"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Link Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Article Main Canvas */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14">
        
        {/* Editorial Header Section */}
        <header className="space-y-6 pb-8 border-b border-[#ECE7DA]">
          {/* Zero-Pill Unboxed Metadata */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-[#78716C] tracking-wide uppercase font-medium">
            <span className="text-[#9A3412] font-semibold">{article.category.name}</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {article.readTime}
            </span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> {article.publishedAt}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1C1917] leading-[1.12]">
            {article.title}
          </h1>

          <p className="text-lg sm:text-xl text-[#57534E] font-normal leading-relaxed">
            {article.subtitle}
          </p>

          {/* Author Byline */}
          <div className="flex items-center gap-3 pt-2">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-11 h-11 rounded-full object-cover ring-2 ring-[#E0DACD]"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div>
              <div className="text-sm font-semibold text-[#1C1917]">
                {article.author.name}
              </div>
              <div className="text-xs text-[#78716C]">
                {article.author.role} {article.author.handle && `· ${article.author.handle}`}
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image Banner */}
        <figure className="my-8 rounded-sm overflow-hidden border border-[#E5DFD1]">
          <ArticleImage
            src={article.featuredImage}
            alt={article.imageAlt}
            aspectRatioClass="aspect-[16/9]"
            priority={true}
          />
          <figcaption className="p-3 text-xs text-[#78716C] italic bg-[#F7F4EC] border-t border-[#E5DFD1]">
            {article.imageAlt}
          </figcaption>
        </figure>

        {/* Executive Summary / Key Takeaways Box */}
        {article.keyTakeaways && article.keyTakeaways.length > 0 && (
          <aside className="my-10 p-6 bg-[#F4EFE6] border-l-4 border-[#9A3412] rounded-r-sm">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[#9A3412]" />
              <h2 className="text-xs uppercase tracking-widest font-bold text-[#9A3412]">
                Key Strategic Takeaways
              </h2>
            </div>
            <ul className="space-y-2 text-sm text-[#44403C]">
              {article.keyTakeaways.map((item, index) => (
                <li key={index} className="flex items-start gap-2.5">
                  <span className="font-mono text-xs text-[#9A3412] mt-0.5 font-bold">
                    0{index + 1}.
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        )}

        {/* Two-Column Grid: TOC + Content Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-10">
          
          {/* Sticky Table of Contents (Desktop) */}
          <aside className="hidden lg:block lg:col-span-4 order-2">
            <div className="sticky top-36 p-5 bg-[#F8F5EE] border border-[#E7E2D5] rounded-sm space-y-4">
              <h3 className="text-xs uppercase tracking-wider font-bold text-[#57534E]">
                Contents in this guide
              </h3>
              <nav className="space-y-2" aria-label="Table of Contents">
                {article.sections.map((sec, idx) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(sec.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`block text-xs leading-snug py-1 transition-colors ${
                      activeSectionId === sec.id
                        ? 'text-[#9A3412] font-bold pl-2 border-l-2 border-[#9A3412]'
                        : 'text-[#57534E] hover:text-[#1C1917]'
                    }`}
                  >
                    {sec.heading}
                  </a>
                ))}
              </nav>

              <div className="pt-4 border-t border-[#ECE7DA] text-xs text-[#78716C] space-y-2">
                <span className="block font-semibold text-[#44403C]">Tags</span>
                <div className="flex flex-wrap gap-1.5 text-[11px] text-[#57534E]">
                  {article.tags.map((tag) => (
                    <span key={tag} className="bg-white/80 border border-[#E0D9CB] px-2 py-0.5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Prose Canvas */}
          <div className="lg:col-span-8 order-1">
            <div className={`space-y-12 text-[#292524] ${fontSize === 'large' ? 'text-lg leading-relaxed' : 'text-base leading-relaxed'}`}>
              
              {article.sections.map((section, sIndex) => (
                <section key={section.id} id={section.id} className="scroll-mt-32 space-y-5">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1917] pt-2">
                    {section.heading}
                  </h2>

                  {section.subheading && (
                    <h3 className="text-sm font-semibold tracking-wide text-[#78716C] uppercase">
                      {section.subheading}
                    </h3>
                  )}

                  {/* Paragraphs with editorial opening styling on first section */}
                  {section.content.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className={
                        sIndex === 0 && pIndex === 0
                          ? 'first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[#1C1917]'
                          : 'leading-relaxed'
                      }
                    >
                      {paragraph}
                    </p>
                  ))}

                  {/* Section Callout if present */}
                  {section.callout && (
                    <div className="my-6 p-5 bg-[#F2EDE2] border-l-2 border-[#57534E] rounded-r-sm space-y-2">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#44403C]">
                        {section.callout.type === 'quote' ? (
                          <Quote className="w-4 h-4 text-[#9A3412]" />
                        ) : (
                          <Lightbulb className="w-4 h-4 text-[#9A3412]" />
                        )}
                        <span>{section.callout.title || 'Strategic Perspective'}</span>
                      </div>
                      <p className="text-sm italic font-serif text-[#1C1917] leading-relaxed">
                        "{section.callout.text}"
                      </p>
                    </div>
                  )}

                  {/* Data or Comparison Table if present */}
                  {section.table && (
                    <div className="my-6 overflow-x-auto rounded-sm border border-[#E4DECFA]">
                      {section.table.caption && (
                        <div className="px-4 py-2 bg-[#EBE5D8] text-xs font-semibold text-[#44403C]">
                          {section.table.caption}
                        </div>
                      )}
                      <table className="w-full text-left text-xs sm:text-sm border-collapse bg-white">
                        <thead>
                          <tr className="border-b border-[#E4DDCF] bg-[#F7F4ED]">
                            {section.table.headers.map((header, hIdx) => (
                              <th key={hIdx} className="px-4 py-3 font-semibold text-[#1C1917]">
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EFEAE0]">
                          {section.table.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-[#FAF8F3] transition-colors">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="px-4 py-3 text-[#44403C] leading-snug">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Actionable Checklist if present */}
                  {section.checklist && (
                    <div className="my-6 p-5 bg-white border border-[#E6E0D2] rounded-sm space-y-3">
                      <h4 className="text-xs uppercase tracking-wider font-bold text-[#1C1917] flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Action Checklist
                      </h4>
                      <ul className="space-y-2 text-xs sm:text-sm text-[#44403C]">
                        {section.checklist.map((item, cIndex) => (
                          <li key={cIndex} className="flex items-start gap-2.5">
                            <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                              ✓
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                </section>
              ))}

            </div>

            {/* Author Masthead Box */}
            <div className="mt-16 p-6 sm:p-8 bg-[#F5F0E6] border border-[#E2DBD0] rounded-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-[#CFC6B8]"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="space-y-1">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#9A3412]">
                    About the Author
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#1C1917]">
                    {article.author.name}
                  </h3>
                  <div className="text-xs text-[#57534E] font-medium">
                    {article.author.role}
                  </div>
                  <p className="text-xs sm:text-sm text-[#44403C] leading-relaxed pt-1">
                    {article.author.bio}
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Next / Recommended Articles Section */}
        <section className="mt-20 pt-12 border-t border-[#E5DFD1]">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl font-bold text-[#1C1917]">
              Related Strategic Analyses
            </h2>
            <button
              onClick={onBack}
              className="text-xs font-semibold text-[#9A3412] hover:underline inline-flex items-center gap-1"
            >
              View all 10 guides <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((rel) => (
              <ArticleCard
                key={rel.id}
                article={rel}
                onSelect={onSelectArticle}
                onToggleBookmark={onToggleBookmark}
                isBookmarked={false}
                variant="standard"
              />
            ))}
          </div>
        </section>

      </main>
    </div>
  );
};
