const mongoose = require('./mongoose');

module.exports = {
    init: () => {
        const dbOptions = {
            useNewUrlParser: true,
            autoIndex: false,
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 500,
            poolSize: 5,
            connectTimeoutMS: 10000,
            family: 4
        };
        mongoose.connect("mongodb://space_cabbie:Cabbie111222@ds259207.mlab.com:59207/heroku_sf7429h4", dbOptions);
        mongoose.set("useFindAndModify", false);
        mongoose.Promise = global.Promise;

        mongoose.connection.on("connected", () => {
            console.log("Connected");
            client.channels.get('667088501895856178').send("Connected!");
        })

        mongoose.connect.on('err', () => {
            client.channels.get('667088501895856178').send("Error connecting.");
        })
    }
}