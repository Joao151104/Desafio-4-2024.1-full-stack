import { z } from 'zod';

export const cpfSchema = z.string().length(11).regex(/^\d+$/, 'CPF deve conter apenas números');

// Função para validar a placa usando refine
export const validatePlaca = (placa: string): boolean => {
  return VeiculoPlacaSchema.safeParse(placa).success;
};

// Esquema de criação de veículo com CPF do motorista
export const VeiculoCreateSchema = z.object({
  placa: z.string().max(7),
  marca: z.string(),
  modelo: z.string(),
  ano: z.number(),
  cor: z.string(),
  motorista_CPF: cpfSchema,
});

// Esquema de validação para a placa
export const VeiculoPlacaSchema = z.string().max(7);

// Esquema de atualização de veículo com CPF do motorista
export const VeiculoUpdateSchema = z.object({
  placa: z.string().max(7).optional(),
  marca: z.string().optional(),
  modelo: z.string().optional(),
  ano: z.number().optional(),
  cor: z.string().optional(),
  motorista_CPF: cpfSchema.optional(),
});
