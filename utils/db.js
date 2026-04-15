const mongoose = require("mongoose");

let cachedConnection = null;
let cachedPromise = null;

async function connectDB() {
    if (cachedConnection && mongoose.connection.readyState === 1) {
        return cachedConnection;
    }

    if (!process.env.DATABASE) {
        throw new Error("DATABASE environment variable is not set");
    }

    if (!cachedPromise) {
        cachedPromise = mongoose
            .connect(process.env.DATABASE, {
                serverSelectionTimeoutMS: 10000,
            })
            .then((connection) => {
                cachedConnection = connection;
                console.log("database connection is successful");
                return connection;
            })
            .catch((error) => {
                cachedPromise = null;
                throw error;
            });
    }

    cachedConnection = await cachedPromise;
    return cachedConnection;
}

module.exports = connectDB;