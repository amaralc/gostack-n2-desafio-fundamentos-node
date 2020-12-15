import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import TransactionDTO from '../dtos/TransactionDTO';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public async execute({
    title,
    type,
    value,
  }: TransactionDTO): Promise<Transaction> {
    /** Get balance */
    const balance = await this.transactionsRepository.getBalance();

    /** If balance is not enough, throw error */
    if (balance.total < value && type === 'outcome') {
      throw Error(
        'Your current balance is not enough to execute the transaction',
      );
    }

    /** Create transaction */
    const transaction = await this.transactionsRepository.create({
      title,
      type,
      value,
    });

    /** Return transaction */
    return transaction;
  }
}

export default CreateTransactionService;
