// veiculo.schema.js

import { z } from 'zod';

export const VeiculoCreateSchema = z.object({
  placa: z.string().max(7),
  marca: z.string(),
  modelo: z.string(),
  ano: z.number(),
  cor: z.string(),
});

export const VeiculoPlacaSchema = z.string().max(7);

export const VeiculoUpdateSchema = z.object({
  marca: z.string().optional(),
  modelo: z.string().optional(),
  ano: z.number().optional(),
  cor: z.string().optional(),
});
