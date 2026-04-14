import { Image, StyleSheet, Text, View } from "react-native";
import type { Post } from "../../types/posts";
import { tokens } from "../../tokens";
import { CommentPillButton } from "../CommentPillButton";
import { LikePillButton } from "../LikePillButton";
import { PaidPostOverlay } from "../PaidPostOverlay";

type PostCardProps = {
  post: Post;
};

export const PostCard = ({ post }: PostCardProps) => {
  const isPaidPost = post.tier === "paid";

  return (
    <View style={styles.card}>
      <View style={styles.authorRow}>
        <Image
          accessibilityLabel={`Аватар автора ${post.author.displayName}`}
          source={{ uri: post.author.avatarUrl }}
          style={styles.avatar}
        />
        <Text style={styles.authorName}>{post.author.displayName}</Text>
      </View>

      <View style={styles.coverWrapper}>
        <Image
          accessibilityLabel={`Обложка публикации ${post.id}`}
          source={{ uri: post.coverUrl }}
          style={styles.cover}
        />

        {isPaidPost ? <PaidPostOverlay /> : null}
      </View>

      <Text style={styles.title}>{post.title}</Text>
      {!isPaidPost ? <Text style={styles.preview}>{post.preview}</Text> : null}

      <View style={styles.statsRow}>
        <LikePillButton
          postId={post.id}
          initialIsLiked={post.isLiked}
          initialLikesCount={post.likesCount}
        />
        <CommentPillButton commentsCount={post.commentsCount} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: tokens.colors.surface,
    marginBottom: tokens.spacing.xl,
    overflow: "hidden",
  },
  title: {
    fontFamily: "Manrope",
    fontWeight: "700",
    fontSize: 18,
    lineHeight: 26,
    letterSpacing: 0,
    fontVariant: ["lining-nums", "tabular-nums"],
    paddingHorizontal: tokens.spacing.lg,
    paddingBottom: tokens.spacing.sm,
    paddingTop: tokens.spacing.sm,
  },
  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: tokens.spacing.lg,
    gap: tokens.spacing.sm,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  authorName: {
    color: tokens.colors.textPrimary,
    fontWeight: "600",
  },
  preview: {
    color: tokens.colors.textSecondary,
    fontSize: tokens.typography.body,
    paddingHorizontal: tokens.spacing.lg,
    paddingBottom: 0,
  },
  cover: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: tokens.colors.background,
  },
  coverWrapper: {
    position: "relative",
  },
  statsRow: {
    flexDirection: "row",
    gap: tokens.spacing.xs,
    padding: tokens.spacing.lg,
  },
});
