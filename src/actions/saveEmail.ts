"use server";

import Email, {EmailSchemaDocument} from "@/models/emailModel";
import { connectDb } from "@/shared/libs/db";


export const saveEmail = async ({ title, content, newsLetterOwnerId}: EmailSchemaDocument) => {
    try{
        await connectDb();
        const email = await Email.findOne({
            title,
            newsLetterOwnerId,
        });

        if(email) {
            await Email.findByIdAndUpdate(email._id, {
                content
            });
            return { message: 'Email updated successfully' } 
        } else {
            await Email.create({
                title,
                content,
                newsLetterOwnerId
            });
            return { message: 'Email saved successfully' }
        }

    } catch(error) {
        console.log(error);
    }
}  