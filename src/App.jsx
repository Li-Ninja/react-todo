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
import AuthRoute from './components/AuthRoute';

function App() {
  const { useState } = React;
  const [nickname, setNickname] = useState('');

  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setNickname={setNickname} />} />
          <Route element={<AuthRoute />}>
            <Route path="/" element={<Home nickname={nickname} />} />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
