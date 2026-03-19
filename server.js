const express=require("express");
const app=express();
const cors=require("cors")
const {MongoClient}=require("mongodb")
require("dotenv").config();

app.use(cors());
app.use(express.json());

const dbUrl=process.env.DATABASEURL || "mongodb://localhost:27017";
const client=new MongoClient(dbUrl);

let db;

async function connectDB(){
    try{
        await client.connect();
        db=client.db("expensetracker");
        console.log("connected to the database")

    }
    catch(err){
        console.error("Database connection failed",err)
    }
}

app.get("/home",(req,res)=>{
    res.json({message:"Hello world"});
})

app.get("/expense",async(req,res)=>{
    try{
        const userData= await db.collection("expensetracker").find().toArray();
        console.log(userData);
        res.status(200).json(userData);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Failed to fetch data"});
    }


})


app.listen(3000,()=>{
    connectDB();
    console.log("server is running port on 3000");
})
















