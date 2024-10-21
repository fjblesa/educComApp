import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import SendMessagePage from './components/SendMessagePage';
import SendedPage from './components/SendedPage';
import ReceivedPage from './components/ReceivedPage';
import Profile from './components/Profile';
import Login from './components/Login';

import './styles.css';

const App: React.FC = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/send" element={<SendMessagePage />} />
      <Route path="/sended" element={<SendedPage />} />
      <Route path="/received" element={<ReceivedPage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    <Footer/>
  </Router>
);

export default App;
