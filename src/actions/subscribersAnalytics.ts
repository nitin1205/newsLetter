"use server"

import Subscriber from "@/models/subscribersModels"
import { generateAnalyticsData } from "@/shared/utils/analyticsGenerator"

export const subscribersAnalytics = async () => {
    try {
        const subscribers = await generateAnalyticsData(Subscriber);
        return JSON.stringify(subscribers);
    } catch (error) {
        console.log(error)
    }
}