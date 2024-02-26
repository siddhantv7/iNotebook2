const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator')

// Create a user using: POST "/api/auth". 

router.post('/createUser', [
    body("username", "Enter a valid username").isLength({ min: 4 }),
    body("password", "Password must be atleast 5 characters").isLength({ min: 5 }),
    body("email", "Enter a valid email").isEmail(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array});
    }
    // let user = await User.findOne({ $and: [{ email: req.body.email }, { username: req.body.username }] });
    try {
    let email = await User.findOne({email: req.body.email});
    let username = await User.findOne({username: req.body.username});
    if (email){
        return res.status(400).json({error: "Sorry a user with this email already exist."})
    }else if (username){
        return res.status(400).json({error: "Sorry a user with this username already exist."})
    }
    let user = await  User.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
    });
    // res.json({Status: user})      // Give user input object
    res.json({Status: "User added"})
}catch(error){
    res.status(500).send("Some error occured.")
}
    // .then(user => res.json(user))
    // .catch(error => {console.log(error)
    // res.json({error: "Please enter a valid value for email", message: error.message })
    // });

    // res.send({ errors: result.array() });
    // obj = {
    //     a: "dfssx",
    //     b: "sacas"
    // }
    // res.json(obj)

    // console.log(req.body);
    // console.log("hello");

    // res.send("Hello");
    // const user = User(req.body);

    // user.save();
    // res.send(req.body)
})

module.exports = router