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
