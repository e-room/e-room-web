# e-room-web

## 개발환경

- 코어: react, next.js
- 스타일: storybook, emotion
- 타입관리: prop-types
- 상태관리: context api (임시)

## 실행

- storybook: npm run storybook
- next: npm run dev

## 프로젝트 구조

- assets: svg 등 이미지, 아이콘 관련
- components: 공통 컴포넌트, 모듈 단위 컴포넌트 구현. 기본 index.js

* pages:
  - \_app: 가장 먼저 실행되는 파일. 공통(global) 파일 관리
  - index: 메인 페이지(Home)
  - 그 외는 페이지 단위의 구현

- stories: 작성한 스토리 관련
- styles: css, global style 관련
