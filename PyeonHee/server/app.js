const express = require("express");
const app = express();
const config = require('./config');
const mysql = require('mysql2');
const { Client } = require('ssh2');
const sshClient = new Client();
var request = require('request');
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
                    //console.log(result[0]);

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
                                    db.query(`insert into daily_data(user_id, available_money, daily_spent_money, rest_money)
                                    values(?, 0, 0, 0)`, [userID], function(error2, check){
                                        const data = {
                                            status : 'success',
                                        }
                                        console.log(data);
                                        res.send(data);
                                    });
                                    
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

                if(second_type < 50){
                    mbti_type = mbti_type + 'C';
                } else {
                    mbti_type = mbti_type + 'H';
                }

                if(third_type < 50){
                    mbti_type = mbti_type + 'S';
                } else {
                    mbti_type = mbti_type + 'O';
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
                    if (error) throw error;
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
                db.query(`SELECT * FROM user WHERE user_id = ?`, [userID], function(error3, result3){
                    if(error3) throw error3;
                
                    const data = {
                        userName: result3[0].name,
                        userTier: result3[0].tier,
                        userStamp: result3[0].total_stamp,
                        userPoint: result3[0].total_point
                    }
                    console.log(data);
                    res.send(data);
                });
            });



            //예산계획추천페이지(모든 사용자 동일)
            app.get('/saveSelectBudgetPlan', function (req, res) {
                //console.log(req.query.userID);
                db.query(`SELECT BudgetPlanning.user_id, user.tier, user.job, BudgetPlanning.user_mbti, BudgetPlanning.user_age, 
                BudgetPlanning.planning_number, BudgetPlanning.planning_date, BudgetPlanning.user_income, BudgetPlanning.user_savings, 
                BudgetPlanning.like_number, BudgetPlanning.monthly_rent, BudgetPlanning.insurance_expense,BudgetPlanning.transportation_expense, 
                BudgetPlanning.communication_expense, BudgetPlanning.leisure_expense, BudgetPlanning.shopping_expense, BudgetPlanning.education_expense, 
                BudgetPlanning.medical_expense, BudgetPlanning.event_expense, BudgetPlanning.etc_expense, BudgetPlanning.subscribe_expense
                from user, BudgetPlanning  WHERE user.user_id = BudgetPlanning.user_id order by like_number desc limit 5,5`, function (error, result) {
                    if (error) throw error;
                    //console.log(result);
                    res.send(result);
                });
            });

            //사용자와 비슷한 MBTI 예산계획 추천
            app.get('/viewBudgetPlan', function (req, res) {
                //console.log(req.query);
                var userID = req.query.userID;
                db.query(`SELECT * FROM user WHERE user_id = ?`, [userID], function (error, result) {
                    if (error) throw error;
                    else{
                        //console.log(result[0]);
                        var userMBTI = result[0].mbti;
                        var userAge = result[0].age;
                        var userIncome = result[0].income;
                        //var userJob = result[0].job;
                        var income_minus = userIncome - 500000;
                        var income_plus = userIncome + 1000000;
                        var age_minus = userAge - 5;
                        var age_plus = userAge + 5;
                        db.query(`SELECT * FROM BudgetPlanning INNER JOIN user ON BudgetPlanning.user_id = user.user_id 
                        WHERE user_mbti =? and user_income between ? and ? and user_age between ? and ? order by like_number desc`, 
                        [userMBTI, income_minus, income_plus, age_minus, age_plus], function (error, result) {
                            if (error) throw error;
                            //console.log(result);
                            res.send(result);
                        });
                    }
                });
            });

            // 선택한 예산계획 상세보기
            app.get('/recommendedBudgetPlan', function (req, res) {
                //console.log(req.query.budgetPlanningID);
                var budgetPlanID = req.query.budgetPlanningID;
                var userMBTI; var userAge; var userIncome; var user_savings;
                var userLikeCount; var rent; var insurance; var traffic;
                var communication; var hobby; var shoppshoppinging_expense;
                var education; var medical; var event; var ect; var subscribe; var data;

                db.query(`SELECT * FROM BudgetPlanning WHERE planning_number =?`, [budgetPlanID], function (error, result) {
                    if (error) throw error;
                    //console.log(result[0]);
                    data = {
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
                        subscribe: result[0].subscribe_expense,
                        budgetPlanID: result[0].planning_number
                    }
                });
                db.query(`SELECT user_id FROM BudgetPlanning WHERE planning_number =?`, [budgetPlanID], function (error, result) {
                    if (error) throw error;
                    else {
                        var userID = result[0].user_id;
                        db.query(`SELECT * FROM Savings WHERE user_id =?`, [userID], function (error, result) {
                            if (error) throw error;
                            var data2 = {
                                data,
                                result
                            }
                            //console.log(data2);
                            res.send(data2);
                        });
                    }
                });
            });

            // 선택한 예산계획 보관함 저장
            app.post('/saveBudgetPlan', function (req, res) {
                //console.log(req.body);
                var userID = req.body.userID;
                var budgetPlanID = req.body.budgetPlanID;
                db.query(`INSERT INTO Storage(user_id, planning_number) SELECT ?,? FROM DUAL
                WHERE NOT EXISTS (SELECT user_id, planning_number FROM Storage WHERE user_id = ? and planning_number =?)`,
                    [userID, budgetPlanID, userID, budgetPlanID], function (error, result) {
                        if (error) throw error;
                        else {
                            const data = {
                                status: true
                            }
                            res.send(data);
                        }
                    });
            });

            // 선택한 예산계획 보관함 삭제
            app.post('/cancelBudgetPlan', function (req, res) {
                //console.log(req.body);
                var userID = req.body.userID;
                var budgetPlanID = req.body.budgetPlanID;
                db.query(`SELECT EXISTS (SELECT * FROM Storage WHERE user_id = ? and planning_number = ? limit 1) as success`,
                    [userID, budgetPlanID], function (error, result) {
                        if (error) throw error;
                        else {
                            if (result[0].success == 1) {
                                db.query(`DELETE FROM Storage WHERE user_id =? and planning_number =?`,
                                    [userID, budgetPlanID], function (error, result) {
                                        if (error) throw error;
                                        const data = {
                                            status: true
                                        }
                                        res.send(data);
                                    });
                            }
                        }
                    });
            });

            // 좋아요&취소 버튼 기능
            app.post('/likeBudgetPlan/', function (req, res) {
                //console.log(req.body);
                var budgetPlanID = req.body.budgetPlanID;
                var userLike = req.body.userLike;
                var userID = req.body.userID;
                if (userLike == false) {
                    db.query(`INSERT INTO LikeCount(user_id, planning_number) SELECT ?, ? FROM DUAL
                        WHERE NOT EXISTS (SELECT user_id, planning_number FROM LikeCount WHERE user_id =? and planning_number =?)`,
                        [userID, budgetPlanID, userID, budgetPlanID], function (error, result) {
                            if (error) throw error;
                            else {
                                db.query(`UPDATE LikeCount SET like_check = 1 WHERE user_id = ? and planning_number = ?;`,
                                    [userID, budgetPlanID], function (error, result) {
                                        if (error) throw error;
                                        else {
                                            db.query(`UPDATE BudgetPlanning SET like_number = like_number + 1 WHERE planning_number = ?;`,
                                                [budgetPlanID], function (error, result) {
                                                    if (error) throw error;
                                                    else {
                                                        console.log("좋아요 +1");
                                                        const data = {
                                                            status: true
                                                        }
                                                        res.send(data);
                                                    }
                                                });
                                        }
                                    });
                            }
                        });
                }
                else {
                    db.query(`UPDATE LikeCount SET like_check = 0 WHERE user_id = ? and planning_number = ?;`,
                        [userID, budgetPlanID], function (error, result) {
                            if (error) throw error;
                            else {
                                db.query(`UPDATE BudgetPlanning SET like_number = like_number - 1 WHERE planning_number = ?;`,
                                    [budgetPlanID], function (error, result) {
                                        if (error) throw error;
                                        else {
                                            console.log("좋아요 취소");
                                            const data = {
                                                status: false
                                            }
                                            res.send(data);
                                        }
                                    });
                            }
                        });
                }
            });

            // 좋아요 여부 확인
            app.post('/didLike', function (req, res) {
                //console.log(req.body);
                var userID = req.body.userID;
                var budgetPlanID = req.body.budgetPlanID;
                db.query(`SELECT EXISTS (SELECT * FROM LikeCount WHERE user_id = ? and planning_number = ? and like_check = 1 limit 1) as success`,
                    [userID, budgetPlanID], function (error, result) {
                        if (error) throw error;
                        else {
                            if (result[0].success == 1) {
                                const data = {
                                    status: true
                                }
                                res.send(data);
                            }
                            else{
                                const data = {
                                    status: false
                                }
                                res.send(data);
                            }
                        }
                    });
            });

            // 보관함 여부 확인
            app.post('/didStore', function (req, res) {
                //console.log(req.body);
                var userID = req.body.userID;
                var budgetPlanID = req.body.budgetPlanID;
                db.query(`SELECT EXISTS (SELECT * FROM Storage WHERE user_id = ? and planning_number = ? limit 1) as success`,
                    [userID, budgetPlanID], function (error, result) {
                        if (error) throw error;
                        else {
                            if (result[0].success == 1) {
                                const data = {
                                    status: true
                                }
                                res.send(data);
                            }
                            else{
                                const data = {
                                    status: false
                                }
                                res.send(data);
                            }
                        }
                    });
            });

            // 보관함에 저장된 예산계획서 확인
            app.get('/BudgetPlanCabinet', function (req, res) {
                //console.log(req.query.userID);
                var userID = req.query.userID;
                db.query(`SELECT DISTINCT BudgetPlanning.user_id, user.tier, user.job, BudgetPlanning.user_mbti, BudgetPlanning.user_age,
                BudgetPlanning.planning_number, BudgetPlanning.planning_date, BudgetPlanning.user_income, BudgetPlanning.user_savings,
                BudgetPlanning.like_number, BudgetPlanning.monthly_rent, BudgetPlanning.insurance_expense,BudgetPlanning.transportation_expense,
                BudgetPlanning.communication_expense, BudgetPlanning.leisure_expense, BudgetPlanning.shopping_expense, BudgetPlanning.education_expense,
                BudgetPlanning.medical_expense, BudgetPlanning.event_expense, BudgetPlanning.etc_expense, BudgetPlanning.subscribe_expense
                FROM user LEFT JOIN BudgetPlanning ON user.user_id = BudgetPlanning.user_id 
                LEFT JOIN Storage ON BudgetPlanning.planning_number = Storage.planning_number WHERE Storage.user_id = ?`, [userID],function (error, result) {
                    if (error) throw error;
                    //console.log(result);
                    res.send(result);
                });
            });

            // 예산계획 작성
            app.post('/submitBudgetPlan', function(req, res){
                console.log(req.body);
                var userID = req.body.userID;
                var income = req.body.income;
                var savings = req.body.savings;
                var fixedExpenditure = req.body.fixedExpenditure;
                var plannedExpenditure= req.body.plannedExpenditure;
                var monthlyRent= req.body.monthlyRent;
                var insurance = req.body.insurance;
                var transportation = req.body.transportation;
                var communication = req.body.communication;
                var subscription = req.body.subscription;
                var leisure = req.body.leisure;
                var shopping = req.body.shopping;
                var education = req.body.education;
                var medical = req.body.medical;
                var event = req.body.event;
                var etc = req.body.etc;
  
                //food,eatOut없음
                var userMBTI;
                var userAge;

                db.query(`SELECT * FROM user WHERE user.user_id=?`,[userID], function(error,result){
                    console.log(result);
                    if(error) throw error;
                    else {
                        userMBTI = result[0].mbti;
                        userAge = result[0].age;

                        db.query(`INSERT INTO BudgetPlanning(user_id, user_mbti, user_age,user_income, user_savings, monthly_rent,
                            insurance_expense,transportation_expense,communication_expense,
                            leisure_expense, shopping_expense ,education_expense, medical_expense,
                            event_expense, etc_expense, subscribe_expense) 
                            VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,[userID,userMBTI,userAge,income,savings,monthlyRent,
                                insurance,transportation,communication,leisure,shopping,education,medical,event,etc, subscription], function(error1,result1){
                                    if (error1) throw error1;
                                    else{
                                        db.query(`SELECT sum(savings_money) as total_savings_money FROM Savings WHERE user_id = ?`,[userID], function(error2,result2){
                                            if (error1) throw error1;
                                            else {
                                                db.query(`SELECT * FROM BudgetPlanning Where user_id = ? ORDER BY planning_number desc`, [userID], function(error3, result3){
                                                    if (error) throw error;
                        
                                                    else if(result.length != 0){
                                                        var dailyMoney = Calculate_Daily_Money(result3, result2);
                                                        console.log(result[0]);
                                                        db.query(`UPDATE daily_data SET available_money = ? WHERE user_id = ?`,[dailyMoney, userID], function(error4, result4){
                                                            if (error4) throw error4;
                                                            else{
                                                                const data = {
                                                                    status : 'success',
                                                                }
                                                                console.log(data);
                                                                res.send(data);
                                                            }
                                                        })
                                                } 
                                                else {
                                                    res.send([]);
                                                }
                                            });
                                        }
                                        });                                        
                                    }
                                });
                    }
                });
            });
            //저축계획 작성

            app.post('/saveSavingPlan', function(req, res){
                console.log(req.body);
                var userID = req.body.userID;
                var savingName = req.body.savingName;
                var savingMoney = req.body.savingMoney;
                var startDate = req.body.startDate;
                var savingsDay = req.body.savingsDay;
                var period = req.body.period;

                var startYear = startDate.substring(0,4);
                var startMonth = startDate.substring(5,7);
                var startDay = startDate.substring(8,10);

                if(startDay > savingsDay){
                    if(startMonth == '12'){
                        startYear = parseInt(startYear) + 1;
                        startMonth = '01';
                    }
                    else{
                        startMonth = parseInt(startMonth) + 1;
                    }
                }

                startDate = startYear+'-'+startMonth+'-'+ savingsDay;

                db.query(`INSERT INTO Savings(user_id, saving_name, savings_money, start_date, finish_date)
                VALUES(?, ?, ?, ?,DATE_ADD(?, INTERVAL ? MONTH))`,
                [userID, savingName, savingMoney, startDate, startDate, period],function(error, result){
                    if(error) throw error;
                    else{
                        
                        const data = {
                            status : 'success',
                        }
                        res.send(data);
                        console.log(data);
                    }
                });
            });    
            
            
            // 편히 메뉴의 데일리데이터의 저금계획
            app.post(`/daily/savings`, function(req, res){
                console.log(req.body);
                var userID = req.body.userID;
                db.query(`select saving_name, savings_money, start_date,finish_date, 
                        all_savings_money, saving_number from Savings where user_id = ?` , [userID], function(error, result){
                    if(error) throw error;
                    else{
                        console.log(result);
                        res.send(result);
                    }
                });
            });

            // 편히 메뉴의 데일리데이터의 권장소비금액과 카테고리별 금액
            app.post(`/daily`, function(req, res){
                // console.log(req.body);
                var userID = req.body.userID;
                db.query(`SELECT name FROM user WHERE user_id = ?`, [userID], function(error, name){
                    if(error) throw error;
                    else {
                        // console.log(name);
                        db.query(`select  BudgetPlanning.planning_number, BudgetPlanning.monthly_rent, BudgetPlanning.insurance_expense, 
                        BudgetPlanning.transportation_expense, BudgetPlanning.communication_expense, BudgetPlanning.leisure_expense, 
                        BudgetPlanning.shopping_expense, BudgetPlanning.education_expense, BudgetPlanning.medical_expense,
                        BudgetPlanning.event_expense, BudgetPlanning.etc_expense, BudgetPlanning.subscribe_expense, 
                        daily_data.available_money, daily_data.daily_spent_money, daily_data.rest_money 
                        FROM daily_data left join BudgetPlanning on daily_data.user_id = BudgetPlanning.user_id 
                        where daily_data.user_id = ? order by planning_number desc;`, [userID], function(error1, result1){
                            if(error1) throw error1;
                            else if(result1[0].planning_number != null){
                                console.log(result1[0])
                                db.query(`SELECT available_money, daily_spent_money FROM daily_data WHERE user_id = ?`, [userID], function(error2, result2){
                                    var daily_money = result2[0].available_money;
                                    var spend_money = result2[0].available_money - result2[0].daily_spent_money;
                                    if(error2) throw error2;
                                    else if(result2[0].length != 0){
                                        console.log(result2[0]);
                                        db.query(`SELECT tran_type, sum(tran_amt) as daily_amount FROM real_expense  
                                        WHERE user_id = ? AND inout_type = '출금' AND MONTH(now()) = SUBSTR(tran_date, 5,2) GROUP BY tran_type;`, [userID], function(error3, result3){
                                            console.log(result3[0]);
                                            if(error3) throw error3;
                                            else if(result3[0] != 0){
                                                console.log(result3);
                                                data = {
                                                    userName : name,
                                                    planamt : result1[0],
                                                    realamt : result3,
                                                    daily_money : daily_money,
                                                    spend_money : spend_money
                                                };
                                                console.log('이거 다 들어가있는거야', data);
                                                res.send(data);
                                            }
                                            else{
                                                data = {
                                                    userName : name,
                                                    planamt : result1[0],
                                                    realamt : [],
                                                    daily_money : daily_money,
                                                    spend_money : spend_money,
                                                };
                                                console.log('이거 거래내역 없는거야', data);
                                                res.send(data);
                                            }
                                        })
    
                                    }
                                    else{
                                        data = {
                                            userName : name,
                                            planamt : result1[0],
                                            realamt : [],
                                            daily_money : daily_money,
                                            spend_money : spend_money,
                                        };
                                        console.log('이거 실제금액 없는거야', data);
                                        res.send(data);
                                    }
                                })
                                
                            } else{
                                data = {
                                    userName : name,
                                    planamt : [],
                                    realamt : [],
                                    daily_money : 0,
                                    spend_money : 0
                                };
                                console.log('이거 계획조차 안한거야', data);
                                res.send(data);
                            }
                        });
                    }
                });
            });

        
            function Calculate_Daily_Money(result, result1){
                var available_money;
                var fixedExp;
                var plannedExp;
                var dailyMoney;

                let today = new Date();
                let today_date = today.getDate();
                let today_month = today.getMonth() + 1;
                let today_years = today.getFullYear();

                let lastTemp = new Date(today_years, today_month, 0);
                let lastDate = lastTemp.getDate();


                fixedExp = result[0].monthly_rent + result[0].insurance_expense + result[0].communication_expense + result[0].subscribe_expense;
                plannedExp = result[0].transportation_expense + result[0].leisure_expense + result[0].shopping_expense + result[0].education_expense 
                + result[0].medical_expense + result[0].event_expense + result[0].etc_expense;
                totalSavings = parseInt(result1[0].total_savings_money);

                dailyMoney = result[0].user_income - fixedExp - plannedExp - totalSavings;
                dailyMoney = dailyMoney / lastDate;
                dailyMoney = Math.floor(dailyMoney);

                return dailyMoney;
            }
            // 가계부 메뉴의 본인 데이터 
            app.get(`/myBudgetPlan`, function(req, res){
                console.log(req.query.userID);
                var userID = req.query.userID;
                var dailyMoney;
                db.query(`SELECT sum(savings_money) as total_savings_money FROM Savings WHERE user_id = ?`,[userID], function(error1,result1){
                    if (error1) throw error1;
                    else {
                        db.query(`SELECT * FROM BudgetPlanning Where user_id = ? ORDER BY planning_number desc`, [userID], function(error, result){
                            if (error) throw error;

                            else if(result.length != 0){
                                dailyMoney = Calculate_Daily_Money(result, result1);
                                console.log(result[0]);
                                var data = {
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
                                subscribe: result[0].subscribe_expense,
                                budgetPlanID: result[0].planning_number,
                                sumOfSavings : parseInt(result1[0].total_savings_money),
                                dailyMoney : dailyMoney
                                };
                            console.log(data);
                            res.send(data);
                        } 
                        else {
                            res.send([]);
                        }
                    });
                }
                });
            });


            // 캘린더 데이터
            app.get(`/calendar`, function(req, res) {
                console.log(req.query.userID)
                var userID = req.query.userID;
                db.query(`SELECT tran_date, inout_type,  sum(tran_amt) as daily_amount FROM real_expense 
                WHERE user_id = ? AND inout_type = '출금' GROUP BY tran_date; `, [userID], function(error1, result1){
                    if(error1) throw error1;
                    else if(result1 != 0) {
                        // console.log(result1);
                        db.query(`SELECT tran_date, inout_type, sum(tran_amt) as daily_amount FROM real_expense 
                        WHERE user_id = ? AND inout_type = '입금' GROUP BY tran_date; `, [userID], function(error2, result2){
                            if(error2) throw error2;
                            // console.log(result2);
                            data = {
                                in : result2,
                                out : result1
                            };
                            console.log(data);
                            res.send(data);
                        });
                    }
                })
            });

            
            // 캘린더 클릭시
            app.get(`/calendar/click`, function(req, res) {
                console.log(req.query.userID);
                console.log(req.query.today);
                var userID = req.query.userID;
                var today = req.query.today;
                db.query(`SELECT print_content,tran_type, inout_type, tran_amt FROM real_expense WHERE user_id = ?  AND tran_date = ?;`, [userID, today], function(error, result){
                    console.log(result);
                    if(error) throw error;
                    else if (result != 0) {
                        console.log(result);
                        res.send(result);
                    }
                    else {
                        res.send([]);
                    }
                });
            });

            // 사용자 토큰 발급
            app.get('/Together', function (req, res) {
                console.log(req);
                res.send("<h1 style=\"text-align: center; vertical-align: center;\">인증을 진행중입니다.</h1> <h4 style=\"text-align: center; vertical-align: center;\">뒤로가기를 눌러 확인해주세요.</h4>");
                //프론트에서 발급 받고 여기로 자동 redirect되므로 프론트에서 진행
                /*
                var option = {
                    method: "POST",
                    url: "https://testapi.openbanking.or.kr/oauth/2.0/token",
                    headers: "",
                    form: {
                        code: authCode,
                        client_id: config.client_id,
                        client_secret: config.client_secret,
                        redirect_uri: config.redirect_uri,
                        grant_type: 'authorization_code'
                    }
                }
                request(option, function (err, response, body) {
                    var result = JSON.parse(body);
                    var access_token;
                    var user_seq_no;
                    const data = {
                        access_token: result.access_token,
                        user_seq_no: result.user_seq_no
                    }
                    res.send(data);
                    console.log(data);
                });
                */
            });

            // 사용자 토큰 발급 CALLBACK 
            app.post('/saveAccount', function (req, res) {
                console.log(req.body);
                var userID = req.body.userID;
                var userToken = req.body.userToken;
                var userSeqNo = req.body.userSeqNo;
                db.query(`SELECT EXISTS (SELECT * FROM openBankingUser WHERE user_id = ? and user_seq_no = ? limit 1) as success`, 
                [userID, userSeqNo], function (error, result) {
                    if (error) throw error;
                    else {
                        if (result[0].success == 1) { //사용자 토큰갱신
                            db.query(`UPDATE openBankingUser SET access_token = ? WHERE user_seq_no = ? AND user_id =?`,
                                [userToken, userSeqNo, userID], function (error, result) {
                                    if (error) throw error;
                                    else {
                                        const data = {
                                            status: 'success',
                                        }
                                        res.send(data);
                                        console.log("사용자 토큰 갱신 완료 (및 계좌등록 완료)");
                                    }
                                });
                        }
                        else { // 신규 사용자 토큰 등록
                            db.query(`INSERT INTO openBankingUser(user_id, access_token, user_seq_no)
                                VALUES(?, ?, ?)`, [userID, userToken, userSeqNo], function (error, result) {
                                if (error) throw error;
                                else {
                                    const data = {
                                        status: 'success',
                                    }
                                    res.send(data);
                                    console.log("사용자 토큰 등록 완료 (및 계좌등록 완료)");
                                }
                            });
                        }
                    }
                });
            });

            // 연동한 계좌목록 조회
            app.get('/accountList', function (req, res) {
                console.log(req.query);
                var userID = req.query.userID;
                db.query(`SELECT EXISTS (SELECT * FROM openBankingUser WHERE user_id = ? limit 1) as success`, [userID], function (error, result) {
                    if (error) throw error;
                    else {
                        if (result[0].success == 1) { //오픈뱅킹 연동한 사용자
                            db.query('SELECT * FROM openBankingUser WHERE user_id = ?', [userID], function (error, result) {
                                if (error) throw error;
                                var option = {
                                    method: "GET",
                                    url: "https://testapi.openbanking.or.kr/v2.0/user/me",
                                    headers: {
                                        Authorization: "Bearer" + result[0].access_token
                                    },
                                    qs: {
                                        user_seq_no: result[0].user_seq_no
                                    }
                                }
                                request(option, function (error, response, body) {
                                    if (error) throw error;
                                    var requestResultJSON = JSON.parse(body);
                                    //res.json(requestResultJSON);
                                    //console.log(requestResultJSON);

                                    for (i in requestResultJSON['res_list']) {
                                        var fintech_use_num = requestResultJSON['res_list'][i]['fintech_use_num']; //핀테크이용번호
                                        var account_alias = requestResultJSON['res_list'][i]['account_alias']; //출금계좌별명
                                        var bank_code_std = requestResultJSON['res_list'][i]['bank_code_std']; //출금기관표준코드
                                        var bank_name = requestResultJSON['res_list'][i]['bank_name']; //출금기관명
                                        var account_num_masked = requestResultJSON['res_list'][i]['account_num_masked']; //계좌번호
                                        var account_holder_name = requestResultJSON['res_list'][i]['account_holder_name']; //예금주성명
                                        db.query(`INSERT IGNORE INTO bank_account(user_id, fintech_use_num, account_alias, bank_code_std, bank_name, 
                                            account_num_masked, account_holder_name) SELECT ?, ?, ?, ?, ?, ?, ? FROM DUAL WHERE NOT EXISTS 
                                            (SELECT user_id, fintech_use_num, account_alias, bank_code_std, bank_name, account_num_masked, account_holder_name FROM bank_account 
                                            WHERE user_id = ?  AND fintech_use_num =? AND account_alias=? AND bank_code_std =? AND bank_name =? AND account_num_masked=? AND account_holder_name =?)`,
                                            [userID, fintech_use_num, account_alias, bank_code_std, bank_name, account_num_masked, account_holder_name, 
                                            userID, fintech_use_num, account_alias, bank_code_std, bank_name, account_num_masked, account_holder_name], function (error, result) {
                                                if (error) throw error;
                                                //console.log("등록된 계좌 DB저장완료");
                                        });
                                    }
                                    db.query(`SELECT * FROM bank_account WHERE user_id = ?`, [userID], function (error, result) {
                                        if (error) throw error;
                                        res.send(result);
                                        console.log(result);
                                        //console.log("등록된 계좌 전송완료");
                                    });
                                });
                            });
                        }
                        else { // 신규 사용자(오픈뱅킹 연동 X)
                            res.send('[]');
                            console.log("연동내역이 없습니다.");
                        }
                    }
                });
            });

            // 오픈뱅킹 모든 계좌연동 해지 (사용자탈퇴 API 요청을 받은 날의 익 영업일 중에 해지처리 됨)
            app.get('/close', function (req, res) {
                console.log(req.query);
                var userID = req.query.userID;
                db.query(`SELECT EXISTS (SELECT * FROM openBankingUser WHERE user_id = ? limit 1) as success`, [userID], function (error, result) {
                    if (error) throw error;
                    else {
                        if (result[0].success == 1) { //오픈뱅킹 연동한 사용자
                            db.query('SELECT * FROM openBankingUser WHERE user_id = ?', [userID], function (error, result) {
                                if (error) throw error;
                                console.log(result);
                                var option = {
                                    method: "POST",
                                    url: "https://testapi.openbanking.or.kr/v2.0/user/close",
                                    headers: {
                                        Authorization: "Bearer" + result[0].access_token
                                    },
                                    body: JSON.stringify({
                                        client_use_code: config.client_use_code,
                                        user_seq_no: result[0].user_seq_no
                                    })
                                }
                                request(option, function (error, response, body) {
                                    var requestResultJSON = JSON.parse(body);
                                    //console.log(requestResultJSON);
                                    if (requestResultJSON['rsp_code'] == "A0000") { //[사용자연결동의 해제 상태]
                                        const data = {
                                            status: true
                                        }
                                        res.send(data);
                                        console.log("오픈뱅킹 연동 해지 완료");
                                        db.query(`DELETE FROM openBankingUser WHERE user_id =?`, [userID], function (error, result) {
                                            if (error) throw error;
                                            console.log("오픈뱅킹 연동 DB 데이터 삭제 완료");
                                        });
                                    }
                                });
                            });
                        }
                        else { // 오픈뱅킹 연동 X 사용자
                            const data = {
                                status: false
                            }
                            res.send(data);
                            console.log("연동내역이 없습니다. 연동해지 불가능");
                        }
                    }
                });
            });

            // 연동한 출금계좌별명 변경
            app.post('/update_info', function (req, res) {
                var userID = req.body.userID;
                var fintechUseNum = req.body.fintech_use_num;
                var newAlias = req.body.newAlias;//새로 변경할 계좌별명
                db.query(`SELECT EXISTS (SELECT * FROM bank_account WHERE fintech_use_num = ? limit 1) as success`, [fintechUseNum], function (error, result) {
                    if (error) throw error;
                    else {
                        if (result[0].success == 1) { //변경할 출금계좌
                            db.query('SELECT * FROM openBankingUser WHERE user_id = ?', [userID], function (error, result) {
                                if (error) throw error;
                                var option = {
                                    method: "POST",
                                    url: "https://testapi.openbanking.or.kr/v2.0/account/update_info",
                                    headers: {
                                        Authorization: "Bearer" + result[0].access_token
                                    },
                                    body: JSON.stringify({
                                        fintech_use_num: fintechUseNum,
                                        account_alias: newAlias
                                    })
                                }
                                request(option, function (error, response, body) {
                                    if (error) throw error;
                                    var requestResultJSON = JSON.parse(body);
                                    var new_alias = requestResultJSON['account_alias']; //변경된 출금계좌별명
                                    if (requestResultJSON['rsp_code'] == "A0000") {
                                        db.query(`UPDATE bank_account SET account_alias = ? WHERE fintech_use_num = ?`, [new_alias, fintechUseNum], function (error, result) {
                                            if (error) throw error;
                                            else {
                                                const data = {
                                                    status: 'success',
                                                }
                                                res.send(data);
                                                console.log("출금계좌별명 변경완료");
                                            }
                                        });
                                    }
                                    else{
                                        console.log("출금계좌별명 변경실패");
                                    }
                                });
                            });
                        }
                        else {
                            console.log("DB에 저장된 계좌가 없습니다.");
                        }
                    }
                });
            });

            /*
            // 선택한 계좌 잔액 조회
            app.post('/balance', function (req, res) {
                var userID = req.body.userID;
                var ranNum = Math.floor(Math.random() * 1000000000);
                var bankTranID = config.client_use_code + 'U' + ranNum;
                var fintechUseNum = req.body.fintech_use_num;

                db.query('SELECT * FROM openBankingUser WHERE user_id = ?', [userID], function (error, result) {
                    if (error) throw error;
                    var option = {
                        method: "GET",
                        url: "https://testapi.openbanking.or.kr/v2.0/account/balance/fin_num",
                        headers: {
                            Authorization: "Bearer" + result[0].accesstoken
                        },
                        qs: {
                            bank_tran_id: bankTranID,
                            fintech_use_num: fintechUseNum,
                            tran_dtime: "20211119000000"//현재날짜시간으로 변경
                        }
                    }
                    request(option, function (error, response, body) {
                        var requestResultJSON = JSON.parse(body);
                        if (requestResultJSON['rsp_code'] == "A0000") {
                            res.json(requestResultJSON);
                            console.log("잔액조회 완료");
                        }
                        else {
                            res.json(requestResultJSON);
                            console.log("잔액조회 실패");
                        }
                    });
                });
            });
            */

            // 사용자의 연동한 계좌 내역 DB저장 (선택한 계좌 거래내역 조회_핀테크이용번호 사용)_데일리업데이트
            app.get('/saveTranHistory', function (req, res) {
                var userID = req.query.userID;
                db.query(`SELECT EXISTS (SELECT * FROM openBankingUser WHERE user_id = ? limit 1) as success`, [userID], function (error, result) {
                    if (error) throw error;
                    else {
                        if (result[0].success == 1) { //오픈뱅킹 연동한 사용자
                            db.query(`SELECT access_token FROM openBankingUser WHERE user_id = ?`, [userID], function (error, result) {
                                if (error) throw error;
                                else {
                                    var accesstoken = result[0].access_token;
                                    db.query(`SELECT fintech_use_num FROM bank_account WHERE user_id = ?`, [userID], function (error, result) {
                                        if (error) throw error;
                                        else {
                                            for (j in result) {
                                                var fintechUseNum = result[j].fintech_use_num;
                                                //console.log(fintechUseNum);
                                                var ranNum = Math.floor(Math.random() * 1000000000);
                                                var bankTranID = config.client_use_code + 'U' + ranNum;
                                                var option = {
                                                    method: "GET",
                                                    url: "https://testapi.openbanking.or.kr/v2.0/account/transaction_list/fin_num",
                                                    headers: {
                                                        Authorization: "Bearer" + accesstoken
                                                    },
                                                    qs: {
                                                        bank_tran_id: bankTranID,
                                                        fintech_use_num: fintechUseNum,
                                                        inquiry_type: "A", //조회구분코드 “A”:All, “I”:입금, “O”:출금
                                                        inquiry_base: "D", //조회기준코드 “D”:일자, “T”:시간
                                                        from_date: "20200101", // 조회시작일자
                                                        to_date: "20200101", //조회종료일자
                                                        sort_order: "D", //정렬순서 “D”:Descending, “A”:Ascending
                                                        tran_dtime: "20211119000000"//현재날짜시간으로 변경
                                                    }
                                                }
                                                request(option, function (error, response, body) {
                                                    var requestResultJSON = JSON.parse(body);
                                                    var bankName = requestResultJSON['bank_name'];
                                                    var balanceAmt = requestResultJSON['balance_amt'];
                                                    fintechUseNum = requestResultJSON['fintech_use_num'];
                                                    if (requestResultJSON['rsp_code'] == "A0000") {
                                                        for (i in requestResultJSON['res_list']) {
                                                            var tran_date = requestResultJSON['res_list'][i]['tran_date']; //거래일자
                                                            var tran_time = requestResultJSON['res_list'][i]['tran_time']; //거래시간
                                                            var inout_type = requestResultJSON['res_list'][i]['inout_type']; //입출금구분
                                                            var tran_type = requestResultJSON['res_list'][i]['tran_type']; //거래구분
                                                            var print_content = requestResultJSON['res_list'][i]['print_content']; //통장인자내용
                                                            var tran_amt = requestResultJSON['res_list'][i]['tran_amt']; //거래금액
                                                            var after_balance_amt = requestResultJSON['res_list'][i]['after_balance_amt']; //거래후잔액
                                                            var branch_name = requestResultJSON['res_list'][i]['branch_name']; //거래점명

                                                            db.query(`INSERT IGNORE INTO real_expense(user_id, fintech_use_num, bank_name, balance_amt, tran_date, 
                                                                    tran_time, inout_type, tran_type, print_content, tran_amt, after_balance_amt, branch_name) SELECT ?, ?, ?, ?, ?, ?, ? ,?, ?, ?, ?, ?
                                                                    FROM DUAL WHERE NOT EXISTS (SELECT user_id, fintech_use_num, bank_name, balance_amt, tran_date, 
                                                                    tran_time, inout_type, tran_type, print_content, tran_amt, after_balance_amt, branch_name 
                                                                    FROM real_expense WHERE user_id = ?  AND fintech_use_num =? AND bank_name=? AND balance_amt =? AND tran_date =? 
                                                                    AND tran_time =? AND inout_type=? AND tran_type =? AND print_content =? AND tran_amt =? AND after_balance_amt =? AND branch_name =?)`,
                                                                [userID, fintechUseNum, bankName, balanceAmt, tran_date, tran_time, inout_type, tran_type, print_content, tran_amt,
                                                                    after_balance_amt, branch_name, userID, fintechUseNum, bankName, balanceAmt, tran_date, tran_time, inout_type, tran_type, print_content, tran_amt,
                                                                    after_balance_amt, branch_name], function (error, result) {
                                                                        if (error) throw error;
                                                                        /*db.query(`SELECT * FROM real_expense WHERE user_id = ? AND fintech_use_num = ?`, [userID, fintechUseNum], function (error, result) {
                                                                            if (error) throw error;
                                                                            res.send(result);
                                                                            //console.log(result);
                                                                            console.log("거래내역 조회 완료 (거래내역 전송)");
                                                                        });*/
                                                                    });
                                                        }
                                                    }
                                                    /*else {
                                                        console.log("거래내역 조회 실패");
                                                    }*/
                                                });
                                            }
                                        }
                                    });
                                }
                            });
                        }
                        /*
                        else { // 신규 사용자(오픈뱅킹 연동 X)
                            console.log("연동내역이 없습니다.");
                        }*/
                    }
                });

            });

            // 최근거래내역
            app.post('/latestTranList', function (req, res) {
                var userID = req.body.userID;
                var now = new Date();
                var year = now.getFullYear();
                var month = now.getMonth() + 1;
                var date = now.getDate();
                //now = year + '-' + month + '-' + date;
                now = year + "" + month + "" + date;
                //var fintechUseNum = req.body.fintechUseNum;
                db.query(`SELECT * FROM real_expense WHERE user_id = ? AND tran_date = ? AND state = 0`,
                    [userID, now], function (error, result) {
                        if (error) throw error;
                        else {
                            console.log('최근');
                            console.log(result);
                            res.send(result);
                        }
                    });
            });

            // 종합 거래내역
            app.post('/tranList', function (req, res) {
                var userID = req.body.userID;
                //var fintechUseNum = req.body.fintechUseNum;
                db.query(`SELECT * FROM real_expense WHERE user_id = ? AND state = 1 ORDER BY tran_date desc`,
                    [userID], function (error, result) {
                        if (error) throw error;
                        else {
                            console.log('거래');
                            console.log(result);
                            res.send(result);
                        }
                    });
            });

            // 카테고리 설정
            app.post('/update_category', function (req, res) {
                console.log("/update_category 카테고리 변경");
                var userID = req.body.userID;
                var fintech = req.body.fintech;
                var tranCate = req.body.tranCate;
                var tranDate = req.body.tranDate;
                var tranTime = req.body.tranTime;
                var tranDate = tranDate.substring(0, 10);
                db.query(`UPDATE real_expense SET state = 1, tran_type = ? WHERE user_id = ? AND fintech_use_num =?
                AND tran_date = ? AND tran_time =?`, [tranCate, userID, fintech, tranDate, tranTime], function (error, result) {
                    if (error) throw error;
                    else {
                        const data = {
                            status: 'success'
                        }
                        res.send(data);
                        console.log("카테고리 설정완료", data);
                    }
                });
            });

            const PORT = 8000;

            app.listen(PORT, function(){
                console.log("Server is ready at "+ PORT);
            });

        });
    }).connect(config.tunnelConfig);
});