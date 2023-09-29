//env variable
require ("dotenv").config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport, { session } from "passport";

//config
import googleAuthConfig from "./config/google.config";
import routeConfig from "./config/routes.config";
//API
import Auth from "./API/Auth/index";
import Note from "./API/Note/index";
import User from "./API/User/index";
import Image from "./API/Image/index";


//DataBase Connection
import ConnectDb from "./database/connection";



const keeper = express();

keeper.use(express.json());
keeper.use(express.urlencoded({extended: true}));
keeper.use(helmet());
keeper.use(cors());

keeper.use(passport.initialize());
keeper.use(passport.session());


//passport configuration
googleAuthConfig(passport);
routeConfig(passport);

//For application routes
//locallhost:4000/auth/signup 
///auth this is used as a micro service 
keeper.use("/auth", Auth);
keeper.use("/note",Note);
keeper.use("/user", User);
keeper.use("/image", Image);

keeper.get("/", (req, res) => {
    res.json({message: "Setup complete Yay!!!"})
});

keeper.listen(4000, () => {
    ConnectDb().then(() => console.log("Database is up and running on port 4000"))
    .catch(() => console.log("Database connection Failed"));
});

// let count = 1
// showlogs = (req, res, next) => {
//     console.log("\n==============================")
//     console.log(`------------>  ${count++}`)

//     console.log(`\n req.session.passport -------> `)
//     console.log(req.session.passport)
  
//     console.log(`\n req.user -------> `) 
//     console.log(req.user) 
  
//     console.log("\n Session and Cookie")
//     console.log(`req.session.id -------> ${req.session.id}`) 
//     console.log(`req.session.cookie -------> `) 
//     console.log(req.session.cookie) 
  
//     console.log("===========================================\n")

//     next()
// }

// keeper.use(showlogs);
