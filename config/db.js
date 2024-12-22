import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        let connect = await mongoose.connect(process.env.DB_URL)
        console.log(`DB connected: ${connect.connection.host} : ${connect.connection.name}`);
    } catch (error) {
        console.log(`Db connection Error: ${error}`)
        process.exit(1)        
    }
}
export default connectDB;