const mongoose = require('mongoose');
const SubSection = require('./SubSection.model');

const sectionSchema = new mongoose.Schema({
    sectionName: {
        type: String,
    },
    subSection: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubSection"
    }],
});



module.exports = mongoose.model("Section", sectionSchema)