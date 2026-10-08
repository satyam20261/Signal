import React from 'react';
import { CATEGORIES } from '../data/articles';
import { Article } from '../types/blog';
import { ArticleCard } from './ArticleCard';
import { ArrowRight, Layers } from 'lucide-react';

interface CategoriesViewProps {
  articles: Article[];
  onSelectCategory: (categorySlug: string) => void;
  onSelectArticle: (slug: string) => void;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  bookmarkedIds: Set<string>;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({
  articles,
  onSelectCategory,
  onSelectArticle,
  onToggleBookmark,
  bookmarkedIds
}) => {
  return (
    <div className="min-h-screen bg-[#FAF9F5] pb-24">
      {/* Category Directory Header */}
      <section className="border-b border-[#ECE7DA] py-14 sm:py-16 bg-[#F5F1E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#9A3412] font-bold">
            <Layers className="w-4 h-4" /> Category Directory
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1917]">
            Topics &amp; Disciplines
          </h1>
          <p className="text-base text-[#57534E] max-w-2xl">
            Explore our curated knowledge base structured across nine core pillars of modern digital marketing, artificial intelligence, and brand engineering.
          </p>
        </div>
      </section>

      {/* Main Categories Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        
        {/* Category Cards Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => {
            const catArticles = articles.filter((a) => a.category.slug === cat.slug);

            return (
              <div
                key={cat.slug}
                className="p-6 bg-white border border-[#E8E2D5] rounded-sm hover:border-[#C8BFAD] hover:shadow-sm transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#78716C] uppercase font-semibold">
                    <span className="text-[#9A3412]">Pillar</span>
                    <span className="font-mono">{catArticles.length} {catArticles.length === 1 ? 'Article' : 'Articles'}</span>
                  </div>

                  <h2 className="font-serif text-2xl font-bold text-[#1C1917]">
                    {cat.name}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#F2ECE1] mt-6 flex items-center justify-between">
                  <button
                    onClick={() => onSelectCategory(cat.slug)}
                    className="text-xs font-semibold text-[#1C1917] hover:text-[#9A3412] inline-flex items-center gap-1.5 transition-colors"
                  >
                    Browse category <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Featured Categorical Breakdowns */}
        <section className="space-y-12 pt-8 border-t border-[#ECE7DA]">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917]">
              All Articles by Domain
            </h2>
            <p className="text-sm text-[#57534E] mt-1">
              Browse every publication entry organized by subject area.
            </p>
          </div>

          <div className="space-y-14">
            {CATEGORIES.map((cat) => {
              const catArticles = articles.filter((a) => a.category.slug === cat.slug);
              if (catArticles.length === 0) return null;

              return (
                <div key={cat.slug} className="space-y-6">
                  <div className="flex items-baseline justify-between border-b border-[#ECE7DA] pb-3">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917]">
                      {cat.name}
                    </h3>
                    <button
                      onClick={() => onSelectCategory(cat.slug)}
                      className="text-xs font-semibold text-[#9A3412] hover:underline"
                    >
                      Filter this topic →
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {catArticles.map((article) => (
                      <ArticleCard
                        key={article.id}
                        article={article}
                        onSelect={onSelectArticle}
                        onToggleBookmark={onToggleBookmark}
                        isBookmarked={bookmarkedIds.has(article.id)}
                        variant="standard"
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </main>
    </div>
  );
};
