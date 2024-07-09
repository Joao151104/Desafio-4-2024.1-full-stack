// src/components/Multas.js
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useProprietarios } from '../contexts/ProprietariosContext';

const MultasWrapper = styled.div`
  text-align: center;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const Title = styled.h1`
  font-size: 1.5em;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
`;

const BackButton = styled.button`
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

const CreateButton = styled.button`
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

const Table = styled.table`
  width: 90%;
  margin: 20px auto;
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
  background-color: #ccc;
  border: 1px solid #ddd;
`;

const Td = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
`;

function Multas() {
  const navigate = useNavigate();
  const { index } = useParams();
  const { proprietarios } = useProprietarios();

  const handleBackClick = () => {
    navigate('/');
  };

  const handleCreateClick = () => {
    navigate(`/criar-multa/${index}`);
  };

  const multas = proprietarios[index].multas;

  return (
    <MultasWrapper>
      <Header>
        <Title>Multas do [Proprietario ou Veículo]</Title>
      </Header>
      <ButtonWrapper>
        <BackButton onClick={handleBackClick}>Voltar</BackButton>
        <CreateButton onClick={handleCreateClick}>Criar Multa</CreateButton>
      </ButtonWrapper>
      <Table>
        <thead>
          <tr>
            <Th>Valor</Th>
            <Th>Data</Th>
            <Th>Pontos</Th>
            <Th>Tipo</Th>
            <Th>Placa Carro</Th>
          </tr>
        </thead>
        <tbody>
          {multas.map((multa, index) => (
            <tr key={index}>
              <Td>{multa.valor}</Td>
              <Td>{multa.data}</Td>
              <Td>{multa.pontos}</Td>
              <Td>{multa.tipo}</Td>
              <Td>{multa.placa}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </MultasWrapper>
  );
}

export default Multas;
