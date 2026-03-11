import React from 'react';
import { INVESTMENT_OPTIONS, LOAN_OPTIONS } from '../constants';
import { TrendingUp, PieChart, Shield, Briefcase, ChevronRight } from 'lucide-react';

const Investments: React.FC = () => {
  return (
    <div className="space-y-8">
        {/* Current Portfolio Summary */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                        <Briefcase size={20} />
                    </div>
                    <h3 className="font-semibold text-slate-800">Total Invested</h3>
                </div>
                <p className="text-2xl font-bold text-slate-900">₹8,50,000</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp size={14} className="mr-1" /> +12.5% this year
                </p>
            </div>
             <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                 <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                        <PieChart size={20} />
                    </div>
                    <h3 className="font-semibold text-slate-800">Mutual Funds</h3>
                </div>
                <p className="text-2xl font-bold text-slate-900">₹3,20,000</p>
                <p className="text-sm text-slate-500 mt-1">SIP Active: ₹5,000/mo</p>
            </div>
             <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                 <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                        <Shield size={20} />
                    </div>
                    <h3 className="font-semibold text-slate-800">Fixed Deposits</h3>
                </div>
                <p className="text-2xl font-bold text-slate-900">₹5,00,000</p>
                <p className="text-sm text-slate-500 mt-1">Matures in 8 months</p>
            </div>
        </section>

        {/* Investment Opportunities */}
        <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Invest & Grow</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {INVESTMENT_OPTIONS.map((opt) => (
                    <div key={opt.id} className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="font-bold text-lg text-slate-800 mb-2">{opt.name}</h3>
                        <div className="flex justify-between items-center text-sm mb-4">
                            <span className="text-slate-500">Interest Rate</span>
                            <span className="font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">{opt.rate}</span>
                        </div>
                         <div className="flex justify-between items-center text-sm mb-6">
                            <span className="text-slate-500">Min. Deposit</span>
                            <span className="font-medium text-slate-900">₹{opt.min.toLocaleString('en-IN')}</span>
                        </div>
                        <button className="w-full py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium">
                            Start Investing
                        </button>
                    </div>
                ))}
            </div>
        </section>

         {/* Loans Section */}
        <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Loans</h2>
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0">
                    <h3 className="text-2xl font-bold mb-2">Need funds for your dreams?</h3>
                    <p className="text-slate-300 max-w-lg">
                        Get instant approvals on personal loans up to ₹25 Lakhs with minimal documentation. 
                        Existing customers get preferential rates.
                    </p>
                </div>
                <div className="flex flex-col gap-3 w-full md:w-auto">
                    {LOAN_OPTIONS.map((loan) => (
                        <div key={loan.id} className="bg-white/10 backdrop-blur-sm p-4 rounded-xl flex items-center justify-between min-w-[300px] hover:bg-white/20 transition-colors cursor-pointer group">
                            <div>
                                <p className="font-semibold">{loan.name}</p>
                                <p className="text-xs text-slate-300">Max ₹{loan.max.toLocaleString('en-IN')} @ {loan.rate}</p>
                            </div>
                            <ChevronRight className="text-slate-400 group-hover:text-white transition-colors" size={20} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    </div>
  );
};

export default Investments;