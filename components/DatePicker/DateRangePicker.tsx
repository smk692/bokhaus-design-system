/**
 * DateRangePicker Component - 손밀리 디자인 시스템
 * BOKHAUS 시니어 UX 최적화
 * 
 * 날짜 범위 선택 (시작일~종료일)
 * 
 * TODO: Phase 6에서 캘린더 로직 완성
 */

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { customSpacing } from '../../build/react-native/theme';
import { Typography } from '../Typography/Typography';
import { DatePicker } from './DatePicker';

export interface DateRangePickerProps {
  /**
   * 시작 날짜
   */
  startDate: Date | null;
  
  /**
   * 종료 날짜
   */
  endDate: Date | null;
  
  /**
   * 변경 핸들러
   */
  onChange: (range: { start: Date | null; end: Date | null }) => void;
  
  /**
   * 레이블
   */
  label: string;
  
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
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onChange,
  label,
  minDate,
  maxDate,
  disabled = false,
  errorText,
  helperText,
}) => {
  const handleStartChange = (date: Date | null) => {
    onChange({ start: date, end: endDate });
  };

  const handleEndChange = (date: Date | null) => {
    onChange({ start: startDate, end: date });
  };

  return (
    <View style={styles.container}>
      <Typography variant="body" color="primary" weight="semibold" style={styles.label}>
        {label}
      </Typography>

      <View style={styles.row}>
        <View style={styles.datePickerContainer}>
          <DatePicker
            label="시작일"
            value={startDate}
            onChange={handleStartChange}
            minDate={minDate}
            maxDate={endDate || maxDate}
            disabled={disabled}
          />
        </View>

        <Typography variant="heading2" style={styles.separator}>
          ~
        </Typography>

        <View style={styles.datePickerContainer}>
          <DatePicker
            label="종료일"
            value={endDate}
            onChange={handleEndChange}
            minDate={startDate || minDate}
            maxDate={maxDate}
            disabled={disabled}
          />
        </View>
      </View>

      {(helperText || errorText) && (
        <Typography
          variant="caption"
          color={errorText ? 'error' : 'secondary'}
          style={styles.helperText}
        >
          {errorText || helperText}
        </Typography>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  datePickerContainer: {
    flex: 1,
  },
  separator: {
    marginTop: 24, // 레이블 높이 보정
  },
  helperText: {
    marginTop: 4,
    marginLeft: 12,
  },
});

export default DateRangePicker;
