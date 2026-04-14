import { memo } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text } from "react-native";
import { tokens } from "../../tokens";

type CommentPillButtonProps = {
  commentsCount: number;
  onPress?: () => void;
};

const CommentPillButtonComponent = ({
  commentsCount,
  onPress,
}: CommentPillButtonProps) => (
  <Pressable
    accessibilityRole="button"
    accessibilityLabel="Открыть комментарии"
    onPress={onPress}
    style={({ pressed }) => [styles.pill, pressed ? styles.pillPressed : null]}
  >
    <Ionicons name="chatbubble" size={16} color="#6B7280" />
    <Text style={styles.pillCount}>{commentsCount}</Text>
  </Pressable>
);

export const CommentPillButton = memo(CommentPillButtonComponent);

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
    backgroundColor: "#E5E7EB",
  },
  pillPressed: {
    opacity: 0.82,
  },
  pillCount: {
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18,
    color: "#4B5563",
  },
});
