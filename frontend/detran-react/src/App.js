import React from 'react';
import styled from 'styled-components';

const AppWrapper = styled.div`
  text-align: center;
  padding: 20px;
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

const EditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5em;
`;

const proprietarios = [
  {
    nome: 'aristeu motorista',
    cpf: '99999999999999',
    categoria: 'B',
    vencimento: '30/12/2028',
    veiculos: '🚗',
    multas: '📖',
  },
  {
    nome: 'aristeu motociclista',
    cpf: '99999999999999',
    categoria: 'A',
    vencimento: '30/12/2028',
    veiculos: '🏍️',
    multas: '📖',
  },
  {
    nome: 'dona aristeia',
    cpf: '99999999999999',
    categoria: 'B',
    vencimento: '30/12/2028',
    veiculos: '🚗',
    multas: '📖',
  },
  {
    nome: 'sr aristeu',
    cpf: '99999999999999',
    categoria: 'B',
    vencimento: '30/12/2028',
    veiculos: '🚗',
    multas: '📖',
  },
];

function App() {
  return (
    <AppWrapper>
      <Header>
        <Title>Bem vindo ao detran</Title>
        <SubTitle>Proprietários</SubTitle>
        <Button>Criar</Button>
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
                <Td>{proprietario.veiculos}</Td>
                <Td>{proprietario.multas}</Td>
                <Td>
                  <EditButton>✏️</EditButton>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Header>
    </AppWrapper>
  );
}

export default App;
