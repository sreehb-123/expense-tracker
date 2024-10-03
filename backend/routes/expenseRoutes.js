import express, { response } from "express";
import Expense from "../models/Expense.js";

const router = express.Router();

router.get('/expenses',async(req,res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.post('/expenses',async(req,res) => {
    console.log('okay i get it u wanna add smth');
    
    const {description,amount} = req.body;
    
    if(!description || !amount){
        return res.status(400).json({message: "Description and amount are required"});
    }

    try {
        const newExpense = new Expense({ description,amount });
        const savedExpense = await newExpense.save();
        res.status(201).json(savedExpense);
        console.log('Expense added sucesfully');
    } catch (error) {
        res.status(500).json({message: error.message});
        console.log('server error');
    }
})

router.delete('/expenses/:id',async(req,res) => {
    try {
        const {id} = req.params;
        const deletedExpense = await Expense.findByIdAndDelete(id);
        if(!deletedExpense){
            return res.status(404).json({message: "expense not found"});
        }
        res.json({message: 'Expense deleted sucessfully'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

export default router;