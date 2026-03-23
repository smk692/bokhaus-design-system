/**
 * Typography Storybook Stories
 */

import React from 'react';
import { View } from 'react-native';
import Typography from './Typography';

export default {
  title: 'Components/Typography',
  component: Typography,
  decorators: [
    (Story: React.FC) => (
      <View style={{ padding: 16, gap: 16 }}>
        <Story />
      </View>
    ),
  ],
};

export const AllVariants = () => (
  <>
    <Typography variant="display">Display (32px) - 메인 타이틀</Typography>
    <Typography variant="heading1">Heading 1 (28px) - 페이지 제목</Typography>
    <Typography variant="heading2">Heading 2 (24px) - 섹션 제목</Typography>
    <Typography variant="heading3">Heading 3 (20px) - 서브 섹션</Typography>
    <Typography variant="bodyLarge">Body Large (18px) - 중요 본문 (시니어 권장)</Typography>
    <Typography variant="body">Body (16px) - 일반 본문 (최소값)</Typography>
    <Typography variant="caption">Caption (14px) - 부가 정보</Typography>
    <Typography variant="button">Button (16px) - 버튼 레이블</Typography>
  </>
);

export const Colors = () => (
  <>
    <Typography color="primary">Primary (#212121)</Typography>
    <Typography color="secondary">Secondary (#616161)</Typography>
    <Typography color="disabled">Disabled (#9E9E9E)</Typography>
    <Typography color="error">Error (#C62828)</Typography>
    <Typography color="success">Success (#2E7D32)</Typography>
    <Typography color="warning">Warning (#E65100)</Typography>
  </>
);

export const Weights = () => (
  <>
    <Typography weight="regular">Regular (400)</Typography>
    <Typography weight="semibold">Semibold (600)</Typography>
    <Typography weight="bold">Bold (700)</Typography>
  </>
);

export const Alignment = () => (
  <>
    <Typography align="left">왼쪽 정렬 (기본)</Typography>
    <Typography align="center">중앙 정렬</Typography>
    <Typography align="right">오른쪽 정렬</Typography>
  </>
);

export const SeniorFriendly = () => (
  <View style={{ gap: 16 }}>
    <Typography variant="display">
      손밀리 기업 디자인 시스템
    </Typography>
    <Typography variant="bodyLarge" color="secondary">
      시니어 친화 타이포그래피 체계입니다.
      본문은 최소 16px, 권장 18px 크기로 가독성을 높였습니다.
    </Typography>
    <Typography variant="body">
      Noto Sans KR 폰트를 사용하여 한글 가독성을 최적화했습니다.
      줄간격은 1.6배로 설정하여 시니어 사용자도 편안하게 읽을 수 있습니다.
    </Typography>
  </View>
);

export const BOKHAUSExample = () => (
  <View style={{ gap: 16, padding: 16 }}>
    <Typography variant="heading1">건강 체크</Typography>
    <Typography variant="bodyLarge" color="secondary">
      오늘의 건강 상태를 기록해주세요
    </Typography>
    
    <View style={{ marginTop: 24 }}>
      <Typography variant="heading3">혈압</Typography>
      <Typography variant="body">120/80 mmHg</Typography>
      <Typography variant="caption" color="success">
        정상 범위입니다
      </Typography>
    </View>
    
    <View style={{ marginTop: 16 }}>
      <Typography variant="heading3">혈당</Typography>
      <Typography variant="body">95 mg/dL</Typography>
      <Typography variant="caption" color="success">
        정상 범위입니다
      </Typography>
    </View>
  </View>
);
