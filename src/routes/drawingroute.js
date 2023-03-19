express = require('express');
const drawmodel = require('./../model/DrawingModel.js');


const router = express.Router();



router.post("/add", adddraw);
router.get("/get", sendDraw);
router.post("/delete",deleteData) ;


async function adddraw(req, res) {
    let image = req.body.image;
    let name = req.body.name ;
    let data = {
        "image":image ,
        "name":name 
    }
    await drawmodel.create(data);
    res.json({"bol":"done"}) ;
}

async function deleteData(req, res) {
    let image = req.body.image;
    let name = req.body.name;
    let data = {
        "image": image,
        "name": name
    }
    await drawmodel.findOneAndDelete(data);
    res.json({ "bol": "done" });
}

async function sendDraw(req, res){
    let data =await drawmodel.find() ;
    res.json({"bol":data}) ;
}


module.exports = router;
