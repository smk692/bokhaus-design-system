/**
 * List / ListItem Component - 손밀리 디자인 시스템
 * BOKHAUS 시니어 UX 최적화
 *
 * 시니어 친화: 72px 이상 행 높이, 큰 터치 영역, 명확한 구분선
 */

import React from 'react';
import { View, FlatList, StyleSheet, FlatListProps } from 'react-native';
import { List as PaperList, Divider } from 'react-native-paper';
import { customColors, customSpacing, customTypography } from '../../build/react-native/theme';
import { Typography } from '../Typography/Typography';

// ─────────────────────────────────────────────
// ListItem
// ─────────────────────────────────────────────

export interface ListItemProps {
  /**
   * 메인 텍스트 (필수)
   */
  title: string;

  /**
   * 보조 텍스트
   */
  subtitle?: string;

  /**
   * 왼쪽 아이콘 이름 (Material Community Icons)
   */
  leftIcon?: string;

  /**
   * 왼쪽 커스텀 요소 (아바타, 이미지 등)
   */
  leftElement?: React.ReactNode;

  /**
   * 오른쪽 커스텀 요소 (Badge, Switch 등)
   */
  rightElement?: React.ReactNode;

  /**
   * 오른쪽 화살표 표시 (탐색용)
   * @default false
   */
  showChevron?: boolean;

  /**
   * 터치 핸들러 (없으면 비활성)
   */
  onPress?: () => void;

  /**
   * 구분선 표시
   * @default true
   */
  showDivider?: boolean;

  /**
   * 비활성 상태
   */
  disabled?: boolean;
}

export const ListItem: React.FC<ListItemProps> = ({
  title,
  subtitle,
  leftIcon,
  leftElement,
  rightElement,
  showChevron = false,
  onPress,
  showDivider = true,
  disabled = false,
}) => {
  const renderLeft = leftIcon || leftElement
    ? (props: { color: string; style?: any }) => {
        if (leftElement) {
          return <View style={styles.leftElement}>{leftElement}</View>;
        }
        return (
          <PaperList.Icon
            {...props}
            icon={leftIcon!}
            color={disabled ? customColors.colorNeutralMid : customColors.colorPrimaryDefault}
          />
        );
      }
    : undefined;

  const renderRight = (showChevron || rightElement)
    ? (props: { color: string; style?: any }) => {
        if (rightElement) {
          return <View style={styles.rightElement}>{rightElement}</View>;
        }
        return (
          <PaperList.Icon
            {...props}
            icon="chevron-right"
            color={customColors.colorNeutralMid}
          />
        );
      }
    : undefined;

  return (
    <>
      <PaperList.Item
        title={() => (
          <Typography
            variant="bodyLarge"
            weight="regular"
            color={disabled ? 'disabled' : 'primary'}
          >
            {title}
          </Typography>
        )}
        description={
          subtitle
            ? () => (
                <Typography variant="body" color="secondary">
                  {subtitle}
                </Typography>
              )
            : undefined
        }
        left={renderLeft}
        right={renderRight}
        onPress={disabled ? undefined : onPress}
        disabled={disabled}
        style={[styles.item, disabled && styles.itemDisabled]}
        contentStyle={styles.itemContent}
      />
      {showDivider && <Divider style={styles.divider} />}
    </>
  );
};

// ─────────────────────────────────────────────
// List (컨테이너)
// ─────────────────────────────────────────────

export interface ListProps<T> extends Omit<FlatListProps<T>, 'renderItem'> {
  /**
   * 데이터 배열
   */
  data: T[];

  /**
   * 각 아이템 렌더 함수
   */
  renderItem: (item: T, index: number) => React.ReactElement;

  /**
   * 섹션 헤더 텍스트
   */
  sectionTitle?: string;

  /**
   * 빈 목록 표시 텍스트
   * @default '항목이 없습니다'
   */
  emptyText?: string;
}

export function List<T>({
  data,
  renderItem,
  sectionTitle,
  emptyText = '항목이 없습니다',
  style,
  ...props
}: ListProps<T>) {
  return (
    <View style={[styles.container, style as object]}>
      {sectionTitle && (
        <View style={styles.sectionHeader}>
          <Typography variant="heading3" color="secondary" weight="semibold">
            {sectionTitle}
          </Typography>
        </View>
      )}
      <FlatList
        data={data}
        renderItem={({ item, index }) => renderItem(item, index)}
        keyExtractor={(_, index) => String(index)}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Typography variant="body" color="disabled" align="center">
              {emptyText}
            </Typography>
          </View>
        }
        showsVerticalScrollIndicator={false}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: customColors.colorNeutralWhite,
    borderRadius: 12,
    overflow: 'hidden',
  },
  sectionHeader: {
    paddingHorizontal: customSpacing.spacingSection,
    paddingTop: customSpacing.spacingSection,
    paddingBottom: customSpacing.spacingGap,
    backgroundColor: customColors.colorNeutralLight,
  },
  item: {
    minHeight: 72,           // 시니어 UX: 72px 이상 행 높이
    paddingVertical: 12,
    paddingHorizontal: customSpacing.spacingSection,
  },
  itemContent: {
    paddingLeft: 0,
  },
  itemDisabled: {
    opacity: 0.5,
  },
  leftElement: {
    justifyContent: 'center',
    marginRight: 8,
  },
  rightElement: {
    justifyContent: 'center',
    marginLeft: 8,
  },
  divider: {
    marginLeft: customSpacing.spacingSection,
  },
  emptyContainer: {
    padding: customSpacing.spacingSection * 2,
    alignItems: 'center',
  },
});

export default List;
