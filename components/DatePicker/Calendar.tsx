/**
 * Calendar Component - 손밀리 디자인 시스템
 * 
 * 캘린더 그리드 UI (시니어 UX 최적화)
 */

import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { customColors, customSpacing, customTypography } from '../../build/react-native/theme';
import { Typography } from '../Typography/Typography';
import { Button } from '../Button/Button';

interface CalendarProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  locale?: 'ko' | 'en';
}

export const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  onSelectDate,
  minDate,
  maxDate,
  locale = 'ko',
}) => {
  const [currentMonth, setCurrentMonth] = useState(
    selectedDate ? new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1) : new Date()
  );

  const getDaysInMonth = (date: Date): Date[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const days: Date[] = [];
    
    // 이전 달 마지막 날들 (빈 칸 채우기)
    const startDayOfWeek = firstDay.getDay();
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push(prevDate);
    }
    
    // 현재 달 날짜들
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }
    
    // 다음 달 시작 날들 (7일 단위로 맞추기)
    const remainingDays = 7 - (days.length % 7);
    if (remainingDays < 7) {
      for (let i = 1; i <= remainingDays; i++) {
        days.push(new Date(year, month + 1, i));
      }
    }
    
    return days;
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (date: Date): boolean => {
    if (!selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const isCurrentMonth = (date: Date): boolean => {
    return date.getMonth() === currentMonth.getMonth();
  };

  const isDisabled = (date: Date): boolean => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const formatMonthYear = (): string => {
    if (locale === 'ko') {
      return `${currentMonth.getFullYear()}년 ${currentMonth.getMonth() + 1}월`;
    }
    return currentMonth.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  const weekDays = locale === 'ko'
    ? ['일', '월', '화', '수', '목', '금', '토']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const days = getDaysInMonth(currentMonth);
  const weeks: Date[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <View style={styles.container}>
      {/* 월/년 헤더 + 이전/다음 버튼 */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={goToPreviousMonth}
          style={styles.navButton}
          accessibilityLabel="이전 달"
        >
          <Typography variant="heading2" color="primary">
            ‹
          </Typography>
        </TouchableOpacity>

        <Typography variant="heading3" weight="semibold">
          {formatMonthYear()}
        </Typography>

        <TouchableOpacity
          onPress={goToNextMonth}
          style={styles.navButton}
          accessibilityLabel="다음 달"
        >
          <Typography variant="heading2" color="primary">
            ›
          </Typography>
        </TouchableOpacity>
      </View>

      {/* 요일 헤더 */}
      <View style={styles.weekDaysRow}>
        {weekDays.map((day, index) => (
          <View key={index} style={styles.weekDayCell}>
            <Typography
              variant="caption"
              color={index === 0 ? 'error' : index === 6 ? 'primary' : 'secondary'}
              weight="semibold"
            >
              {day}
            </Typography>
          </View>
        ))}
      </View>

      {/* 날짜 그리드 */}
      <ScrollView style={styles.calendarGrid}>
        {weeks.map((week, weekIndex) => (
          <View key={weekIndex} style={styles.weekRow}>
            {week.map((date, dayIndex) => {
              const today = isToday(date);
              const selected = isSelected(date);
              const currentMonthDate = isCurrentMonth(date);
              const disabled = isDisabled(date);
              const sunday = dayIndex === 0;

              return (
                <TouchableOpacity
                  key={dayIndex}
                  style={[
                    styles.dayCell,
                    today && styles.todayCell,
                    selected && styles.selectedCell,
                    disabled && styles.disabledCell,
                  ]}
                  onPress={() => !disabled && onSelectDate(date)}
                  disabled={disabled}
                  accessibilityLabel={`${date.getMonth() + 1}월 ${date.getDate()}일${today ? ', 오늘' : ''}${selected ? ', 선택됨' : ''}`}
                  accessibilityState={{ selected, disabled }}
                >
                  <Typography
                    variant="bodyLarge"
                    weight={selected || today ? 'semibold' : 'regular'}
                    color={
                      disabled
                        ? 'disabled'
                        : selected
                        ? 'primary'
                        : sunday
                        ? 'error'
                        : !currentMonthDate
                        ? 'disabled'
                        : 'primary'
                    }
                    style={styles.dayText}
                  >
                    {date.getDate()}
                  </Typography>
                  {today && !selected && <View style={styles.todayDot} />}
                  {selected && <View style={styles.selectedCheck} />}
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: customColors.colorNeutralWhite,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: customSpacing.spacingSection,
  },
  navButton: {
    padding: 8,
    minWidth: 48,
    minHeight: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weekDaysRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: customColors.colorNeutralLight,
    paddingBottom: 8,
    marginBottom: 8,
  },
  weekDayCell: {
    flex: 1,
    alignItems: 'center',
  },
  calendarGrid: {
    maxHeight: 400,
  },
  weekRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  dayCell: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 28, // 시니어 UX: 큰 터치 영역
    minHeight: 56,
    minWidth: 56,
    position: 'relative',
  },
  todayCell: {
    backgroundColor: customColors.colorPrimaryLight + '20', // 20% opacity
  },
  selectedCell: {
    backgroundColor: customColors.colorPrimaryDefault,
  },
  disabledCell: {
    opacity: 0.3,
  },
  dayText: {
    fontSize: 20, // 시니어 UX: 큰 숫자
  },
  todayDot: {
    position: 'absolute',
    bottom: 8,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: customColors.colorPrimaryDefault,
  },
  selectedCheck: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: customColors.colorNeutralWhite,
  },
});

export default Calendar;
