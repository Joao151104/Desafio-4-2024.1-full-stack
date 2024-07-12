// CriarVeiculo.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

function CriarVeiculo() {
  const navigate = useNavigate();
  const [cpfProprietario, setCpfProprietario] = useState('');
  const [placa, setPlaca] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [cor, setCor] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCloseClick = () => {
    navigate('/');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const novoVeiculo = {
      placa,
      marca,
      modelo,
      ano: Number(ano),
      cor,
      motorista_CPF: cpfProprietario // Certifique-se de que está sendo enviado corretamente
    };

    try {
      const response = await fetch('http://localhost:8000/veiculo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoVeiculo),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao criar veículo');
      }

      console.log('Veículo criado com sucesso');
      navigate(`/segunda-tela/${cpfProprietario}`);
    } catch (error) {
      setErrorMessage('Erro ao criar veículo: ' + error.message);
      console.error('Erro ao criar veículo:', error);
    }
  };

  return (
    <FormWrapper>
      <Header>
        <Title>Criar Veículo</Title>
        <CloseButton onClick={handleCloseClick}>✖</CloseButton>
      </Header>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <Form onSubmit={handleSubmit}>
        <Label>
          Placa:
          <Input type="text" value={placa} onChange={(e) => setPlaca(e.target.value)} required />
        </Label>
        <Label>
          Marca:
          <Input type="text" value={marca} onChange={(e) => setMarca(e.target.value)} required />
        </Label>
        <Label>
          Modelo:
          <Input type="text" value={modelo} onChange={(e) => setModelo(e.target.value)} required />
        </Label>
        <Label>
          Ano:
          <Input type="number" value={ano} onChange={(e) => setAno(e.target.value)} required />
        </Label>
        <Label>
          Cor:
          <Input type="text" value={cor} onChange={(e) => setCor(e.target.value)} required />
        </Label>
        <Label>
          CPF do Proprietário:
          <Input type="number" value={cpfProprietario} onChange={(e) => setCpfProprietario(e.target.value)} required />
        </Label>
        <SubmitButton type="submit">Criar</SubmitButton>
      </Form>
    </FormWrapper>
  );
}

export default CriarVeiculo;
