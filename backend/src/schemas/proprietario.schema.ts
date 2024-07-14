import { z } from 'zod';

export const ProprietarioCreateSchema = z.object({
  nome: z.string().min(1).max(100),
  cpf: z.string().length(11),
  categoria: z.string().min(1).max(2),
  vencimento: z.string(), // Pode ser ajustado para DateTime se necessário
});

export const ProprietarioUpdateSchema = z.object({
  nome: z.string().min(1).max(100).optional(),
  categoria: z.string().min(1).max(2).optional(),
  vencimento: z.string().optional(), // Pode ser ajustado para DateTime se necessário
});