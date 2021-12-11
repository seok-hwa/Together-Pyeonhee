const express = require("express");
//const mysql = require('mysql');
//var db = require('./db_config.js');
//var request = require('request');
/*
const admin = require('firebase-admin');
let serviceAccount = require('./pyeonhee-AccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
*/

var app = express();
app.use(express.json());

//schedule
var scheduleRouter = require('./routes/schedule')();
app.use('/', scheduleRouter);

//회원가입 및 설문조사
var joinRouter = require('./routes/join')();
app.use('/register', joinRouter);

//로그인 및 아이디/비밀번호 찾기
var loginRouter = require('./routes/login')();
app.use('/access', loginRouter);

//데일리
var dailyRouter = require('./routes/daily')();
app.use('/daily', dailyRouter);

//오픈뱅킹 계좌연동 및 거래내역
var openBankingRouter = require('./routes/openBanking')();
app.use('/account', openBankingRouter);

//캘린더
var calendarRouter = require('./routes/calendar')();
app.use('/calendar', calendarRouter);

//가계부 탭_예산계획작성 및 확인
var budgetPlanRouter = require('./routes/budgetPlan')();
app.use('/budget', budgetPlanRouter);

/*
//상담사
var consultRouter = require('./routes/consult')();
app.use('/temporarily', consultRouter);

//예산계획추천
var recommendBudgetplanRouter = require('./routes/recommendBudgetplan')();
app.use('/temporarily', recommendBudgetplanRouter);

//저축
var savingPlanRouter = require('./routes/savingPlan')();
app.use('/temporarily', savingPlanRouter);

//리포트
var reportRouter = require('./routes/report')();
app.use('/temporarily', reportRouter);

//금융상품
var finalcialItemRouter = require('./routes/finalcialItem')();
app.use('/temporarily', finalcialItemRouter);

//마이페이지 (로그아웃 포함)
var myInfoRouter = require('./routes/myInfo')();
app.use('/temporarily', myInfoRouter);

//관리자 웹페이지
var adminRouter = require('./routes/admin')();
app.use('/temporarily', adminRouter);

//사용자 고객센터 확인 및 글 작성
var boardRouter = require('./routes/board')();
app.use('/temporarily', boardRouter);

//사용자 공지사항 확인
var noticeRouter = require('./routes/notice')();
app.use('/temporarily', noticeRouter);
*/

const PORT = 8000;
app.listen(PORT, function () {
    console.log("Server is ready at " + PORT);
});