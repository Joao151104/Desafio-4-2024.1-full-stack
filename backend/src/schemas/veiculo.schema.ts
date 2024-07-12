import { z } from 'zod';

export const VeiculoCreateSchema = z.object({
  placa: z.string().max(7),
  marca: z.string(),
  modelo: z.string(),
  ano: z.number(),
  cor: z.string(),
  motorista_CPF: z.string(),
});

export const VeiculoPlacaSchema = z.string().max(7); // Validar placa como string até 7 caracteres

// Função para validar a placa usando refine
export const validatePlaca = (placa: string): boolean => {
  return VeiculoPlacaSchema.safeParse(placa).success;
};

// Novo esquema de validação para atualização de veículos
export const VeiculoUpdateSchema = z.object({
  placa: z.string().max(7),
  marca: z.string().optional(),
  modelo: z.string().optional(),
  ano: z.number().optional(),
  cor: z.string().optional(),
  motorista_CPF: z.string().optional(), // CPF do motorista é opcional na atualização
});
