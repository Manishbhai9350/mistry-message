import mongoose , {Schema,Document} from "mongoose";



export interface Message extends Document {
    content:string;
    createdAt:Date;
}

const MessageSchema : Schema<Message> = new Schema({ 
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode:string;
    verifyCodeExpire:Date;
    isVerified:boolean;
    isAdmin:boolean;
    messages:[Message]
}


const UserSchema : Schema<User> = new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    verifyCode:{
        type:String,
        required:true
    },
    verifyCodeExpire:{
        type:Date,
        required:true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    messages:[MessageSchema]
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model('User',UserSchema)
export default UserModel;
