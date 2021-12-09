module.exports = function () {
    var db = require('../config_db.js');
    var express = require('express');
    var router = express.Router();
    router.use(express.json());


    // 계획한 내역과 실제 사용 내역 제공
    router.get(`/monthReportWithplan`, function (req, res) {
        var userID = req.query.userID;
        var live_expense = 0;
        db.query(`SELECT tran_type, sum(tran_amt) as daily_amount FROM real_expense 
                WHERE user_id = ? AND inout_type = '출금' AND MONTH(now())-1 = SUBSTR(tran_date, 5,2) GROUP BY tran_type`, [userID], function (error1, real_spend) {
            if (error1) throw error1;
            else {
                if (real_spend.length === 0) {
                    console.log("소비내역이 없습니다.")
                    data = {
                        real: [],
                        paln: [],
                        live_expense: 0,
                    }
                    res.send(data);
                }
                else {
                    // console.log('실제 거래내역', real_spend);
                    db.query(`SELECT BudgetPlanning.user_income, BudgetPlanning.user_savings, BudgetPlanning.monthly_rent, BudgetPlanning.insurance_expense, 
                            BudgetPlanning.transportation_expense, BudgetPlanning.communication_expense, BudgetPlanning.leisure_expense, BudgetPlanning.shopping_expense, 
                            BudgetPlanning.education_expense, BudgetPlanning.medical_expense, BudgetPlanning.event_expense, BudgetPlanning.subscribe_expense, 
                            BudgetPlanning.etc_expense, daily_data.rest_money, daily_data.last_count FROM daily_data left join BudgetPlanning on daily_data.user_id = BudgetPlanning.user_id 
                            WHERE daily_data.user_id = ? AND DATE_FORMAT(BudgetPlanning.planning_date ,'%m') = MONTH(now())-1 AND BudgetPlanning.state = 1;`, [userID], function (error2, plan_spend) {
                        if (error2) throw error2;
                        else {
                            if (real_spend.length === 0) {
                                console.log("계획한 내역이 없습니다.");
                                data = {
                                    real: real_spend,
                                    plan: [],
                                    live_expense: 0,
                                }
                                // console.log('이거봐바', data);
                                res.send(data);
                            }
                            else {
                                // console.log('계획한 내역', plan_spend);
                                live_expense = plan_spend[0].user_income - plan_spend[0].user_savings - plan_spend[0].monthly_rent - plan_spend[0].insurance_expense;
                                live_expense = live_expense - plan_spend[0].transportation_expense - plan_spend[0].communication_expense - plan_spend[0].leisure_expense;
                                live_expense = live_expense - plan_spend[0].shopping_expense - plan_spend[0].education_expense - plan_spend[0].medical_expense;
                                live_expense = live_expense - plan_spend[0].event_expense - plan_spend[0].subscribe_expense - plan_spend[0].etc_expense;
                                data = {
                                    real: real_spend,
                                    plan: plan_spend[0],
                                    live_expense: live_expense,
                                }

                                console.log('실제거래내역과 계획한 내역', data);
                                res.send(data);
                            }
                        }
                    })
                }
            }
        })
    });

    // 지난달과 이번달 사용 내역 제공
    router.get(`/monthReportWithLast`, function (req, res) {
        var userID = req.query.userID;
        db.query(`SELECT tran_type, sum(tran_amt) as daily_amount FROM real_expense 
                WHERE user_id = ? AND inout_type = '출금' AND MONTH(now())-1 = SUBSTR(tran_date, 5,2) GROUP BY tran_type`, [userID], function (error1, real_spend) {
            if (error1) throw error1;
            else {
                if (real_spend.length === 0) {
                    console.log("이번달 내역이 없습니다.");
                    data = {
                        real_spend: [],
                        last_spend: [],
                    };
                    res.send([]);
                }
                else {
                    //console.log(real_spend);
                    db.query(`SELECT tran_type, sum(tran_amt) as daily_amount FROM real_expense 
                            WHERE user_id = ? AND inout_type = '출금' AND MONTH(now())-2 = SUBSTR(tran_date, 5,2) GROUP BY tran_type`, [userID], function (error2, last_spend) {
                        if (error2) throw error2;
                        else {
                            if (last_spend.length === 0) {
                                console.log("지난달 내역이 없습니다.");
                                data = {
                                    real_spend: real_spend,
                                    last_spend: [],
                                };
                                res.send(data);
                            }
                            else {
                                //console.log(last_spend);
                                data = {
                                    real_spend: real_spend,
                                    last_spend: last_spend,
                                };
                                console.log("이번달과 지난달 ", data);
                                res.send(data);
                            }
                        }
                    })
                }
            }
        });
    });

    // 한달리포트로 MBTI 제시
    router.get(`/monthReportMbti`, function (req, res) {
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
                WHERE user_id = ? AND inout_type = '출금' AND MONTH(now())-1 = SUBSTR(tran_date, 5,2) GROUP BY tran_type`, [userID], function (error1, spend_money) {
            if (error1) throw error1;
            else {
                if (spend_money.length === 0) {
                    console.log("MBTI 제시를 위한 이번달 내역이 없습니다.");
                    data = {
                        userMbti: '',
                    }
                    res.send([]);
                }
                else {
                    console.log(spend_money);
                    db.query(`SELECT user_income, user_savings FROM BudgetPlanning 
                            WHERE user_id = ? AND DATE_FORMAT(BudgetPlanning.planning_date ,'%m') = MONTH(now())-1`, [userID], function (error2, result) {
                        if (error2) throw error2;
                        else {
                            console.log(result[0]);
                            user_income = result[0].user_income;
                            user_saving = result[0].user_saving;
                            spend_money.map(item => {
                                if (item.tran_type === '쇼핑') {
                                    shopping_expense = item.daily_amount;
                                } else if (item.tran_type === '교통') {
                                    transportation_expense = item.daily_amount;
                                } else if (item.tran_type === '구독') {
                                    subscribe_expense = item.daily_amount;
                                } else if (item.tran_type === '통신') {
                                    communication_expense = item.daily_amount;
                                } else if (item.tran_type === '여가') {
                                    leisure_expense = item.daily_amount;
                                } else if (item.tran_type === '교육') {
                                    education_expense = item.daily_amount;
                                } else if (item.tran_type === '선물') {
                                    event_expense = item.daily_amount;
                                } else if (item.tran_type === '보험') {
                                    insurance_expense = item.daily_amount;
                                } else if (item.tran_type === '의료') {
                                    medical_expense = item.daily_amount;
                                } else if (item.tran_type === '월세') {
                                    monthly_rent = item.daily_amount;
                                } else if (item.tran_type === '기타') {
                                    etc_expense = item.daily_amount;
                                }
                            })
                            db.query(`SELECT last_count FROM daily_data WHERE user_id = ?`, [userID], function (error3, daily_count) {
                                if (error3) throw error3;
                                else {
                                    console.log("한달리포트로 MBTI 제시 부분");
                                    console.log(daily_count[0])
                                    var date = new Date();
                                    var year = date.getFullYear();
                                    var month = date.getMonth();
                                    var last = new Date(year, month);
                                    last = new Date(last - 1);
                                    var count_stand = last.getDate()
                                    var portion = daily_count[0].last_count / count_stand * 100;
                                    // life_expense : 수입 - 저금 - 고정지출 (구독료 제외)
                                    var life_expense = user_income - user_saving - monthly_rent - insurance_expense - communication_expense;
                                    // 즉흥 vs 계획
                                    if (portion < 70) {
                                        userMbti = userMbti + 'I';
                                        description = description + '당신은 계획적으로 사전에 생각하고 소비하기보다 필요에 맞춰서 그때그때 사용하는 편입니다. ';
                                    }
                                    else {
                                        userMbti = userMbti + 'P';
                                        description = description + '당신은 소비하기전에 계획했던 범위에서 벗어나지 않도록 사전에 생각하고 사용하는 편입니다. ';
                                    }
                                    // 절약 vs 소비
                                    // 수입이 350만이 넘는경우
                                    if (user_income >= 3500000) {
                                        if ((user_saving * 0.6) > life_expense) {
                                            userMbti = userMbti + 'C';
                                            description = description + '수입이 생기면 저금보다 일단 필요한 부분에 있어서 소비하고 현재를 즐기는 것을 선호하시네요. ';
                                        }
                                        else {
                                            userMbti = userMbti + 'H';
                                            description = description + '수입이 생기면 당장 필요한 것들을 소비하기보다 미래를 위해 저금을 해 모으는 것을 선호하십니다. ';
                                        }
                                    }
                                    // 수입이 350만 아래인 경우
                                    else {
                                        if (user_saving >= life_expense) {
                                            userMbti = userMbti + 'C';
                                            description = description + '수입이 생기면 저금보다 일단 필요한 부분에 있어서 소비하고 현재를 즐기는 것을 선호하시네요. ';
                                        }
                                        else {
                                            userMbti = userMbti + 'H';
                                            description = description + '수입이 생기면 당장 필요한 것들을 소비하기보다 미래를 위해 저금을 해 모으는 것을 선호하십니다. ';
                                        }
                                    }
                                    // 본인 vs 타인
                                    if ((shopping_expense + leisure_expense + education_expense) / 3 >= event_expense * 1.2) {
                                        userMbti = userMbti + 'S';
                                        description = description + '종종 본인 스스로에게 선물을 해주기도 하고 가끔 좋아하는 음식을 먹으며 스트레스를 푸시네요. ';
                                    }
                                    else {
                                        userMbti = userMbti + 'O';
                                        description = description + '종종 친구들에게 해줄 선물들을 고르면서 좋아하는 반응을 보며 즐기시는 편이시네요. ';
                                    }
                                    // 경험 vs 물질
                                    if (leisure_expense >= shopping_expense) {
                                        userMbti = userMbti + 'E';
                                        description = description + '소비를 크게 차지하는 부분은 쇼핑을 위주로 하기보다 취미나 사람들을 만나고 경험적인 일을 쌓는데 주로 사용하십니다. ';
                                    }
                                    else {
                                        userMbti = userMbti + 'M';
                                        description = description + '소비를 크게 차지하는 부분은 취미나 사람들을 만나는데 주로 사용하시기보다 기분전환을 위해 쇼핑을 하시는 것을 좋아하십니다. ';
                                    }

                                    data = {
                                        userID: userID,
                                        userMbti: userMbti,
                                        description: description,
                                    }
                                    console.log(data);
                                    res.send(data);
                                }
                            })
                        }
                    })
                }
            }
        })

    });

    // 한달리포트 MBTI 설정
    router.post(`/updateMbti`, function (req, res) {
        var userID = req.body.userID;
        var userMbti = req.body.userMbti;
        db.query(`UPDATE user SET mbti = ? WHERE user_id = ?`, [userMbti, userID], function (error, result) {
            if (error) throw error;
            else {
                console.log(result);
                data = {
                    status: true,
                }
                res.send(data);
                console.log("MBTI 적용 완료")
            }
        });
    });

    return router;
}