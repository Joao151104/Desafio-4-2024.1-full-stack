import { Router } from 'express';
import { z } from 'zod';

import {
  listarMultas,
  criarMulta,
  encontrarMultaPorID,
  atualizarMulta,
  deletarMulta,
  listarMultasPorCPF, // Importar a nova função de negócio
} from '../business/multa.business';
import createHttpError from 'http-errors';
import { MultaCreateSchema, MultaUpdateSchema } from '../schemas/multa.schema';

const router = Router();

// Rota para listar todas as multas
router.get('/', async (req, res) => {
  const multas = await listarMultas();
  return res.status(200).json(multas);
});

// Rota para encontrar multa por ID
router.get('/:multaID', async (req, res) => {
  const multaID = parseInt(req.params.multaID);
  const multa = await encontrarMultaPorID(multaID);
  if (!multa) {
    throw new createHttpError.NotFound('Multa não encontrada');
  }
  return res.status(200).json(multa);
});

// Rota para criar uma nova multa
router.post('/', async (req, res, next) => {
  try {
    const parsedData = MultaCreateSchema.parse(req.body);
    const multa = await criarMulta(parsedData);
    return res.status(201).json(multa);
  } catch (error) {
    console.error('Erro na criação da multa:', error);

    // Adicionando tratamento para diferentes tipos de erro
    if (error instanceof createHttpError.HttpError) {
      return res.status(error.status).json({ message: error.message });
    } else if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors });
    } else {
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
});


// Rota para atualizar uma multa
router.put('/:multaID', async (req, res) => {
  const multaID = parseInt(req.params.multaID);
  const { valor, data, pontos, tipo, veiculoId, infratorCPF } = MultaUpdateSchema.parse(req.body);
  
  const multa = await atualizarMulta(multaID, { valor, data, pontos, tipo, veiculoId, infratorCPF });
  if (!multa) {
    throw new createHttpError.NotFound('Multa não encontrada');
  }
  return res.status(200).json(multa);
});

// Rota para deletar uma multa
router.delete('/:multaID', async (req, res) => {
  const multaID = parseInt(req.params.multaID);
  await deletarMulta(multaID);
  return res.status(204).json();
});

// Nova rota para listar multas por CPF do infrator
router.get('/por-cpf/:cpf', async (req, res) => {
  const { cpf } = req.params;
  const multas = await listarMultasPorCPF(cpf);
  return res.status(200).json(multas);
});

export default router;
