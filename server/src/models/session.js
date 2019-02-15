let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let sessionSchema = new Schema({
    websiteId: Schema.ObjectId,
    userAgent: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    closedAt: Date,
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

sessionSchema.statics = {}

mongoose.model('Session', sessionSchema)