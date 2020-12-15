import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

/** Create instance of repository */
const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    /** Get all transactions */
    const transactions = transactionsRepository.all();

    /** Get balance */
    const balance = transactionsRepository.getBalance();

    /** Return transactions and balance */
    return response.json({ transactions, balance });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', async (request, response) => {
  try {
    /** Create instance of service */
    const createTransactionService = new CreateTransactionService(
      transactionsRepository,
    );

    /** Get request data */
    const { title, type, value } = request.body;

    /** Execute service to create transaction */
    const transaction = await createTransactionService.execute({
      title,
      type,
      value,
    });

    /** Return transaction */
    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
