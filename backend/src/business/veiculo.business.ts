import { PrismaClient } from '@prisma/client';
import createHttpError from 'http-errors';
import { VeiculoCreateSchema, VeiculoPlacaSchema, VeiculoUpdateSchema } from '../schemas/veiculo.schema';

const prisma = new PrismaClient();

interface VeiculoData {
  placa: string;
  marca: string;
  modelo: string;
  ano: number;
  cor: string;
  motorista_CPF: string;
}

// Função para listar todos os veículos
export async function listVeiculos() {
  const veiculos = await prisma.veiculo.findMany();
  return veiculos;
}

// Função para encontrar um veículo pela placa
export async function findVeiculoByPlaca(placa: string) {
  const parsedPlaca = VeiculoPlacaSchema.parse(placa); // Validando a placa
  const veiculo = await prisma.veiculo.findUnique({
    where: {
      placa: parsedPlaca,
    },
  });
  return veiculo;
}

// Função para encontrar veículos pelo CPF do motorista
export async function findVeiculosByCPF(motorista_CPF: string) {
  const veiculos = await prisma.veiculo.findMany({
    where: {
      motorista_CPF,
    },
  });
  return veiculos;
}

// Função para criar um novo veículo
export async function createVeiculo(data: VeiculoData) {
  // Validando os dados de criação
  const validatedData = VeiculoCreateSchema.parse(data);

  try {
    const veiculo = await prisma.veiculo.create({
      data: {
        placa: validatedData.placa,
        marca: validatedData.marca,
        modelo: validatedData.modelo,
        ano: validatedData.ano,
        cor: validatedData.cor,
        motorista_CPF: validatedData.motorista_CPF, // Incluindo o CPF do motorista
      },
    });
    return veiculo;
  } catch (error) {
    throw new createHttpError.BadRequest('Erro ao criar o veículo');
  }
}

// Função para atualizar um veículo
export async function updateVeiculo(placa: string, data: Partial<VeiculoData>) {
  // Validando a placa
  const parsedPlaca = VeiculoPlacaSchema.parse(placa);

  // Validando os dados de atualização
  VeiculoUpdateSchema.parse({ placa: parsedPlaca, ...data });

  try {
    const veiculo = await prisma.veiculo.update({
      where: { placa: parsedPlaca },
      data,
    });
    return veiculo;
  } catch (error) {
    throw new createHttpError.BadRequest('Erro ao atualizar o veículo');
  }
}

// Função para deletar um veículo
export async function deleteVeiculo(placa: string) {
  const parsedPlaca = VeiculoPlacaSchema.parse(placa); // Validando a placa

  try {
    await prisma.veiculo.delete({
      where: {
        placa: parsedPlaca,
      },
    });
  } catch (error) {
    throw new createHttpError.BadRequest('Erro ao deletar o veículo');
  }
}
