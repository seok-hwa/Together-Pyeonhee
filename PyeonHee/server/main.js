const express = require("express");
const admin = require('firebase-admin');
let serviceAccount = require('./pyeonhee-AccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

var app = express();
app.use(express.json());

//schedule
var scheduleRouter = require('./routes/schedule')(admin);
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

//예산계획추천 및 좋아요&보관함
var recommendBudgetplanRouter = require('./routes/recommendBudgetplan')();
app.use('/plan', recommendBudgetplanRouter);

//저금계획
var savingPlanRouter = require('./routes/savingPlan')();
app.use('/SavingPlan', savingPlanRouter);

//한달리포트 & mbti재설정
var reportRouter = require('./routes/report')();
app.use('/monthReport', reportRouter);

//한달리포트 보관함
var reportRouter = require('./routes/reportCabinet')();
app.use('/monthReport/Cabinet', reportRouter);

//마이페이지 (로그아웃 포함)
var myInfoRouter = require('./routes/myPage')();
app.use('/myPage', myInfoRouter);

//상담사
var consultRouter = require('./routes/consult')();
app.use('/Counseling', consultRouter);

//금융상품
var financialItemRouter = require('./routes/financialItem')();
app.use('/financialItem', financialItemRouter);

//사용자 공지사항 확인
var noticeRouter = require('./routes/notice')();
app.use('/notice', noticeRouter);

//사용자 고객센터 확인 및 글 작성
var boardRouter = require('./routes/board')();
app.use('/query', boardRouter);

//관리자 웹페이지
var adminRouter = require('./routes/admin')(admin);
app.use('/admin', adminRouter);

const PORT = 8000;
app.listen(PORT, function () {
    console.log("Ncloud Server is ready at " + PORT);
});