module.exports = function () {
    var db = require('../db_config.js');
    var express = require('express');
    var router = express.Router();
    router.use(express.json());

    // 편히 메뉴의 데일리데이터의 저금계획
    router.post(`/savings`, function (req, res) {
        console.log(req.body);
        var userID = req.body.userID;
        db.query(`select saving_name, savings_money, start_date,finish_date, 
                        all_savings_money, saving_number from Savings where user_id = ?` , [userID], function (error, result) {
            if (error) throw error;
            else {
                console.log(result);
                res.send(result);
            }
        });
    });


    // 편히 메뉴의 데일리데이터의 권장소비금액과 카테고리별 금액
    router.post(`/history`, function (req, res) {
        // console.log(req.body);
        var userID = req.body.userID;
        global_id = req.body.userID;
        console.log("글로벌아이디", global_id);
        db.query(`SELECT name FROM user WHERE user_id = ?`, [userID], function (error, name) {
            if (error) throw error;
            else {
                // console.log(name);
                db.query(`SELECT BudgetPlanning.planning_number, BudgetPlanning.user_income, BudgetPlanning.user_savings, BudgetPlanning.monthly_rent, BudgetPlanning.insurance_expense, 
                        BudgetPlanning.transportation_expense, BudgetPlanning.communication_expense, BudgetPlanning.leisure_expense, 
                        BudgetPlanning.shopping_expense, BudgetPlanning.education_expense, BudgetPlanning.medical_expense,
                        BudgetPlanning.event_expense, BudgetPlanning.etc_expense, BudgetPlanning.subscribe_expense, 
                        daily_data.available_money, daily_data.daily_spent_money, daily_data.rest_money 
                        FROM daily_data left join BudgetPlanning on daily_data.user_id = BudgetPlanning.user_id 
                        where daily_data.user_id = ? AND BudgetPlanning.state = 1;`, [userID], function (error1, result1) {
                    if (error1) throw error1;
                    else {
                        if (result1.length === 0) {
                            data = {
                                userName: name,
                                planamt: [],
                                realamt: [],
                                daily_money: 0,
                                spend_money: 0,
                                live_money: live_money,
                            };
                            console.log('이거 계획조차 안한거야', data);
                            res.send(data);
                        }
                        else {
                            console.log(result1)
                            var live_money = result1[0].user_income - result1[0].user_savings - result1[0].monthly_rent - result1[0].insurance_expense - result1[0].transportation_expense - result1[0].communication_expense;
                            live_money = live_money - result1[0].leisure_expense - result1[0].shopping_expense - result1[0].event_expense - result1[0].etc_expense - result1[0].subscribe_expense;
                            db.query(`SELECT available_money, daily_spent_money FROM daily_data WHERE user_id = ?`, [userID], function (error2, result2) {
                                if (error2) throw error2;
                                else {
                                    var daily_money = result2[0].available_money;
                                    var spend_money = result2[0].available_money - result2[0].daily_spent_money;
                                    if (result2.length === 0) {
                                        data = {
                                            userName: name,
                                            planamt: result1[0],
                                            realamt: [],
                                            daily_money: daily_money,
                                            spend_money: spend_money,
                                            live_money: live_money,
                                        };
                                        console.log('이거 실제금액 없는거야', data);
                                        res.send(data);
                                    }
                                    else {
                                        console.log(result2);
                                        db.query(`SELECT tran_type, sum(tran_amt) as daily_amount FROM real_expense  
                                                WHERE user_id = 'pyeonhee' AND inout_type = '출금' AND MONTH(now()) = SUBSTR(tran_date, 5,2) GROUP BY tran_type;`, [userID], function (error3, result3) {
                                            console.log(result3[0]);
                                            if (error3) throw error3;
                                            else {
                                                if (result3.length === 0) {
                                                    data = {
                                                        userName: name,
                                                        planamt: result1[0],
                                                        realamt: [],
                                                        daily_money: daily_money,
                                                        spend_money: spend_money,
                                                        live_money: live_money,
                                                    };
                                                    console.log('이거 거래내역 없는거야', data);
                                                    res.send(data);
                                                }
                                                else {
                                                    db.query(`SELECT sum(tran_amt) as today_money FROM real_expense 
                                                            WHERE user_id = 'pyeonhee' AND inout_type = '출금' AND SUBSTR(NOW(),9,2) = SUBSTR(tran_date,7,2) AND tran_type = '식비'`, [userID], function (err, money) {
                                                        if (err) throw err;
                                                        else {
                                                            if (money[0].today_money === null) {
                                                                console.log(result3);
                                                                data = {
                                                                    userName: name,
                                                                    planamt: result1[0],
                                                                    realamt: result3,
                                                                    daily_money: daily_money,
                                                                    spend_money: spend_money,
                                                                    live_money: live_money,
                                                                };
                                                                console.log('이거 다 들어가있는거야', data);
                                                                res.send(data);
                                                            }
                                                            else {
                                                                console.log(money);
                                                                var today_money = money[0].today_money;
                                                                db.query(`UPDATE daily_data SET daily_spent_money = ? WHERE user_id = ?`, [today_money, userID], function (err2, result4) {
                                                                    if (err2) throw err2;
                                                                    else {
                                                                        console.log(result3);
                                                                        data = {
                                                                            userName: name,
                                                                            planamt: result1[0],
                                                                            realamt: result3,
                                                                            daily_money: daily_money,
                                                                            spend_money: spend_money,
                                                                            live_money: live_money,
                                                                        };
                                                                        console.log('이거 다 들어가있는거야', data);
                                                                        res.send(data);
                                                                    }
                                                                })
                                                            }

                                                        }
                                                    })

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

    return router;
}