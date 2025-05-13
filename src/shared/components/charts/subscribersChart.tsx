'use client'

import useSubscribersAnalytics from '@/shared/hooks/useSubscribersAnalytics';
import { useEffect, useMemo, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';


interface SubscribersAnalyticsData {
    month: string;
    count: string;
}

function SubscribersChart() {
  const [loading, setLoading] = useState(true);
  //   const data = [
  //   {
  //     month: "Jan 2024",
  //     count: 2400,
  //   },
  //   {
  //     month: "Feb 2024",
  //     count: 1398,
  //   },
  //   {
  //     month: "March 2024",
  //     count: 9800,
  //   },
  //   {
  //     month: "April 2024",
  //     count: 3908,
  //   },
  //   {
  //     month: "May 2024",
  //     count: 4800,
  //   },
  //   {
  //     month: "Jun 2024",
  //     count: 3800,
  //   },
  //   {
  //     month: "July 2024",
  //     count: 4300,
  //   },
  // ];
    const { subscribersData } = useSubscribersAnalytics()

  const data: SubscribersAnalyticsData[] = useMemo(() => {
    return [];
  },[])
  
  useEffect(() => {
    if(subscribersData.length !== 0) {
      subscribersData?.last7Months?.forEach((item: SubscribersAnalyticsData) => {
        data.push({
          month: item?.month,
          count: item?.count,
        });
      });
      setLoading(false);
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscribersData])

  return (
    <div className='my-5 p-5 bg-white w-full md:h-[55vh] xl:h-[60vh] border border-gray-200 shadow-xs'>
        <div className='w-full flex'>
            <h3 className='font-medium'>Active Subscribers</h3>
        </div>
        <div className='flex w-full items-center justify-between'>
            <p className='opacity-[0.5]'>Shows all active subscribers</p>
            <div className='flex items-center'>
                <div className='w-2 h-2 rounded-full bg-[#EB4898]'/>
                <span className='pl-2 text-sm opacity-[0.7]'>Subscribers</span>
            </div>
        </div>

        { loading ?
          <div>
            <h5 className='h-100 text-xl flex items-center justify-center min-w-full'>
              Loading...
            </h5>
          </div>
        : (
          <ResponsiveContainer width="100%" height="85%" className="mt-5">
            <LineChart
                width={500}
                height={200}
                data={data}
                syncId="anyId"
                margin={{top:10, right:30, left: 0, bottom: 0}}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="month"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Line
                    type="monotone"
                    dataKey="count"
                    stroke='#EB4898'
                    fill='#EB4898'
               />
            </LineChart>
        </ResponsiveContainer>
        )
      }      
    </div>
  )
}

export default SubscribersChart