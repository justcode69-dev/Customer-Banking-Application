import React from 'react';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  CreditCard, 
  Wallet, 
  MoreHorizontal
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Account, Transaction } from '../types';

interface DashboardProps {
  accounts: Account[];
  recentTransactions: Transaction[];
  onQuickAction: (action: string) => void;
}

const data = [
  { name: 'Mon', spend: 1200 },
  { name: 'Tue', spend: 2000 },
  { name: 'Wed', spend: 1500 },
  { name: 'Thu', spend: 3200 },
  { name: 'Fri', spend: 4500 },
  { name: 'Sat', spend: 3800 },
  { name: 'Sun', spend: 1800 },
];

const Dashboard: React.FC<DashboardProps> = ({ accounts, recentTransactions, onQuickAction }) => {
  const mainAccount = accounts[0];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Balance Card */}
        <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-2xl p-6 text-white shadow-lg shadow-emerald-200">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-emerald-100 text-sm font-medium">Total Balance</p>
              <h2 className="text-3xl font-bold mt-1">{formatCurrency(mainAccount.balance)}</h2>
            </div>
            <Wallet className="text-emerald-200 opacity-50" size={28} />
          </div>
          <div className="mt-8 flex justify-between items-end">
             <div className="text-sm text-emerald-100">
                {mainAccount.accountNumber}
             </div>
             <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                Savings
             </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="md:col-span-2 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button onClick={() => onQuickAction('payments')} className="p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors flex flex-col items-center justify-center gap-2 group">
                    <div className="w-10 h-10 rounded-full bg-blue-100 group-hover:bg-white text-blue-600 flex items-center justify-center transition-colors">
                        <ArrowUpRight size={20} />
                    </div>
                    <span className="text-sm font-medium text-slate-700">UPI / Send</span>
                </button>
                 <button onClick={() => onQuickAction('payments')} className="p-4 rounded-xl bg-orange-50 hover:bg-orange-100 transition-colors flex flex-col items-center justify-center gap-2 group">
                    <div className="w-10 h-10 rounded-full bg-orange-100 group-hover:bg-white text-orange-600 flex items-center justify-center transition-colors">
                        <CreditCard size={20} />
                    </div>
                    <span className="text-sm font-medium text-slate-700">Pay Bills</span>
                </button>
                 <button onClick={() => onQuickAction('investments')} className="p-4 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors flex flex-col items-center justify-center gap-2 group">
                    <div className="w-10 h-10 rounded-full bg-purple-100 group-hover:bg-white text-purple-600 flex items-center justify-center transition-colors">
                        <ArrowDownLeft size={20} />
                    </div>
                    <span className="text-sm font-medium text-slate-700">Request</span>
                </button>
                 <button onClick={() => onQuickAction('account')} className="p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors flex flex-col items-center justify-center gap-2 group">
                    <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-white text-slate-600 flex items-center justify-center transition-colors">
                        <MoreHorizontal size={20} />
                    </div>
                    <span className="text-sm font-medium text-slate-700">More</span>
                </button>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Spending Analysis */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 mb-6">Weekly Spending (INR)</h3>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                        <Tooltip 
                            cursor={{fill: '#f8fafc'}}
                            contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                            formatter={(value: number) => [`₹${value}`, 'Spend']}
                        />
                        <Bar dataKey="spend" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Recent Transactions Snippet */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-slate-800">Recent</h3>
                <button onClick={() => onQuickAction('transactions')} className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">View All</button>
            </div>
            <div className="space-y-4">
                {recentTransactions.slice(0, 4).map((t) => (
                    <div key={t.id} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg transition-colors">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                t.type === 'credit' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600'
                            }`}>
                                {t.type === 'credit' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-900 line-clamp-1">{t.description}</p>
                                <p className="text-xs text-slate-500">{t.date}</p>
                            </div>
                        </div>
                        <span className={`text-sm font-semibold ${t.type === 'credit' ? 'text-emerald-600' : 'text-slate-900'}`}>
                            {t.type === 'credit' ? '+' : '-'} {formatCurrency(t.amount)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;