let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let websiteSchema = new Schema({
    origin: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

websiteSchema.methods = {}

websiteSchema.statics = {}



mongoose.model('Website', websiteSchema)