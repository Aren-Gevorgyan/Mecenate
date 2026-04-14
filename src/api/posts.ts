import { apiGet, apiPost } from './client';
import type { FeedPage } from '../types/posts';

const FEED_LIMIT = 10;

export const fetchFeedPage = async (cursor?: string): Promise<FeedPage> => {
  const params = new URLSearchParams({
    limit: String(FEED_LIMIT),
  });

  if (cursor) {
    params.append('cursor', cursor);
  }

  return apiGet<FeedPage>(`/posts?${params.toString()}`);
};

type LikeResponse = {
  isLiked: boolean;
  likesCount: number;
};

export const togglePostLike = async (postId: string): Promise<LikeResponse> =>
  apiPost<LikeResponse>(`/posts/${postId}/like`);
