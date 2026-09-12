import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Award,
  Users,
  HeartHandshake,
  FileText,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  Send,
  UploadCloud,
  FileSpreadsheet,
  File,
  ShieldCheck,
  Search,
  Filter
} from 'lucide-react';
import { ScholarshipApplication } from '../types';
import { exportToCSV, exportToPrintablePDF, exportToWordDoc } from '../utils/exportUtils';

export const ScholarshipView: React.FC = () => {
  const {
    currentUser,
    activeRole,
    scholarshipApplications,
    scholarshipRecipients,
    scholarshipDonors,
    submitScholarshipApplication,
    updateScholarshipStatus
  } = useApp();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'apply' | 'recipients' | 'donors' | 'admin'>('dashboard');

  // Application Form State
  const [formData, setFormData] = useState({
    fullName: currentUser?.fullName || '',
    duetId: currentUser?.duetId || '',
    department: currentUser?.department || 'Computer Science & Engineering',
    semester: '5th Semester',
    cgpa: '3.65',
    familyIncome: '18000',
    guardianOccupation: 'Farmer / Daily wage earner',
    reason: '',
    scholarshipType: 'Academic Merit' as 'Academic Merit' | 'Financial Need' | 'Emergency Aid'
  });

  const [uploadedFiles, setUploadedFiles] = useState<{ marksheet: string; idCard: string; recommendation: string }>({
    marksheet: '',
    idCard: '',
    recommendation: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  // Filters for recipients
  const [recipientYear, setRecipientYear] = useState('all');
  const [recipientDept, setRecipientDept] = useState('all');
  const [recipientSearch, setRecipientSearch] = useState('');

  // Counters
  const totalScholarshipsCount = 145 + scholarshipRecipients.length - 5;
  const currentYearScholarshipsCount = 18;

  const handleFileChange = (field: 'marksheet' | 'idCard' | 'recommendation', e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFiles(prev => ({ ...prev, [field]: e.target.files![0].name }));
    }
  };

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.duetId || !formData.reason) {
      alert('Please fill all required personal, academic, and hardship fields.');
      return;
    }

    const newApp: Omit<ScholarshipApplication, 'id' | 'appliedAt' | 'status'> = {
      applicantName: formData.fullName,
      duetId: formData.duetId,
      department: formData.department,
      semester: formData.semester,
      cgpa: parseFloat(formData.cgpa) || 3.5,
      familyMonthlyIncome: parseInt(formData.familyIncome, 10) || 20000,
      reasonForApplying: formData.reason,
      scholarshipType: formData.scholarshipType,
      marksheetUrl: uploadedFiles.marksheet ? `uploaded/${uploadedFiles.marksheet}` : 'verified_transcript.pdf',
      idCardUrl: uploadedFiles.idCard ? `uploaded/${uploadedFiles.idCard}` : 'verified_duet_id.jpg',
      recommendationUrl: uploadedFiles.recommendation ? `uploaded/${uploadedFiles.recommendation}` : 'rector_recommendation.pdf'
    };

    submitScholarshipApplication(newApp);
    setFormSubmitted(true);
  };

  // Filtered recipients
  const filteredRecipients = scholarshipRecipients.filter(r => {
    const matchYear = recipientYear === 'all' || r.year.toString() === recipientYear;
    const matchDept = recipientDept === 'all' || r.department === recipientDept;
    const matchSearch = !recipientSearch.trim() || r.name.toLowerCase().includes(recipientSearch.toLowerCase());
    return matchYear && matchDept && matchSearch;
  });

  // Export handlers
  const handleExportRecipientsCSV = () => {
    const data = filteredRecipients.map(r => ({
      ID: r.id,
      RecipientName: r.name,
      DUET_ID: r.duetId,
      Department: r.department,
      Batch: r.batch,
      AwardYear: r.year,
      ScholarshipType: r.scholarshipType,
      StipendAmount: r.amount,
      CGPA: r.cgpa
    }));
    exportToCSV(data, 'BSWA_Scholarship_Recipients_DUET');
  };

  const handleExportRecipientsPDF = () => {
    exportToPrintablePDF('BSWA DUET Scholarship Recipients Registry', 'bswa-recipients-table');
  };

  const handleExportRecipientsWord = () => {
    const data = filteredRecipients.map(r => ({
      RecipientName: r.name,
      DUET_ID: r.duetId,
      Department: r.department,
      AwardYear: r.year,
      Type: r.scholarshipType,
      Amount: `BDT ${r.amount.toLocaleString()}`
    }));
    exportToWordDoc('BSWA DUET Scholarship Recipients List', data, 'BSWA_DUET_Scholarship_Recipients');
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#6b1426] via-[#540d1a] to-[#36050e] text-white p-6 sm:p-10 shadow-lg border border-[#d4af37]/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-200 text-xs font-semibold">
            <Award className="w-3.5 h-3.5" />
            <span>BSWA DUET Permanent Merit & Hardship Endowment</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-amber-100">
            Merit Scholarship Program
          </h1>
          <p className="text-xs sm:text-sm text-amber-100/80 max-w-xl">
            Ensuring no talented Buddhist engineering student discontinues their university education due to financial distress. Funded by generous alumni and well-wishers worldwide.
          </p>
        </div>

        <button
          onClick={() => {
            setActiveTab('apply');
            setFormSubmitted(false);
          }}
          className="px-6 py-3 rounded-2xl bg-[#d4af37] text-[#3a0610] font-bold text-xs hover:bg-amber-300 shadow-lg transition-all flex items-center gap-2 flex-shrink-0"
        >
          <Award className="w-4 h-4" />
          <span>Apply for 2026 Scholarship</span>
        </button>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-stone-200 dark:border-stone-800 pb-3">
        {[
          { id: 'dashboard', label: 'Scholarship Dashboard', icon: Award },
          { id: 'apply', label: 'Online Application Form', icon: FileText },
          { id: 'recipients', label: `Recipients Archive (${scholarshipRecipients.length})`, icon: Users },
          { id: 'donors', label: `Scholarship Donors (${scholarshipDonors.length})`, icon: HeartHandshake },
          ...(activeRole === 'admin' || activeRole === 'executive'
            ? [{ id: 'admin', label: `Admin Applications Review (${scholarshipApplications.length})`, icon: ShieldCheck }]
            : []),
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                isActive
                  ? 'bg-[#731326] text-white shadow-md'
                  : 'bg-white dark:bg-[#1a0f12] border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-amber-400'
              }`}
            >
              <Icon className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: SCHOLARSHIP DASHBOARD */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8 animate-in fade-in duration-150">
          
          {/* Key Metrics Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-[#1a0f12] border border-amber-900/20 dark:border-amber-800/30 shadow-sm">
              <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                Total Awarded (All Time)
              </div>
              <div className="text-3xl font-serif font-bold text-[#731326] dark:text-amber-300 mt-2">
                {totalScholarshipsCount} Students
              </div>
              <p className="text-[10px] text-stone-400 mt-1">Cumulatively since establishment</p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#1a0f12] border border-amber-900/20 dark:border-amber-800/30 shadow-sm">
              <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                Current Year (2026)
              </div>
              <div className="text-3xl font-serif font-bold text-[#731326] dark:text-amber-300 mt-2">
                {currentYearScholarshipsCount} Scholars
              </div>
              <p className="text-[10px] text-stone-400 mt-1">Stipends allocated across 8 departments</p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#1a0f12] border border-amber-900/20 dark:border-amber-800/30 shadow-sm">
              <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                Endowment Fund Disbursed
              </div>
              <div className="text-3xl font-serif font-bold text-emerald-700 dark:text-emerald-400 mt-2">
                ৳ 28.5 Lakhs
              </div>
              <p className="text-[10px] text-stone-400 mt-1">100% transparent and audited</p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#1a0f12] border border-amber-900/20 dark:border-amber-800/30 shadow-sm">
              <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                Active Donors & Patrons
              </div>
              <div className="text-3xl font-serif font-bold text-amber-600 dark:text-amber-400 mt-2">
                42 Alumni & Wells
              </div>
              <p className="text-[10px] text-stone-400 mt-1">Sponsoring student semester fees</p>
            </div>
          </div>

          {/* Eligibility & Policy Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-[#1a0f12] border border-stone-200 dark:border-stone-800 shadow-sm space-y-3 text-xs">
              <h3 className="font-serif font-bold text-base text-[#731326] dark:text-amber-300 flex items-center gap-2">
                <Award className="w-4 h-4 text-[#d4af37]" />
                <span>Scholarship Categories & Criteria</span>
              </h3>
              <div className="space-y-2 text-stone-600 dark:text-stone-400">
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                  <strong className="text-stone-900 dark:text-stone-100">1. Academic Merit Stipend (BDT 20,000/yr):</strong>
                  <p className="mt-0.5">Awarded to top CGPA achievers (minimum 3.25) in DUET departmental examinations.</p>
                </div>
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                  <strong className="text-stone-900 dark:text-stone-100">2. Financial Hardship Aid (BDT 25,000/yr):</strong>
                  <p className="mt-0.5">Awarded to students whose monthly family income is below BDT 25,000 to cover hall and tuition costs.</p>
                </div>
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                  <strong className="text-stone-900 dark:text-stone-100">3. Emergency Medical & Crisis Aid (BDT 15,000):</strong>
                  <p className="mt-0.5">Disbursed within 48 hours for unforeseen medical emergencies or natural disaster losses.</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50/50 dark:from-[#211116] dark:to-[#170a0e] border border-amber-300 dark:border-amber-800/40 shadow-sm space-y-4 text-xs">
              <h3 className="font-serif font-bold text-base text-[#731326] dark:text-amber-300">
                Ready to Apply for the 2026 Term?
              </h3>
              <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                The online application portal is open for all running DUET undergraduate students. Have your semester marksheet and DUET Student ID card ready for submission.
              </p>
              <div className="space-y-1.5 text-stone-700 dark:text-stone-300">
                <p>• Application Deadline: <strong>April 30, 2026</strong></p>
                <p>• Verification by BSWA Advisory Council: <strong>May 10, 2026</strong></p>
                <p>• Final Award Ceremony: <strong>Buddha Purnima Festival</strong></p>
              </div>
              <button
                onClick={() => setActiveTab('apply')}
                className="w-full py-2.5 rounded-xl bg-[#731326] hover:bg-[#800020] text-white font-bold transition-all text-center"
              >
                Proceed to Scholarship Application Form
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: APPLICATION FORM */}
      {activeTab === 'apply' && (
        <div className="max-w-3xl mx-auto animate-in fade-in duration-150">
          {formSubmitted ? (
            <div className="p-8 rounded-3xl bg-white dark:bg-[#1a0f12] border-2 border-emerald-500 shadow-xl text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h2 className="font-serif font-bold text-2xl text-emerald-800 dark:text-emerald-300">
                Application Submitted Successfully!
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-md mx-auto">
                Your application for the <strong>{formData.scholarshipType}</strong> has been logged in the BSWA Executive portal under DUET ID <strong>{formData.duetId}</strong>.
              </p>
              <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400 max-w-sm mx-auto text-left space-y-1">
                <p><strong>Applicant:</strong> {formData.fullName}</p>
                <p><strong>Department:</strong> {formData.department}</p>
                <p><strong>CGPA:</strong> {formData.cgpa}</p>
                <p><strong>Status:</strong> Under Committee Review</p>
              </div>
              <button
                onClick={() => setFormSubmitted(false)}
                className="px-6 py-2 rounded-xl bg-[#731326] text-white text-xs font-semibold hover:bg-[#800020]"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleApplicationSubmit}
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1a0f12] border border-stone-200 dark:border-stone-800 shadow-md space-y-6"
            >
              <div className="border-b border-stone-200 dark:border-stone-800 pb-3">
                <h2 className="font-serif font-bold text-xl text-[#731326] dark:text-amber-300">
                  BSWA DUET Merit & Welfare Scholarship Application Form
                </h2>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                  Please provide truthful academic and family background information. Misstatements will void eligibility.
                </p>
              </div>

              {/* Personal Information */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#731326] dark:text-amber-400">
                  1. Personal & Academic Profile
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-stone-600 dark:text-stone-400 font-semibold mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100"
                      placeholder="e.g. Sujan Chakma"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 dark:text-stone-400 font-semibold mb-1">DUET Student ID *</label>
                    <input
                      type="text"
                      required
                      value={formData.duetId}
                      onChange={e => setFormData({ ...formData, duetId: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100"
                      placeholder="e.g. 214045"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 dark:text-stone-400 font-semibold mb-1">Department *</label>
                    <select
                      value={formData.department}
                      onChange={e => setFormData({ ...formData, department: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100"
                    >
                      <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                      <option value="Electrical & Electronic Engineering">Electrical & Electronic Engineering</option>
                      <option value="Civil Engineering">Civil Engineering</option>
                      <option value="Mechanical Engineering">Mechanical Engineering</option>
                      <option value="Textile Engineering">Textile Engineering</option>
                      <option value="Industrial & Production Engineering">Industrial & Production Engineering</option>
                      <option value="Chemical & Food Engineering">Chemical & Food Engineering</option>
                      <option value="Materials & Metallurgical Engineering">Materials & Metallurgical Engineering</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-600 dark:text-stone-400 font-semibold mb-1">Current Semester</label>
                    <select
                      value={formData.semester}
                      onChange={e => setFormData({ ...formData, semester: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100"
                    >
                      <option value="1st Semester">1st Semester (Freshers)</option>
                      <option value="2nd Semester">2nd Semester</option>
                      <option value="3rd Semester">3rd Semester</option>
                      <option value="4th Semester">4th Semester</option>
                      <option value="5th Semester">5th Semester</option>
                      <option value="6th Semester">6th Semester</option>
                      <option value="7th Semester">7th Semester</option>
                      <option value="8th Semester">8th Semester</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-600 dark:text-stone-400 font-semibold mb-1">Latest CGPA *</label>
                    <input
                      type="number"
                      step="0.01"
                      min="2.00"
                      max="4.00"
                      required
                      value={formData.cgpa}
                      onChange={e => setFormData({ ...formData, cgpa: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100"
                      placeholder="e.g. 3.75"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 dark:text-stone-400 font-semibold mb-1">Scholarship Category</label>
                    <select
                      value={formData.scholarshipType}
                      onChange={e => setFormData({ ...formData, scholarshipType: e.target.value as any })}
                      className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100"
                    >
                      <option value="Academic Merit">Academic Merit (CGPA 3.25+)</option>
                      <option value="Financial Need">Financial Need Hardship Stipend</option>
                      <option value="Emergency Aid">Emergency Medical/Disaster Aid</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Financial Background */}
              <div className="space-y-3 border-t border-stone-200 dark:border-stone-800 pt-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#731326] dark:text-amber-400">
                  2. Financial Background & Family Hardship
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-stone-600 dark:text-stone-400 font-semibold mb-1">Monthly Family Income (BDT) *</label>
                    <input
                      type="number"
                      required
                      value={formData.familyIncome}
                      onChange={e => setFormData({ ...formData, familyIncome: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100"
                      placeholder="e.g. 18000"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 dark:text-stone-400 font-semibold mb-1">Guardian's Occupation</label>
                    <input
                      type="text"
                      value={formData.guardianOccupation}
                      onChange={e => setFormData({ ...formData, guardianOccupation: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100"
                      placeholder="e.g. Agriculture / Small business"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-stone-600 dark:text-stone-400 font-semibold mb-1">
                      Reason for Applying & Detailed Hardship Statement *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formData.reason}
                      onChange={e => setFormData({ ...formData, reason: e.target.value })}
                      placeholder="Describe your family economic situation, educational expenditures at DUET, and why this scholarship is essential for completing your engineering degree..."
                      className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Document Uploads */}
              <div className="space-y-3 border-t border-stone-200 dark:border-stone-800 pt-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#731326] dark:text-amber-400">
                  3. Document Verification (Marksheet, ID, Recommendation)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl border border-dashed border-stone-300 dark:border-stone-700 text-center">
                    <UploadCloud className="w-5 h-5 text-stone-400 mx-auto mb-1" />
                    <span className="font-semibold block text-stone-700 dark:text-stone-300">Semester Marksheet</span>
                    <span className="text-[10px] text-stone-400 block truncate">
                      {uploadedFiles.marksheet || 'PDF / JPG (Max 5MB)'}
                    </span>
                    <label className="mt-2 inline-block px-2.5 py-1 rounded bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 cursor-pointer text-[10px] font-semibold">
                      Choose File
                      <input
                        type="file"
                        className="hidden"
                        onChange={e => handleFileChange('marksheet', e)}
                      />
                    </label>
                  </div>

                  <div className="p-3 rounded-xl border border-dashed border-stone-300 dark:border-stone-700 text-center">
                    <UploadCloud className="w-5 h-5 text-stone-400 mx-auto mb-1" />
                    <span className="font-semibold block text-stone-700 dark:text-stone-300">DUET Student ID Card</span>
                    <span className="text-[10px] text-stone-400 block truncate">
                      {uploadedFiles.idCard || 'Scanned Front/Back'}
                    </span>
                    <label className="mt-2 inline-block px-2.5 py-1 rounded bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 cursor-pointer text-[10px] font-semibold">
                      Choose File
                      <input
                        type="file"
                        className="hidden"
                        onChange={e => handleFileChange('idCard', e)}
                      />
                    </label>
                  </div>

                  <div className="p-3 rounded-xl border border-dashed border-stone-300 dark:border-stone-700 text-center">
                    <UploadCloud className="w-5 h-5 text-stone-400 mx-auto mb-1" />
                    <span className="font-semibold block text-stone-700 dark:text-stone-300">Faculty Recommendation</span>
                    <span className="text-[10px] text-stone-400 block truncate">
                      {uploadedFiles.recommendation || 'Advisor / Local Sangha'}
                    </span>
                    <label className="mt-2 inline-block px-2.5 py-1 rounded bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 cursor-pointer text-[10px] font-semibold">
                      Choose File
                      <input
                        type="file"
                        className="hidden"
                        onChange={e => handleFileChange('recommendation', e)}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#731326] to-[#540d1a] hover:from-[#800020] text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Verified Scholarship Application</span>
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* TAB 3: RECIPIENTS ARCHIVE WITH EXPORT OPTIONS */}
      {activeTab === 'recipients' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          {/* Header & Export Actions Bar */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#1a0f12] border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif font-bold text-base text-[#731326] dark:text-amber-300">
                Official Scholarship Recipients Archive
              </h3>
              <p className="text-xs text-stone-500">
                Transparent registry of all awarded DUET scholars with department, batch, and award sums.
              </p>
            </div>

            {/* Export Toolbar */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <button
                onClick={handleExportRecipientsCSV}
                className="px-3 py-1.5 rounded-xl border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 font-semibold flex items-center gap-1.5 shadow-xs"
                title="Download CSV spreadsheet"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <span>Export CSV</span>
              </button>

              <button
                onClick={handleExportRecipientsPDF}
                className="px-3 py-1.5 rounded-xl border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 font-semibold flex items-center gap-1.5 shadow-xs"
                title="Print or export as PDF"
              >
                <Download className="w-4 h-4 text-rose-600" />
                <span>Export PDF</span>
              </button>

              <button
                onClick={handleExportRecipientsWord}
                className="px-3 py-1.5 rounded-xl border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 font-semibold flex items-center gap-1.5 shadow-xs"
                title="Download Word (.doc) document"
              >
                <File className="w-4 h-4 text-blue-600" />
                <span>Export Word</span>
              </button>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap items-center gap-3 p-3 rounded-xl bg-stone-50 dark:bg-[#160a0d] border border-stone-200 dark:border-stone-800 text-xs">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
              <input
                type="text"
                value={recipientSearch}
                onChange={e => setRecipientSearch(e.target.value)}
                placeholder="Search recipient name..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900"
              />
            </div>

            <select
              value={recipientYear}
              onChange={e => setRecipientYear(e.target.value)}
              className="p-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900"
            >
              <option value="all">All Award Years</option>
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>

            <select
              value={recipientDept}
              onChange={e => setRecipientDept(e.target.value)}
              className="p-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900"
            >
              <option value="all">All Departments</option>
              <option value="Computer Science & Engineering">CSE</option>
              <option value="Electrical & Electronic Engineering">EEE</option>
              <option value="Civil Engineering">CE</option>
              <option value="Mechanical Engineering">ME</option>
              <option value="Textile Engineering">TE</option>
            </select>
          </div>

          {/* Recipients Table */}
          <div id="bswa-recipients-table" className="overflow-x-auto rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1a0f12] shadow-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-stone-100 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300">
                  <th className="p-3 font-bold">Recipient Name</th>
                  <th className="p-3 font-bold">DUET ID</th>
                  <th className="p-3 font-bold">Department</th>
                  <th className="p-3 font-bold">Batch</th>
                  <th className="p-3 font-bold">CGPA</th>
                  <th className="p-3 font-bold">Scholarship Type</th>
                  <th className="p-3 font-bold">Year</th>
                  <th className="p-3 font-bold text-right">Stipend (BDT)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                {filteredRecipients.map(r => (
                  <tr key={r.id} className="hover:bg-amber-50/50 dark:hover:bg-amber-950/20 transition-colors">
                    <td className="p-3 font-bold text-stone-800 dark:text-stone-100">{r.name}</td>
                    <td className="p-3 font-mono text-stone-600 dark:text-stone-400">{r.duetId}</td>
                    <td className="p-3 text-stone-600 dark:text-stone-400">{r.department}</td>
                    <td className="p-3 text-stone-600 dark:text-stone-400">{r.batch}</td>
                    <td className="p-3 font-semibold text-emerald-700 dark:text-emerald-400">{r.cgpa.toFixed(2)}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-100 dark:bg-amber-950 text-[#731326] dark:text-amber-300">
                        {r.scholarshipType}
                      </span>
                    </td>
                    <td className="p-3 text-stone-600 dark:text-stone-400 font-mono">{r.year}</td>
                    <td className="p-3 text-right font-bold font-mono text-[#731326] dark:text-amber-300">
                      ৳ {r.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: SCHOLARSHIP DONORS DIRECTORY */}
      {activeTab === 'donors' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="border-b border-stone-200 dark:border-stone-800 pb-3">
            <h3 className="font-serif font-bold text-lg text-[#731326] dark:text-amber-300">
              Honorable Scholarship Donors & Benefactors
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Heartfelt gratitude to our distinguished alumni, engineers, and Buddhist patrons providing recurring endowments for student stipends.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {scholarshipDonors.map(donor => (
              <div
                key={donor.id}
                className="p-5 rounded-3xl bg-white dark:bg-[#1a0f12] border-2 border-[#d4af37]/30 shadow-md space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <span className={`text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full border ${
                      donor.tier === 'Platinum'
                        ? 'bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 border-purple-300'
                        : donor.tier === 'Gold'
                        ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border-amber-300'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-300'
                    }`}>
                      {donor.tier} Patron
                    </span>
                    <span className="text-[10px] text-stone-400 font-mono">Since {donor.sinceYear}</span>
                  </div>

                  <div>
                    <h4 className="font-serif font-bold text-base text-[#731326] dark:text-amber-300">
                      {donor.donorName}
                    </h4>
                    <p className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                      {donor.profession}
                    </p>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400">
                      {donor.location}
                    </p>
                  </div>

                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed italic border-t border-dashed border-stone-200 dark:border-stone-800 pt-2">
                    "{donor.notes}"
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                  <span className="text-stone-500 text-[11px]">Cumulative Contribution:</span>
                  <span className="font-serif font-bold text-sm text-[#731326] dark:text-amber-300">
                    ৳ {donor.totalContributed.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: ADMIN APPLICATION MANAGEMENT */}
      {activeTab === 'admin' && (activeRole === 'admin' || activeRole === 'executive') && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="border-b border-stone-200 dark:border-stone-800 pb-3 flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-lg text-[#731326] dark:text-amber-300 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#d4af37]" />
                <span>Executive Committee Scholarship Review Portal</span>
              </h3>
              <p className="text-xs text-stone-500">
                Review submitted marksheet transcripts, verify financial hardship, and approve/reject stipends.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {scholarshipApplications.map(app => (
              <div
                key={app.id}
                className="p-5 rounded-2xl bg-white dark:bg-[#1a0f12] border border-stone-200 dark:border-stone-800 shadow-sm space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 dark:border-stone-800 pb-2.5">
                  <div>
                    <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                      {app.applicantName} (DUET ID: {app.duetId})
                    </h4>
                    <p className="text-xs text-stone-500">
                      {app.department} • {app.semester} • Applied on {app.appliedAt}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      app.status === 'approved'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : app.status === 'rejected'
                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      {app.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-stone-600 dark:text-stone-400">
                  <div>
                    <span className="block text-[10px] text-stone-400">CGPA</span>
                    <span className="font-bold text-stone-800 dark:text-stone-100">{app.cgpa.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-stone-400">Family Income</span>
                    <span className="font-bold text-stone-800 dark:text-stone-100">৳ {app.familyMonthlyIncome.toLocaleString()}/mo</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-stone-400">Scholarship Type</span>
                    <span className="font-bold text-[#731326] dark:text-amber-300">{app.scholarshipType}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-stone-400">Transcripts Attached</span>
                    <span className="text-emerald-600 font-semibold flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Verified Docs
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900 text-xs text-stone-700 dark:text-stone-300">
                  <strong>Hardship Justification:</strong> {app.reasonForApplying}
                </div>

                {app.status === 'pending' && (
                  <div className="pt-2 flex gap-3">
                    <button
                      onClick={() => updateScholarshipStatus(app.id, 'approved', 20000)}
                      className="flex-1 py-2 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Approve & Disburse BDT 20,000</span>
                    </button>
                    <button
                      onClick={() => updateScholarshipStatus(app.id, 'rejected')}
                      className="py-2 px-4 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Reject</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
