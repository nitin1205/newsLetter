"use client"
import { useClerk } from "@clerk/nextjs";
import { useCallback, useEffect, useState } from "react"

import { getSubscribers } from "@/actions/getSubscribers";


function useSubscribersData() {
    const [data, setdata] = useState([]);
    const [loading , setLoading] = useState(true);
    const { user } = useClerk()
    
    const subscribers = useCallback(async() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await getSubscribers({ newsLetterOwnerId: user?.id as string }).then((res: any) => {
            setdata(res)
            setLoading(false)
        }).catch((e) => {
            setLoading(false)
            console.log(e);
        })
    }, [user?.id]) 

    useEffect(() => {
        subscribers()
    }, [subscribers, user]);


  return { data, loading }
}

export default useSubscribersData