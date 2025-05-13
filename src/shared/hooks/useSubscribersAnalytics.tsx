"use client";

import { subscribersAnalytics } from '@/actions/subscribersAnalytics';
import { useEffect, useState } from 'react'

function useSubscribersAnalytics() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [subscribersData, setSubscribersData] = useState<any>([]);
  
  const getSubscribersAnalyticsData = async () => {
    await subscribersAnalytics().then((res) => {
      setSubscribersData(JSON.parse(res as string))
    }) 
  };

  useEffect(() => {
    getSubscribersAnalyticsData();
  }, [])

  return { subscribersData };
}

export default useSubscribersAnalytics