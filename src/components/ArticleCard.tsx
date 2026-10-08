import React from 'react';
import { Bookmark, ArrowRight } from 'lucide-react';
import { Article } from '../types/blog';
import { ArticleImage } from './ArticleImage';

interface ArticleCardProps {
  article: Article;
  onSelect: (slug: string) => void;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  isBookmarked: boolean;
  variant?: 'featured' | 'standard' | 'compact' | 'horizontal';
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onSelect,
  onToggleBookmark,
  isBookmarked,
  variant = 'standard'
}) => {
  const handleClick = () => {
    onSelect(article.slug);
  };

  if (variant === 'featured') {
    return (
      <article
        onClick={handleClick}
        className="group cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-12 border-b border-[#E6E1D5]"
      >
        <div className="lg:col-span-7 overflow-hidden rounded-sm">
          <ArticleImage
            src={article.featuredImage}
            alt={article.title}
            aspectRatioClass="aspect-[16/10]"
            priority={true}
            className="group-hover:scale-[1.02] transition-transform duration-500 ease-out"
          />
        </div>

        <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
          {/* Zero-Pill Unboxed Metadata */}
          <div className="flex items-center gap-2 text-xs text-[#78716C] tracking-wide uppercase font-medium">
            <span className="text-[#9A3412] font-semibold">{article.category.name}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readTime}</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#1C1917] group-hover:text-[#4A3E31] transition-colors leading-[1.15]">
            {article.title}
          </h2>

          <p className="text-sm sm:text-base text-[#57534E] leading-relaxed line-clamp-3">
            {article.excerpt}
          </p>

          <div className="pt-2 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-8 h-8 rounded-full object-cover ring-1 ring-[#D8D2C4]"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="text-xs">
                <span className="font-medium text-[#1C1917] block">{article.author.name}</span>
                <span className="text-[#78716C]">{article.publishedAt}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={(e) => onToggleBookmark(article.id, e)}
                className={`p-2 rounded-full transition-colors ${
                  isBookmarked
                    ? 'text-[#9A3412] bg-[#F5ECE5]'
                    : 'text-[#78716C] hover:text-[#1C1917] hover:bg-[#F2EFE8]'
                }`}
                title={isBookmarked ? 'Remove from reading list' : 'Save to reading list'}
                aria-label="Bookmark article"
              >
                <Bookmark className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} />
              </button>

              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1C1917] group-hover:translate-x-1 transition-transform">
                Read article <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'horizontal') {
    return (
      <article
        onClick={handleClick}
        className="group cursor-pointer grid grid-cols-1 sm:grid-cols-12 gap-5 py-6 border-b border-[#EAE5D9] last:border-b-0 items-center"
      >
        <div className="sm:col-span-4 overflow-hidden rounded-sm">
          <ArticleImage
            src={article.featuredImage}
            alt={article.title}
            aspectRatioClass="aspect-[16/10]"
            className="group-hover:scale-[1.03] transition-transform duration-500 ease-out"
          />
        </div>

        <div className="sm:col-span-8 flex flex-col space-y-2">
          {/* Zero-Pill Unboxed Metadata */}
          <div className="flex items-center gap-2 text-xs text-[#78716C] tracking-wide uppercase font-medium">
            <span className="text-[#9A3412] font-semibold">{article.category.name}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readTime}</span>
            <span aria-hidden="true">·</span>
            <span>{article.publishedAt}</span>
          </div>

          <h3 className="font-serif text-xl font-bold text-[#1C1917] group-hover:text-[#4A3E31] transition-colors leading-snug">
            {article.title}
          </h3>

          <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed line-clamp-2">
            {article.excerpt}
          </p>

          <div className="pt-2 flex items-center justify-between text-xs text-[#78716C]">
            <span className="font-medium text-[#292524]">By {article.author.name}</span>
            <button
              onClick={(e) => onToggleBookmark(article.id, e)}
              className={`p-1.5 rounded-full transition-colors ${
                isBookmarked
                  ? 'text-[#9A3412] bg-[#F5ECE5]'
                  : 'text-[#78716C] hover:text-[#1C1917] hover:bg-[#F2EFE8]'
              }`}
              title={isBookmarked ? 'Remove bookmark' : 'Save bookmark'}
              aria-label="Bookmark article"
            >
              <Bookmark className="w-3.5 h-3.5" fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
      </article>
    );
  }

  // Standard card grid
  return (
    <article
      onClick={handleClick}
      className="group cursor-pointer flex flex-col bg-[#FFFFFF] border border-[#E8E3D7] rounded-sm overflow-hidden hover:border-[#D1C9B8] hover:shadow-sm transition-all duration-300"
    >
      <div className="overflow-hidden">
        <ArticleImage
          src={article.featuredImage}
          alt={article.title}
          aspectRatioClass="aspect-[16/10]"
          className="group-hover:scale-[1.03] transition-transform duration-500 ease-out"
        />
      </div>

      <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Zero-Pill Unboxed Metadata */}
          <div className="flex items-center gap-2 text-xs text-[#78716C] tracking-wide uppercase font-medium">
            <span className="text-[#9A3412] font-semibold">{article.category.name}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readTime}</span>
          </div>

          <h3 className="font-serif text-xl font-bold tracking-tight text-[#1C1917] group-hover:text-[#4A3E31] transition-colors leading-snug">
            {article.title}
          </h3>

          <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed line-clamp-3">
            {article.excerpt}
          </p>
        </div>

        <div className="pt-4 border-t border-[#F2ECE1] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-6 h-6 rounded-full object-cover ring-1 ring-[#D8D2C4]"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <span className="text-[#44403C] font-medium truncate max-w-[120px]">
              {article.author.name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => onToggleBookmark(article.id, e)}
              className={`p-1.5 rounded-full transition-colors ${
                isBookmarked
                  ? 'text-[#9A3412] bg-[#F5ECE5]'
                  : 'text-[#78716C] hover:text-[#1C1917] hover:bg-[#F2EFE8]'
              }`}
              title={isBookmarked ? 'Remove from reading list' : 'Save to reading list'}
              aria-label="Bookmark article"
            >
              <Bookmark className="w-3.5 h-3.5" fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
