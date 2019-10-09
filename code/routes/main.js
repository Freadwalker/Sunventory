const express = require('express');
const router  = express.Router();
const mongoose= require("mongoose")
const foodItem=require("../models/foodItems");
const moment= require("moment")
const User=require("../models/user")


router.get("/dash",(req,res,next)=>{
  if(req.session.currentUser){
  const user = req.session.currentUser;
  res.render("../views/dash",{user});
  }
  else{
    res.redirect("/login");
  }
})

router.get("/inventory",(req,res,next)=>{
  if(req.session.currentUser){
    console.log(req.session.currentUser._id)
  User.aggregate([
    {
      '$match': {
        '_id': mongoose.Types.ObjectId(req.session.currentUser._id)
      }
    }, {
      '$lookup': {
        'from': 'fooditems', 
        'localField': 'foodItems', 
        'foreignField': '_id', 
        'as': 'populatedFoodItems'
      }
    }, {
      '$unwind': {
        'path': '$populatedFoodItems'
      }
    }, {
      '$project': {
        'username': 1, 
        'populatedFoodItems': {
          'name': 1, 
          'dateOfPurchase': {
            '$dateToString': {
              'format': '%d-%m-%Y', 
              'date': '$populatedFoodItems.dateOfPurchase'
            }
          }, 
          'expiryDate': {
            '$dateToString': {
              'format': '%d-%m-%Y', 
              'date': '$populatedFoodItems.expiryDate'
            }
          }
        }
      }
    }
  ])
  .then(foodItems=>{
    console.log("FOOOOOD", foodItems)
    res.render("../views/inventory.hbs",{foodItems})
  })

  .catch(err=>{
    console.log(err)
  })
    }else{
    res.redirect("/")
  }
})
router.get("/create-item",(req,res,next)=>{
  if(req.session.currentUser){   
    res.render("create-item")
  }else{
    res.redirect("/login")
  }
})

router.post("/create-item",(req,res,next)=>{
    const name=req.body.productName;
    const dateOfPurchase= moment(req.body.dateOfPurchase).format('DD-MM-YYYY')
    const expiryDate= moment(req.body.expiryDate).format('DD-MM-YYYY')
    foodItem.create({name:name,dateOfPurchase:dateOfPurchase, expiryDate:expiryDate})
    .then((food)=>{
      console.log(food)
      User.findByIdAndUpdate(req.session.currentUser._id,{$push:{foodItems:food._id}},{new:true})
      .then((updatedUser)=>{
        console.log(updatedUser)
        res.redirect("/inventory")
      })
    })
    .catch(err=>{
      console.log(err)
    })
  
})

router.get("/updateItem/:id",(req,res,next)=>{
    foodItem.findById(req.params.id)    
    .then(food=>{
      res.render("../views/update-item",{food})
    })
    .catch(err=>{
      console.log(err)
    })
})
router.post("/updateItem/:id",(req,res,next)=>{
  const productName=req.body.productName;
  const purchaseDate=req.body.dateOfPurchase;
  const expiryDate=req.body.expiryDate;

  foodItem.findByIdAndUpdate(req.params.id,
    {name:productName,dateOfPurchase:purchaseDate,expiryDate:expiryDate})
    .then(()=>{
      res.redirect("/inventory");
    })
    .catch(err=>{
      console.log(err)
    })
})

module.exports=router;