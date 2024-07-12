// src/contexts/ProprietariosContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

const ProprietariosContext = createContext();

export const useProprietarios = () => {
  return useContext(ProprietariosContext);
};

export const ProprietariosProvider = ({ children }) => {
  const [proprietarios, setProprietarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProprietarios = async () => {
      try {
        const response = await fetch('http://localhost:8000/proprietario/');
        if (!response.ok) {
          throw new Error('Erro ao buscar dados');
        }
        const data = await response.json();

        // Transformando os dados da API para o formato esperado pelo estado
        const formattedData = data.map(proprietario => ({
          nome: proprietario.nome,
          cpf: proprietario.CPF,
          categoria: proprietario.categoria_CNH,
          vencimento: new Date(proprietario.vencimento_CNH).toLocaleDateString('pt-BR'),
          veiculos: proprietario.veiculos.map(veiculo => `${veiculo.marca} ${veiculo.modelo} (${veiculo.ano})`),
          multas: [], // Inicialmente sem multas, já que a estrutura fornecida não inclui multas
        }));

        setProprietarios(formattedData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProprietarios();
  }, []);

  const addMulta = (index, novaMulta) => {
    const updatedProprietarios = [...proprietarios];
    updatedProprietarios[index].multas.push(novaMulta);
    setProprietarios(updatedProprietarios);
  };

  return (
    <ProprietariosContext.Provider value={{ proprietarios, addMulta, loading, error }}>
      {children}
    </ProprietariosContext.Provider>
  );
};
