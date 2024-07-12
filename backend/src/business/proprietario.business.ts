// src/business/proprietario.business.ts

import { PrismaClient } from '@prisma/client';
import createHttpError from 'http-errors';
import { ProprietarioCreateInput, ProprietarioUpdateInput } from '../schemas/proprietario.schema';

const prisma = new PrismaClient();

export async function listarProprietarios() {
  return await prisma.proprietario.findMany({
    include: {
      veiculos: true,
    },
  });
}

export async function encontrarProprietarioPorCPF(cpf: string) {
  return await prisma.proprietario.findUnique({
    where: {
      CPF: cpf,
    },
    include: {
      veiculos: true,
    },
  });
}

export async function criarProprietario(data: ProprietarioCreateInput) {
  const { nome, cpf, categoria, vencimento } = data;
  const vencimentoDate = new Date(vencimento);

  try {
    const proprietario = await prisma.proprietario.create({
      data: {
        CPF: cpf,
        nome,
        vencimento_CNH: vencimentoDate,
        categoria_CNH: categoria,
      },
      include: {
        veiculos: true,
      },
    });

    return proprietario;
  } catch (error) {
    throw new createHttpError.BadRequest('Erro ao criar o proprietário');
  }
}

export async function atualizarProprietario(cpf: string, data: ProprietarioUpdateInput) {
  const { nome, cpf: novoCPF, categoria, vencimento } = data; // Renomeie para novoCPF para distinguir do CPF atual

  const updateData: any = {};
  if (nome) updateData.nome = nome;
  if (categoria) updateData.categoria_CNH = categoria;
  if (vencimento) updateData.vencimento_CNH = new Date(vencimento);
  if (novoCPF) updateData.CPF = novoCPF; // Inclui o novo CPF na atualização, se fornecido

  try {
    const proprietario = await prisma.proprietario.update({
      where: {
        CPF: cpf,
      },
      data: updateData,
      include: {
        veiculos: true,
      },
    });

    return proprietario;
  } catch (error) {
    throw new createHttpError.BadRequest('Erro ao atualizar o proprietário');
  }
}

export async function deletarProprietario(cpf: string) {
  try {
    await prisma.proprietario.delete({
      where: {
        CPF: cpf,
      },
    });
  } catch (error) {
    throw new createHttpError.BadRequest('Erro ao deletar o proprietário');
  }
}
