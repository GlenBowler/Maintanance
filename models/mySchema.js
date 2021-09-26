//Import 
const mongoose = require('mongoose');

// Schema
const Schema = mongoose.Schema;
const PostSchema = new Schema({
    name: String,
    description: String,
    location: String,
    priority: String,
    status: {
        type: String,
        default: "Submitted"
    },
    isArchived: {
        type: Boolean,
        default:false,
    },
    submitDate: {
        type: Date,
        default: Date.now
    }
});

// Model
const MySchema = mongoose.model('MySchema', PostSchema);
//export schema
module.exports =  MySchema;