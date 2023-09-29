import joi from "joi";

export const ValidateNoteId =  (noteId) => {
    
    const Schema = joi.object({
        _id: joi.string().required()
    });
    return Schema.validateAsync(noteId) 
};

export const ValidateNoteSearchString = (noteObj) => {

    const Schema = joi.object({
        searchString:joi.string().required() 
    });
    return Schema.validateAsync(noteObj)
};