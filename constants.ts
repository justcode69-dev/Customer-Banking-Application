import { Account, Transaction, User } from './types';

export const MOCK_USER: User = {
  id: 'u_12345',
  name: 'Mohit Raj',
  email: 'mohit.raj@guptabank.com',
  phone: '+91 98765 43210',
  lastLogin: new Date().toISOString()
};

export const MOCK_ACCOUNTS: Account[] = [
  {
    id: 'acc_001',
    type: 'Savings Advantage',
    accountNumber: 'xxxx-xxxx-4589',
    balance: 10000.00,
    currency: 'INR'
  },
  {
    id: 'acc_002',
    type: 'Credit Card (Platinum)',
    accountNumber: 'xxxx-xxxx-9921',
    balance: -15400.00,
    currency: 'INR'
  }
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 't1', date: '2024-05-20', description: 'Netflix India', amount: 649.00, type: 'debit', category: 'utility', status: 'completed' },
  { id: 't2', date: '2024-05-19', description: 'Salary Deposit', amount: 85000.00, type: 'credit', category: 'salary', status: 'completed' },
  { id: 't3', date: '2024-05-18', description: 'Reliance Smart', amount: 2450.00, type: 'debit', category: 'shopping', status: 'completed' },
  { id: 't4', date: '2024-05-15', description: 'Adani Electricity', amount: 1250.00, type: 'debit', category: 'utility', status: 'completed' },
  { id: 't5', date: '2024-05-12', description: 'SIP - HDFC Top 100', amount: 5000.00, type: 'debit', category: 'investment', status: 'completed' },
  { id: 't6', date: '2024-05-10', description: 'Ola Cabs', amount: 340.00, type: 'debit', category: 'shopping', status: 'completed' },
  { id: 't7', date: '2024-05-08', description: 'UPI Transfer from Rahul', amount: 2000.00, type: 'credit', category: 'transfer', status: 'completed' },
];

export const INVESTMENT_OPTIONS = [
  { id: 1, name: 'SBI Term Deposit', rate: '6.8% p.a.', min: 10000, term: '12 Months' },
  { id: 2, name: 'Nifty 50 Index Fund', rate: '~12% Hist. Return', min: 500, term: 'Flexible' },
  { id: 3, name: 'Sovereign Gold Bonds', rate: '2.5% + Appreciation', min: 5000, term: '8 Years' }
];

export const LOAN_OPTIONS = [
  { id: 1, name: 'Personal Loan', rate: '10.99% p.a.', max: 2500000 },
  { id: 2, name: 'Home Loan', rate: '8.50% p.a.', max: 50000000 },
  { id: 3, name: 'Car Loan', rate: '8.85% p.a.', max: 3000000 }
];