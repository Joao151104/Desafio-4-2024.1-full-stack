// src/components/CriarMulta.js
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useProprietarios } from '../contexts/ProprietariosContext';

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

function CriarMulta() {
  const navigate = useNavigate();
  const { index } = useParams();
  const { proprietarios, addMulta } = useProprietarios();
  const [multa, setMulta] = useState({
    valor: '',
    data: '',
    pontos: '',
    tipo: '',
    placa: proprietarios[index].veiculos,
  });

  const handleCloseClick = () => {
    navigate(`/multas/${index}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addMulta(index, multa);
    navigate(`/multas/${index}`);
  };

  return (
    <FormWrapper>
      <Header>
        <Title>Criar Multa</Title>
        <CloseButton onClick={handleCloseClick}>✖</CloseButton>
      </Header>
      <Form onSubmit={handleSubmit}>
        <Label>
          Valor:
          <Input
            type="text"
            name="valor"
            value={multa.valor}
            onChange={(e) => setMulta({ ...multa, valor: e.target.value })}
            required
          />
        </Label>
        <Label>
          Data:
          <Input
            type="date"
            name="data"
            value={multa.data}
            onChange={(e) => setMulta({ ...multa, data: e.target.value })}
            required
          />
        </Label>
        <Label>
          Pontos:
          <Input
            type="number"
            name="pontos"
            value={multa.pontos}
            onChange={(e) => setMulta({ ...multa, pontos: e.target.value })}
            required
          />
        </Label>
        <Label>
          Tipo:
          <Input
            type="text"
            name="tipo"
            value={multa.tipo}
            onChange={(e) => setMulta({ ...multa, tipo: e.target.value })}
            required
          />
        </Label>
        <Label>
          Placa:
          <Input type="text" name="placa" value={multa.placa} readOnly />
        </Label>
        <SubmitButton type="submit">Criar</SubmitButton>
      </Form>
    </FormWrapper>
  );
}

export default CriarMulta;
