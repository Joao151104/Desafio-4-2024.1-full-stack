// src/routes/veiculo.routes.js
import { Router } from 'express';
import {
  listVeiculos,
  createVeiculo,
  findVeiculoById,
  updateVeiculo,
  deleteVeiculo,
} from '../business/veiculo.business';
import createHttpError from 'http-errors';
import { VeiculoCreateSchema, VeiculoIdSchema } from '../schemas/veiculo.schema';

const router = Router();

router.get('/', async (req, res) => {
  const { userId } = req;
  if (!userId) {
    throw new createHttpError.Unauthorized('Usuário não autenticado');
  }

  const veiculos = await listVeiculos(userId);
  return res.status(200).json(veiculos);
});

router.get('/:id', async (req, res) => {
  const id = VeiculoIdSchema.parse(req.params.id);
  const { userId } = req;
  if (!userId) {
    throw new createHttpError.Unauthorized('Usuário não autenticado');
  }

  const veiculo = await findVeiculoById(id, userId);
  if (!veiculo) {
    throw new createHttpError.NotFound('Veículo não encontrado');
  }

  return res.status(200).json(veiculo);
});

router.post('/', async (req, res) => {
  const { placa, marca, modelo, ano, cor } = VeiculoCreateSchema.parse(req.body);
  const { userId } = req;
  if (!userId) {
    throw new createHttpError.Unauthorized('Usuário não autenticado');
  }

  const veiculo = await createVeiculo({ placa, marca, modelo, ano, cor }, userId);
  return res.status(201).json(veiculo);
});

router.put('/:id', async (req, res) => {
  const id = VeiculoIdSchema.parse(req.params.id);
  const { placa, marca, modelo, ano, cor } = VeiculoCreateSchema.parse(req.body);
  const { userId } = req;
  if (!userId) {
    throw new createHttpError.Unauthorized('Usuário não autenticado');
  }

  const veiculo = await updateVeiculo(id, { placa, marca, modelo, ano, cor }, userId);
  if (!veiculo) {
    throw new createHttpError.NotFound('Veículo não encontrado');
  }

  return res.status(200).json(veiculo);
});

router.delete('/:id', async (req, res) => {
  const id = VeiculoIdSchema.parse(req.params.id);
  const { userId } = req;
  if (!userId) {
    throw new createHttpError.Unauthorized('Usuário não autenticado');
  }

  await deleteVeiculo(id, userId);
  return res.status(204).json();
});

export default router;
