const express = require("express");
const app = express();
const config = require('./config');
const mysql = require('mysql2');
const { Client } = require('ssh2');
const sshClient = new Client();
app.use(express.json());
const SSHConnection = new Promise((resolve, reject) => {
    sshClient.on('ready', () => {
        sshClient.forwardOut(
        config.forwardConfig.srcHost,
        config.forwardConfig.srcPort,
        config.forwardConfig.dstHost,
        config.forwardConfig.dstPort,
        (err, stream) => {
             if (err) reject(err);
             const updatedDbServer = {
                 ...config.dbServer,
                 stream
            };

            const db =  mysql.createConnection(updatedDbServer);
            db.connect((error) => {
            if (error) {
                reject(error);
            }
            resolve(db);
            console.log('Connected!');
            });

            // app.use(express.json());

            // 로그인 기능 (LoginScreen.js)
            app.post('/login', function(req, res){
                var userID = req.body.userID;
                var userPassword = req.body.userPassword;
                db.query(`SELECT * FROM user WHERE user.user_id=? 
                AND user.password = ?`,[userID,userPassword], function(error,result){
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
                            db.query(`insert into user(user_id, password, name)
                                values (?, ?, ?)`,[userID,userPassword,userName], function(error2,result){
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
                console.log('여기부터',req.body)
                var userID = req.body.userID;
                var userAge = req.body.userAge;
                var mbti_type = '';
                var first_type = req.body.mbti1Score;
                var second_type = req.body.mbti2Score;
                var third_type = req.body.mbti3Score;
                var fourth_type = req.body.mbti4Score;
                var userIncome = req.body.userMonthlyIncome;
                var userJob = req.body.userJob;
                
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
                db.query(`UPDATE user SET mbti = ? 
                WHERE user.user_id = ?`,[mbti_type, userID], function(error,result1){
                    if(error) throw error;
                    console.log(result1);
                });
                db.query(`UPDATE user SET age = ? 
                WHERE user.user_id = ?`,[userAge, userID], function(error,result2){
                    if(error) throw error;
                    console.log(result2);
                });
                db.query(`UPDATE user SET income = ? 
                WHERE user.user_id = ?`, [userIncome, userID], function (error, result3) {
                    if (error) throw error;
                    console.log(result3);
                });
                db.query(`UPDATE user SET job = ? 
                WHERE user.user_id = ?`, [userJob, userID], function (error, result4) {
                    if (error4) throw error4;
                    console.log(result4);
                });
                const data = {
                    status : true,
                    mbtiType : mbti_type,
                };
                console.log(data);
                res.send(data);
            });

            //마이페이지
            app.get('/myInfo', function(req,res){
                console.log(req.query.userID);
                var userID = req.query.userID;
                var userName;
                var userTier;
                var userStamp;
                var userPoint;
                db.query(`SELECT name FROM user WHERE user_id = ?`, [userID], function(error3, result3){
                    if(error3) throw error3;
                    console.log(result3);
                    const data = {
                        userName: result3[0].name,
                    }
                    console.log(data);
                    res.send(data);
                });
                /*
                db.query(`SELECT diff as current_stamp_count FROM stamp WHERE user_id = ?`, [userID], function(error4, result4){
                    if(error4) throw error4;
                    console.log(result4);
                });
                db.query(`SELECT diff as current_point FROM point WHERE user_id =?` [userID], function(error5, result5){
                    if(error5) throw (error5);
                    console.log(result5);
                });*/
                /*
                const data = {
                    userTier : user_Tier,
                    userStamp : user_Stamp,
                    userPoint : user_Point,
                };*/
            });

            //예산계획추천페이지(모든 사용자 동일)
            app.get('/saveSelectBudgetPlan', function (req, res) {
                console.log(req.query.userID);
                db.query(`SELECT * FROM BudgetPlanning order by like_number desc limit 5,5`, function (error, result) {
                    if (error) throw error;
                    console.log(result);
                    res.send(result);
                });
            });

            // 선택한 예산계획 상세보기
            app.get('/recommendedBudgetPlan', function (req, res) {
                console.log(req.query.budgetPlanningID);
                var budgetPlanID = req.query.budgetPlanningID;
                var userMBTI;
                var userAge;
                var userIncome;
                var user_savings;
                var userLikeCount;
                var rent;
                var insurance;
                var traffic;
                var communication;
                var hobby;
                var shoppshoppinging_expense;
                var education;
                var medical;
                var event;
                var ect;

                db.query(`SELECT * FROM BudgetPlanning WHERE planning_number =?`, [budgetPlanID], function (error, result) {
                    if (error) throw error;
                    console.log(result[0]);
                    const data = {
                        userLikeCount: result[0].like_number,
                        userMBTI: result[0].user_mbti,
                        userAge: result[0].user_age,
                        userIncome: result[0].user_income,
                        rent: result[0].monthly_rent,
                        insurance: result[0].insurance_expense,
                        traffic: result[0].transportation_expense,
                        communication: result[0].communication_expense,
                        hobby: result[0].leisure_expense,
                        shopping: result[0].shopping_expense,
                        education: result[0].education_expense,
                        medical: result[0].medical_expense,
                        event: result[0].event_expense,
                        ect: result[0].etc_expense,
                        budgetPlanID: result[0].planning_number
                    }
                    console.log(data);
                    res.send(data);
                });
            });

            // 선택한 예산계획 보관함
            app.post('/saveBudgetPlan', function (req, res) {
                console.log(req.body);
                var userID = req.body.userID;
                var budgetPlanID = req.body.budgetPlanID;
                db.query(`INSERT INTO Storage(user_id, planning_number) SELECT ?,? FROM DUAL
                WHERE NOT EXISTS (SELECT user_id, planning_number FROM Storage WHERE user_id = ? and planning_number =?)`, [userID, budgetPlanID, userID, budgetPlanID], function (error, result) {
                if (error) throw error;
                    else {
                        const data = {
                            status: true
                        }
                        console.log(data);
                        res.send(data);
                    }
                });
            });

            /*
            // 선택한 예산계획 좋아요
            app.post('/likeBudgetPlan/', function (req, res) {
                console.log(req.body);
                var budgetPlanID = req.body.budgetPlanID;
                var userLike = req.body.userLike;
            });
            */
            
            // 편히 메뉴의 데일리데이터의 저금계획
            app.post(`/daily/savings`, function(req, res){
                console.log(req.body);
                var userID = req.body.userID;
                db.query(`select saving_name, savings_money, start_date,finish_date, 
                        all_savings_money from Savings where user_id = ?` , [userID], function(error, result){
                    if(error) throw error;
                    else{
                        console.log(result);
                        res.send(result);
                    }
                });
            });

            // 편히 메뉴의 데일리데이터의 권장소비금액과 카테고리별 금액
            app.post(`/daily`, function(req, res){
                console.log(req.body);
                var userID = req.body.userID;
                // db.query(`SELECT available_money, daily_spent_money, rest_money 
                //         FROM daily_data WHERE user_id = ?` , [userID], function(error, money){
                //     if(error) throw error;
                //     else{
                //         data.push({available_money = money.available_money}); // 일일 권장 소비 잔여 금액
                //         data.push({daily_spent_money = money.daily_spent_money}); // 일일 권장 소비 금액
                //         data.push({rest_money = money.rest_money}); // 저금통 금액
                //         console.log(data);
                //     }
                // });
                db.query(`select  BudgetPlanning.planning_number, BudgetPlanning.monthly_rent, BudgetPlanning.insurance_expense, 
                BudgetPlanning.transportation_expense, BudgetPlanning.communication_expense, BudgetPlanning.leisure_expense, 
                BudgetPlanning.shopping_expense, BudgetPlanning.education_expense, BudgetPlanning.medical_expense,
                BudgetPlanning.event_expense, BudgetPlanning.etc_expense, daily_data.available_money, daily_data.daily_spent_money, 
                daily_data.rest_money from daily_data left join BudgetPlanning on daily_data.user_id = BudgetPlanning.user_id where daily_data.user_id = ?`, [userID], function(error, result){
                    if(error) throw error;
                    else{
                        console.log(result[0])
                        res.send(result[0]);
                    }  
                });
                console.log("Before");
                
            });

            const PORT = 6000;
            app.listen(PORT, function(){
                console.log("Server is ready at "+ PORT);
            });

        });
    }).connect(config.tunnelConfig);
});