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

function EditarVeiculo() {
  const navigate = useNavigate();
  const { placa } = useParams(); // Acessa o parâmetro de rota 'placa'
  const [veiculo, setVeiculo] = useState({});
  const [cpf, setCpf] = useState(''); // Adiciona estado para o CPF

  useEffect(() => {
    const fetchVeiculo = async () => {
      try {
        if (!placa) {
          throw new Error('Placa não definida na rota');
        }
        const response = await fetch(`http://localhost:8000/veiculo/placa/${placa}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar veículo');
        }
        const data = await response.json();
        setVeiculo(data); // Atualiza o estado com os dados do veículo
        setCpf(data.motorista_CPF); // Atualiza o estado do CPF com os dados do veículo
      } catch (error) {
        console.error('Erro ao buscar veículo:', error);
      }
    };
  
    fetchVeiculo();
  }, [placa]);

  const handleCloseClick = () => {
    const cpfFromStorage = localStorage.getItem('cpf');
    localStorage.removeItem('cpf'); // Remove o CPF do localStorage
    navigate(`/segunda-tela/${cpfFromStorage}`);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/veiculo/placa/${placa}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(veiculo), // Envia os dados do veículo atualizados
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar veículo');
      }

      navigate(`/segunda-tela/${cpf}`); // Redireciona após o sucesso
    } catch (error) {
      console.error('Erro ao editar veículo:', error);
      // Tratamento de erro: exibir mensagem para o usuário, etc.
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVeiculo({ ...veiculo, [name]: value });
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
            value={veiculo.placa || ''}
            onChange={handleChange}
            required
          />
        </Label>
        <Label>
          Marca:
          <Input
            type="text"
            name="marca"
            value={veiculo.marca || ''}
            onChange={handleChange}
            required
          />
        </Label>
        <Label>
          Modelo:
          <Input
            type="text"
            name="modelo"
            value={veiculo.modelo || ''}
            onChange={handleChange}
            required
          />
        </Label>
        <Label>
          Ano:
          <Input
            type="number"
            name="ano"
            value={veiculo.ano || ''}
            onChange={handleChange}
            required
          />
        </Label>
        <Label>
          Cor:
          <Input
            type="text"
            name="cor"
            value={veiculo.cor || ''}
            onChange={handleChange}
            required
          />
        </Label>
        <SubmitButton type="submit">Salvar</SubmitButton>
      </Form>
    </FormWrapper>
  );
}

export default EditarVeiculo;
