/*----Packages----*/
const router = require('express').Router();
let Ticket = require('../models/ticket.model');
let Event = require('../models/events.model');

/*----API Endpoint Handlers----*/
/*
    1. /                    Line 15
    2. /get_type/:id        Line 21
    3. /get_discount/:id    Line 36
    4. /delete_discount     Line 56
    5. /add_type            Line 65
    6. /add_discount        Line 107
*/
router.route('/').get((req,res) => {
    Ticket.find()
        .then(tickets => res.json(tickets))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/get_type/:id').get((req,res) => {
    var typeList = [];
    Ticket.findOne({eventId: req.params.id}, 'ticketType')
    .then(tickets => {
        tickets.ticketType.map((ticket) => {
            typeList.push({
                "name": ticket.name,
                "price": ticket.price
            });
        })
        res.json(typeList);
    })
    .catch(err => res.status(400).json('Error:' + err));
});

router.route('/get_discount/:id').get((req,res) => {
    var discountList = [];
    Ticket.findOne({eventId: req.params.id}, 'discountCode')
    .then(tickets => {
        if(!tickets){
            res.status(204).json({"message": "failure"});
        }
        else{
            tickets.discountCode.map((ticket) => {
                discountList.push({
                    "name": ticket.name,
                    "value": ticket.value
                });
            })
            res.json(discountList);
        }
    })
    .catch(err => res.status(400).json('Error:' + err));
});

router.route('/delete_discount').post((req,res) => {
    const eventId = req.body.id;
    const discountName = req.body.discountCode;
    
    Ticket.updateOne({'eventId': eventId}, {$pull: {'discountCode': {'name': discountName}}})
        .then(() => (res.json({"message": "Success"})))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/add_type').post((req,res) => {
    const eventId = req.body.eventId;
    const ticketTypes = req.body.ticketType;
    const eventParticipants = 0;
    const eventMaxParticipants = 0;
    
    Ticket.findOne({eventId: eventId})
        .then(ticket => {
            if(!ticket){
                let discountCode = [];
                let typeList = [];
                ticketTypes.id = 1;
                typeList.push(ticketTypes);
                let ticketType = typeList;
                const newTicket = new Ticket({eventId, ticketType, discountCode, eventParticipants, eventMaxParticipants});
                newTicket.save()
                    .then(() => res.json({
                        "message" : "Success"
                    }))
                    .catch(err => res.status(400).json('Error:' + err));
            }
            else{
                let present = false;
                ticket.ticketType.map((index) => {
                    if(index.name == ticketTypes.name){
                        present = true;
                        res.status(204).json({"message": "Failure"});
                    }
                })
                if(!present){
                    let length = ticket.ticketType.length;
                    ticketTypes.id = (length+1);
                    
                    Ticket.updateOne({eventId: eventId},{$push: {"ticketType": ticketTypes}})
                        .then(() => res.json({'message': "Success"}))
                        .catch(err => res.status(400).json('Error:' + err));
                }
            }
        })
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/add_discount').post((req,res) => {
    const eventId = req.body.eventId;
    const discountCodes = req.body.discountCode;
    const eventParticipants = 0;
    const eventMaxParticipants = 0;
    
    Ticket.findOne({eventId: eventId})
        .then(ticket => {
            if(!ticket){
                let ticketType = [];
                let discountList = [];
                // ticketTypes.id = 1;
                discountList.push(discountCodes);
                let discountCode = discountList;
                const newTicket = new Ticket({eventId, ticketType, discountCode, eventParticipants, eventMaxParticipants});
                newTicket.save()
                    .then(() => res.json({
                        "message" : "Success"
                    }))
                    .catch(err => res.status(400).json('Error:' + err));
            }
            else{
                let present = false;
                ticket.discountCode.map((index) => {
                    if(index.name == discountCodes.name){
                        present = true;
                        res.status(204).json({"message": "Failure"});
                    }
                })
                if(!present){
                    // let length = ticket.ticketType.length;
                    // ticketTypes.id = (length+1);
                    
                    Ticket.updateOne({eventId: eventId},{$push: {"discountCode": discountCodes}})
                        .then(() => res.json({'message': "Success"}))
                        .catch(err => res.status(400).json('Error:' + err));
                }
            }
        })
        .catch(err => res.status(400).json('Error:' + err));
});

module.exports = router;