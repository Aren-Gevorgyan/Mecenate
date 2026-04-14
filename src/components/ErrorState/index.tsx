import { Pressable, StyleSheet, Text, View } from 'react-native';
import { tokens } from '../../tokens';

type ErrorStateProps = {
  onRetry: () => void;
};

export const ErrorState = ({ onRetry }: ErrorStateProps) => (
  <View style={styles.container}>
    <Text style={styles.message}>Не удалось загрузить публикации</Text>
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Повторить загрузку публикаций"
      onPress={onRetry}
      style={styles.button}
    >
      <Text style={styles.buttonLabel}>Повторить</Text>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: tokens.spacing.lg,
  },
  message: {
    color: tokens.colors.danger,
    fontSize: tokens.typography.body,
    marginBottom: tokens.spacing.md,
  },
  button: {
    backgroundColor: tokens.colors.accent,
    paddingHorizontal: tokens.spacing.lg,
    paddingVertical: tokens.spacing.sm,
    borderRadius: tokens.radius.md,
  },
  buttonLabel: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
