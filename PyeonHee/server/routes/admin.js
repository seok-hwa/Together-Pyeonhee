//관리자 웹페이지
module.exports = function () {
    var db = require('../config_db.js');
    var express = require('express');
    var router = express.Router();
    router.use(express.json());

    /* 관리자 웹페이지 */
    //관리자 로그인
    router.post('/adminLogin', function (req, res) {
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
    router.post('/notificationWrite', function (req, res) {
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
                db.query(`alter table notice auto_increment = 1;`, function (error, result) {
                    if (error) throw error;
                    else {
                        db.query(`SET @COUNT = 0;`, function (error, result) {
                            if (error) throw error;
                            else {
                                db.query(`UPDATE notice SET notice_number = @COUNT:=@COUNT+1;`, function (error, result) {
                                    if (error) throw error;
                                    else {
                                        //console.log("공지사항 글 번호 정렬 완료");
                                    }
                                });
                            }
                        });
                    }
                });
                //관리자 공지사항 등록 시, 사용자에게 푸시알림
                db.query(`SELECT * FROM user WHERE deviceToken IS NOT NULL`, function (error, result) {
                    if (error) throw error;
                    else {
                        for (i in result) {
                            (function (i) {
                                var userID = result[i].user_id;
                                var deviceToken = result[i].deviceToken;
                                let target_token = deviceToken;//알림을 받을 디바이스의 토큰값
                                let message = {
                                    notification: {
                                        title: '**편히가계 공지사항**',
                                        body: '[' + boardCate + '] ' + boardTitle
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
                            })(i);
                        }
                    }
                });
            }
        });
    });

    //관리자 공지사항 목록 확인
    router.post('/adminGetNotificationList', function (req, res) {
        var pageNumber = (req.body.pageNumber - 1) * 10;
        db.query(`SELECT * FROM notice ORDER BY notice_number desc limit ?, 10`, [pageNumber], function (error, result) {
            if (error) throw error;
            else {
                res.send(result);
                console.log(result);
            }
        });
    });

    //관리자 공지사항 전체페이지 수
    router.get('/notificationTotalPage', function (req, res) {
        db.query(`SELECT AUTO_INCREMENT FROM information_schema.TABLES 
                WHERE TABLE_SCHEMA = "mysql-db" AND TABLE_NAME = "notice"`, function (error, result) {
            if (error) throw error;
            else {
                //console.log(result[0].AUTO_INCREMENT);
                var totalPage = Math.ceil((result[0].AUTO_INCREMENT - 1) / 10);
                const data = {
                    totalPage
                }
                res.send(data);
                console.log(data);
            }
        });
    });

    //관리자 공지사항 글 내용 확인
    router.post('/NotificationBoardInfo', function (req, res) {
        var noticeNumber = req.body.boardID;
        db.query(`SELECT * FROM notice WHERE notice_number =?`, [noticeNumber], function (error, result) {
            if (error) throw error;
            else {
                res.send(result);
                console.log(result);
            }
        });
    });

    //관리자 공지사항 글 수정
    router.post('/notificationBoardUpdate', function (req, res) {
        var noticeNumber = req.body.boardID;
        var boardTitle = req.body.boardTitle;
        var boardContent = req.body.boardContent;
        var boardCate = req.body.boardCate;
        var now = new Date();
        db.query(`UPDATE notice SET category = ?, title = ? , content = ? , modified_date = ? WHERE notice_number = ?`, [boardCate, boardTitle, boardContent, now, noticeNumber], function (error, result) {
            if (error) throw error;
            else {
                const data = {
                    status: 'success',
                }
                res.send(data);
                //console.log(data);
            }
        });
    });

    //관리자 공지사항 글 삭제
    router.post('/notificationDelete', function (req, res) {
        var noticeNumber = req.body.boardID;
        db.query(`DELETE FROM notice WHERE notice_number = ?`, [noticeNumber], function (error, result) {
            if (error) throw error;
            else {
                const data = {
                    status: 'success',
                }
                res.send(data);
                //console.log(data);

                db.query(`alter table notice auto_increment = 1;`, function (error, result) {
                    if (error) throw error;
                    else {
                        db.query(`SET @COUNT = 0;`, function (error, result) {
                            if (error) throw error;
                            else {
                                db.query(`UPDATE notice SET notice_number = @COUNT:=@COUNT+1;`, function (error, result) {
                                    if (error) throw error;
                                    else {
                                        //console.log("공지사항 글 번호 정렬 완료");
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    });


    /*관리자 웹페이지_ 고객센터 사용자가 등록한 글 확인 및 답변 작성 */
    //관리자 고객센터 목록 확인
    router.post('/adminGetQueryList', function (req, res) {
        var pageNumber = (req.body.pageNumber - 1) * 10;
        db.query(`SELECT * FROM board ORDER BY board_number desc limit ?, 10`, [pageNumber], function (error, result) {
            if (error) throw error;
            else {
                res.send(result);
                console.log(result);
                /* 임시 글 번호 정렬 */
                db.query(`alter table board auto_increment = 1;`, function (error, result) {
                    if (error) throw error;
                    else {
                        db.query(`SET @COUNT = 0;`, function (error, result) {
                            if (error) throw error;
                            else {
                                db.query(`UPDATE board SET board_number = @COUNT:=@COUNT+1;`, function (error, result) {
                                    if (error) throw error;
                                    else {
                                        //console.log("고객센터 글 번호 정렬 완료");
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    });

    //관리자 고객센터 전체페이지 수
    router.get('/serviceCenterTotalPage', function (req, res) {
        db.query(`SELECT AUTO_INCREMENT FROM information_schema.TABLES 
                WHERE TABLE_SCHEMA = "mysql-db" AND TABLE_NAME = "board"`, function (error, result) {
            if (error) throw error;
            else {
                //console.log(result[0].AUTO_INCREMENT);
                var totalPage = Math.ceil((result[0].AUTO_INCREMENT - 1) / 10);
                const data = {
                    totalPage
                }
                res.send(data);
                console.log(data);
            }
        });
    });


    //관리자 고객센터 내용확인(사용자가 작성한 내용)
    router.post('/queryBoardInfo', function (req, res) {
        console.log('이거 확인', req.body.boardID);
        var boardID = req.body.boardID;
        db.query(`SELECT * FROM board WHERE board_number = ?`, [boardID], function (error, result) {
            if (error) throw error;
            else {
                res.send(result);
                console.log(result);
            }
        });
    });

    //관리자 고객센터 댓글확인(관리자가 단 댓글)
    router.post('/queryReplyBoardInfo', function (req, res) {
        var boardID = req.body.boardID;
        db.query(`SELECT * FROM comment WHERE board_number = ?;`, [boardID], function (error, result) {
            if (error) throw error;
            else {
                const data = {
                    answerDate: result[0].comment_date,
                    answerContent: result[0].content
                }
                res.send(data);
                console.log(data);
            }
        });
    });

    //관리자 고객센터 댓글 작성
    router.post('/replyWrite', function (req, res) {
        var boardID = req.body.boardID;
        var replyContent = req.body.replyContent;
        db.query(`INSERT INTO comment (board_number, content) VALUES (?, ?)`, [boardID, replyContent], function (error, result) {
            if (error) throw error;
            else {
                db.query(`UPDATE board SET comment_check = 1 WHERE board_number = ?`, [boardID], function (error, result) {
                    if (error) throw error;
                    else {
                        const data = {
                            status: 'success',
                        }
                        res.send(data);
                        console.log(data);
                    }
                });
            }
        });
    });

    //관리자 고객센터 댓글 수정
    router.post('/replyUpdate', function (req, res) {
        var boardID = req.body.boardID;
        var replyContent = req.body.replyContent;
        db.query(`UPDATE comment SET content = ? WHERE board_number = ?`, [replyContent, boardID], function (error, result) {
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


    //관리자 웹페이지 메인화면 (공지사항 최신글 10개)
    router.get('/notificationInMain', function (req, res) {
        db.query(`SELECT * FROM notice ORDER BY notice_number desc limit 10`, function (error, result) {
            if (error) throw error;
            else {
                res.send(result);
                console.log(result);
            }
        });
    });

    //관리자 웹페이지 메인화면 (고객센터 최신글 10개)
    router.get('/queryInMain', function (req, res) {
        db.query(`SELECT * FROM board ORDER BY board_number desc limit 10`, function (error, result) {
            if (error) throw error;
            else {
                res.send(result);
                console.log(result);
            }
        });
    });



    /* 관리자 웹페이지 금융상담 */
    //관리자 상담사 목록 확인(자산관리)
    router.post('/adminGetCounselorAssetList', function (req, res) {
        var pageNumber = (req.body.pageNumber - 1) * 10;
        db.query(`SELECT * FROM AssetCounselor ORDER BY counselor_id desc limit ?, 10`, [pageNumber], function (error, result) {
            if (error) throw error;
            else {
                res.send(result);
                console.log(result);
            }
        });
    });

    //관리자 상담사 전체페이지 수(자산관리)
    router.get('/counselorAssetListTotalPage', function (req, res) {
        db.query(`SELECT count(*) as count FROM AssetCounselor`, function (error, result) {
            if (error) throw error;
            else {
                var totalPage = Math.ceil((result[0].count) / 10);
                const data = {
                    totalPage
                }
                res.send(data);
                console.log(data);
            }
        });
    });

    //관리자 상담사 세부정보 확인(자산관리)
    router.post('/counselorAssetInfo', function (req, res) {
        var counselorID = req.body.boardID;
        db.query(`SELECT * FROM AssetCounselor WHERE counselor_id =?`, [counselorID], function (error, result) {
            if (error) throw error;
            else {
                const data = {
                    name: result[0].name,
                    //counselorCate: result[0].category,
                    company: result[0].company,
                    email: result[0].email
                }
                res.send(data);
                console.log(data);
            }
        });
    });

    //관리자 상담사 추가(자산관리)
    router.post('/inputCounselorInAsset', function (req, res) {
        var name = req.body.name;
        var company = req.body.company;
        var email = req.body.email;

        db.query(`INSERT INTO AssetCounselor(name, company, email) VALUES (?, ?, ?)`, [name, company, email], function (error, result) {
            if (error) throw error;
            else {
                const data = {
                    status: 'success',
                }
                console.log(data);
                res.send(data);
            }
        });
    });

    //관리자 상담사 삭제(자산관리)
    router.post('/counselorAssetDelete', function (req, res) {
        var counselorID = req.body.boardID;

        db.query(`DELETE FROM AssetCounselor WHERE counselor_id = ?`, [counselorID], function (error, result) {
            if (error) throw error;
            else {
                const data = {
                    status: 'success',
                }
                console.log(data);
                res.send(data);
            }
        });
    });

    //관리자 상담사 목록 확인(금융상담)
    router.post('/adminGetCounselorFinancialList', function (req, res) {
        var pageNumber = (req.body.pageNumber - 1) * 10;
        db.query(`SELECT * FROM FinancialCounselor ORDER BY counselor_id desc limit ?, 10`, [pageNumber], function (error, result) {
            if (error) throw error;
            else {
                res.send(result);
                console.log(result);
            }
        });
    });

    //관리자 상담사 전체페이지 수(금융상담)
    router.get('/counselorFinancialListTotalPage', function (req, res) {
        db.query(`SELECT count(*) as count FROM FinancialCounselor`, function (error, result) {
            if (error) throw error;
            else {
                var totalPage = Math.ceil((result[0].count) / 10);
                const data = {
                    totalPage
                }
                res.send(data);
                console.log(data);
            }
        });
    });

    //관리자 상담사 세부정보 확인(금융상담)
    router.post('/counselorFinancialInfo', function (req, res) {
        var counselorID = req.body.boardID;
        db.query(`SELECT * FROM FinancialCounselor WHERE counselor_id =?`, [counselorID], function (error, result) {
            if (error) throw error;
            else {
                const data = {
                    name: result[0].name,
                    field: result[0].part,
                    company: result[0].company,
                    email: result[0].email
                }
                res.send(data);
                console.log(data);
            }
        });
    });

    //관리자 상담사 추가(금융상담)
    router.post('/inputCounselorInFinancial', function (req, res) {
        var name = req.body.name;
        var company = req.body.company;
        var email = req.body.email;
        var field = req.body.field;

        db.query(`INSERT INTO FinancialCounselor(name, company, part, email) VALUES (?, ?, ?, ?)`, [name, company, field, email], function (error, result) {
            if (error) throw error;
            else {
                const data = {
                    status: 'success',
                }
                console.log(data);
                res.send(data);
            }
        });
    });

    //관리자 상담사 삭제(금융상담)
    router.post('/counselorFinancialDelete', function (req, res) {
        var counselorID = req.body.boardID;

        db.query(`DELETE FROM FinancialCounselor WHERE counselor_id = ?`, [counselorID], function (error, result) {
            if (error) throw error;
            else {
                const data = {
                    status: 'success',
                }
                console.log(data);
                res.send(data);
            }
        });
    });

    /* 관리자 웹페이지 금융상품 */
    //관리자 금융상품 목록 확인(적금)
    router.post('/adminGetFinancialSavingList', function (req, res) {
        var pageNumber = (req.body.pageNumber - 1) * 10;
        db.query(`SELECT * FROM saving_product ORDER BY saving_number desc limit ?, 10`, [pageNumber], function (error, result) {
            if (error) throw error;
            else {
                res.send(result);
                console.log(result);
            }
        });
    });

    //관리자 금융상품 전체페이지 수(적금)
    router.get('/financialSavingListTotalPage', function (req, res) {
        db.query(`SELECT count(*) as count FROM saving_product`, function (error, result) {
            if (error) throw error;
            else {
                var totalPage = Math.ceil((result[0].count) / 10);
                const data = {
                    totalPage
                }
                res.send(data);
                console.log(data);
            }
        });
    });

    //관리자 금융상품 세부정보 확인(적금)
    router.post('/savingBoardInfo', function (req, res) {
        var savingID = req.body.boardID;
        db.query(`SELECT * FROM saving_product WHERE saving_number =?`, [savingID], function (error, result) {
            if (error) throw error;
            else {
                const data = {
                    result
                }
                res.send(data);
                console.log(data);
            }
        });
    });

    //관리자 금융상품 추가(적금)
    router.post('/insertSaving', function (req, res) {
        console.log("값 확인", req.body);
        var productName = req.body.productName;
        var productBankName = req.body.productBankName;
        var type = req.body.type;
        var interest = req.body.interest;
        var maxInterest = req.body.maxInterest;
        var link = req.body.link;
        var mbti = req.body.mbti;

        db.query(`INSERT INTO saving_product (bank_name, product_name, product_type, interest, max_interest, link, mbti) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`, [productBankName, productName, type, interest, maxInterest, link, mbti], function (error, result) {
            if (error) throw error;
            else {
                const data = {
                    status: 'success',
                }
                console.log(data);
                res.send(data);
            }
        });
    });

    //관리자 금융상품 삭제(적금)
    router.post('/savingDelete', function (req, res) {
        var savingID = req.body.boardID;
        db.query(`DELETE FROM saving_product WHERE saving_number = ?`, [savingID], function (error, result) {
            if (error) throw error;
            else {
                const data = {
                    status: 'success',
                }
                console.log(data);
                res.send(data);
            }
        });
    });



    //관리자 금융상품 목록 확인(펀드)
    router.post('/adminGetFinancialFundList', function (req, res) {
        var pageNumber = (req.body.pageNumber - 1) * 10;
        db.query(`SELECT * FROM fund_product ORDER BY fund_number desc limit ?, 10`, [pageNumber], function (error, result) {
            if (error) throw error;
            else {
                res.send(result);
                console.log(result);
            }
        });
    });

    //관리자 금융상품 전체페이지 수(펀드)
    router.get('/financialFundListTotalPage', function (req, res) {
        db.query(`SELECT count(*) as count FROM fund_product`, function (error, result) {
            if (error) throw error;
            else {
                var totalPage = Math.ceil((result[0].count) / 10);
                const data = {
                    totalPage
                }
                res.send(data);
                console.log(data);
            }
        });
    });

    //관리자 금융상품 세부정보 확인(펀드)
    router.post('/fundBoardInfo', function (req, res) {
        var fundID = req.body.boardID;
        db.query(`SELECT * FROM fund_product WHERE fund_number =?`, [fundID], function (error, result) {
            if (error) throw error;
            else {
                const data = {
                    result
                }
                res.send(data);
                console.log(data);
            }
        });
    });

    //관리자 금융상품 추가(펀드)
    router.post('/insertFund', function (req, res) {
        var productName = req.body.productName;
        var productBankName = req.body.productBankName;
        var profit3 = req.body.profit3;
        var profit6 = req.body.profit6;
        var profit12 = req.body.profit12;
        var fundSize = req.body.fundSize;
        var link = req.body.link;
        var mbti = req.body.mbti;

        db.query(`INSERT INTO fund_product (bank_name, product_name, interest_3, interest_6, interest_12, fund_sum, link, mbti)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [productBankName, productName, profit3, profit6, profit12, fundSize, link, mbti], function (error, result) {
            if (error) throw error;
            else {
                const data = {
                    status: 'success',
                }
                console.log(data);
                res.send(data);
            }
        });
    });

    //관리자 금융상품 삭제(펀드)
    router.post('/fundDelete', function (req, res) {
        var fundID = req.body.boardID;
        db.query(`DELETE FROM fund_product WHERE fund_number = ?`, [fundID], function (error, result) {
            if (error) throw error;
            else {
                const data = {
                    status: 'success',
                }
                console.log(data);
                res.send(data);
            }
        });
    });



    //관리자 금융상품 목록 확인(연금)
    router.post('/adminGetFinancialPensionList', function (req, res) {
        var pageNumber = (req.body.pageNumber - 1) * 10;
        db.query(`SELECT * FROM pension_product ORDER BY pension_number desc limit ?, 10`, [pageNumber], function (error, result) {
            if (error) throw error;
            else {
                res.send(result);
                console.log(result);
            }
        });
    });

    //관리자 금융상품 전체페이지 수(연금)
    router.get('/financialPensionListTotalPage', function (req, res) {
        db.query(`SELECT count(*) as count FROM pension_product`, function (error, result) {
            if (error) throw error;
            else {
                var totalPage = Math.ceil((result[0].count) / 10);
                const data = {
                    totalPage
                }
                res.send(data);
                console.log(data);
            }
        });
    });

    //관리자 금융상품 세부정보 확인(연금)
    router.post('/pensionBoardInfo', function (req, res) {
        var pensionID = req.body.boardID;
        db.query(`SELECT * FROM pension_product WHERE pension_number =?`, [pensionID], function (error, result) {
            if (error) throw error;
            else {
                const data = {
                    result
                }
                res.send(data);
                console.log(data);
            }
        });
    });

    //관리자 금융상품 추가(연금)
    router.post('/insertPension', function (req, res) {
        var productName = req.body.productName;
        var productBankName = req.body.productBankName;
        var interest = req.body.interest;
        var pensionType = req.body.pensionType;
        var disconnected = req.body.disconnected;
        var link = req.body.link;
        var mbti = req.body.mbti;

        db.query(`INSERT INTO pension_product (bank_name, product_name, product_type, disconnected, interest, link, mbti)
                VALUES (?, ?, ?, ?, ?, ?, ?)`, [productBankName, productName, pensionType, disconnected, interest, link, mbti], function (error, result) {
            if (error) throw error;
            else {
                const data = {
                    status: 'success',
                }
                console.log(data);
                res.send(data);
            }
        });
    });

    //관리자 금융상품 삭제(연금)
    router.post('/pensionDelete', function (req, res) {
        var pensionID = req.body.boardID;
        db.query(`DELETE FROM pension_product WHERE pension_number = ?`, [pensionID], function (error, result) {
            if (error) throw error;
            else {
                const data = {
                    status: 'success',
                }
                console.log(data);
                res.send(data);
            }
        });
    });



    //관리자 금융상품 목록 확인(대출)
    router.post('/adminGetFinancialLoanList', function (req, res) {
        var pageNumber = (req.body.pageNumber - 1) * 10;
        db.query(`SELECT * FROM loan_product ORDER BY loan_number desc limit ?, 10`, [pageNumber], function (error, result) {
            if (error) throw error;
            else {
                res.send(result);
                console.log(result);
            }
        });
    });

    //관리자 금융상품 전체페이지 수(대출)
    router.get('/financialLoanListTotalPage', function (req, res) {
        db.query(`SELECT count(*) as count FROM loan_product`, function (error, result) {
            if (error) throw error;
            else {
                var totalPage = Math.ceil((result[0].count) / 10);
                const data = {
                    totalPage
                }
                res.send(data);
                console.log(data);
            }
        });
    });

    //관리자 금융상품 세부정보 확인(대출)
    router.post('/loanBoardInfo', function (req, res) {
        var loanID = req.body.boardID;
        db.query(`SELECT * FROM loan_product WHERE loan_number =?`, [loanID], function (error, result) {
            if (error) throw error;
            else {
                const data = {
                    result
                }
                res.send(data);
                console.log(data);
            }
        });
    });

    //관리자 금융상품 추가(대출)
    router.post('/insertLoan', function (req, res) {
        var productName = req.body.productName;
        var productBankName = req.body.productBankName;
        var interest = req.body.interest;
        var interestType = req.body.interestType;
        var repayType = req.body.repayType;
        var link = req.body.link;

        db.query(`INSERT INTO loan_product (bank_name, product_name, interest_type, repay_type, interest, link)
                VALUES (?, ?, ?, ?, ?, ?)`, [productBankName, productName, interestType, repayType, interest, link], function (error, result) {
            if (error) throw error;
            else {
                const data = {
                    status: 'success',
                }
                console.log(data);
                res.send(data);
            }
        });
    });

    //관리자 금융상품 삭제(대출)
    router.post('/loanDelete', function (req, res) {
        var loanID = req.body.boardID;
        db.query(`DELETE FROM loan_product WHERE loan_number = ?`, [loanID], function (error, result) {
            if (error) throw error;
            else {
                const data = {
                    status: 'success',
                }
                console.log(data);
                res.send(data);
            }
        });
    });




    return router;
}
