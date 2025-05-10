import mongoose from "mongoose";
import { driver, createAstraUri } from "stargate-mongoose";

export const connectDb = async () => {
    try {
        const uri = createAstraUri(
            process.env.ASTRA_DB_API_ENDPOINT!,
            process.env.ASTRA_DB_APP_TOKEN!
        )

        // checking for existing connection
        if(mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
        }

        mongoose.set("autoCreate", true);
        mongoose.setDriver(driver);

        await mongoose.connect(uri, { isAstra: true })
        .then(() => {
            console.log('connected');
        })
        .catch((e) => {
            console.log(e);
        })

    } catch(error) {
        console.log(error);
    }
};