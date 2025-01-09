const express = require('express')
const cors = require('cors')
const User = require('./db/User')
const Products = require('./db/Products')
require('./db/config')
const Jwt = require('jsonwebtoken')



const jKey = 'ecommerce';

const app = express()
app.use(express.json());
app.use(cors())

app.post('/register', async (req, res) => {
   let user = new User(req.body)
   let result = await user.save();
   result = result.toObject();
   delete result.password;
   // res.send(result)
   Jwt.sign({ result }, jKey, verifyToken, { expiresIn: '2h' }, (err, token) => {
      if (err) {
         res.send('Something went wrong , please try after sometime')
      }
      res.send({ result, auth: token })
   })
})

app.post('/login', async (req, res) => {
   console.log(req.body);
   if (req.body.password && req.body.email) {
      let user = await User.findOne(req.body).select("-password")
      if (user) {
         Jwt.sign({ user }, jKey, { expiresIn: '2h' }, (err, token) => {
            if (err) {
               res.send('Something went wrong , please try after sometime')
            }
            res.send({ user, auth: token })
         })
      }
      else {
         res.send({ result: 'Invalid user' })
      }
   } else {
      res.send({ result: 'Invalid user' })
   }
})

app.post('/add-product', verifyToken, async (req, res) => {
   let product = new Products(req.body)
   let result = await product.save();
   res.send(result)

})

app.get('/products', verifyToken, async (req, res) => {
   let products = await Products.find();
   if (products.length > 0) {
      res.send(products)
   }
   else {
      res.send({ result: 'No products found' })
   }
})

app.delete('/products/delete/:id', verifyToken, async (req, res) => {
   const result = await Products.deleteOne({ _id: req.params.id })
   res.send(result);
})

app.get('/products/:id', verifyToken, async (req, res) => {
   let result = await Products.findOne({ _id: req.params.id })
   if (result) {
      res.send(result)
   }
   else {
      res.send({ result: 'No records found' })
   }
})

app.put('/products/:id', verifyToken, async (req, res) => {
   let result = await Products.updateOne(
      { _id: req.params.id },
      {
         $set: req.body
      }
   )
   res.send(result)
})

app.get('/search/:key', verifyToken, async (req, res) => {
   let result = await Products.find({
      '$or': [
         { name: { $regex: req.params.key } },
         { price: { $regex: req.params.key } },
         { category: { $regex: req.params.key } },
         { company: { $regex: req.params.key } },
      ]
   })
   res.send(result)
})

function verifyToken(req, res, next) {

   let token = req.headers['authorization']
   if (token) {
      token = token.split(' ')[1];
      console.log("Middleware successfull");
      Jwt.verify(token, jKey, (err, valid) => {
         if (err) {
            res.send({ result: "Please provide valid token" })
         } else {
            next();
         }
      })
   } else {
      res.send({ result: "Please add token" })
   }
}

app.get('/userprofile/:id', verifyToken, async (req, res) => {

   let result = await User.findById({ _id: req.params.id })
   if (result) {
      res.send(result)
   }
   else {
      res.send({ result: 'No records found' })
   }

})

app.put('/userprofile/:id', verifyToken, async (req, res) => {
   try {
      let result = await User.updateOne(

         { _id: req.params.id },
         {
            $set: req.body
         }
      )
      res.send(result)
   } catch (error) {
      res.status(500).send({ error: 'Failed to update user profile' })
   }
})

app.listen(7000)