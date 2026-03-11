import React from 'react';
import { Account } from '../types';
import { Download, FileText, AlertCircle, Share2, Copy } from 'lucide-react';

interface AccountDetailsProps {
    account: Account;
}

const AccountDetails: React.FC<AccountDetailsProps> = ({ account }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -mr-8 -mt-8 opacity-50 pointer-events-none"></div>
                    <h3 className="text-lg font-bold text-slate-800 mb-6">Account Details</h3>
                    
                    <div className="space-y-4">
                        <div className="flex justify-between border-b border-slate-50 pb-3">
                            <span className="text-slate-500 text-sm">Account Holder</span>
                            <span className="font-medium text-slate-900">Mohit Raj</span>
                        </div>
                         <div className="flex justify-between border-b border-slate-50 pb-3">
                            <span className="text-slate-500 text-sm">Account Type</span>
                            <span className="font-medium text-slate-900">{account.type}</span>
                        </div>
                         <div className="flex justify-between border-b border-slate-50 pb-3">
                            <span className="text-slate-500 text-sm">Account Number</span>
                            <div className="flex items-center gap-2">
                                <span className="font-medium text-slate-900 font-mono">{account.accountNumber}</span>
                                <button className="text-emerald-600 hover:text-emerald-700"><Copy size={14} /></button>
                            </div>
                        </div>
                         <div className="flex justify-between border-b border-slate-50 pb-3">
                            <span className="text-slate-500 text-sm">IFSC Code</span>
                            <span className="font-medium text-slate-900 font-mono">MGBI08821</span>
                        </div>
                         <div className="flex justify-between items-center pt-2">
                            <span className="text-slate-500 text-sm">Branch</span>
                            <span className="font-medium text-slate-900 text-right">Connaught Place,<br/>New Delhi, India</span>
                        </div>
                    </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-4 flex items-start gap-3">
                    <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                        <h4 className="font-semibold text-blue-900 text-sm">KYC Verified</h4>
                        <p className="text-blue-700 text-xs mt-1">Your account is fully compliant (CKYC). Next update due in 2026.</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-6">Documents & Statements</h3>
                
                <div className="space-y-3">
                    {['April 2024', 'March 2024', 'February 2024'].map((month, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center">
                                    <FileText size={20} />
                                </div>
                                <div>
                                    <p className="font-medium text-slate-900">Statement - {month}</p>
                                    <p className="text-xs text-slate-500">PDF • 2.4 MB</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 text-slate-400 hover:text-emerald-600 transition-colors">
                                    <Share2 size={18} />
                                </button>
                                <button className="p-2 text-slate-400 hover:text-emerald-600 transition-colors">
                                    <Download size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <button className="w-full mt-6 py-2.5 border border-slate-200 text-slate-600 font-medium rounded-lg hover:bg-slate-50 transition-colors">
                    Request Older Statements
                </button>
            </div>
        </div>
    );
};

export default AccountDetails;