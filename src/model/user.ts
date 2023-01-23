import mongoose, { Schema, models, model } from 'mongoose';

const UserSchema = new Schema({
    firstname: {
        type: String,
        require: true,
    },
    lastname: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    avatar: {
        type: String,
        require: false,
    },
    email: {
        type: String,
        require: true,
    },
    salary: {
        type: Number,
        require: true,
    },
    status: {
        type: String,
        require: true,
    },
    birthDate: {
        type: String,
        require: false,
    }

});

const Users = models.user || model('user', UserSchema);
export default Users;