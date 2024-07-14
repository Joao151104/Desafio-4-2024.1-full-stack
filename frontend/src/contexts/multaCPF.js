// src/contexts/multaCPF.js

import React, { createContext, useState, useEffect, useContext } from 'react';

const MultasCPFContext = createContext();

export const useMultasCPF = () => {
  return useContext(MultasCPFContext);
};

export const MultasCPFProvider = ({ children }) => {
  const [multas, setMultas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMultasByCPF = async (cpf) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:8000/multa/por-cpf/${cpf}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar multas');
      }
      const data = await response.json();
      setMultas(data); // Atualiza o estado de multas com os dados recebidos
    } catch (error) {
      setError(error.message); // Captura e trata erros de rede ou de parsing de JSON
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Exemplo de inicialização que pode ser adicionada aqui, se necessário
    // fetchMultasByCPF('12345678900'); // Exemplo de inicialização com CPF fixo
  }, []); // Certifique-se de adicionar todas as dependências necessárias aqui

  return (
    <MultasCPFContext.Provider value={{ multas, fetchMultasByCPF, loading, error }}>
      {children}
    </MultasCPFContext.Provider>
  );
};
