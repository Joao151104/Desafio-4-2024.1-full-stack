// src/components/EditarVeiculo.js
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

const veiculos = [
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

function EditarVeiculo() {
  const navigate = useNavigate();
  const { veiculoId } = useParams();
  const [veiculo, setVeiculo] = useState({});

  useEffect(() => {
    const veiculoToEdit = veiculos.find((v, index) => index === parseInt(veiculoId));
    setVeiculo(veiculoToEdit);
  }, [veiculoId]);

  const handleCloseClick = () => {
    navigate('/segunda-tela');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para enviar o formulário atualizado
    navigate('/segunda-tela');
  };

  return (
    <FormWrapper>
      <Header>
        <Title>Editar Veículo</Title>
        <CloseButton onClick={handleCloseClick}>✖</CloseButton>
      </Header>
      <Form onSubmit={handleSubmit}>
        <Label>
          Placa:
          <Input
            type="text"
            name="placa"
            value={veiculo?.placa || ''}
            onChange={(e) => setVeiculo({ ...veiculo, placa: e.target.value })}
            required
          />
        </Label>
        <Label>
          Marca:
          <Input
            type="text"
            name="marca"
            value={veiculo?.marca || ''}
            onChange={(e) => setVeiculo({ ...veiculo, marca: e.target.value })}
            required
          />
        </Label>
        <Label>
          Modelo:
          <Input
            type="text"
            name="modelo"
            value={veiculo?.modelo || ''}
            onChange={(e) => setVeiculo({ ...veiculo, modelo: e.target.value })}
            required
          />
        </Label>
        <Label>
          Ano:
          <Input
            type="number"
            name="ano"
            value={veiculo?.ano || ''}
            onChange={(e) => setVeiculo({ ...veiculo, ano: e.target.value })}
            required
          />
        </Label>
        <Label>
          Cor:
          <Input
            type="text"
            name="cor"
            value={veiculo?.cor || ''}
            onChange={(e) => setVeiculo({ ...veiculo, cor: e.target.value })}
            required
          />
        </Label>
        <SubmitButton type="submit">Salvar</SubmitButton>
      </Form>
    </FormWrapper>
  );
}

export default EditarVeiculo;
