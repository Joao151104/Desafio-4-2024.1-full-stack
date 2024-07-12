// src/routes/multa.routes.ts

import { Router } from 'express';
import {
  listarMultas,
  criarMulta,
  encontrarMultaPorID,
  atualizarMulta,
  deletarMulta,
} from '../business/multa.business';
import createHttpError from 'http-errors';
import { MultaCreateSchema, MultaUpdateSchema } from '../schemas/multa.schema';

const router = Router();

router.get('/', async (req, res) => {
  const multas = await listarMultas();
  return res.status(200).json(multas);
});

router.get('/:multaID', async (req, res) => {
  const multaID = parseInt(req.params.multaID);
  const multa = await encontrarMultaPorID(multaID);
  if (!multa) {
    throw new createHttpError.NotFound('Multa não encontrada');
  }
  return res.status(200).json(multa);
});

router.post('/', async (req, res) => {
  const { valor, data, pontos, tipo, veiculoId } = MultaCreateSchema.parse(req.body);
  
  const multa = await criarMulta({ valor, data, pontos, tipo, veiculoId });
  return res.status(201).json(multa);
});

router.put('/:multaID', async (req, res) => {
  const multaID = parseInt(req.params.multaID);
  const { valor, data, pontos, tipo, veiculoId } = MultaUpdateSchema.parse(req.body);
  
  const multa = await atualizarMulta(multaID, { valor, data, pontos, tipo, veiculoId });
  if (!multa) {
    throw new createHttpError.NotFound('Multa não encontrada');
  }
  return res.status(200).json(multa);
});

router.delete('/:multaID', async (req, res) => {
  const multaID = parseInt(req.params.multaID);
  await deletarMulta(multaID);
  return res.status(204).json();
});

export default router;
