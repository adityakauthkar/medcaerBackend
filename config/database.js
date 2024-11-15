const mongoose = require('mongoose');
require('colors');

const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
        });
        console.log(`Cloud is connected to ${con.connection.host}`.blue);
    } catch (err) {
        console.error(`Error: ${err.message}`.red);
        process.exit(1);
    }
}

module.exports = connectDB;
