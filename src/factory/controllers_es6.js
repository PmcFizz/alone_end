/**
 * Created by FizzPang on 2017/8/10.
 */

let router = require('express').Router();
let waitreplace = require(PROXY).waitreplace;
let async = require('async');
let reqBody;

/**
 * handl return function
 * @param err errmsg
 * @param returnData return data
 */
const resFunc = (err, returnData, res) => {
    if (error) {
        return returnFAIL(res, err.message);
    } else {
        return returnSUCCESS(res, returnData);
    }
};

/**
 * to add waitreplace page
 */
router.get('/add', (req, res) => {
    res.render('waitreplace/add');
});

/**
 * to waitreplace list page
 */
router.get('/waitreplaces', (req, res) => {
    res.render('waitreplace/waitreplaces');
});

/**
 * to waitreplace list page
 */
router.get('/edit', (req, res) => {
    res.render('waitreplace/edit');
});

/**
 * add one waitreplace api
 */
router.post('/add-post', (req, res) => {
    reqBody = req.body;
    waitreplace.addOneWaitreplace(reqBody, (error, returnData) => {
        resFunc(error, returnData, res);
    });
});

/**
 * use dateTable query waitreplace data
 */
router.post('/queryByDataTable', (req, res) => {
    reqBody = req.body;
    let query = {};
    let opt = {};
    if (reqBody.name) {
        query.name = reqBody.name;
    }
    opt.limit = reqBody.length;
    opt.skip = reqBody.start;

    async.parallel([
        (cb) => {
            waitreplace.countWaitreplace(query, (error, returnData) => {
                if (error) {
                    cb(error);
                } else {
                    cb(null, returnData);
                }
            });
        },
        (cb) => {
            waitreplace.queryWaitreplaceByPage(query, opt, (error, returnData) => {
                if (error) {
                    cb(error);
                } else {
                    cb(null, returnData);
                }
            })
        }

    ], (err, result) => {
        let dataTableModel = {
            recordsFiltered: result[0],
            recordsTotal: result[0],
            data: result[1]
        };
        return res.json(dataTableModel);
    });
});

/**
 * del one data
 */
router.post('/del-post', (req, res) => {
    reqBody = req.body;
    let id = reqBody._id ? reqBody._id : reqBody.id;
    waitreplace.delOneWaitreplace({_id: id}, (error, resData) => {
        resFunc(error, resData, res);
    })
});

/**
 * query only one  waitreplace data
 */
router.post('/queryById', (req, res) => {
    reqBody = req.body;
    let id = reqBody._id ? reqBody._id : reqBody.id;
    waitreplace.findOneWaitreplace(id, (error, returnData) => {
        resFunc(error, returnData, res);
    });
});

/**
 * query waitreplace data
 */
router.post('/query', (req, res) => {
    reqBody = req.body;
    let option = {};
    waitreplace.queryWaitreplaces(reqBody, option, (error, returnData) => {
        resFunc(error, returnData, res);
    });
});

/**
 * update one waitreplace data
 */
router.post('/update-post', (req, res) => {
    reqBody = req.body;
    let id = reqBody._id ? reqBody._id : reqBody.id;
    delete  reqBody._id;
    delete  reqBody.id;
    waitreplace.updateOneWaitreplace({_id: id}, {$set: reqBody}, (error, returnData) => {
        resFunc(error, returnData, res);
    });
});

module.exports = router;