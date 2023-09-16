import express from "express";
import cors from "cors";
import helmet from "helmet";
const keeper = express();

keeper.use(express.json());
keeper.use(express.urlencoded({extended: false}));
keeper.use(helmet());
keeper.use(cors());

keeper.get("/", (req, res) => {
    res.json({message: "Setup complete Yay!!!"})
});

keeper.listen(4000, () => {
    console.log("Server is up and running on port 4000");
})