import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, Mail, Lock, User as UserIcon, Shield, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { OfficialLogo } from './OfficialLogo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'register';
  defaultRegisterType?: 'student' | 'alumni';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'login',
  defaultRegisterType = 'student',
}) => {
  const {
    otpState,
    startRegistration,
    verifyOtp,
    resendOtp,
    closeOtpModal,
    loginUser,
    language
  } = useApp();

  const [activeTab, setActiveTab] = useState<'login' | 'register'>(defaultTab);
  const [registerType, setRegisterType] = useState<'student' | 'alumni'>(defaultRegisterType);

  // Login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Register Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [bloodGroup, setBloodGroup] = useState('B+');
  const [department, setDepartment] = useState('Computer Science & Engineering');

  // Student specific
  const [duetId, setDuetId] = useState('');
  const [batch, setBatch] = useState('21st');
  const [hall, setHall] = useState('Dr. F. R. Khan Hall');

  // Alumni specific
  const [graduationBatch, setGraduationBatch] = useState('14th Batch');
  const [currentProfession, setCurrentProfession] = useState('');
  const [company, setCompany] = useState('');
  const [currentLocation, setCurrentLocation] = useState('Dhaka, Bangladesh');

  // OTP inputs
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpMessage, setOtpMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [timeLeft, setTimeLeft] = useState(300);
  const [resendCooldown, setResendCooldown] = useState(60);

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  useEffect(() => {
    setRegisterType(defaultRegisterType);
  }, [defaultRegisterType]);

  // Timer for OTP
  useEffect(() => {
    if (!otpState.isOpen) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const remainExpiry = Math.max(0, Math.floor((otpState.expiresAt - now) / 1000));
      const remainResend = Math.max(0, Math.floor((otpState.resendAt - now) / 1000));
      setTimeLeft(remainExpiry);
      setResendCooldown(remainResend);
    }, 1000);

    return () => clearInterval(interval);
  }, [otpState.isOpen, otpState.expiresAt, otpState.resendAt]);

  if (!isOpen && !otpState.isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!loginEmail) {
      setLoginError('Please enter your registered email.');
      return;
    }
    const ok = loginUser(loginEmail);
    if (ok) {
      onClose();
    } else {
      setLoginError('Invalid email or account is pending executive approval.');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) {
      alert('Please fill out all mandatory contact fields.');
      return;
    }

    if (registerType === 'student' && !duetId) {
      alert('Please provide your DUET Student ID.');
      return;
    }

    startRegistration(registerType, {
      fullName,
      email,
      phone,
      bloodGroup,
      department,
      duetId,
      batch,
      hall,
      graduationBatch,
      currentProfession,
      company,
      currentLocation,
    });
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpMessage(null);
    const res = verifyOtp(enteredOtp);
    if (res.success) {
      setOtpMessage({ type: 'success', text: res.message });
      setTimeout(() => {
        setOtpMessage(null);
        setEnteredOtp('');
        onClose();
      }, 3000);
    } else {
      setOtpMessage({ type: 'error', text: res.message });
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#1a0f12] rounded-2xl shadow-2xl border border-amber-900/20 dark:border-amber-700/30 overflow-hidden my-8">
        
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-[#731326] via-[#540d1a] to-[#3a0610] p-6 text-white text-center relative">
          <button
            onClick={() => {
              onClose();
              closeOtpModal();
            }}
            className="absolute top-4 right-4 p-1.5 rounded-full text-amber-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex justify-center mb-2">
            <OfficialLogo size="md" showText={false} />
          </div>
          <h2 className="text-xl font-serif font-bold text-amber-100 tracking-wide">
            {otpState.isOpen ? 'Email OTP Verification' : (activeTab === 'login' ? 'BSWA DUET Portal Login' : 'New Member Registration')}
          </h2>
          <p className="text-xs text-amber-200/80 mt-1">
            {otpState.isOpen
              ? 'Security verification code sent to your registered email'
              : 'Official digital platform for Buddhist students & alumni of DUET Gazipur'}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* OTP Flow Active View */}
          {otpState.isOpen ? (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/60 rounded-xl p-4 text-xs text-amber-900 dark:text-amber-200 space-y-2">
                <div className="flex items-center gap-2 font-semibold text-sm text-[#731326] dark:text-amber-300">
                  <Clock className="w-4 h-4" />
                  <span>Verify Email OTP</span>
                </div>
                <p>
                  A 6-digit verification code has been dispatched to{' '}
                  <strong className="font-mono text-[#800020] dark:text-amber-200">{otpState.email}</strong>.
                </p>
                <div className="p-2 bg-white/70 dark:bg-black/30 rounded border border-amber-200/60 text-[11px]">
                  💡 <em>For instant testing preview, your code is:</em> <strong className="font-mono text-sm text-[#731326] dark:text-amber-300">{otpState.code}</strong> (or enter <strong>123456</strong>)
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-2">
                  Enter 6-Digit Verification Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={enteredOtp}
                  onChange={e => setEnteredOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="• • • • • •"
                  className="w-full text-center tracking-[0.6em] text-2xl font-mono py-3 px-4 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-[#731326] focus:border-transparent outline-none"
                  autoFocus
                />
              </div>

              <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#731326]" />
                  <span>Expires in: <strong>{formatTimer(timeLeft)}</strong></span>
                </div>

                <button
                  type="button"
                  onClick={resendOtp}
                  disabled={resendCooldown > 0}
                  className={`font-semibold transition-colors ${
                    resendCooldown > 0
                      ? 'text-stone-400 cursor-not-allowed'
                      : 'text-[#731326] dark:text-amber-400 hover:underline'
                  }`}
                >
                  {resendCooldown > 0 ? `Resend code (${resendCooldown}s)` : 'Resend OTP'}
                </button>
              </div>

              {otpMessage && (
                <div
                  className={`p-3 rounded-xl text-xs flex items-start gap-2 ${
                    otpMessage.type === 'success'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 dark:bg-emerald-950/50 dark:text-emerald-200'
                      : 'bg-rose-50 text-rose-800 border border-rose-300 dark:bg-rose-950/50 dark:text-rose-200'
                  }`}
                >
                  {otpMessage.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-600" />
                  ) : (
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-600" />
                  )}
                  <span>{otpMessage.text}</span>
                </div>
              )}

              <div className="p-3 rounded-lg bg-stone-100 dark:bg-stone-800/60 text-[11px] text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700">
                <span className="font-semibold text-stone-800 dark:text-stone-100">Official Protocol Note:</span> Once OTP is verified, your account status is registered as <em>Pending Admin Approval</em>. The DUET BSWA Executive Committee reviews credentials before activation.
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeOtpModal}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-stone-300 dark:border-stone-700 text-xs font-semibold text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#731326] to-[#540d1a] hover:from-[#800020] hover:to-[#600e1f] text-white text-xs font-semibold shadow-md transition-colors"
                >
                  Verify & Submit Registration
                </button>
              </div>
            </form>
          ) : (
            <>
              {/* Tab Selector: Login vs Register */}
              <div className="flex border-b border-stone-200 dark:border-stone-800 mb-5">
                <button
                  onClick={() => setActiveTab('login')}
                  className={`flex-1 pb-3 text-xs font-semibold tracking-wide transition-colors relative ${
                    activeTab === 'login'
                      ? 'text-[#731326] dark:text-amber-400 border-b-2 border-[#731326] dark:border-amber-400'
                      : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                  }`}
                >
                  Member Login
                </button>
                <button
                  onClick={() => setActiveTab('register')}
                  className={`flex-1 pb-3 text-xs font-semibold tracking-wide transition-colors relative ${
                    activeTab === 'register'
                      ? 'text-[#731326] dark:text-amber-400 border-b-2 border-[#731326] dark:border-amber-400'
                      : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                  }`}
                >
                  Register New Account
                </button>
              </div>

              {/* LOGIN TAB */}
              {activeTab === 'login' && (
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  {loginError && (
                    <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-200 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{loginError}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
                      <input
                        type="email"
                        required
                        value={loginEmail}
                        onChange={e => setLoginEmail(e.target.value)}
                        placeholder="e.g., admin@bswa-duet.org or student@duet.ac.bd"
                        className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-[#731326] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
                      <input
                        type="password"
                        required
                        value={loginPassword}
                        onChange={e => setLoginPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-[#731326] outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#731326] to-[#540d1a] hover:from-[#800020] text-white text-xs font-semibold shadow-md transition-colors"
                  >
                    Sign In with Email
                  </button>

                  <div className="relative my-3 text-center">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-stone-200 dark:border-stone-800"></div>
                    </div>
                    <span className="relative bg-white dark:bg-[#1a0f12] px-2 text-[10px] text-stone-400 uppercase tracking-wider">
                      Demo Quick Sign-In
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <button
                      type="button"
                      onClick={() => {
                        setLoginEmail('admin@bswa-duet.org');
                        setLoginPassword('password123');
                        loginUser('admin@bswa-duet.org');
                        onClose();
                      }}
                      className="p-2 rounded-lg border border-amber-300/80 bg-amber-50 dark:bg-amber-950/30 text-[#731326] dark:text-amber-300 font-semibold hover:bg-amber-100 transition-colors text-left"
                    >
                      <div className="font-bold">Super Admin</div>
                      <div className="text-[9px] text-stone-500 dark:text-stone-400">admin@bswa-duet.org</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setLoginEmail('chakmanoyon72@gmail.com');
                        setLoginPassword('password123');
                        loginUser('chakmanoyon72@gmail.com');
                        onClose();
                      }}
                      className="p-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-700 dark:text-stone-200 font-semibold hover:bg-stone-100 transition-colors text-left"
                    >
                      <div className="font-bold">Executive Member</div>
                      <div className="text-[9px] text-stone-500 dark:text-stone-400">chakmanoyon72@gmail.com</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setLoginEmail('ushasi.barua@student.duet.ac.bd');
                        setLoginPassword('password123');
                        loginUser('ushasi.barua@student.duet.ac.bd');
                        onClose();
                      }}
                      className="p-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-700 dark:text-stone-200 font-semibold hover:bg-stone-100 transition-colors text-left"
                    >
                      <div className="font-bold">Running Student</div>
                      <div className="text-[9px] text-stone-500 dark:text-stone-400">ushasi.barua@student...</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setLoginEmail('amitava.engr@duet-alumni.org');
                        setLoginPassword('password123');
                        loginUser('amitava.engr@duet-alumni.org');
                        onClose();
                      }}
                      className="p-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-700 dark:text-stone-200 font-semibold hover:bg-stone-100 transition-colors text-left"
                    >
                      <div className="font-bold">Alumni Engineer</div>
                      <div className="text-[9px] text-stone-500 dark:text-stone-400">amitava.engr@duet...</div>
                    </button>
                  </div>
                </form>
              )}

              {/* REGISTER TAB */}
              {activeTab === 'register' && (
                <form onSubmit={handleRegisterSubmit} className="space-y-3.5 max-h-[60vh] overflow-y-auto pr-1">
                  {/* Register Role Toggle */}
                  <div className="flex bg-stone-100 dark:bg-stone-800 p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setRegisterType('student')}
                      className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                        registerType === 'student'
                          ? 'bg-white dark:bg-[#2a171c] text-[#731326] dark:text-amber-300 shadow-sm'
                          : 'text-stone-600 dark:text-stone-400'
                      }`}
                    >
                      Running DUET Student
                    </button>
                    <button
                      type="button"
                      onClick={() => setRegisterType('alumni')}
                      className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                        registerType === 'alumni'
                          ? 'bg-white dark:bg-[#2a171c] text-[#731326] dark:text-amber-300 shadow-sm'
                          : 'text-stone-600 dark:text-stone-400'
                      }`}
                    >
                      DUET Alumni Member
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-stone-700 dark:text-stone-300 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        placeholder="e.g. Priyo Jyoti Chakma"
                        className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-stone-700 dark:text-stone-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="name@gmail.com"
                        className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-stone-700 dark:text-stone-300 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="+880 1700-000000"
                        className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-stone-700 dark:text-stone-300 mb-1">
                        Blood Group *
                      </label>
                      <select
                        value={bloodGroup}
                        onChange={e => setBloodGroup(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 outline-none"
                      >
                        {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
                          <option key={bg} value={bg}>{bg}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-stone-700 dark:text-stone-300 mb-1">
                      Department at DUET *
                    </label>
                    <select
                      value={department}
                      onChange={e => setDepartment(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 outline-none"
                    >
                      <option value="Computer Science & Engineering">Computer Science & Engineering (CSE)</option>
                      <option value="Electrical & Electronic Engineering">Electrical & Electronic Engineering (EEE)</option>
                      <option value="Mechanical Engineering">Mechanical Engineering (ME)</option>
                      <option value="Civil Engineering">Civil Engineering (CE)</option>
                      <option value="Textile Engineering">Textile Engineering (TE)</option>
                      <option value="Industrial & Production Engineering">Industrial & Production Engineering (IPE)</option>
                      <option value="Architecture">Architecture (Arch)</option>
                      <option value="Chemical Engineering">Chemical Engineering (ChE)</option>
                    </select>
                  </div>

                  {/* Student Specific Fields */}
                  {registerType === 'student' && (
                    <div className="p-3 bg-stone-50 dark:bg-stone-900/70 rounded-xl border border-stone-200 dark:border-stone-800 space-y-3">
                      <div className="text-xs font-bold text-[#731326] dark:text-amber-400">
                        DUET Academic Information
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div>
                          <label className="block text-[10px] text-stone-600 dark:text-stone-400 mb-0.5">DUET ID *</label>
                          <input
                            type="text"
                            required
                            value={duetId}
                            onChange={e => setDuetId(e.target.value)}
                            placeholder="e.g. 214012"
                            className="w-full px-2.5 py-1.5 text-xs rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-stone-600 dark:text-stone-400 mb-0.5">Batch *</label>
                          <input
                            type="text"
                            required
                            value={batch}
                            onChange={e => setBatch(e.target.value)}
                            placeholder="e.g. 21st"
                            className="w-full px-2.5 py-1.5 text-xs rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-stone-600 dark:text-stone-400 mb-0.5">Hall Name</label>
                          <select
                            value={hall}
                            onChange={e => setHall(e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
                          >
                            <option value="Dr. F. R. Khan Hall">Dr. F. R. Khan Hall</option>
                            <option value="Kazi Nazrul Islam Hall">Kazi Nazrul Islam Hall</option>
                            <option value="Shaheed Tajuddin Ahmad Hall">Shaheed Tajuddin Ahmad Hall</option>
                            <option value="Marie Curie Hall">Marie Curie Hall (Female)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Alumni Specific Fields */}
                  {registerType === 'alumni' && (
                    <div className="p-3 bg-amber-50/50 dark:bg-amber-950/20 rounded-xl border border-amber-200/60 dark:border-amber-900/40 space-y-3">
                      <div className="text-xs font-bold text-[#731326] dark:text-amber-400">
                        Alumni Professional Background
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] text-stone-600 dark:text-stone-400 mb-0.5">Graduation Batch *</label>
                          <input
                            type="text"
                            required
                            value={graduationBatch}
                            onChange={e => setGraduationBatch(e.target.value)}
                            placeholder="e.g. 14th Batch"
                            className="w-full px-2.5 py-1.5 text-xs rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-stone-600 dark:text-stone-400 mb-0.5">Current Profession</label>
                          <input
                            type="text"
                            value={currentProfession}
                            onChange={e => setCurrentProfession(e.target.value)}
                            placeholder="e.g. Senior Software Engineer"
                            className="w-full px-2.5 py-1.5 text-xs rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] text-stone-600 dark:text-stone-400 mb-0.5">Company / Organization</label>
                          <input
                            type="text"
                            value={company}
                            onChange={e => setCompany(e.target.value)}
                            placeholder="e.g. BPDB / Walton / Robi"
                            className="w-full px-2.5 py-1.5 text-xs rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-stone-600 dark:text-stone-400 mb-0.5">Current Location</label>
                          <input
                            type="text"
                            value={currentLocation}
                            onChange={e => setCurrentLocation(e.target.value)}
                            placeholder="e.g. Dhaka, Bangladesh"
                            className="w-full px-2.5 py-1.5 text-xs rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#731326] to-[#540d1a] hover:from-[#800020] text-white text-xs font-semibold shadow-md transition-colors flex items-center justify-center gap-2"
                    >
                      <Shield className="w-4 h-4" />
                      <span>Proceed to 6-Digit Email OTP Verification</span>
                    </button>
                    <p className="text-[10px] text-center text-stone-500 mt-2">
                      A 6-digit OTP code will be generated to verify your email address.
                    </p>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
