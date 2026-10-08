/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { ARTICLES, CATEGORIES } from './data/articles';
import { Article } from './types/blog';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ArticleCard } from './components/ArticleCard';
import { ArticleView } from './components/ArticleView';
import { AboutView } from './components/AboutView';
import { CategoriesView } from './components/CategoriesView';
import { SearchModal } from './components/SearchModal';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import {
  Search,
  Filter,
  Sparkles,
  TrendingUp,
  ArrowRight,
  BookOpen,
  CheckCircle,
  SlidersHorizontal,
  X
} from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<
    'home' | 'articles' | 'categories' | 'about' | 'article-detail'
  >('home');
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);

  // LocalStorage bookmarks
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('sp_bookmarks');
      return saved ? new Set(JSON.parse(saved)) : new Set(['1', '3']);
    } catch {
      return new Set(['1', '3']);
    }
  });

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      try {
        localStorage.setItem('sp_bookmarks', JSON.stringify(Array.from(next)));
      } catch (err) {
        console.error(err);
      }
      return next;
    });
  };

  const removeBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      try {
        localStorage.setItem('sp_bookmarks', JSON.stringify(Array.from(next)));
      } catch (err) {
        console.error(err);
      }
      return next;
    });
  };

  const clearAllBookmarks = () => {
    setBookmarkedIds(new Set());
    try {
      localStorage.removeItem('sp_bookmarks');
    } catch (err) {
      console.error(err);
    }
  };

  // URL Hash Sync for clean routing and back button
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash || hash === 'home') {
        setCurrentView('home');
        setSelectedArticleSlug(null);
      } else if (hash.startsWith('article/')) {
        const slug = hash.replace('article/', '');
        const exists = ARTICLES.find((a) => a.slug === slug);
        if (exists) {
          setSelectedArticleSlug(slug);
          setCurrentView('article-detail');
        }
      } else if (hash === 'articles') {
        setCurrentView('articles');
        setSelectedArticleSlug(null);
      } else if (hash === 'categories') {
        setCurrentView('categories');
        setSelectedArticleSlug(null);
      } else if (hash === 'about') {
        setCurrentView('about');
        setSelectedArticleSlug(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Keyboard shortcut for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigateTo = (view: 'home' | 'articles' | 'categories' | 'about') => {
    setCurrentView(view);
    setSelectedArticleSlug(null);
    window.location.hash = view === 'home' ? '' : view;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectArticle = (slug: string) => {
    setSelectedArticleSlug(slug);
    setCurrentView('article-detail');
    window.location.hash = `article/${slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectCategoryFromDirectory = (slug: string) => {
    setSelectedCategory(slug);
    setCurrentView('articles');
    window.location.hash = 'articles';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((article) => {
      const matchesCategory =
        selectedCategory === 'all' || article.category.slug === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesQuery =
        article.title.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q) ||
        article.author.name.toLowerCase().includes(q) ||
        article.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  // Selected article for detail view
  const currentArticle = useMemo(() => {
    if (!selectedArticleSlug) return null;
    return ARTICLES.find((a) => a.slug === selectedArticleSlug) || null;
  }, [selectedArticleSlug]);

  // Lead stories for the homepage 3-tier salience
  const leadArticle = ARTICLES[0]; // "What Is Digital Marketing? Complete Beginner's Guide"
  const secondaryArticles = [ARTICLES[1], ARTICLES[2]]; // AI & SEO in 2026
  const remainingArticles = ARTICLES.slice(3); // The other 7 articles

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-[#1C1917]">
      {/* Primary Top Bar */}
      <Header
        currentView={currentView}
        onNavigate={navigateTo}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        bookmarkedCount={bookmarkedIds.size}
      />

      {/* Main Body Routing */}
      <div className="flex-1">
        {currentView === 'article-detail' && currentArticle ? (
          <ArticleView
            article={currentArticle}
            allArticles={ARTICLES}
            onBack={() => navigateTo('home')}
            onSelectArticle={selectArticle}
            onToggleBookmark={toggleBookmark}
            isBookmarked={bookmarkedIds.has(currentArticle.id)}
          />
        ) : currentView === 'about' ? (
          <AboutView />
        ) : currentView === 'categories' ? (
          <CategoriesView
            articles={ARTICLES}
            onSelectCategory={selectCategoryFromDirectory}
            onSelectArticle={selectArticle}
            onToggleBookmark={toggleBookmark}
            bookmarkedIds={bookmarkedIds}
          />
        ) : currentView === 'articles' ? (
          /* Dedicated Archive View with Filtering & Search */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
            {/* Archive Header */}
            <div className="border-b border-[#ECE7DA] pb-8 space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#9A3412] font-bold">
                <BookOpen className="w-4 h-4" /> Publication Archive
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1917]">
                All 10 Editorial Guides
              </h1>
              <p className="text-sm sm:text-base text-[#57534E] max-w-2xl">
                Comprehensive, original guides examining digital marketing mechanics, generative AI workflows, SEO architectures, and brand strategy.
              </p>
            </div>

            {/* Filter and Search Bar Controls */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 bg-white border border-[#E8E2D5] rounded-sm">
              {/* Category Segmented Controls (Buttons as permitted by section 1.A) */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none text-xs">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1.5 rounded-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-[#1C1917] text-white'
                      : 'text-[#57534E] hover:bg-[#F3EFE6] hover:text-[#1C1917]'
                  }`}
                >
                  All Topics ({ARTICLES.length})
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`px-3 py-1.5 rounded-sm font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === cat.slug
                        ? 'bg-[#1C1917] text-white'
                        : 'text-[#57534E] hover:bg-[#F3EFE6] hover:text-[#1C1917]'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Inline Search Input */}
              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#8C8273]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter articles..."
                  className="w-full pl-9 pr-8 py-1.5 text-xs bg-[#FAF8F5] border border-[#DDD7CB] rounded-sm focus:outline-none focus:ring-1 focus:ring-[#1C1917]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-2 text-[#78716C] hover:text-[#1C1917]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Article Count & Active Filters Indicator */}
            <div className="flex items-center justify-between text-xs text-[#78716C]">
              <span>
                Showing {filteredArticles.length} of {ARTICLES.length} published articles
              </span>
              {(selectedCategory !== 'all' || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="text-[#9A3412] hover:underline font-semibold"
                >
                  Reset all filters
                </button>
              )}
            </div>

            {/* Articles Grid */}
            {filteredArticles.length === 0 ? (
              <div className="py-20 text-center bg-white border border-[#E8E2D5] rounded-sm p-8 space-y-3">
                <SlidersHorizontal className="w-8 h-8 mx-auto text-[#A8A29E]" />
                <h3 className="font-serif text-lg font-bold text-[#1C1917]">
                  No articles matched your criteria
                </h3>
                <p className="text-xs text-[#57534E]">
                  Try clearing your search query or selecting a different category.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 bg-[#1C1917] text-white text-xs font-semibold rounded-sm mt-2"
                >
                  View All 10 Articles
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onSelect={selectArticle}
                    onToggleBookmark={toggleBookmark}
                    isBookmarked={bookmarkedIds.has(article.id)}
                    variant="standard"
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* HOMEPAGE: Showing all 10 articles with 3-tier editorial salience */
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
            
            {/* Editorial Marquee / Manifesto Ribbon */}
            <section className="border-b border-[#ECE7DA] pb-8 pt-2">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-1 max-w-3xl">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#9A3412] font-bold">
                    <Sparkles className="w-3.5 h-3.5" /> Editorial Review · Autumn 2026 Edition
                  </div>
                  <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1C1917] leading-tight">
                    The Modern Playbook for Digital Marketing &amp; Artificial Intelligence
                  </h1>
                  <p className="text-sm sm:text-base text-[#57534E] leading-relaxed pt-2">
                    Actionable frameworks, algorithmic search strategies, unit economics, and generative workflows for modern founders and marketing practitioners.
                  </p>
                </div>

                {/* Quick Stats or Operational ribbon */}
                <div className="flex items-center gap-6 text-xs text-[#78716C] border-t md:border-t-0 md:border-l border-[#ECE7DA] pt-4 md:pt-0 md:pl-6 shrink-0">
                  <div>
                    <div className="font-serif text-xl font-bold text-[#1C1917]">10</div>
                    <div>In-depth guides</div>
                  </div>
                  <div>
                    <div className="font-serif text-xl font-bold text-[#1C1917]">100%</div>
                    <div>Original analysis</div>
                  </div>
                  <div>
                    <div className="font-serif text-xl font-bold text-[#1C1917]">4.9★</div>
                    <div>Editorial rating</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Tier 1: Lead Story */}
            <section>
              <ArticleCard
                article={leadArticle}
                onSelect={selectArticle}
                onToggleBookmark={toggleBookmark}
                isBookmarked={bookmarkedIds.has(leadArticle.id)}
                variant="featured"
              />
            </section>

            {/* Tier 2: Secondary Features (2-column layout) */}
            <section className="space-y-6">
              <div className="flex items-baseline justify-between border-b border-[#ECE7DA] pb-3">
                <h2 className="font-serif text-2xl font-bold text-[#1C1917]">
                  Frontline AI &amp; Search Analyses
                </h2>
                <span className="text-xs text-[#78716C] uppercase font-medium">
                  Curated Features
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {secondaryArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onSelect={selectArticle}
                    onToggleBookmark={toggleBookmark}
                    isBookmarked={bookmarkedIds.has(article.id)}
                    variant="standard"
                  />
                ))}
              </div>
            </section>

            {/* Interactive Category Filter Bar for the Complete Catalog */}
            <section className="space-y-8 pt-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#ECE7DA] pb-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#1C1917]">
                    Complete Catalog (All 10 Articles)
                  </h2>
                  <p className="text-xs sm:text-sm text-[#57534E]">
                    Explore every publication guide with instant category filtering.
                  </p>
                </div>

                {/* Filter buttons */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none text-xs">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-3 py-1.5 rounded-sm font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-[#1C1917] text-white'
                        : 'text-[#57534E] hover:bg-[#EFECE3] hover:text-[#1C1917]'
                    }`}
                  >
                    All ({ARTICLES.length})
                  </button>
                  <button
                    onClick={() => setSelectedCategory('artificial-intelligence')}
                    className={`px-3 py-1.5 rounded-sm font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === 'artificial-intelligence'
                        ? 'bg-[#1C1917] text-white'
                        : 'text-[#57534E] hover:bg-[#EFECE3] hover:text-[#1C1917]'
                    }`}
                  >
                    AI (3)
                  </button>
                  <button
                    onClick={() => setSelectedCategory('paid-media')}
                    className={`px-3 py-1.5 rounded-sm font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === 'paid-media'
                        ? 'bg-[#1C1917] text-white'
                        : 'text-[#57534E] hover:bg-[#EFECE3] hover:text-[#1C1917]'
                    }`}
                  >
                    Paid Ads
                  </button>
                  <button
                    onClick={() => setSelectedCategory('email-marketing')}
                    className={`px-3 py-1.5 rounded-sm font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === 'email-marketing'
                        ? 'bg-[#1C1917] text-white'
                        : 'text-[#57534E] hover:bg-[#EFECE3] hover:text-[#1C1917]'
                    }`}
                  >
                    Email
                  </button>
                  <button
                    onClick={() => setSelectedCategory('analytics')}
                    className={`px-3 py-1.5 rounded-sm font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === 'analytics'
                        ? 'bg-[#1C1917] text-white'
                        : 'text-[#57534E] hover:bg-[#EFECE3] hover:text-[#1C1917]'
                    }`}
                  >
                    Analytics
                  </button>
                </div>
              </div>

              {/* Render all articles or selected category subset */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onSelect={selectArticle}
                    onToggleBookmark={toggleBookmark}
                    isBookmarked={bookmarkedIds.has(article.id)}
                    variant="standard"
                  />
                ))}
              </div>
            </section>

            {/* Publication Core Value Proposition Banner */}
            <section className="p-8 sm:p-12 bg-[#F3EFE6] border border-[#E2DBD0] rounded-sm">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-8 space-y-3">
                  <div className="text-xs uppercase tracking-widest text-[#9A3412] font-bold">
                    The Signal &amp; Prompt Standard
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917]">
                    Why Our Digital Marketing &amp; AI Analysis Is Different
                  </h3>
                  <p className="text-sm text-[#57534E] leading-relaxed">
                    We never publish generic filler. Each piece in our 10-article index is written from firsthand experience managing acquisition funnels, testing LLM agent workflows, and tracking the evolving mechanics of semantic search engines.
                  </p>
                </div>
                <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3 justify-center">
                  <button
                    onClick={() => navigateTo('about')}
                    className="px-5 py-3 bg-[#1C1917] text-white text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-[#38332B] transition-colors text-center"
                  >
                    Read Editorial Mission
                  </button>
                  <button
                    onClick={() => navigateTo('categories')}
                    className="px-5 py-3 bg-white border border-[#D5CEBF] text-[#1C1917] text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-[#FAF8F5] transition-colors text-center"
                  >
                    Browse 9 Pillars
                  </button>
                </div>
              </div>
            </section>

          </main>
        )}
      </div>

      {/* Global Modals & Drawers */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        articles={ARTICLES}
        onSelectArticle={selectArticle}
      />

      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        articles={ARTICLES}
        bookmarkedIds={bookmarkedIds}
        onSelectArticle={selectArticle}
        onRemoveBookmark={removeBookmark}
        onClearAll={clearAllBookmarks}
      />

      {/* Primary Footer */}
      <Footer
        onNavigate={navigateTo}
        onSelectCategory={selectCategoryFromDirectory}
      />
    </div>
  );
}
