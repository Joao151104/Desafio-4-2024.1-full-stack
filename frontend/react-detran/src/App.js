// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import SegundaTela from './components/SegundaTela';
import styled from 'styled-components';

const AppWrapper = styled.div`
  text-align: center;
`;

const Header = styled.header`
  background-color: #f1f1f1;
  padding: 20px;
  border-radius: 8px;
`;

const Title = styled.h1`
  font-size: 2em;
`;

function App() {
  return (
    <Router>
      <AppWrapper>
        <Header>
          <Title>Bem vindo ao detran</Title>
        </Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/segunda-tela" element={<SegundaTela />} />
        </Routes>
      </AppWrapper>
    </Router>
  );
}

export default App;
