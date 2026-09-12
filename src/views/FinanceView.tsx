import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  TrendingUp,
  TrendingDown,
  Scale,
  FileSpreadsheet,
  Download,
  PlusCircle,
  FileCheck,
  ShieldCheck,
  Building,
  Calendar,
  DollarSign
} from 'lucide-react';
import { FinanceRecord } from '../types';
import { exportToCSV, exportToPrintablePDF } from '../utils/exportUtils';

export const FinanceView: React.FC = () => {
  const { financeRecords, addFinanceRecord, activeRole } = useApp();
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');

  // New Voucher state
  const [showVoucherForm, setShowVoucherForm] = useState(false);
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Event Logistics');
  const [amount, setAmount] = useState('');
  const [voucherNo, setVoucherNo] = useState(`BSWA-V-${Math.floor(1000 + Math.random() * 9000)}`);
  const [voucherFile, setVoucherFile] = useState('');

  // Calculations
  const totalIncome = financeRecords
    .filter(r => r.type === 'income')
    .reduce((sum, r) => sum + r.amount, 0);

  const totalExpense = financeRecords
    .filter(r => r.type === 'expense')
    .reduce((sum, r) => sum + r.amount, 0);

  const netBalance = totalIncome - totalExpense;

  const filteredRecords = financeRecords.filter(r => {
    if (filterType === 'all') return true;
    return r.type === filterType;
  });

  const handleAddVoucherSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount) {
      alert('Please provide a title and amount.');
      return;
    }

    const newRec: Omit<FinanceRecord, 'id' | 'date'> = {
      title,
      type,
      category,
      amount: parseInt(amount, 10) || 0,
      voucherNo: voucherNo || `BSWA-V-${Math.floor(1000 + Math.random() * 9000)}`,
      approvedBy: 'Executive Treasurer',
      voucherFileUrl: voucherFile ? `vouchers/${voucherFile}` : undefined
    };

    addFinanceRecord(newRec);
    setShowVoucherForm(false);
    setTitle('');
    setAmount('');
  };

  const handleExportCSV = () => {
    const data = filteredRecords.map(r => ({
      VoucherNo: r.voucherNo || 'N/A',
      Date: r.date,
      Title: r.title,
      Type: r.type.toUpperCase(),
      Category: r.category,
      Amount_BDT: r.amount,
      ApprovedBy: r.approvedBy
    }));
    exportToCSV(data, 'BSWA_DUET_Financial_Ledger');
  };

  const handleExportPDF = () => {
    exportToPrintablePDF('BSWA DUET Financial Audit & Ledger', 'bswa-finance-table');
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Page Header */}
      <div className="rounded-3xl bg-gradient-to-r from-[#6b1426] via-[#540d1a] to-[#36050e] text-white p-6 sm:p-10 shadow-lg border border-[#d4af37]/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-200 text-xs font-semibold">
            <Scale className="w-3.5 h-3.5" />
            <span>Public Financial Accountability & Audit</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-amber-100">
            Finance & Accounts Overview
          </h1>
          <p className="text-xs sm:text-sm text-amber-100/80 max-w-xl">
            Complete transparency across all welfare donations, alumni endowments, Buddha Purnima festival costs, and scholarship disbursements.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 flex-shrink-0">
          {(activeRole === 'admin' || activeRole === 'executive') && (
            <button
              onClick={() => setShowVoucherForm(!showVoucherForm)}
              className="px-4 py-2.5 rounded-2xl bg-[#d4af37] text-[#3a0610] font-bold text-xs hover:bg-amber-300 shadow-md transition-all flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Record Voucher</span>
            </button>
          )}

          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs transition-all flex items-center gap-2"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handleExportPDF}
            className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-rose-300" />
            <span>Print Ledger</span>
          </button>
        </div>
      </div>

      {/* Financial Overview Bento Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-[#1a0f12] border-2 border-emerald-500/30 shadow-md space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
              Total Revenue & Donations
            </span>
            <div className="p-2 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-serif font-bold text-emerald-800 dark:text-emerald-300">
            ৳ {totalIncome.toLocaleString()}
          </div>
          <p className="text-[11px] text-stone-500">From student dues, alumni donations & endowments</p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#1a0f12] border-2 border-rose-500/30 shadow-md space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider">
              Total Expenses & Grants
            </span>
            <div className="p-2 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600">
              <TrendingDown className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-serif font-bold text-rose-800 dark:text-rose-300">
            ৳ {totalExpense.toLocaleString()}
          </div>
          <p className="text-[11px] text-stone-500">Scholarships, ceremonial food, audio & logistics</p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#1a0f12] border-2 border-[#d4af37] shadow-md space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#731326] dark:text-amber-400 uppercase tracking-wider">
              Current Reserve Balance
            </span>
            <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-950 text-[#731326] dark:text-amber-300">
              <Scale className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-serif font-bold text-[#731326] dark:text-amber-300">
            ৳ {netBalance.toLocaleString()}
          </div>
          <p className="text-[11px] text-stone-500">Maintained in Sonali Bank DUET Campus Branch</p>
        </div>
      </div>

      {/* Expense Voucher Record Form (Toggleable) */}
      {showVoucherForm && (
        <form
          onSubmit={handleAddVoucherSubmit}
          className="p-6 rounded-3xl bg-white dark:bg-[#1a0f12] border-2 border-[#731326] shadow-lg space-y-4 animate-in fade-in duration-150"
        >
          <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
            <h3 className="font-serif font-bold text-base text-[#731326] dark:text-amber-300">
              Record Official Voucher / Transaction
            </h3>
            <button
              type="button"
              onClick={() => setShowVoucherForm(false)}
              className="text-xs text-stone-500 hover:text-stone-800"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-stone-600 dark:text-stone-400 font-semibold mb-1">Type</label>
              <select
                value={type}
                onChange={e => setType(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 font-bold"
              >
                <option value="expense">Expense (Outflow)</option>
                <option value="income">Income (Inflow)</option>
              </select>
            </div>

            <div>
              <label className="block text-stone-600 dark:text-stone-400 font-semibold mb-1">Voucher / Memo No</label>
              <input
                type="text"
                value={voucherNo}
                onChange={e => setVoucherNo(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 font-mono"
              />
            </div>

            <div>
              <label className="block text-stone-600 dark:text-stone-400 font-semibold mb-1">Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900"
              >
                <option value="Event Logistics">Event Logistics & Sound</option>
                <option value="Scholarship Grant">Scholarship Disbursal</option>
                <option value="Sanghadana & Food">Sanghadana & Catering</option>
                <option value="Temple Donation">Temple / Vihara Renovation</option>
                <option value="Alumni Contribution">Alumni Contribution</option>
                <option value="General Fund">General Welfare</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-stone-600 dark:text-stone-400 font-semibold mb-1">Description / Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Stage lighting and mic rental for Buddha Purnima"
                className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900"
              />
            </div>

            <div>
              <label className="block text-stone-600 dark:text-stone-400 font-semibold mb-1">Amount (BDT) *</label>
              <input
                type="number"
                required
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="e.g. 15000"
                className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 font-bold"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="py-2.5 px-6 rounded-xl bg-[#731326] text-white font-bold text-xs hover:bg-[#800020] shadow"
            >
              Commit Voucher to Ledger
            </button>
          </div>
        </form>
      )}

      {/* Ledger Table Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {[
              { id: 'all', label: 'All Transactions' },
              { id: 'income', label: 'Income Only' },
              { id: 'expense', label: 'Expenses & Grants' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  filterType === tab.id
                    ? 'bg-[#731326] text-white shadow-sm'
                    : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div id="bswa-finance-table" className="overflow-x-auto rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1a0f12] shadow-sm">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-stone-100 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300">
                <th className="p-3.5 font-bold">Voucher / Memo</th>
                <th className="p-3.5 font-bold">Date</th>
                <th className="p-3.5 font-bold">Description</th>
                <th className="p-3.5 font-bold">Category</th>
                <th className="p-3.5 font-bold">Type</th>
                <th className="p-3.5 font-bold">Approved By</th>
                <th className="p-3.5 font-bold text-right">Amount (BDT)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
              {filteredRecords.map(rec => (
                <tr key={rec.id} className="hover:bg-amber-50/40 dark:hover:bg-amber-950/20 transition-colors">
                  <td className="p-3.5 font-mono text-[11px] text-[#731326] dark:text-amber-400 font-bold">
                    {rec.voucherNo || 'BSWA-AUTO'}
                  </td>
                  <td className="p-3.5 text-stone-500 font-mono text-[11px]">{rec.date}</td>
                  <td className="p-3.5 font-semibold text-stone-800 dark:text-stone-100">{rec.title}</td>
                  <td className="p-3.5 text-stone-500">{rec.category}</td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      rec.type === 'income'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                    }`}>
                      {rec.type.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-3.5 text-stone-500">{rec.approvedBy}</td>
                  <td className={`p-3.5 text-right font-mono font-bold ${
                    rec.type === 'income'
                      ? 'text-emerald-700 dark:text-emerald-400'
                      : 'text-rose-700 dark:text-rose-400'
                  }`}>
                    {rec.type === 'income' ? '+' : '-'} ৳ {rec.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Audit Certification Stamp */}
      <div className="p-5 rounded-3xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-emerald-600 flex-shrink-0" />
          <div>
            <h4 className="font-bold text-stone-800 dark:text-stone-100">
              Officially Certified & Audited
            </h4>
            <p className="text-stone-500 text-[11px]">
              Annual Fiscal Audit 2025-2026 certified by BSWA DUET Advisory Council & External Chartered Accountant.
            </p>
          </div>
        </div>
        <div className="text-stone-400 text-[10px] font-mono">
          Audit Certificate ID: AUD-DUET-2026-09
        </div>
      </div>
    </div>
  );
};
