import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string,
  value: number,
  type: 'income' | 'outcome',
  remainingBalance: number
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type, remainingBalance }: RequestDTO): Transaction {
    // TODO
    if(type === 'outcome'){
      if (remainingBalance - value < 0) {
        throw Error('You do not have enough balance.')
      }
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    })

    return transaction
  }
}

export default CreateTransactionService;
