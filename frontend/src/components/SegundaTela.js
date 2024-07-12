import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { useVeiculosCPF } from '../contexts/veiculosCPF'; // Importe correto para useVeiculosCPF

const SegundaTelaWrapper = styled.div`
  text-align: center;
  padding: 20px;
`;

const Header = styled.header`
  background-color: #f1f1f1;
  padding: 20px;
  border-radius: 8px;
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

function SegundaTela() {
  const { cpf } = useParams();
  const { veiculos, loading, error, fetchVeiculosByCPF } = useVeiculosCPF();
  const navigate = useNavigate(); // Hook para navegação

  useEffect(() => {
    fetchVeiculosByCPF(cpf);
  }, [cpf, fetchVeiculosByCPF]);

  const handleEditClick = (placa) => {
    navigate(`/editar-veiculo/${placa}`);
  };

  return (
    <SegundaTelaWrapper>
      <Header>
        <SubTitle>Veículos do Proprietário</SubTitle>
        
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
