import express from 'express';
import dotenv from 'dotenv';
import contantRoute from './routes/contactRoute.js';
import { errorHandler } from './middleware/errorHandler.js';
import connectDB from './config/db.js';
import userRouter from './routes/userRoute.js';


dotenv.config();

const app = express();
app.use(express.json())

const port = process.env.PORT || 5000
connectDB()
app.use('/api/contact',contantRoute)
app.use('/api/user',userRouter)
// app.get('/api/contact/get-all',(req,res)=>{
//     res.send('hello')
// })
app.use(errorHandler)

app.listen(port,()=>{
    console.log(`Server running on port: ${port}`);
})
