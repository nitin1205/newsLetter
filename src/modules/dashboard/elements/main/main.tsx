'use client'
import { useUser } from "@clerk/nextjs"

function Main() {
    const {user} = useUser(); 
  return (
    <div className="p-5 w-full h-screen bg-[#f9fafb]">
        <h1 className="text-2xl text-surface-900 font-medium">
            Hi {user?.fullName} 👋 
        </h1>
        <p>
          
        </p>
    </div>
  )
}

export default Main