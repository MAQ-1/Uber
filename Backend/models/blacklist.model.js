const mongoose = require('mongoose');

const blacklistSchema = new mongoose.Schema({
    token:{
        type:String,
        required:true,
        unique:true
      },
      crearedAt:{
        type:Date,
        deafult:Date.now,
        expires: 86400
      }
})

module.exports = mongoose.model('blacklist',blacklistSchema);