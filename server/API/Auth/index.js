import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { UserModel } from "../../database/user/user.js";

const Router = express.Router();

/*
Route: "/signup"
Description: Signing up with email, Fullname and password. 
Params: None
Access: Public
Method: Post
*/
Router.post("/signup", async(req, res) => {
    try{
        const {email, password, fullname } = req.body.credentials;

        //Check for existing email
        const checkUserByEmail = await UserModel.findOne({ email }); 

        if (checkUserByEmail) {
            return res.json({ error:"User already exists"})
        }
        
        //Hashing and Salting
        const bcryptSalt = await bcrypt.genSalt(8);
        const HashedPassword = await bcrypt.hash(password, bcryptSalt);

        await UserModel.create({
            ...req.body.credentials,
            password: HashedPassword
        });

        //JWT Web token
        const token = jwt.sign({user: {fullname, email}}, "KeeperApp");

        return res.status(200).json({token});

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

export default Router;