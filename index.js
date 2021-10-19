const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const admin = require('firebase-admin');
require("dotenv").config();
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gpypc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// set up express

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

// firebase private key config
var serviceAccount = require("./firebase private key.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


// verify Token function
const verifyToken=(bearer, useremail, res, func) =>{
  if (bearer && bearer.startsWith("bearer ")) {
    const idToken = bearer.split(" ")[1];
    admin
      .auth()
      .verifyIdToken(idToken)
      .then((decodedToken) => {
        const{ uid, email} = decodedToken;
        // console.log(email, uid, useremail)
        if (uid && email===useremail) {
          
          // when token is verified then the callback will be executed
          func();

        }
        
      })
      .catch((error) => {
        res.status(401).send('<h3 style="color:red"> unauthorized access request </h3>');
        
      });
      
  }
  else {
    res.status(401).send('<h3 style="color:red"> unauthorized access request </h3>');
  }
}


// initializing database (mongodb)
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const productCollections = client
    .db(process.env.DB_NAME)
    .collection("products");
    const cartCollections = client
    .db(process.env.DB_NAME)
    .collection("carts");

  app.post("/addproduct", (req, res) => {
    const Allproducts = req.body;

    productCollections.insertMany(Allproducts).then((result) => {
      console.log(result);
      res.send(result.insertedCount);
    });
  });


  // add cart to DB
  app.post("/addcart", (req, res) => {
    const Allcarts = req.body;
  const bearer= req.headers.authorization;

verifyToken(bearer, req.query.u,res, ()=>{

  cartCollections.find({user: req.query.u}).limit(1).toArray((err, documents) => {
    console.log(documents.length)
    if ( documents.length < 1) {
     
        cartCollections.insertOne({ user: req.query.u,   cart: Allcarts }).then((result) => {
            console.log(result);
            res.send(result);
          });
    }
    else{
        // cartCollections.deleteMany({ user: req.query.u});
        cartCollections.updateMany({ user: req.query.u}, {$set: {  cart: Allcarts }}).then((result) => {
                console.log('else', result);
                res.send(result.acknowledged);
              });
    }
    
  });
})     
    // }
    // else {
        // cartCollections.insertOne({ user: req.query.u,   cart: Allcarts }).then((result) => {
        //     console.log(result);
        //     res.send(result.acknowledged);
        //   });
    // }
  });

// getting carts from DB
  app.get("/carts", (req, res) => {
 const bearer= req.headers.authorization;

 verifyToken(bearer, req.query.u, res,  ()=> {
   
  cartCollections.find({user: req.query.u}).toArray((err, documents) => {
    if (documents.length< 1) {

     res.send(documents);
        
    }
    res.status(200).send(documents[0].cart);
     
   });
 })
 
// if (verifyToken(bearer, req.query.u)) {
//   console.log('ok');
//   cartCollections.find({user: req.query.u}).toArray((err, documents) => {
//     if (documents.length< 1) {
//      res.send(documents);
        
//     }
//     res.send(documents[0].cart);
     
//    });
  
// }
// else{
//   res.status(401).send('<h3 style="color:red"> unauthorized access request </h3>');
// }

  });

  // getting products from database
  app.get("/products", (req, res) => {
    productCollections.find().limit(19).toArray((err, documents) => {
        res.send(documents);
      });
      
  });
  console.log("database connected");
});

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));
