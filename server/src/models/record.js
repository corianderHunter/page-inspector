let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let moment = require('moment');

let recordSchema = new Schema({
    sessionId: Schema.ObjectId,
    createdAt: {
        type: String,
        default: moment().format('YYYY-MM-DD HH:mm:ss')
    },
    data: Object
})

recordSchema.methods = {}

recordSchema.statics = {
    async get(...args) {
        return await this.findById(...args);
    },
}

module.exports = function (websiteId) {
    return mongoose.model(websiteId + '_Record', recordSchema);
}