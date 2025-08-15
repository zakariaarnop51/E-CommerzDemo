const mongoose = require('mongoose');

const PolicySchema = new mongoose.Schema(
    {
        description: { type: String, required: true },
        type: { type: String, required: true },
    },
    { timestamps: true, versionKey: false }
);

const PolicyModel = mongoose.model('policies', PolicySchema);

module.exports = PolicyModel;
