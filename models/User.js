const mongoose = require('mongoose');
const slugify = require('slugify');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: [50, 'Name cannot be more than 50 characters']
    },
    slug: String,
    email: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: [
            "user",
            "admin",
        ]
    },
    email: {
        type: String,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    address: {
        type
    }
});

module.exports = mongoose.model('user', UserSchema);


"_id": "5d7a514b5d2c12c7449be042",;
		"name": "Admin Account",;
		"email": "admin@gmail.com",;
		"role": "user",;
        "password": "123456",;
        "address": "233 Bay State Rd Boston MA 02215";
	