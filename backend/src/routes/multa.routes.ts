// src/routes/multa.routes.ts

import { Router } from 'express';
import {
  listarMultas,
  criarMulta,
  encontrarMultaPorID,
  atualizarMulta,
  deletarMulta,
  listarMultasPorCPF,
} from '../business/multa.business';
import createHttpError from 'http-errors';
import { MultaCreateSchema, MultaUpdateSchema } from '../schemas/multa.schema';

const router = Router();

router.get('/', async (req, res) => {
  
    const multas = await listarMultas();
    return res.status(200).json(multas);
  
});

router.get('/:multaID', async (req, res, next) => {
  const multaID = parseInt(req.params.multaID);
  try {
    const multa = await encontrarMultaPorID(multaID);
    if (!multa) {
      throw new createHttpError.NotFound('Multa não encontrada');
    }
    return res.status(200).json(multa);
  } catch (error) {
    return next(error); // Tratar o erro adequadamente
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { valor, data, pontos, tipo, veiculoId, infratorCPF } = MultaCreateSchema.parse(req.body);
  
    const multa = await criarMulta({ valor, data, pontos, tipo, veiculoId, infratorCPF });
    return res.status(201).json(multa);
  } catch (error) {
    return next(error); // Tratar o erro adequadamente
  }
});

router.put('/:multaID', async (req, res, next) => {
  const multaID = parseInt(req.params.multaID);
  try {
    const { valor, data, pontos, tipo, veiculoId } = MultaUpdateSchema.parse(req.body);
  
    const multa = await atualizarMulta(multaID, { valor, data, pontos, tipo, veiculoId });
    if (!multa) {
      throw new createHttpError.NotFound('Multa não encontrada');
    }
    return res.status(200).json(multa);
  } catch (error) {
    return next(error); // Tratar o erro adequadamente
  }
});

router.delete('/:multaID', async (req, res, next) => {
  const multaID = parseInt(req.params.multaID);
  try {
    await deletarMulta(multaID);
    return res.status(204).json();
  } catch (error) {
    return next(error); // Tratar o erro adequadamente
  }
});

// Rota para listar multas por CPF do infrator
router.get('/cpf/:cpf', async (req, res, next) => {
  const cpf = req.params.cpf;
  try {
    const multas = await listarMultasPorCPF(cpf);
    return res.status(200).json(multas);
  } catch (error) {
    return next(error); // Tratar o erro adequadamente
  }
});

export default router;
