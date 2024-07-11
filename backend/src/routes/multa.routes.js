// src/routes/multa.routes.js
import { Router } from 'express';
import {
  listMulta,
  createMulta,
  findMultaById,
  updateMulta,
  deleteMulta,
} from '../business/multa.business';
import createHttpError from 'http-errors';
import { MultaCreateSchema, MultaIdSchema } from '../schemas/multa.schema';

const router = Router();

router.get('/', async (req, res) => {
  const { userId } = req;
  if (!userId) {
    throw new createHttpError.Unauthorized('Usuário não autenticado');
  }

  const multa = await listMulta(userId);
  return res.status(200).json(multa);
});

router.get('/:id', async (req, res) => {
  const id = MultaIdSchema.parse(req.params.id);
  const { userId } = req;
  if (!userId) {
    throw new createHttpError.Unauthorized('Usuário não autenticado');
  }

  const multa = await findMultaById(id, userId);
  if (!multa) {
    throw new createHttpError.NotFound('Multa não encontrada');
  }

  return res.status(200).json(multa);
});

router.post('/', async (req, res) => {
  const { valor, data, pontos, tipo, veiculoId } = MultaCreateSchema.parse(req.body);
  const { userId } = req;
  if (!userId) {
    throw new createHttpError.Unauthorized('Usuário não autenticado');
  }

  const multa = await createMulta({ valor, data, pontos, tipo, veiculoId }, userId);
  return res.status(201).json(multa);
});

router.put('/:id', async (req, res) => {
  const id = MultaIdSchema.parse(req.params.id);
  const { valor, data, pontos, tipo, veiculoId } = MultaCreateSchema.parse(req.body);
  const { userId } = req;
  if (!userId) {
    throw new createHttpError.Unauthorized('Usuário não autenticado');
  }

  const multa = await updateMulta(id, { valor, data, pontos, tipo, veiculoId }, userId);
  if (!multa) {
    throw new createHttpError.NotFound('Multa não encontrada');
  }

  return res.status(200).json(multa);
});

router.delete('/:id', async (req, res) => {
  const id = MultaIdSchema.parse(req.params.id);
  const { userId } = req;
  if (!userId) {
    throw new createHttpError.Unauthorized('Usuário não autenticado');
  }

  await deleteMulta(id, userId);
  return res.status(204).json();
});

export default router;
