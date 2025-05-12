import { model, models, Schema } from "mongoose";

export interface SubscriberSchemaDocument {
    _id: string;
    email: string;
    newsLetterOwnerId: string;
    createdAt?: object;
    updatedAt?: object;
    source?: string
    status?: string;

}

const subscriberSchema = new Schema({
    email: { type: String},
    newsLetterOwnerId: { type: String},
    source: { type: String, default: "By ShadyMedia Website" },
    status: { type: String, default: "Subscribed" }   
},{
    timestamps: true
})

const Subscriber = models.subscribers || model<SubscriberSchemaDocument>("subscribers", subscriberSchema);
export default Subscriber;