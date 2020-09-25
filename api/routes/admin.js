/*----Packages----*/
const router = require('express').Router();
let Location = require('../models/location.model');
let User = require('../models/user.model');
let Event = require('../models/events.model');
let Register = require('../models/registration.model');

/*---- API End Point Handlers ----*/
/*
    1. /get_location        Line 18
    2. /add_location        Line 33
    3. /delete_location     Line 64
    4. /make_admin          Line 72
    5. /remove_admin        Line 89
    6. /delete_user         Line 106
    7. /infos               Line 123
*/
router.route('/get_location').get((req,res) => {
    var locationList = [];
    Location.find()
        .then(locations => {
            locations.map((location) => {
                locationList.push({
                    "location": location.location,
                    "locationId": location.locationId
                });
            })
            res.json(locationList);
        })
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/add_location').post((req,res) => {
    const location = req.body.location;

    Location.findOne({location: location})
        .then(locations => {
            if(!locations){
                Location.findOne().sort({createdAt: -1})
                    .then(last => {
                        if(!last) {
                            locationId = 1;
                        } else {
                            locationId = last.locationId + 1;
                        }
                        const newLocation = new Location({locationId, location});
                        newLocation.save()
                            .then(() => res.json({
                                "message" : "Location added"
                            }))
                            .catch(err => res.status(400).json('Error:' + err));
                        })
                    .catch(err => res.status(400).json('Error:' + err));
            }
            else{
                res.status(208).json({
                    "message" : "failure"
                })
            }
        })
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/delete_location').post((req,res) => {
    Location.deleteOne({locationId: req.body.locationId})
        .then(() => res.json({
            "message": 'Success'
        }))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/make_admin').post((req,res) => {
    const email = req.body.email;
    User.findOne({email: email})
    .then(user => {
        if(!user){
            res.status(204).json({"message" : "Failure"});
        }
        else{
            user.role = "admin";
            user.save()
                .then(() => res.json({"message" : "Success"}))
                .catch(err => res.status(400).json('Error:' + err));
        }
    })
    .catch(err => res.status(400).json('Error:' + err));
});

router.route('/remove_admin').post((req,res) => {
    const email = req.body.email;
    User.findOne({email: email})
    .then(user => {
        if(!user){
            res.status(204).json({"message" : "Failure"});
        }
        else{
            user.role = "user";
            user.save()
                .then(() => res.json({"message" : "Success"}))
                .catch(err => res.status(400).json('Error:' + err));
        }
    })
    .catch(err => res.status(400).json('Error:' + err));
});

router.route('/delete_user').post((req,res) => {
    const email = req.body.email;
    
    User.find({email: email})
        .then(users => {
            if(!users.length){
                res.status(204).json('No Such User Exists');
            }
            else{
                User.deleteOne({email: email})
                .then(() => res.json({"message" : "Success"}))
                .catch(err => res.status(400).json('Error:' + err));
            }
        })
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/infos').get((req,res) => {
    var info = {
        eventCount: 0,
        ticketCount: 0,
        paidTicketCount: 0,
        locationCount: 0,
        userCount: 0
    }
    Event.countDocuments()
        .then(eventCount => {
            info.eventCount = eventCount;
            Register.countDocuments()
            .then(ticketCount => {
                info.ticketCount = ticketCount;
                Register.countDocuments({paymentStatus: true})
                    .then(paidTicketCount => {
                        info.paidTicketCount = paidTicketCount;
                        Location.countDocuments()
                            .then(locationCount => {
                                info.locationCount = locationCount;
                                User.countDocuments()
                                    .then(userCount => {
                                        info.userCount = userCount;
                                        res.json({"info": info});
                                    })
                                    .catch(err => res.status(400).json('Error:' + err));
                            })
                            .catch(err => res.status(400).json('Error:' + err));
                    })
                    .catch(err => res.status(400).json('Error:' + err));
            })
            .catch(err => res.status(400).json('Error:' + err));
        })
        .catch(err => res.status(400).json('Error:' + err));
});

module.exports = router;