// src/components/SegundaTela.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SegundaTelaWrapper = styled.div`
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

const Table = styled.table`
  width: 90%;
  margin: 0 auto;
  border-collapse: collapse;
  border: 1px solid #ddd;

  @media (max-width: 768px) {
    width: 100%;
    display: block;
    overflow-x: auto;
  }
`;

const Th = styled.th`
  padding: 12px;
  background-color: #007bff; /* Cor de fundo azul */
  color: white;
  border: 1px solid #ddd;
`;

const Td = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
`;

const Button = styled.button`
  background-color: #6c63ff;
  border: none;
  color: white;
  padding: 10px 20px;
  font-size: 1em;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px;

  &:hover {
    background-color: #5548c8;
  }
`;

const BackButton = styled(Button)`
  background-color: #6c63ff;
  &:hover {
    background-color: #5548c8;
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5em;
`;

const vehicles = [
  {
    placa: '33444',
    marca: 'Fiat',
    modelo: 'Palio',
    ano: 2010,
    cor: 'Branco',
    multas: '📖',
  },
  {
    placa: '55555',
    marca: 'Fiat',
    modelo: 'Uno',
    ano: 2010,
    cor: 'Preto',
    multas: '📖',
  },
];

function SegundaTela() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  const handleCreateClick = () => {
    navigate('/criar-veiculo');
  };

  const handleEditClick = (index) => {
    navigate(`/editar-veiculo/${index}`);
  };

  const handleMultaClick = (placa) => {
    navigate(`/multas/${placa}`);
  };

  return (
    <SegundaTelaWrapper>
      <Header>
        <Title>Veículos do [Proprietario]</Title>
        <BackButton onClick={handleBackClick}>Voltar</BackButton>
        <Button onClick={handleCreateClick}>Criar</Button>
        <Table>
          <thead>
            <tr>
              <Th>Placa</Th>
              <Th>Marca</Th>
              <Th>Modelo</Th>
              <Th>Ano</Th>
              <Th>Cor</Th>
              <Th>Multas</Th>
              <Th>Editar</Th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle, index) => (
              <tr key={index}>
                <Td>{vehicle.placa}</Td>
                <Td>{vehicle.marca}</Td>
                <Td>{vehicle.modelo}</Td>
                <Td>{vehicle.ano}</Td>
                <Td>{vehicle.cor}</Td>
                <Td>
                  <IconButton onClick={() => handleMultaClick(vehicle.placa)}>{vehicle.multas}</IconButton>
                </Td>
                <Td>
                  <IconButton onClick={() => handleEditClick(index)}>✏️</IconButton>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Header>
    </SegundaTelaWrapper>
  );
}

export default SegundaTela;
