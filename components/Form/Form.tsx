/**
 * Form Components - 손밀리 디자인 시스템
 * Checkbox, Radio, Switch (Toggle)
 * BOKHAUS 시니어 UX 최적화
 *
 * 공통 원칙:
 * - 터치 영역 최소 48×48px (WCAG)
 * - 레이블 항상 표시 (시니어: 아이콘만으론 부족)
 * - 명확한 선택/해제 상태 표현
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import {
  Checkbox as PaperCheckbox,
  RadioButton,
  Switch as PaperSwitch,
} from 'react-native-paper';
import { customColors, customSpacing, customTypography } from '../../build/react-native/theme';
import { Typography } from '../Typography/Typography';

// ─────────────────────────────────────────────
// Checkbox
// ─────────────────────────────────────────────

export interface CheckboxProps {
  /**
   * 체크박스 레이블 (필수 — 시니어 접근성)
   */
  label: string;

  /**
   * 선택 여부
   */
  checked: boolean;

  /**
   * 변경 핸들러
   */
  onChange: (checked: boolean) => void;

  /**
   * 비활성 상태
   */
  disabled?: boolean;

  /**
   * 에러 상태
   */
  error?: boolean;

  /**
   * 에러 메시지
   */
  errorText?: string;

  style?: ViewStyle;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  disabled = false,
  error = false,
  errorText,
  style,
}) => {
  const handlePress = () => {
    if (!disabled) onChange(!checked);
  };

  return (
    <View style={[style]}>
      <TouchableOpacity
        style={styles.formRow}
        onPress={handlePress}
        disabled={disabled}
        activeOpacity={0.7}
        accessibilityRole="checkbox"
        accessibilityState={{ checked, disabled }}
        accessibilityLabel={label}
      >
        <PaperCheckbox.Android
          status={checked ? 'checked' : 'unchecked'}
          onPress={handlePress}
          disabled={disabled}
          color={error ? customColors.colorError : customColors.colorPrimaryDefault}
        />
        <Typography
          variant="bodyLarge"
          color={disabled ? 'disabled' : error ? 'error' : 'primary'}
          style={styles.formLabel}
        >
          {label}
        </Typography>
      </TouchableOpacity>
      {error && errorText && (
        <Typography variant="caption" color="error" style={styles.errorText}>
          {errorText}
        </Typography>
      )}
    </View>
  );
};

// ─────────────────────────────────────────────
// RadioGroup + RadioItem
// ─────────────────────────────────────────────

export interface RadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  /**
   * 라디오 그룹 레이블
   */
  label?: string;

  /**
   * 선택지 배열
   */
  options: RadioOption[];

  /**
   * 현재 선택값
   */
  value: string;

  /**
   * 변경 핸들러
   */
  onChange: (value: string) => void;

  /**
   * 에러 상태
   */
  error?: boolean;

  /**
   * 에러 메시지
   */
  errorText?: string;

  /**
   * 가로 배치
   */
  horizontal?: boolean;

  style?: ViewStyle;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  options,
  value,
  onChange,
  error = false,
  errorText,
  horizontal = false,
  style,
}) => {
  return (
    <View style={style}>
      {label && (
        <Typography
          variant="body"
          color={error ? 'error' : 'secondary'}
          style={styles.groupLabel}
        >
          {label}
        </Typography>
      )}
      <RadioButton.Group onValueChange={onChange} value={value}>
        <View style={horizontal ? styles.radioRowHorizontal : styles.radioRowVertical}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={styles.formRow}
              onPress={() => !option.disabled && onChange(option.value)}
              disabled={option.disabled}
              activeOpacity={0.7}
              accessibilityRole="radio"
              accessibilityState={{ checked: value === option.value, disabled: option.disabled }}
              accessibilityLabel={option.label}
            >
              <RadioButton.Android
                value={option.value}
                disabled={option.disabled}
                color={error ? customColors.colorError : customColors.colorPrimaryDefault}
              />
              <Typography
                variant="bodyLarge"
                color={option.disabled ? 'disabled' : error ? 'error' : 'primary'}
                style={styles.formLabel}
              >
                {option.label}
              </Typography>
            </TouchableOpacity>
          ))}
        </View>
      </RadioButton.Group>
      {error && errorText && (
        <Typography variant="caption" color="error" style={styles.errorText}>
          {errorText}
        </Typography>
      )}
    </View>
  );
};

// ─────────────────────────────────────────────
// Switch (Toggle)
// ─────────────────────────────────────────────

export interface SwitchProps {
  /**
   * Switch 레이블 (필수 — 시니어 접근성)
   */
  label: string;

  /**
   * 보조 설명 텍스트
   */
  description?: string;

  /**
   * 켜짐/꺼짐 상태
   */
  value: boolean;

  /**
   * 변경 핸들러
   */
  onValueChange: (value: boolean) => void;

  /**
   * 비활성 상태
   */
  disabled?: boolean;

  style?: ViewStyle;
}

export const Switch: React.FC<SwitchProps> = ({
  label,
  description,
  value,
  onValueChange,
  disabled = false,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.switchRow, style]}
      onPress={() => !disabled && onValueChange(!value)}
      disabled={disabled}
      activeOpacity={0.7}
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled }}
      accessibilityLabel={label}
    >
      <View style={styles.switchTextArea}>
        <Typography
          variant="bodyLarge"
          color={disabled ? 'disabled' : 'primary'}
        >
          {label}
        </Typography>
        {description && (
          <Typography variant="body" color="secondary" style={styles.switchDescription}>
            {description}
          </Typography>
        )}
      </View>
      <PaperSwitch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        color={customColors.colorPrimaryDefault}
      />
    </TouchableOpacity>
  );
};

// ─────────────────────────────────────────────
// Shared Styles
// ─────────────────────────────────────────────

const styles = StyleSheet.create({
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,         // WCAG 최소 터치 영역
    paddingVertical: 4,
  },
  formLabel: {
    flex: 1,
    marginLeft: 8,
  },
  groupLabel: {
    marginBottom: 8,
  },
  radioRowVertical: {
    flexDirection: 'column',
  },
  radioRowHorizontal: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  errorText: {
    marginTop: 4,
    marginLeft: 40,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 56,          // 시니어 UX: 56px
    paddingVertical: 8,
    paddingHorizontal: customSpacing.spacingSection,
  },
  switchTextArea: {
    flex: 1,
    marginRight: 16,
  },
  switchDescription: {
    marginTop: 2,
  },
});
