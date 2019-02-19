let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let moment = require('moment');

let websiteSchema = new Schema({
    origin: {
        type: String,
        default: ''
    },
    version: Array,
    createdAt: {
        type: String,
        default: moment().format('YYYY-MM-DD HH:mm:ss'),
    },
    lastestVisited: {
        type: String,
        default: moment().format('YYYY-MM-DD HH:mm:ss'),
    }
})


websiteSchema.methods = {

}

websiteSchema.statics = {
    async list(...args) {
        const Session = mongoose.model('Session');
        return Promise.all([...(await this.find(...args))].map(async website => {
            return {
                ...website._doc,
                count: await Session.countByWebsite(website._id)
            }
        }))
    }
}

mongoose.model('Website', websiteSchema)