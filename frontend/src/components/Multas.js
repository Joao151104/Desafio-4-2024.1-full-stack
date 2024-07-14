import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { useMultasCPF } from '../contexts/multaCPF';
import { format } from 'date-fns';

const MultasWrapper = styled.div`
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

const CreateButton = styled.button`
  margin: 20px auto;
  padding: 10px 20px;
  background-color: #6c63ff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1em;
`;

const formatDate = (date) => {
  return format(new Date(date), 'dd/MM/yyyy');
};

function Multas() {
  const { cpf } = useParams();
  const navigate = useNavigate();
  const { multas, loading, error, fetchMultasByCPF } = useMultasCPF();

  useEffect(() => {
    fetchMultasByCPF(cpf);
    // Armazenar o CPF no localStorage para persistência
    localStorage.setItem('cpf', cpf);
  }, [cpf, fetchMultasByCPF]);

  const handleEditClick = (multaID) => {
    navigate(`/editar-multa/${multaID}`);
  };

  const handleCreateClick = () => {
    navigate(`/criar-multa/${cpf}`);
  };

  return (
    <MultasWrapper>
      <Header>
        <SubTitle>Multas do Proprietário</SubTitle>

        <CreateButton onClick={handleCreateClick}>Criar Multa</CreateButton>

        <Table>
          <thead>
            <tr>
              <Th>Valor</Th>
              <Th>Data</Th>
              <Th>Pontos</Th>
              <Th>Tipo</Th>
              <Th>Placa do Veículo</Th>
              <Th>Editar</Th>
            </tr>
          </thead>
          <tbody>
            {multas.map((multa) => (
              <tr key={multa.multaID}>
                <Td>{multa.valor}</Td>
                <Td>{formatDate(multa.data)}</Td>
                <Td>{multa.pontos_penalidade}</Td>
                <Td>{multa.tipo_infracao}</Td>
                <Td>{multa.veiculo_placa}</Td>
                <Td><IconButton onClick={() => handleEditClick(multa.multaID)}>✏️</IconButton></Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Header>
    </MultasWrapper>
  );
}

export default Multas;
