'use client'

import useSubscribersData from "@/shared/hooks/useSubscribersData"

function SubscribersData() {
    const { data, loading } = useSubscribersData()
    console.log(data,loading)

  return (
    <div>SubscribersData</div>
  )
}

export default SubscribersData