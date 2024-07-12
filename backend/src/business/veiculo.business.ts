// veiculo.business.js

import { PrismaClient } from '@prisma/client';
import createHttpError from 'http-errors';
import { VeiculoCreateSchema, VeiculoPlacaSchema, VeiculoUpdateSchema, cpfSchema } from '../schemas/veiculo.schema';

const prisma = new PrismaClient();

// Função para listar todos os veículos
export async function listVeiculos() {
  const veiculos = await prisma.veiculo.findMany();
  return veiculos;
}

// Função para encontrar um veículo pela placa
export async function findVeiculoByPlaca(placa: string) {
  const parsedPlaca = VeiculoPlacaSchema.parse(placa);
  const veiculo = await prisma.veiculo.findUnique({
    where: {
      placa: parsedPlaca,
    },
  });
  return veiculo;
}

// Função para listar veículos pelo CPF do motorista
export async function listVeiculosByCPF(cpf: string) {
  const parsedCPF = cpfSchema.parse(cpf);
  const veiculos = await prisma.veiculo.findMany({
    where: {
      motorista_CPF: parsedCPF,
    },
  });
  return veiculos;
}

// Função para criar um novo veículo
export async function createVeiculo(data: any) {
  const validatedData = VeiculoCreateSchema.parse(data);

  try {
    const veiculo = await prisma.veiculo.create({
      data: validatedData,
    });
    return veiculo;
  } catch (error) {
    throw new createHttpError.BadRequest('Erro ao criar o veículo');
  }
}

// Função para atualizar um veículo
export async function updateVeiculo(placa: string, marca?: string, modelo?: string, ano?: number, cor?: string, motorista_CPF?: string) {
  const parsedPlaca = VeiculoPlacaSchema.parse(placa);

  const updateData: any = {};
  if (marca) updateData.marca = marca;
  if (modelo) updateData.modelo = modelo;
  if (ano) updateData.ano = ano;
  if (cor) updateData.cor = cor;
  if (motorista_CPF) updateData.motorista_CPF = motorista_CPF;

  VeiculoUpdateSchema.parse({ placa: parsedPlaca, ...updateData });

  try {
    const veiculo = await prisma.veiculo.update({
      where: { placa: parsedPlaca },
      data: updateData,
    });
    return veiculo;
  } catch (error) {
    throw new createHttpError.BadRequest('Erro ao atualizar o veículo');
  }
}

// Função para deletar um veículo
export async function deleteVeiculo(placa: string) {
  const parsedPlaca = VeiculoPlacaSchema.parse(placa);

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
