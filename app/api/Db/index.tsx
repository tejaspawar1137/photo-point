import mongoose from "mongoose"; 

const connectToDB = async (): Promise<void> => { 
  try {
    await mongoose.connect("mongodb+srv://dheerajphotoone:Ci2XErPB3SYU5tIy@cluster0.h6zuvgu.mongodb.net/?retryWrites=true&w=majority");
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
export default connectToDB;