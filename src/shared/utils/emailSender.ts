"use server"

import * as AWS from "aws-sdk";
import * as nodemailer from "nodemailer";

interface Props {
    userEmail: string[];
    subject: string;
    content: string; 
}

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
     secretAccessKey: process.env.AWS_SECRET_KEY,
     region: "us-east-1"
});

AWS.config.getCredentials(function(error) {
    if(error) {
        console.log(error.stack)
    }
})


const ses = new AWS.SES({apiVersion: "2010-12-01"});

const adminMail = "vortechcorp@gmail.com";

const transporter = nodemailer.createTransport({
    SES: ses,
});

export const sendEmail = async ({ userEmail, subject, content}: Props) => {
    try{
        const response = await transporter.sendMail({
            from: adminMail,
            to: userEmail,
            subject: subject,
            html: content
        })

        return response;
    } catch (error) {
        console.log(error);
        throw error
    }
} 