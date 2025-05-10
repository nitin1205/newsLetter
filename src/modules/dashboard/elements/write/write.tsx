'use client'

import { Button } from "@heroui/react";
import { useCallback, useEffect, useState } from "react"
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";

import { ICONS } from "@/shared/utils/icons";
import { getEmails } from "@/actions/getEmail";

function Write() {
    const [emailTitle, setEmailTitle] = useState("");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [emails, setEmails] = useState<any>([]); 
    const [open, SetOpen] = useState(false);
    const router = useRouter();
    const { user } = useClerk()

    const handleCreate = () => {
        if(emailTitle.length === 0) {
            toast.error('Enter the email subject to continue!')
        } else {
            const formattedTitle = emailTitle.replace(/\s+/g, "-").replace(/&/g, "-");
            router.push(`/dashboard/new-email?subject=${formattedTitle}`);
        }
    };

    const findEmails = useCallback(async () => {
        await getEmails({ newsLetterOwnerId: user?.id as string })
        .then((res) => {
            setEmails(res);
        })
        .catch((e) => {
            console.log(e);
        })
    }, [user?.id])

    useEffect(() => {
        findEmails()
    }, [user, findEmails])

  return (
    <div className="w-full flex p-5 flex-wrap gap-6 relative">
        <div className="w-[200px] h-[200px] bg-slate-50 flex flex-col items-center 
            justify-center rounded border border-gray-200 shadow-sm cursor-pointer"
            onClick={() => SetOpen(!open)}
        >
            <span className="text-2xl block text-center mb-3">{ICONS.plus}</span>
            <h5 className="text-2xl ">Create New</h5>
        </div>
        {
            open && (
                <div className="absolute flex items-center justify-center top-0 left-0 bg-[#00000028] h-screen w-full">
                    <div className="w-[600px] p-5 bg-white rounded shadow relative">
                        <div className="absolute top-3 right-3">
                            <span className="text-ld cursor-pointer "
                                onClick={() => SetOpen(!open)}
                            >
                                {ICONS.cross}
                            </span>
                        </div>
                        <h5 className="text-2xl">Enter your Email subject</h5>
                        <input type="text" 
                            name="" 
                            id=""
                            className="border border-gray-200 w-full my-2 h-[35px] px-2 outline-none"
                            value={emailTitle}
                            onChange={(e) => setEmailTitle(e.target.value)} 
                        />
                        <Button
                            color="primary"
                            className="rounded text-xl mt-3"
                            onPress={handleCreate}
                        >
                            Continue
                        </Button>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default Write