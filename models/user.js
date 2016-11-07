const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt-nodejs');


//User Schema
const UserSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        firstName: { type: String },
        lastName: { type: String }
    },
    role: {
        type: String,
        enum: ['Admin', 'User'],
        default: 'User'
    },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date }
}, {
        timestamps: true
    });

//hash password before saving
UserSchema.pre('save', function (next) { 
    const user = this,
        SALT_FACTOR = 5;
    
    //Check is password is modified
    if (!user.isModified('password')) return next();

    //Generate salt
    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        if (err) return next(salt);

        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
         });
    })
});


//compare password for login

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return next(err);

        cb(null, isMatch);
    });
}

module.exports = mongoose.model('User', UserSchema);