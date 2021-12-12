//예산계획추천 및 좋아요/보관함 기능
module.exports = function () {
    var db = require('../db_config.js');
    var express = require('express');
    var router = express.Router();
    router.use(express.json());

    //예산계획추천페이지(모든 사용자 동일)
    router.get('/saveSelectBudgetPlan', function (req, res) {
        //console.log(req.query.userID);
        db.query(`SELECT BudgetPlanning.user_id, user.tier, user.job, BudgetPlanning.user_mbti, BudgetPlanning.user_age, 
                BudgetPlanning.planning_number, BudgetPlanning.planning_date, BudgetPlanning.user_income, BudgetPlanning.user_savings, 
                BudgetPlanning.like_number, BudgetPlanning.monthly_rent, BudgetPlanning.insurance_expense,BudgetPlanning.transportation_expense, 
                BudgetPlanning.communication_expense, BudgetPlanning.leisure_expense, BudgetPlanning.shopping_expense, BudgetPlanning.education_expense, 
                BudgetPlanning.medical_expense, BudgetPlanning.event_expense, BudgetPlanning.etc_expense, BudgetPlanning.subscribe_expense
                from user, BudgetPlanning  WHERE user.user_id = BudgetPlanning.user_id order by like_number desc limit 10`, function (error, result) {
            if (error) throw error;
            //console.log(result);
            res.send(result);
        });
    });

    //사용자와 비슷한 MBTI 예산계획 추천
    router.get('/viewBudgetPlan', function (req, res) {
        //console.log(req.query);
        var userID = req.query.userID;
        db.query(`SELECT * FROM user WHERE user_id = ?`, [userID], function (error, result) {
            if (error) throw error;
            else {
                //console.log(result[0]);
                var userMBTI = result[0].mbti;
                var userAge = result[0].age;
                var userIncome = result[0].income;
                //var userJob = result[0].job;
                var income_minus = userIncome - 500000;
                var income_plus = userIncome + 500000;
                var age_minus = userAge - 3;
                var age_plus = userAge + 3;
                db.query(`SELECT * FROM BudgetPlanning INNER JOIN user ON BudgetPlanning.user_id = user.user_id 
                        WHERE (user_income between ? and ?) AND user_age between ? and ? AND user_mbti = ? order by like_number desc limit 10`,
                    [income_minus, income_plus, age_minus, age_plus, userMBTI], function (error, result) {
                        if (error) throw error;
                        //console.log(result);
                        res.send(result);
                    });
            }
        });
    });

    //예산계획 열람여부 확인
    router.post('/openCheck', function (req, res) {
        console.log("열람여부확인");
        var userID = req.body.userID;
        var budgetPlanID = req.body.budgetPlanningID;
        console.log(userID);
        console.log(budgetPlanID);
        db.query(`SELECT * FROM OpenCount WHERE user_id = ? AND planning_number = ?`, [userID, budgetPlanID], function (error, result) {
            if (error) throw error;
            else {
                if (result[0] != undefined) {//열람 기록 O
                    //console.log("열람한 기록이 있으면 팝업창 안뜸");
                    const data = {
                        status: true
                    }
                    res.send(data);
                }
                else {//열람 기록 X
                    //console.log("열람한 기록이 없으므로 팝업창 떠야함");
                    /*db.query(`INSERT INTO OpenCount (user_id, planning_number) VALUES (?, ?)`, [userID, budgetPlanID], function (error, result) {
                        if (error) throw error;
                        else {
                            console.log("사용자 읽음 표시 DB저장완료");
                        }
                    });*/
                    const data = {
                        status: false
                    }
                    res.send(data);
                }
            }
        });
    });

    //예산계획 추가열람 및 포인트 차감
    router.post('/usePoint', function (req, res) {
        var userID = req.body.userID;
        var userTotalPoint;
        var usePoint = req.body.usePoint;
        var budgetPlanID = req.body.budgetPlanningID;
        usePoint *= -1;

        db.query(`SELECT * FROM user WHERE user_id = ?`, [userID], function (error, result) {
            if (error) throw error;
            else {
                userTotalPoint = result[0].total_point;
                if (userTotalPoint >= 100) {//예산계획 열람할 포인트 존재
                    var updatePoint = userTotalPoint + usePoint;
                    db.query(`UPDATE user SET total_point = ? WHERE user_id = ?`, [updatePoint, userID], function (error, result) {
                        if (error) throw error;
                        else {
                            db.query(`INSERT INTO point(user_id, diff, description) VALUES (?, ? , '예산계획 추가열람')`, [userID, usePoint], function (error, result) {
                                if (error) throw error;
                                else {
                                    db.query(`INSERT INTO OpenCount (user_id, planning_number) VALUES (?, ?)`, [userID, budgetPlanID], function (error, result) {
                                        if (error) throw error;
                                        else {
                                            console.log("사용자 읽음 표시 DB저장완료");
                                            const data = {
                                                status: true,
                                                restPoint: updatePoint //잔여포인트
                                            }
                                            res.send(data);
                                            console.log(data);
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
                else {//예산계획 열람할 수 있는 포인트 없음
                    const data = {
                        status: false,
                        restPoint: userTotalPoint // 현재 잔여 포인트
                    }
                    res.send(data);
                    console.log(data);
                }
            }
        });
    });

    // 선택한 예산계획 상세보기
    router.get('/recommendedBudgetPlan', function (req, res) {
        //console.log(req.query.budgetPlanningID);
        var budgetPlanID = req.query.budgetPlanningID;
        var data;

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
    router.post('/saveBudgetPlan', function (req, res) {
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
    router.post('/cancelBudgetPlan', function (req, res) {
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
    router.post('/likeBudgetPlan', function (req, res) {
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
    router.post('/didLike', function (req, res) {
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
                    else {
                        const data = {
                            status: false
                        }
                        res.send(data);
                    }
                }
            });
    });

    // 보관함 여부 확인
    router.post('/didStore', function (req, res) {
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
                    else {
                        const data = {
                            status: false
                        }
                        res.send(data);
                    }
                }
            });
    });

    // 보관함에 저장된 예산계획서 확인
    router.get('/BudgetPlanCabinet', function (req, res) {
        //console.log(req.query.userID);
        var userID = req.query.userID;
        db.query(`SELECT DISTINCT BudgetPlanning.user_id, user.tier, user.job, BudgetPlanning.user_mbti, BudgetPlanning.user_age,
                BudgetPlanning.planning_number, BudgetPlanning.planning_date, BudgetPlanning.user_income, BudgetPlanning.user_savings,
                BudgetPlanning.like_number, BudgetPlanning.monthly_rent, BudgetPlanning.insurance_expense,BudgetPlanning.transportation_expense,
                BudgetPlanning.communication_expense, BudgetPlanning.leisure_expense, BudgetPlanning.shopping_expense, BudgetPlanning.education_expense,
                BudgetPlanning.medical_expense, BudgetPlanning.event_expense, BudgetPlanning.etc_expense, BudgetPlanning.subscribe_expense
                FROM user LEFT JOIN BudgetPlanning ON user.user_id = BudgetPlanning.user_id 
                LEFT JOIN Storage ON BudgetPlanning.planning_number = Storage.planning_number WHERE Storage.user_id = ?`, [userID], function (error, result) {
            if (error) throw error;
            //console.log(result);
            res.send(result);
        });
    });



    return router;
}

