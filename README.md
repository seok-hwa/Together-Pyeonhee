# 2021-SW-CapstoneDesign

## 공지사항
### 1. 동료평가
burndown chart에서 수행한 task 개수로 평가 진행
### 2. Open Zoom Meeting
평일 오후 7시~12시까지 zoom을 개설할테니 개발할때 참여해서 진행
### 3. Slack 이용
카카오톡 확인이 늦어 캡스톤 디자인 개발과 관련된 모든 내용은 slack으로 진행
<br>
<br>
<br>
<br>

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
### 1.3. Admin
#### 1.3.1. React 설치(admin/)
~~~
npm install react
~~~
#### 1.3.2. admin 웹 실행(admin/)
~~~
npm start
~~~
### 1.4. 관련 패키지 설치
#### 1.4.1. nodemon(server/)
~~~
npm install nodemon
~~~

서버 실행
#### 1.4.2. express(server/)
~~~
npm install express
~~~

#### 1.4.3. confirm(client/)
~~~
npm install react-native-status-bar-height
~~~
~~~
npm install react-native-popup-confirm-toast
~~~

### 1.5. Local MySQL 연결(server/)
MySQL 연결할 때 config.js 파일에서 해당하는 내용들 기입 후 테스트 진행할 것

### 1.6. 서버 url 연결(client/)
client 폴더안에 config.js 파일 생성후 아래와 같이 기입
~~~
const config = {
    url: 'http://IPv4주소:로컬서버포트',
    openBankingURL: '오픈뱅킹인증 url',
    client_id: '',
    client_secret: '',
};

module.exports = config;
~~~

### 1.7. .gitignore 적용
server/config.js와 client/config.js가 .gitignore이 정상적으로 적용이 안 되어 push 될 때 아래 명령어로 캐시를 지우고 add
~~~
git rm -r --cached .
~~~
<br>
<br>
<br>
<br>

## 2. 로그인 및 회원가입

### 2.1. 관련 패키지 설치
#### 2.1.1. 아이콘(client/)
https://kkiuk.tistory.com/162 사이트 참고
#### 2.1.2. AsyncStorage(client/)
https://jw910911.tistory.com/73 사이트 참고
#### 2.1.3. 네비게이션(client/)
https://theseung.tistory.com/5 사이트 참고

https://reactnavigation.org/docs/tab-based-navigation/ 사이트 참고

#### 2.1.4. 아임포트(client/)
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

<br>
<br>
<br>
<br>

## 3. 추천 예산 계획서

### 3.1. 관련 패키지 설치
#### 3.1.1. react native chart(client/)
https://m.blog.naver.com/noisy2/222063240495 사이트 참고

#### 3.1.2. react native checkbox(client/)
~~~
npm install @react-native-community/checkbox --save
~~~
<br>
<br>
<br>
<br>

## 4. mbit 설문조사

### 4.1. 관련 패키지 설치
#### 4.1.1. css-tree css-select(client/)
~~~
yarn add css-tree css-select
~~~

#### 4.1.2. PickerSelect(client/)
~~~
npm install react-native-picker-select
~~~
~~~
npm install @react-native-picker/picker
~~~

#### 4.1.2. Stacked Bar Chart(client/)
~~~
npm i react-native-svg
npm install --save react-native-svg-charts
~~~
<br>
<br>
<br>
<br>

## 5. 마이페이지

<br>
<br>
<br>
<br>

## 6. Main 화면 
### 6.1. 관련 패키지 설치
#### 6.1.1. react native segmented-control-tab(client/)
~~~
npm install react-native-segmented-control-tab --save
~~~

<br>
<br>
<br>
<br>

## 7. 계좌 연동
### 7.1. 관련 패키지 설치
#### 7.1.1. axios(/client)
~~~
npm install --save axios
~~~

<br>
<br>
<br>
<br>

## 8. 캘린더
### 8.1. 관련 패키지 설치
#### 8.1.1. moment(/client)
~~~
npm i moment
~~~
#### 8.1.2. prop-types(/client)
~~~
npm install --save prop-types
~~~
#### 8.1.3. calendars(/client)
~~~
npm install --save react-native-calendars
~~~

<br>
<br>
<br>
<br>

## 9. 알림
### 9.1. 관련 패키지 설치
#### 9.1.1. 파이어베이스 모듈(/client)
~~~
npm i -s @react-native-firebase/app @react-native-firebase/messaging
~~~
