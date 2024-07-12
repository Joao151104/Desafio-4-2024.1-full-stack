import { Router } from 'express';
import createHttpError from 'http-errors';
import {
  listVeiculos,
  createVeiculo,
  findVeiculoByPlaca,
  updateVeiculo,
  deleteVeiculo,
  findVeiculosByCPF // Importe a função de busca por CPF aqui
} from '../business/veiculo.business';
import { VeiculoCreateSchema, VeiculoPlacaSchema, VeiculoUpdateSchema } from '../schemas/veiculo.schema';

const router = Router();

// Middleware para validar e normalizar dados de veículo
function validateVeiculoData(schema: any, data: any) {
  try {
    const validatedData = schema.parse(data);
    return validatedData;
  } catch (error) {
    throw new createHttpError.BadRequest('Dados inválidos para veículo');
  }
}

router.get('/', async (req, res) => {
  try {
    const veiculos = await listVeiculos();
    return res.status(200).json(veiculos);
  } catch (error) {
    throw new createHttpError.InternalServerError('Erro ao listar veículos');
  }
});

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

router.get('/cpf/:cpf', async (req, res) => {
  try {
    const cpf = req.params.cpf;

    const veiculos = await findVeiculosByCPF(cpf);
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

router.post('/', async (req, res) => {
  try {
    const { placa, marca, modelo, ano, cor, motorista_CPF } = req.body;

    const veiculoData = {
      placa,
      marca,
      modelo,
      ano,
      cor,
      motorista_CPF
    };

    const validatedData = validateVeiculoData(VeiculoCreateSchema, veiculoData);
    const veiculo = await createVeiculo(validatedData);
    return res.status(201).json(veiculo);
  } catch (error) {
    if (error instanceof createHttpError.HttpError) {
      throw error;
    }
    throw new createHttpError.BadRequest('Erro ao criar veículo');
  }
});

router.put('/:placa', async (req, res) => {
  try {
    const placa = VeiculoPlacaSchema.parse(req.params.placa);
    const { marca, modelo, ano, cor, motorista_CPF } = req.body;

    const veiculoData = {
      marca,
      modelo,
      ano,
      cor,
      motorista_CPF
    };

    const validatedData = validateVeiculoData(VeiculoUpdateSchema, veiculoData);
    const veiculo = await updateVeiculo(placa, validatedData);
    
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
