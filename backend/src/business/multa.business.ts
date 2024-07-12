// src/business/multa.business.ts

import { PrismaClient } from '@prisma/client';
import createHttpError from 'http-errors';
import { MultaCreateDTO, MultaUpdateDTO } from '../schemas/multa.schema';

const prisma = new PrismaClient();

// Função para listar todas as multas
export async function listarMultas() {
  const multas = await prisma.multa.findMany();
  return multas;
}

// Função para encontrar uma multa pelo ID
export async function encontrarMultaPorID(multaID: number) {
  const multa = await prisma.multa.findUnique({
    where: {
      multaID,
    },
  });
  return multa;
}

// Função para criar uma nova multa
export async function criarMulta(data: MultaCreateDTO) {
  const multaUncheckedInput = {
    valor: Number(data.valor), // Converter para number
    data: data.data,
    pontos_penalidade: data.pontos,
    tipo_infracao: data.tipo,
    veiculo_placa: data.veiculoId // Se `veiculoId` for `veiculo_placa` no Prisma
  };

  try {
    const multa = await prisma.multa.create({
      data: multaUncheckedInput,
    });
    return multa;
  } catch (error) {
    throw new createHttpError.BadRequest('Erro ao criar a multa');
  }
}

// Função para atualizar uma multa
export async function atualizarMulta(multaID: number, data: MultaUpdateDTO) {
  // Extrair apenas os campos definidos para atualização
  const { valor, data: newData, pontos, tipo, veiculoId } = data;

  const updateData = {} as any; // Criar objeto vazio para armazenar dados de atualização

  // Verificar e adicionar apenas os campos definidos para atualização
  if (valor !== undefined) {
    updateData.valor = Number(valor);
  }
  if (newData !== undefined) {
    updateData.data = newData;
  }
  if (pontos !== undefined) {
    updateData.pontos_penalidade = pontos;
  }
  if (tipo !== undefined) {
    updateData.tipo_infracao = tipo;
  }
  if (veiculoId !== undefined) {
    updateData.veiculo_placa = veiculoId;
  }

  try {
    const multa = await prisma.multa.update({
      where: {
        multaID,
      },
      data: updateData,
    });
    return multa;
  } catch (error) {
    throw new createHttpError.BadRequest('Erro ao atualizar a multa');
  }
}

// Função para deletar uma multa
export async function deletarMulta(multaID: number) {
  await prisma.multa.delete({
    where: {
      multaID,
    },
  });
}
