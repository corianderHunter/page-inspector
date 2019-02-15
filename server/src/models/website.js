let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let websiteSchema = new Schema({
    origin: {
        type: String,
        default: ''
    },
    version: Array,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    lastestVisited: Date
})

websiteSchema.methods = {

}

websiteSchema.statics = {

}
module.exports = function () {
    return;
}