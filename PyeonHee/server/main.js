const express = require("express");
//const mysql = require('mysql');
//var db = require('./db_config.js');
var request = require('request');
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

const PORT = 8000;
app.listen(PORT, function () {
    console.log("Server is ready at " + PORT);
});