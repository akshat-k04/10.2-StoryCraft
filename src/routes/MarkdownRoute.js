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
    res.json({"bol":nots});
}

async function addMD(req, res) {
    let data = req.body;
    await MDModel.create(data);
    res.json({"bol":'added'});
}

async function deleteMD(req, res) {
    let id = req.body.id;
    let email = req.body.email ;
    await MDModel.findOneAndDelete({ _id: id,email:email });
    res.json({"bol":"deleted"});
}

async function updateMD(req, res) {
    let data = req.body.id;
    let modified = req.body;
    let email = req.body.email;
    let not = await MDModel.findOneAndUpdate({ _id: data,email:email }, modified);
    res.json({ "bol": "update" });
}

module.exports = mdRouter;