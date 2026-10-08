export type CategorySlug = 
  | 'fundamentals'
  | 'artificial-intelligence'
  | 'seo-search'
  | 'content-strategy'
  | 'social-media'
  | 'email-marketing'
  | 'paid-media'
  | 'branding'
  | 'analytics';

export interface Author {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  handle?: string;
}

export interface ArticleSection {
  id: string;
  heading: string;
  subheading?: string;
  content: string[]; // array of paragraphs or lists
  callout?: {
    type: 'takeaway' | 'metric' | 'pro-tip' | 'quote';
    title?: string;
    text: string;
  };
  table?: {
    caption?: string;
    headers: string[];
    rows: string[][];
  };
  checklist?: string[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: {
    slug: CategorySlug;
    name: string;
  };
  author: Author;
  publishedAt: string;
  updatedAt?: string;
  readTime: string;
  featuredImage: string;
  imageAlt: string;
  featured?: boolean;
  tags: string[];
  sections: ArticleSection[];
  keyTakeaways: string[];
}
