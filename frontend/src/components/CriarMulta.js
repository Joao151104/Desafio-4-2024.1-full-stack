import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const FormWrapper = styled.div`
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

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
`;

const Form = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  margin: 10px 0;
  font-size: 1em;
  display: flex;
  justify-content: space-between;
  width: 300px;
`;

const Input = styled.input`
  padding: 10px;
  width: 150px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-left: 10px;
`;

const Select = styled.select`
  padding: 10px;
  width: 180px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-left: 10px;
`;

const SubmitButton = styled.button`
  background-color: #6c63ff;
  border: none;
  color: white;
  padding: 10px 20px;
  font-size: 1em;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #5548c8;
  }
`;

const tipoInfracoes = [
  'Velocidade acima da máxima permitida',
  'Estacionar em local proibido',
  'Dirigir utilizando o celular',
  'Dirigir sob efeito de álcool',
  'Não utilizar cinto de segurança',
  'Avançar o sinal vermelho',
];

function CriarMulta() {
  const navigate = useNavigate();
  const { cpf } = useParams();
  
  const [multa, setMulta] = useState({
    valor: '',
    data: '',
    pontos: '',
    tipo: '',
    veiculoId: '',
    infratorCPF: '', // Inicializa como vazio e será atualizado depois
  });

  useEffect(() => {
    // Supondo que o CPF do infrator está armazenado no localStorage com a chave 'cpf'
    const cpfInfrator = localStorage.getItem('cpf');
    if (cpfInfrator) {
      setMulta((prevState) => ({
        ...prevState,
        infratorCPF: cpfInfrator,
      }));
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const multaPost = {
      valor: parseFloat(multa.valor),
      data: multa.data,
      pontos: parseInt(multa.pontos),
      tipo: multa.tipo,
      veiculoId: multa.veiculoId,
      infratorCPF: multa.infratorCPF,
    };

    try {
      const response = await fetch('http://localhost:8000/multa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(multaPost),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(`Erro ${response.status}: ${errorResponse.message}`);
      }

      const data = await response.json();
      navigate(`/multas/${cpf}`);
    } catch (error) {
      console.error('Erro ao criar a multa:', error.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMulta({ ...multa, [name]: value });
  };

  return (
    <FormWrapper>
      <Header>
        <Title>Criar Multa</Title>
        <CloseButton>X</CloseButton>
      </Header>
      <Form onSubmit={handleSubmit}>
        <Label>
          Valor:
          <Input
            type="number"
            name="valor"
            value={multa.valor}
            onChange={handleChange}
            required
          />
        </Label>
        <Label>
          Data:
          <Input
            type="date"
            name="data"
            value={multa.data}
            onChange={handleChange}
            required
          />
        </Label>
        <Label>
          Pontos:
          <Input
            type="number"
            name="pontos"
            value={multa.pontos}
            onChange={handleChange}
            required
          />
        </Label>
        <Label>
          Tipo:
          <Select
            name="tipo"
            value={multa.tipo}
            onChange={handleChange}
            required
          >
            <option value="">Selecione o tipo</option>
            {tipoInfracoes.map((tipo, index) => (
              <option key={index} value={tipo}>
                {tipo}
              </option>
            ))}
          </Select>
        </Label>
        <Label>
          Veículo ID:
          <Input
            type="text"
            name="veiculoId"
            value={multa.veiculoId}
            onChange={handleChange}
            required
          />
        </Label>
        <SubmitButton type="submit">Criar</SubmitButton>
      </Form>
    </FormWrapper>
  );
}

export default CriarMulta;
