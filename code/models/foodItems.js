const mongoose= require("mongoose")
var Schema= mongoose.Schema;

const foodItemSchema = new Schema({
    name:String,
    dateOfPurchase:{
        type: Date, 
        required: [true, "I need an expiration date"]
    },
    expiryDate:{
        type: Date, 
        required: [true, "I need an expiration date"]
    }
})  

const foodItem = mongoose.model("foodItems",foodItemSchema)
module.exports = foodItem;  