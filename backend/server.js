import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import expenseRoutes from './routes/expenseRoutes.js';
import authMiddleware from './middleware/authMiddleware.js';
import authRoutes from './routes/Auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'https://expense-tracker-frontend-khe0.onrender.com',
    methods: ['GET','POST','DELETE'],
    credentials: true
}));
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
app.use('/api', authRoutes);

app.get('/api/protected', authMiddleware, (req,res) => {
    res.json({ message: 'This is a protected route' });
});

app.listen(PORT,()=>{
    console.log(`Server listening on ${PORT}`);
})