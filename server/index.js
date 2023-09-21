//env variable
require ("dotenv").config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport, { session } from "passport";

//config
import googleAuthConfig from "./config/google.config"
//API
import Auth from "./API/Auth";

//DataBase Connection
import ConnectDb from "./database/connection";
import googleConfig from "./config/google.config";


const keeper = express();

keeper.use(express.json());
keeper.use(express.urlencoded({extended: true}));
keeper.use(helmet());
keeper.use(cors());

keeper.use(passport.initialize());
keeper.use(passport.session());


//passport configuration
googleConfig(passport);

//For application routes
//locallhost:4000/auth/signup 
///auth this is used as a micro service 
keeper.use("/auth", Auth);

keeper.get("/", (req, res) => {
    res.json({message: "Setup complete Yay!!!"})
});

keeper.listen(4000, () => {
    ConnectDb().then(() => console.log("Database is up and running on port 4000"))
    .catch(() => console.log("Database connection Failed"));
});