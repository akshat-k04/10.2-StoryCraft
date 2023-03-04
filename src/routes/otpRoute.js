express = require('express');
const nodemailer = require("nodemailer");
const otpmodel = require('./../model/otpofNum.js');


const router = express.Router();



router.post("/send", sendotp);
router.post("/varify", varifing);



async function varifing(req, res) {
    let otpfromuser = req.body.otp;
    let data = await otpmodel.findOne({ "email": req.body.email });
    if (data.otp == otpfromuser) {
        res.json({ "bol": "varified" });
    }
    else {
        res.json({ "bol": "not" });
    }
}


async function sendotp(req, res) {
    let otp = Math.floor(
        Math.random() * (999999 - 100000 + 1) + 100000
    );
    console.log(otp);
    // let phone = req.body.phone;
    let email = req.body.email;
    let data = await otpmodel.findOne({ "email": email });
    // let data = "a_khandelwal@ch.iitr.ac.in" ;
    if (data == null || data.email == null || data.email.length == 0) {
        await otpmodel.create({ "email": email, "otp": otp });
    }
    else {
        await otpmodel.findOneAndUpdate({ "email": email }, { "otp": otp });
    }




    // let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "storycraft.tech@gmail.com", // generated ethereal user
            pass: "wfhfaqothacvzzqv", // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"clusters-storycraft" <storycraft.tech@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "OTP VERIFICATION", // Subject line
        // text: "hello user, \n the otp is"+otp, // plain text body
        html: `<b>hello user, \n the otp is ${otp}</b>`, // html body
    });

    // console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    res.json({ "bol": "done" });
}












































// var unirest = require("unirest");










//     var rq = unirest("POST", "https://www.fast2sms.com/dev/bulkV2");
//     rq.headers({
//         "authorization": "4mzWaDdP9uILvkXsUMrB7cwAVHn6QiC5GjORfytZqK3JlxFo8podNFE9jWRQpr2BvzU6McsAkhu3nf5V"
//     });
//     rq.form({
//         "variables_values": otp,//this is otp value
//         "route": "otp",
//         "numbers": req.body.phone,
//     });
//     rq.end(function (rs) {
//         if (res.error) throw new Error(res.error);

//         console.log(rs.body);
//         res.json(rs.body) ;
//     });
// }










module.exports = router;