import React, { useState } from 'react';
import { PaymentMethod } from '../types';
import { Send, Clock, CreditCard, Zap, Calendar, Smartphone, QrCode } from 'lucide-react';

const Payments: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'quick' | 'bank' | 'upi' | 'scheduled'>('quick');
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
        setIsProcessing(false);
        setSuccessMsg('Transfer initiated successfully! Reference ID: REF8829302');
        setTimeout(() => setSuccessMsg(''), 5000);
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="flex border-b border-slate-100">
                    <button 
                        onClick={() => setActiveTab('quick')}
                        className={`flex-1 py-4 text-sm font-medium transition-colors ${activeTab === 'quick' ? 'text-emerald-600 border-b-2 border-emerald-500 bg-emerald-50/50' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        <Zap size={18} className="inline mr-2 mb-1" />
                        Quick Transfer
                    </button>
                    <button 
                        onClick={() => setActiveTab('bank')}
                        className={`flex-1 py-4 text-sm font-medium transition-colors ${activeTab === 'bank' ? 'text-emerald-600 border-b-2 border-emerald-500 bg-emerald-50/50' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        <Send size={18} className="inline mr-2 mb-1" />
                        NEFT / IMPS
                    </button>
                    <button 
                        onClick={() => setActiveTab('upi')}
                        className={`flex-1 py-4 text-sm font-medium transition-colors ${activeTab === 'upi' ? 'text-emerald-600 border-b-2 border-emerald-500 bg-emerald-50/50' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        <Smartphone size={18} className="inline mr-2 mb-1" />
                        UPI Transfer
                    </button>
                </div>

                <div className="p-8">
                    {successMsg && (
                        <div className="mb-6 bg-green-50 text-green-700 p-4 rounded-lg flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                            {successMsg}
                        </div>
                    )}

                    <form onSubmit={handlePayment} className="space-y-6">
                        {activeTab === 'bank' && (
                             <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Payment Mode</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="mode" className="text-emerald-600 focus:ring-emerald-500" defaultChecked />
                                        <span>IMPS (Instant)</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="mode" className="text-emerald-600 focus:ring-emerald-500" />
                                        <span>NEFT</span>
                                    </label>
                                </div>
                            </div>
                        )}
                        
                        {activeTab === 'upi' ? (
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">UPI ID / VPA</label>
                                    <div className="flex gap-2">
                                        <input type="text" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500 outline-none" placeholder="mobile-number@upi" required />
                                        <button type="button" className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 transition-colors" title="Scan QR">
                                            <QrCode size={20} />
                                        </button>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-1">Enter a Valid VPA (e.g. 9876543210@paytm)</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Beneficiary Name (Optional)</label>
                                    <input type="text" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500 outline-none" placeholder="Verified Name will appear here" />
                                </div>
                            </div>
                        ) : (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Beneficiary Name</label>
                                    <input type="text" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500 outline-none" placeholder="e.g. Mohit Raj" required />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Account Number</label>
                                        <input type="text" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500 outline-none" placeholder="xxxx-xxxx-xxxx" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">IFSC Code</label>
                                        <input type="text" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500 outline-none" placeholder="MGBI000123" required />
                                    </div>
                                </div>
                            </>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Amount</label>
                            <div className="relative">
                                <span className="absolute left-4 top-2 text-slate-500">₹</span>
                                <input type="number" className="w-full pl-8 pr-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500 outline-none text-lg font-semibold" placeholder="0.00" required min="1" />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isProcessing}
                            className={`w-full py-3 rounded-lg font-semibold text-white transition-all ${isProcessing ? 'bg-slate-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-200'}`}
                        >
                            {isProcessing ? 'Processing...' : 'Proceed to Pay'}
                        </button>
                    </form>
                </div>
            </div>
        </div>

        {/* Scheduled Payments Sidebar */}
        <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                        <Clock size={20} className="text-emerald-600" /> Scheduled
                    </h3>
                    <button className="text-xs font-medium text-emerald-600 hover:underline">Manage</button>
                </div>
                
                <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm text-slate-600 font-bold">
                            25
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-slate-900">Jio Fiber Bill</p>
                            <p className="text-xs text-slate-500">Monthly • ₹825.00</p>
                        </div>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Active</span>
                    </div>
                     <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm text-slate-600 font-bold">
                            01
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-slate-900">House Rent</p>
                            <p className="text-xs text-slate-500">Monthly • ₹25,000.00</p>
                        </div>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Active</span>
                    </div>
                </div>
                <button className="w-full mt-4 py-2 border border-dashed border-slate-300 text-slate-500 rounded-lg hover:border-emerald-500 hover:text-emerald-600 text-sm font-medium transition-colors flex items-center justify-center gap-2">
                    <Calendar size={16} /> Schedule New Payment
                </button>
            </div>
        </div>
    </div>
  );
};

export default Payments;