// src/components/CriarProprietario.js
import React from 'react';
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

  const handleCloseClick = () => {
    navigate('/');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para enviar o formulário
    navigate('/');
  };

  return (
    <FormWrapper>
      <Header>
        <Title>Proprietário</Title>
        <CloseButton onClick={handleCloseClick}>✖</CloseButton>
      </Header>
      <Form onSubmit={handleSubmit}>
        <Label>
          Nome:
          <Input type="text" name="nome" required />
        </Label>
        <Label>
          CPF:
          <Input type="text" name="cpf" required />
        </Label>
        <Label>
          Categoria CNH:
          <Input type="text" name="categoria" required />
        </Label>
        <Label>
          Vencimento CNH:
          <Input type="date" name="vencimento" required />
        </Label>
        <SubmitButton type="submit">Criar</SubmitButton>
      </Form>
    </FormWrapper>
  );
}

export default CriarProprietario;
