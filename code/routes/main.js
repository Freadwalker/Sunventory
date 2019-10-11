const express = require('express');
const router  = express.Router();
const mongoose= require("mongoose")
const foodItem=require("../models/foodItems");
const moment= require("moment")
const User=require("../models/user")


router.get("/inventory",(req,res,next)=>{
  if(req.session.currentUser){
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
          '_id':1,
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
    res.render("../views/inventory.hbs",{foodItems:foodItems,user:req.session.currentUser})
  })

  .catch(err=>{
    console.log(err)
  })
    }else{
    res.redirect("/")
  }
})
router.get("/create-item",(req,res,next)=>{
  const defaultFoods=["Kiwi","Apple","Banana","Jackfruit","Tomato","Orange","Milk","Flour"]
  if(req.session.currentUser){   
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
            '_id':1,
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
      res.render("../views/create-item.hbs",{foodItems:foodItems,defaultFoods:defaultFoods})
    })
  
    .catch(err=>{
      console.log(err)
    })
  }else{
    res.redirect("/login")
  }
})

router.post("/create-item",(req,res,next)=>{
    let defaultFoods=["Kiwi","Apple","Banana","Jackfruit","Tomato","Orange","Milk","Flour"]
    let name;
    let nameSelect=req.body.productName2;
    let nameInput=req.body.productName;

    if(nameSelect===""||nameSelect==="Choose a product"&&nameInput===""){
      res.render("../views/create-item.hbs",{errorMessage:"You have to choose a name! ",defaultFoods:defaultFoods})
      return;
    }else if(nameSelect==="Choose a product"||nameSelect===""){
      name=nameInput;
    }else if(nameInput===""){
      name=nameSelect;
    }else {
      res.render("../views/create-item.hbs",{errorMessage:"You can only choose one of the two name options!",defaultFoods:defaultFoods})
      return;
    }

    
    
    // const dateOfPurchase= moment(req.body.dateOfPurchase).format('MM-DD-YYYY')
    // const expiryDate= moment(req.body.expiryDate).format('MM-DD-YYYY')
    const dateOfPurchase=req.body.dateOfPurchase;
    const expiryDate=req.body.expiryDate;
    if(dateOfPurchase===""&&expiryDate===""){
      res.render("../views/create-item.hbs",{errorMessage:"It seems like you havent enter any dates!",defaultFoods:defaultFoods})
      return;
    }else if(dateOfPurchase===""){
      res.render("../views/create-item.hbs",{errorMessage:"You forgot to enter the purchaseDate!",defaultFoods:defaultFoods})
      return;
    }else if(expiryDate===""){
      res.render("../views/create-item.hbs",{errorMessage:"You forgot to enter the expiryDate!",defaultFoods:defaultFoods})
      return;
    }
    dateOfPurchase=moment(dateOfPurchase).format("MM-DD-YYYY");
    expiryDate=moment(expiryDate).format("MM-DD-YYYY")
    
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
  if(!req.session.currentUser){
    res.redirect("/login")
  }
    foodItem.findById(req.params.id)    
    .then(food=>{

      var formattedFood = Object.assign({}, food)
      formattedFood._id=food._id;
      formattedFood.name= food.name;
      formattedFood.expiryDate = moment(food.expiryDate).format("YYYY-MM-DD")
      formattedFood.dateOfPurchase = moment(food.dateOfPurchase).format("YYYY-MM-DD")
      res.render("../views/update-item",{food: formattedFood})
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

router.get("/deleteItem/:id",(req,res,next)=>{
  foodItem.findByIdAndDelete(req.params.id)
  .then(()=>{
    res.redirect("/inventory")
  })
  .catch((err)=>{
    console.log(err)
  })
})


module.exports=router;