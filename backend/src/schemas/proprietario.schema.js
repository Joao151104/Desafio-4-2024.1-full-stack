// src/schemas/proprietario.schema.js
import { z } from 'zod';

export const ProprietarioCreateSchema = z.object({
  nome: z.string(),
  cpf: z.string().length(14),
  categoria: z.string(),
  vencimento: z.string(),
});

export const ProprietarioIdSchema = z.string().uuid();
