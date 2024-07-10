// src/schemas/multa.schema.js
import { z } from 'zod';

export const MultaCreateSchema = z.object({
  valor: z.string(),
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

export const MultaIdSchema = z.string().uuid();
