# 마이그레이션 가이드

> 기존 컴포넌트 → 손밀리 디자인 시스템으로 전환하는 방법

---

## BOKHAUS 앱 마이그레이션

### Before / After 패턴

#### Button
```tsx
// ❌ Before (기존)
<TouchableOpacity style={styles.btn} onPress={onPress}>
  <Text style={styles.btnText}>확인</Text>
</TouchableOpacity>

// ✅ After (디자인 시스템)
<Button variant="filled" size="large" onPress={onPress}>
  확인
</Button>
```

#### 텍스트
```tsx
// ❌ Before
<Text style={{ fontSize: 22, fontWeight: 'bold', color: '#212121' }}>
  제목
</Text>

// ✅ After
<Typography variant="heading2">제목</Typography>
```

#### 입력 필드
```tsx
// ❌ Before
<View>
  <Text>전화번호</Text>
  <TextInput style={styles.input} />
  {error && <Text style={styles.error}>{error}</Text>}
</View>

// ✅ After
<Input
  label="전화번호"
  errorText={error}
/>
```

#### 목록 행
```tsx
// ❌ Before
<TouchableOpacity style={styles.row}>
  <Text style={styles.title}>항목 이름</Text>
  <Text style={styles.chevron}>›</Text>
</TouchableOpacity>

// ✅ After
<ListItem
  title="항목 이름"
  rightChevron
  onPress={() => {}}
/>
```

---

## 색상 마이그레이션

| 기존 하드코딩 | 디자인 시스템 토큰 |
|-------------|-----------------|
| `#1B5E20` | `customColors.primary.main` |
| `#4CAF50` | `customColors.primary.light` |
| `#C62828` | `customColors.error.main` |
| `#FFFFFF` | `customColors.neutral.white` |
| `#212121` | `customColors.neutral.dark` |
| `#9E9E9E` | `customColors.neutral.medium` |

---

## 간격 마이그레이션

| 기존 값 | 디자인 시스템 토큰 | 용도 |
|--------|-----------------|------|
| `48` | `customSpacing.touch` | 최소 터치 영역 |
| `56` | `customSpacing.input` | 입력 필드 높이 |
| `16` | `customSpacing.gap` | 기본 간격 |
| `24` | `customSpacing.section` | 섹션 간격 |

---

*마지막 업데이트: 2026-03-24*
