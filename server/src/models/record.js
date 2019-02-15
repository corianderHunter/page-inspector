let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let recordSchema = new Schema({
    sessionId: Schema.ObjectId,
    path: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    data: Array
})

recordSchema.methods = {}

recordSchema.statics = {}

module.exports = function (websiteId) {
    return mongoose.model(websiteId + '_Record', recordSchema);
}