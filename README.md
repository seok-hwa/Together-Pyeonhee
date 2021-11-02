# 2021-SW-CapstoneDesign

## 1. 개발 환경
### 1.1. Client
#### 1.1.1. React Native 설치 (본 프로젝트는 React Native CLI로 진행)
https://dev-yakuza.posstree.com/ko/react-native/install-on-windows/ 사이트 참고해서 client 개발 환경 구축
#### 1.1.2. 클라이언트 실행(client/)
> npm run android
### 1.2. Server
#### 1.2.1. node.js 
https://www.youtube.com/watch?v=7_do8mOFPi4 사이트 참고해서 node.js 서버 개발 환경 구축
#### 1.2.2. 서버 실행(server/)
> npx nodemon app.js
### 1.3. 관련 패키지 설치
#### 1.3.1. nodemon(server/)
> npm install nodemon

서버 실행
#### 1.3.2. express(server/)
> npm install express

### 1.4. Client/Server 통신
client에서 fetch함수를 통해 node 로컬 서버로 접속할 때

URL: http://IPv4주소:로컬서버포트/

## 2. 로그인 및 회원가입

### 2.1. 관련 패키지 설치
#### 2.1.1. 아이콘
https://kkiuk.tistory.com/162 사이트 참고
#### 2.1.2. AsyncStorage(아이디 저장)
https://jw910911.tistory.com/73 사이트 참고
#### 2.1.3. 네비게이션
https://theseung.tistory.com/5 사이트 참고

https://reactnavigation.org/docs/tab-based-navigation/ 사이트 참고

### 2.2. 관련 이슈
1) 아이디 저장하기가 필요한가?
2) 아직까지는 로그인에 성공하면 메인화면으로 가도록 설정해놨음 처음 로그인하면 설문조사 페이지로 가는 로직 추후 설정 필요
3) 프록시 설정 필요

## 3. 추천 예산 계획서

### 3.1. 관련 패키지 설치
#### 3.1.1. react native chart
https://m.blog.naver.com/noisy2/222063240495 사이트 참고
