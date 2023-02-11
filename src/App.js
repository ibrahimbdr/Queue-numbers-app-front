import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Waiting from './pages/Waiting';
import Print from './pages/Print';
import Register from './pages/Register';
import Print2 from './pages/Print2';


function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/login-register' exact element={<Login />} />
        <Route path='/register' exact element={<Register />} />
        <Route path='/waiting' exact element={<Waiting />} />
        <Route path='/print' element={<Print />} />
        <Route path='/print2' element={<Print2 />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
