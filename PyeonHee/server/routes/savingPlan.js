module.exports = function () {
    var db = require('../db_config.js');
    var express = require('express');
    var router = express.Router();
    router.use(express.json());

    //저금계획 추가
    app.post('/saveSavingPlan', function(req, res){
        var userID = req.body.userID;
        var savingName = req.body.savingName;
        var savingMoney = req.body.savingMoney;
        var startDate = req.body.startDate;
        var endYear = req.body.endYear;
        var endMonth = req.body.endMonth;
        var endDay = endYear+'-'+endMonth+'-28';

        var startYear = startDate.substring(0,4);
        var startMonth = startDate.substring(5,7);


        startDate = startYear+'-'+startMonth+'-'+ '05';
        
        db.query(`INSERT INTO Savings(user_id, saving_name, savings_money, start_date, finish_date)
        VALUES(?,?,?,?,?)`,[userID, savingName,savingMoney,startDate,endDay], function(error, result){
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

    //저금계획 수정
            
    app.post('/editSavingPlan', function(req,res){
        console.log('예산계획 수정');

        var userID = req.body.userID;
        var savingID = req.body.savingID;

        var savingName = req.body.savingName;
        var savingMoney = req.body.savingMoney;
        var endYear = req.body.endYear;
        var endMonth = req.body.endMonth;


        db.query(`UPDATE Savings SET saving_name = ? , savings_money = ? , finish_date = DATE_FORMAT('?-?-28','%Y-%m-%d') WHERE saving_number = ? and user_id = ?`,
        [savingName,savingMoney,endYear,endMonth,savingID,userID], function(error, result){
            if(error) throw error;
            else{

                console.log(result);
                data = {
                    status : 'success'
                }
                res.send(data);
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