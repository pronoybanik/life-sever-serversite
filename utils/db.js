const mongoose = require("mongoose");

let cachedConnection = null;
let cachedPromise = null;

function getMongoUri() {
    return (
        process.env.DATABASE ||
        process.env.MONGODB_URI ||
        process.env.MONGO_URI
    );
}

async function connectDB() {
    if (cachedConnection && mongoose.connection.readyState === 1) {
        return cachedConnection;
    }

    const mongoUri = getMongoUri();

    if (!mongoUri) {
        throw new Error("Missing MongoDB URI. Set one of: DATABASE, MONGODB_URI, MONGO_URI");
    }

    if (!cachedPromise) {
        cachedPromise = mongoose
            .connect(mongoUri, {
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