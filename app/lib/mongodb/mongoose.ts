import mongoose from "mongoose";
export const MONGO_URI = process.env.MONGO_URI
let initialized = false;

export const connect = async () => {
    mongoose.set("strictQuery",true);
    if (initialized) return;
    try {
        await mongoose.connect(MONGO_URI as string,{
            dbName: "blogManagement_db",
        });
        initialized = true;
    }
    catch(error){
        console.log("MongoDB connection error:", error);
    }
}