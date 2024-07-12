// src/schemas/multa.schema.ts

import { z } from 'zod';

export const MultaCreateSchema = z.object({
  valor: z.number(),
  data: z.string(),
  pontos: z.number().min(1).positive(),
  tipo: z.enum([
    'Velocidade acima da máxima permitida',
    'Estacionar em local proibido',
    'Dirigir utilizando o celular',
    'Dirigir sob efeito de álcool',
    'Não utilizar cinto de segurança',
    'Avançar o sinal vermelho'
  ]),
  veiculoId: z.string().uuid()
});

export const MultaUpdateSchema = z.object({
  valor: z.number().optional(), // Valor é opcional para atualização
  data: z.string().optional(), // Data é opcional para atualização
  pontos: z.number().min(1).positive().optional(), // Pontos é opcional para atualização
  tipo: z.enum([
    'Velocidade acima da máxima permitida',
    'Estacionar em local proibido',
    'Dirigir utilizando o celular',
    'Dirigir sob efeito de álcool',
    'Não utilizar cinto de segurança',
    'Avançar o sinal vermelho'
  ]).optional(), // Tipo é opcional para atualização
  veiculoId: z.string().uuid().optional(), // VeiculoId é opcional para atualização
});

export const MultaIdSchema = z.string().uuid();

// Inferir tipos para os DTOs
export type MultaCreateDTO = z.infer<typeof MultaCreateSchema>;
export type MultaUpdateDTO = z.infer<typeof MultaUpdateSchema>;
