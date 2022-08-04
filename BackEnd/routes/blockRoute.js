const express = require('express');
const router = express.Router();

const blockModel = require("../models/blockModel");

router.post('/blockuser/', 

    async(req, res)=>{

        try{
            let success = false;
            const {blockeduser, blocker} = req.body;

            const data  = await blockModel.create({
                blockedusers: [blocker, blockeduser],
                blocker: blocker
            })

            if(data){
                success = true;
                return res.json({success, msg:"user blocked successfully"})
            }

            else{
                return res.json({success, msg:" failed to block the user"});

            }
        }
        catch(error){
            console.log({mgs:"Internal Sever eroor", error});

        }
    }
)

module.exports = router;

