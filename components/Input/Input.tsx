/**
 * Input Component - 손밀리 디자인 시스템
 * BOKHAUS 시니어 UX 최적화
 */

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput as PaperTextInput, HelperText, TextInputProps as PaperTextInputProps } from 'react-native-paper';
import { customSpacing, customTypography, customColors } from '../../build/react-native/theme';
import Typography from '../Typography/Typography';

export interface InputProps extends Omit<PaperTextInputProps, 'mode' | 'error' | 'ref'> {
  /**
   * 레이블 (필수 - 항상 상단 표시)
   */
  label: string;
  
  /**
   * 플레이스홀더 (선택)
   */
  placeholder?: string;
  
  /**
   * Helper 텍스트 (설명)
   */
  helperText?: string;
  
  /**
   * 에러 메시지
   */
  errorText?: string;
  
  /**
   * 필수 항목 여부
   * @default false
   */
  required?: boolean;
  
  /**
   * 비활성 상태
   * @default false
   */
  disabled?: boolean;
  
  /**
   * 입력값
   */
  value?: string;
  
  /**
   * 변경 핸들러
   */
  onChangeText?: (text: string) => void;
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  helperText,
  errorText,
  required = false,
  disabled = false,
  value,
  onChangeText,
  style,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasError = Boolean(errorText);

  // 레이블에 필수 표시 추가
  const displayLabel = required ? `${label} *` : label;

  return (
    <View style={[styles.container, style]}>
      {/* 레이블 (항상 상단 표시) */}
      <Typography 
        variant="body" 
        color={hasError ? 'error' : disabled ? 'disabled' : 'primary'}
        style={styles.label}
      >
        {displayLabel}
      </Typography>

      {/* 입력 필드 */}
      <PaperTextInput
        mode="outlined"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        disabled={disabled}
        error={hasError}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={[
          styles.input,
          disabled && styles.inputDisabled,
        ]}
        contentStyle={styles.inputContent}
        outlineStyle={[
          styles.inputOutline,
          hasError && styles.inputOutlineError,
          isFocused && !hasError && styles.inputOutlineFocused,
        ]}
        {...props}
      />

      {/* Helper 텍스트 또는 에러 메시지 */}
      {(helperText || hasError) && (
        <HelperText 
          type={hasError ? 'error' : 'info'}
          visible={true}
          style={styles.helperText}
        >
          {errorText || helperText}
        </HelperText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  label: {
    marginBottom: 8,
    fontSize: customTypography.typographyFontSizeBody, // 16px
    fontWeight: '600' as const, // semibold
  },
  input: {
    backgroundColor: customColors.colorSurface, // #FFFFFF
  },
  inputContent: {
    minHeight: customSpacing.spacingInputHeight, // 56px (CPO 요구사항)
    fontSize: customTypography.typographyFontSizeBody, // 16px
    paddingVertical: 16,
  },
  inputOutline: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: customColors.colorNeutralMid, // #616161
  },
  inputOutlineError: {
    borderColor: customColors.colorError, // #C62828
    borderWidth: 2,
  },
  inputOutlineFocused: {
    borderColor: customColors.colorPrimaryDefault, // #1565C0
    borderWidth: 2,
  },
  inputDisabled: {
    opacity: 0.6,
  },
  helperText: {
    marginTop: 4,
    fontSize: customTypography.typographyFontSizeCaption, // 14px
  },
});

export default Input;
