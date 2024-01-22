import './App.css';
import Navigation from './components/Navigation';
import Signup from './components/Signup';
import Login from './components/Login';
import Posts from './components/Posts';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
    <Navigation/>
    <Routes>
    <Route path="/signup" element={<Signup />} />
    <Route path='/login' element={<Login/>}/>
    <Route path='/home' element={<Home/>}/>

    </Routes>
    {/* <Posts/> */}
       
    </div>
  );
}

export default App;
