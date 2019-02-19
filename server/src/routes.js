const mongoose = require('mongoose');

let express = require('express');
let router = express.Router();

const {
    json
} = require('./utils/response');
const {
    mongooseAction
} = require('./utils/service');

const Website = mongoose.model('Website');
const Session = mongoose.model('Session');
const getRecordModel = require('./models/record');

router.get('*', (req, res, next) => {
    next();
})

router.get('/websites', (req, res) => {
    mongooseAction(async () => {
        let list = await Website.list()
        json(res, list)
    }, res)
})

router.route('/website/:id')
    .all((req, res, next) => {
        next()
    })
    .delete((req, res) => {
        mongooseAction(async () => {
            let {
                id
            } = req.params
            // await 
        })
    })

router.route('/sessions')
    .all((req, res, next) => {
        next()
    })
    .get((req, res) => {
        mongooseAction(async () => {
            let {
                websiteId
            } = req.query
            let list = await Session.list({
                websiteId
            }, '-page')
            json(res, list)
        }, res)
    })
    .delete((req, res) => {
        mongooseAction(() => {
            let {
                ids
            } = req.query
            Promise.all(ids.map(async _id => {
                return await Session.delete(_id)
            }))
            json(res, '删除成功！')
        })
    })

router.route('/session/:id')
    .all((req, res, next) => {
        next()
    })
    .get((req, res) => {
        mongooseAction(async () => {
            let {
                id
            } = req.params
            if (!id)
                return json(res, '缺少必须的查询参数！', {
                    status: 400
                })
            let session = await Session.get({
                _id: id
            })
            json(res, session)
        }, res)

    })
    .delete((req, res) => {
        mongooseAction(async () => {
            let {
                id
            } = req.params
            if (!id)
                return json(res, '缺少必须的查询参数！', {
                    status: 400
                })
            await Session.delete({
                _id: id
            })
            json(res, '删除成功！')
        })
    })

router.get('/records/:websiteId/:sessionId', (req, res, next) => {
    mongooseAction(async () => {
        let {
            websiteId,
            sessionId
        } = req.params;
        let Record = getRecordModel(websiteId)
        let records = await Record.find({
            sessionId
        }, '_id')
        json(res, records.map(val => val._id))
    })

})

router.route('/record/:websiteId/:id')
    .all((req, res, next) => {
        next()
    })
    .get((req, res) => {
        mongooseAction(async () => {
            let {
                websiteId,
                id
            } = req.params
            let Record = getRecordModel(websiteId)
            let record = await Record.get({
                _id: id
            })
            json(res, record)
        })
    })

module.exports = router;