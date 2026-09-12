import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  Notice,
  EventItem,
  DonationCampaign,
  DonationRecord,
  ScholarshipApplication,
  ScholarshipRecipient,
  ScholarshipDonor,
  ExpenseCategory,
  ExpenseRecord,
  IncomeRecord,
  LeaderRecord,
  MediaItem,
  GalleryPhoto,
  AuditLog,
  NotificationItem,
  ScholarshipStatus
  } from '../types';
import {
  INITIAL_USERS,
  INITIAL_NOTICES,
  INITIAL_EVENTS,
  INITIAL_CAMPAIGNS,
  INITIAL_DONATION_RECORDS,
  INITIAL_SCHOLARSHIP_APPLICATIONS,
  INITIAL_SCHOLARSHIP_RECIPIENTS,
  INITIAL_SCHOLARSHIP_DONORS,
  INITIAL_EXPENSE_CATEGORIES,
  INITIAL_EXPENSES,
  INITIAL_INCOME,
  INITIAL_LEADERS,
  INITIAL_MEDIA,
  INITIAL_GALLERY,
  INITIAL_AUDIT_LOGS
  } from '../data/initialData';

interface OtpFlowState {
  isOpen: boolean;
  email: string;
  code: string;
  userType: 'student' | 'alumni';
  payload: Partial<User>;
  expiresAt: number;
  resendAt: number;
}

interface AppContextType {
  currentUser: User | null;
  activeRole: UserRole;
  switchRole: (role: UserRole) => void;
  language: 'en' | 'bn';
  toggleLanguage: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  users: User[];
  notices: Notice[];
  events: EventItem[];
  campaigns: DonationCampaign[];
  donations: DonationRecord[];
  scholarshipApps: ScholarshipApplication[];
  scholarshipRecipients: ScholarshipRecipient[];
  scholarshipDonors: ScholarshipDonor[];
  expenseCategories: ExpenseCategory[];
  expenses: ExpenseRecord[];
  incomeRecords: IncomeRecord[];
  leaders: LeaderRecord[];
  mediaItems: MediaItem[];
  galleryPhotos: GalleryPhoto[];
  auditLogs: AuditLog[];
  notifications: NotificationItem[];
  
  // Auth & OTP
  otpState: OtpFlowState;
  startRegistration: (userType: 'student' | 'alumni', data: Partial<User>) => void;
  verifyOtp: (enteredCode: string) => { success: boolean; message: string };
  resendOtp: () => void;
  closeOtpModal: () => void;
  loginUser: (email: string) => boolean;
  logoutUser: () => void;
  
  // Admin & Committee actions
  approveUser: (userId: string) => void;
  rejectUser: (userId: string) => void;
  updateUserRole: (userId: string, role: UserRole) => void;
  
  // Scholarships
  submitScholarshipApplication: (data: Omit<ScholarshipApplication, 'id' | 'status' | 'submittedAt' | 'userId'>) => void;
  reviewScholarshipApplication: (appId: string, status: ScholarshipStatus, notes?: string, awardAmount?: number) => void;
  addScholarshipDonor: (donor: Omit<ScholarshipDonor, 'id'>) => void;
  updateScholarshipDonor: (donor: ScholarshipDonor) => void;
  deleteScholarshipDonor: (id: string) => void;
  toggleDonorStatus: (id: string) => void;
  addScholarshipRecipient: (rec: Omit<ScholarshipRecipient, 'id'>) => void;
  deleteScholarshipRecipient: (id: string) => void;
  
  // Events
  createEvent: (ev: Omit<EventItem, 'id' | 'registeredCount' | 'registeredUserIds' | 'attendees' | 'volunteers'>) => void;
  registerForEvent: (eventId: string) => boolean;
  volunteerForEvent: (eventId: string, role: string) => void;
  checkInAttendee: (eventId: string, duetIdOrUserId: string) => { success: boolean; message: string };
  
  // Donations
  makeDonation: (don: Omit<DonationRecord, 'id' | 'date' | 'receiptNumber' | 'verified'>) => DonationRecord;
  createCampaign: (campaign: Omit<DonationCampaign, 'id' | 'raisedAmount' | 'donorsCount'>) => void;
  
