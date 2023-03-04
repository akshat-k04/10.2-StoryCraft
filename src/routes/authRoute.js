express = require('express');
const authmdl = require('./../model/UserDetails');

//lets create a router
const authRouter = express.Router();

//routes for login
authRouter.post("/login", UserExistence, checkPassword);

//routes for signup
authRouter.post("/signup", UserExistenceforadding, addUser);

//routes for forgetpassword/changePassword/change data
authRouter.post("/forgetPassword", changedata);

//made for forgetpassowrd frontend
authRouter.post("/userchecker", existornot);


//made for profile buildup
authRouter.post("/getdata", getdatta);




async function getdatta(req, res) {


    let email = req.body.email;
    let data = await authmdl.findOne({ email: email });
    if (data) {
        res.json(data);

    }
    else {
        res.json({ 'bol': false });
    }

}



async function UserExistence(req, res, next) {
    let num = req.body.email;
    let data = await authmdl.findOne({ email: num });
    console.log(req.body) ;

    if (data) {
        //console.log('if login');
        next();
    }
    else {
        //console.log('else login');

        res.json({ 'bol': "false"});
    }
}


async function UserExistenceforadding(req, res, next) {
    let email = req.body.email;
    let data = await authmdl.findOne({ email: email });
    if (data) {
        res.json({ 'bol': 'user exist' });
    }
    else {
        next();
    }
}


async function checkPassword(req, res) {
    let pass = req.body.password;
    let num = req.body.email;
    let data = await authmdl.findOne({ email: num });
    let databasePassword = data.password;
    if (pass == databasePassword) {
        res.json({ 'bol': 'success' });
    }
    else {
        res.json({ 'bol': 'fail' });
    }
}


async function addUser(req, res) {
    let data = req.body;
    await authmdl.create(data);
    // console.log(data);
    res.json({ "bol": true });
}


async function existornot(req, res) {

    let number = req.body.email;
    let data = await authmdl.findOne({ email: number });
    if (data) {
        res.json({ 'bol': true });

    }
    else {
        res.json({ 'bol': false });
    }

}
async function changedata(req, res) {

    let updatePass = req.body;

    let number = req.body.email;
    await authmdl.findOneAndUpdate({ email: number }, updatePass);
    res.json({ 'bol': 'password updated' });


}




module.exports = authRouter;