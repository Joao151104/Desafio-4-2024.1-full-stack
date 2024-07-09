// src/components/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useProprietarios } from '../contexts/ProprietariosContext';

const HomeWrapper = styled.div`
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

const SubTitle = styled.h2`
  font-size: 1.5em;
  margin-bottom: 20px;
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
  background-color: #6c63ff;
  color: white;
  border: 1px solid #ddd;
`;

const Td = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5em;
`;

function Home() {
  const navigate = useNavigate();
  const { proprietarios } = useProprietarios();

  const handleCreateClick = () => {
    navigate('/criar-proprietario');
  };

  const handleCarClick = () => {
    navigate('/segunda-tela');
  };

  const handleEditClick = (index) => {
    navigate(`/editar-motorista/${index}`);
  };

  const handleMultaClick = (index) => {
    navigate(`/multas/${index}`);
  };

  return (
    <HomeWrapper>
      <Header>
        <Title>Bem vindo ao detran</Title>
        <SubTitle>Proprietários</SubTitle>
        <Button onClick={handleCreateClick}>Criar</Button>
        <Table>
          <thead>
            <tr>
              <Th>Nome</Th>
              <Th>Cpf</Th>
              <Th>Categoria CNH</Th>
              <Th>Vencimento CNH</Th>
              <Th>Veículos</Th>
              <Th>Multas</Th>
              <Th>Editar Motorista</Th>
            </tr>
          </thead>
          <tbody>
            {proprietarios.map((proprietario, index) => (
              <tr key={index}>
                <Td>{proprietario.nome}</Td>
                <Td>{proprietario.cpf}</Td>
                <Td>{proprietario.categoria}</Td>
                <Td>{proprietario.vencimento}</Td>
                <Td>
                  <IconButton onClick={handleCarClick}>{proprietario.veiculos}</IconButton>
                </Td>
                <Td>
                  <IconButton onClick={() => handleMultaClick(index)}>
                    {proprietario.multas.length > 0 ? '📖' : '📄'}
                  </IconButton>
                </Td>
                <Td>
                  <IconButton onClick={() => handleEditClick(index)}>✏️</IconButton>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Header>
    </HomeWrapper>
  );
}

export default Home;
