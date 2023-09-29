import mongoose, { mongo } from "mongoose";

const NoteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "Users"
      },
    title: {
        type: String, 
        required:true 
    },
    text_content: {
        type: String, 
    },
    checkbox_content: [
        {
            type: String
        }
    ],
    image_content: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Images",
        }
    ],
    map_content: [
        {
            location: {
                type:String, 
                required:true
            }
        }
    ],
    date_time : { 
        type : Date,
        default: Date.now 
    },
},
{
    timestamps: true
});

export const NoteModel = mongoose.model("Notes",NoteSchema);