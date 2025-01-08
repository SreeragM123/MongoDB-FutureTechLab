
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware to parse JSON request body
app.use(express.json());
app.use(cors());
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
        res.status(404).json({ message: "Server Error" });  // Changed to 500 to reflect server errors
    }
});

// GET all

app.get("/item",async(req,res)=>{
    try {
        const items =await Item.find()
        res.status(200).json(items)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server Error"})
    }
});

//GET one item

app.get("/item/:id",async(req,res)=>{
    try {
        const items=await Item.findById(req.params.id);
        if(!items){
            return res.status(404).json({message:"Item not found"});
        }
        res.status(200).json(items);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server Error"});
    }
});


// PUT method(update item)

app.put("/item/:id",async(req,res)=>{
    try {
        const{name,description}=req.body
        const updatedItem=await Item.findByIdAndUpdate(req.params.id,{name,description},{new:true,runValidators:true})
        if(!updatedItem){
            return res.status(404).json({message:"Item not found"})
        }
        res.status(200).json({message:"Item updated",item:updatedItem})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server Error"});
    }
})

//DELETE

app.delete("/item/:id",async(req,res)=>{
    try{
        const deletedItem=await Item.findByIdAndDelete(req.params.id)
        if(!deletedItem){
            return res.status(404).json({message:"Item not found"})
        }
        res.status(200).json({message:"Item deleted",item:deletedItem})
    } catch(error){
        console.log(error);
        res.status(500).json({message:"Server Error"});
    }
    
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
});
