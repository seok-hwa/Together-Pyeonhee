module.exports = function () {
    var db = require('../db_config.js');
    var express = require('express');
    var router = express.Router();
    router.use(express.json());

    //한달 리포트 보관함 목록 불러오기
    router.post('/info', function (req, res) {
        var userID = req.body.userID;
        db.query(`SELECT * FROM Monthly_Report WHERE user_id =?`, [userID], function (error, result) {
            if (error) throw error;
            else {
                console.log(result);
                res.send(result);
            }
        });
    });

    //한달 리포트 불러오기 : 예산계획과 비교
    router.post('/WithPlan', function (req, res) {
        var userID = req.body.userID;
        var month = req.body.month;
        var year = req.body.year;
        var YY_MM = year + '-' + month;
        var YYMM = year + month;


        db.query(`SELECT * FROM BudgetPlanning WHERE user_id = ? and DATE_FORMAT(planning_date ,'%Y-%m') = ?`, [userID, YY_MM], function (error1, result1) {
            if (error1) throw error1;
            else {
                console.log(result1[0]);
                db.query(`SELECT * FROM Monthly_Report WHERE user_id =? and report_month = ?`, [userID, YYMM], function (error2, result2) {
                    if (error2) throw error2;
                    else {

                        var planDinner = result1[0].user_income - result1[0].user_savings - result1[0].monthly_rent - result1[0].insurance_expense - result1[0].communication_expense - result1[0].subscribe_expense;
                        planDinner = planDinner - result1[0].transportation_expense - result1[0].leisure_expense - result1[0].shopping_expense - result1[0].education_expense - result1[0].medical_expense - result1[0].event_expense - result1[0].etc_expense;

                        data = {
                            planSavings: result1[0].user_savings,
                            planRent: result1[0].monthly_rent,
                            planInsurance: result1[0].insurance_expense,
                            planCommunication: result1[0].communication_expense,
                            planSubscribe: result1[0].subscribe_expense,

                            planTraffic: result1[0].transportation_expense,
                            planHobby: result1[0].leisure_expense,
                            planShopping: result1[0].shopping_expense,
                            planEducation: result1[0].education_expense,
                            planMedical: result1[0].medical_expense,
                            planEvent: result1[0].event_expense,
                            planEct: result1[0].etc_expense,
                            planDinner: planDinner,

                            realSavings: result2[0].realSaving,
                            realRent: result2[0].realRent,
                            realInsurance: result2[0].realInsurance,
                            realCommunication: result2[0].realCommunication,
                            realSubscribe: result2[0].realSubscribe,

                            realTraffic: result2[0].realTraffic,
                            realHobby: result2[0].realHobby,
                            realShopping: result2[0].realShopping,
                            realEducation: result2[0].realEducation,
                            realMedical: result2[0].realMedical,
                            realEvent: result2[0].realEvent,
                            realEct: result2[0].realEct,
                            realDinner: result2[0].realDinner,
                        }

                        console.log(data);
                        res.send(data);
                    }
                })
            }
        });
    });

    //한달 리포트 불러오기 : 지난 달과 비교
    router.post('/WithLastMonth', function (req, res) {
        var userID = req.body.userID;
        var month = (req.body.month + 1).toString();
        var prevMonth = (req.body.month).toString();
        var year = req.body.year;

        if (month.length == 1) month = '0' + month;
        if (prevMonth.length == 1) prevMonth = '0' + prevMonth;

        var YYMM = year + month;
        var prevYYMM = year + prevMonth;


        db.query(`SELECT * FROM Monthly_Report WHERE user_id = ? and report_month = ?`, [userID, YYMM], function (error1, result1) {
            if (error1) throw error1;
            else {
                console.log("지난달과 데이터 비교");
                db.query(`SELECT * FROM Monthly_Report WHERE user_id =? and report_month = ?`, [userID, prevYYMM], function (error2, result2) {
                    if (error2) throw error2;
                    else {
                        data = {
                            realSavings: result1[0].realSaving,
                            realRent: result1[0].realRent,
                            realInsurance: result1[0].realInsurance,
                            realCommunication: result1[0].realCommunication,
                            realSubscribe: result1[0].realSubscribe,

                            realTraffic: result1[0].realTraffic,
                            realHobby: result1[0].realHobby,
                            realShopping: result1[0].realShopping,
                            realEducation: result1[0].realEducation,
                            realMedical: result1[0].realMedical,
                            realEvent: result1[0].realEvent,
                            realEct: result1[0].realEct,
                            realDinner: result1[0].realDinner,

                            prevSavings: result2[0].realSaving,
                            prevRent: result2[0].realRent,
                            prevInsurance: result2[0].realInsurance,
                            prevCommunication: result2[0].realCommunication,
                            prevSubscribe: result2[0].realSubscribe,

                            prevTraffic: result2[0].realTraffic,
                            prevHobby: result2[0].realHobby,
                            prevShopping: result2[0].realShopping,
                            prevEducation: result2[0].realEducation,
                            prevMedical: result2[0].realMedical,
                            prevEvent: result2[0].realEvent,
                            prevEct: result2[0].realEct,
                            prevDinner: result2[0].realDinner,
                        }

                        console.log(data);
                        res.send(data);
                    }
                })
            }
        });
    });

    return router;
}