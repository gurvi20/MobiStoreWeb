const mongoose = require('mongoose');
const config = require('../config/database');

// order Schema
const orderSchema = mongoose.Schema({
    firstName: {type:String},
  lastName: {type:String},
  email: {type:String},
  Address: {type:String},
  address2: {type:String},
  state:{type:String},
  city: {type:String},
  zip: {type:String},
  type: {type:String},
  ccname: {type:String},
  ccnumber: {type:String},
  ccexpiration: {type:String},
  cccvv: {type:String}
    // name: {
    //     type: String
    // },
    // img:{
    //     type:String
    // },
    // colors:{
    //     type:String
    // },
    // rating: {
    //     type: String,
    //     required: true
    // },
    // brand: {
    //     type: String,
    //     required: true
    // },
    // features: {
    //     type: String,
    //     required: true
    // }
});


const Order = module.exports = mongoose.model('Order', orderSchema);

module.exports.order = function (newOrder, callback) {
    newOrder.save(callback);
       
}

