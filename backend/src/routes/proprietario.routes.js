// src/routes/proprietario.routes.js
import { Router } from 'express';
import {
  listProprietarios,
  createProprietario,
  findProprietarioById,
  updateProprietario,
  deleteProprietario,
} from '../business/proprietario.business';
import createHttpError from 'http-errors';
import { ProprietarioCreateSchema, ProprietarioIdSchema } from '../schemas/proprietario.schema';

const router = Router();

router.get('/', async (req, res) => {
  const { userId } = req;
  if (!userId) {
    throw new createHttpError.Unauthorized('Usuário não autenticado');
  }

  const proprietarios = await listProprietarios(userId);
  return res.status(200).json(proprietarios);
});

router.get('/:id', async (req, res) => {
  const id = ProprietarioIdSchema.parse(req.params.id);
  const { userId } = req;
  if (!userId) {
    throw new createHttpError.Unauthorized('Usuário não autenticado');
  }

  const proprietario = await findProprietarioById(id, userId);
  if (!proprietario) {
    throw new createHttpError.NotFound('Proprietário não encontrado');
  }

  return res.status(200).json(proprietario);
});

router.post('/', async (req, res) => {
  const { nome, cpf, categoria, vencimento } = ProprietarioCreateSchema.parse(req.body);
  const { userId } = req;
  if (!userId) {
    throw new createHttpError.Unauthorized('Usuário não autenticado');
  }

  const proprietario = await createProprietario({ nome, cpf, categoria, vencimento }, userId);
  return res.status(201).json(proprietario);
});

router.put('/:id', async (req, res) => {
  const id = ProprietarioIdSchema.parse(req.params.id);
  const { nome, cpf, categoria, vencimento } = ProprietarioCreateSchema.parse(req.body);
  const { userId } = req;
  if (!userId) {
    throw new createHttpError.Unauthorized('Usuário não autenticado');
  }

  const proprietario = await updateProprietario(id, { nome, cpf, categoria, vencimento }, userId);
  if (!proprietario) {
    throw new createHttpError.NotFound('Proprietário não encontrado');
  }

  return res.status(200).json(proprietario);
});

router.delete('/:id', async (req, res) => {
  const id = ProprietarioIdSchema.parse(req.params.id);
  const { userId } = req;
  if (!userId) {
    throw new createHttpError.Unauthorized('Usuário não autenticado');
  }

  await deleteProprietario(id, userId);
  return res.status(204).json();
});

export default router;
