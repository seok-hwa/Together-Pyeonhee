module.exports = function () {
    var db = require('../db_config.js');
    var express = require('express');
    var router = express.Router();
    router.use(express.json());

    //저축계획 작성
    router.post('/save', function (req, res) {
        console.log(req.body);
        var userID = req.body.userID;
        var savingName = req.body.savingName;
        var savingMoney = req.body.savingMoney;
        var startDate = req.body.startDate;
        var savingsDay = req.body.savingsDay;
        var period = req.body.period;

        var startYear = startDate.substring(0, 4);
        var startMonth = startDate.substring(5, 7);
        var startDay = startDate.substring(8, 10);

        if (startDay > savingsDay) {
            if (startMonth == '12') {
                startYear = parseInt(startYear) + 1;
                startMonth = '01';
            }
            else {
                startMonth = parseInt(startMonth) + 1;
            }
        }

        startDate = startYear + '-' + startMonth + '-' + savingsDay;

        db.query(`INSERT INTO Savings(user_id, saving_name, savings_money, start_date, finish_date)
                VALUES(?, ?, ?, ?,DATE_ADD(?, INTERVAL ? MONTH))`,
            [userID, savingName, savingMoney, startDate, startDate, period], function (error, result) {
                if (error) throw error;
                else {
                    const data = {
                        status: 'success',
                    }
                    res.send(data);
                    console.log(data);
                    // db.query(`SELECT sum(savings_money) as total_savings_money FROM Savings WHERE user_id = ?`, [userID], function(error1, result1){
                    //     if(error1) throw error1;
                    //     else{
                    //         sum_savings = result1[0].total_savings_money;
                    //         db.query(`UPDATE BudgetPlanning SET user_savings = ?`, [sum_savings], function(error2, result2){
                    //             if(error2) throw error2;
                    //             else{
                    //                 db.query(`SELECT sum(savings_money) as total_savings_money FROM Savings WHERE user_id = ?`, [userID], function(err, result5){
                    //                     if(err) throw err;
                    //                     else{
                    //                         db.query(`SELECT * FROM BudgetPlanning Where user_id = ? AND state = 1`, [userID], function(error3, result3){
                    //                             if(error3) throw error3;
                    //                             else{
                    //                                 var dailyMoney = Calculate_Daily_Money(result3, result5);
                    //                                 db.query(`UPDATE daily_data SET available_money = ? WHERE user_id = ?`,[dailyMoney, userID], function(error4, result4){
                    //                                     if(error4) throw error4;
                    //                                     else{
                    //                                         const data = {
                    //                                             status : 'success',
                    //                                         }
                    //                                         res.send(data);
                    //                                         console.log(data);
                    //                                     }
                    //                                 });
                    //                             }
                    //                         });
                    //                     }
                    //                 });

                    //             }
                    //         })
                    //     }
                    // })


                }
            });
    });

    //저금계획 삭제
    router.post('/remove', function (req, res) {
        console.log(req.body);
        var userID = req.body.userID;
        var savingID = req.body.savingID;

        db.query(`DELETE FROM Savings WHERE user_id = ? and saving_number = ?`, [userID, savingID], function (error, result) {
            if (error) throw error;
            else {
                data = {
                    status: 'success'
                }
                res.send(data);
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