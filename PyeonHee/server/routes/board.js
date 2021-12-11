//사용자 고객센터 확인 및 글 작성
module.exports = function () {
    var db = require('../db_config.js');
    var express = require('express');
    var router = express.Router();
    router.use(express.json());

    /*사용자 고객센터(앱)_ 사용자가 글 작성 및 관리자가 단 댓글 */
    //사용자 고객센터 글 목록확인
    router.get('/List', function (req, res) {
        db.query(`SELECT * FROM board ORDER BY board_number desc`, function (error, result) {
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

    //사용자 고객센터 글 내용 확인
    router.get('/Board', function (req, res) {
        var boardID = req.query.boardID;
        var data;
        db.query(`SELECT * FROM board WHERE board_number =?`, [boardID], function (error, result2) {
            if (error) throw error;
            else {
                db.query(`SELECT count(board_number) as counts FROM comment WHERE board_number =?`, [boardID], function (error, result) {
                    if (error) throw error;
                    else {
                        console.log(result[0].counts);
                        var comments = result[0].counts;
                        if (comments > 0) {//답변 존재 O
                            data = {
                                status: true
                            }
                            console.log(data);
                        }
                        else {//답변 존재 X
                            data = {
                                status: false
                            }
                            console.log(data);
                        }
                        const data2 = {
                            boardTitle: result2[0].title,
                            boardCate: result2[0].category,
                            boardDate: result2[0].board_date,
                            boardContent: result2[0].content,
                            boardAnswer: data.status
                        }
                        res.send(data2);
                        console.log(data2);
                    }
                });
            }
        });
    });

    //사용자 고객센터 글 작성
    router.post('/Register', function (req, res) {
        var userID = req.body.userID;
        var boardTitle = req.body.boardTitle;
        var boardCate = req.body.boardCate;
        var boardContent = req.body.boardContent;

        db.query(`INSERT INTO board (title, content, user_id, category) VALUES (?, ?, ?, ?)`, [boardTitle, boardContent, userID, boardCate], function (error, result) {
            if (error) throw error;
            else {
                const data = {
                    status: 'success',
                }
                res.send(data);
                console.log(data);
                db.query(`alter table board auto_increment = 1;`, function (error, result) {
                    if (error) throw error;
                    else {
                        db.query(`SET @COUNT = 0;`, function (error, result) {
                            if (error) throw error;
                            else {
                                db.query(`UPDATE board SET board_number = @COUNT:=@COUNT+1;`, function (error, result) {
                                    if (error) throw error;
                                    else {
                                        //console.log("게시판 글 번호 정렬 완료");
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    });

    //사용자 고객센터 글 수정
    router.post('/Update', function (req, res) {
        var boardID = req.body.boardID;
        var boardTitle = req.body.boardTitle;
        var boardCate = req.body.boardCate;
        var boardContent = req.body.boardContent;

        db.query(`UPDATE board SET category = ?, title = ? , content = ? WHERE board_number = ?`, [boardCate, boardTitle, boardContent, boardID], function (error, result) {
            if (error) throw error;
            else {
                const data = {
                    status: 'success'
                }
                res.send(data);
                //console.log(data);
            }
        });
    });

    //사용자 고객센터 글 삭제
    router.get('/deleteBoard', function (req, res) {
        var boardNumber = req.query.boardID;
        db.query(`DELETE FROM board WHERE board_number = ?`, [boardNumber], function (error, result) {
            if (error) throw error;
            else {
                const data = {
                    status: true
                }
                res.send(data);

                db.query(`alter table board auto_increment = 1;`, function (error, result) {
                    if (error) throw error;
                    else {
                        db.query(`SET @COUNT = 0;`, function (error, result) {
                            if (error) throw error;
                            else {
                                db.query(`UPDATE board SET board_number = @COUNT:=@COUNT+1;`, function (error, result) {
                                    if (error) throw error;
                                    else {
                                        //console.log("게시판 글 번호 정렬 완료");
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    });

    //사용자 고객센터 답변확인
    router.get('/Reply', function (req, res) {
        var boardID = req.query.boardID;
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


    return router;
}