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
    db.query(`SELECT * FROM user WHERE user.user_id=? AND user.password = ?`,[userID,userPassword], function(error,result){
        console.log(result[0]);

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
                    userID : result[0].user_id,
                    userMbti : result[0].mbti,
                    userAge : result[0].age,
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
    var userName = req.body.userName;
    // user table null 값 여부 변경 후 수정 예정
    db.query(`SELECT * FROM user WHERE user.user_id=?`,[userID], function(error1,check){
        console.log(check);
        if(error1) throw error1;
        else{
            if(check.length === 0) {
                db.query(`insert into pyeonhee.user(user_id, password, name, tier)
                    values (?, ?, ?, 'Bronze')`,[userID,userPassword,userName], function(error2,result){
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

// 설문조사 진행후 MBTI 제시
app.post('/submitMbti', function(req,res){
    console.log(req.body)
    var userID = req.body.userID;
    var userAge = req.body.userAge;
    var mbti_type = '';
    var first_type = req.body.mbti1score;
    var second_type = req.body.mbti2score;
    var third_type = req.body.mbti3score;
    var fourth_type = req.body.mbti4score;
    
    if(first_type > 50){
        mbti_type = mbti_type + 'I';
    } else {
        mbti_type = mbti_type + 'P';
    }
    if(second_type > 50){
        mbti_type = mbti_type + 'H';
    } else {
        mbti_type = mbti_type + 'C';
    }
    if(third_type > 50){
        mbti_type = mbti_type + 'O';
    } else {
        mbti_type = mbti_type + 'S';
    }
    if(fourth_type > 50){
        mbti_type = mbti_type + 'E';
    } else {
        mbti_type = mbti_type + 'M';
    }
    console.log(mbti_type);
    db.query(`UPDATE user SET mbti = ? WHERE user.user_id = ?`,[mbti_type, userID], function(error2,result2){
        if(error2) throw error2;
         console.log(result2);
    });
    db.query(`UPDATE user SET age = ? WHERE user.user_id = ?`,[userAge, userID], function(error1,result1){
        if(error1) throw error1;
        console.log(result1);
    });
    const data = {
        status : true,
        mbtiType : mbti_type,
    };
    console.log(data);
    res.send(data);
});

const PORT = 8000;
app.listen(PORT, function(){
    console.log("Server is ready at "+ PORT);
});