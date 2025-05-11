'use client'

import { subscribe } from "@/actions/addSubscribe";
import { Button } from "@heroui/react";
import { useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react"
import toast from "react-hot-toast";

 

function Page() {
    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(false)
    const searchParams = useSearchParams();
    const username: string = searchParams.get("username")!;

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        await subscribe({email: value, username})
        .then((res) => {
            setLoading(false);
            if(res.error) {
                toast.error(res.error)
            } else {
                toast.success("You are subscribed successfully");
            }
        })
        .catch((e) => {
            setLoading(false);
            console.log(e);
        });

        setValue('');
    };


  return (
    <div className="w-full flex flex-col items-center justify-center h-screen">
        <div>
            <h1 className="text-7xl pb-8 capitalize">{username} Newsletter</h1>  
        </div>
        <form className="flex w-full max-w-md border rounder overflow-hidden border-gray-200"
            onSubmit={(e) => handleSubmit(e)}
        >
            <input type="email" name="email" 
                required value={value} 
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter you email"
                className="px-4 py-4 w-full text-gray-700 leading-tight focus:outline-none"
            />
            <Button type='submit'
                disabled={loading}
                className="px-10 bg-blue-500 text-white text-lg font-bold py-8 rounded hover:bg-blue-600 focus:outline-none"
            >
                Subscribe
            </Button>

        </form>
    </div>
  )
}

export default Page