import express from "express";
import passport from "passport";

import { NoteModel } from "../../database/allModels";
import { ValidateNoteSearchString } from "../../validation/note";
const Router = express.Router();

/*
Route: /new
Destination: Create a new Note.
Params: None
Access: Public
Method: GET
*/
/*
Route            /
Des              Get all notes based on _id
Params           _id
Access           Public
Method           GET
*/

Router.get("/:_id",passport.authenticate("jwt", {session: false})  ,async(req,res)=> {
    try {
      const { _id } = req.params;
      const getNotes = await NoteModel.findOne({user: _id});
  
      if(!getNotes) {
        return res.status(404).json({error: "User not found"});
      }
  
    } catch (error) {
      return res.status(500).json({error: error.message});
    }
  });

Router.post("/new/:_id",passport.authenticate("jwt", {session: false}) , async(req, res) => {
    try{
        
        await ValidateNoteId(req.params);
        const { noteData } = req.body;
        
        await NoteModel.create(noteData);

        return res.json({review: "Successfully Created the Note!"});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

/*
Route: /delete
Destination: Delete a note.
Params: None
Access: Public
Method: GET
*/

Router.delete("/delete/:_id", async(req, res) => {
    try{
        
        await ValidateNoteId(req.params);

        const { _id } =req.params;
        await NoteModel.findByIdAndDelete(_id) ;

        return res.json({review:"Successfully Deleted Review!"});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
} );

/*
Route: /search
Destination: Search a note.
Params: None
Body: searchString
Access: Public
Method: GET
*/
/*sasassddsc 
regex to search a substring*/

Router.get("/search", async(req, res) => {
    try{
        
        await ValidateNoteSearchString(req.params);

        const { searchString } =req.body;

        const notes = await NoteModel.find({
            title: {$regex: searchString, $option: "i"},
            text_content: {$regex: searchString, $option: "i"},
            checkbox_content: {$regex: searchString, $option: "i"},
        });

        if(!notes) {
            return res.status(404).json({error: "Note not found"});
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

export default Router;