// src/business/proprietario.business.ts

import { PrismaClient } from '@prisma/client';
import createHttpError from 'http-errors';
import { ProprietarioCreateSchema, ProprietarioUpdateSchema } from '../schemas/proprietario.schema';

const prisma = new PrismaClient();

// Função para listar todos os proprietários
export async function listarProprietarios() {
  const proprietarios = await prisma.proprietario.findMany({
    include: {
      veiculos: true,
    },
  });
  return proprietarios;
}

// Função para encontrar um proprietário pelo CPF
export async function encontrarProprietarioPorCPF(cpf: string) {
  const proprietario = await prisma.proprietario.findUnique({
    where: {
      CPF: cpf,
    },
    include: {
      veiculos: true,
    },
  });
  return proprietario;
}

// Função para criar um novo proprietário
export async function criarProprietario(data: { nome: string; cpf: string; categoria: string; vencimento: string }) {
  const { nome, cpf, categoria, vencimento } = data;

  // Convertendo vencimento para Date
  const vencimentoDate = new Date(vencimento);

  // Validar os dados utilizando o schema
  const validatedData = ProprietarioCreateSchema.parse({
    nome,
    cpf,
    categoria,
    vencimento: vencimentoDate.toISOString(),
  });

  try {
    const proprietario = await prisma.proprietario.create({
      data: {
        CPF: cpf,
        nome: nome,
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

// Função para atualizar um proprietário
export async function atualizarProprietario(cpf: string, data: { nome?: string; categoria?: string; vencimento?: string }) {
  const { nome, categoria, vencimento } = data;

  // Criar um objeto de atualização vazio
  const updateData: any = {};

  // Adicionar campos ao objeto de atualização se forem fornecidos
  if (nome) updateData.nome = nome;
  if (categoria) updateData.categoria_CNH = categoria;
  if (vencimento) updateData.vencimento_CNH = new Date(vencimento);

  // Validar os dados utilizando o schema
  const validatedData = ProprietarioUpdateSchema.parse({
    cpf,
    ...updateData,
  });

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

// Função para deletar um proprietário
export async function deletarProprietario(cpf: string) {
  await prisma.proprietario.delete({
    where: {
      CPF: cpf,
    },
  });
}
