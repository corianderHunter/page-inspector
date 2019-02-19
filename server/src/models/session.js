let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let moment = require('moment');

let sessionSchema = new Schema({
    websiteId: Schema.ObjectId,
    userAgent: String,
    createdAt: {
        type: String,
        default: moment().format('YYYY-MM-DD HH:mm:ss'),
    },
    closedAt: {
        type: String,
        default: moment().format('YYYY-MM-DD HH:mm:ss'),
    },
    page: Object,
    path: String,
    interval: Number,
    ip: String,
    max: {
        type: Number,
        default: 0
    },
    version: String,
    userSession: String
})

sessionSchema.methods = {}

sessionSchema.statics = {
    async countByWebsite(websiteId) {
        return await this.countDocuments({
            websiteId
        })
    },
    async list(...args) {
        return await this.find(...args)
    },
    async get(...args) {
        return await this.findOne(...args)
    },
    async remove(...args) {
        return await this.deleteMany(...args)
    }
}

mongoose.model('Session', sessionSchema)