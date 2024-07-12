// src/routes/proprietario.routes.ts

import { Router } from 'express';
import {
  listarProprietarios,
  criarProprietario,
  encontrarProprietarioPorCPF,
  atualizarProprietario,
  deletarProprietario,
} from '../business/proprietario.business';
import createHttpError from 'http-errors';
import { ProprietarioCreateSchema, ProprietarioUpdateSchema } from '../schemas/proprietario.schema';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const proprietarios = await listarProprietarios();
    res.status(200).json(proprietarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:cpf', async (req, res) => {
  const cpf = req.params.cpf;
  try {
    const proprietario = await encontrarProprietarioPorCPF(cpf);
    if (!proprietario) {
      throw new createHttpError.NotFound('Proprietário não encontrado');
    }
    res.status(200).json(proprietario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Exemplo no código do backend

router.post('/', async (req, res) => {
  const { nome, cpf, categoria, vencimento } = req.body;

  try {
    // Validação dos dados recebidos
    if (!nome || !cpf || !categoria || !vencimento) {
      throw new Error('Por favor, preencha todos os campos obrigatórios.');
    }

    const formattedVencimento = new Date(vencimento); // Certifique-se de que está convertendo corretamente

    const proprietario = await criarProprietario({ nome, cpf, categoria, vencimento });

    res.status(201).json(proprietario);
  } catch (error) {
    console.error('Erro ao criar proprietário:', error);
    res.status(400).json({ message: error.message || 'Erro ao criar o proprietário.' });
  }
});


router.put('/:cpf', async (req, res) => {
  const cpf = req.params.cpf;
  const { nome, categoria, vencimento } = req.body;

  try {
    const validatedData = ProprietarioUpdateSchema.parse({
      nome,
      categoria,
      vencimento,
    });

    const proprietario = await atualizarProprietario(cpf, { nome, categoria, vencimento });

    if (!proprietario) {
      throw new createHttpError.NotFound('Proprietário não encontrado');
    }

    res.status(200).json(proprietario);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:cpf', async (req, res) => {
  const cpf = req.params.cpf;

  try {
    await deletarProprietario(cpf);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
