# 프로젝트 명

## 목차

- [프로젝트 소개](#프로젝트-소개)   
- [프로젝트 명세](#프로젝트-명세)
  - [진행 상황](#진행-상황)
  - [배포 환경](#배포-환경)
  - [개발 환경](#개발-환경)
  - [Design Resources](#design-resources)
  - [핵심 라이브러리](#핵심-라이브러리)
- [어려웠던 점](#어려웠던-점)
<br>

## 프로젝트 소개
화면공유 애플리케이션을 SPA로 구현하기
<br>

## 프로젝트 명세
### 진행 상황
- __FE__
  - __공통(인증 토큰 관리)__
    - 로그인 및 토근 발급 시 토큰 localStorage에 저장(100%)
    - 페이지 진입 시 토큰여부 확인 후 로그인 화면 및 비로그인화면 표시(100%)
    - 공용 Axios 처리(50%)
    - 로그아웃 처리(100%)
  - __로딩 스피너__
    - 홈> 방 목록 조회
      - 전체조회(0%)
      - 검색(0%)
      - 정렬(0%)
    - 홈> 방 목록> 방 상세 정보(0%)
    - 지난 회의 이력(0%)
  - __네비게이션(비로그인)__
    - 입력 필드 유효성 체크(100%)
    - 비로그인 상태의 사이드 메뉴는 홈만 표시(100%)
  - __네비게이션(로그인)__
    - 홈(100%)
    - 지난 회의 이력(100%)
    - 로그아웃(100%)
  - __회원가입__
    - 회원가입 버튼(100%)
    - 회원가입 팝업(100%)
  - __로그인__
    - 로그인 버튼(100%)
    - 로그인 팝업(100%)
  - __회원가입/로그인 버튼__
    - 로그인상태에서 회원가입, 로그인 버튼 숨김(100%)

- __BE__
  - __Database__
    - INIT, SQL
      - 초기 Database 테이블 설정(100%)
    - JPA
      - Entity 구현 (100%)
      - Repository 구현(20%)
  - __API__
    - 인증
      - [POST] /auth/login(100%)
    - 유저
      - 회원가입: [POST] /users(100%)
      - 내 프로필: [GET] /users/me(100%)
      - 유저정보: [GET] /users/<string:userId>(100%)
      - 유저정보수정: [PATCH] /users/<string:userId>(100%)
      - 유저정보삭제: [DELETE] /users/<string:userId>(100%)

### 배포 환경
- __URL__ : 
- __배포 여부__ : X
- __접속 가능__ : 수정 중
- __HTTPS 적용__ : O / X
- __PORT__ : // 3rd Party에서 사용하는 포트가 있다면 기입해주세요. <- 기입 후 해당 주석 삭제
<br>

### 개발 환경
#### Front-end
- __Framework__ : Vue.js / React / Android / Unity
- __지원 환경__ : Web / Mobile / Web App / Native App
- __담당자__ : 박주영
<br>

#### Back-end
- __Framework__ : Spring boot / Node.js / Django / Flask
- __Database__ : MySQL / MariaDB
- __담당자__ : 박주영
<br>

#### Design
- __Framework 사용__ : O
  - [Vuetify](https://vuetifyjs.com/)
  - [Element Plus](https://element-plus.org/)
- __Design Tool 사용__ : 
- __담당자__ : 박주영
<br>

### Design Resources
__외부 템플릿 또는 에셋__ (이미지 또는 링크 첨부)
- 무료 이미지, 아이콘, 폰트 등은 제외
- [Vue Argon Design System](https://www.creative-tim.com/product/vue-argon-design-system?affiliate_id=116187) (무료)
  - __사용 기능__ : 디자인 전반 적용
- [Vue Black Dashboard Pro](https://www.creative-tim.com/product/vue-black-dashboard-pro?affiliate_id=116187) (유료)
  - __사용 기능__ : 캘린더 컴포넌트 사용
<br>

__자체 제작 산출물__ (필요시 이미지 또는 설명 첨부)
- LOGO
- CardView
- Button
- Calendar
<br>

### 핵심 라이브러리
기본 제공하는 라이브러리 외 핵심 기능 구현에 사용한 라이브러리가 있다면 작성해주세요.   
예시 ) VR/AR 라이브러리, 애니메이션 라이브러리, 텍스트/사진/동영상 지원, 편집 라이브러리 등

- __AR CORE__
  - __링크__ : https://developers.google.com/ar
  - __소개__ : 구글에서 제공하는 AR 지원 라이브러리
  - __사용 기능__ : 이미지 인식, 이미지 위 영상 표시
  - __담당자__ : 팀원 A, 

- __COLOR THIEF__
  - __링크__ : https://lokeshdhakar.com/projects/color-thief/
  - __소개__ : 이미지에서 색상을 추출해주는 라이브러리
  - __사용 기능__ : 커버 사진에서 색상 추출 -> 배경 색상 변경
  - __담당자__ : 팀원 A,

- __Animate.css__
  - __링크__ : https://animate.style/
  - __소개__ : css 애니메이션 지원 라이브러리
  - __사용 기능__ : 메인 페이지 진입 시 애니메이션 사용
  - __담당자__ : 팀원 A,

## 어려웠던 점
- 기술적으로..!
  기술적으로 미흡함을 많이 느꼈다. 
  프론트엔드는 Vue가 익숙하지 않아서 조금 헤맸고, el-ui도 처음 사용해봐서 조금 버벅였다.
  백엔드도 JPA를 처음 사용해봐서 초반에 문법을 찾고 익히는 데 시간이 걸렸다. (하지만 하고 보니 너무 편한 것..?) 

  전체적으로 내 기술 역량이 내가 기대한 것보다 조금 떨어진다는 것과 개발 속도가 아주 빠르지는 않다는 것, 잘 안될 경우 새로운 방법을 찾아내는 게 빠를 수 있는데 안되는 것을 붙잡고 (너무)늘어진다는 것에 대해 알게 됐다.

  공부 많이 해야겠다😊
  
- 심리적으로..!
  팀 내에서 프론트엔드를 잘한다고 소문이 나버려서 조금 부담스러움+잘해야한다는 생각이 좀 들었다. 배우면서 하고 싶었는데 지금 팀에서 가르쳐줘야한다 분위기에 부담감이 조금 생겼다.