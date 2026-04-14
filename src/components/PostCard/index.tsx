import { memo } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import type { Post } from "../../types/posts";
import { tokens } from "../../tokens";
import { CommentPillButton } from "../CommentPillButton";
import { ExpandablePreview } from "../ExpandablePreview";
import { LikePillButton } from "../LikePillButton";
import { PaidPostOverlay } from "../PaidPostOverlay";

type PostCardProps = {
  post: Post;
};

const PostCardComponent = ({ post }: PostCardProps) => {
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
          blurRadius={isPaidPost ? 24 : 0}
        />

        {isPaidPost ? <PaidPostOverlay /> : null}
      </View>

      {isPaidPost ? (
        <View style={styles.skeletonWrap}>
          <View style={styles.skeletonLineShort} />
          <View style={styles.skeletonLineLong} />
        </View>
      ) : (
        <>
          <Text style={styles.title}>{post.title}</Text>
          <ExpandablePreview text={post.preview} postId={post.id} />
          <View style={styles.statsRow}>
            <LikePillButton
              postId={post.id}
              initialIsLiked={post.isLiked}
              initialLikesCount={post.likesCount}
            />
            <CommentPillButton commentsCount={post.commentsCount} />
          </View>
        </>
      )}
    </View>
  );
};

export const PostCard = memo(PostCardComponent);

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
    gap: tokens.spacing.md,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 18,
  },
  authorName: {
    color: tokens.colors.textPrimary,
    fontWeight: "600",
  },
  cover: {
    width: "100%",
    height: 393,
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
  skeletonWrap: {
    paddingHorizontal: tokens.spacing.lg,
    paddingVertical: tokens.spacing.lg,
    gap: tokens.spacing.sm,
  },
  skeletonLineShort: {
    height: 26,
    width: 164,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
  },
  skeletonLineLong: {
    height: 40,
    width: "100%",
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
  },
});
