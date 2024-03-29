express = require('express');
var cors = require("cors");
const app = express();
app.use(express.json());
const mongoose = require('mongoose');

//import files
const authRouter = require('./src/routes/authRoute');
const otprouter = require('./src/routes/otpRoute.js');
const mdrouter = require('./src/routes/MarkdownRoute.js');
const drawrouter = require('./src/routes/drawingroute.js');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

port = process.env.PORT || 3000;
app.listen(port, () => { console.log('server is listening at port 3000') });

app.use("/auth", authRouter);
app.use("/otp", otprouter);
app.use("/md",mdrouter );
app.use("/draw",drawrouter);


const link = 'mongodb+srv://storycrafttech:iloveiitroorkee@storycraft.4n3ph6o.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(link)
    .then(function () {
        console.log('db connected');

    })
    .catch(function (err) {
        console.log(err);
    });

