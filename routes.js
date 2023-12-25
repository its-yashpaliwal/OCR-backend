// routes.js
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const Tesseract = require('tesseract.js');

const router = express.Router();
const upload = require('./upload');
require('./db');
const User = require('./models/userSchema');

// Route to render the index page
router.get('/', (req, res) => {
  res.render('index');
});

// Route for file upload and OCR processing
router.post('/upload', upload);

// router.post('/save', (req,res)=>{
//     const {identificationNumber,firstName,lastName,DOB,issueDate,expireDate} = req.body;

//     if(!identificationNumber|| !firstName || !lastName || !DOB || !issueDate || !expireDate)
//         return res.status(422).json({error: "Please fill all the fields..."});

//     User.findOne({identificationNumber: identificationNumber})
//     .then((userExist)=>{
//         if(userExist)
//         return res.status(422).json({error: "Already Present"})
        
//         const user = new User({identificationNumber,firstName,lastName,DOB,issueDate,expireDate})

//         user.save().then(()=>{
//             res.status(201).json({message: "User Successfully registered"});
//         }).catch((err)=>res.status(500).json({error: "failed to register"}));
//     }).catch(err=>{console.log(err);});

//     console.log(req.body);
    

// })


router.post('/save', async (req,res)=>{

    const {identificationNumber,firstName,lastName,DOB,issueDate,expireDate} = req.body;

    if(!identificationNumber || !firstName || !lastName  || !DOB || !issueDate ||!expireDate)
        return res.status(422).json({error: "Please fill all details"});

    try{
        // const userExist = await User.findOne({identificationNumber: identificationNumber});

        // if(userExist){
        //     return res.status(422).json({error: "User already present"});
        // }

        const user = new User({identificationNumber,firstName,lastName,DOB,issueDate,expireDate});
        console.log("hi");
        console.log(user);
        console.log("hi again");

        const userRegister = await user.save();

        console.log("Hiiiiiiiii"+userRegister);

        if(userRegister)
        {
            res.status(201).json({message: "User registered successfully"});
        }


    }catch(err)
    {
        console.log(err);
    }
    // console.log(req.body);
    res.send("mera save button");
})

// Route to show data (you can implement this as needed)


router.get('/showdata', (req, res) => {
  // Implement logic to show data
});

module.exports = router;
