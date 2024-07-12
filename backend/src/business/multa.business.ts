// src/business/multa.business.ts

import { PrismaClient } from '@prisma/client';
import createHttpError from 'http-errors';
import { MultaCreateDTO, MultaUpdateDTO } from '../schemas/multa.schema';

const prisma = new PrismaClient();

// Função para listar todas as multas
export async function listarMultas() {
  try {
    const multas = await prisma.multa.findMany();
    return multas;
  } catch (error) {
    throw new createHttpError.InternalServerError('Erro ao listar as multas');
  }
}

// Função para encontrar uma multa pelo ID
export async function encontrarMultaPorID(multaID: number) {
  try {
    const multa = await prisma.multa.findUnique({
      where: {
        multaID,
      },
    });
    return multa;
  } catch (error) {
    throw new createHttpError.InternalServerError('Erro ao encontrar a multa');
  }
}

// Função para criar uma nova multa
export async function criarMulta(data: MultaCreateDTO) {
  try {
    const multaUncheckedInput = {
      valor: Number(data.valor),
      data: new Date(data.data), // Converter para objeto de data
      pontos_penalidade: data.pontos,
      tipo_infracao: data.tipo,
      veiculo_placa: data.veiculoId,
      infrator_CPF: data.infratorCPF, // Adicionar o CPF do infrator
    };

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
  try {
    const updateData = {} as any;

    if (data.valor !== undefined) {
      updateData.valor = Number(data.valor);
    }
    if (data.data !== undefined) {
      updateData.data = new Date(data.data);
    }
    if (data.pontos !== undefined) {
      updateData.pontos_penalidade = data.pontos;
    }
    if (data.tipo !== undefined) {
      updateData.tipo_infracao = data.tipo;
    }
    if (data.veiculoId !== undefined) {
      updateData.veiculo_placa = data.veiculoId;
    }

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
  try {
    await prisma.multa.delete({
      where: {
        multaID,
      },
    });
  } catch (error) {
    throw new createHttpError.BadRequest('Erro ao deletar a multa');
  }
}

// Função para listar multas por CPF do infrator
export async function listarMultasPorCPF(cpf: string) {
  try {
    // Verifica se o CPF fornecido é válido
    if (!/^\d{11}$/.test(cpf)) {
      throw new createHttpError.BadRequest('CPF inválido');
    }

    // Busca todas as multas com base no CPF fornecido
    const multas = await prisma.multa.findMany({
      where: {
        infrator_CPF: cpf,
      },
    });

    return multas;
  } catch (error) {
    // Trata erros específicos
    if (error instanceof createHttpError.HttpError) {
      throw error; // Já é um erro HTTP, apenas relança
    } else {
      throw new createHttpError.InternalServerError('Erro ao listar as multas por CPF');
    }
  }
}
