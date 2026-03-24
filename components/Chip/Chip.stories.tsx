import React, { useState } from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from './Chip';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  argTypes: {
    variant: {
      control: 'select',
      options: ['filter', 'input', 'suggestion'],
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'error'],
    },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, flexDirection: 'row', flexWrap: 'wrap', backgroundColor: '#f5f5f5' }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Chip>;

/**
 * 기본 Chip (filter variant)
 */
export const Default: Story = {
  args: {
    label: '카테고리',
    variant: 'filter',
  },
};

/**
 * Filter Chip — 선택 가능
 */
export const FilterChips: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(['운동']);

    const categories = ['전체', '운동', '식사', '약', '일정', '건강'];

    return (
      <>
        {categories.map((category) => (
          <Chip
            key={category}
            label={category}
            variant="filter"
            selected={selected.includes(category)}
            onPress={() => {
              setSelected((prev) =>
                prev.includes(category)
                  ? prev.filter((c) => c !== category)
                  : [...prev, category]
              );
            }}
          />
        ))}
      </>
    );
  },
};

/**
 * Input Chip — 삭제 버튼 포함
 */
export const InputChips: Story = {
  render: () => {
    const [tags, setTags] = useState(['홍길동', '김철수', '이영희']);

    return (
      <>
        {tags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            variant="input"
            onDelete={() => setTags((prev) => prev.filter((t) => t !== tag))}
          />
        ))}
      </>
    );
  },
};

/**
 * Suggestion Chip — 추천 태그
 */
export const SuggestionChips: Story = {
  render: () => {
    const suggestions = ['혈압 측정', '약 복용', '산책 가기', '물 마시기'];

    return (
      <>
        {suggestions.map((suggestion) => (
          <Chip
            key={suggestion}
            label={suggestion}
            variant="suggestion"
            onPress={() => console.log('추천:', suggestion)}
          />
        ))}
      </>
    );
  },
};

/**
 * 아이콘 포함
 */
export const WithIcon: Story = {
  render: () => (
    <>
      <Chip label="홈" icon="home" variant="filter" />
      <Chip label="알림" icon="bell" variant="filter" selected />
      <Chip label="설정" icon="cog" variant="filter" />
    </>
  ),
};

/**
 * 색상 변형
 */
export const ColorVariants: Story = {
  render: () => (
    <>
      <Chip label="기본" variant="filter" selected color="default" />
      <Chip label="Primary" variant="filter" selected color="primary" />
      <Chip label="Success" variant="filter" selected color="success" />
      <Chip label="Warning" variant="filter" selected color="warning" />
      <Chip label="Error" variant="filter" selected color="error" />
    </>
  ),
};

/**
 * 비활성 상태
 */
export const Disabled: Story = {
  render: () => (
    <>
      <Chip label="비활성" variant="filter" disabled />
      <Chip label="선택 비활성" variant="filter" selected disabled />
    </>
  ),
};

/**
 * BOKHAUS AI 태그
 */
export const BOKHAUSAITags: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(['건강 조언']);

    const aiFeatures = ['건강 조언', '약 알림', '운동 추천', '식단 제안', '긴급 전화'];

    return (
      <>
        {aiFeatures.map((feature) => (
          <Chip
            key={feature}
            label={feature}
            variant="filter"
            selected={selected.includes(feature)}
            color="primary"
            onPress={() => {
              setSelected((prev) =>
                prev.includes(feature)
                  ? prev.filter((f) => f !== feature)
                  : [...prev, feature]
              );
            }}
          />
        ))}
      </>
    );
  },
};
