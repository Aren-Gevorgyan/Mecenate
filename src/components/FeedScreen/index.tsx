import { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { useInfiniteQuery } from '@tanstack/react-query';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { fetchFeedPage } from '../../api/posts';
import { feedUiStore } from '../../stores/feedUiStore';
import type { Post } from '../../types/posts';
import { tokens } from '../../tokens';
import { ErrorState } from '../ErrorState';
import { LoadingFooter } from '../LoadingFooter';
import { PostCard } from '../PostCard';

// Figma: https://www.figma.com/design/bAxXrk7TaPN13TZ60yf7uD/Test-Assignment?node-id=0-1
export const FeedScreen = observer(() => {
  const {
    data,
    isError,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['feed-posts'],
    queryFn: ({ pageParam }) => fetchFeedPage(pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextCursor ?? undefined : undefined,
  });

  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

  const handleRefresh = useCallback(async () => {
    feedUiStore.setRefreshing(true);
    try {
      await refetch();
    } finally {
      feedUiStore.setRefreshing(false);
    }
  }, [refetch]);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const renderItem = useCallback(
    ({ item }: { item: Post }) => <PostCard post={item} />,
    [],
  );

  if (isError && posts.length === 0) {
    return <ErrorState onRetry={refetch} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.3}
        ListFooterComponent={isFetchingNextPage ? <LoadingFooter /> : null}
        ListEmptyComponent={
          isLoading ? <LoadingFooter /> : <Text style={styles.empty}>Публикаций пока нет</Text>
        }
        refreshControl={
          <RefreshControl
            refreshing={feedUiStore.isRefreshing}
            onRefresh={handleRefresh}
            tintColor={tokens.colors.accent}
            accessibilityLabel="Обновить ленту"
          />
        }
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.colors.background,
    paddingTop: tokens.spacing.xl * 2,
  },
  title: {
    color: tokens.colors.textPrimary,
    fontSize: tokens.typography.title,
    fontWeight: '700',
    paddingHorizontal: tokens.spacing.lg,
    paddingBottom: tokens.spacing.md,
  },
  listContent: {
    paddingHorizontal: 0,
    paddingBottom: 0,
  },
  empty: {
    textAlign: 'center',
    color: tokens.colors.textSecondary,
  },
});
