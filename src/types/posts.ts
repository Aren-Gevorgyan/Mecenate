export type Author = {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  isVerified: boolean;
};

export type PostTier = 'free' | 'paid';

export type Post = {
  id: string;
  title: string;
  author: Author;
  preview: string;
  coverUrl: string;
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  tier: PostTier;
  createdAt: string;
};

export type FeedPage = {
  posts: Post[];
  nextCursor: string | null;
  hasMore: boolean;
};
