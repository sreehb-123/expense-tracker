import './App.css';
import Expenses from './components/Expenses';
import Login from './components/Login';
import Home from './components/Home';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home /> } />
        <Route path='/login' element={<Login />} />
        <Route path='/expenses' element={<Expenses />} />
      </Routes>
    </Router>
  );
}

export default App;