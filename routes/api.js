//Declare what i will need
const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const mongoose=require('mongoose')

//Getting my model
const Schema = require('../models/mySchema');

// Routes
//Normal get route
router.get('/', (req, res) => {
    //Get my schema
    Schema.find({  })
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        //if there is a issue we return err
        .catch((error) => {
            console.log('error: ', daerrorta);
        });
});

//Save all the data to mongodb
router.post('/save', (req, res) => {
    const data = req.body;
    const newSchema = new Schema();
    newSchema.name = data.name;
    newSchema.description = data.description;
    newSchema.location = data.location;
    newSchema.priority=data.priority;
    newSchema.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Sorry there was an error' });
            return;
        }
        // mySchema
        return res.json({
            msg: 'Your data has been saved!!!!!!'
        });
    });
});

//Gett all the data from mongodb
router.get('/get-all',function(req,resp){
    Schema.find()
    //if succesfull return result
    .then((result)=>{
        resp.send(result)
    })
    //if not let user know there was error
    .catch((err)=>{
        console.log("Error getting items")
    })
});

//Bulk update many
router.post('/update-many',(req,resp)=>{
    //if statuse is Submitted change all to in progress
    const update= Schema.updateMany(
        {status:'Submitted'},
        {$set:{status:'In progress'}}
    )
    //if succesfull update
    .then((update)=>{
        resp.send(update)
    })
    //if not return error
    .catch((err)=>{
        console.log(("Error in /update-many at once"));
    })
});

//update single item
router.put('/update-one/:id',(req,res)=>{
    let id=req.params.id;
    //Schema to find id that is the same as id that user insert
    Schema.findOne({_id:id},function(err,foundObject){
        //if fail then return error
        if(err){
            console.log("Error in your /update-one route");
            res.status(500).send();
        }
        //if work we return following
        else{
            if(!foundObject){
                res.send(404).send();
            }
            else{
                //Get new name 
                if(req.body.name){
                    foundObject.name=req.body.name;
                }
                //get new description
                if(req.body.description){
                    foundObject.description=req.body.description;
                }
                //get new location
                if(req.body.location){
                    foundObject.location=req.body.location;
                }
                //get new priority
                if(req.body.priority){
                    foundObject.priority=req.body.priority;
                }
                //try save to db
                foundObject.save(function(err,updatedObject){
                    //if err let user know
                    if(err){
                        console.log(err);
                        res.status(500).send();
                    }
                    //save to db
                    else{
                        res.send(updatedObject);
                    }
                })
            }
        }
    })
})

//get data thats status is inserted by user
router.get('/status/:thestatus',(req,res)=>{
    let currentStatus=req.params.thestatus;
    Schema.find({status:{$eq:currentStatus}})
    //if succesfull return result
    .then((result)=>{
        res.send(result)
    })
    //if not let user know there was error
    .catch(()=>{
        console.log("Error getting items")
    })
})

module.exports = router;