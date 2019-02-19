const {
    json
} = require('./response')
module.exports = {
    mongooseAction(callback, res) {
        callback().catch(e => {
            json(res, '数据库相关错误！', {
                ...e,
                status: 400
            })
        })
    }
}