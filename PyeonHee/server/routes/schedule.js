//node-schedule
module.exports = function (admin) {
    const schedule = require('node-schedule');
    var db = require('../db_config.js');
    var express = require('express');
    var router = express.Router();
    router.use(express.json());

    global_id = '';
    // 12시가 되면 일일권장금액 이행 여부 확인
    schedule.scheduleJob('0 0 0 * * *', async () => {
        db.query(`SELECT * FROM daily_data`, function (error1, result1) {
            console.log(result1[0]);
            if (error1) throw error1;
            else {
                console.log("일일권장금액 이행 여부 엽데이트가 진행중입니다.");
                result1.map(user => {
                    if (user.daily_spent_money <= user.available_money) {
                        user.daily_count = user.daily_count + 1;
                        console.log(user.user_id, "님의 일일권장금액 이행률이 업데이트 되었습니다.");
                        console.log(user.user_id, "님의 이행 횟수 :", user.daily_count);
                        db.query(`UPDATE daily_data SET daily_count = ?, daily_spent_money = 0 WHERE user_id = ?`, [user.daily_count, user.user_id], function (error2, result2) {
                            if (error2) throw error2;
                            console.log("일일권장금액 이행 여부가 업데이트 되었습니다.");
                            // console.log(result2);
                        })
                    }
                })
            }
        })
    });

    // 매달 1일 모든 예산계획서 state를 0으로 초기화, 권장 금액 이행율 초기화, 티어 및 포인트 정산
    schedule.scheduleJob('0 0 0 1 * *', async () => {
        db.query(`UPDATE BudgetPlanning SET state = 0`, function (error, result) {
            if (error) throw error;
            console.log("예산계획서 적용이 초기화 되었습니다.");
        });

        db.query(`SELECT user_id, daily_count, last_count FROM daily_data`, function (error1, result1) {
            if (error1) throw error1;
            else {
                result1.map(user => {
                    db.query(`UPDATE daily_data SET last_count = ?, daily_count = 0 WHERE user_id = ?`, [user.daily_count, user.userID], function (error2, result2) {
                        if (error2) throw error2;
                        else {
                            console.log(user.user_id, "님의 권장금액 이행률이 초기화 되었습니다.")
                        }
                    })
                })
            }
        })

        db.query(`SELECT user_id, tier, total_stamp, total_point FROM user`, function (error3, result3) {
            if (error3) throw error3;
            else {
                result3.map(user => {
                    if (user.total_stamp >= 20) {
                        user.tier = 'SILVER';
                        user.total_point = user.total_point + 1000;
                    }
                    else if (user.total_stamp >= 40) {
                        user.tier = 'GOLD';
                        user.total_point = user.total_point + 1500;
                    }
                    else if (user.total_stamp >= 60) {
                        user.tier = 'PLATINUM';
                        user.total_point = user.total_point + 2000;
                    }
                    else if (user.total_stamp >= 80) {
                        user.tier = 'DIAMOND';
                        user.total_point = user.total_point + 2500;
                    }
                    else if (user.total_stamp < 20) {
                        user.tier = 'BRONZE';
                        user.total_point = user.total_point + 500;
                    }
                    db.query(`UPDATE user SET tier = ?, total_point =? WHERE user_id = ?`, [user.tier, user.total_point, user.userID], function (error4, result4) {
                        if (error4) throw error4;
                        else {
                            console.log(user.userID, "님의 티어와 포인트가 업데이트 되었습니다.");
                        }
                    })
                })
            }
        });
    });

    // 매달 마지막날 이행률을 통해 스탬프 정산
    schedule.scheduleJob('0 59 23 L * *', async () => {
        db.query(`SELECT user.user_id, daily_count, total_stamp from user JOIN daily_data WHERE user.user_id = daily_data.user_id`, function (error1, result1) {
            if (error1) throw error1;
            else {
                result1.map(user => {
                    var date = new Date();
                    var year = date.getFullYear();
                    var month = date.getMonth() + 1;
                    var last = new Date(year, month);
                    last = new Date(last - 1);
                    var count_stand = last.getDate()
                    var portion = user.daily_count / count_stand * 100;
                    if (portion >= 75) {
                        user.total_stamp = user.total_stamp + 4;
                        diff = 4;
                    } else if (portion >= 50) {
                        user.total_stamp = user.total_stamp + 3;
                        diff = 3;
                    } else if (portion >= 25) {
                        user.total_stamp = user.total_stamp + 2;
                        diff = 2;
                    } else {
                        user.total_stamp = user.total_stamp + 1;
                        diff = 1;
                    }
                    db.query(`UPDATE user SET total_stamp = ? WHERE user_id = ?`, [user.total_stamp, user.user_id], function (error2, result2) {
                        if (error2) throw error2;
                        else {
                            db.query(`insert into stamp(user_id, diff, description) values(?, ?, '한달정산 스탬프 적용');`, [user.user_id, diff], function (error3, ressult3) {
                                if (error3) throw error3;
                                else console.log(user.user_id, "님의 이번달 스탬프가", diff, "개 추가되었습니다.");
                            });
                        }
                    });
                })
            }
        })
    });



    // 30초마다 일일소비량 업데이트
    schedule.scheduleJob('* * */30 * * *', async () => {
        db.query(`SELECT sum(tran_amt) as spend_money FROM real_expense WHERE DAY(now()) = SUBSTR(tran_date, 7,2) AND user_id = ?`,[global_id], function(error1, result1){
            if(error1) throw error1;
            else{
                if(result1.spend_money == null)
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


    // 일일권장 소비금액 (잔액 푸시알림)
    schedule.scheduleJob('*/30 * * * * *', function (){
        db.query(`SELECT * FROM user WHERE deviceToken IS NOT NULL`, function (error, result) {
            if (error) throw error;
            else{
                for (i in result) {
                    (function(i){
                        var userID = result[i].user_id;
                        var deviceToken = result[i].deviceToken;
                        db.query(`SELECT EXISTS (SELECT * FROM bank_account WHERE user_id = ? limit 1) as success`, [userID], function (error, result) {
                            if (error) throw error;
                            else {
                                var now = new Date();
                                var year = now.getFullYear();
                                var month = ('0' + (now.getMonth() + 1)).slice(-2);
                                var date = ('0' + now.getDate()).slice(-2);
                                now = year + "" + month + "" + date;
                                //console.log("오늘날짜 확인 : ", now);
                                if (result[0].success == 1) { //계좌를 연동한 사용자(푸시알림 가능)
                                    db.query(`SELECT * FROM real_expense WHERE user_id = ? AND tran_date = ? AND alarm = 0`, [userID, now], function (error, result) {
                                        if (error) throw error;
                                        else {
                                            if (result[0]!= undefined) { //계좌연동 & 거래내역 존재
                                                var tranAmt = result[0].tran_amt;
                                                console.log('최근 거래내역 존재 푸시알림보내기 + ',userID);
                                                var dailyMoney;
                                                var balanceMoney;
                                                db.query(`SELECT sum(savings_money) as total_savings_money FROM Savings WHERE user_id = ?`, [userID], function (error, result1) {
                                                    if (error) throw error;
                                                    else {
                                                        db.query(`SELECT * FROM BudgetPlanning Where user_id = ? ORDER BY planning_number desc`, [userID], function (error, result) {
                                                            if (error) throw error;
                                                            else{
                                                                if (result[0] != undefined) {
                                                                    dailyMoney = Calculate_Daily_Money(result, result1);
                                                                    balanceMoney = dailyMoney - tranAmt;
                                                                    console.log('[출금]', tranAmt,'원 **하루권장소비량', balanceMoney +'원 남았습니다.**');

                                                                    let target_token = deviceToken;//알림을 받을 디바이스의 토큰값
                                                                    let message = {
                                                                        notification: {
                                                                            title: '[출금]' + tranAmt + '원',
                                                                            body: '**하루권장소비량' + balanceMoney +'원 남았습니다.**'
                                                                        },
                                                                        token: target_token,
                                                                    }
                                                                    admin.messaging().send(message)
                                                                        .then(function (response) {
                                                                            console.log('푸시알림메시지 전송성공!', response)
                                                                        })
                                                                        .catch(function (error) {
                                                                            console.log('푸시알림메시지 전송실패!', error)
                                                                        })
                                                                }
                                                            }
                                                        });
                                                    }
                                                });
                                                db.query(`UPDATE real_expense SET alarm = 1 WHERE user_id = ? AND tran_date = ?`, [userID, now], function (error, result) {
                                                    if (error) throw error;
                                                    //console.log("알림완료 --> alarm = 1 로 변경");
                                                });
                                            }
                                            else {//계좌연동 but.거래내역 존재X
                                                console.log(userID, "계좌연동 O but.최근거래내역 X");
                                            }
                                        }
                                    });
                                }
                                else {//계좌연동 X 사용자
                                    console.log(userID, "계좌연동 X");
                                }
                            }
                        });
                    })(i);
                }
            }
        });
    });


    //한달리포트 생성 푸시알림(매달 1일 00시)
    schedule.scheduleJob('0 0 0 1 * *', function () {
        db.query(`SELECT * FROM user WHERE deviceToken IS NOT NULL`, function (error, result) {
            if (error) throw error;
            else {
                for (i in result) {
                    (function (i) {
                        var userID = result[i].user_id;
                        var deviceToken = result[i].deviceToken;
                        let target_token = deviceToken;
                        var userName;

                        db.query(`SELECT name FROM user WHERE user_id=?`, [userID], function (error, result) {
                            if (error) throw error;
                            else {
                                console.log(result[0].name);
                                userName = result[0].name;

                                let message = {
                                    notification: {
                                        title: '**편히가계**',
                                        body: userName + '님 한달리포트가 생성되었습니다.'
                                    },
                                    token: target_token,
                                }
                                admin.messaging().send(message)
                                    .then(function (response) {
                                        console.log(userID, '푸시알림메시지 전송성공!', response)
                                    })
                                    .catch(function (error) {
                                        console.log('푸시알림메시지 전송실패!', error)
                                    })
                            }
                        });
                    })(i);
                }
            }
        });
    });

    function Calculate_Daily_Money(result, result1) {
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

    return router;
}
