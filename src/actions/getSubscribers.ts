"use server"

import Subscriber from "@/models/subscribersModels";
import { connectDb } from "@/shared/libs/db"

export const getSubscribers = async({ newsLetterOwnerId } : { newsLetterOwnerId: string }) => {
    try {
        await connectDb();
        
        const subscribers = await Subscriber.find({ newsLetterOwnerId }).lean();

        return subscribers
    } catch (error) {
        console.log(error);
    }
}