/*----Packages----*/
const router = require('express').Router();
const sha256 = require('sha256');
const nodemailer = require("nodemailer");
var otpGenerator = require('otp-generator');
let User = require('../models/user.model');

/*----Node Mailer Configuration----*/
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mindwebsmailer@gmail.com',
        pass: '****hidden****'
    }
});

/*----API Endpoint Handlers----*/
/*
    1.  /                           Line 34
    2.  /login                      Line 40
    3.  /get_session                Line 66
    4.  /check_session              Line 92
    5.  /request_otp                Line 111
    6.  /register                   Line 145
    7.  /delete                     Line 167
    8.  /update_details             Line 185
    9.  /change_password            Line 199
    10. /forgot_password            Line 218
    11. /reset_password             Line 253
    12. /check_reset_token/:token   Line 272
    13. /check_id_card/:token       Line 287
    14. /add_card                   Line 301
*/
router.route('/').get((req,res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/login').post((req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    const time = new Date();
    User.find({email: email, password: password})
        .then(users => {
            if(!users.length){
                res.status(206).json({"message":'Failure'});
            }
            else{
                users[0].sessionToken = sha256(email + time.toString());
                users[0].save()
                    .then(() => 
                    res.json(
                        {
                            "message":'Success',
                            "token": sha256(email + time.toString())
                        }
                        )
                    )
                    .catch(err => res.status(400).json('Error:' + err));    
            }
        })
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/get_session').post((req,res) => {
    const token = req.body.token;
    User.find({ sessionToken: token })
        .then(user => {
            // console.log(user);
            if(user.length === 0){
                res.status(204).json({'message': 'Failed'});
            }
            else{
                const lastLogin = user[0].lastLoggedIn;
                user[0].lastLoggedIn = new Date()
                user[0].save()
                    .then(() => {
                        res.json(
                            {
                                "username": user[0].username,
                                "profilepic": user[0].profilepic,
                                "lastLoggedIn": lastLogin
                            })
                    })
                    .catch(err => res.status(400).json('Error:' + err));
            }
        })
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/check_session').post((req,res) => {
    const token = req.body.token;
    User.findOne({ sessionToken: token })
        .then(user => {
            if(!user){
                res.json({'message': 'Failed'});
            }
            else{
                user.lastLoggedIn = new Date();
                user.save()
                    .then(() => {
                        res.json({"message": "Success"});
                    })
                    .catch(err => res.status(400).json('Error:' + err));
            }
        })
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/request_otp').post((req,res) => {
    const email = req.body.email;
    User.find({email: email})
        .then(users => {
            if(users.length){
                res.status(208).json({
                    "message": "failure"
                });
            }
            else{
                const otp = otpGenerator.generate(5, { alphabets: false, specialChars: false, upperCase: false });
        
                var mailOptions = {
                    from: 'mindwebsmailer@gmail.com',
                    to: email,
                    subject: 'StackHack OTP verification',
                    text: 'Your OTP for verification is ' + otp
                };
                    
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        res.status(400).json('Error:' + error);
                    } else {
                        res.json({
                            "message": "success",
                            "otp": sha256(otp)
                        });
                    }
                });
            }
        })
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/register').post((req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    const role = "user";
    const email = req.body.email;
    const profilepic = req.body.pic;
    const sessionToken = 'NULL';
    const lastLoggedIn = new Date();
    const location = req.body.location;
    const resetToken = 'NULL';
    const mobile = req.body.mobile;
    const idCard = "";
    const newUser = new User({ username, password, role, email, profilepic, sessionToken, lastLoggedIn, location, resetToken, mobile, idCard });

    // console.log(newUser);
    newUser.save()
        .then(() => res.status(201).json({
            "message": "Success"
        }))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/delete').post((req,res) => {
    const token = req.body.token;
    const password = req.body.password;
    
    User.find({sessionToken: token, password: password})
        .then(users => {
            if(!users.length){
                res.json('No Such User Exists');
            }
            else{
                User.deleteOne({sessionToken:token})
                .then(() => res.json('Account deleted'))
                .catch(err => res.status(400).json('Error:' + err));
            }
        })
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/update_details').post((req,res) => {
    const token = req.body.token;
    User.findOne({sessionToken: token})
    .then(user => {
        user.username = req.body.username;
        user.profilepic = req.body.pic;
        user.location = req.body.location;
        user.save()
            .then(() => res.json('User Details updated'))
            .catch(err => res.status(400).json('Error:' + err));
    })
    .catch(err => res.status(400).json('Error:' + err));
});

router.route('/change_password').post((req,res) => {
    const token = req.body.token;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    User.findOne({sessionToken: token, password: oldPassword})
    .then(user => {
        if(!user){
            res.json({"message" : "Failure"});
        }
        else{
            user.password = newPassword;
            user.save()
                .then(() => res.json('Password updated'))
                .catch(err => res.status(400).json('Error:' + err));
        }
    })
    .catch(err => res.status(400).json('Error:' + err));
});

router.route('/forgot_password').post((req,res) => {
    const email = req.body.email;
    const time = new Date();
    const resetToken = sha256(email + time.toString());

    User.findOne({email : email})
        .then(user => {
            if(!user){
                res.status(204).json({"message" : "Failure"});
            }
            else{
                user.resetToken = resetToken;
                user.save()
                    .then(() => {
                        var mailOptions = {
                            from: 'mindwebsteam@gmail.com',
                            to: email,
                            subject: 'Reset Password Link',
                            html: "Go to the link below to reset your password <br><br><br>" + "<a href='http://localhost:4200/set-password/"+resetToken+"'>Click here</a>"
                        };
                            
                        transporter.sendMail(mailOptions, function(error, info){
                            if (error) {
                                res.status(400).json('Error:' + error);
                            } else {
                                res.json({"message" : "Success"});
                            }
                        });
                    })
                    .catch(err => res.status(400).json('Error:' + err));
            }
        })
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/reset_password').post((req,res) => {
    const resettoken = req.body.token;
    const newPassword = req.body.newPassword;
    User.findOne({resetToken: resettoken})
    .then(user => {
        if(!user){
            res.status(204).json({"message" : "Failure"});
        }
        else{
            user.password = newPassword;
            user.resetToken = 'NULL';
            user.save()
                .then(() => res.json('Password reset'))
                .catch(err => res.status(400).json('Error:' + err));
        }
    })
    .catch(err => res.status(400).json('Error:' + err));
});

router.route('/check_reset_token/:token').get((req,res) => {
    const resettoken = req.params.token;
    // console.log(resettoken);
    User.findOne({resetToken: resettoken})
    .then(user => {
        if(!user){
            res.status(204).json({"message" : "Failure"});
        }
        else{
            res.json({"message" : "Success"});
        }
    })
    .catch(err => res.status(400).json('Error:' + err));
});

router.route('/check_id_card/:token').get((req,res) => {
    User.findOne({sessionToken: req.params.token},'idCard')
        .then(users => {
            if(users.idCard == ''){
                res.status(204).json({"message": "failure"});
            }
            else{
                res.json({"message": "success"});
            }
            
        })
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/add_card').post((req,res) => {
    const sessionToken = req.body.token;
    const idCard = req.body.card;
    User.findOne({sessionToken: sessionToken})
        .then(users => {
            if(!users){
                res.status(204).json({"message": "failure"});
            }
            else{
                users.idCard = idCard;
                users.save()
                    .then(() => res.json({"message": "Success"}))
                    .catch(err => res.status(400).json('Error:' + err));
            }
            
        })
        .catch(err => res.status(400).json('Error:' + err));
});

module.exports = router;