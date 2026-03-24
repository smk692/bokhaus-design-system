#!/usr/bin/env node
/**
 * 시니어 UX: Viewport Meta Tag 수정 스크립트
 * Storybook 빌드 후 HTML 파일의 viewport 메타 태그를 WCAG AAA 준수로 수정
 * 
 * WCAG 2.1 SC 1.4.4: maximum-scale 제한 없어야 함
 * - maximum-scale는 설정하지 않음 (무제한 확대)
 * - user-scalable=yes 명시
 */

const fs = require('fs');
const path = require('path');

const STORYBOOK_STATIC = path.join(__dirname, '../storybook-static');
const HTML_FILE = path.join(STORYBOOK_STATIC, 'iframe.html');

// viewport 메타 태그 수정
const OLD_VIEWPORT = 'width=device-width,initial-scale=1';
const NEW_VIEWPORT = 'width=device-width, initial-scale=1, user-scalable=yes';

if (fs.existsSync(HTML_FILE)) {
  let html = fs.readFileSync(HTML_FILE, 'utf8');
  
  // 정규식으로 viewport 메타 태그 찾아서 수정
  const viewportRegex = /<meta name="viewport" content="([^"]+)">/g;
  const matches = html.match(viewportRegex);
  
  if (matches && matches.length > 0) {
    console.log(`[BOKHAUS] Found ${matches.length} viewport meta tag(s)`);
    
    // 첫 번째 viewport 태그만 수정 (Webpack 생성)
    html = html.replace(
      /<meta name="viewport" content="[^"]+">/, 
      `<meta name="viewport" content="${NEW_VIEWPORT}">`
    );
    
    fs.writeFileSync(HTML_FILE, html, 'utf8');
    console.log('[BOKHAUS] ✅ Viewport meta tag updated for senior UX (WCAG 2.1 SC 1.4.4)');
    console.log(`[BOKHAUS]    Old: ${OLD_VIEWPORT}`);
    console.log(`[BOKHAUS]    New: ${NEW_VIEWPORT}`);
    console.log('[BOKHAUS]    Note: maximum-scale removed (unlimited zooming allowed)');
  } else {
    console.log('[BOKHAUS] ⚠️  No viewport meta tag found');
  }
} else {
  console.error('[BOKHAUS] ❌ iframe.html not found in storybook-static/');
  process.exit(1);
}
