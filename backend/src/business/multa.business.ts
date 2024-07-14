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
  try {
    if (!isValidCPF(data.infratorCPF)) {
      throw new createHttpError.BadRequest('CPF do infrator inválido');
    }

    const multa = await prisma.multa.create({
      data: {
        valor: data.valor,
        data: data.data,
        pontos_penalidade: data.pontos,
        tipo_infracao: data.tipo,
        veiculo_placa: data.veiculoId,
        infrator_CPF: data.infratorCPF,
      },
    });

    return multa;
  } catch (error) {
    console.error('Erro ao criar a multa:', error);
    if (error instanceof Error && error.message.includes('PrismaClientKnownRequestError')) {
      throw new createHttpError.BadRequest('Erro ao processar a requisição');
    }
    throw new createHttpError.BadRequest('Erro ao criar a multa');
  }
}

function isValidCPF(cpf: string): boolean {
  let sum = 0;
  let remainder;
  if (cpf.length !== 11 || /^[0-9]+$/.test(cpf) === false) return false;
  for (let i = 1; i <= 9; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  remainder = (sum * 10) % 11;
  if ((remainder === 10) || (remainder === 11)) remainder = 0;
  if (remainder !== parseInt(cpf.substring(9, 10))) return false;
  sum = 0;
  for (let i = 1; i <= 10; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  remainder = (sum * 10) % 11;
  if ((remainder === 10) || (remainder === 11)) remainder = 0;
  if (remainder !== parseInt(cpf.substring(10, 11))) return false;
  return true;
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

// Função para listar multas por CPF do infrator
export async function listarMultasPorCPF(cpf: string) {
  const multas = await prisma.multa.findMany({
    where: {
      infrator_CPF: cpf, // Use o campo correto aqui
    },
  });
  return multas;
}
