# 2021-SW-CapstoneDesign

## 공지사항
### 1. 동료평가
burndown chart에서 수행한 task 개수로 평가 진행
### 2. Open Zoom Meeting
평일 오후 7시~12시까지 zoom을 개설할테니 개발할때 참여해서 진행
### 3. Slack 이용
카카오톡 확인이 늦어 캡스톤 디자인 개발과 관련된 모든 내용은 slack으로 진행
## 1. 개발 환경
### 1.1. Client
#### 1.1.1. React Native 설치 (본 프로젝트는 React Native CLI로 진행)
https://dev-yakuza.posstree.com/ko/react-native/install-on-windows/ 사이트 참고해서 client 개발 환경 구축
#### 1.1.2. 클라이언트 실행(client/)
~~~
npm run android
~~~
### 1.2. Server
#### 1.2.1. node.js 
https://www.youtube.com/watch?v=7_do8mOFPi4 사이트 참고해서 node.js 서버 개발 환경 구축
#### 1.2.2. 서버 실행(server/)
~~~
npx nodemon app.js
~~~
### 1.3. 관련 패키지 설치
#### 1.3.1. nodemon(server/)
~~~
npm install nodemon
~~~

서버 실행
#### 1.3.2. express(server/)
~~~
npm install express
~~~

#### 1.3.3. confirm
~~~
npm install react-native-status-bar-height
~~~
~~~
npm install react-native-popup-confirm-toast
~~~
### 1.4. Client/Server 통신
client에서 fetch함수를 통해 node 로컬 서버로 접속할 때

URL: 테스트시 App.js파일에서 url="http://IPv4주소:로컬서버포트/"로 변경후 실행

### 1.5. Local MySQL 연결
MySQL 연결할 때 config.js 파일에서 해당하는 내용들 기입 후 테스트 진행할 것 수정하고 다시 merge request 진행시 지우고 merge request 진행

## 2. 로그인 및 회원가입

### 2.1. 관련 패키지 설치
#### 2.1.1. 아이콘
https://kkiuk.tistory.com/162 사이트 참고
#### 2.1.2. AsyncStorage(아이디 저장)
https://jw910911.tistory.com/73 사이트 참고
#### 2.1.3. 네비게이션
https://theseung.tistory.com/5 사이트 참고

https://reactnavigation.org/docs/tab-based-navigation/ 사이트 참고

#### 2.1.4. 아임포트
~~~ 
npm install iamport-react-native --save
~~~
~~~
npm install react-native-webview
~~~
~~~
react-native link iamport-react-native
react-native link react-native-webview
~~~
~~~
npm install --save @react-navigation/stack
~~~
~~~
npm install native-base --save
~~~
~~~
npm install --save styled-components
~~~
~~~
npm install --save-dev babel-plugin-styled-components @types/styled-components @types/styled-components-react-native
~~~
~~~
npm install --save react-native-gesture-handler
~~~
~~~
npm install styled-system
~~~
### 2.2. 관련 이슈
1) 아이디 저장하기가 필요한가?
2) 아직까지는 로그인에 성공하면 메인화면으로 가도록 설정해놨음 처음 로그인하면 설문조사 페이지로 가는 로직 추후 설정 필요
3) 프록시 설정 필요

## 3. 추천 예산 계획서

### 3.1. 관련 패키지 설치
#### 3.1.1. react native chart
https://m.blog.naver.com/noisy2/222063240495 사이트 참고

## 4. mbit 설문조사

### 4.1. 관련 패키지 설치
#### 4.1.1. css-tree css-select
~~~
yarn add css-tree css-select
~~~
