import Jwtpassport from "passport-jwt";

import { UserModel } from "../database/user/user";

const JwtStrategy = Jwtpassport.Strategy;
const Extractjwt = Jwtpassport.ExtractJwt;

const options = {
    jwtFromRequest: Extractjwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "KeeperApp"
};

export default (passport) => {
    passport.use(
        new JwtStrategy(options, async(jwt_payload, done)=>{
            try{
                const doesUserExist = UserModel.findById(jwt_payload.user);
                if (!doesUserExist) return done(null, false);

                return done(null, doesUserExist);
            } catch (error) {
                throw new Error(error);
            }
        })
    );    
};