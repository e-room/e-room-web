# e-room-web

## 개발환경

- 코어: react, next.js
- 스타일: storybook, emotion
- 타입관리: prop-types
- 상태관리: recoil, react-query
- 주소검색: react-daum-postcode
- 환경설정: env-cmd .env
- 폰트: [pretendard](https://github.com/orioncactus/pretendard)

## 실행

- storybook: npm run storybook
- next: npm run dev ([localhost:3000](http://localhost:3000))

## 프로젝트 구조

- assets: svg 등 이미지, 아이콘 관련
- codes: 코드화 된 상태들

* components
  - building: building page에 들어가는 상세 컴포넌트
  * common
    - atoms: 모듈 단위 컴포넌트들
    - AppLayout: 레이아웃 컴포넌트
    - Footer: 하단에 위치한 nav bar
    - Header: 상단에 위치한 app bar
  - review: review page에 들어가는 상세 컴포넌트
* pages:
  - \_app: 가장 먼저 실행되는 파일. 공통(global) 파일 관리
  - index: 메인 페이지
  - 그 외는 페이지 단위의 구현

- states: 상태관리
- stories: 작성한 스토리 관련
- styles: css, global style 관련
