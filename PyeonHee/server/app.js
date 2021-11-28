const express = require("express");
const app = express();
const config = require('./config');
const mysql = require('mysql2');
const { Client } = require('ssh2');
const sshClient = new Client();
const bcrypt = require('bcrypt');
var request = require('request');
const admin = require('firebase-admin');
const schedule = require('node-schedule');
/*
var Iamport = require("iamport");
var iamport = new Iamport({
    impkey: config.REST_API,
    impsecret: config.REST_API_SECRET
});
app.use(bodyParser.json());

//결제번호, 주문번호 추출
app.post("/Together_iamport", async (req, res) => {
    try {
        const { imp_uid, merchant_uid } = req.body;
    } catch (e) {
        res.status(400).send(e);
    }
});
*/
let serviceAccount = require('./pyeonhee-AccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

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

            global_id = '';
            // 12시가 되면 일일권장금액 이행 여부 확인
            schedule.scheduleJob('0 0 0 * * *', async()=>{
                db.query(`SELECT * FROM daily_data WHERE user_id = ?`, [global_id], function(error1, result1){
                    console.log(result[0]);
                    if(error1) throw error1;
                    else{
                        if(result1[0].daily_spent_money <= result1[0].available_money){
                            daily_count = result1[0].daily_count + 1;
                            db.query(`UPDATE daily_data SET daily_count = ? WHERE user_id = ?`, [daily_count, global_id], function(error2, result2){
                                if(error2) throw error2;
                                console.log(result2);
                            })
                        }
                    }
                })
            });

            //매달 1일 모든 예산계획서 state를 0으로 초기화
            schedule.scheduleJob('0 0 0 1 * *', async()=>{
                db.query(`UPDATE BudgetPlanning SET state = 0`, function(error, result){
                    if(error) throw error;
                    console.log(result);
                })
            });

            // 30분마다 일일소비량 업데이트
            schedule.scheduleJob('0 */30 * * * *', async()=>{
                db.query(`SELECT sum(tran_amt) as spend_money FROM real_expense WHERE DAY(now()) = SUBSTR(tran_date, 7,2) AND user_id = ?`,[global_id], function(error1, result1){
                    if(error1) throw error1;
                    else{
                        if(result1.length === 0)
                            console.log('소비한 내역이 없습니다.');
                        else{
                            console.log(result1);
                            daily_spent_money = result1[0].spend_money
                            db.query(`UPDATE daily_data SET  daily_spent_money= ? WHERE user_id = ?`,[daily_spent_money, global_id], function(error2, result2){
                                   if(error2) throw error2;
                                console.log(result2);
                            })
                        }
                    }
                    
                })
            });
            
            //일일권장 소비금액 (잔액 푸시알림)
            // schedule.scheduleJob('*/30 * * * * *', function (){
            //     db.query(`SELECT * FROM user WHERE deviceToken IS NOT NULL`, function (error, result) {
            //         if (error) throw error;
            //         else{
            //             for (i in result) {
            //                 (function(i){
            //                     var userID = result[i].user_id;
            //                     var deviceToken = result[i].deviceToken;
            //                     db.query(`SELECT EXISTS (SELECT * FROM bank_account WHERE user_id = ? limit 1) as success`, [userID], function (error, result) {
            //                         if (error) throw error;
            //                         else {
            //                             var now = new Date();
            //                             var year = now.getFullYear();
            //                             var month = now.getMonth() + 1;
            //                             var date = now.getDate();
            //                             now = year + "" + month + "" + date;
            //                             //console.log("오늘날짜 확인 : ", now);
            //                             if (result[0].success == 1) { //계좌를 연동한 사용자(푸시알림 가능)
            //                                 db.query(`SELECT * FROM real_expense WHERE user_id = ? AND tran_date = ? AND alarm = 0`, [userID, now], function (error, result) {
            //                                     if (error) throw error;
            //                                     else {
            //                                         if (result[0]!= undefined) { //계좌연동 & 거래내역 존재
            //                                             var tranAmt = result[0].tran_amt;
            //                                             console.log('최근 거래내역 존재 푸시알림보내기 + ',userID);
            //                                             var dailyMoney;
            //                                             var balanceMoney;
            //                                             db.query(`SELECT sum(savings_money) as total_savings_money FROM Savings WHERE user_id = ?`, [userID], function (error, result1) {
            //                                                 if (error) throw error;
            //                                                 else {
            //                                                     db.query(`SELECT * FROM BudgetPlanning Where user_id = ? ORDER BY planning_number desc`, [userID], function (error, result) {
            //                                                         if (error) throw error;
            //                                                         else{
            //                                                             if (result[0] != undefined) {
            //                                                                 dailyMoney = Calculate_Daily_Money(result, result1);
            //                                                                 balanceMoney = dailyMoney - tranAmt;
            //                                                                 console.log('[출금]', tranAmt,'원 **하루권장소비량', balanceMoney +'원 남았습니다.**');

            //                                                                 let target_token = deviceToken;//알림을 받을 디바이스의 토큰값
            //                                                                 let message = {
            //                                                                     notification: {
            //                                                                         title: '[출금]' + tranAmt + '원',
            //                                                                         body: '**하루권장소비량' + balanceMoney +'원 남았습니다.**'
            //                                                                     },
            //                                                                     token: target_token,
            //                                                                 }
            //                                                                 admin.messaging().send(message)
            //                                                                     .then(function (response) {
            //                                                                         console.log('푸시알림메시지 전송성공!', response)
            //                                                                     })
            //                                                                     .catch(function (error) {
            //                                                                         console.log('푸시알림메시지 전송실패!', error)
            //                                                                     })
            //                                                             }
            //                                                         }
            //                                                     });
            //                                                 }
            //                                             });
            //                                             db.query(`UPDATE real_expense SET alarm = 1 WHERE user_id = ? AND tran_date = ?`, [userID, now], function (error, result) {
            //                                                 if (error) throw error;
            //                                                 //console.log("알림완료 --> alarm = 1 로 변경");
            //                                             });
            //                                         }
            //                                         else {//계좌연동 but.거래내역 존재X
            //                                             console.log(userID, "계좌연동 O but.최근거래내역 X");
            //                                         }
            //                                     }
            //                                 });
            //                             }
            //                             else {//계좌연동 X 사용자
            //                                 console.log(userID, "계좌연동 X");
            //                             }
            //                         }
            //                     });
            //                 })(i);
            //             }
            //         }
            //     });
            // });
            
            // 로그인 기능 (LoginScreen.js)
            app.post('/login', function(req, res){
                console.log(req.body);
                var userID = req.body.userID;
                var userPassword = req.body.userPassword;
                var deviceToken = req.body.deviceToken;
                global_id = req.body.userID;
                db.query(`SELECT * FROM user WHERE user.user_id=?`,[userID], function(error,result){
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
                            const same = bcrypt.compareSync(userPassword, result[0].password);
                            if(same){
                                db.query(`UPDATE user SET deviceToken = ? WHERE user_id = ?`,
                                    [deviceToken, userID], function (error, result) {
                                        if (error) throw error;
                                        console.log("디바이스 토큰값 저장 완료");
                                    });
                                const data = {
                                    status : 'success',
                                    userID : result[0].user_id,
                                    userMbti : result[0].mbti,
                                    userAge : result[0].age,
                                };
                                console.log(data);
                                res.send(data);
                            }
                            else {
                                const data = {
                                    status : 'failed',
                                }
                                console.log(data);
                                res.send(data);
                            }
                        }
                    }
                });
            });

            //로그아웃(디바이스 토큰 삭제)
            app.get('/removeDeviceToken', function (req, res) {
                var userID = req.query.userID;
                db.query(`UPDATE user SET deviceToken = null WHERE user_id = ?`,
                    [userID], function (error, result) {
                        if (error) throw error;
                        const data = {
                            status: 'success',
                        }
                        res.send(data);
                    });
            });

            // mbti진행
            app.get('/getMbti', function (req, res) {
                var userID = req.query.userID;
                db.query(`SELECT mbti FROM user WHERE user_id = ?`, [userID], function (error, result) {
                    if (error) throw error;
                    else {
                        if (result[0].mbti != null) {
                            const data = {
                                status: 'true',
                            }
                            res.send(data);
                        }
                        else {
                            const data = {
                                status: 'false',
                            }
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
                const encryptedPassowrd = bcrypt.hashSync(userPassword, 10)
                console.log(encryptedPassowrd);
                db.query(`SELECT * FROM user WHERE user.user_id=?`,[userID], function(error1,check){
                    console.log(check);
                    if(error1) throw error1;
                    else{
                        if(check.length === 0) {
                            db.query(`insert into user(user_id, password, name)
                                values (?, ?, ?)`,[userID,encryptedPassowrd,userName], function(error2,result){
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
                var description= '';

                if(first_type > 50){
                    mbti_type = mbti_type + 'I';
                    description = description + '당신은 계획적으로 사전에 생각하고 소비하기보다 필요에 맞춰서 그때그때 사용하는 편입니다. ';
                } else {
                    mbti_type = mbti_type + 'P';
                    description = description + '당신은 소비하기전에 계획했던 범위에서 벗어나지 않도록 사전에 생각하고 사용하는 편입니다. ';
                }

                if(second_type < 50){
                    mbti_type = mbti_type + 'C';
                    description = description + '수입이 생기면 저금보다 일단 필요한 부분에 있어서 소비하고 현재를 즐기는 것을 선호하시네요. ';
                } else {
                    mbti_type = mbti_type + 'H';
                    description = description + '수입이 생기면 당장 필요한 것들을 소비하기보다 미래를 위해 저금을 해 모으는 것을 선호하십니다. ';
                }

                if(third_type < 50){
                    mbti_type = mbti_type + 'S';
                    description = description + '종종 본인 스스로에게 선물을 해주기도 하고 가끔 좋아하는 음식을 먹으며 스트레스를 푸시네요. ';
                } else {
                    mbti_type = mbti_type + 'O';
                    description = description + '종종 친구들에게 해줄 선물들을 고르면서 좋아하는 반응을 보며 즐기시는 편이시네요. ';
                }
                
                if(fourth_type > 50){
                    mbti_type = mbti_type + 'E';
                    description = description + '소비를 크게 차지하는 부분은 쇼핑을 위주로 하기보다 취미나 사람들을 만나고 경험적인 일을 쌓는데 주로 사용하십니다. ';
                } else {
                    mbti_type = mbti_type + 'M';
                    description = description + '소비를 크게 차지하는 부분은 취미나 사람들을 만나는데 주로 사용하시기보다 기분전환을 위해 쇼핑을 하시는 것을 좋아하십니다. ';
                }

                console.log(mbti_type);
                console.log(description);

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
                    description : description
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
                    else{
                        const data = {
                            userName: result3[0].name,
                            userTier: result3[0].tier,
                            userStamp: result3[0].total_stamp,
                            userPoint: result3[0].total_point,
                            userMbti : result3[0].mbti,
                        }
                        console.log(data);
                        res.send(data);
                    }
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
                from user, BudgetPlanning  WHERE user.user_id = BudgetPlanning.user_id order by like_number desc limit 5,10`, function (error, result) {
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
                            event_expense, etc_expense, subscribe_expense, state) 
                            VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,[userID,userMBTI,userAge,income,savings,monthlyRent,
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
            //예산계획 수정 

            app.post('/editBudget', function(req,res){
                console.log(req.body);
                
                var userID = req.body.userID;
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

                db.query(`SELECT * FROM user WHERE user.user_id=?`, [userID], function(error,result){
                    console.log(result);
                    if(error) throw error;
                    else {
                        userMBTI = result[0].mbti;
                        userAge = result[0].age;

                        db.query(`UPDATE BudgetPlanning SET monthly_rent=?,insurance_expense=?,transportation_expense=?,communication_expense=?,
                            leisure_expense=?, shopping_expense=?,education_expense=?, medical_expense=?,
                            event_expense=?, etc_expense=?, subscribe_expense=? WHERE user_id =?`,[monthlyRent,insurance,transportation,communication,
                                leisure,shopping,education,medical,event,etc,subscription,userID], function(error1,result1){
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
                })
            })
            
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
                        db.query(`SELECT BudgetPlanning.planning_number, BudgetPlanning.monthly_rent, BudgetPlanning.insurance_expense, 
                        BudgetPlanning.transportation_expense, BudgetPlanning.communication_expense, BudgetPlanning.leisure_expense, 
                        BudgetPlanning.shopping_expense, BudgetPlanning.education_expense, BudgetPlanning.medical_expense,
                        BudgetPlanning.event_expense, BudgetPlanning.etc_expense, BudgetPlanning.subscribe_expense, 
                        daily_data.available_money, daily_data.daily_spent_money, daily_data.rest_money 
                        FROM daily_data left join BudgetPlanning on daily_data.user_id = BudgetPlanning.user_id 
                        where daily_data.user_id = ? AND BudgetPlanning.state = 1;`, [userID], function(error1, result1){
                            if(error1) throw error1;
                            else{
                                if(result1.length === 0) {
                                    data = {
                                        userName : name,
                                        planamt : [],
                                        realamt : [],
                                        daily_money : 0,
                                        spend_money : 0
                                    };
                                    //console.log('이거 계획조차 안한거야', data);
                                    res.send(data);
                                }
                                else{
                                    console.log(result1[0])
                                    db.query(`SELECT available_money, daily_spent_money FROM daily_data WHERE user_id = ?`, [userID], function(error2, result2){
                                        var daily_money = result2[0].available_money;
                                        var spend_money = result2[0].available_money - result2[0].daily_spent_money;
                                        if(error2) throw error2;
                                        else{
                                            if(result2.length === 0){
                                                data = {
                                                    userName : name,
                                                    planamt : result1[0],
                                                    realamt : [],
                                                    daily_money : daily_money,
                                                    spend_money : spend_money,
                                                };
                                                //console.log('이거 실제금액 없는거야', data);
                                                res.send(data);
                                            }
                                            else{
                                                console.log(result2[0]);
                                                db.query(`SELECT tran_type, sum(tran_amt) as daily_amount FROM real_expense  
                                                WHERE user_id = ? AND inout_type = '출금' AND MONTH(now()) = SUBSTR(tran_date, 5,2) GROUP BY tran_type;`, [userID], function(error3, result3){
                                                    console.log(result3[0]);
                                                    if(error3) throw error3;
                                                    else{
                                                        if(result3.length === 0){
                                                            data = {
                                                                userName : name,
                                                                planamt : result1[0],
                                                                realamt : [],
                                                                daily_money : daily_money,
                                                                spend_money : spend_money,
                                                            };
                                                            //console.log('이거 거래내역 없는거야', data);
                                                            res.send(data);
                                                        }
                                                        else{
                                                            console.log(result3);
                                                            data = {
                                                                userName : name,
                                                                planamt : result1[0],
                                                                realamt : result3,
                                                                daily_money : daily_money,
                                                                spend_money : spend_money
                                                            };
                                                            //console.log('이거 다 들어가있는거야', data);
                                                            res.send(data);
                                                        }
                                                    }
                                                    
                                    
                                                })
            
                                            }
                                        }
                                        
                                    })
                                    
                                } 
                                
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
        
            // 선택한 계좌 내역 조회
            app.post('/selectedAccountHistory', function (req, res) {
                var userID = req.body.userID;
                var fintechUseNum = req.body.fintech_use_num;
                db.query(`SELECT * FROM real_expense WHERE user_id = ? AND fintech_use_num = ? ORDER BY tran_date desc`, [userID, fintechUseNum], function (error, result) {
                    if (error) throw error;
                    else{
                        res.send(result);
                        console.log(fintechUseNum,"의 계좌내역 조회 완료");
                        console.log(result);
                    }
                });
            });
            
            // 계획한 내역과 실제 사용 내역 제공
            app.get(`/monthReportWithplan`, function(req, res){
                var userID = req.query.userID;
                var live_expense = 0;
                db.query(`SELECT tran_type, sum(tran_amt) as daily_amount FROM real_expense 
                WHERE user_id = ? AND inout_type = '출금' AND MONTH(now()) = SUBSTR(tran_date, 5,2) GROUP BY tran_type`, [userID], function(error1, real_spend){
                    if(error1) throw error1;
                    else{
                        if(real_spend.length === 0){
                            console.log("소비내역이 없습니다.")
                            data = {
                                real : [],
                                paln : [],
                                live_expense : 0,
                            }
                            res.send(data);
                        }
                        else {
                            console.log(real_spend[0]);
                            db.query(`SELECT BudgetPlanning.user_income, BudgetPlanning.user_savings, BudgetPlanning.monthly_rent, BudgetPlanning.insurance_expense, 
                            BudgetPlanning.transportation_expense, BudgetPlanning.communication_expense, BudgetPlanning.leisure_expense, BudgetPlanning.shopping_expense, 
                            BudgetPlanning.education_expense, BudgetPlanning.medical_expense, BudgetPlanning.event_expense, BudgetPlanning.subscribe_expense, 
                            BudgetPlanning.etc_expense, daily_data.rest_money FROM daily_data left join BudgetPlanning on daily_data.user_id = BudgetPlanning.user_id 
                            WHERE daily_data.user_id = ? AND BudgetPlanning.state = 1`, [userID], function(error2, plan_spend){
                                if(error2) throw error2;
                                else{
                                    if(real_spend.length === 0){
                                        console.log("계획한 내역이 없습니다.");
                                        data = {
                                            real : real_spend[0],
                                            plan : [],
                                            live_expense : 0,
                                        }
                                        res.send(data);
                                    }
                                    else{
                                        console.log(plan_spend[0]);
                                        live_expense = plan_spend[0].user_income - plan_spend[0].user_savings - plan_spend[0].monthly_rent - plan_spend[0].insurance_expense;
                                        live_expense = live_expense - plan_spend[0].transportation_expense -plan_spend[0].communication_expense - plan_spend[0].leisure_expense;
                                        live_expense = live_expense - plan_spend[0].shopping_expense - plan_spend[0].education_expense - plan_spend[0].medical_expense;
                                        live_expense = live_expense - plan_spend[0].event_expense - plan_spend[0].subscribe_expense - plan_spend[0].etc_expense; 
                                        data = {
                                            real : real_spend[0],
                                            plan : plan_spend[0],
                                            live_expense : live_expense, 
                                        }
                                        console.log(data);
                                        res.send(data);
                                    }
                                }
                            })
                        }
                    }
                })
            });

            // 지난달과 이번달 사용 내역 제공
            app.get(`/monthReportWithLast`, function(req, res){
                var userID = req.query.userID;
                db.query(`SELECT tran_type, sum(tran_amt) as daily_amount FROM real_expense 
                WHERE user_id = ? AND inout_type = '출금' AND MONTH(now()) = SUBSTR(tran_date, 5,2) GROUP BY tran_type`, [userID], function(error1, real_spend){
                    if(error1) throw error1;
                    else{
                        if(real_spend.length === 0){
                            console.log("이번달 내역이 없습니다.");
                            data = {
                                real_spend : [],
                                last_spend : [],
                            };
                            res.send([]);
                        }
                        else{
                            console.log(real_spend);
                            db.query(`SELECT tran_type, sum(tran_amt) as daily_amount FROM real_expense 
                            WHERE user_id = ? AND inout_type = '출금' AND MONTH(now())-1 = SUBSTR(tran_date, 5,2) GROUP BY tran_type`, [userID], function(error2, last_spend){
                                if(error2) throw error2;
                                else{
                                    if(last_spend.length === 0){
                                        console.log("지난달 내역이 없습니다.");
                                        data = {
                                            real_spend : real_spend,
                                            last_spend : [],
                                        };
                                        res.send(data);
                                    }
                                    else{
                                        console.log(last_spend);
                                        data = {
                                            real_spend : real_spend,
                                            last_spend : last_spend,
                                        };
                                        console.log(data);
                                        res.send(data);
                                    }
                                }
                            })
                        }
                    }
                });
            });

            // 한달리포트로 MBTI 제시
            app.get(`/monthReportMbti`, function(req, res){
                var userID = req.query.userID;
                var userMbti = '';
                var description = '';
                var user_income = 0;
                var user_saving = 0;
                var monthly_rent = 0;
                var insurance_expense = 0;
                var transportation_expense = 0;
                var communication_expense = 0;
                var leisure_expense = 0;
                var shopping_expense = 0;
                var education_expense = 0;
                var medical_expense = 0;
                var event_expense = 0;
                var subscribe_expense = 0;
                var etc_expense = 0;
                db.query(`SELECT tran_type, sum(tran_amt) as daily_amount FROM real_expense 
                WHERE user_id = ? AND inout_type = '출금' AND MONTH(now()) = SUBSTR(tran_date, 5,2) GROUP BY tran_type`, [userID], function(error1, spend_money){
                    if(error1) throw error1;
                    else{
                        if(spend_money.length === 0 ){
                            console.log("MBTI 제시를 위한 이번달 내역이 없습니다.");
                            data = {
                                userMbti : '',
                            }
                            res.send([]);
                        }
                        else{
                            console.log(spend_money);
                            db.query(`SELECT user_income, user_savings FROM BudgetPlanning WHERE user_id = ?`, [userID], function(error2, result){
                                if(error2) throw error2;
                                else{
                                    console.log(result[0]);
                                    user_income = result[0].user_income;
                                    user_saving = result[0].user_saving;
                                    spend_money.map(item => {
                                        if(item.tran_type === '쇼핑'){
                                            shopping_expense = item.daily_amount;
                                        }else if(item.tran_type === '교통'){
                                            transportation_expense = item.daily_amount;
                                        }else if(item.tran_type === '구독'){
                                            subscribe_expense = item.daily_amount;
                                        }else if(item.tran_type === '통신'){
                                            communication_expense = item.daily_amount;
                                        }else if(item.tran_type === '여가'){
                                            leisure_expense = item.daily_amount;
                                        }else if(item.tran_type === '교육'){
                                            education_expense = item.daily_amount;
                                        }else if(item.tran_type === '선물'){
                                            event_expense = item.daily_amount;
                                        }else if(item.tran_type === '보험'){
                                            insurance_expense = item.daily_amount;
                                        }else if(item.tran_type === '의료'){
                                            medical_expense = item.daily_amount;
                                        }else if(item.tran_type === '월세'){
                                            monthly_rent = item.daily_amount;
                                        }else if(item.tran_type === '기타'){
                                            etc_expense = item.daily_amount;
                                        }
                                    })
                                    db.query(`SELECT daily_count FROM daily_data WHERE user_id = ?`, [userID], function(error3, daily_count){
                                        if(error3) throw error3;
                                        else{
                                            var count_stand = new Date().getDate();
                                            var portion = daily_count[0].daily_count / count_stand * 100;
                                            // life_expense : 수입 - 저금 - 고정지출 (구독료 제외)
                                            var life_expense = user_income - user_saving - monthly_rent - insurance_expense - communication_expense;
                                            // 즉흥 vs 계획
                                            if(portion >= 70){
                                                userMbti = userMbti + 'I';
                                                description = description + '당신은 계획적으로 사전에 생각하고 소비하기보다 필요에 맞춰서 그때그때 사용하는 편입니다. ';
                                            }
                                            else{
                                                userMbti = userMbti + 'P'; 
                                                description = description + '당신은 소비하기전에 계획했던 범위에서 벗어나지 않도록 사전에 생각하고 사용하는 편입니다. ';
                                            }
                                            // 절약 vs 소비
                                            // 수입이 350만이 넘는경우
                                            if(user_income >= 3500000){
                                                if((user_saving*0.6) > life_expense){
                                                    userMbti = userMbti + 'C';
                                                    description = description + '수입이 생기면 저금보다 일단 필요한 부분에 있어서 소비하고 현재를 즐기는 것을 선호하시네요. ';
                                                }
                                                else{
                                                    userMbti = userMbti + 'H';
                                                    description = description + '수입이 생기면 당장 필요한 것들을 소비하기보다 미래를 위해 저금을 해 모으는 것을 선호하십니다. ';
                                                }
                                            }
                                            // 수입이 350만 아래인 경우
                                            else{
                                                if(user_saving >= life_expense){
                                                    userMbti = userMbti + 'C';
                                                    description = description + '수입이 생기면 저금보다 일단 필요한 부분에 있어서 소비하고 현재를 즐기는 것을 선호하시네요. ';
                                                }
                                                else{
                                                    userMbti = userMbti + 'H';
                                                    description = description + '수입이 생기면 당장 필요한 것들을 소비하기보다 미래를 위해 저금을 해 모으는 것을 선호하십니다. ';
                                                }
                                            }
                                            // 본인 vs 타인
                                            if((shopping_expense + leisure_expense + education_expense)/3 >= event_expense*1.2){
                                                userMbti = userMbti + 'S';
                                                description = description + '종종 본인 스스로에게 선물을 해주기도 하고 가끔 좋아하는 음식을 먹으며 스트레스를 푸시네요. ';
                                            }  
                                            else {
                                                userMbti = userMbti + 'O';
                                                description = description + '종종 친구들에게 해줄 선물들을 고르면서 좋아하는 반응을 보며 즐기시는 편이시네요. ';
                                            }
                                            // 경험 vs 물질
                                            if(leisure_expense >= shopping_expense) {
                                                userMbti = userMbti + 'E';
                                                description = description + '소비를 크게 차지하는 부분은 쇼핑을 위주로 하기보다 취미나 사람들을 만나고 경험적인 일을 쌓는데 주로 사용하십니다. ';
                                            }
                                            else {
                                                userMbti = userMbti + 'M';
                                                description = description + '소비를 크게 차지하는 부분은 취미나 사람들을 만나는데 주로 사용하시기보다 기분전환을 위해 쇼핑을 하시는 것을 좋아하십니다. ';
                                            }
                                            
                                            console.log(userMbti);
                                            data = {
                                                userMbti : userMbti,
                                            }
                                            res.send(userMbti);
                                        }
                                    })
                                }
                            })
                        }
                    }    
                })

            });

            // 한달리포트 MBTI 설정
            app.post(`/updateMbti`, function(req, res) {
                var userID = req.body.userID;
                var userMbti = req.body.userMbti;
                db.query(`UPDATE user SET mbti = ? WHERE user_id = ?`, [userMbti, userID], function(error, result){
                    if(error) throw error;
                    else{
                        console.log(result);
                        data = {
                            status : true,
                        }
                        res.send(data);
                        console.log("MBTI 적용 완료")
                    }
                });
            });

            //관리자 로그인
            app.post('/adminLogin', function (req, res) {
                console.log(req.body);
                var adminID = req.body.userID;
                var adminPassword = req.body.userPassword;
                db.query(`SELECT * FROM admin WHERE admin_id = ? AND password = ?`, [adminID, adminPassword], function (error, result) {
                    if (error) throw error;
                    else {
                        console.log(result[0]);
                        if (result[0] != undefined) {
                            const data = {
                                status: 'success',
                            }
                            res.send(data);
                            console.log(data);
                        }
                        else {
                            const data = {
                                status: 'fail',
                            }
                            res.send(data);
                            console.log(data);
                        }
                    }
                });
            });

            //관리자 공지사항 등록
            app.post('/notificationWrite', function (req, res) {
                console.log(req.body);
                var boardTitle = req.body.boardTitle;
                var boardContent = req.body.boardContent;
                var boardCate = req.body.boardCate;
                db.query(`INSERT INTO notice (category, title, content) VALUES (?, ?, ?)`, [boardCate, boardTitle, boardContent], function (error, result) {
                    if (error) throw error;
                    else {
                        const data = {
                            status: 'success',
                        }
                        res.send(data);
                        console.log(data);
                    }
                });
            });

            //관리자 공지사항 목록 확인
            app.get('/adminGetNotificationList', function (req, res) {
                db.query(`SELECT * FROM notice`,function (error, result) {
                    if (error) throw error;
                    else {
                        res.send(result);
                        console.log(result);
                    }
                });
            });

            //관리자 공지사항 글 확인
            app.post('/NotificationBoardInfo', function (req, res) {
                console.log('여기 들어와', req.body);
                var noticeNumber = req.body.boardID;
                db.query(`SELECT * FROM notice WHERE notice_number =?`, [noticeNumber], function (error, result) {
                    if (error) throw error;
                    else {
                        res.send(result);
                        console.log(result);
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