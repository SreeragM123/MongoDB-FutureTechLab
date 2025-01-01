import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const app=express()

const mongodb=async()=>{
    try{
        // const connect=await mongoose.connect('mongodb+srv://sreeragsuresh001:S0KdqSl03hiDi3MB@cluster0.ujh7z.mongodb.net/Mydb')
        const connect=await mongoose.connect(`${process.env.MongoUrl}`)
        console.log("Connecting to MongoDB")
        console.log("HELLO")
    }
    catch{
        console.log(error);
    }
}

app.get("/",(req,res)=>{
    res.send("HELLO");
})


mongodb()

app.listen(()=>{
    console.log(`server running on ${process.env.PORT}`);
})