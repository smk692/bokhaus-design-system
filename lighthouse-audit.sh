#!/bin/bash

# Lighthouse 7-B 품질 측정 스크립트
# 21개 컴포넌트 (Phase 1~6 완료 기준) Storybook 페이지 측정

BASE_URL="https://smk692.github.io/bokhaus-design-system"
OUTPUT_DIR="./lighthouse-reports"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

mkdir -p "$OUTPUT_DIR"

# 측정할 컴포넌트 목록 (21개)
COMPONENTS=(
  "avatar--default"
  "badge--default"
  "button--primary"
  "button--secondary"
  "card--default"
  "input--text"
  "input--password"
  "modal--default"
  "toast--success"
  "typography--heading"
  "list--default"
  "form--default"
  "appbar--default"
  "bottomnavigation--default"
  "chip--default"
  "progress--bar"
  "progress--spinner"
  "datepicker--default"
)

echo "🔍 Lighthouse 측정 시작: $TIMESTAMP"
echo "📊 총 ${#COMPONENTS[@]}개 컴포넌트 측정 예정"
echo ""

TOTAL_PERFORMANCE=0
TOTAL_ACCESSIBILITY=0
TOTAL_BEST_PRACTICES=0
TOTAL_SEO=0
COUNT=0

for COMPONENT in "${COMPONENTS[@]}"; do
  COUNT=$((COUNT + 1))
  URL="$BASE_URL/?path=/story/${COMPONENT}"
  OUTPUT_FILE="$OUTPUT_DIR/${COMPONENT}_${TIMESTAMP}.json"
  
  echo "[$COUNT/${#COMPONENTS[@]}] Measuring: $COMPONENT"
  
  lighthouse "$URL" \
    --output=json \
    --output-path="$OUTPUT_FILE" \
    --chrome-flags="--headless --no-sandbox" \
    --only-categories=performance,accessibility,best-practices,seo \
    --quiet 2>/dev/null
  
  if [ $? -eq 0 ] && [ -f "$OUTPUT_FILE" ]; then
    PERF=$(jq '.categories.performance.score * 100' "$OUTPUT_FILE")
    A11Y=$(jq '.categories.accessibility.score * 100' "$OUTPUT_FILE")
    BP=$(jq '.categories["best-practices"].score * 100' "$OUTPUT_FILE")
    SEO_SCORE=$(jq '.categories.seo.score * 100' "$OUTPUT_FILE")
    
    TOTAL_PERFORMANCE=$(echo "$TOTAL_PERFORMANCE + $PERF" | bc)
    TOTAL_ACCESSIBILITY=$(echo "$TOTAL_ACCESSIBILITY + $A11Y" | bc)
    TOTAL_BEST_PRACTICES=$(echo "$TOTAL_BEST_PRACTICES + $BP" | bc)
    TOTAL_SEO=$(echo "$TOTAL_SEO + $SEO_SCORE" | bc)
    
    echo "  ✅ Performance: $PERF | Accessibility: $A11Y | Best Practices: $BP | SEO: $SEO_SCORE"
  else
    echo "  ❌ 측정 실패"
  fi
  
  sleep 2
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 Lighthouse 측정 완료 요약"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ $COUNT -gt 0 ]; then
  AVG_PERF=$(echo "scale=1; $TOTAL_PERFORMANCE / $COUNT" | bc)
  AVG_A11Y=$(echo "scale=1; $TOTAL_ACCESSIBILITY / $COUNT" | bc)
  AVG_BP=$(echo "scale=1; $TOTAL_BEST_PRACTICES / $COUNT" | bc)
  AVG_SEO=$(echo "scale=1; $TOTAL_SEO / $COUNT" | bc)
  
  echo "평균 Performance: $AVG_PERF"
  echo "평균 Accessibility: $AVG_A11Y ⭐️ (목표: 90점)"
  echo "평균 Best Practices: $AVG_BP"
  echo "평균 SEO: $AVG_SEO"
  echo ""
  echo "측정 완료: $COUNT개 컴포넌트"
  echo "보고서 위치: $OUTPUT_DIR"
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
