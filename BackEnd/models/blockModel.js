const mongoose = require('mongoose');

const blockSchema = new mongoose.Schema({
    
    blockedusers: Array,

    blocker:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
  
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model("block", blockSchema);