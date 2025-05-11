'use server'

import Email from "@/models/emailModel";
import { connectDb } from "@/shared/libs/db"

export const getEmailDetails = async({
    title,
    newsLetterOwnerId
}: {
    title: string,
    newsLetterOwnerId: string
}) => {
    try {
        await connectDb();
        const email = await Email.findOne({
            title,
            newsLetterOwnerId
        });
        return JSON.stringify(email);
    } catch(error) {
        console.log(error)
    }
};