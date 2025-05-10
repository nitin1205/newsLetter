import { model, models, Schema } from "mongoose";

export interface EmailSchemaDocument {
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

const Email = models.Emails || model<EmailSchemaDocument>("Emails", emailSchema)

export default Email;