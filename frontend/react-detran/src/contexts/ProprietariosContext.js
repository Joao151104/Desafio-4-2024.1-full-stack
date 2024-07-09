// src/contexts/ProprietariosContext.js
import React, { createContext, useState, useContext } from 'react';

const ProprietariosContext = createContext();

export const useProprietarios = () => {
  return useContext(ProprietariosContext);
};

export const ProprietariosProvider = ({ children }) => {
  const [proprietarios, setProprietarios] = useState([
    {
      nome: 'aristeu motorista',
      cpf: '99999999999999',
      categoria: 'B',
      vencimento: '30/12/2028',
      veiculos: '🚗',
      multas: [
        {
          valor: 'R$ 200,00',
          data: '29/10/2020',
          pontos: 8,
          tipo: 'excesso de velocidade',
          placa: '33444',
        },
      ],
    },
    {
      nome: 'aristeu motociclista',
      cpf: '99999999999999',
      categoria: 'A',
      vencimento: '30/12/2028',
      veiculos: '🏍️',
      multas: [
        {
          valor: 'R$ 150,00',
          data: '15/05/2021',
          pontos: 5,
          tipo: 'estacionamento proibido',
          placa: '55555',
        },
      ],
    },
    {
      nome: 'dona aristeia',
      cpf: '99999999999999',
      categoria: 'B',
      vencimento: '30/12/2028',
      veiculos: '🚗',
      multas: [],
    },
    {
      nome: 'sr aristeu',
      cpf: '99999999999999',
      categoria: 'B',
      vencimento: '30/12/2028',
      veiculos: '🚗',
      multas: [],
    },
  ]);

  const addMulta = (index, novaMulta) => {
    const updatedProprietarios = [...proprietarios];
    updatedProprietarios[index].multas.push(novaMulta);
    setProprietarios(updatedProprietarios);
  };

  return (
    <ProprietariosContext.Provider value={{ proprietarios, addMulta }}>
      {children}
    </ProprietariosContext.Provider>
  );
};
