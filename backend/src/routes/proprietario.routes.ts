// src/routes/proprietario.routes.ts

import { Router } from 'express';
import {
  listarProprietarios,
  criarProprietario,
  encontrarProprietarioPorCPF,
  atualizarProprietario,
  deletarProprietario,
} from '../business/proprietario.business';
import createHttpError from 'http-errors';
import { ProprietarioCreateSchema, ProprietarioUpdateSchema } from '../schemas/proprietario.schema';

const router = Router();

router.get('/', async (req, res) => {
  const proprietarios = await listarProprietarios();
  return res.status(200).json(proprietarios);
});

router.get('/:cpf', async (req, res) => {
  const cpf = req.params.cpf;
  const proprietario = await encontrarProprietarioPorCPF(cpf);
  if (!proprietario) {
    throw new createHttpError.NotFound('Proprietário não encontrado');
  }
  return res.status(200).json(proprietario);
});

router.post('/', async (req, res) => {
  try {
    const { nome, cpf, categoria, vencimento } = ProprietarioCreateSchema.parse(req.body);
    const proprietario = await criarProprietario({ nome, cpf, categoria, vencimento });
    return res.status(201).json(proprietario);
  } catch (error) {
    console.error('Erro ao criar proprietário:', error);
    return res.status(400).json({ message: 'Erro ao criar o proprietário' });
  }
});



router.delete('/:cpf', async (req, res) => {
  const cpf = req.params.cpf;
  await deletarProprietario(cpf);
  return res.status(204).json();
});

export default router;
