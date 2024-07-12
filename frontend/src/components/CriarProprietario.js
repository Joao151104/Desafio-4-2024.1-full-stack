// src/components/CriarProprietario.js

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

function CriarProprietario() {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [categoria, setCategoria] = useState('');
  const [vencimento, setVencimento] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCloseClick = () => {
    navigate('/');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formattedVencimento = formatDate(vencimento);
    const motorista = {
      nome,
      cpf,
      categoria,
      vencimento: formattedVencimento,
    };

    try {
      const response = await fetch('http://localhost:8000/proprietario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(motorista),
      });
    
      if (response.ok) {
        console.log('Proprietário criado com sucesso');
        navigate('/');
      } else {
        const errorData = await response.json();
        setErrorMessage('verifique os dados: ' + errorData.message);
        console.error('Erro ao criar proprietário:', errorData);
      }
    } catch (error) {
      setErrorMessage('Erro na requisição: ' + error.message);
      console.error('Erro na requisição:', error);
    }
    
    
  };

  return (
    <FormWrapper>
      <Header>
        <Title>Proprietário</Title>
        <CloseButton onClick={handleCloseClick}>✖</CloseButton>
      </Header>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <Form onSubmit={handleSubmit}>
        <Label>
          Nome:
          <Input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </Label>
        <Label>
          CPF:
          <Input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
        </Label>
        <Label>
          Categoria CNH:
          <Input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} required />
        </Label>
        <Label>
          Vencimento CNH:
          <Input type="date" value={vencimento} onChange={(e) => setVencimento(e.target.value)} required />
        </Label>
        <SubmitButton type="submit">Criar</SubmitButton>
      </Form>
    </FormWrapper>
  );
}

export default CriarProprietario;
