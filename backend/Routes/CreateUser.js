const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

const bcrpyt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const jwtsecret="MynameisKiyotakaAyanokoji"; //secret key for jwt token
router.post(
    "/createUser",
    [body("email").isEmail(), body("password","Incorrect Password").isLength({ min: 5 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt=await bcrpyt.genSalt(10); //generating salt
        let secPassword = await bcrpyt.hash(req.body.password,salt); //parameter to be hashed, salt


        try {
            await User.create({
                name: req.body.name,
                location: req.body.location,
                email: req.body.email,
                password: secPassword,
            });
            res.json({ success: true });
        } catch (err) {
            console.log(err);
            res.json({ success: false });
        }
    }
);

router.post(
    "/loginuser",
    [body("email").isEmail(), body("password").isLength({ min: 5 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email;
        try {
            let userData = await User.findOne({ email: email });
            if (!userData) {
                return res.status(400).json({ errors: "No user exists" });
            }
            const pwdCompare=await bcrpyt.compare(req.body.password,userData.password);
            if (!pwdCompare) {
                return res.status(400).json({ errors: "Incorrect Password!!" });
            }
            const data={
                user:{
                    id:userData.id
                }
            }
            const authToken=jwt.sign(data,jwtsecret);
            return res.json({ success: true ,authToken:authToken});
        } catch (err) {
            console.log(err);
            res.json({ success: false });
        }
    }
);

module.exports = router;
