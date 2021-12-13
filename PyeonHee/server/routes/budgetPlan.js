//가계부 탭
module.exports = function () {
    var db = require('../db_config.js');
    var express = require('express');
    var router = express.Router();
    router.use(express.json());

    // 가계부 메뉴의 본인 데이터 
    router.get(`/myBudgetPlan`, function (req, res) {
        console.log(req.query.userID);
        var userID = req.query.userID;
        var dailyMoney;

                db.query(`SELECT * FROM BudgetPlanning Where user_id = ? AND state = 1`, [userID], function (error, result) {
                    if (error) throw error;
                    else if (result.length != 0) {
                        dailyMoney = Calculate_Daily_Money(result, result[0].user_savings);
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
                            sumOfSavings: result[0].user_savings,
                            dailyMoney: dailyMoney
                        };
                        console.log(data);
                        res.send(data);
                    }
                    else {
                        res.send([]);
                    }
                });      
    });


    //지난 계획 불러오기 (요약정보) 
    router.get('/MyBudgetPlanCabinet', function (req, res) {
        var userID = req.query.userID;

        db.query(`SELECT BudgetPlanning.planning_number,BudgetPlanning.user_income,BudgetPlanning.user_savings, BudgetPlanning.monthly_rent+insurance_expense+communication_expense+subscribe_expense AS fixedExpenditure,
                BudgetPlanning.transportation_expense+leisure_expense+shopping_expense+education_expense+medical_expense+event_expense+etc_expense 
                AS plannedExpenditure, daily_data.available_money FROM BudgetPlanning JOIN daily_data ON BudgetPlanning.user_id = daily_data.user_id WHERE BudgetPlanning.user_id = ?`, [userID], function (error, result) {
            if (error) throw error;
            else {
                console.log(result);
                res.send(result);
            }
        });
    });
    //지난 내 계획 세부정보
    router.get('/MyBudgetPlanDetail', function (req, res) {
        //var userID = req.query.userID;
        var budgetPlanningID = req.query.budgetPlanningID;
        db.query(`SELECT *, monthly_rent+insurance_expense+communication_expense+subscribe_expense AS fixedExpenditure,
                transportation_expense+leisure_expense+shopping_expense+education_expense+medical_expense+event_expense+etc_expense 
                AS plannedExpenditure FROM BudgetPlanning WHERE planning_number = ?`, [budgetPlanningID], function (error, result) {
            if (error) throw error;
            console.log(result);
            res.send(result);
        });
    });
    
    //예산계획서 작성
    router.post('/submitBudgetPlan', function (req, res) {
        console.log(req.body);
        var userID = req.body.userID;
        var income = req.body.income;
        var savings = req.body.savings;
        var fixedExpenditure = req.body.fixedExpenditure;
        var plannedExpenditure = req.body.plannedExpenditure;
        var monthlyRent = req.body.monthlyRent;
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
        var dailyMoney;

        db.query(`SELECT * FROM user WHERE user.user_id=?`, [userID], function (error, result){
            //console.log(result);
            if (error) throw error;
            else {
                userMBTI = result[0].mbti;
                userAge = result[0].age;

                db.query(`INSERT INTO BudgetPlanning(user_id, user_mbti, user_age,user_income, user_savings, monthly_rent,
                            insurance_expense,transportation_expense,communication_expense,
                            leisure_expense, shopping_expense ,education_expense, medical_expense,
                            event_expense, etc_expense, subscribe_expense, state) 
                            VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,[userID, userMBTI, userAge, income, savings, monthlyRent,
                    insurance, transportation, communication, leisure, shopping, education, medical, event, etc, subscription],function(error1, result1){
                        if (error1) throw error1;
                        else{
                            db.query(`SELECT * FROM BudgetPlanning Where user_id = ? ORDER BY planning_number desc`,[userID], function (error2, result2){
                                if (error2) throw error2;
                                else{
                                    dailyMoney = Calculate_Daily_Money(result2, savings);
                                    db.query(`UPDATE daily_data SET available_money = ? WHERE user_id = ?`, [dailyMoney, userID], function (error4, result4) {
                                        if (error4) throw error4;
                                        else {
                                            db.query(`UPDATE user SET income = ? WHERE user_id =?`, [income, userID], function (error1, result1) {
                                                if (error1) throw error1;
                                                    else{

                                                        const data = {
                                                            status: 'success',
                                                        }
                                                        console.log(data);
                                                        res.send(data);
                                                        }
                                                });
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
    router.post('/editBudget', function (req, res) {
        console.log(req.body);

        var userID = req.body.userID;
        var monthlyRent = req.body.monthlyRent;
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

        var dailyMoney;
        db.query(`SELECT * FROM user WHERE user.user_id=?`, [userID], function (error, result) {
            console.log(result);
            if (error) throw error;
            else {
                userMBTI = result[0].mbti;
                userAge = result[0].age;

                db.query(`UPDATE BudgetPlanning SET monthly_rent=?,insurance_expense=?,transportation_expense=?,communication_expense=?,
                            leisure_expense=?, shopping_expense=?,education_expense=?, medical_expense=?,
                            event_expense=?, etc_expense=?, subscribe_expense=? WHERE user_id =? AND state = 1`, [monthlyRent, insurance, transportation, communication,
                    leisure, shopping, education, medical, event, etc, subscription, userID], function (error1, result1) {
                        if (error1) throw error1;
                        else {
                            db.query(`SELECT IFNULL(sum(savings_money),0) as totalSaving FROM Savings WHERE user_id = ?`, [userID], function (error2, result2) {
                                if (error1) throw error1;
                                else {
                                    db.query(`SELECT * FROM BudgetPlanning Where user_id = ? AND state = 1`, [userID], function (error3, result3) {
                                        if (error) throw error;

                                        else {
                                            dailyMoney = Calculate_Daily_Money(result3, result2[0].totalSaving);
                                            console.log(result[0]);
                                            db.query(`UPDATE daily_data SET available_money = ? WHERE user_id = ?`, [dailyMoney, userID], function (error4, result4) {
                                                if (error4) throw error4;
                                                else {
                                                    const data = {
                                                        status: 'success',
                                                    }
                                                    console.log(data);
                                                    res.send(data);
                                                }
                                            })
                                        }
                                    });
                                }
                            });
                        }
                    });
            }
        })
    })


    function Calculate_Daily_Money(result, result1) {
        var available_money;
        var fixedExp;
        var plannedExp;
        var dailyMoney;
        var totalSavings;

        let today = new Date();
        let today_date = today.getDate();
        let today_month = today.getMonth() + 1;
        let today_years = today.getFullYear();

        let lastTemp = new Date(today_years, today_month, 0);
        let lastDate = lastTemp.getDate();


        fixedExp = result[0].monthly_rent + result[0].insurance_expense + result[0].communication_expense + result[0].subscribe_expense;
        plannedExp = result[0].transportation_expense + result[0].leisure_expense + result[0].shopping_expense + result[0].education_expense
            + result[0].medical_expense + result[0].event_expense + result[0].etc_expense;
        totalSavings = result1;

        dailyMoney = result[0].user_income - fixedExp - plannedExp - totalSavings;
        dailyMoney = dailyMoney / lastDate;
        dailyMoney = Math.floor(dailyMoney);

        return dailyMoney;
    }


    return router;
}