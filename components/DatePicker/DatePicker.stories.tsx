import React, { useState } from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './DatePicker';
import { DateRangePicker } from './DateRangePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: '#fff' }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

/**
 * 기본 DatePicker — 날짜만
 */
export const DateOnly: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);

    return (
      <DatePicker
        label="출생일"
        value={date}
        onChange={setDate}
        placeholder="생년월일을 선택하세요"
        helperText="YYYY년 MM월 DD일 형식"
      />
    );
  },
};

/**
 * Time Picker — 시간만
 */
export const TimeOnly: Story = {
  render: () => {
    const [time, setTime] = useState<Date | null>(null);

    return (
      <DatePicker
        variant="time"
        label="알림 시간"
        value={time}
        onChange={setTime}
        placeholder="시간을 선택하세요"
      />
    );
  },
};

/**
 * DateTime Picker — 날짜 + 시간
 */
export const DateTime: Story = {
  render: () => {
    const [datetime, setDatetime] = useState<Date | null>(null);

    return (
      <DatePicker
        variant="datetime"
        label="일정 시작"
        value={datetime}
        onChange={setDatetime}
        placeholder="날짜와 시간을 선택하세요"
      />
    );
  },
};

/**
 * DateRangePicker — 기간 선택
 */
export const DateRange: Story = {
  render: () => {
    const [range, setRange] = useState<{ start: Date | null; end: Date | null }>({
      start: null,
      end: null,
    });

    return (
      <DateRangePicker
        label="휴가 기간"
        startDate={range.start}
        endDate={range.end}
        onChange={setRange}
        helperText="출퇴근 기록 조회 기간"
      />
    );
  },
};

/**
 * 에러 상태
 */
export const WithError: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);

    return (
      <DatePicker
        label="시작일"
        value={date}
        onChange={setDate}
        errorText="종료일보다 이전 날짜를 선택하세요"
      />
    );
  },
};

/**
 * 비활성 상태
 */
export const Disabled: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(new Date());

    return (
      <DatePicker
        label="등록일"
        value={date}
        onChange={setDate}
        disabled
        helperText="수정할 수 없습니다"
      />
    );
  },
};

/**
 * BOKHAUS 출퇴근 기간 선택
 */
export const BOKHAUSAttendance: Story = {
  render: () => {
    const [range, setRange] = useState<{ start: Date | null; end: Date | null }>({
      start: new Date(2026, 2, 1), // 2026-03-01
      end: new Date(2026, 2, 31),   // 2026-03-31
    });

    return (
      <DateRangePicker
        label="출퇴근 기록 조회"
        startDate={range.start}
        endDate={range.end}
        onChange={setRange}
        helperText="최대 3개월까지 조회 가능"
      />
    );
  },
};
