import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";

const Router = express.Router();

import { UserModel } from "../../database/user/user.js";

//Validation
import { ValidateSignin, ValidateSignup } from "../../validation/auth.js";

/*
Route: "/signup"
Description: Signing up with email and password. 
Params: None
Access: Public
Method: Post
*/
Router.post("/signup", async(req, res) => {
    try{

        await ValidateSignup(req.body.credentials);

        const {email, password } = req.body.credentials;
        //Check for existing email
        await UserModel.findEmail( req.body.credentials);
        
        //DB
        const newUser = await UserModel.create(req.body.credentials);

        //JWT Web token
        const token = newUser.generateJwtToken();

        return res.status(200).json({token,newUser});

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

/*
Route: "/signin"
Description: Signing in with email and password. 
Params: None
Access: Public
Method: Post
*/
Router.post("/signin", async(req, res) => {
    try{
        //Validation
        await ValidateSignin(req.body.credentials);

        //Check for existing email
        const user = await UserModel.findByEmailAndPassword( 
            req.body.credentials
        );
        
        //JWT Web token
        const token = user.generateJwtToken();

        return res.status(200).json({token, status: "Success"});

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

/*
Route: "/google"
Description: Google Signing in. 
Params: None
Access: Public
Method: get
*/
Router.get("/google", passport.authenticate ("google", {
    scope : [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
    ]})
);

/*
Route: "/google/callback"
Description: Google Signin callback. 
Params: None
Access: Public
Method: get
*/
Router.get("/google/callback", 
    passport.authenticate ("google", 
    {
        failureRedirect : "/",
    }),
    // function(req, res) {
    //     // Successful authentication, redirect success.
    //     res.redirect('/success');
    // }
(req, res) => {
    return res.json({token: req.session.passport.user.token});
}
);



export default Router;