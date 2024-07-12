import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useMultasCPF } from '../contexts/multaCPF';
import { format } from 'date-fns'; // Importar a função format do date-fns

const MultasWrapper = styled.div`
  text-align: center;
  padding: 20px;
`;

const Header = styled.header`
  background-color: #fff;
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

// Função para formatar a data no formato desejado
const formatDate = (date) => {
  return format(new Date(date), 'dd/MM/yyyy');
};

function Multas() {
  const { cpf } = useParams();
  const { multas, loading, error, fetchMultasByCPF } = useMultasCPF();

  useEffect(() => {
    fetchMultasByCPF(cpf);
  }, [cpf, fetchMultasByCPF]);

  return (
    <MultasWrapper>
      <Header>
        <SubTitle>Multas do Proprietário</SubTitle>
       

        <Table>
          <thead>
            <tr>
              <Th>Valor</Th>
              <Th>Data</Th>
              <Th>Pontos</Th>
              <Th>Tipo</Th>
              <Th>Placa do Veículo</Th>
            </tr>
          </thead>
          <tbody>
            {multas.map((multa) => (
              <tr key={multa.id}>
                <Td>{multa.valor}</Td>
                <Td>{formatDate(multa.data)}</Td> {/* Utiliza a função formatDate para exibir a data formatada */}
                <Td>{multa.pontos_penalidade}</Td>
                <Td>{multa.tipo_infracao}</Td>
                <Td>{multa.veiculo_placa}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Header>
    </MultasWrapper>
  );
}

export default Multas;
