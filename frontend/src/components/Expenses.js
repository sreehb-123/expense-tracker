import axios from 'axios';
import { useState,useEffect } from 'react';

const Expenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await axios.get('https://expense-tracker-backend-ix6c.onrender.com/api/expenses');
                console.log(response.data);
                setExpenses(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching expenses: ',error);
                setLoading(false);
            }
        };
        
        fetchExpenses();
    }, []);

    const addExpense = async (e) => {
        e.preventDefault();

        if(!description || !amount || amount<=0){
            alert('Please enter a valid description and amount.');
            return;
        }

        try {
            const response = await axios.post('https://expense-tracker-backend-ix6c.onrender.com/api/expenses',{description,amount});
            setExpenses([...expenses,response.data]);
            setDescription('');
            setAmount('');
        } catch (error) {
            console.error('Error adding expense: ',error);
        }
    }

    const deleteExpense = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this expense?');
        if(!confirmDelete) return;

        const expenseItem = document.querySelector(`li[data-id="${id}"]`);
        
        if(expenseItem){
            expenseItem.classList.add('deleting');

            setTimeout(async () => {   
                try {
                    await axios.delete(`https://expense-tracker-backend-ix6c.onrender.com/api/expenses/${id}`);
                    setExpenses(expenses.filter(exp => exp._id !== id));
                } catch (error) {
                    console.error('Error deleting expense: ',error);
                }
            }, 300);
        }
        else{
            console.error('Error finding the expense');
        }
    }

    return(
        <div>
            <h1>Expense Tracker</h1>
            <form onSubmit={addExpense}>
                <input
                    type='text'
                    placeholder='Description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type='number'
                    placeholder='Amount'
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <button type='submit'>Add Expense</button>
            </form>

            {loading ? (
                <p>Loading expenses...</p>
            ) : (
                <ul>
                    {expenses.map(expense => (
                        <li key={expense._id} data-id={expense._id}>
                            {expense.description} - ₹{expense.amount}
                            <br />
                            <small>{new Date(expense.date).toLocaleDateString()}</small>
                            <button onClick={() => deleteExpense(expense._id)}>Delete Expense</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
};

export default Expenses;