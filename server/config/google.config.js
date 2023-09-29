import googleOAuth from "passport-google-oauth20";

import { UserModel } from "../database/user/user";

const GoogleStrategy = googleOAuth.Strategy;

export default (passport) => {
    passport.use(
        new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "https://localhost:4000/auth/google/callback"
        },
        async (accessToken, refreshToken, profile, done ) => {
            
            // UserModel.findOrCreate({ googleId: profile.id }, function (err, user) {
            //     console.log(profile);
            //     return done(err, user);
            //   });
            const newUser = {
                fullname: profile.displayName,
                email:profile.email[0].value,
                profilePic:profile.photos[0].value
            };
            try {
                //check user exists or not  
                const user = await UserModel.findOne({ email : newUser.email});
                
                if(user) {
                    //generating jwt token
                    const token = user.generateJwtToken();
                    //return user
                    done(null, {user, token});
                } else {
                    //create a new user
                    const user = await UserModel.create(newUser);

                    //generating jwt token
                    const token = user.generateJwtToken();
                    
                    //return user
                    done(null, {user, token}); 
                }
            } catch(error) {
                done(error, null);
            }
        })
    );

    passport.serializeUser((userData, done) => done(null, { ...userData}));
    passport.deserializeUser((id, done) => done(null, id));
    
};