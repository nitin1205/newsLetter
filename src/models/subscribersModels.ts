import { model, models, Schema } from "mongoose";

export interface SubscriberSchemaDocument {
    _id: string;
    email: string;
    newsLetterOwnerId: string;
    createdAt?: object;
    updatedAt?: object;
}

const subscriberSchema = new Schema({
    email: { type: String},
    newsLetterOwnerId: { type: String}   
},{
    timestamps: true
})

const Subscriber = models.Subscriber || model<SubscriberSchemaDocument>("Subscriber", subscriberSchema);
export default Subscriber;