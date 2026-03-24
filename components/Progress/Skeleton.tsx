/**
 * Skeleton Component - 손밀리 디자인 시스템
 * BOKHAUS 시니어 UX 최적화
 * 
 * 콘텐츠 로딩 스켈레톤
 */

import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, ViewStyle } from 'react-native';
import { customColors } from '../../build/react-native/theme';

type SkeletonVariant = 'text' | 'circular' | 'rectangular';

interface SkeletonBaseProps {
  /**
   * 너비
   */
  width?: number | string;
  
  /**
   * 높이
   */
  height?: number;
  
  /**
   * 애니메이션 (shimmer 효과)
   * @default true
   */
  animated?: boolean;
}

interface SkeletonTextProps extends SkeletonBaseProps {
  variant: 'text';
  /**
   * 줄 수 (text variant만)
   */
  lines?: number;
}

interface SkeletonCircularProps extends SkeletonBaseProps {
  variant: 'circular';
}

interface SkeletonRectangularProps extends SkeletonBaseProps {
  variant: 'rectangular';
}

export type SkeletonProps = SkeletonTextProps | SkeletonCircularProps | SkeletonRectangularProps;

export const Skeleton: React.FC<SkeletonProps> = ({
  variant,
  width,
  height,
  animated = true,
  ...props
}) => {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!animated) return;

    const shimmer = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 750,
          useNativeDriver: true,
        }),
      ])
    );

    shimmer.start();

    return () => shimmer.stop();
  }, [animated, opacity]);

  const getStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      backgroundColor: customColors.colorNeutralLight,
      width: width || ('100%' as any),
      height: height || 16,
    };

    switch (variant) {
      case 'text':
        return {
          ...baseStyle,
          height: height || 16,
          borderRadius: 4,
        };
      case 'circular':
        const circularSize = typeof width === 'number' ? width : height || 40;
        return {
          ...baseStyle,
          width: circularSize,
          height: circularSize,
          borderRadius: circularSize / 2,
        };
      case 'rectangular':
        return {
          ...baseStyle,
          borderRadius: 8,
        };
    }
  };

  const renderSkeleton = () => {
    if (variant === 'text' && 'lines' in props && props.lines && props.lines > 1) {
      return (
        <View>
          {Array.from({ length: props.lines }).map((_, index) => (
            <Animated.View
              key={index}
              style={[
                getStyle(),
                { opacity },
                index < props.lines! - 1 && styles.lineSpacing,
                index === props.lines! - 1 && { width: '80%' }, // 마지막 줄 짧게
              ]}
              accessibilityLabel="콘텐츠 불러오는 중"
              importantForAccessibility="yes"
            />
          ))}
        </View>
      );
    }

    return (
      <Animated.View
        style={[getStyle(), { opacity }]}
        accessibilityLabel="콘텐츠 불러오는 중"
        importantForAccessibility="yes"
      />
    );
  };

  return <>{renderSkeleton()}</>;
};

const styles = StyleSheet.create({
  lineSpacing: {
    marginBottom: 8,
  },
});

export default Skeleton;
