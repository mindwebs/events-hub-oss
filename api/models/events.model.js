const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    eventId: { type: Number, required: true, unique: true },
    eventName: { type: String, required: true },
    eventSummary: { type: String, required: true },
    eventDescription: { type: String, required: true },
    eventStartDate: {type: String, required: true},
    eventEndDate: {type: String, required: true},
    eventStartTime: { type: String, required: true }, 
    eventEndTime: { type: String, required: true },
    eventOwner: { type: String, required: true},
    eventSmallPic: {type: String},
    eventHeaderPic: {type: String},
    eventVideo: {type: String},
    status : {type: String, required: true},
    location: {type: String, required: true}
},
{
    timestamps: true
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;