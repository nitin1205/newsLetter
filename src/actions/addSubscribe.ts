"use server"
import Subscriber from "@/models/subscribersModels"
import { connectDb } from "@/shared/libs/db"
import { validateEamil } from "@/shared/utils/zeroBounceAPI";
import { clerkClient } from "@clerk/nextjs/server"

 

export const subscribe = async ({
    email,
    username    
} : {
    email: string
    username: string
}) => {
    try {
        await connectDb();

        // fetch all users
        const client = await clerkClient();
        const userResponse = await client.users.getUserList();
        const allUsers = userResponse.data;
        
        // find newsletter owner
        const newsletterOwner = allUsers.find((user) => user.username === username);

        if(!newsletterOwner) {
            throw new Error('username not valid!');
        }

        // check if alredy subscribed
        const isSubscriber = await Subscriber.findOne({
            email,
            newsLetterOwnerId: newsletterOwner?.id 
        });

        if(isSubscriber) {
            return JSON.stringify({ error: 'Email already exists'});
        }

        // valiadte email
        const validateResponse = await validateEamil({ email })
        if(validateResponse.status === 'invalid') {
            return JSON.stringify({ error: "Email not vaild!" });
        }

        const subscriber = await Subscriber.create({
            email,
            newsLetterOwnerId: newsletterOwner?.id
        });

        return JSON.stringify(subscriber);

    } catch (error) {
        console.log(error);
        return { error: "An error occured while subsribing" };
    }
} 