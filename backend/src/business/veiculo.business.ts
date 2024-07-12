// src/business/veiculo.business.ts

import { PrismaClient, Veiculo } from '@prisma/client';
import createHttpError from 'http-errors';
import { VeiculoCreateSchema, VeiculoPlacaSchema } from '../schemas/veiculo.schema';

const prisma = new PrismaClient();

/**
 * Retorna todos os veículos cadastrados.
 * @returns Promise<Veiculo[]> Array de veículos.
 */
export async function listVeiculos(): Promise<Veiculo[]> {
  return await prisma.veiculo.findMany();
}

/**
 * Busca um veículo pelo número da placa.
 * @param placa Número da placa do veículo.
 * @returns Promise<Veiculo | null> Veículo encontrado ou null se não encontrado.
 */
export async function findVeiculoByPlaca(placa: string): Promise<Veiculo | null> {
  const parsedPlaca = VeiculoPlacaSchema.parse(placa);
  return await prisma.veiculo.findUnique({
    where: {
      placa: parsedPlaca,
    },
  });
}

/**
 * Busca todos os veículos associados a um CPF de motorista.
 * @param cpf Número do CPF do motorista.
 * @returns Promise<Veiculo[]> Array de veículos associados ao CPF.
 */
export async function findVeiculosByCPF(cpf: string): Promise<Veiculo[]> {
  try {
    const veiculos = await prisma.veiculo.findMany({
      where: {
        motorista_CPF: cpf,
      },
    });
    return veiculos;
  } catch (error) {
    throw new createHttpError.InternalServerError('Erro ao buscar veículos por CPF');
  }
}

/**
 * Cria um novo veículo com os dados fornecidos.
 * @param data Dados do veículo a serem criados.
 * @returns Promise<Veiculo> Veículo criado.
 */
export async function createVeiculo(data: Omit<Veiculo, 'id'>): Promise<Veiculo> {
  const validatedData = VeiculoCreateSchema.parse(data);
  return await prisma.veiculo.create({
    data: validatedData,
  });
}

/**
 * Atualiza um veículo existente pelo número da placa.
 * @param placa Número da placa do veículo a ser atualizado.
 * @param updateData Dados atualizados do veículo.
 * @returns Promise<Veiculo | null> Veículo atualizado ou null se não encontrado.
 */
export async function updateVeiculo(placa: string, updateData: Partial<Veiculo>): Promise<Veiculo | null> {
  const parsedPlaca = VeiculoPlacaSchema.parse(placa);

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

/**
 * Deleta um veículo pelo número da placa.
 * @param placa Número da placa do veículo a ser deletado.
 */
export async function deleteVeiculo(placa: string): Promise<void> {
  const parsedPlaca = VeiculoPlacaSchema.parse(placa);
  await prisma.veiculo.delete({
    where: {
      placa: parsedPlaca,
    },
  });
}
