import React, { useState } from 'react';
import { Transaction } from '../types';
import { Search, Download, Filter } from 'lucide-react';

interface TransactionsProps {
  transactions: Transaction[];
}

const Transactions: React.FC<TransactionsProps> = ({ transactions }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'credit' | 'debit'>('all');

  const filtered = transactions.filter(t => {
    const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || t.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800">Transaction History</h2>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search transactions..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500"
            />
          </div>
          <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">
            <Filter size={20} />
          </button>
           <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">
            <Download size={20} />
          </button>
        </div>
      </div>

      <div className="flex gap-4 px-6 py-2 bg-slate-50 border-b border-slate-100 text-sm">
        <button 
          onClick={() => setFilterType('all')}
          className={`px-3 py-1 rounded-full ${filterType === 'all' ? 'bg-white shadow-sm text-emerald-700 font-medium' : 'text-slate-500 hover:text-slate-700'}`}
        >
          All
        </button>
        <button 
          onClick={() => setFilterType('credit')}
          className={`px-3 py-1 rounded-full ${filterType === 'credit' ? 'bg-white shadow-sm text-emerald-700 font-medium' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Income
        </button>
        <button 
          onClick={() => setFilterType('debit')}
          className={`px-3 py-1 rounded-full ${filterType === 'debit' ? 'bg-white shadow-sm text-emerald-700 font-medium' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Expense
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
            <tr>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-left">Description</th>
              <th className="px-6 py-4 text-left">Category</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">{t.date}</td>
                <td className="px-6 py-4 text-sm font-medium text-slate-900">{t.description}</td>
                <td className="px-6 py-4 text-sm text-slate-500 capitalize">
                    <span className="bg-slate-100 px-2 py-1 rounded text-xs">{t.category}</span>
                </td>
                <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        t.status === 'completed' ? 'bg-green-100 text-green-700' : 
                        t.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                    }`}>
                        {t.status}
                    </span>
                </td>
                <td className={`px-6 py-4 text-sm font-bold text-right whitespace-nowrap ${
                    t.type === 'credit' ? 'text-emerald-600' : 'text-slate-900'
                }`}>
                  {t.type === 'credit' ? '+' : '-'} {formatCurrency(t.amount)}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
                <tr>
                    <td colSpan={5} className="text-center py-12 text-slate-500">
                        No transactions found matching your criteria.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;