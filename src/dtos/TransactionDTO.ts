export default interface TransactionDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}
