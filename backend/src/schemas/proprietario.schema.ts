// src/schemas/proprietario.schema.js
import { z } from 'zod';

export const ProprietarioCreateSchema = z.object({
  nome: z.string(),
  cpf: z.string().length(14),
  categoria: z.string(),
  vencimento: z.string(),
});

export const ProprietarioIdSchema = z.string().uuid();

export const ProprietarioUpdateSchema = z.object({
  cpf: z.string().length(14),
  nome: z.string().optional(),
  categoria: z.string().optional(),
  vencimento: z.string().optional(),
});
