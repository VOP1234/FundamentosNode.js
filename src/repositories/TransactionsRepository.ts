import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string,
  value: number,
  type: 'income' | 'outcome'
};

interface Balance {
  income: number;
  outcome: number;
  total: number;
};

class TransactionsRepository {
  private transactions: Transaction[]

  constructor() {
    this.transactions = []
  };

  public all(): Transaction[] {
    return this.transactions
  };

  public getBalance(): Balance {
    // Usando REDUCE

    const {income, outcome} = this.transactions.reduce((accumulator, transacition) => {
      switch (transacition.type) {
        case "income":
          accumulator.income += transacition.value
          break
        case "outcome":
          accumulator.outcome = + transacition.value;
          break
        default:
          break
      }
      return accumulator
    }, {
      income: 0,
      outcome: 0,
      total: 0
    })

    const total = income - outcome

    return {income, outcome, total}
    // // usando filtro
    //     let income = 0;
    //     let outcome = 0;
    //     const allTransactions = this.transactions

    //     allTransactions.filter(transaction => {
    //       if (transaction.type === 'income') {
    //         income = income + transaction.value
    //       } else {
    //         outcome = outcome + transaction.value
    //       }
    //     })

    //     const total = income - outcome
    //     const responseBalance = {
    //       income,
    //       outcome,
    //       total,
    //     }

    //     return responseBalance

  };

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    // TODO
    const transaction = new Transaction({ title, value, type })

    this.transactions.push(transaction)
    return transaction
  };
}

export default TransactionsRepository;
