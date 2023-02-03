const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  product_id: {
    type: String,
    unique: true,
    trim: true,
    required: true
  },
  DSIN: {
    type: String,
    required: true,
    trim: true
  },
  ListingName: {
    type: String,
    required: true,
    trim: true
  },
   MRP: {
    type: String,
    required: true,
    trim: true
  },
   HSNcode: {
    type: String,
    required: true,
    trim: true
  },
   GSTslab: {
    type: String,
    required: true,
    trim: true
  },
   unit: {
    type: String,
    required: true,
    trim: true
  },
 
  images: {
    type: Object,
    required: true
  },
  checked: {
    type: Boolean,
    default: false
  },
  quantity: {
     type: Number,
    default: 101
  },
  sold: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Products', productSchema)