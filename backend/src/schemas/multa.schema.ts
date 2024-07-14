import { z } from 'zod';

export const MultaCreateSchema = z.object({
  valor: z.number().positive(),
  data: z.string().transform((str) => new Date(str)), // Convert string to Date
  pontos: z.number().min(1).max(21).positive(),
  tipo: z.enum([
    'Velocidade acima da máxima permitida',
    'Estacionar em local proibido',
    'Dirigir utilizando o celular',
    'Dirigir sob efeito de álcool',
    'Não utilizar cinto de segurança',
    'Avançar o sinal vermelho',
  ]),
  veiculoId: z.string().regex(/^\w{7}$/),
  infratorCPF: z.string().regex(/^\d{11}$/),
});

export const MultaUpdateSchema = z.object({
  valor: z.number().positive().optional(),
  data: z.string().transform((str) => new Date(str)).optional(),
  pontos: z.number().min(1).max(21).positive().optional(),
  tipo: z.enum([
    'Velocidade acima da máxima permitida',
    'Estacionar em local proibido',
    'Dirigir utilizando o celular',
    'Dirigir sob efeito de álcool',
    'Não utilizar cinto de segurança',
    'Avançar o sinal vermelho',
  ]).optional(),
  veiculoId: z.string().regex(/^\w{7}$/).optional(),
  infratorCPF: z.string().regex(/^\d{11}$/).optional(),
});

export type MultaCreateDTO = z.infer<typeof MultaCreateSchema>;
export type MultaUpdateDTO = z.infer<typeof MultaUpdateSchema>;
