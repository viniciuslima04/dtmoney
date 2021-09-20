import { createContext, useEffect, useState, ReactNode, useContext } from 'react'
import { api } from '../services/api';

interface transition {
  id: number;
  title: string;
  amount: number;
  category: string;
  type: string;
  createdAt: string;
}

// interface TrasactionInput {
//     title: string;
//   amount: number;
//   category: string;
//   type: string;
// }

// type TrasactionInput = Pick<transition, 'title' | 'amount' | 'category' | 'type'>

type TransactionInput = Omit<transition, 'id' | 'createdAt'>;

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {

  transactions: transition[];
  createTransection: (transactions: TransactionInput) => Promise<void>;
}

export const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {

  const [transactions, setTransections] = useState<transition[]>([]);

  useEffect(() => {
    api.get('/transactions')
      .then(response => setTransections(response.data.transactions))
  }, []);

  async function createTransection(transactionInput: TransactionInput) {

    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date(),

    })
    const { transaction } = response.data;

    setTransections([
      ...transactions,
      transaction,
    ])
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransection }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}