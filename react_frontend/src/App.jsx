import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Registration from './pages/registration';
import Navbar from './components/navbar';
import Inicio from './pages/home';
import TaskPage from './pages/taskPage';
import ToDoList from './pages/todolist';
import ParticlesBackground from './particles/particles_background';

function App() {
  const [loginFormVisible, setLoginFormVisible] = useState(false);

  const isAuthenticated = () => {
    const authToken = localStorage.getItem('jwtToken');
    return authToken !== null;
  };

  return (
    <div className="App">
      <Router>
        <Navbar loginFormVisible={loginFormVisible} setLoginFormVisible={setLoginFormVisible}/>
        <ParticlesBackground />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/todolist" element={ isAuthenticated() ? <ToDoList /> : <Navigate to="/registration" /> }/>
          <Route path="/edition" element={<TaskPage />} />
          <Route path="/edition/:id" element={<TaskPage />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
