import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import expenseRoutes from './routes/expenseRoutes.js';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log('Connected to MongoDB sucessfully');
}).catch((error)=>{
    console.log('Error in connecting to MongoDB', error.message);
});

app.use('/api', expenseRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"/frontend/build")));

    app.get("*", (req,res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    })
}

app.listen(PORT,()=>{
    console.log(`Server listening on ${PORT}`);
})