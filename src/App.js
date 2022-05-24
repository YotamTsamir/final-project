import React from 'react';
import { HashRouter as Router, Route, Routes, NavLink } from 'react-router-dom'
import { Home } from './pages/home';
import { BoardList } from './pages/board-list.jsx';
import { Board } from './pages/board-details';
import { Login } from './pages/login.jsx';
import { SignUp } from './pages/signup.jsx';
import { AppHeader } from './cmps/app-header.jsx';
import './styles/main.scss';

function App() {
  return (
    <Router>
      <header>
      <AppHeader/>
      </header>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/boards'element={<BoardList />}/>
        <Route path='/b/:boardId'element={<Board />}  />
        <Route path='/b/:boardId/card/:cardId'  />{/*cmps*/}
        <Route path='/login'element={<Login />}/>
        <Route path='/signup' element={<SignUp />}/>
      </Routes>
    </Router>
  );
}

export default App;
