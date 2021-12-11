module.exports = function () {
    var db = require('../db_config.js');
    var config = require('../bank_config.js');
    var express = require('express');
    var request = require('request');
    var router = express.Router();
    router.use(express.json());

    // 사용자 토큰 발급
    router.get('/Together', function (req, res) {
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
    router.post('/saveAccount', function (req, res) {
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
    router.get('/accountList', function (req, res) {
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
                                            account_num_masked, account_holder_name) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                                    [userID, fintech_use_num, account_alias, bank_code_std, bank_name, account_num_masked, account_holder_name], function (error, result) {
                                        if (error) throw error;
                                        console.log("등록된 계좌 DB저장완료");
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
    router.get('/close', function (req, res) {
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
    router.post('/update_info', function (req, res) {
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
                            else {
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


    // 사용자의 연동한 계좌 내역 DB저장 (선택한 계좌 거래내역 조회_핀테크이용번호 사용)_데일리업데이트
    router.get('/saveTranHistory', function (req, res) {
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
                                                                    tran_time, inout_type, tran_type, print_content, tran_amt, after_balance_amt, branch_name) VALUES (?, ?, ?, ?, ?, ?, ? ,?, ?, ?, ?, ?)`,
                                                        [userID, fintechUseNum, bankName, balanceAmt, tran_date, tran_time, inout_type, tran_type, print_content, tran_amt,
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
                                    const data = {
                                        status: 'success'
                                    }
                                    res.send(data);
                                    console.log("거래내역 전송 완료");
                                }
                            });
                        }
                    });
                }
                else { // 신규 사용자(오픈뱅킹 연동 X)
                    const data = {
                        status: 'fail'
                    }
                    res.send(data);
                    console.log("연동내역이 없습니다.");
                }
            }
        });
    });

    // 최근거래내역
    router.post('/latestTranList', function (req, res) {
        var userID = req.body.userID;
        var now = new Date();
        var year = now.getFullYear();
        var month = ('0' + (now.getMonth() + 1)).slice(-2);
        var date = ('0' + now.getDate()).slice(-2);
        //now = year + '-' + month + '-' + date;
        now = year + "" + month + "" + date;
        //var fintechUseNum = req.body.fintechUseNum;
        db.query(`SELECT real_expense.fintech_use_num, real_expense.bank_name, real_expense.balance_amt, real_expense.tran_date, real_expense.tran_time,
                real_expense.inout_type, real_expense.tran_type, real_expense.print_content, real_expense.tran_amt,real_expense.after_balance_amt, real_expense.branch_name,
                bank_account.account_num_masked FROM real_expense INNER JOIN bank_account ON real_expense.fintech_use_num = bank_account.fintech_use_num 
                WHERE bank_account.user_id = ? AND tran_date = ? AND state = 0`,
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
    router.post('/tranList', function (req, res) {
        var userID = req.body.userID;
        //var fintechUseNum = req.body.fintechUseNum;
        db.query(`SELECT real_expense.fintech_use_num, real_expense.bank_name, real_expense.balance_amt, real_expense.tran_date, real_expense.tran_time,
                real_expense.inout_type, real_expense.tran_type, real_expense.print_content, real_expense.tran_amt,real_expense.after_balance_amt, real_expense.branch_name,
                bank_account.account_num_masked FROM real_expense INNER JOIN bank_account ON real_expense.fintech_use_num = bank_account.fintech_use_num 
                WHERE bank_account.user_id = ? ORDER BY real_expense.tran_date desc;`,
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
    router.post('/update_category', function (req, res) {
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
    router.post('/selectedAccountHistory', function (req, res) {
        var userID = req.body.userID;
        var fintechUseNum = req.body.fintech_use_num;
        db.query(`SELECT * FROM real_expense WHERE user_id = ? AND fintech_use_num = ? ORDER BY tran_date desc`, [userID, fintechUseNum], function (error, result) {
            if (error) throw error;
            else {
                if (result[0] != undefined) {
                    res.send(result);
                    console.log(fintechUseNum, "의 계좌내역 조회 완료");
                    console.log(result);
                }
                else {
                    console.log(fintechUseNum, "의 계좌 내역이 없습니다.(연동만 O, 내역존재 X)");
                    res.send([]);
                }
            }
        });
    });


    return router;
}
