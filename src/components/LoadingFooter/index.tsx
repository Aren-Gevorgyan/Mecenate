import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { tokens } from '../../tokens';

export const LoadingFooter = () => (
  <View style={styles.container}>
    <ActivityIndicator color={tokens.colors.accent} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: tokens.spacing.lg,
  },
});
