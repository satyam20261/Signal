import React, { useState } from 'react';
import { Search, Bookmark, Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  currentView: 'home' | 'articles' | 'categories' | 'about' | 'article-detail';
  onNavigate: (view: 'home' | 'articles' | 'categories' | 'about') => void;
  onOpenSearch: () => void;
  onOpenBookmarks: () => void;
  bookmarkedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onOpenSearch,
  onOpenBookmarks,
  bookmarkedCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: 'home' | 'articles' | 'categories' | 'about') => {
    onNavigate(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-[#E6E1D5] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2C2720]"
            aria-label="Signal & Prompt Homepage"
          >
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1917] group-hover:text-[#4A3E31] transition-colors">
              Signal &amp; Prompt
            </span>
          </button>

          {/* Zone 2: 4 Clean nav links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#57534E]" aria-label="Primary Navigation">
            <button
              onClick={() => handleNavClick('home')}
              className={`hover:text-[#1C1917] transition-colors relative py-1 focus:outline-none focus-visible:underline ${
                currentView === 'home' ? 'text-[#1C1917] font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#1C1917]' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('articles')}
              className={`hover:text-[#1C1917] transition-colors relative py-1 focus:outline-none focus-visible:underline ${
                currentView === 'articles' ? 'text-[#1C1917] font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#1C1917]' : ''
              }`}
            >
              Articles
            </button>
            <button
              onClick={() => handleNavClick('categories')}
              className={`hover:text-[#1C1917] transition-colors relative py-1 focus:outline-none focus-visible:underline ${
                currentView === 'categories' ? 'text-[#1C1917] font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#1C1917]' : ''
              }`}
            >
              Categories
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`hover:text-[#1C1917] transition-colors relative py-1 focus:outline-none focus-visible:underline ${
                currentView === 'about' ? 'text-[#1C1917] font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#1C1917]' : ''
              }`}
            >
              About
            </button>
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search trigger */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#57534E] hover:text-[#1C1917] hover:bg-[#F2EFE8] rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2C2720]"
              title="Search articles (Cmd+K)"
              aria-label="Search articles"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden lg:inline text-[10px] text-[#8C8273] font-mono px-1.5 py-0.5 border border-[#DDD7CB] rounded bg-white/70">
                ⌘K
              </kbd>
            </button>

            {/* Bookmarks trigger */}
            <button
              onClick={onOpenBookmarks}
              className="relative p-2 text-[#57534E] hover:text-[#1C1917] hover:bg-[#F2EFE8] rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2C2720]"
              title="Saved reading list"
              aria-label="View saved articles"
            >
              <Bookmark className="w-4 h-4" />
              {bookmarkedCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#9A3412]" />
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#57534E] hover:text-[#1C1917] hover:bg-[#F2EFE8] rounded-md transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E6E1D5] bg-[#FAF9F5] px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-left px-3 py-2 text-base font-medium rounded-md transition-colors ${
                currentView === 'home' ? 'bg-[#EDE8DC] text-[#1C1917]' : 'text-[#57534E] hover:bg-[#F2EFE8]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('articles')}
              className={`text-left px-3 py-2 text-base font-medium rounded-md transition-colors ${
                currentView === 'articles' ? 'bg-[#EDE8DC] text-[#1C1917]' : 'text-[#57534E] hover:bg-[#F2EFE8]'
              }`}
            >
              Articles
            </button>
            <button
              onClick={() => handleNavClick('categories')}
              className={`text-left px-3 py-2 text-base font-medium rounded-md transition-colors ${
                currentView === 'categories' ? 'bg-[#EDE8DC] text-[#1C1917]' : 'text-[#57534E] hover:bg-[#F2EFE8]'
              }`}
            >
              Categories
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`text-left px-3 py-2 text-base font-medium rounded-md transition-colors ${
                currentView === 'about' ? 'bg-[#EDE8DC] text-[#1C1917]' : 'text-[#57534E] hover:bg-[#F2EFE8]'
              }`}
            >
              About
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
