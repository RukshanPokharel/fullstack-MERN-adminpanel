// User model or User Schema which we pass to mongoose and mongoDb will use this model as an Entity in MySql

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 100
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true // email must by unique
    },
    password: {
        type: String,
        required: true,
        min: 5,

    },
    city: String,
    state: String,
    country: String,
    occupation: String,
    phoneNumber: String,
    transactions: Array,
    role: {
        type: String,
        enum: ["user", "admin", "superadmin"],
        default: "admin"

    }
},
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
