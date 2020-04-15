import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    // TODO
    const transactions = transactionsRepository.all()

    const balance = transactionsRepository.getBalance()

    const responseTotal = {
      transactions,
      balance
    }

    return response.json(responseTotal)

  } catch (err) {

    return response.status(400).json({ error: err.message });

  }
});

transactionRouter.post('/', (request, response) => {
  try {
    // TODO
    const { title, value, type } = request.body

    const CreateTransaction = new CreateTransactionService(transactionsRepository)

    const balance = transactionsRepository.getBalance()
    const remainingBalance = balance.total

    const transaction = CreateTransaction.execute({
      title,
      value,
      type,
      remainingBalance
    })

    return response.json(transaction)

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
