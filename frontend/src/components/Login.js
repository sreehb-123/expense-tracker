import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [isLogin,setIsLogin] = useState(true);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        const endpoint = isLogin ? '/api/login' : '/api/register';

        try {
                const response = await axios.get(`https://expense-tracker-backend-ix6c.onrender.com${endpoint}`,{
                    email,
                    password,
                });

                localStorage.setItem('token',response.data.token);
                navigate('/home');

        } catch (error) {
            setError('Login failed. Please check credentials.');
            console.error('Error logging in: ',error);
        }
    };

    return(
        <div>
            <h1>{isLogin ? 'Login' : 'Register'}</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
                <p>
                    {isLogin ? 'No account?' : 'Already have an account?'}
                    <button onClick={() => {
                        setIsLogin(!isLogin);
                    }}>
                        {isLogin ? 'Login' : 'Register'}
                    </button>
                </p>
                {error && <p>{error}</p>}
            </form>
        </div>
    )
}

export default Login;