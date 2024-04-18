import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/verify";
import { ApiResponse } from "@/types/ApiRespoense";

export default async function sendMail(
    username:string, 
    email : string , 
    otp : string
): Promise<ApiResponse> {
    try {

        const mailRes =  await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Mistry Message Verification Code',
            react: VerificationEmail({username,otp}),
          });


        return {
            success: true,
            message: 'mail send successfully',
            response:mailRes
        }
    } catch (error) {
        console.log('Error while sending mail', error);
        return {
            success: false,
            message: 'failed to send mail'
        }
    }
}