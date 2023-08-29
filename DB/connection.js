const mongoose = require('mongoose')
mongoose.set('strictQuery',false);
const connectDB = () => {
    const DB_URL="mongodb+srv://iti:firstproject@evcstations.coojaue.mongodb.net/test";
    return mongoose.connect(DB_URL).then((result) => {
        console.log(`DB connected.......`);
    }).catch(err => console.log('fail to connect DB' , err))
}

module.exports = connectDB