// src/schemas/veiculo.schema.js
import { z } from 'zod';

export const VeiculoCreateSchema = z.object({
  placa: z.string(),
  marca: z.string(),
  modelo: z.string(),
  ano: z.number(),
  cor: z.string(),
});

export const VeiculoIdSchema = z.string().uuid();
