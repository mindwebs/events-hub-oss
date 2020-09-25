const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const registerSchema = new Schema({
    eventId: { type: Number, required: true },
    ticketId: { type: Number, required: true, unique: true },
    ticketCode: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true},
    mobile: { type: Number, required: true },
    purchaseTime: {type: String, required: true},
    ticketType: {type: String, required: true},
    price: { type: Number, required: true },
    discountCode: {type: String, required: true},
    paymentStatus: {type: Boolean, required: true},
    paymentMode: {type: String, required: true},
    attendedStatus: {type: Boolean, required: true}
},
{
    timestamps: true
});

// registerSchema.index({ eventId: 1, userId: 1}, { unique: true });

const Register = mongoose.model('Register', registerSchema);

module.exports = Register;