import { Router } from 'express';
import createHttpError from 'http-errors';
import {
  listVeiculos,
  createVeiculo,
  findVeiculoByPlaca,
  findVeiculosByCPF,
  updateVeiculo,
  deleteVeiculo,
} from '../business/veiculo.business';
import { VeiculoCreateSchema, VeiculoPlacaSchema, VeiculoUpdateSchema } from '../schemas/veiculo.schema';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const veiculos = await listVeiculos();
    res.status(200).json(veiculos);
  } catch (error) {
    next(new createHttpError.InternalServerError('Erro ao listar veículos'));
  }
});

router.get('/:placa', async (req, res, next) => {
  try {
    const placa = VeiculoPlacaSchema.parse(req.params.placa);
    const veiculo = await findVeiculoByPlaca(placa);

    if (!veiculo) {
      throw new createHttpError.NotFound('Veículo não encontrado');
    }

    res.status(200).json(veiculo);
  } catch (error) {
    if (error instanceof createHttpError.HttpError) {
      next(error);
    } else {
      next(new createHttpError.BadRequest('Erro ao buscar veículo por placa'));
    }
  }
});

router.get('/cpf/:cpf', async (req, res, next) => {
  try {
    const cpf = req.params.cpf;
    const veiculos = await findVeiculosByCPF(cpf);

    if (!veiculos.length) {
      throw new createHttpError.NotFound('Nenhum veículo encontrado para este CPF');
    }

    res.status(200).json(veiculos);
  } catch (error) {
    if (error instanceof createHttpError.HttpError) {
      next(error);
    } else {
      next(new createHttpError.BadRequest('Erro ao buscar veículos por CPF'));
    }
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { placa, marca, modelo, ano, cor, motorista_CPF } = VeiculoCreateSchema.parse(req.body);
    const veiculo = await createVeiculo({ placa, marca, modelo, ano, cor, motorista_CPF });
    res.status(201).json(veiculo);
  } catch (error) {
    if (error instanceof createHttpError.HttpError) {
      next(error);
    } else {
      next(new createHttpError.BadRequest('Erro ao criar veículo'));
    }
  }
});


router.delete('/:placa', async (req, res, next) => {
  try {
    const placa = VeiculoPlacaSchema.parse(req.params.placa);
    await deleteVeiculo(placa);
    res.status(204).json();
  } catch (error) {
    if (error instanceof createHttpError.HttpError) {
      next(error);
    } else {
      next(new createHttpError.BadRequest('Erro ao deletar veículo'));
    }
  }
});

export default router;
