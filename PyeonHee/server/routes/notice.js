//사용자 공지사항 확인
module.exports = function () {
    var db = require('../config_db.js');
    var express = require('express');
    var router = express.Router();
    router.use(express.json());

    /*사용자 공지사항(앱)_ 관리자가 작성한 글 확인 */
    //사용자 공지사항 글 목록 확인
    router.get('/noticeList', function (req, res) {
        db.query(`SELECT * FROM notice ORDER BY notice_number desc`, function (error, result) {
            if (error) throw error;
            else {
                res.send(result);
                console.log(result);
            }
        });
    });

    //사용자 공지사항 글 내용 확인
    router.get('/noticeBoard', function (req, res) {
        var boardID = req.query.boardID;
        db.query(`SELECT * FROM notice WHERE notice_number =?`, [boardID], function (error, result) {
            if (error) throw error;
            else {
                const data = {
                    boardTitle: result[0].title,
                    boardCate: result[0].category,
                    boardDate: result[0].notice_date,
                    boardModiDate: result[0].modified_date,
                    boardContent: result[0].content
                }
                res.send(data);
                console.log(data);
            }
        });
    });



    return router;
}