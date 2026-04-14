import { memo, useCallback, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { tokens } from "../../tokens";

type ExpandablePreviewProps = {
  text: string;
  postId: string;
};

const ExpandablePreviewComponent = ({ text, postId }: ExpandablePreviewProps) => {
  const isLikelyLongPreview = text.length > 90;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpandable, setIsExpandable] = useState(false);

  useEffect(() => {
    setIsExpanded(false);
    setIsExpandable(false);
  }, [postId]);

  const handleTextLayout = useCallback(
    (event: { nativeEvent: { lines: unknown[] } }) => {
      if (isExpanded) {
        return;
      }
      setIsExpandable(event.nativeEvent.lines.length > 2);
    },
    [isExpanded],
  );

  return (
    <View style={styles.previewWrap}>
      <Text
        style={styles.preview}
        numberOfLines={isExpanded ? undefined : 2}
        onTextLayout={handleTextLayout}
      >
        {text}
      </Text>
      {isExpandable || isLikelyLongPreview ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={isExpanded ? "Скрыть описание" : "Показать еще описание"}
          onPress={() => setIsExpanded((current) => !current)}
        >
          <Text style={styles.previewToggle}>
            {isExpanded ? "Скрыть" : "Показать еще"}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
};

export const ExpandablePreview = memo(ExpandablePreviewComponent);

const styles = StyleSheet.create({
  preview: {
    color: tokens.colors.textSecondary,
    fontSize: tokens.typography.body,
    paddingHorizontal: tokens.spacing.lg,
    paddingBottom: 0,
  },
  previewWrap: {
    gap: tokens.spacing.xs,
  },
  previewToggle: {
    color: "#6D28D9",
    fontSize: tokens.typography.body,
    fontWeight: "600",
    paddingHorizontal: tokens.spacing.lg,
  },
});
