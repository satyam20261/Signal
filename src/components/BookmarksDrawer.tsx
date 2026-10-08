import React from 'react';
import { X, Bookmark, ArrowRight, Trash2 } from 'lucide-react';
import { Article } from '../types/blog';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  bookmarkedIds: Set<string>;
  onSelectArticle: (slug: string) => void;
  onRemoveBookmark: (id: string) => void;
  onClearAll: () => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  articles,
  bookmarkedIds,
  onSelectArticle,
  onRemoveBookmark,
  onClearAll
}) => {
  if (!isOpen) return null;

  const savedArticles = articles.filter((a) => bookmarkedIds.has(a.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-[#FAF9F5] h-full shadow-2xl flex flex-col justify-between border-l border-[#E2DBD0] animate-in slide-in-from-right duration-200">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#E8E2D5] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-[#9A3412]" fill="currentColor" />
            <h2 className="font-serif text-lg font-bold text-[#1C1917]">
              Reading List ({savedArticles.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#78716C] hover:text-[#1C1917] rounded"
            aria-label="Close saved articles"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Saved Articles List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#EFECE3]">
          {savedArticles.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-[#78716C] space-y-3 py-16">
              <Bookmark className="w-10 h-10 stroke-1 opacity-30" />
              <div className="space-y-1">
                <p className="text-sm font-semibold text-[#44403C]">No saved articles yet</p>
                <p className="text-xs text-[#78716C] max-w-xs">
                  Click the bookmark icon on any article card to save it for offline or later reading.
                </p>
              </div>
            </div>
          ) : (
            savedArticles.map((article) => (
              <div key={article.id} className="py-4 first:pt-0 last:pb-0 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-[#78716C] uppercase font-medium">
                  <span className="text-[#9A3412] font-semibold">{article.category.name}</span>
                  <span>{article.readTime}</span>
                </div>

                <h3
                  onClick={() => {
                    onSelectArticle(article.slug);
                    onClose();
                  }}
                  className="font-serif text-base font-bold text-[#1C1917] hover:text-[#9A3412] cursor-pointer transition-colors leading-snug"
                >
                  {article.title}
                </h3>

                <p className="text-xs text-[#57534E] line-clamp-2 leading-relaxed">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between pt-1 text-xs">
                  <button
                    onClick={() => {
                      onSelectArticle(article.slug);
                      onClose();
                    }}
                    className="font-semibold text-[#1C1917] hover:underline inline-flex items-center gap-1"
                  >
                    Read now <ArrowRight className="w-3 h-3" />
                  </button>

                  <button
                    onClick={() => onRemoveBookmark(article.id)}
                    className="text-[#A8A29E] hover:text-red-700 p-1 transition-colors"
                    title="Remove from list"
                    aria-label="Remove bookmark"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {savedArticles.length > 0 && (
          <div className="p-4 bg-[#F2EDE2] border-t border-[#E8E2D5] flex items-center justify-between">
            <span className="text-xs text-[#78716C]">Stored locally in your browser</span>
            <button
              onClick={onClearAll}
              className="text-xs text-red-700 hover:underline font-medium"
            >
              Clear list
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
