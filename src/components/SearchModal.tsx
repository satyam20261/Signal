import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Clock, FileText } from 'lucide-react';
import { Article } from '../types/blog';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onSelectArticle: (slug: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  articles,
  onSelectArticle
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  const results = normalizedQuery
    ? articles.filter((article) => {
        const inTitle = article.title.toLowerCase().includes(normalizedQuery);
        const inSubtitle = article.subtitle.toLowerCase().includes(normalizedQuery);
        const inExcerpt = article.excerpt.toLowerCase().includes(normalizedQuery);
        const inCategory = article.category.name.toLowerCase().includes(normalizedQuery);
        const inAuthor = article.author.name.toLowerCase().includes(normalizedQuery);
        const inTags = article.tags.some((t) => t.toLowerCase().includes(normalizedQuery));
        const inContent = article.sections.some((s) =>
          s.content.some((c) => c.toLowerCase().includes(normalizedQuery))
        );
        return inTitle || inSubtitle || inExcerpt || inCategory || inAuthor || inTags || inContent;
      })
    : articles.slice(0, 5); // Show first 5 when empty

  const handleSelect = (slug: string) => {
    onSelectArticle(slug);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 p-4">
      <div
        className="w-full max-w-2xl bg-[#FAF9F5] border border-[#E2DBD0] rounded-sm shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#E8E2D5] flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-[#78716C]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles by title, keyword, author or topic..."
            className="w-full bg-transparent text-sm sm:text-base text-[#1C1917] placeholder-[#A8A29E] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#78716C] hover:text-[#1C1917]"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs uppercase font-semibold text-[#78716C] hover:text-[#1C1917] px-2 py-1 bg-[#F5F2EA] rounded"
          >
            Esc
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 divide-y divide-[#F0ECE1]">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#78716C] pb-2">
            {normalizedQuery ? `Search Results (${results.length})` : 'Popular Articles'}
          </div>

          {results.length === 0 ? (
            <div className="py-12 text-center text-[#78716C] space-y-2">
              <FileText className="w-8 h-8 mx-auto opacity-40" />
              <p className="text-sm">No articles matched "{query}"</p>
              <p className="text-xs">Try searching for "SEO", "Google Ads", "Email", or "AI".</p>
            </div>
          ) : (
            results.map((article) => (
              <div
                key={article.id}
                onClick={() => handleSelect(article.slug)}
                className="py-3 px-2 group cursor-pointer hover:bg-[#F3EFE6] rounded transition-colors flex items-center justify-between"
              >
                <div className="space-y-1 pr-4">
                  <div className="flex items-center gap-2 text-[11px] text-[#78716C] uppercase font-medium">
                    <span className="text-[#9A3412] font-semibold">{article.category.name}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-[#1C1917] group-hover:text-[#9A3412] transition-colors">
                    {article.title}
                  </h4>
                  <p className="text-xs text-[#57534E] line-clamp-1">{article.excerpt}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#A8A29E] group-hover:text-[#1C1917] group-hover:translate-x-1 transition-all shrink-0" />
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[#F4EFE6] border-t border-[#E8E2D5] text-[11px] text-[#78716C] flex items-center justify-between">
          <span>Search spans titles, summaries, tags, and full text</span>
          <span>Press ESC to exit</span>
        </div>
      </div>
    </div>
  );
};
