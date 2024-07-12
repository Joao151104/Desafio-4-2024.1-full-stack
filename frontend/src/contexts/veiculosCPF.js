import React, { createContext, useState, useEffect, useContext } from 'react';

const VeiculosCPFContext = createContext();

export const useVeiculosCPF = () => {
  return useContext(VeiculosCPFContext);
};

export const VeiculosCPFProvider = ({ children }) => {
  const [veiculos, setVeiculos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchVeiculosByCPF = async (cpf) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:8000/veiculo/cpf/${cpf}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar veículos');
      }
      const data = await response.json();
      setVeiculos(data); // Atualiza o estado de veiculos com os dados recebidos
    } catch (error) {
      setError(error.message); // Captura e trata erros de rede ou de parsing de JSON
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Exemplo de inicialização que pode ser adicionada aqui, se necessário
    // Por exemplo, fetch de dados iniciais, configurações, etc.
  }, []);

  return (
    <VeiculosCPFContext.Provider value={{ veiculos, fetchVeiculosByCPF, loading, error }}>
      {children}
    </VeiculosCPFContext.Provider>
  );
};
