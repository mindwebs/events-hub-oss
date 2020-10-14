/*----Packages----*/
const router = require('express').Router();
let Event = require('../models/events.model');

/*----API Endpoint Handlers----*/
/*
    1. /           
    2. /id          
    3. /location    
    4. /add         
    5. /edit        
    6. /delete      
    7. /onwedBy
    8. /search
    9. /today
*/
router.route('/').get((req,res) => {
    Event.find({status: "active"},'eventId eventName eventSummary ticketPrice eventPic eventStartDate eventEndDate location eventSmallPic')
        .then(events => res.json(events))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/id').post((req,res) => {
    Event.findOne({eventId: req.body.id})
        .then(events => res.json(events))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/location').post((req,res) => {
    Event.find({location: req.body.location})
        .then(events => res.json(events))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/add').post((req,res) => {
    const eventName = req.body.eventName;
    const eventSummary = req.body.eventSummary;
    const eventDescription = req.body.eventDescription;
    const eventStartDate = req.body.eventStartDate;
    const eventEndDate = req.body.eventEndDate;
    const eventStartTime = req.body.eventStartTime;
    const eventEndTime = req.body.eventEndTime;
    const eventOwner = req.body.eventOwner;
    const eventSmallPic = req.body.eventSmallPic;
    const eventHeaderPic = req.body.eventHeaderPic;
    const eventVideo = req.body.eventVideo;
    const status = "active";
    const location = req.body.location;
    eventId = 0;
    Event.findOne().sort({createdAt: -1})
        .then(last => {
            if(!last) {
                eventId = 1;
            } else {
                eventId = last.eventId + 1;
            }
            const newEvent = new Event({eventId, eventName, eventSummary, eventDescription, eventStartDate, eventEndDate, eventStartTime, eventEndTime, eventOwner, eventSmallPic, eventHeaderPic, eventVideo, status, location});
            newEvent.save()
                .then(() => res.json({
                    "message" : "Success",
                    "eventId" : eventId
                }))
                .catch(err => res.status(400).json('Error:' + err));          
        })
        .catch(err => res.status(400).json('Error:' + err));

});

router.route('/edit').post((req,res) => {
    Event.findOne({eventId: req.body.id})
    .then(event => {
        event.eventName = req.body.eventName;
        event.eventSummary = req.body.eventSummary;
        event.eventDescription = req.body.eventDescription;
        event.eventStartDate = req.body.eventStartDate;
        event.eventEndDate = req.body.eventEndDate;
        event.eventMaxParticipants = req.body.eventMaxParticipants;
        event.eventOwner = req.body.eventOwner;
        event.ticketPrice = req.body.ticketPrice;
        event.eventPic = req.body.eventPic;
        event.status = req.body.status;
        event.location = req.body.location;
        event.save()
            .then(() => res.json('Event updated'))
            .catch(err => res.status(400).json('Error:' + err));
    })
    .catch(err => res.status(400).json('Error:' + err));
});

router.route('/delete').post((req,res) => {
    Event.findOne({eventId: req.body.id})
    .then(event => {
        event.status = "disabled";
        event.save()
            .then(() => res.json('Event deleted'))
            .catch(err => res.status(400).json('Error:' + err));
    })
    .catch(err => res.status(400).json('Error:' + err));
});

// List of all events owned by a onwer
router.route('/ownedBy').post((req,res) => {
    Event.find({eventOwner: req.body.eventOwner})
        .then(events => res.json(events))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

// Search an event by a part of its Name
router.route('/search').post((req,res) => {
    Event.find({name: /req.body.name/})
        .then(events => res.json(events))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

// Get all events starting and ending Today
router.route('/today').post(async (req,res) => {
    const date = new Date(new Date().toLocaleDateString());
    const ndate = new Date(new Date().toLocaleDateString());
    ndate.setDate(ndate.getDate()+1);
    try{
        const startingEvents = await Event.find({eventStartDate: {"$gte": date, "$lt": ndate}});
        const endingEvents = await Event.find({eventEndDate: {"$gte": date, "$lt": ndate}});
        return res.json({starting: startingEvents, ending: endingEvents});
    }
    catch(e){
        return res.status(400).json(`Error ${e}`);
    }
        
});

module.exports = router;