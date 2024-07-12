import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import SegundaTela from './components/SegundaTela';
import CriarProprietario from './components/CriarProprietario';
import CriarVeiculo from './components/CriarVeiculo';
import EditarVeiculo from './components/EditarVeiculo';
import EditarMotorista from './components/EditarMotorista';
import Multas from './components/Multas';
import CriarMulta from './components/CriarMulta';
import { ProprietariosProvider } from './contexts/ProprietariosContext';
import { MultasCPFProvider } from './contexts/multaCPF'; 
import { VeiculosCPFProvider } from './contexts/veiculosCPF'; // Corrigido o import

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
      <ProprietariosProvider>
        <AppWrapper>
          <Header>
            <Title>Bem vindo ao detran</Title>
          </Header>

          <VeiculosCPFProvider> {/* Corrigido o componente de contexto VeiculosCPFProvider */}
            <MultasCPFProvider> {/* Fornecendo o contexto MultasCPFProvider corretamente */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/segunda-tela/:cpf" element={<SegundaTela />} />
                <Route path="/criar-proprietario" element={<CriarProprietario />} />
                <Route path="/criar-veiculo" element={<CriarVeiculo />} />
                <Route path="/editar-veiculo/:veiculoId" element={<EditarVeiculo />} />
                <Route path="/editar-proprietario/:cpf" element={<EditarMotorista />} />
                <Route path="/multa/:cpf" element={<Multas />} />
                <Route path="/criar-multa/:index" element={<CriarMulta />} />
              </Routes>
            </MultasCPFProvider>
          </VeiculosCPFProvider>
        </AppWrapper>
      </ProprietariosProvider>
    </Router>
  );
}

export default App;
