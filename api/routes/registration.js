/*----Packages----*/
const router = require('express').Router();
let Register = require('../models/registration.model');
let Ticket = require('../models/ticket.model');
let Event = require('../models/events.model');
var otpGenerator = require('otp-generator');

/*----API Endpoint Handlers----*/
/*
    1. /                    Line 16
    2. /get_price           Line 22
    3. /purchase            Line 48 
    4. /get_ticket/:code    Line 80
*/

router.route('/').get((req,res) => {
    Register.find()
        .then(register => res.json(register))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/get_price').post((req,res) => {
    const eventId = req.body.eventId;
    const type = req.body.ticketType;
    const discountCode = req.body.discountCode;
    var total = 0;
    var discount = 0;
    var sum = 0;

    Ticket.findOne({eventId: eventId})
        .then(ticket => {
            ticket.ticketType.map((index) => {
                if(index.id == type){
                    total = index.price;
                }
            })
            ticket.discountCode.map((index) => {
                if(index.name == discountCode){
                    discount = index.value;
                }
            })
            sum = total - ((discount*total)/100);
            res.json({"price": sum});
        })
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/purchase').post((req,res) => {
    const eventId = req.body.eventId;
    const email = req.body.email;
    const username = req.body.username;
    const mobile = req.body.mobile;
    const purchaseTime = new Date();
    const ticketType = req.body.ticketType;
    const discountCode = req.body.discountCode;
    const price = req.body.price;
    const paymentStatus = true;
    const paymentMode = "online";
    const attendedStatus = false;
    var ticketCode = "E00";

    // var same = true;
    const ticketId = otpGenerator.generate(6, { alphabets: false, specialChars: false, upperCase: false });
    Register.findOne({ticketId: ticketId})
        .then(ticket => {
            if(!ticket){
                ticketCode = ticketCode + eventId.toString() + '-' + ticketType.toString() + '-' + ticketId.toString();
                const newRegister = new Register({eventId, ticketId, ticketCode, username, email, mobile, purchaseTime, ticketType, price, discountCode, paymentStatus, paymentMode, attendedStatus});
                newRegister.save()
                    .then(() => res.status(201).json({
                        "message": "Success",
                        "ticketCode" : ticketCode
                    }))
                    .catch(err => res.status(400).json('Error:' + err));
            }
        })
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/get_ticket/:code').get((req,res) => {
    Register.findOne({ticketCode: req.params.code},'username email mobile ticketType paymentStatus price')
        .then(register => res.json(register))
        .catch(err => res.status(400).json('Error:' + err));
});

module.exports = router;