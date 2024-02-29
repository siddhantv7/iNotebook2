const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator')
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = "helllowallahumai"
// ROUTE1: User registration


router.post('/createUser', [
    body("username", "Enter a valid username").isLength({ min: 4 }),
    body("password", "Password must be atleast 5 characters").isLength({ min: 5 }),
    body("email", "Enter a valid email").isEmail(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // let user = await User.findOne({ $and: [{ email: req.body.email }, { username: req.body.username }] });
    try {
        let email = await User.findOne({ email: req.body.email });
        let username = await User.findOne({ username: req.body.username });
        if (email) {
            return res.status(400).json({ error: "Sorry a user with this email already exist." })
        } else if (username) {
            return res.status(400).json({ error: "Sorry a user with this username already exist." })
        }
        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.password, salt);

        let user = await User.create({
            username: req.body.username,
            password: secPass,
            email: req.body.email,
        });

        const data = {
            user: {
                id: user.id
            }
        };
        const jwtData = jwt.sign(data, JWT_SECRET);
        console.log(jwtData);



        // res.json({Status: user})      // Give user input object
        res.json({ Status: "User added" })
    } catch (error) {
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

// ROUTE2: (User login) Aunthericate a user using: POST "/api/auth/login". No login required

router.post('/login', [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password can not be blank")

], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct credentials." })
        } 
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }
        const data = {
            user: {
                id: User.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({authtoken})

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// ROUTE3: Get loggedin user detsail using: POST "/api/auth/getuser"

router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        console.log(userId);
        const user = await User.findOne(userId).select("-password");
        // console.log(user);
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router