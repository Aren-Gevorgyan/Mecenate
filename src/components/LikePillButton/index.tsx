import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text } from "react-native";
import { togglePostLike } from "../../api/posts";
import { tokens } from "../../tokens";

type LikePillButtonProps = {
  postId: string;
  initialIsLiked: boolean;
  initialLikesCount: number;
};

export const LikePillButton = ({
  postId,
  initialIsLiked,
  initialLikesCount,
}: LikePillButtonProps) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setIsLiked(initialIsLiked);
    setLikesCount(initialLikesCount);
  }, [initialIsLiked, initialLikesCount]);

  const handleLikePress = async () => {
    if (isUpdating) {
      return;
    }

    setIsUpdating(true);
    try {
      const likeData = await togglePostLike(postId);
      setIsLiked(likeData.isLiked);
      setLikesCount(likeData.likesCount);
    } catch {
      // Keep previous state when request fails.
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={
        isLiked ? "Убрать лайк с публикации" : "Поставить лайк публикации"
      }
      onPress={handleLikePress}
      disabled={isUpdating}
      style={({ pressed }) => [
        styles.pill,
        isLiked ? styles.likePillActive : styles.likePillIdle,
        pressed ? styles.pillPressed : null,
        isUpdating ? styles.pillDisabled : null,
      ]}
    >
      <Ionicons
        name="heart"
        size={16}
        color={isLiked ? "#FFFFFF" : "#9CA3AF"}
      />
      <Text
        style={[
          styles.pillCount,
          isLiked ? styles.pillCountActive : styles.pillCountIdle,
        ]}
      >
        {likesCount}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pill: {
    width: 63,
    height: 36,
    borderRadius: 999,
    paddingHorizontal: tokens.spacing.xs,
    paddingVertical: tokens.spacing.xs,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: tokens.spacing.sm,
  },
  pillPressed: {
    opacity: 0.82,
  },
  pillDisabled: {
    opacity: 0.6,
  },
  likePillActive: {
    backgroundColor: "#FF2A7B",
  },
  likePillIdle: {
    backgroundColor: "#F1F5F9",
  },
  pillCount: {
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18,
  },
  pillCountActive: {
    color: "#FFFFFF",
  },
  pillCountIdle: {
    color: "#4B5563",
  },
});
