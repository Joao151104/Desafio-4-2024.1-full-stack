import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { useVeiculosCPF } from '../contexts/veiculosCPF';

const SegundaTelaWrapper = styled.div`
  text-align: center;
  padding: 20px;
`;

const Header = styled.header`
  background-color: #f1f1f1;
  padding: 20px;
  border-radius: 8px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
`;

const SubTitle = styled.h2`
  font-size: 1.5em;
  margin-bottom: 20px;
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

const CreateButton = styled.button`
  background-color: #6c63ff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  margin-bottom: 10px;
  margin-left: 50px;
`;

function SegundaTela() {
  const { cpf } = useParams();
  const { veiculos, loading, error, fetchVeiculosByCPF } = useVeiculosCPF();
  const navigate = useNavigate();

  useEffect(() => {
    fetchVeiculosByCPF(cpf);
  }, [cpf, fetchVeiculosByCPF]);

  const handleEditClick = (placa) => {
    // Armazena o CPF no localStorage antes de navegar para a página de edição
    localStorage.setItem('cpf', cpf);
    navigate(`/editar-veiculo/${placa}`);
  };

  const handleCreateClick = () => {
    navigate('/criar-veiculo');
  };

  const handleCloseClick = () => {
    navigate('/');
  };

  return (
    <SegundaTelaWrapper>
      <Header>
        <SubTitle>Veículos do Proprietário</SubTitle>
        <CreateButton onClick={handleCloseClick}>Voltar</CreateButton>
        <CreateButton onClick={handleCreateClick}>Criar Novo Veículo</CreateButton>
        <Table>
          <thead>
            <tr>
              <Th>Marca</Th>
              <Th>Modelo</Th>
              <Th>Placa</Th>
              <Th>Ano</Th>
              <Th>Cor</Th>
              <Th>CPF</Th>
              <Th>Editar</Th>
            </tr>
          </thead>
          <tbody>
            {veiculos.map((veiculo) => (
              <tr key={veiculo.id}>
                <Td>{veiculo.marca}</Td>
                <Td>{veiculo.modelo}</Td>
                <Td>{veiculo.placa}</Td>
                <Td>{veiculo.ano}</Td>
                <Td>{veiculo.cor}</Td>
                <Td>{veiculo.motorista_CPF}</Td>
                <Td>
                  <IconButton onClick={() => handleEditClick(veiculo.placa)}>✏️</IconButton>
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
