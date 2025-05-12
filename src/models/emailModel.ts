import { model, models, Schema } from "mongoose";

export interface EmailSchemaDocument {
    _id?: string;
    title: string;
    content: string;
    newsLetterOwnerId: string;
}


const emailSchema = new Schema(
    {
        title : { type: String },
        content: { type: String },
        newsLetterOwnerId: { type: String } 
    },
    {
        timestamps: true        
    }
);

const Email = models.emails || model<EmailSchemaDocument>("emails", emailSchema)

export default Email;