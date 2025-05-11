'use client'

import { Button } from "@heroui/react";
import { useCallback, useEffect, useState } from "react"
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import Link from "next/link";

import { ICONS } from "@/shared/utils/icons";
import { getEmails } from "@/actions/getEmail";
import { EmailSchemaDocument } from "@/models/emailModel";

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
            setEmails(JSON.parse(res as string));
        })
        .catch((e) => {
            console.log(e);
        })
    }, [user?.id])

    useEffect(() => {
        findEmails()
    }, [user, findEmails]);

    const deleteHandler = async (id: string) => {
        // await Email.deleteOne({
        //     _id: id 
        // })
    }

  return (
    <div className="w-full flex p-5 flex-wrap gap-6 relative">
        <div className="w-[200px] h-[200px] bg-slate-50 flex flex-col items-center 
            justify-center rounded border border-gray-200 shadow-sm cursor-pointer"
            onClick={() => SetOpen(!open)}
        >
            <span className="text-2xl block text-center mb-3">{ICONS.plus}</span>
            <h5 className="text-2xl ">Create New</h5>
        </div>

        {/* saved emails */}
        {
            emails && emails.map((email: EmailSchemaDocument)=> {
                const formattedTitle = email?.title .replace(/\s+/g, "-").replace(/&/g, "-");
                return(
                    <div key={email?._id}
                        className="w-[200px] h-[200px] z-[0] relative bg-slate-50 flex flex-col 
                        items-center justify-center rounded border border-gray-200 shadow-sm cursor-pointer"
                    >
                        <span   className="absolute block z-20 right-2 top-2 text-2xl cursor-pointer" 
                           onClick={() => deleteHandler(email?._id as string)} 
                        >
                            {ICONS.delete}
                        </span>
                        <Link href={`/dashboard/new-email?subject=${formattedTitle}`} className="text-3xl">
                            {email.title}
                        </Link>
                    </div>
                );
            })
        }

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