// src/components/EditarMotorista.js
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
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
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

const motoristas = [
  {
    nome: 'aristeu motorista',
    cpf: '99999999999999',
    categoria: 'B',
    vencimento: '30/12/2028',
  },
  {
    nome: 'aristeu motociclista',
    cpf: '99999999999999',
    categoria: 'A',
    vencimento: '30/12/2028',
  },
  {
    nome: 'dona aristeia',
    cpf: '99999999999999',
    categoria: 'B',
    vencimento: '30/12/2028',
  },
  {
    nome: 'sr aristeu',
    cpf: '99999999999999',
    categoria: 'B',
    vencimento: '30/12/2028',
  },
];

function EditarMotorista() {
  const navigate = useNavigate();
  const { motoristaId } = useParams();
  const [motorista, setMotorista] = useState({});

  useEffect(() => {
    const motoristaToEdit = motoristas.find((m, index) => index === parseInt(motoristaId));
    setMotorista(motoristaToEdit);
  }, [motoristaId]);

  const handleCloseClick = () => {
    navigate('/');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para enviar o formulário atualizado
    navigate('/');
  };

  return (
    <FormWrapper>
      <Header>
        <Title>Editar Proprietário</Title>
        <CloseButton onClick={handleCloseClick}>✖</CloseButton>
      </Header>
      <Form onSubmit={handleSubmit}>
        <Label>
          Nome:
          <Input
            type="text"
            name="nome"
            value={motorista?.nome || ''}
            onChange={(e) => setMotorista({ ...motorista, nome: e.target.value })}
            required
          />
        </Label>
        <Label>
          CPF:
          <Input
            type="text"
            name="cpf"
            value={motorista?.cpf || ''}
            onChange={(e) => setMotorista({ ...motorista, cpf: e.target.value })}
            required
          />
        </Label>
        <Label>
          Categoria CNH:
          <Input
            type="text"
            name="categoria"
            value={motorista?.categoria || ''}
            onChange={(e) => setMotorista({ ...motorista, categoria: e.target.value })}
            required
          />
        </Label>
        <Label>
          Vencimento CNH:
          <Input
            type="date"
            name="vencimento"
            value={motorista?.vencimento || ''}
            onChange={(e) => setMotorista({ ...motorista, vencimento: e.target.value })}
            required
          />
        </Label>
        <SubmitButton type="submit">Salvar</SubmitButton>
      </Form>
    </FormWrapper>
  );
}

export default EditarMotorista;