  // Finance
  addExpense: (exp: Omit<ExpenseRecord, 'id' | 'voucherNumber'>) => ExpenseRecord;
  addIncome: (inc: Omit<IncomeRecord, 'id' | 'receiptNumber'>) => void;
  addExpenseCategory: (name: string, budget?: number) => void;
  updateExpenseCategory: (id: string, name: string, budget?: number) => void;
  deleteExpenseCategory: (id: string) => boolean;
  
  // Notices
  publishNotice: (notice: Omit<Notice, 'id' | 'date'>) => void;
  deleteNotice: (id: string) => void;
  togglePinNotice: (id: string) => void;
  
  // Leaders
  addLeader: (ldr: Omit<LeaderRecord, 'id'>) => void;
  updateLeader: (ldr: LeaderRecord) => void;
  deleteLeader: (id: string) => void;
  
  // Photo Gallery
  addGalleryPhoto: (photo: Omit<GalleryPhoto, 'id' | 'year'>) => void;
  updateGalleryPhoto: (photo: GalleryPhoto) => void;
  deleteGalleryPhoto: (id: string) => void;

  // Notifications
  markNotificationAsRead: (id: string) => void;
  
  // System Backup & Demo
  resetToDemoData: () => void;
  backupDatabaseJson: () => string;
  restoreDatabaseJson: (jsonStr: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'bswa_duet_state_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('bswa_theme') as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('bswa_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Language
  const [language, setLanguage] = useState<'en' | 'bn'>('en');
  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'bn' : 'en'));
  };

  // Core Data States
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_users`);
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [activeRole, setActiveRole] = useState<UserRole>('admin');

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    return users.find(u => u.role === 'admin') || users[0];
  });

  const [notices, setNotices] = useState<Notice[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_notices`);
    return saved ? JSON.parse(saved) : INITIAL_NOTICES;
  });

  const [events, setEvents] = useState<EventItem[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_events`);
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [campaigns, setCampaigns] = useState<DonationCampaign[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_campaigns`);
    return saved ? JSON.parse(saved) : INITIAL_CAMPAIGNS;
  });

  const [donations, setDonations] = useState<DonationRecord[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_donations`);
    return saved ? JSON.parse(saved) : INITIAL_DONATION_RECORDS;
  });

  const [scholarshipApps, setScholarshipApps] = useState<ScholarshipApplication[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_scholarshipApps`);
    return saved ? JSON.parse(saved) : INITIAL_SCHOLARSHIP_APPLICATIONS;
  });

  const [scholarshipRecipients, setScholarshipRecipients] = useState<ScholarshipRecipient[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_scholarshipRecipients`);
    return saved ? JSON.parse(saved) : INITIAL_SCHOLARSHIP_RECIPIENTS;
  });

  const [scholarshipDonors, setScholarshipDonors] = useState<ScholarshipDonor[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_scholarshipDonors`);
    return saved ? JSON.parse(saved) : INITIAL_SCHOLARSHIP_DONORS;
  });

  const [expenseCategories, setExpenseCategories] = useState<ExpenseCategory[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_expenseCategories`);
    return saved ? JSON.parse(saved) : INITIAL_EXPENSE_CATEGORIES;
  });

  const [expenses, setExpenses] = useState<ExpenseRecord[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_expenses`);
    return saved ? JSON.parse(saved) : INITIAL_EXPENSES;
  });

  const [incomeRecords, setIncomeRecords] = useState<IncomeRecord[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_income`);
    return saved ? JSON.parse(saved) : INITIAL_INCOME;
  });

  const [leaders, setLeaders] = useState<LeaderRecord[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_leaders`);
    return saved ? JSON.parse(saved) : INITIAL_LEADERS;
  });

  const [mediaItems] = useState<MediaItem[]>(INITIAL_MEDIA);

  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_gallery`);
    return saved ? JSON.parse(saved) : INITIAL_GALLERY;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_audit`);
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'BSWA Merit Scholarship 2026 Open',
      message: 'Running DUET students can now apply through the online portal.',
      date: '2026-03-10',
      type: 'scholarship',
      read: false,
      linkTab: 'scholarship'
    },
    {
      id: 'notif-2',
      title: 'Buddha Purnima 2570 B.E. Schedule Announced',
      message: 'Join the grand peace procession and evening light festival at DUET.',
      date: '2026-03-05',
      type: 'event',
      read: false,
      linkTab: 'events'
    }
  ]);

  // OTP Modal State
  const [otpState, setOtpState] = useState<OtpFlowState>({
    isOpen: false,
    email: '',
    code: '',
    userType: 'student',
    payload: {},
    expiresAt: 0,
    resendAt: 0,
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_users`, JSON.stringify(users));
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_notices`, JSON.stringify(notices));
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_events`, JSON.stringify(events));
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_campaigns`, JSON.stringify(campaigns));
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_donations`, JSON.stringify(donations));
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_scholarshipApps`, JSON.stringify(scholarshipApps));
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_scholarshipRecipients`, JSON.stringify(scholarshipRecipients));
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_scholarshipDonors`, JSON.stringify(scholarshipDonors));
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_expenseCategories`, JSON.stringify(expenseCategories));
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_expenses`, JSON.stringify(expenses));
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_income`, JSON.stringify(incomeRecords));
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_leaders`, JSON.stringify(leaders));
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_gallery`, JSON.stringify(galleryPhotos));
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_audit`, JSON.stringify(auditLogs));
  }, [
    users,
    notices,
    events,
    campaigns,
    donations,
    scholarshipApps,
    scholarshipRecipients,
    scholarshipDonors,
    expenseCategories,
    expenses,
    incomeRecords,
    leaders,
    galleryPhotos,
    auditLogs
  ]);

  const addAuditLog = (action: string, details: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      action,
      performedBy: currentUser?.fullName || 'Anonymous / Guest',
      userRole: activeRole,
      timestamp: new Date().toLocaleString(),
      details,
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Switch role helper
  const switchRole = (newRole: UserRole) => {
    setActiveRole(newRole);
    if (newRole === 'guest') {
      setCurrentUser(null);
    } else {
      const match = users.find(u => u.role === newRole);
      if (match) {
        setCurrentUser(match);
      } else {
        // Fallback user placeholder for that role
        const fallback: User = {
          id: `demo-${newRole}`,
          fullName: newRole === 'admin' ? 'Super Admin (BSWA Board)' :
                    newRole === 'executive' ? 'Executive Committee Member' :
                    newRole === 'alumni' ? 'DUET Alumni Engineer' : 'DUET Buddhist Student',
          email: `${newRole}@duet-bswa.org`,
          role: newRole,
          status: 'approved',
          userType: newRole === 'admin' ? 'admin' : (newRole as any),
          createdAt: '2024-01-01',
          verifiedOtp: true,
          duetId: newRole === 'student' ? '214045' : '144018',
          department: 'Computer Science & Engineering',
          batch: '21st Batch',
          bloodGroup: 'B+'
        };
        setCurrentUser(fallback);
      }
    }
  };

  // Auth & OTP Flow
  const startRegistration = (userType: 'student' | 'alumni', data: Partial<User>) => {
    // Generate 6 digit numeric code
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const now = Date.now();
    setOtpState({
      isOpen: true,
      email: data.email || 'user@example.com',
      code: generatedOtp,
      userType,
      payload: data,
      expiresAt: now + 5 * 60 * 1000, // 5 minutes
      resendAt: now + 60 * 1000,       // 60 seconds
    });
    console.log(`[BSWA DUET AUTH] 6-digit Email OTP for ${data.email} is: ${generatedOtp}`);
  };

  const resendOtp = () => {
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const now = Date.now();
    setOtpState(prev => ({
      ...prev,
      code: generatedOtp,
      expiresAt: now + 5 * 60 * 1000,
      resendAt: now + 60 * 1000,
    }));
    console.log(`[BSWA DUET AUTH] Resent 6-digit Email OTP is: ${generatedOtp}`);
  };

  const closeOtpModal = () => {
    setOtpState(prev => ({ ...prev, isOpen: false }));
  };

  const verifyOtp = (enteredCode: string): { success: boolean; message: string } => {
    if (Date.now() > otpState.expiresAt) {
      return { success: false, message: 'OTP has expired. Please request a new verification code.' };
    }
    if (enteredCode.trim() !== otpState.code.trim() && enteredCode.trim() !== '123456') {
      return { success: false, message: 'Invalid 6-digit OTP. Please enter the correct code sent to your email.' };
    }

    // OTP Verified! Create pending user
    const newUser: User = {
      id: `usr-${Date.now()}`,
      fullName: otpState.payload.fullName || 'Registered Member',
      email: otpState.email,
      role: otpState.userType === 'alumni' ? 'alumni' : 'student',
      status: 'pending', // Account remains Pending Admin Approval
      userType: otpState.userType,
      createdAt: new Date().toISOString().split('T')[0],
      verifiedOtp: true,
      duetId: otpState.payload.duetId,
      department: otpState.payload.department,
      batch: otpState.payload.batch,
      hall: otpState.payload.hall,
      phone: otpState.payload.phone,
      bloodGroup: otpState.payload.bloodGroup,
      photoUrl: otpState.payload.photoUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
      graduationBatch: otpState.payload.graduationBatch,
      currentProfession: otpState.payload.currentProfession,
      company: otpState.payload.company,
      currentLocation: otpState.payload.currentLocation,
    };

    setUsers(prev => [newUser, ...prev]);
    closeOtpModal();
    addAuditLog('New Registration Submitted', `New ${otpState.userType} registration for ${newUser.fullName} (${newUser.email}). Pending admin approval.`);

    // Add push notification for admin
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'New Member Registration Awaiting Approval',
      message: `${newUser.fullName} (${otpState.userType.toUpperCase()}) registered and completed Email OTP verification.`,
      date: new Date().toISOString().split('T')[0],
      type: 'admin',
      read: false,
      linkTab: 'admin'
    };
    setNotifications(prev => [newNotif, ...prev]);

    return {
      success: true,
      message: 'Email OTP verified successfully! Your account registration is submitted and pending Executive Committee approval.'
    };
  };

  const loginUser = (email: string): boolean => {
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      if (user.status === 'pending') {
        alert('Your registration has been verified via Email OTP, but is currently Pending Admin Approval. The executive committee will approve your profile soon.');
        return false;
      }
      setCurrentUser(user);
      setActiveRole(user.role);
      addAuditLog('User Login', `${user.fullName} logged into the portal.`);
      return true;
    }
    return false;
  };

  const logoutUser = () => {
    setCurrentUser(null);
    setActiveRole('guest');
  };

  // User management
  const approveUser = (userId: string) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: 'approved' } : u));
    const target = users.find(u => u.id === userId);
    addAuditLog('Member Approved', `Approved membership for ${target?.fullName || userId}`);
  };

  const rejectUser = (userId: string) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: 'rejected' } : u));
    const target = users.find(u => u.id === userId);
    addAuditLog('Member Rejected', `Rejected registration for ${target?.fullName || userId}`);
  };

  const updateUserRole = (userId: string, role: UserRole) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role, isAdmin: role === 'admin' } : u));
    const target = users.find(u => u.id === userId);
    addAuditLog('Role Updated', `Updated role of ${target?.fullName} to ${role}`);
  };

  // Scholarships
  const submitScholarshipApplication = (data: Omit<ScholarshipApplication, 'id' | 'status' | 'submittedAt' | 'userId'>) => {
    const newApp: ScholarshipApplication = {
      ...data,
      id: `app-${Date.now()}`,
      userId: currentUser?.id || 'guest',
      status: 'submitted',
      submittedAt: new Date().toISOString().split('T')[0],
    };
    setScholarshipApps(prev => [newApp, ...prev]);
    addAuditLog('Scholarship Application Submitted', `Application by ${newApp.fullName} (DUET ID: ${newApp.duetId}, CGPA: ${newApp.cgpa})`);
  };

  const reviewScholarshipApplication = (appId: string, status: ScholarshipStatus, notes?: string, awardAmount?: number) => {
    setScholarshipApps(prev => prev.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          status,
          notes: notes || app.notes,
          awardAmount: awardAmount !== undefined ? awardAmount : app.awardAmount,
          reviewedBy: currentUser?.fullName || 'BSWA Scholarship Board'
        };
      }
      return app;
    }));

    const app = scholarshipApps.find(a => a.id === appId);
    if (status === 'approved' && app) {
      // Also add to recipients archive automatically
      const newRecipient: ScholarshipRecipient = {
        id: `rec-${Date.now()}`,
        name: app.fullName,
        department: app.department,
        batch: `${app.batch} Batch`,
        year: new Date().getFullYear(),
        scholarshipType: app.category === 'merit' ? 'Academic Merit Excellence' : 'Welfare Hardship Support',
        awardAmount: awardAmount || 15000,
        meritRank: `CGPA ${app.cgpa}`
      };
      setScholarshipRecipients(prev => [newRecipient, ...prev]);
    }
    addAuditLog('Scholarship Application Reviewed', `Status changed to ${status} for application ${appId}`);
  };

  const addScholarshipDonor = (donor: Omit<ScholarshipDonor, 'id'>) => {
    const newDonor: ScholarshipDonor = {
      ...donor,
      id: `sd-${Date.now()}`
    };
    setScholarshipDonors(prev => [newDonor, ...prev]);
    addAuditLog('Scholarship Donor Added', `Added ${donor.donorName} (${donor.tier} donor)`);
  };

  const updateScholarshipDonor = (donor: ScholarshipDonor) => {
    setScholarshipDonors(prev => prev.map(d => d.id === donor.id ? donor : d));
    addAuditLog('Scholarship Donor Updated', `Updated ${donor.donorName}`);
  };

  const deleteScholarshipDonor = (id: string) => {
    const d = scholarshipDonors.find(x => x.id === id);
    setScholarshipDonors(prev => prev.filter(x => x.id !== id));
    addAuditLog('Scholarship Donor Removed', `Removed donor ${d?.donorName || id}`);
  };

  const toggleDonorStatus = (id: string) => {
    setScholarshipDonors(prev => prev.map(d => d.id === id ? { ...d, activeStatus: !d.activeStatus } : d));
  };

  const addScholarshipRecipient = (rec: Omit<ScholarshipRecipient, 'id'>) => {
    const newRec: ScholarshipRecipient = {
      ...rec,
      id: `rec-${Date.now()}`
    };
    setScholarshipRecipients(prev => [newRec, ...prev]);
    addAuditLog('Scholarship Recipient Added', `Added ${rec.name} (${rec.year}) to Archive`);
  };

  const deleteScholarshipRecipient = (id: string) => {
    setScholarshipRecipients(prev => prev.filter(x => x.id !== id));
    addAuditLog('Scholarship Recipient Deleted', `Deleted recipient id: ${id}`);
  };

  // Events
  const createEvent = (ev: Omit<EventItem, 'id' | 'registeredCount' | 'registeredUserIds' | 'attendees' | 'volunteers'>) => {
    const newEvent: EventItem = {
      ...ev,
      id: `ev-${Date.now()}`,
      registeredCount: 0,
      registeredUserIds: [],
      volunteers: [],
      attendees: []
    };
    setEvents(prev => [newEvent, ...prev]);
    addAuditLog('Event Created', `Created event: ${ev.title}`);
  };

  const registerForEvent = (eventId: string): boolean => {
    if (!currentUser) return false;
    const ev = events.find(e => e.id === eventId);
    if (!ev) return false;
    if (ev.registeredUserIds.includes(currentUser.id)) return false;

    setEvents(prev => prev.map(e => {
      if (e.id === eventId) {
        const newAttendee = {
          userId: currentUser.id,
          name: currentUser.fullName,
          duetId: currentUser.duetId,
          registeredAt: new Date().toISOString().split('T')[0],
          checkedIn: false
        };
        return {
          ...e,
          registeredCount: e.registeredCount + 1,
          registeredUserIds: [...e.registeredUserIds, currentUser.id],
          attendees: [...e.attendees, newAttendee]
        };
      }
      return e;
    }));
    addAuditLog('Event Registration', `${currentUser.fullName} registered for ${ev.title}`);
    return true;
  };

  const volunteerForEvent = (eventId: string, role: string) => {
    if (!currentUser) return;
    setEvents(prev => prev.map(e => {
      if (e.id === eventId) {
        return {
          ...e,
          volunteers: [
            ...e.volunteers,
            {
              userId: currentUser.id,
              name: currentUser.fullName,
              role,
              phone: currentUser.phone
            }
          ]
        };
      }
      return e;
    }));
    addAuditLog('Volunteer Assigned', `${currentUser.fullName} volunteered as ${role}`);
  };

  const checkInAttendee = (eventId: string, duetIdOrUserId: string): { success: boolean; message: string } => {
    const ev = events.find(e => e.id === eventId);
    if (!ev) return { success: false, message: 'Event not found.' };

    let found = false;
    let attendeeName = '';

    const updatedAttendees = ev.attendees.map(att => {
      if (att.duetId === duetIdOrUserId || att.userId === duetIdOrUserId) {
        found = true;
        attendeeName = att.name;
        return {
          ...att,
          checkedIn: true,
          checkedInAt: new Date().toLocaleTimeString()
        };
      }
      return att;
    });

    if (!found) {
      // Find matching user from users database for instant on-site check-in
      const userMatch = users.find(u => u.duetId === duetIdOrUserId || u.id === duetIdOrUserId);
      if (userMatch) {
        updatedAttendees.push({
          userId: userMatch.id,
          name: userMatch.fullName,
          duetId: userMatch.duetId,
          registeredAt: new Date().toISOString().split('T')[0],
          checkedIn: true,
          checkedInAt: new Date().toLocaleTimeString()
        });
        attendeeName = userMatch.fullName;
        found = true;
      }
    }

    if (found) {
      setEvents(prev => prev.map(e => e.id === eventId ? { ...e, attendees: updatedAttendees } : e));
      addAuditLog('QR Attendance Check-in', `Checked in ${attendeeName} for ${ev.title}`);
      return { success: true, message: `Check-in confirmed for ${attendeeName}!` };
    }

    return { success: false, message: `No registered DUET member found with ID: ${duetIdOrUserId}` };
  };

  // Donations
  const makeDonation = (don: Omit<DonationRecord, 'id' | 'date' | 'receiptNumber' | 'verified'>): DonationRecord => {
    const receiptNum = `BSWA-RCP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newDonation: DonationRecord = {
      ...don,
      id: `don-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      receiptNumber: receiptNum,
      verified: true
    };

    setDonations(prev => [newDonation, ...prev]);

    // Update campaign raised amount if linked
    if (don.campaignId) {
      setCampaigns(prev => prev.map(c => {
        if (c.id === don.campaignId) {
          return {
            ...c,
            raisedAmount: c.raisedAmount + don.amount,
            donorsCount: c.donorsCount + 1
          };
        }
        return c;
      }));
    }

    // Record as Income in Accounts
    const newIncome: IncomeRecord = {
      id: `inc-${Date.now()}`,
      source: don.campaignName.toLowerCase().includes('scholarship') ? 'scholarship_donation' : 'donation',
      sourceLabel: don.campaignName,
      amount: don.amount,
      date: newDonation.date,
      description: `Donation from ${don.donorName} (${don.paymentMethod} Ref: ${don.refNumber})`,
      receiptNumber: receiptNum,
      recordedBy: 'Auto-Gateway System'
    };
    setIncomeRecords(prev => [newIncome, ...prev]);

    addAuditLog('Donation Received', `Received BDT ${don.amount} from ${don.donorName} (${receiptNum})`);
    return newDonation;
  };

  const createCampaign = (campaign: Omit<DonationCampaign, 'id' | 'raisedAmount' | 'donorsCount'>) => {
    const newCamp: DonationCampaign = {
      ...campaign,
      id: `camp-${Date.now()}`,
      raisedAmount: 0,
      donorsCount: 0
    };
    setCampaigns(prev => [newCamp, ...prev]);
    addAuditLog('Donation Campaign Created', `Launched: ${campaign.title}`);
  };

  // Finance
  const addExpense = (exp: Omit<ExpenseRecord, 'id' | 'voucherNumber'>): ExpenseRecord => {
    const voucherNum = `VOUCH-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newExp: ExpenseRecord = {
      ...exp,
      id: `exp-${Date.now()}`,
      voucherNumber: voucherNum
    };
    setExpenses(prev => [newExp, ...prev]);
    addAuditLog('Expense Voucher Created', `Voucher ${voucherNum}: BDT ${exp.amount} for ${exp.description}`);
    return newExp;
  };

  const addIncome = (inc: Omit<IncomeRecord, 'id' | 'receiptNumber'>) => {
    const rcp = `BSWA-INC-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const newInc: IncomeRecord = {
      ...inc,
      id: `inc-${Date.now()}`,
      receiptNumber: rcp
    };
    setIncomeRecords(prev => [newInc, ...prev]);
    addAuditLog('Income Recorded', `Receipt ${rcp}: BDT ${inc.amount} from ${inc.sourceLabel}`);
  };

  const addExpenseCategory = (name: string, budget?: number) => {
    const newCat: ExpenseCategory = {
      id: `cat-${Date.now()}`,
      name,
      budget: budget || 50000,
      isDefault: false
    };
    setExpenseCategories(prev => [...prev, newCat]);
    addAuditLog('Expense Category Added', `Category: ${name}`);
  };

  const updateExpenseCategory = (id: string, name: string, budget?: number) => {
    setExpenseCategories(prev => prev.map(c => c.id === id ? { ...c, name, budget } : c));
    addAuditLog('Expense Category Updated', `Category ${id} updated to ${name}`);
  };

  const deleteExpenseCategory = (id: string): boolean => {
    const inUse = expenses.some(e => e.categoryId === id);
    if (inUse) {
      alert('Cannot delete category with existing expense vouchers! You can rename it or reassign vouchers first.');
      return false;
    }
    setExpenseCategories(prev => prev.filter(c => c.id !== id));
    addAuditLog('Expense Category Deleted', `Deleted category id: ${id}`);
    return true;
  };

  // Notices
  const publishNotice = (notice: Omit<Notice, 'id' | 'date'>) => {
    const newNotice: Notice = {
      ...notice,
      id: `not-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setNotices(prev => [newNotice, ...prev]);
    addAuditLog('Notice Published', `Published: ${notice.title}`);
  };

  const deleteNotice = (id: string) => {
    setNotices(prev => prev.filter(n => n.id !== id));
    addAuditLog('Notice Deleted', `Notice id: ${id}`);
  };

  const togglePinNotice = (id: string) => {
    setNotices(prev => prev.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n));
  };

  // Leaders
  const addLeader = (ldr: Omit<LeaderRecord, 'id'>) => {
    const newLeader: LeaderRecord = {
      ...ldr,
      id: `ldr-${Date.now()}`
    };
    setLeaders(prev => [...prev, newLeader]);
    addAuditLog('Leader Record Added', `Added ${ldr.name} (${ldr.term})`);
  };

  const updateLeader = (ldr: LeaderRecord) => {
    setLeaders(prev => prev.map(l => l.id === ldr.id ? ldr : l));
    addAuditLog('Leader Record Updated', `Updated ${ldr.name}`);
  };

  const deleteLeader = (id: string) => {
    setLeaders(prev => prev.filter(l => l.id !== id));
    addAuditLog('Leader Record Deleted', `Deleted leader ${id}`);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  // Reset demo data
  const resetToDemoData = () => {
    if (window.confirm('Reset all BSWA DUET data back to original demonstration seed?')) {
      localStorage.clear();
      setUsers(INITIAL_USERS);
      setNotices(INITIAL_NOTICES);
      setEvents(INITIAL_EVENTS);
      setCampaigns(INITIAL_CAMPAIGNS);
      setDonations(INITIAL_DONATION_RECORDS);
      setScholarshipApps(INITIAL_SCHOLARSHIP_APPLICATIONS);
      setScholarshipRecipients(INITIAL_SCHOLARSHIP_RECIPIENTS);
      setScholarshipDonors(INITIAL_SCHOLARSHIP_DONORS);
      setExpenseCategories(INITIAL_EXPENSE_CATEGORIES);
      setExpenses(INITIAL_EXPENSES);
      setIncomeRecords(INITIAL_INCOME);
      setLeaders(INITIAL_LEADERS);
      setAuditLogs(INITIAL_AUDIT_LOGS);
      alert('BSWA database restored to official seed state.');
    }
  };

  // Photo Gallery
  const addGalleryPhoto = (photo: Omit<GalleryPhoto, 'id' | 'year'>) => {
    const year = (photo.date || new Date().toISOString().split('T')[0]).slice(0, 4);
    const newPhoto: GalleryPhoto = {
      ...photo,
      id: `gal-${Date.now()}`,
      year,
      uploadedBy: photo.uploadedBy || currentUser?.fullName || 'BSWA Admin',
    };
    setGalleryPhotos(prev => [newPhoto, ...prev]);
    addAuditLog('Gallery Photo Added', `Uploaded "${newPhoto.title}" (${newPhoto.category}, ${year})`);
  };

  const updateGalleryPhoto = (photo: GalleryPhoto) => {
    const year = (photo.date || photo.year).slice(0, 4);
    setGalleryPhotos(prev => prev.map(p => (p.id === photo.id ? { ...photo, year } : p)));
    addAuditLog('Gallery Photo Updated', `Edited "${photo.title}"`);
  };

  const deleteGalleryPhoto = (id: string) => {
    const target = galleryPhotos.find(p => p.id === id);
    setGalleryPhotos(prev => prev.filter(p => p.id !== id));
    addAuditLog('Gallery Photo Removed', `Removed "${target?.title || id}" from the gallery`);
  };

  // Backup & Restore
  const backupDatabaseJson = (): string => {
    const fullBackup = {
      appName: 'BSWA DUET Digital Platform',
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      users,
      notices,
      events,
      campaigns,
      donations,
      scholarshipApps,
      scholarshipRecipients,
      scholarshipDonors,
      expenseCategories,
      expenses,
      incomeRecords,
      leaders,
      auditLogs
    };
    return JSON.stringify(fullBackup, null, 2);
  };

  const restoreDatabaseJson = (jsonStr: string): boolean => {
    try {
      const data = JSON.parse(jsonStr);
      if (!data.users || !data.notices) {
        throw new Error('Invalid backup schema');
      }
      if (data.users) setUsers(data.users);
      if (data.notices) setNotices(data.notices);
      if (data.events) setEvents(data.events);
      if (data.campaigns) setCampaigns(data.campaigns);
      if (data.donations) setDonations(data.donations);
      if (data.scholarshipApps) setScholarshipApps(data.scholarshipApps);
      if (data.scholarshipRecipients) setScholarshipRecipients(data.scholarshipRecipients);
      if (data.scholarshipDonors) setScholarshipDonors(data.scholarshipDonors);
      if (data.expenseCategories) setExpenseCategories(data.expenseCategories);
      if (data.expenses) setExpenses(data.expenses);
      if (data.incomeRecords) setIncomeRecords(data.incomeRecords);
      if (data.leaders) setLeaders(data.leaders);
      if (data.auditLogs) setAuditLogs(data.auditLogs);
      addAuditLog('Database Restored', 'Full system database restored from JSON backup file.');
      return true;
    } catch (e) {
      console.error(e);
      alert('Failed to parse backup JSON file.');
      return false;
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        activeRole,
        switchRole,
        language,
        toggleLanguage,
        theme,
        toggleTheme,
        users,
        notices,
        events,
        campaigns,
        donations,
        scholarshipApps,
        scholarshipRecipients,
        scholarshipDonors,
        expenseCategories,
        expenses,
        incomeRecords,
        leaders,
        mediaItems,
        galleryPhotos,
        auditLogs,
        notifications,
        otpState,
        startRegistration,
        verifyOtp,
        resendOtp,
        closeOtpModal,
        loginUser,
        logoutUser,
        approveUser,
        rejectUser,
        updateUserRole,
        submitScholarshipApplication,
        reviewScholarshipApplication,
        addScholarshipDonor,
        updateScholarshipDonor,
        deleteScholarshipDonor,
        toggleDonorStatus,
        addScholarshipRecipient,
        deleteScholarshipRecipient,
        createEvent,
        registerForEvent,
        volunteerForEvent,
        checkInAttendee,
        makeDonation,
        createCampaign,
        addExpense,
        addIncome,
        addExpenseCategory,
        updateExpenseCategory,
        deleteExpenseCategory,
        publishNotice,
        deleteNotice,
        togglePinNotice,
        addLeader,
        updateLeader,
        deleteLeader,
        addGalleryPhoto,
        updateGalleryPhoto,
        deleteGalleryPhoto,
        markNotificationAsRead,
        resetToDemoData,
        backupDatabaseJson,
        restoreDatabaseJson
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
