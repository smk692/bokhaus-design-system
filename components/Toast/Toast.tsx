/**
 * Toast Component - 손밀리 디자인 시스템
 * BOKHAUS 시니어 UX 최적화
 * 
 * React Native Paper의 Snackbar를 감싼 컴포넌트
 */

import React from 'react';
import { StyleSheet, View, AccessibilityInfo } from 'react-native';
import { Snackbar, SnackbarProps } from 'react-native-paper';
import { customColors, customTypography } from '../../build/react-native/theme';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps extends Omit<SnackbarProps, 'visible' | 'onDismiss' | 'children'> {
  /**
   * Toast 타입
   * - success: 성공 메시지
   * - error: 오류 메시지
   * - warning: 경고 메시지
   * - info: 정보 메시지
   * @default 'info'
   */
  type?: ToastType;
  
  /**
   * 메시지 텍스트
   */
  message: string;
  
  /**
   * 표시 여부
   */
  visible: boolean;
  
  /**
   * 닫기 핸들러
   */
  onDismiss: () => void;
  
  /**
   * 표시 시간 (ms)
   * @default 3000 (최소 3초 - CPO 요구사항)
   */
  duration?: number;
  
  /**
   * 액션 버튼 레이블 (선택)
   */
  actionLabel?: string;
  
  /**
   * 액션 버튼 핸들러
   */
  onActionPress?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  type = 'info',
  message,
  visible,
  onDismiss,
  duration = 3000, // CPO 요구사항: 최소 3초
  actionLabel,
  onActionPress,
  style,
  ...props
}) => {
  // 타입별 스타일
  const toastStyle = getToastStyle(type);
  
  // 아이콘 (CPO 요구사항: 아이콘 + 텍스트 병행)
  const icon = getToastIcon(type);
  
  // 접근성: 에러는 assertive(즉시), 나머지는 polite(대기)
  const liveRegion = type === 'error' ? 'assertive' : 'polite';
  // 접근성: 스크린리더용 레이블 (아이콘 제외)
  const a11yLabel = `${getToastTypeLabel(type)}: ${message}`;

  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismiss}
      duration={duration}
      action={actionLabel ? {
        label: actionLabel,
        onPress: onActionPress || onDismiss,
      } : undefined}
      style={[styles.toast, toastStyle, style]}
      wrapperStyle={styles.wrapper}
      // WCAG 4.1.3: 상태 메시지는 스크린리더에 자동 전달
      accessibilityRole="alert"
      accessibilityLiveRegion={liveRegion}
      accessibilityLabel={a11yLabel}
      {...props}
    >
      {`${icon} ${message}`}
    </Snackbar>
  );
};

// 타입별 배경색
function getToastStyle(type: ToastType) {
  switch (type) {
    case 'success':
      return { backgroundColor: customColors.colorSuccess }; // #2E7D32
    case 'error':
      return { backgroundColor: customColors.colorError }; // #C62828
    case 'warning':
      return { backgroundColor: customColors.colorWarningDefault }; // #E65100
    case 'info':
      return { backgroundColor: customColors.colorPrimaryDefault }; // #1565C0
  }
}

// 타입별 스크린리더 레이블 (접근성)
function getToastTypeLabel(type: ToastType): string {
  switch (type) {
    case 'success': return '성공';
    case 'error':   return '오류';
    case 'warning': return '경고';
    case 'info':    return '알림';
  }
}

// 타입별 아이콘 (CPO 요구사항: 아이콘 + 텍스트)
function getToastIcon(type: ToastType): string {
  switch (type) {
    case 'success':
      return '✓'; // Check mark
    case 'error':
      return '✕'; // X mark
    case 'warning':
      return '⚠'; // Warning
    case 'info':
      return 'ℹ'; // Info
  }
}

const styles = StyleSheet.create({
  toast: {
    borderRadius: 8,
    minHeight: 56, // 시니어 UX
  },
  wrapper: {
    // CPO 요구사항: 화면 하단 고정 (bottom safe area 고려)
    bottom: 16,
  },
});

export default Toast;
