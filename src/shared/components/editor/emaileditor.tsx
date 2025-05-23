'use client'

import { useCallback, useEffect, useRef, useState } from "react";
import { useClerk } from "@clerk/nextjs";
import EmailEditor, { EditorRef, EmailEditorProps } from "react-email-editor";
import { useRouter } from "next/navigation";

import { DefaultJsonData } from "@/assets/mails/default";
import { Button } from "@heroui/react";
import { saveEmail } from "@/actions/saveEmail";
import toast from "react-hot-toast";
import { getEmailDetails } from "@/actions/getEmailDetails";
import { sendEmail } from "@/shared/utils/emailSender";

function Emaileditor({subjectTitle}: {subjectTitle: string}) {
    const [loading, setLoading] = useState(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [jsonData, setJsonData] = useState<any | null>(DefaultJsonData);
    const {user} = useClerk();
    const emailEditorRef = useRef<EditorRef>(null);
    const history = useRouter();
    
    const exportHtml = () => {
      const unlayer = emailEditorRef.current?.editor;
      
      unlayer?.exportHtml(async (data) => {
        const { design,  html  } = data;
        setJsonData(design);
        console.log('subject')
        console.log(subjectTitle);
        console.log('content');
        console.log(html)
        await sendEmail({
          userEmail: ['nitin.singh.120598@gmail.com'],
          subject: subjectTitle,
          content: html
        }).then(() => {
          toast.success('Email sent successfully')
        })
      });
    };

    const emailDetails = useCallback(async() => {
      try{
          const email = await getEmailDetails({
            title: subjectTitle,
            newsLetterOwnerId: user?.id as string
          })
          if(email && email!= 'null'){
            const jsonDataObject = JSON.parse(email);
            setJsonData(()=> JSON.parse(jsonDataObject?.content));
          }
          setLoading(false);

      } catch(error) {
        console.log(error);
      }
    }, [subjectTitle, user?.id])

    useEffect(() => {
      emailDetails();
    }, [emailDetails, user]);

    const onReady: EmailEditorProps["onReady"] = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const unlayer: any = emailEditorRef.current?.editor
      unlayer.loadDesign(jsonData)
    }

    const saveDraft = () => {
      const unlayer = emailEditorRef.current?.editor;
      unlayer?.exportHtml(async (data) => {
        const {design} = data;
        await saveEmail({
          title: subjectTitle,
          content: JSON.stringify(design),
          newsLetterOwnerId: user?.id as string
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }).then((res: any) => {
          toast.success(res?.message);
          history.push('/dashboard/write')
        })
      })
    };

  return (
    <>
      { !loading && (
        <div className="w-full h-[90vh] relative">
          <EmailEditor minHeight={"80vh"} 
            ref={emailEditorRef} 
            onReady={onReady}
          />

          <div className="absolute bottom-0 flex items-center justify-end gap-4 right-0 w-full border-t p-3">
            <Button className="bg-transparent cursor-pointer flex items-center gap-1 text-black
              border border-[#00000048] text-lg rounded-lg"
              onPress={saveDraft}
            >
              <span className="opacity-[0.7]">Save Draft</span>
            </Button>
            <Button className="bg-[#000] text-white cursor-pointer flex items-center gap-1 border text-lg rounded-lg"
              onPress={exportHtml}
            >
              <span>Send</span>
            </Button>
          </div>
        </div>
      )
      }
    </>
  )
}

export default Emaileditor