import {Message} from "@/models/User";

export interface ApiResponse {
    success: boolean;
    message: string;
    response?:object;
    isAcceptingMessage?:boolean;
    messages?:Array<Message>;
}