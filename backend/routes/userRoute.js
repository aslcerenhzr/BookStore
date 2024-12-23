import express from "express";

const router = express.Router();

import User from '../models/userModel.js';

router.post("/register", async(req, res) => {
    const newUser = new User(req.body)
    try {
        const user = await newUser.save()
        res.status(201).json({ message: "User Registered Successfully", user });
    } catch (error) {
        return res.status(400).json({message:error});
    }
});

router.post("/login", async(req, res) => {
    const {email , password} = req.body

    try {
        const user= await User.findOne({email: email, password:password})
        if (user) {
            res.status(200).json(user);
        } else {
            return res.status(400).json({message:'Login Failed'});
        }
    } catch (error) {
        return res.status(500).json({ message: "An error occurred", error });
    }
});

export default router;
