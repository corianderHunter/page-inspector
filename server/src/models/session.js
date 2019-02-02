let session = {
    userAgent: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    closedAt: Date,
    page: Object
}