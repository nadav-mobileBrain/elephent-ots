import React, { useEffect } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  withSequence, 
  withTiming, 
  withRepeat, 
  withDelay,
  useSharedValue,
  cancelAnimation,
  Easing
} from 'react-native-reanimated';
import { Leaf } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface LeafProps {
  delay?: number;
  duration?: number;
  size?: number;
}

export default function LeafAnimation({ 
  delay = 0, 
  duration = 3000,
  size = 24 
}: LeafProps) {
  const { width, height } = useWindowDimensions();
  const translateY = useSharedValue(-50);
  const translateX = useSharedValue(Math.random() * width);
  const rotate = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    const startAnimation = () => {
      translateY.value = withDelay(
        delay,
        withSequence(
          withTiming(-50, { duration: 0 }),
          withTiming(height + 50, {
            duration,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
          })
        )
      );

      rotate.value = withDelay(
        delay,
        withRepeat(
          withTiming(360, {
            duration: duration * 0.8,
            easing: Easing.linear,
          }),
          -1
        )
      );

      translateX.value = withDelay(
        delay,
        withRepeat(
          withSequence(
            withTiming(translateX.value + 50, {
              duration: duration * 0.2,
              easing: Easing.bezier(0.4, 0, 0.2, 1),
            }),
            withTiming(translateX.value - 50, {
              duration: duration * 0.2,
              easing: Easing.bezier(0.4, 0, 0.2, 1),
            })
          ),
          -1,
          true
        )
      );

      scale.value = withDelay(
        delay,
        withRepeat(
          withSequence(
            withTiming(1.2, { duration: duration * 0.2 }),
            withTiming(1, { duration: duration * 0.2 })
          ),
          -1,
          true
        )
      );
    };

    startAnimation();

    return () => {
      cancelAnimation(translateY);
      cancelAnimation(rotate);
      cancelAnimation(translateX);
      cancelAnimation(scale);
    };
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { translateX: translateX.value },
      { rotate: `${rotate.value}deg` },
      { scale: scale.value }
    ],
  }));

  return (
    <Animated.View style={[styles.leaf, animatedStyle]}>
      <Leaf size={size} color={Colors.primary} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  leaf: {
    position: 'absolute',
    opacity: 0.6,
  },
});