/**
 * Card Storybook Stories
 */

import React from 'react';
import { View, Text } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import Card from './Card';
import Typography from '../Typography/Typography';
import Button from '../Button/Button';
import theme from '../../build/react-native/theme';

export default {
  title: 'Components/Card',
  component: Card,
  decorators: [
    (Story: React.FC) => (
      <PaperProvider theme={theme}>
        <View style={{ padding: 16, gap: 16, backgroundColor: '#F5F5F5' }}>
          <Story />
        </View>
      </PaperProvider>
    ),
  ],
};

export const Basic = () => (
  <Card>
    <Typography>기본 카드입니다. 패딩 16px, radius 12px, elevation 2.</Typography>
  </Card>
);

export const WithHeader = () => (
  <Card header={<Typography variant="heading3">카드 제목</Typography>}>
    <Typography>헤더가 있는 카드입니다.</Typography>
  </Card>
);

export const WithFooter = () => (
  <Card footer={<Typography variant="caption" color="secondary">2026-03-22</Typography>}>
    <Typography>푸터가 있는 카드입니다.</Typography>
  </Card>
);

export const FullCard = () => (
  <Card 
    header={<Typography variant="heading3">전체 슬롯</Typography>}
    footer={
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Button variant="text">취소</Button>
        <Button variant="filled">확인</Button>
      </View>
    }
  >
    <Typography>헤더, 콘텐츠, 푸터를 모두 사용한 카드입니다.</Typography>
  </Card>
);

export const Touchable = () => (
  <Card 
    touchable 
    onPress={() => alert('Card pressed!')}
  >
    <Typography>터치 가능한 카드입니다. 탭해보세요!</Typography>
  </Card>
);

export const Elevations = () => (
  <>
    <Card elevation="low">
      <Typography>Low Elevation (2)</Typography>
    </Card>
    
    <Card elevation="medium">
      <Typography>Medium Elevation (4)</Typography>
    </Card>
    
    <Card elevation="high">
      <Typography>High Elevation (8)</Typography>
    </Card>
  </>
);

export const BOKHAUSHealthCard = () => (
  <Card 
    header={
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="heading3">오늘의 건강</Typography>
        <Typography variant="caption" color="secondary">2026-03-22</Typography>
      </View>
    }
    footer={
      <Button size="large" fullWidth>상세 보기</Button>
    }
  >
    <View style={{ gap: 16 }}>
      <View>
        <Typography variant="body" color="secondary">혈압</Typography>
        <Typography variant="bodyLarge" weight="semibold">120/80 mmHg</Typography>
        <Typography variant="caption" color="success">정상 범위</Typography>
      </View>
      
      <View>
        <Typography variant="body" color="secondary">혈당</Typography>
        <Typography variant="bodyLarge" weight="semibold">95 mg/dL</Typography>
        <Typography variant="caption" color="success">정상 범위</Typography>
      </View>
    </View>
  </Card>
);

export const BOKHAUSNotificationCard = () => (
  <Card 
    touchable
    onPress={() => alert('알림 상세 보기')}
    elevation="medium"
  >
    <View style={{ gap: 8 }}>
      <Typography variant="body" weight="semibold">복약 알림</Typography>
      <Typography variant="body" color="secondary">
        오전 8시 약 복용 시간입니다.
      </Typography>
      <Typography variant="caption" color="secondary">10분 전</Typography>
    </View>
  </Card>
);

export const BOKHAUSMedicineCard = () => (
  <Card 
    header={
      <Typography variant="heading3">복용 중인 약</Typography>
    }
  >
    <View style={{ gap: 12 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <Typography variant="body" weight="semibold">아스피린 100mg</Typography>
          <Typography variant="caption" color="secondary">하루 1회, 아침 식후</Typography>
        </View>
        <Typography variant="caption" color="success">복용 중</Typography>
      </View>
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <Typography variant="body" weight="semibold">혈압약 (암로디핀)</Typography>
          <Typography variant="caption" color="secondary">하루 1회, 아침</Typography>
        </View>
        <Typography variant="caption" color="success">복용 중</Typography>
      </View>
    </View>
  </Card>
);
