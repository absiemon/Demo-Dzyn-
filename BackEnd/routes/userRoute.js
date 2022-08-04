const express = require('express');
const router = express.Router();

const blockModel = require("../models/blockModel");

const User = require("../models/userModel");
const bcrypt = require('bcryptjs'); // importing the bcryptjs to use its functionlity of hashing, salting etc.
var jwt = require('jsonwebtoken');  // importing jwt to use its functionlity
const { body, validationResult } = require('express-validator');  // express validator use to validate user details that he want to send to the database.
const JWT_SECRET = 'asdjasdoasd';


router.post('/register',
   
   [ body('name', "Name must be atleast 3 characters long").isLength({ min: 3 }),
    body('email', "Enter the valid email address").isEmail(),
    body('password', "Password must be atleast 5 character long").isLength({ min: 5 }),
   ],

    async (req, res) => {

        let success = false;
        // checking express validator result
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        try {

            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ success, error: "Email is already registered, try login in" });
            }

            const salt = await bcrypt.genSalt(10);
            const safePassword = await bcrypt.hash(req.body.password, salt);

            // creating the user in db
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: safePassword,
                city: req.body.city
            })
            console.log(user);
            // sending the authtoken and inside the auth token we will be attaching userId that mongoDB has created
            const data = {
                user: {
                    id: user._id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({ success, authtoken });

        } catch (error) {
            console.error(error.message);
            res.status(500).send("some error occured");
        }
    }
);


router.post('/login',
   [
    body('email', "Enter the valid email address").isEmail(),
    body('password', "password cannot be blank").exists(),

   ], 
   async(req, res) =>{

        let success = false;
        // checking express validator result
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ success, errors: errors.array() });
        }

        try {
            
            let user  = await User.findOne({email: req.body.email});
            if(!user){
                return res.status(400).json({success, error: "Soory cannot login! please try loginin with correct credential"});

            }

            const comparedPassword = await bcrypt.compare(req.body.password, user.password);
            if(!comparedPassword){

                return res.status(400).json({success, error: "Soory cannot login ! please try loginin with correct credential"});
            }

            // sending the authtoken and inside the auth token we will be attaching userId that mongoDB has created
            const data = {
                user:{
                    id: user._id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({success, authtoken});

        } catch (error) {
            console.error(error.message);
            res.status(500).send("some error occured");
        }
});

router.get('/allusers/:id', 

    async(req, res) =>{
        
        try {

            const users = await User.find({_id:{$ne: req.params.id}}). select([    //$ne means not selecting the id which is in params 
                "email",
                "name",
                "_id",
                "city"
            ])

            const {blockeduser, blocker} = req.body;

            const allblocedusers = await blockModel.find({
                blockedusers:{
                    $all: [blocker, blockeduser]
                }
            })
            
            return res.json(users);

        } catch (error) {
            console.log({mgs:"Internal Sever eroor", err});
            
        }
    }
)
module.exports = router;
