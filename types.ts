export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  category: 'transfer' | 'utility' | 'shopping' | 'salary' | 'investment';
  status: 'completed' | 'pending' | 'failed';
}

export interface Account {
  id: string;
  type: string;
  accountNumber: string;
  balance: number;
  currency: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  lastLogin: string;
}

export enum PaymentMethod {
  IMPS = 'IMPS',
  NEFT = 'NEFT',
  UPI = 'UPI',
  RTGS = 'RTGS'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export type ViewState = 'dashboard' | 'transactions' | 'payments' | 'investments' | 'account' | 'support';
