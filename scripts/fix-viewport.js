#!/usr/bin/env node
/**
 * 시니어 UX: Viewport Meta Tag 수정 스크립트
 * Storybook 빌드 후 모든 HTML 파일의 viewport 메타 태그를 WCAG AAA 준수로 수정
 */

const fs = require('fs');
const path = require('path');

const STORYBOOK_STATIC = path.join(__dirname, '../storybook-static');
const NEW_VIEWPORT = 'width=device-width, initial-scale=1, user-scalable=yes';

const htmlFiles = ['iframe.html', 'index.html'];

htmlFiles.forEach((filename) => {
  const filePath = path.join(STORYBOOK_STATIC, filename);
  
  if (!fs.existsSync(filePath)) {
    console.log(`[BOKHAUS] ⚠️  ${filename} not found, skipping`);
    return;
  }

  let html = fs.readFileSync(filePath, 'utf8');
  
  // 모든 viewport 메타 태그를 수정
  const viewportRegex = /<meta\s+name="viewport"\s+content="[^"]*"[^>]*>/gi;
  const matches = html.match(viewportRegex);
  
  if (matches && matches.length > 0) {
    console.log(`[BOKHAUS] ${filename}: Found ${matches.length} viewport meta tag(s)`);
    matches.forEach((m, i) => console.log(`  [${i}] ${m}`));
    
    // 모든 viewport 태그를 수정
    html = html.replace(viewportRegex, `<meta name="viewport" content="${NEW_VIEWPORT}">`);
    
    // 중복 viewport 태그 제거 (첫 번째만 유지)
    let firstFound = false;
    html = html.replace(/<meta name="viewport" content="[^"]*">/gi, (match) => {
      if (!firstFound) {
        firstFound = true;
        return `<meta name="viewport" content="${NEW_VIEWPORT}">`;
      }
      return ''; // 중복 제거
    });
    
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`[BOKHAUS] ✅ ${filename} updated`);
  } else {
    console.log(`[BOKHAUS] ℹ️  ${filename}: No viewport meta tag found`);
  }
});

console.log(`[BOKHAUS] ✅ All viewport meta tags set to: ${NEW_VIEWPORT}`);
