// veiculo.routes.js

import { Router } from 'express';
import createHttpError from 'http-errors';
import {
  listVeiculos,
  createVeiculo,
  findVeiculoByPlaca,
  updateVeiculo,
  deleteVeiculo,
  listVeiculosByCPF // Atualizamos o nome da função aqui
} from '../business/veiculo.business';
import { VeiculoCreateSchema, VeiculoPlacaSchema, cpfSchema } from '../schemas/veiculo.schema';

const router = Router();

// Rota para listar todos os veículos
router.get('/', async (req, res) => {
  try {
    const veiculos = await listVeiculos();
    return res.status(200).json(veiculos);
  } catch (error) {
    throw new createHttpError.InternalServerError('Erro ao listar veículos');
  }
});

// Rota para encontrar um veículo pela placa
router.get('/placa/:placa', async (req, res) => {
  try {
    const placa = VeiculoPlacaSchema.parse(req.params.placa);

    const veiculo = await findVeiculoByPlaca(placa);
    if (!veiculo) {
      throw new createHttpError.NotFound('Veículo não encontrado');
    }

    return res.status(200).json(veiculo);
  } catch (error) {
    if (error instanceof createHttpError.HttpError) {
      throw error;
    }
    throw new createHttpError.BadRequest('Erro ao buscar veículo por placa');
  }
});

// Rota para listar veículos pelo CPF do motorista
router.get('/cpf/:cpf', async (req, res) => {
  try {
    const cpf = cpfSchema.parse(req.params.cpf);

    const veiculos = await listVeiculosByCPF(cpf); // Atualizamos aqui para usar listVeiculosByCPF
    if (veiculos.length === 0) {
      throw new createHttpError.NotFound('Nenhum veículo encontrado para este CPF');
    }

    return res.status(200).json(veiculos);
  } catch (error) {
    if (error instanceof createHttpError.HttpError) {
      throw error;
    }
    throw new createHttpError.BadRequest('Erro ao buscar veículos por CPF');
  }
});

// Rota para criar um novo veículo
router.post('/', async (req, res) => {
  try {
    const { placa, marca, modelo, ano, cor, motorista_CPF } = VeiculoCreateSchema.parse(req.body);

    const veiculo = await createVeiculo({ placa, marca, modelo, ano, cor, motorista_CPF });
    return res.status(201).json(veiculo);
  } catch (error) {
    if (error instanceof createHttpError.HttpError) {
      throw error;
    }
    throw new createHttpError.BadRequest('Erro ao criar veículo');
  }
});

// Rota para atualizar um veículo
router.put('/:placa', async (req, res) => {
  try {
    const placa = VeiculoPlacaSchema.parse(req.params.placa);
    const { marca, modelo, ano, cor, motorista_CPF } = req.body;

    const veiculo = await updateVeiculo(placa, marca, modelo, ano, cor, motorista_CPF);
    if (!veiculo) {
      throw new createHttpError.NotFound('Veículo não encontrado');
    }

    return res.status(200).json(veiculo);
  } catch (error) {
    if (error instanceof createHttpError.HttpError) {
      throw error;
    }
    throw new createHttpError.BadRequest('Erro ao atualizar veículo');
  }
});

// Rota para deletar um veículo
router.delete('/:placa', async (req, res) => {
  try {
    const placa = VeiculoPlacaSchema.parse(req.params.placa);

    await deleteVeiculo(placa);
    return res.status(204).json();
  } catch (error) {
    if (error instanceof createHttpError.HttpError) {
      throw error;
    }
    throw new createHttpError.BadRequest('Erro ao deletar veículo');
  }
});

export default router;
