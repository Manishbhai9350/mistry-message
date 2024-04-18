import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?:number;
}
var connected : ConnectionObject  = {}

export default async function connect() : Promise<void> {
   if (connected.isConnected) {
     console.log('db already connected')
   }
    try {
        const dbUri = process.env.DB_URI
        const db = await mongoose.connect(dbUri || '')
        connected.isConnected = db.connections[0].readyState
        console.log('db connected')

    } catch (error) {
        console.log('faild to connect with database')
        process.exit(1)
    }
}