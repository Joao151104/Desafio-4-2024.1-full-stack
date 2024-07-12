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
  const { cpf } = useParams();
  const [veiculo, setVeiculo] = useState({
    placa: '',
    marca: '',
    modelo: '',
    ano: '',
    cor: '',
  });

  useEffect(() => {
    const fetchVeiculo = async () => {
      try {
        const response = await fetch(`http://localhost:8000/veiculo/${cpf}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar veículo');
        }
        const data = await response.json();
        setVeiculo(data);
      } catch (error) {
        console.error('Erro ao buscar veículo:', error);
      }
    };

    fetchVeiculo();
  }, [cpf]);

  const handleCloseClick = () => {
    navigate('/');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/veiculo/${cpf}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          marca: veiculo.marca,
          modelo: veiculo.modelo,
          ano: parseInt(veiculo.ano),
          cor: veiculo.cor,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar veículo');
      }

      navigate('/segunda-tela');
    } catch (error) {
      console.error('Erro ao editar veículo:', error);
      // Tratar erro (ex: exibir mensagem para usuário)
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
            value={veiculo.placa }
            onChange={handleChange}
            readOnly
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
