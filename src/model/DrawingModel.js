const mongoose = require('mongoose');
const Drawingschema = mongoose.Schema({
    name: {
        type: String,
    },
    image: {
        type: Buffer
    },
});

const drawmodel = mongoose.model('image', Drawingschema);

module.exports = drawmodel;