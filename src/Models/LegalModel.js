const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
    {

        title: {type: String, required: true},
    },
    {timestamps: true, versionKey: false}
);

const LegalModel = mongoose.model("LegalDetail", DataSchema);
module.exports = LegalModel;