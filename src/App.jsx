import React from 'react';
import './App.css';
import {
  HashRouter,
  Route,
  Routes
} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [nickname, setNickname] = React.useState('');

  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home nickname={nickname} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setNickname={setNickname} />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
