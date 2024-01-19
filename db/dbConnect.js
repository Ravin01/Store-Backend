import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()


const local = 'mongodb://localhost:27017/Store-app'

export const dbConnect = async()=>{
    try{
        const db = await mongoose.connect(local)
        if(db){
            console.log('DB Connected successfully')
        }
    }catch(e){
        console.log(e)
        process.exit(1)
    }
}