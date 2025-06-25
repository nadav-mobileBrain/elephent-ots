import React, { ReactNode } from 'react';
import { Text, StyleSheet, Pressable, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import Colors from '@/constants/Colors';

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  icon?: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Button({
  onPress,
  title,
  variant = 'primary',
  size = 'medium',
  icon,
  loading = false,
  disabled = false,
  style,
  textStyle,
}: ButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        styles[variant],
        styles[size],
        disabled && styles.disabled,
        pressed && styles.pressed,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {({ pressed }) => (
        <>
          {loading ? (
            <ActivityIndicator 
              color={variant === 'outline' ? Colors.primary : Colors.accent} 
              size="small" 
            />
          ) : (
            <>
              {icon && <span style={{ marginRight: 8 }}>{icon}</span>}
              <Text style={[
                styles.text,
                styles[`${variant}Text`],
                styles[`${size}Text`],
                disabled && styles.disabledText,
                pressed && styles.pressedText,
                textStyle,
              ]}>
                {title}
              </Text>
            </>
          )}
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    elevation: 2,
    shadowColor: Colors.primaryDark,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  primary: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primaryLight,
  },
  secondary: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.tertiary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: Colors.primary,
  },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
    backgroundColor: Colors.primaryDark,
  },
  disabled: {
    backgroundColor: Colors.border,
    borderColor: Colors.border,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  primaryText: {
    color: Colors.accent,
  },
  secondaryText: {
    color: Colors.accent,
  },
  outlineText: {
    color: Colors.primary,
  },
  pressedText: {
    color: '#000000',
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  disabledText: {
    color: Colors.textSecondary,
  },
});