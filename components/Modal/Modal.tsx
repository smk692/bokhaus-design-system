/**
 * Modal/Dialog Component - 손밀리 디자인 시스템
 * BOKHAUS 시니어 UX 최적화
 *
 * React Native Paper의 Modal + Portal을 감싼 컴포넌트
 * 시니어 친화: 큰 버튼, 명확한 액션, 배경 클릭 비활성 옵션
 */

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Modal as PaperModal, Portal, Divider } from 'react-native-paper';
import { customColors, customSpacing, customTypography } from '../../build/react-native/theme';
import { Typography } from '../Typography/Typography';
import { Button } from '../Button/Button';

export type ModalVariant = 'alert' | 'confirm' | 'custom';

export interface ModalAction {
  label: string;
  onPress: () => void;
  variant?: 'filled' | 'outlined' | 'text';
  /** 위험/파괴적 액션 (빨간 스타일) */
  destructive?: boolean;
}

export interface ModalProps {
  /**
   * 모달 표시 여부
   */
  visible: boolean;

  /**
   * 닫기 핸들러 (배경 클릭 또는 취소)
   */
  onDismiss: () => void;

  /**
   * 모달 타입
   * - alert: 확인 버튼 1개 (정보 전달)
   * - confirm: 확인 + 취소 버튼 (결정 요구)
   * - custom: 자유 구성 (actions 배열 사용)
   * @default 'alert'
   */
  variant?: ModalVariant;

  /**
   * 제목
   */
  title?: string;

  /**
   * 본문 텍스트 (string 또는 ReactNode)
   */
  content?: React.ReactNode;

  /**
   * 확인 버튼 레이블 (alert/confirm)
   * @default '확인'
   */
  confirmLabel?: string;

  /**
   * 확인 버튼 핸들러
   */
  onConfirm?: () => void;

  /**
   * 취소 버튼 레이블 (confirm)
   * @default '취소'
   */
  cancelLabel?: string;

  /**
   * 취소 버튼 핸들러 (기본: onDismiss)
   */
  onCancel?: () => void;

  /**
   * 커스텀 액션 버튼 배열 (variant="custom")
   */
  actions?: ModalAction[];

  /**
   * 배경 클릭으로 닫기 허용 여부
   * 시니어 UX: false 권장 (실수 방지)
   * @default false
   */
  dismissable?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  onDismiss,
  variant = 'alert',
  title,
  content,
  confirmLabel = '확인',
  onConfirm,
  cancelLabel = '취소',
  onCancel,
  actions,
  dismissable = false,
}) => {
  const handleCancel = onCancel || onDismiss;

  const renderActions = () => {
    if (variant === 'custom' && actions) {
      return actions.map((action, index) => (
        <Button
          key={index}
          variant={action.variant || 'filled'}
          size="large"
          onPress={action.onPress}
          style={[
            styles.actionButton,
            action.destructive && styles.destructiveButton,
          ]}
        >
          {action.label}
        </Button>
      ));
    }

    if (variant === 'confirm') {
      return (
        <>
          <Button
            variant="outlined"
            size="large"
            onPress={handleCancel}
            style={styles.actionButton}
          >
            {cancelLabel}
          </Button>
          <Button
            variant="filled"
            size="large"
            onPress={onConfirm || onDismiss}
            style={styles.actionButton}
          >
            {confirmLabel}
          </Button>
        </>
      );
    }

    // alert (기본)
    return (
      <Button
        variant="filled"
        size="large"
        onPress={onConfirm || onDismiss}
        style={[styles.actionButton, styles.fullWidthButton]}
      >
        {confirmLabel}
      </Button>
    );
  };

  return (
    <Portal>
      <PaperModal
        visible={visible}
        onDismiss={dismissable ? onDismiss : undefined}
        contentContainerStyle={styles.container}
      >
        {/* 제목 */}
        {title && (
          <>
            <View style={styles.header}>
              <Typography variant="heading2" weight="bold" align="center">
                {title}
              </Typography>
            </View>
            <Divider />
          </>
        )}

        {/* 본문 */}
        <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
          {typeof content === 'string' ? (
            <Typography variant="bodyLarge" align="center" color="secondary">
              {content}
            </Typography>
          ) : (
            content
          )}
        </ScrollView>

        {/* 액션 버튼 */}
        <Divider />
        <View style={[
          styles.footer,
          variant === 'confirm' && styles.footerRow,
        ]}>
          {renderActions()}
        </View>
      </PaperModal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: customColors.colorNeutralWhite,
    borderRadius: 16,
    marginHorizontal: 24,
    maxHeight: '80%',
    overflow: 'hidden',
  },
  header: {
    padding: customSpacing.spacingSection,     // 20px
    paddingBottom: customSpacing.spacingGap,   // 12px
  },
  body: {
    maxHeight: 300,
  },
  bodyContent: {
    paddingHorizontal: customSpacing.spacingSection,
    paddingVertical: customSpacing.spacingGap,
  },
  footer: {
    padding: customSpacing.spacingSection,
    gap: customSpacing.spacingGap,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: customSpacing.spacingGap,
  },
  actionButton: {
    flex: 1,
  },
  fullWidthButton: {
    width: '100%',
  },
  destructiveButton: {
    backgroundColor: customColors.colorError,
  },
});

export default Modal;
