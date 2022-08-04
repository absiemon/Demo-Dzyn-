
const User = require("../models/userModel");
const bcrypt = require('bcryptjs'); // importing the bcryptjs to use its functionlity of hashing, salting etc.
var jwt = require('jsonwebtoken');  // importing jwt to use its functionlity
const { body, validationResult } = require('express-validator');  // express validator use to validate user details that he want to send to the database.
const JWT_SECRET = 'asdjasdoasd';


// ROUTE-1 FOR REGISTERING THE USER----

module.exports.register = 
    body('name', "Name must be atleast 3 characters long").isLength({min: 3}),
    body('email', "Enter the valid email address").isEmail(),
    body('password', "Password must be atleast 5 character long").isLength({min: 5}),

    async(req, res) =>{

    let success = false;
    // checking express validator result
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        
        let user  = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({success, error: "Email is already registered, try login in"});
        }

        const salt = await bcrypt.genSalt(10);
        const safePassword = await bcrypt.hash( req.body.password, salt);

        // creating the user in db
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: safePassword,
            city: req.body.city
        })
        
        // sending the authtoken and inside the auth token we will be attaching userId that mongoDB has created
        const data = {
            user:{
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authtoken});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
    }
}

// ROUTE-2 FOR LOGININ THE USER----

module.exports.login = [
    body('email', "Enter the valid email address").isEmail(),
    body('password', "password cannot be blank").exists(),

], async(req, res) =>{

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

        const comparedPassword = await bcrypt.compare(password, user.password);
        if(!comparedPassword){

            return res.status(400).json({success, error: "Soory cannot login ! please try loginin with correct credential"});
        }

        // sending the authtoken and inside the auth token we will be attaching userId that mongoDB has created
        const data = {
            user:{
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authtoken});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
    }
}
