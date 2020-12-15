import { v4 } from 'uuid';
import Transaction from '../models/Transaction';
import TransactionDTO from '../dtos/TransactionDTO';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    /** Return all transactions */
    return this.transactions;
  }

  public getBalance(): Balance {
    /** List income transactions */
    const incomeTransactions = this.transactions.filter(
      transaction => transaction.type === 'income',
    );

    /** List outcome transactions */
    const outcomeTransactions = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );

    /** Sum all income transactions */
    let income = 0;
    if (incomeTransactions.length > 0) {
      income = incomeTransactions.map(a => a.value).reduce((a, b) => a + b);
    }

    /** Sum all outcome transactions */
    let outcome = 0;
    if (outcomeTransactions.length > 0) {
      outcome = outcomeTransactions.map(a => a.value).reduce((a, b) => a + b);
    }

    /** Define balance */
    const balance = {
      income,
      outcome,
      total: income - outcome,
    };

    /** Return balance */
    return balance;
  }

  public create({ title, type, value }: TransactionDTO): Transaction {
    /** Create transaction */
    const transaction = {
      id: v4(),
      title,
      type,
      value,
    };

    /** Add transaction to list of transactions */
    this.transactions.push(transaction);

    /** Return transaction */
    return transaction;
  }
}

export default TransactionsRepository;
