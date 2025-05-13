'use client'

import useSubscribersAnalytics from "@/shared/hooks/useSubscribersAnalytics"
import { MonthData } from "@/shared/utils/analyticsGenerator";
import { ICONS } from "@/shared/utils/icons"
import { useEffect, useState } from "react";

function DashboardOverViewCard() {
    const [ loading, setLoading ]= useState(true);
    const { subscribersData } = useSubscribersAnalytics();
    const [lastMonthSubscribers, setLastMonthSubscribers]= useState<MonthData>({
        month: "",
        count: 0
    });
    const [previousLastMonthSubscribers, setPreviousLastMonthSubscribers]= useState<MonthData>({
        month: "",
        count: 0
    });
    let subscriberComparePercentage = 0

    useEffect(() => {
        if(subscribersData.last7Months) {
            setLastMonthSubscribers(subscribersData?.last7Months[subscribersData?.last7Months?.length - 1])
            setPreviousLastMonthSubscribers(subscribersData?.last7Months[subscribersData?.last7Months?.length - 2])
            setLoading(false)
        }

        
    }, [subscribersData.last7Months])
    
   if(previousLastMonthSubscribers.count > 0) {
    subscriberComparePercentage = ((lastMonthSubscribers.count - previousLastMonthSubscribers.count) / previousLastMonthSubscribers.count) * 100
   } else {
    subscriberComparePercentage = 100
   }



  return (
    <div className="w-full flex bg-white shadow-xs">

        {/* subscribers */}
        <div className="w-[33.33%] border-r border-r-gray-200 p-5 text-lg">
            <h5 className="text-lg">Subscribers</h5>
            <div className="w-full flex items-center justify-between">
                <span className="font-medium pt-2">
                    {loading ? '...' : lastMonthSubscribers?.count}
                </span>
                <div className="h-[30px] flex p-2 items-center bg-[#DCFCE6] rounded-full">
                    <span className="text-[#21C55D]">{ICONS.topArrow}</span>
                    <span className="text-sm pl-1">
                        {loading ? "...%" : `${subscriberComparePercentage}%` }
                    </span>
                </div>
            </div>
            <small className="block text-sm opacity-[0.7] pt-2">
                from 0 (last 4 weeks)
            </small>
        </div>

        {/* Open Rate */}
        <div className="w-[33.33%] border-r border-r-gray-200 p-5 text-lg">
            <h5 className="text-lg">Open Rate</h5>
            <div className="w-full flex items-center justify-between">
                <span className="font-medium pt-2">0</span>
                <div className="h-[30px] flex p-3 items-center bg-[#F3F4F6] rounded-full">
                    <span className="text-xl">-</span>
                    <span className="text-sm pl-1">0%</span>
                </div>
            </div>
            <small className="block text-sm opacity-[0.7] pt-2">
                from 0 (last 4 weeks)
            </small>
        </div>

        {/* click rate */}
        <div className="w-[33.33%] border-r border-r-gray-200 p-5 text-lg">
            <h5 className="text-lg">Click Rate</h5>
            <div className="w-full flex items-center justify-between">
                <span className="font-medium pt-2">0</span>
                <div className="h-[30px] flex p-3 items-center bg-[#F3F4F6] rounded-full">
                    <span className="text-xl">-</span>
                    <span className="text-sm pl-1">0%</span>
                </div>
            </div>
            <small className="block text-sm opacity-[0.7] pt-2">
                from 0(last 4 weeks)
            </small>
        </div>
        
    </div>
  )
}

export default DashboardOverViewCard