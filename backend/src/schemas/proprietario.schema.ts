// src/schemas/proprietario.schema.ts

import { z } from 'zod';

export const ProprietarioCreateSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  cpf: z.string().length(11, "CPF deve ter 11 dígitos"),
  categoria: z.string().min(1, "Categoria é obrigatória"),
  vencimento: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de data inválido (yyyy-mm-dd)"),
});

export const ProprietarioUpdateSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório").optional(),
  categoria: z.string().min(1, "Categoria é obrigatória").optional(),
  vencimento: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de data inválido (yyyy-mm-dd)").optional(),
});

export type ProprietarioCreateInput = z.infer<typeof ProprietarioCreateSchema>;
export type ProprietarioUpdateInput = z.infer<typeof ProprietarioUpdateSchema>;
