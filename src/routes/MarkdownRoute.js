express = require('express');
const MDModel = require('./../model/MarkdownModel');

//lets create a router
const mdRouter = express.Router();

// to get the md of user
mdRouter.post("/get", getMD); // get notes

// to add the md
mdRouter.post("/add", addMD);

//to delete the md
mdRouter.post("/delete", deleteMD);

// to update the md
mdRouter.post("/update", updateMD);





async function getMD(req, res) {
    let mailID = req.body.email;
    let nots = await MDModel.find({ email: mailID });
    console.log("requested for"+mailID) ;
    res.json({"bol":nots});
    console.log("data sent");
}

async function addMD(req, res) {
    let data = req.body;
    await MDModel.create(data);
    res.json({"bol":'added'});
}

async function deleteMD(req, res) {
    let localid = req.body.localid;
    let email = req.body.email ;
    await MDModel.findOneAndDelete({ localid: localid,email:email });
    console.log("deleted");
    res.json({"bol":"deleted"});
}

async function updateMD(req, res) {
    let data = req.body.localid;
    let modified = req.body;
    let email = req.body.email;
    let not = await MDModel.findOneAndUpdate({ localid: data,email:email }, modified);
    console.log("updated");
    res.json({ "bol": "update" });
}

module.exports = mdRouter;