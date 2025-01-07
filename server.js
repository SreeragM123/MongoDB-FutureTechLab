// import express from 'express'
// import mongoose from 'mongoose'
// import dotenv from 'dotenv'

// dotenv.config()
// const app=express()

// app.use(express.json())

// const mongodb=async()=>{
//     try{
//         // const connect=await mongoose.connect('mongodb+srv://sreeragsuresh001:S0KdqSl03hiDi3MB@cluster0.ujh7z.mongodb.net/Mydb')
//         const connect=await mongoose.connect(`${process.env.MongoUrl}`)
//         console.log("Connecting to MongoDB")
//     }
//     catch{
//         console.log(error);
//     }
// }

// app.get("/",(req,res)=>{
//     res.send("HELLO");
// })

// mongodb();

// const dataSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     description:{
//         type: String,
//     }
// });


// const Item=mongoose.model("Item",dataSchema);


// app.post("/additem",async(req,res)=>{
//     try{
//         const{name,description}=req.body;
//         console.log(req.body);

//         if(!name){
//             return res.status(400).json({message:"Name is required"});
//         }

//         const newItem=new Item({name,description});
//         await newItem.save();
//         res.send.status(201).json({message:"Data added successfully",item:newItem})
//     }catch(error){
//         console.log(error);
//         res.status(500).json({ message: "Server Error" });
//     }
  
// })





// app.listen(()=>{
//     console.log(`server running on ${process.env.PORT}`);
// })



import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware to parse JSON request body
app.use(express.json());

const mongodb = async () => {
    try {
        // Use MongoDB connection string from environment variables
        const connect = await mongoose.connect(`${process.env.MongoUrl}`);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);  // Fixed error logging
    }
};

mongodb();

const dataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    }
});

const Item = mongoose.model("Item", dataSchema);

// POST route to add item
app.post("/additem", async (req, res) => {
    try {
        const { name, description } = req.body;
        console.log(req.body);

        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }

        const newItem = new Item({ name, description });
        await newItem.save();
        res.status(201).json({ message: "Data added successfully", item: newItem });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });  // Changed to 500 to reflect server errors
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
});
