let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let canvasImageSchema = new Schema({
    data: 'Buffer'
})

canvasImageSchema.methods = {}

canvasImageSchema.statics = {
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

mongoose.model('CanvasImage', canvasImageSchema)