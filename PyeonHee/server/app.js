const express = require("express");
const app = express();
const config = require('./config');
var mysql = require('mysql');
var db = mysql.createConnection({
  host:config.host,
  user:config.id, // MySQL USER
  password:config.password, // MySQL Password
  database:config.database
});
db.connect(function(err){
    if (err) throw err;
    console.log('Connected!');
});

app.use(express.json());

app.get("/welcome", function(req, res){
    res.send("Welcome");
});

// 로그인 기능 (LoginScreen.js)
app.post('/login', function(req, res){
    var userID = req.body.userID;
    var userPassword = req.body.userPassword;
    db.query(`SELECT * FROM user WHERE user.id=? AND user.password = ?`,[userID,userPassword], function(error,result){
        if(error) throw error;
        else{
            if(result.length === 0) {
                const data = {
                    status : 'failed',
                }
                console.log(data);
                res.send(data);
            }
            else{
                const data = {
                    status : 'success',
                }
                console.log(data);
                res.send(data);
            }
        }
    });
});

// 회원가입 기능 (JoinScreen.js)
app.post('/signUp', function(req, res){
    console.log(req.body)
    var userID = req.body.userID;
    var userPassword = req.body.userPassword;
    // user table null 값 여부 변경 후 수정 예정
    db.query(`SELECT * FROM user WHERE user.id=?`,[userID], function(error1,check){
        console.log(check);
        if(error1) throw error1;
        else{
            if(check.length === 0) {
                db.query(`insert into pyeonhee.user(id, password, name, mbti, age)
                    values (?, ?, 'tom', 'ICSE', 27)`,[userID,userPassword], function(error2,result){
                    console.log(result);
                    if(error2) throw error2;
                    else {
                        const data = {
                            status : 'success',
                        }
                        console.log(data);
                        res.send(data);
                    }
                });
            }
            else{
                const data = {
                    status : 'failed',
                }
                console.log(data);
                res.send(data);
            }
        }
    });
});

const PORT = 8000;
app.listen(PORT, function(){
    console.log("Server is ready at "+ PORT);
});