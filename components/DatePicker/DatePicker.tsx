/**
 * DatePicker Component - 손밀리 디자인 시스템
 * BOKHAUS 시니어 UX 최적화
 * 
 * 날짜·시간 선택 — 캘린더 그리드 UI
 */

import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, Platform } from 'react-native';
import { TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { customColors, customSpacing, customTypography } from '../../build/react-native/theme';
import { Typography } from '../Typography/Typography';
import { Button } from '../Button/Button';
import { Calendar } from './Calendar';

export interface DatePickerProps {
  /**
   * 변형
   * - date: 날짜만
   * - time: 시간만
   * - datetime: 날짜 + 시간
   * @default 'date'
   */
  variant?: 'date' | 'time' | 'datetime';
  
  /**
   * 현재 값
   */
  value: Date | null;
  
  /**
   * 변경 핸들러
   */
  onChange: (date: Date | null) => void;
  
  /**
   * 레이블 (필수 — 접근성)
   */
  label: string;
  
  /**
   * 플레이스홀더
   * @default '날짜를 선택하세요'
   */
  placeholder?: string;
  
  /**
   * 최소 날짜
   */
  minDate?: Date;
  
  /**
   * 최대 날짜
   */
  maxDate?: Date;
  
  /**
   * 비활성 상태
   */
  disabled?: boolean;
  
  /**
   * 에러 메시지
   */
  errorText?: string;
  
  /**
   * Helper 텍스트
   */
  helperText?: string;
  
  /**
   * 로케일
   * @default 'ko'
   */
  locale?: 'ko' | 'en';
  
  /**
   * 공휴일 표시
   * @default false
   */
  showHolidays?: boolean;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  variant = 'date',
  value,
  onChange,
  label,
  placeholder = '날짜를 선택하세요',
  minDate,
  maxDate,
  disabled = false,
  errorText,
  helperText,
  locale = 'ko',
  showHolidays = false,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [tempDate, setTempDate] = useState<Date | null>(value);
  const [showNative, setShowNative] = useState(false);

  const formatDate = (date: Date | null): string => {
    if (!date) return '';

    if (locale === 'ko') {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const weekday = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];

      if (variant === 'date') {
        return `${year}년 ${month}월 ${day}일 (${weekday})`;
      }
      if (variant === 'time') {
        const hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const period = hours < 12 ? '오전' : '오후';
        const displayHours = hours % 12 || 12;
        return `${period} ${displayHours}시 ${minutes}분`;
      }
      // datetime
      const hours = date.getHours();
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${year}년 ${month}월 ${day}일 (${weekday}) ${hours}:${minutes}`;
    }

    // English locale
    if (variant === 'time') {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString('en-US');
  };

  const handleConfirm = () => {
    onChange(tempDate);
    setShowPicker(false);
  };

  const handleCancel = () => {
    setTempDate(value);
    setShowPicker(false);
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowNative(false);
      if (event.type === 'set' && selectedDate) {
        setTempDate(selectedDate);
        onChange(selectedDate);
      }
    } else {
      if (selectedDate) {
        setTempDate(selectedDate);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Typography variant="body" color="primary" weight="semibold" style={styles.label}>
        {label}
      </Typography>

      <TouchableOpacity
        onPress={() => {
          if (!disabled) {
            if (variant === 'time' || Platform.OS === 'ios') {
              // iOS는 네이티브 피커, time은 항상 네이티브
              setTempDate(value || new Date());
              setShowNative(true);
            } else {
              // Android date는 커스텀 캘린더
              setTempDate(value || new Date());
              setShowPicker(true);
            }
          }
        }}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={`${label}, ${value ? formatDate(value) : placeholder}`}
        accessibilityHint="날짜 선택기를 엽니다"
      >
        <TextInput
          value={formatDate(value)}
          placeholder={placeholder}
          editable={false}
          mode="outlined"
          disabled={disabled}
          error={Boolean(errorText)}
          right={<TextInput.Icon icon={variant === 'time' ? 'clock' : 'calendar'} disabled={disabled} />}
          style={styles.input}
          pointerEvents="none"
        />
      </TouchableOpacity>

      {(helperText || errorText) && (
        <Typography
          variant="caption"
          color={errorText ? 'error' : 'secondary'}
          style={styles.helperText}
        >
          {errorText || helperText}
        </Typography>
      )}

      {/* 네이티브 DateTimePicker (iOS + time) */}
      {showNative && Platform.OS === 'ios' && (
        <Modal
          visible={showNative}
          transparent
          animationType="slide"
          onRequestClose={() => setShowNative(false)}
        >
          <View style={styles.nativeModalOverlay}>
            <View style={styles.nativeModalContent}>
              <View style={styles.nativeModalHeader}>
                <Button variant="text" onPress={() => setShowNative(false)}>
                  취소
                </Button>
                <Button
                  variant="text"
                  onPress={() => {
                    onChange(tempDate);
                    setShowNative(false);
                  }}
                >
                  완료
                </Button>
              </View>
              <DateTimePicker
                value={tempDate || new Date()}
                mode={variant === 'datetime' ? 'datetime' : variant}
                display="spinner"
                onChange={handleDateChange}
                minimumDate={minDate}
                maximumDate={maxDate}
                locale={locale}
              />
            </View>
          </View>
        </Modal>
      )}

      {/* Android 네이티브 (time only) */}
      {showNative && Platform.OS === 'android' && (
        <DateTimePicker
          value={tempDate || new Date()}
          mode={variant === 'datetime' ? 'datetime' : variant}
          display="default"
          onChange={handleDateChange}
          minimumDate={minDate}
          maximumDate={maxDate}
        />
      )}

      {/* 커스텀 캘린더 Modal (Android date) */}
      {showPicker && variant === 'date' && (
        <Modal
          visible={showPicker}
          transparent
          animationType="slide"
          onRequestClose={handleCancel}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Typography variant="heading2" align="center" style={styles.modalTitle}>
                {label}
              </Typography>

              <Calendar
                selectedDate={tempDate}
                onSelectDate={setTempDate}
                minDate={minDate}
                maxDate={maxDate}
                locale={locale}
              />

              <View style={styles.modalActions}>
                <Button
                  variant="outlined"
                  onPress={handleCancel}
                  fullWidth
                  style={styles.modalButton}
                >
                  취소
                </Button>
                <Button
                  variant="filled"
                  onPress={handleConfirm}
                  fullWidth
                  style={styles.modalButton}
                >
                  선택
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
  },
  input: {
    backgroundColor: customColors.colorNeutralWhite,
  },
  helperText: {
    marginTop: 4,
    marginLeft: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: customColors.colorNeutralWhite,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: customSpacing.spacingSection,
    maxHeight: '80%',
  },
  modalTitle: {
    marginBottom: 24,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  modalButton: {
    flex: 1,
  },
  nativeModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  nativeModalContent: {
    backgroundColor: customColors.colorNeutralWhite,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  nativeModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: customColors.colorNeutralLight,
  },
});

export default DatePicker;
