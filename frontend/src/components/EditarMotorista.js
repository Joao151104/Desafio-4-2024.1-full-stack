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

function EditarMotorista() {
  const navigate = useNavigate();
  const { cpf } = useParams(); // Obtém o CPF da URL usando useParams
  const [motorista, setMotorista] = useState({
    nome: '',
    cpf: '',
    categoria: '',
    vencimento: '',
  });

  useEffect(() => {
    // Função assíncrona para buscar dados do proprietário pelo CPF
    const fetchProprietario = async () => {
      try {
        const response = await fetch(`http://localhost:8000/proprietario/${cpf}`);
        if (response.ok) {
          const data = await response.json();
          // Atualiza o estado do motorista com os dados obtidos
          setMotorista({
            nome: data.nome,
            cpf: data.cpf,
            categoria: data.categoria,
            vencimento: data.vencimento,
          });
        } else {
          console.error('Erro ao buscar proprietário:', response.statusText);
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    };

    fetchProprietario();
  }, [cpf]); // Executa sempre que o CPF mudar na URL

  const handleCloseClick = () => {
    navigate('/');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:8000/proprietario/${cpf}`, {
        method: 'PUT', // Método PUT para atualizar o proprietário
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(motorista), // Envia os dados atualizados do motorista
      });

      if (response.ok) {
        console.log('Proprietário atualizado com sucesso');
        navigate('/');
      } else {
        console.error('Erro ao atualizar proprietário:', response.statusText);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
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
            value={motorista.nome}
            onChange={(e) => setMotorista({ ...motorista, nome: e.target.value })}
            required
          />
        </Label>
        <Label>
          CPF:
          <Input
            type="text"
            name="cpf"
            value={motorista.cpf}
            onChange={(e) => setMotorista({ ...motorista, cpf: e.target.value })}
            required
            disabled // CPF não deve ser editável
          />
        </Label>
        <Label>
          Categoria CNH:
          <Input
            type="text"
            name="categoria"
            value={motorista.categoria}
            onChange={(e) => setMotorista({ ...motorista, categoria: e.target.value })}
            required
          />
        </Label>
        <Label>
          Vencimento CNH:
          <Input
            type="date"
            name="vencimento"
            value={motorista.vencimento}
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
