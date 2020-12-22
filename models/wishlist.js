const mongoose = require('mongoose');
const config = require('../config/database');

// Wishlist Schema
const wishlistSchema = mongoose.Schema({
    name: {
        type: String
    },
    img:{
        type:String
    },
    colors:{
        type:String
    },
    rating: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    features: {
        type: String,
        required: true
    }
});

const Wishlist = module.exports = mongoose.model('Wishlist', wishlistSchema);

module.exports.wishlist = function (newProduct, callback) {
    newProduct.save(callback);
       
}

