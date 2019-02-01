const mongoose = require('mongoose');
let connect = () => {
    let options = {
        server: {
            socketOption: {
                keepAlive: 1
            }
        }
    };
    mongoose.connect(db, options);
    return mongoose.connection;
};