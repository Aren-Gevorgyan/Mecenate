import { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { tokens } from "../../tokens";
import { SubtractIcon } from "../../../assets/components/SubtractIcon";

const PaidPostOverlayComponent = () => (
  <View style={styles.paidOverlay}>
    <View style={styles.paidIconWrap}>
      <SubtractIcon />
    </View>
    <Text style={styles.paidText}>
      Контент скрыт пользователем.{"\n"}Доступ откроется после доната
    </Text>
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Отправить донат"
      style={styles.paidButton}
    >
      <Text style={styles.paidButtonText}>Отправить донат</Text>
    </Pressable>
  </View>
);

export const PaidPostOverlay = memo(PaidPostOverlayComponent);

const styles = StyleSheet.create({
  paidOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    gap: tokens.spacing.md,
  },
  paidIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#6D28D9",
    alignItems: "center",
    justifyContent: "center",
  },
  paidText: {
    color: "#FFFFFF",
    fontFamily: "Manrope",
    fontWeight: "600",
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: 0,
    fontVariant: ["lining-nums", "tabular-nums"],
    textAlign: "center",
  },
  paidButton: {
    width: 239,
    height: 42,
    backgroundColor: "#6D28D9",
    borderRadius: 14,
    paddingRight: 32,
    paddingLeft: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  paidButtonText: {
    color: "#FFFFFF",
    fontFamily: "Manrope",
    fontWeight: "600",
    fontSize: 15,
    lineHeight: 26,
    letterSpacing: 0,
    fontVariant: ["lining-nums", "tabular-nums"],
  },
});
