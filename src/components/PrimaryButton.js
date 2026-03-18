import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import theme from '../theme';

export default function PrimaryButton({ title, onPress, style, disabled }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.button, disabled && styles.disabled, style]}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.scale(12),
    paddingHorizontal: theme.scale(16),
    borderRadius: theme.radius,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadow,
  },
  text: { color: '#fff', fontWeight: '600', fontSize: theme.scale(16) },
  disabled: { opacity: 0.6 },
});
