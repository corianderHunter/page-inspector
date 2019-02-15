let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let recordSchema = new Schema({
    path: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    data: Array
})

recordSchema.methods = {}

recordSchema.statics = {}

mongoose.model('Record', recordSchema)