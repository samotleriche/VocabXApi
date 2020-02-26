const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env'});

const Quiz = require('./models/Quiz');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

const quizzes = JSON.parse(fs.readFileSync(`${__dirname}/_data/quizzes.json`,'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'));

const importData = async () => {
    try {
        await Quiz.create(quizzes);

        console.log('Data Imported...'.green.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
    }
}

// Delete data

const deleteData = async () => {
    try {
        await Quiz.deleteMany();

        console.log('Data Destroyed...'.red.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
    }
}

if(process.argv[2] == '-i') {
    importData();
    
}else if(process.argv[2] == '-d'){
    deleteData();
}