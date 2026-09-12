import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Heart,
  CreditCard,
  Download,
  CheckCircle2,
  Users,
  Clock,
  Sparkles,
  ShieldCheck,
  Building,
  Smartphone,
  FileCheck,
  Receipt
} from 'lucide-react';
import { Donation } from '../types';

export const DonationsView: React.FC = () => {
  const { campaigns, donations, recordDonation, language } = useApp();
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>(campaigns[0]?.id || '');

  // Donation form state
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [amount, setAmount] = useState('1000');
  const [paymentMethod, setPaymentMethod] = useState<'bKash' | 'Nagad' | 'Rocket' | 'Bank'>('bKash');
  const [transactionId, setTransactionId] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  // Generated receipt state
  const [generatedReceipt, setGeneratedReceipt] = useState<Donation | null>(null);

  const activeCampaign = campaigns.find(c => c.id === selectedCampaignId) || campaigns[0];

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || (!isAnonymous && !donorName) || !transactionId) {
      alert('Please fill the donation amount, name/anonymous option, and transaction ID.');
      return;
    }

    const newDonation: Omit<Donation, 'id' | 'receiptNo' | 'date'> = {
      donorName: isAnonymous ? 'Anonymous Well-Wisher' : donorName,
      donorEmail: donorEmail || 'anonymous@bswa-duet.org',
      donorPhone: donorPhone,
      amount: parseInt(amount, 10) || 500,
      campaignId: selectedCampaignId,
      campaignTitle: activeCampaign?.title || 'General Student Welfare Dana',
      paymentMethod,
      transactionId: transactionId.trim().toUpperCase(),
      isAnonymous
    };

    const recorded = recordDonation(newDonation);
    setGeneratedReceipt(recorded);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Page Header */}
      <div className="rounded-3xl bg-gradient-to-r from-[#6b1426] via-[#540d1a] to-[#36050e] text-white p-6 sm:p-10 shadow-lg border border-[#d4af37]/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-200 text-xs font-semibold">
            <Heart className="w-3.5 h-3.5 text-rose-300" />
            <span>Sacred Dana & Student Welfare Fund</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-amber-100">
            Donations & Welfare Campaigns
          </h1>
          <p className="text-xs sm:text-sm text-amber-100/80 max-w-xl">
            "Dana is the first parami." Your noble contribution directly funds semester fee stipends, emergency medical relief, and sacred Dhamma events at DUET Gazipur.
          </p>
        </div>

        <div className="text-center bg-black/25 backdrop-blur-md p-4 rounded-2xl border border-amber-300/30 flex-shrink-0">
          <div className="text-[10px] uppercase font-bold text-amber-200">Total Welfare Fund Raised</div>
          <div className="text-2xl font-serif font-bold text-amber-300 mt-1">
            ৳ {campaigns.reduce((acc, c) => acc + c.raisedAmount, 0).toLocaleString()}
          </div>
          <div className="text-[10px] text-stone-300 mt-0.5">100% Non-profit & Audited</div>
        </div>
      </div>

      {/* Main Grid: Active Campaigns & Online Donation Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 7 cols: Active Campaigns List */}
        <div className="lg:col-span-7 space-y-6">
          <h3 className="font-serif font-bold text-lg text-[#731326] dark:text-amber-300 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#d4af37]" />
            <span>Active Fundraising Campaigns</span>
          </h3>

          <div className="space-y-4">
            {campaigns.map(camp => {
              const percent = Math.min(100, Math.round((camp.raisedAmount / camp.goalAmount) * 100));
              const isSelected = selectedCampaignId === camp.id;

              return (
                <div
                  key={camp.id}
                  onClick={() => setSelectedCampaignId(camp.id)}
                  className={`p-5 rounded-3xl bg-white dark:bg-[#1a0f12] border-2 transition-all cursor-pointer shadow-sm space-y-4 ${
                    isSelected
                      ? 'border-[#731326] dark:border-amber-400 ring-2 ring-amber-400/20'
                      : 'border-stone-200 dark:border-stone-800 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#731326] text-amber-100">
                          {camp.category}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                            ✓ Selected for Contribution
                          </span>
                        )}
                      </div>
                      <h4 className="font-serif font-bold text-base text-[#731326] dark:text-amber-300 mt-1">
                        {language === 'bn' && camp.titleBn ? camp.titleBn : camp.title}
                      </h4>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <span className="text-xs text-stone-400 block">Deadline</span>
                      <span className="font-mono text-xs font-semibold text-stone-700 dark:text-stone-300">
                        {camp.deadline}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                    {camp.description}
                  </p>

                  {/* Progress bar */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#731326] dark:text-amber-300">
                        ৳ {camp.raisedAmount.toLocaleString()} Raised
                      </span>
                      <span className="text-stone-500 font-mono">
                        Target: ৳ {camp.goalAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#731326] via-amber-600 to-[#d4af37] rounded-full transition-all"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-stone-500">
                      <span>{percent}% Completed</span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        {camp.donorsCount} Donors Contributed
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Official Bank / Mobile Wallet Accounts */}
          <div className="p-5 rounded-3xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-300/60 dark:border-amber-900/40 space-y-3 text-xs">
            <h4 className="font-serif font-bold text-sm text-[#731326] dark:text-amber-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
              <span>Official BSWA DUET Payment Channels</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-stone-700 dark:text-stone-300">
              <div className="p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                <div className="font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>bKash / Nagad / Rocket (Merchant / Personal)</span>
                </div>
                <div className="font-mono text-sm font-bold text-stone-900 dark:text-stone-100 mt-0.5">
                  01812-987654
                </div>
                <div className="text-[10px] text-stone-500">Account: BSWA DUET Welfare Fund</div>
              </div>

              <div className="p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                <div className="font-bold text-blue-700 dark:text-blue-400 flex items-center gap-1">
                  <Building className="w-3.5 h-3.5" />
                  <span>Sonali Bank PLC (DUET Campus Branch)</span>
                </div>
                <div className="font-mono text-xs font-bold text-stone-900 dark:text-stone-100 mt-0.5">
                  A/C: 4412-002100456
                </div>
                <div className="text-[10px] text-stone-500">Buddhist Students Welfare Association DUET</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right 5 cols: Contribution Form & Instant Receipt */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Donation Form */}
          <form
            onSubmit={handleDonateSubmit}
            className="p-6 rounded-3xl bg-white dark:bg-[#1a0f12] border border-stone-200 dark:border-stone-800 shadow-md space-y-4"
          >
            <div className="border-b border-stone-200 dark:border-stone-800 pb-3">
              <h3 className="font-serif font-bold text-base text-[#731326] dark:text-amber-300 flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500" />
                <span>Make a Welfare Contribution</span>
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Target: <strong>{activeCampaign?.title}</strong>
              </p>
            </div>

            {/* Quick Amount Pills */}
            <div>
              <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1.5">
                Choose Amount (BDT)
              </label>
              <div className="grid grid-cols-4 gap-2 text-xs">
                {['500', '1000', '2500', '5000'].map(val => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setAmount(val)}
                    className={`py-1.5 rounded-xl font-bold transition-colors ${
                      amount === val
                        ? 'bg-[#731326] text-white'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    ৳ {val}
                  </button>
                ))}
              </div>
              <input
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="Or custom amount"
                className="mt-2 w-full p-2.5 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900"
              />
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                Payment Channel
              </label>
              <div className="grid grid-cols-4 gap-2 text-xs">
                {(['bKash', 'Nagad', 'Rocket', 'Bank'] as const).map(m => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setPaymentMethod(m)}
                    className={`py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                      paymentMethod === m
                        ? 'bg-amber-100 dark:bg-amber-950 text-[#731326] dark:text-amber-300 border border-[#d4af37]'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Transaction ID */}
            <div>
              <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                Transaction ID (TrxID) *
              </label>
              <input
                type="text"
                required
                value={transactionId}
                onChange={e => setTransactionId(e.target.value)}
                placeholder="e.g. 9J87K12A34"
                className="w-full p-2.5 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 font-mono uppercase"
              />
            </div>

            {/* Anonymous Toggle */}
            <div className="flex items-center gap-2 text-xs">
              <input
                type="checkbox"
                id="anon"
                checked={isAnonymous}
                onChange={e => setIsAnonymous(e.target.checked)}
                className="rounded text-[#731326]"
              />
              <label htmlFor="anon" className="text-stone-600 dark:text-stone-400">
                Keep my identity anonymous on public donors wall
              </label>
            </div>

            {!isAnonymous && (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-stone-600 dark:text-stone-400 font-semibold mb-1">Donor Name *</label>
                  <input
                    type="text"
                    required={!isAnonymous}
                    value={donorName}
                    onChange={e => setDonorName(e.target.value)}
                    placeholder="e.g. Dr. Priyabrata Barua"
                    className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 dark:text-stone-400 font-semibold mb-1">Email (For receipt)</label>
                  <input
                    type="email"
                    value={donorEmail}
                    onChange={e => setDonorEmail(e.target.value)}
                    placeholder="e.g. priyo@gmail.com"
                    className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#731326] to-[#540d1a] hover:from-[#800020] text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4 text-rose-400" />
              <span>Submit Contribution & Get Official Receipt</span>
            </button>
          </form>

          {/* Generated Receipt Voucher */}
          {generatedReceipt && (
            <div id="bswa-receipt-voucher" className="p-6 rounded-3xl bg-gradient-to-b from-[#fdfbf7] to-[#f4ebe1] dark:from-[#241217] dark:to-[#170a0e] border-2 border-[#d4af37] shadow-xl space-y-4 animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between border-b border-amber-900/20 dark:border-amber-700/30 pb-3">
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#731326] dark:text-amber-300">
                    Official BSWA Dana Voucher
                  </h4>
                  <p className="font-mono text-[10px] text-stone-500">
                    Receipt #{generatedReceipt.receiptNo}
                  </p>
                </div>
                <FileCheck className="w-6 h-6 text-emerald-600" />
              </div>

              <div className="space-y-1.5 text-xs text-stone-700 dark:text-stone-300">
                <p><strong>Donor:</strong> {generatedReceipt.donorName}</p>
                <p><strong>Amount:</strong> <span className="font-bold text-emerald-700 dark:text-emerald-400 font-mono">৳ {generatedReceipt.amount.toLocaleString()}</span></p>
                <p><strong>Campaign:</strong> {generatedReceipt.campaignTitle}</p>
                <p><strong>Payment Method:</strong> {generatedReceipt.paymentMethod} (TrxID: {generatedReceipt.transactionId})</p>
                <p><strong>Date:</strong> {generatedReceipt.date}</p>
              </div>

              <div className="p-2.5 rounded-xl bg-amber-100/60 dark:bg-amber-950/60 text-center font-serif text-[11px] text-amber-900 dark:text-amber-200 italic">
                "Sabbe Satta Bhavantu Sukhitatta — May all beings be well, happy and peaceful."
              </div>

              <button
                onClick={handlePrintReceipt}
                className="w-full py-2 rounded-xl bg-[#731326] text-white text-xs font-semibold hover:bg-[#800020] flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Print / Download Voucher</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Public Donors Wall */}
      <section className="space-y-4 pt-6 border-t border-stone-200 dark:border-stone-800">
        <h3 className="font-serif font-bold text-lg text-[#731326] dark:text-amber-300">
          Recent Dana Contributors Wall
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          {donations.map(d => (
            <div
              key={d.id}
              className="p-3.5 rounded-2xl bg-white dark:bg-[#1a0f12] border border-stone-200 dark:border-stone-800 shadow-xs flex items-center justify-between"
            >
              <div>
                <span className="font-bold text-stone-800 dark:text-stone-100 block">
                  {d.donorName}
                </span>
                <span className="text-[10px] text-stone-400">
                  {d.campaignTitle} • {d.date}
                </span>
              </div>
              <span className="font-mono font-bold text-sm text-[#731326] dark:text-amber-300">
                ৳ {d.amount.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
