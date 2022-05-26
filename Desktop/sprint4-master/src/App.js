import React from 'react';
import { HashRouter as Router, Route, Routes, NavLink } from 'react-router-dom'
import { Home } from './pages/home';
import './styles/main.scss';

function App() {
  return (
    <Router>
      <header>
      <NavLink className="nav-link" to="/">Home</NavLink>
      </header>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
