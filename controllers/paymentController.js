const Payments = require('../models/paymentModel')
const Users = require('../models/userModel')
const Products = require('../models/productModel')
const easyinvoice = require('easyinvoice');
const fs = require('fs');
const cloudinary = require('cloudinary')


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})

var path = require('path');

//gets your app's root path
var root = path.dirname(require.main.filename)

// joins uploaded file path with root. replace filename with your input field name



const paymentController = {
  getPayments: async (req, res) => {
    try {
      const payments = await Payments.find()
      res.json(payments)
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },
  createPayment: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select('name email')
      if (!user) return res.status(400).json({ msg: "User does not exist." })
      
      const { ca  , cart} = req.body;
      
      

      

      var data = {
    //"documentTitle": "RECEIPT", //Defaults to INVOICE
    "currency": "USD",
    "taxNotation": "vat", //or gst
    "marginTop": 25,
    "marginRight": 25,
    "marginLeft": 25,
    "marginBottom": 25,
    "logo": "https://www.easyinvoice.cloud/img/logo.png", //or base64
    //"logoExtension": "png", //only when logo is base64
    "sender": {
        "company": "Sample Corp",
        "address": "Sample Street 123",
        "zip": "1234 AB",
        "city": "Sampletown",
        "country": "Samplecountry"
        //"custom1": "custom value 1",
        //"custom2": "custom value 2",
        //"custom3": "custom value 3"
        },
    
    "client": {
        "company": "Client Corp",
        "address": "Clientstreet 456",
        "zip": "4567 CD",
        "city": "Clientcity",
        "country": "Clientcountry"
        //"custom1": "custom value 1",
        //"custom2": "custom value 2",
        //"custom3": "custom value 3"
    },
    "invoiceNumber": "2020.0001",
        "invoiceDate": "05-01-2020",
    "products": toString(ca),
    
    "bottomNotice": "Kindly pay your invoice within 15 days."
      };

      
      function toString(o) {
  Object.keys(o).forEach(k => {
    if (typeof o[k] === 'object') {
      console.log(o[k])
      return toString(o[k]);
    }
    
    o[k] = '' + o[k];
  });
  
  return o;
}


      
    





      



      

      
      
      easyinvoice.createInvoice(data, async function (result , err) {
    //The response will contain a base64 encoded PDF file
    // console.log(result.pdf);
        
        
        await fs.writeFileSync("invoice.pdf", result.pdf, 'base64');
     if (err) console.log(err)

      



        
      }).then(() => {
        cloudinary.v2.uploader.upload("invoice.pdf", {folder: "MERN-Ecommerce"}, async (err, result) => {
          if (err) console.log(err.message);

          removeTmp("invoice.pdf")
          
           
            const {_id, name, email} = user;

      const newPayment = new Payments({
        user_id: _id, name, email, cart , result
      })

      

      await newPayment.save()
      res.json({msg: "Payment success." , payment: newPayment})
          // res.json({public_id: result.public_id, url: result.secure_url})
              })
      
      });
      
    
      // res.json({msg: "Payment success."})
    } catch (err) {
      console.log(err);
      return res.status(500).json({msg: err.message})
    }
  }
}

const sold = async (id, quantity, oldSold) => {
  await Products.findOneAndUpdate({_id: id}, {
    sold: quantity + oldSold
  })
}

const removeTmp = (path) => {
  fs.unlink(path, err => {
    if (err) throw err;
  })
}

module.exports = paymentController