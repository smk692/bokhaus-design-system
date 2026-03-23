/**
 * Form Components Stories — Checkbox, RadioGroup, Switch
 */

import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Checkbox, RadioGroup, Switch } from './Form';
import { Typography } from '../Typography/Typography';

export default {
  title: 'Components/Form',
  decorators: [
    (Story: React.FC) => (
      <PaperProvider>
        <ScrollView>
          <View style={styles.container}>
            <Story />
          </View>
        </ScrollView>
      </PaperProvider>
    ),
  ],
};

// Checkbox (BOKHAUS 동의 화면)
export const CheckboxStory = () => {
  const [agreed1, setAgreed1] = useState(false);
  const [agreed2, setAgreed2] = useState(false);
  const [agreed3, setAgreed3] = useState(false);

  return (
    <View style={styles.section}>
      <Typography variant="heading3" style={styles.sectionTitle}>이용 동의</Typography>
      <Checkbox
        label="서비스 이용약관 동의 (필수)"
        checked={agreed1}
        onChange={setAgreed1}
      />
      <Checkbox
        label="개인정보 처리방침 동의 (필수)"
        checked={agreed2}
        onChange={setAgreed2}
      />
      <Checkbox
        label="건강정보 수집 및 활용 동의 (선택)"
        checked={agreed3}
        onChange={setAgreed3}
      />
      <Checkbox
        label="비활성 항목 (예시)"
        checked={false}
        onChange={() => {}}
        disabled
      />
      <Checkbox
        label="에러 상태 항목"
        checked={false}
        onChange={() => {}}
        error
        errorText="반드시 동의가 필요합니다"
      />
    </View>
  );
};

// RadioGroup (알림 설정)
export const RadioGroupStory = () => {
  const [frequency, setFrequency] = useState('daily');
  const [reportDay, setReportDay] = useState('monday');

  return (
    <View style={styles.section}>
      <Typography variant="heading3" style={styles.sectionTitle}>알림 주기</Typography>
      <RadioGroup
        label="측정 알림"
        options={[
          { label: '매일', value: 'daily' },
          { label: '주간', value: 'weekly' },
          { label: '비활성', value: 'disabled', disabled: true },
        ]}
        value={frequency}
        onChange={setFrequency}
      />

      <Typography variant="heading3" style={[styles.sectionTitle, { marginTop: 24 }]}>가로 배치</Typography>
      <RadioGroup
        label="주간 보고 요일"
        options={[
          { label: '월', value: 'monday' },
          { label: '화', value: 'tuesday' },
          { label: '수', value: 'wednesday' },
          { label: '목', value: 'thursday' },
          { label: '금', value: 'friday' },
        ]}
        value={reportDay}
        onChange={setReportDay}
        horizontal
      />
    </View>
  );
};

// Switch (설정 화면)
export const SwitchStory = () => {
  const [medication, setMedication] = useState(true);
  const [bp, setBp] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={styles.section}>
      <Typography variant="heading3" style={styles.sectionTitle}>알림 설정</Typography>
      <Switch
        label="복약 알림"
        description="매일 오전 8시"
        value={medication}
        onValueChange={setMedication}
      />
      <Switch
        label="혈압 측정 알림"
        description="매일 오전 7시 30분"
        value={bp}
        onValueChange={setBp}
      />
      <Switch
        label="다크 모드"
        value={darkMode}
        onValueChange={setDarkMode}
      />
      <Switch
        label="비활성 항목"
        description="현재 사용 불가"
        value={false}
        onValueChange={() => {}}
        disabled
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#FAFAFA',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 12,
  },
});
