const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    eventId: { type: Number, required: true, unique: true },
    ticketType: [{
        id: { type: Number, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        number: { type: Number, required: true }
    }],
    discountCode: [{
        name: { type: String, required: true },
        value: { type: Number, required: true }
    }],
    eventParticipants: {type: Number, required: true},
    eventMaxParticipants: {type: Number, required: true},
},
{
    timestamps: true
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;