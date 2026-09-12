import {
  User,
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
  BuddhistHoliday
  } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'user-admin',
    fullName: 'Ven. Prof. Sudatta Chakma, Ph.D.',
    email: 'admin@bswa-duet.org',
    role: 'admin',
    status: 'approved',
    userType: 'admin',
    duetId: 'EMP-DUET-014',
    department: 'Computer Science & Engineering',
    phone: '+880 1711-234567',
    bloodGroup: 'O+',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    createdAt: '2024-01-01',
    verifiedOtp: true,
    isAdmin: true
  },
  {
    id: 'user-exec-1',
    fullName: 'Noyon Chakma',
    email: 'chakmanoyon72@gmail.com',
    role: 'executive',
    status: 'approved',
    userType: 'student',
    duetId: '194012',
    department: 'Civil Engineering',
    batch: '19th',
    hall: 'Dr. F. R. Khan Hall',
    phone: '+880 1812-987654',
    bloodGroup: 'B+',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    createdAt: '2024-01-15',
    verifiedOtp: true,
  },
  {
    id: 'user-student-1',
    fullName: 'Ushasi Barua',
    email: 'ushasi.barua@student.duet.ac.bd',
    role: 'student',
    status: 'approved',
    userType: 'student',
    duetId: '214045',
    department: 'Computer Science & Engineering',
    batch: '21st',
    hall: 'Marie Curie Hall',
    phone: '+880 1723-456789',
    bloodGroup: 'A+',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    createdAt: '2024-02-10',
    verifiedOtp: true,
  },
  {
    id: 'user-alumni-1',
    fullName: 'Engr. Amitava Tanchangya',
    email: 'amitava.engr@duet-alumni.org',
    role: 'alumni',
    status: 'approved',
    userType: 'alumni',
    duetId: '144018',
    graduationBatch: '14th Batch',
    department: 'Electrical & Electronic Engineering',
    currentProfession: 'Senior Electrical Engineer',
    company: 'Bangladesh Power Development Board (BPDB)',
    currentLocation: 'Dhaka, Bangladesh',
    phone: '+880 1911-345678',
    bloodGroup: 'AB+',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    createdAt: '2024-01-20',
    verifiedOtp: true,
  },
  {
    id: 'user-pending-1',
    fullName: 'Kripayan Chakma',
    email: 'kripayan.chakma@student.duet.ac.bd',
    role: 'student',
    status: 'pending',
    userType: 'student',
    duetId: '224089',
    department: 'Mechanical Engineering',
    batch: '22nd',
    hall: 'Kazi Nazrul Islam Hall',
    phone: '+880 1689-112233',
    bloodGroup: 'O+',
    photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    createdAt: '2024-03-01',
    verifiedOtp: true,
  }
];

export const INITIAL_NOTICES: Notice[] = [
  {
    id: 'not-01',
    title: 'Applications Open for BSWA Merit Scholarship 2026',
    titleBn: 'বিএসডব্লিউএ মেধা বৃত্তি ২০২৬ এর আবেদন আহ্বান',
    content: 'All undergraduate Buddhist students of DUET who have achieved a minimum CGPA of 3.25 in the last academic session or require immediate welfare financial support are invited to submit their scholarship applications through this digital portal before 30th April 2026. Required documents include DUET Student ID card, latest semester grade sheet, and family income certificate.',
    date: '2026-03-10',
    author: 'Scholarship Committee, BSWA DUET',
    category: 'Scholarship',
    pinned: true,
    attachmentName: 'BSWA_Scholarship_Guideline_2026.pdf',
    priority: 'high'
  },
  {
    id: 'not-02',
    title: 'Grand Buddha Purnima 2570 B.E. Celebration at DUET Campus',
    titleBn: 'ডুয়েট ক্যাম্পাসে ২৫৭০ বুদ্ধপূর্ণিমা উদযাপন ও ধর্মালোচনা সভা',
    content: 'The Executive Committee is pleased to announce the celebration of Holy Buddha Purnima with morning peace procession (Shanti Shovajatra), Sanghadana to Venerable Bhikkhu Sangha, illumination of lamps, and evening cultural gathering. All students, teachers, staff, and alumni are warmly invited to attend.',
    date: '2026-03-05',
    author: 'Executive Committee',
    category: 'Religious',
    pinned: true,
    attachmentName: 'Buddha_Purnima_Schedule.pdf',
    priority: 'high'
  },
  {
    id: 'not-03',
    title: 'DUET Freshers Buddhist Students Reception & Orientation',
    titleBn: 'নবীন বৌদ্ধ শিক্ষার্থী বরণ ও ওরিয়েন্টেশন প্রোগ্রাম',
    content: 'An orientation seminar and warm reception program for the newly enrolled 23rd batch Buddhist engineering students will be held at the DUET Central Auditorium on next Friday at 3:30 PM. Senior alumni and faculty advisors will share insights on engineering excellence and mindful campus life.',
    date: '2026-02-28',
    author: 'General Secretary',
    category: 'Event',
    pinned: false,
    priority: 'normal'
  },
  {
    id: 'not-04',
    title: 'Alumni Welfare Fund Drive for Medical Assistance',
    titleBn: 'অসুস্থ শিক্ষার্থীর সহযোগিতায় জরুরী চিকিৎসা তহবিল আহ্বান',
    content: 'We are raising funds for one of our 18th batch brother undergoing critical orthopedic surgery. We request all honorable alumni and members to extend compassionate support.',
    date: '2026-02-15',
    author: 'President & Treasurer',
    category: 'Urgent',
    pinned: false,
    priority: 'high'
  }
];

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'ev-01',
    title: 'Sacred Buddha Purnima 2570 B.E. & Shanti Shovajatra',
    titleBn: 'পবিত্র বুদ্ধপূর্ণিমা ২৫৭০ বুদ্ধাব্দ ও শান্তি শোভাযাত্রা',
    date: '2026-05-12',
    time: '08:30 AM - 06:00 PM',
    location: 'DUET Central Campus & Gazipur Bouddha Vihara',
    description: 'The triple sacred day commemorating the Birth, Supreme Enlightenment, and Mahaparinirvana of Gautama Buddha. Features morning prayer, Sanghadana, Dhamma talk by distinguished Mahatheros, blood donation drive, and illumination of 1,000 butter lamps in the evening for universal harmony.',
    category: 'religious',
    bannerUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80',
    goalAttendees: 300,
    registeredCount: 142,
    registeredUserIds: ['user-student-1', 'user-exec-1', 'user-alumni-1'],
    volunteers: [
      { userId: 'user-exec-1', name: 'Noyon Chakma', role: 'Event Convener' },
      { userId: 'user-student-1', name: 'Ushasi Barua', role: 'Cultural & Stage Lead' }
    ],
    attendees: [
      { userId: 'user-student-1', name: 'Ushasi Barua', duetId: '214045', registeredAt: '2026-03-01', checkedIn: true, checkedInAt: '2026-03-01 09:15' },
      { userId: 'user-exec-1', name: 'Noyon Chakma', duetId: '194012', registeredAt: '2026-03-02', checkedIn: true, checkedInAt: '2026-03-02 08:45' }
    ],
    status: 'upcoming'
  },
  {
    id: 'ev-02',
    title: 'Annual Sanghadana & Sutta Chanting for Academic Success',
    titleBn: 'বার্ষিক সংঘদান ও প্রকৌশলী শিক্ষার্থীদের শুভকামনায় সূত্রপাঠ',
    date: '2026-06-20',
    time: '10:00 AM - 02:00 PM',
    location: 'DUET Multipurpose Hall',
    description: 'Offering of sacred alms, robes, and medicine to Venerable Buddhist Monks followed by Mangala Sutta chanting for academic perseverance, peace of mind during examinations, and welfare of DUET students and their families.',
    category: 'sanghadana',
    bannerUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
    goalAttendees: 180,
    registeredCount: 88,
    registeredUserIds: ['user-student-1'],
    volunteers: [
      { userId: 'user-student-1', name: 'Ushasi Barua', role: 'Prasada Distribution' }
    ],
    attendees: [],
    status: 'upcoming'
  },
  {
    id: 'ev-03',
    title: 'Kathina Chibar Dana & Dhamma Discussion',
    titleBn: 'কঠিন চীবর দান ও ধর্মালোচনামূলক অনুষ্ঠান',
    date: '2025-11-08',
    time: '09:00 AM - 05:00 PM',
    location: 'Joydebpur Buddhist Monastery, Gazipur',
    description: 'The highest Buddhist robe offering ceremony after the three-month Rains Retreat (Vassa). Attended by hundreds of alumni and DUET students.',
    category: 'religious',
    bannerUrl: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1200&q=80',
    goalAttendees: 250,
    registeredCount: 220,
    registeredUserIds: [],
    volunteers: [],
    attendees: [],
    status: 'completed',
    report: 'Successfully celebrated with participation of 220 students and alumni. Total donation raised: BDT 1,85,000 for monk welfare and campus student aid.'
  }
];

export const INITIAL_CAMPAIGNS: DonationCampaign[] = [
  {
    id: 'camp-01',
    title: 'BSWA Merit & Hardship Scholarship Endowment 2026',
    titleBn: 'বিএসডব্লিউএ মেধা ও কল্যাণ বৃত্তি তহবিল ২০২৬',
    description: 'Permanent fund aimed at providing financial stipends of BDT 15,000 - 25,000 to deserving Buddhist engineering students facing financial obstacles during their degree at DUET.',
    goalAmount: 500000,
    raisedAmount: 345000,
    deadline: '2026-06-30',
    category: 'Scholarship',
    status: 'active',
    donorsCount: 42
  },
  {
    id: 'camp-02',
    title: 'Holy Buddha Purnima Celebration & Sanghadana Fund',
    titleBn: 'বুদ্ধপূর্ণিমা উদযাপন ও সংঘদান সহায়তা তহবিল',
    description: 'Funding the grand celebration of Buddha Purnima, alms-giving to 21 Venerable Bhikkhus, floral decor, sound systems, and festive meals for all participating students and guests.',
    goalAmount: 120000,
    raisedAmount: 88500,
    deadline: '2026-05-10',
    category: 'Religious',
    status: 'active',
    donorsCount: 29
  },
  {
    id: 'camp-03',
    title: 'DUET Buddhist Students Library & Study Center Equipment',
    titleBn: 'ডুয়েট বৌদ্ধ শিক্ষার্থী স্টাডি কর্নার ও ডিজিটাল বুক কর্নার',
    description: 'Procuring engineering reference books, laptop stands, mindfulness cushions, and Tripitaka canonical texts for the common student room.',
    goalAmount: 80000,
    raisedAmount: 80000,
    deadline: '2026-02-28',
    category: 'Welfare',
    status: 'completed',
    donorsCount: 18
  }
];

export const INITIAL_DONATION_RECORDS: DonationRecord[] = [
  {
    id: 'don-01',
    campaignId: 'camp-01',
    campaignName: 'BSWA Merit & Hardship Scholarship Endowment 2026',
    donorName: 'Engr. Amitava Tanchangya',
    donorEmail: 'amitava.engr@duet-alumni.org',
    donorType: 'alumni',
    amount: 25000,
    date: '2026-03-01',
    paymentMethod: 'bKash',
    refNumber: 'BK92837482',
    notes: 'For underprivileged CSE/EEE students',
    receiptNumber: 'BSWA-RCP-2026-0042',
    verified: true
  },
  {
    id: 'don-02',
    campaignId: 'camp-01',
    campaignName: 'BSWA Merit & Hardship Scholarship Endowment 2026',
    donorName: 'Dr. Bodhi Prakash Barua (Alumni 08 Batch)',
    donorEmail: 'bodhi.barua@gmail.com',
    donorType: 'alumni',
    amount: 50000,
    date: '2026-02-24',
    paymentMethod: 'Bank',
    refNumber: 'EBL-TXN-773120',
    notes: 'Yearly scholarship contribution',
    receiptNumber: 'BSWA-RCP-2026-0041',
    verified: true
  },
  {
    id: 'don-03',
    campaignId: 'camp-02',
    campaignName: 'Holy Buddha Purnima Celebration & Sanghadana Fund',
    donorName: 'Anonymous Upasaka',
    donorType: 'guest',
    amount: 10000,
    date: '2026-03-08',
    paymentMethod: 'Nagad',
    refNumber: 'NGD4918204',
    notes: 'Sanghadana dana',
    receiptNumber: 'BSWA-RCP-2026-0043',
    verified: true
  }
];

export const INITIAL_SCHOLARSHIP_APPLICATIONS: ScholarshipApplication[] = [
  {
    id: 'app-01',
    userId: 'user-student-1',
    fullName: 'Ushasi Barua',
    duetId: '214045',
    department: 'Computer Science & Engineering',
    batch: '21st',
    semester: '6th Semester',
    cgpa: 3.84,
    phone: '+880 1723-456789',
    email: 'ushasi.barua@student.duet.ac.bd',
    fatherName: 'Bipul Chandra Barua',
    motherName: 'Subarna Barua',
    presentAddress: 'Marie Curie Hall, DUET Gazipur',
    permanentAddress: 'Raozan, Chittagong, Bangladesh',
    familyIncome: 18000,
    category: 'merit',
    motivationStatement: 'Throughout my 5 completed semesters at DUET, I have consistently stood in the top 3% of CSE department while serving as the lead volunteer for BSWA welfare activities. This scholarship will help me purchase project hardware components and manage academic book expenses.',
    studentIdFile: 'student_id_214045.jpg',
    transcriptFile: 'transcript_sem5_ushasi.pdf',
    documentsFile: 'income_cert_signed.pdf',
    status: 'approved',
    submittedAt: '2026-02-05',
    reviewedBy: 'Ven. Prof. Sudatta Chakma',
    notes: 'Outstanding academic standing and active welfare volunteer. Approved for Gold Merit Tier.',
    awardAmount: 20000
  },
  {
    id: 'app-02',
    userId: 'user-pending-1',
    fullName: 'Kripayan Chakma',
    duetId: '224089',
    department: 'Mechanical Engineering',
    batch: '22nd',
    semester: '4th Semester',
    cgpa: 3.42,
    phone: '+880 1689-112233',
    email: 'kripayan.chakma@student.duet.ac.bd',
    fatherName: 'Subhasish Chakma',
    motherName: 'Kalpana Chakma',
    presentAddress: 'Kazi Nazrul Islam Hall, DUET Gazipur',
    permanentAddress: 'Baghaichhari, Rangamati Hill Tracts',
    familyIncome: 14000,
    category: 'financial_need',
    motivationStatement: 'My father is a retired farmer with volatile agricultural income in remote hill area. Bearing room hostel mess fees and laboratory manuals at DUET has put immense strain on my family. Receiving this scholarship will allow me to continue my mechanical engineering studies smoothly without anxiety.',
    studentIdFile: 'duet_id_kripayan.jpg',
    transcriptFile: 'duet_transcript_sem3.pdf',
    documentsFile: 'upazilla_income_cert.pdf',
    status: 'under_review',
    submittedAt: '2026-03-02',
    reviewedBy: 'Executive Committee',
    notes: 'Income documentation verified. Interview scheduled on March 25th.'
  }
];

export const INITIAL_SCHOLARSHIP_RECIPIENTS: ScholarshipRecipient[] = [
  {
    id: 'rec-01',
    name: 'Ushasi Barua',
    department: 'Computer Science & Engineering',
    batch: '21st Batch',
    year: 2026,
    scholarshipType: 'Academic Excellence Merit Gold',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    awardAmount: 20000,
    meritRank: 'CGPA 3.84'
  },
  {
    id: 'rec-02',
    name: 'Joyanta Dewan',
    department: 'Electrical & Electronic Engineering',
    batch: '20th Batch',
    year: 2025,
    scholarshipType: 'BSWA Merit Scholar',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    awardAmount: 18000,
    meritRank: 'CGPA 3.79'
  },
  {
    id: 'rec-03',
    name: 'Priyanka Marma',
    department: 'Civil Engineering',
    batch: '19th Batch',
    year: 2025,
    scholarshipType: 'Women in Engineering Welfare Grant',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    awardAmount: 15000,
    meritRank: 'CGPA 3.68'
  },
  {
    id: 'rec-04',
    name: 'Diponkar Tripura',
    department: 'Mechanical Engineering',
    batch: '18th Batch',
    year: 2024,
    scholarshipType: 'Undergraduate Hardship Grant',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    awardAmount: 16000,
    meritRank: 'CGPA 3.52'
  },
  {
    id: 'rec-05',
    name: 'Tushar Barua',
    department: 'Textile Engineering',
    batch: '17th Batch',
    year: 2024,
    scholarshipType: 'BSWA Merit Scholar',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    awardAmount: 15000,
    meritRank: 'CGPA 3.71'
  }
];

export const INITIAL_SCHOLARSHIP_DONORS: ScholarshipDonor[] = [
  // Monthly Donors
  {
    id: 'sd-01',
    tier: 'Monthly',
    donorName: 'Engr. Amitava Tanchangya',
    contributionAmount: 2000,
    startDate: '2024-01-01',
    activeStatus: true,
    contact: '+880 1911-345678',
    email: 'amitava.engr@duet-alumni.org',
    profession: 'Senior Electrical Engineer, BPDB (DUET 14th Batch)'
  },
  {
    id: 'sd-02',
    tier: 'Monthly',
    donorName: 'Engr. Pranab Kumar Barua',
    contributionAmount: 3000,
    startDate: '2024-03-01',
    activeStatus: true,
    contact: '+880 1819-009988',
    email: 'pranab.barua@bacco.org',
    profession: 'Project Director, Roads & Highways (DUET 09th Batch)'
  },
  {
    id: 'sd-03',
    tier: 'Monthly',
    donorName: 'Engr. Shanti Joy Chakma',
    contributionAmount: 1500,
    startDate: '2024-06-01',
    activeStatus: true,
    contact: '+880 1712-445566',
    email: 'shanti.chakma@telecom.bd',
    profession: 'Transmission Engineer, Grameenphone (DUET 16th Batch)'
  },
  // Yearly Donors
  {
    id: 'sd-04',
    tier: 'Yearly',
    donorName: 'Dr. Bodhi Prakash Barua',
    contributionAmount: 50000,
    annualAmount: 50000,
    contributionYear: 2026,
    activeStatus: true,
    contact: '+880 1711-889900',
    email: 'bodhi.barua@duet.ac.bd',
    profession: 'Professor of Mechanical Engineering (DUET 08th Batch)'
  },
  {
    id: 'sd-05',
    tier: 'Yearly',
    donorName: 'Engr. Binoy Bhushan Chakma',
    contributionAmount: 35000,
    annualAmount: 35000,
    contributionYear: 2026,
    activeStatus: true,
    contact: '+880 1912-776655',
    email: 'binoy.chakma@steel.bd',
    profession: 'Plant General Manager, BSRM (DUET 10th Batch)'
  },
  // Lifetime Donors
  {
    id: 'sd-06',
    tier: 'Lifetime',
    donorName: 'Engr. Subrata Barua (Late Memoriam Patron)',
    contributionAmount: 250000,
    totalContribution: 250000,
    recognitionBadge: 'Diamond',
    activeStatus: true,
    profession: 'Founding Chief Patron & Superintending Engineer (DUET 03rd Batch)'
  },
  {
    id: 'sd-07',
    tier: 'Lifetime',
    donorName: 'Engr. Gyana Ratna Chakma',
    contributionAmount: 150000,
    totalContribution: 150000,
    recognitionBadge: 'Gold',
    activeStatus: true,
    profession: 'Managing Director, Horizon Green Technologies (DUET 06th Batch)'
  }
];

export const INITIAL_EXPENSE_CATEGORIES: ExpenseCategory[] = [
  { id: 'cat-01', name: 'Religious & Sanghadana Ceremonies', budget: 150000, isDefault: true },
  { id: 'cat-02', name: 'Merit & Hardship Scholarships', budget: 300000, isDefault: true },
  { id: 'cat-03', name: 'Student Orientation & Farewell', budget: 60000, isDefault: true },
  { id: 'cat-04', name: 'Emergency Medical & Welfare Aid', budget: 80000, isDefault: true },
  { id: 'cat-05', name: 'Administrative & Printing Office', budget: 35000, isDefault: true },
  { id: 'cat-06', name: 'Cultural & Buddha Purnima Festivities', budget: 120000, isDefault: true },
];

export const INITIAL_EXPENSES: ExpenseRecord[] = [
  {
    id: 'exp-01',
    amount: 20000,
    date: '2026-03-01',
    categoryId: 'cat-02',
    categoryName: 'Merit & Hardship Scholarships',
    description: 'Scholarship stipend disbursement to Ushasi Barua (CSE 21st Batch, 6th Sem)',
    attachmentName: 'Scholarship_Receipt_214045.pdf',
    invoiceNumber: 'INV-SCHOL-2026-01',
    approvedBy: 'Prof. Sudatta Chakma (Advisory Committee)',
    voucherNumber: 'VOUCH-2026-0012'
  },
  {
    id: 'exp-02',
    amount: 14500,
    date: '2026-02-28',
    categoryId: 'cat-03',
    categoryName: 'Student Orientation & Farewell',
    description: 'Banner printing, memento crests, and sweet distribution for 23rd batch freshers reception',
    attachmentName: 'Crest_and_Banner_Bill.pdf',
    invoiceNumber: 'INV-PRINT-998',
    approvedBy: 'Noyon Chakma (General Secretary)',
    voucherNumber: 'VOUCH-2026-0011'
  },
  {
    id: 'exp-03',
    amount: 32000,
    date: '2026-01-14',
    categoryId: 'cat-01',
    categoryName: 'Religious & Sanghadana Ceremonies',
    description: 'Sanghadana robe offerings and wholesome Dana lunch to 11 Bhikkhus at Gazipur Bouddha Vihara',
    attachmentName: 'Vihara_Sanghadana_Receipt.pdf',
    invoiceNumber: 'INV-VIHARA-102',
    approvedBy: 'Executive Committee',
    voucherNumber: 'VOUCH-2026-0010'
  }
];

export const INITIAL_INCOME: IncomeRecord[] = [
  {
    id: 'inc-01',
    source: 'scholarship_donation',
    sourceLabel: 'Scholarship Donations',
    amount: 50000,
    date: '2026-02-24',
    description: 'Annual scholarship grant by Dr. Bodhi Prakash Barua (Alumni 08)',
    receiptNumber: 'BSWA-INC-2026-01',
    recordedBy: 'Treasurer BSWA'
  },
  {
    id: 'inc-02',
    source: 'donation',
    sourceLabel: 'Monthly Donor Contribution',
    amount: 25000,
    date: '2026-03-01',
    description: 'Direct bKash deposit by Engr. Amitava Tanchangya for student support',
    receiptNumber: 'BSWA-INC-2026-02',
    recordedBy: 'Treasurer BSWA'
  },
  {
    id: 'inc-03',
    source: 'membership_fee',
    sourceLabel: 'Annual Membership Fees',
    amount: 18500,
    date: '2026-02-15',
    description: 'Annual membership contribution collection from 37 running students (BDT 500 each)',
    receiptNumber: 'BSWA-INC-2026-03',
    recordedBy: 'General Secretary'
  }
];

export const INITIAL_LEADERS: LeaderRecord[] = [
  {
    id: 'ldr-01',
    name: 'Ripon Barua',
    nameBn: 'রিপন বড়ুয়া',
    role: 'President',
    type: 'current',
    term: '2025 - 2026',
    department: 'Electrical & Electronic Engineering (18th Batch)',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80',
    message: 'Welcome to the official digital platform of the Buddhist Students Welfare Association (BSWA), DUET. Rooted in the compassionate teachings of Lord Buddha—Karuna (Compassion), Metta (Loving-Kindness), and Mudita (Sympathetic Joy)—our mission is to foster fraternity, academic brilliance, moral integrity, and lifelong solidarity among all Buddhist students and alumni of DUET Gazipur. May this platform empower every member to achieve their highest potentials as engineers serving humanity.',
    messageBn: 'ডুয়েটের সকল বৌদ্ধ প্রকৌশলী শিক্ষার্থী এবং প্রাক্তন ভাই-বোনদের আন্তরিক মৈত্রীময় শুভেচ্ছা। পরম করুণাময় বুদ্ধের মৈত্রী, অহিংসা ও করুণার চেতনায় উজ্জীবিত হয়ে আমাদের এই ডিজিটাল পদযাত্রা।'
  },
  {
    id: 'ldr-02',
    name: 'Noyon Chakma',
    nameBn: 'নয়ন চাকমা',
    role: 'General Secretary',
    type: 'current',
    term: '2025 - 2026',
    department: 'Civil Engineering (19th Batch)',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80',
    message: 'It is a sacred privilege to serve our beloved BSWA, DUET. Through this centralized platform, we aim to ensure complete financial transparency, hassle-free scholarship distribution for deserving students, real-time alumni networking, and vibrant celebration of our rich Buddhist heritage at DUET campus. We urge all running students and honorable seniors to stay united and actively engage in our welfare drives.',
    messageBn: 'স্বচ্ছতা, ঐক্য এবং সেবার ব্রত নিয়ে বিএসডব্লিউএ ডুয়েট পরিবারের প্রতিটি সদস্যের পাশে দাঁড়ানোই আমাদের মূল লক্ষ্য।'
  },
  // Former Presidents
  {
    id: 'ldr-past-01',
    name: 'Engr. Shumon Barua',
    role: 'President',
    type: 'former',
    term: '2024 - 2025',
    department: 'Computer Science & Engineering',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    order: 1
  },
  {
    id: 'ldr-past-02',
    name: 'Engr. Subash Chakma',
    role: 'President',
    type: 'former',
    term: '2023 - 2024',
    department: 'Mechanical Engineering',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    order: 2
  },
  {
    id: 'ldr-past-03',
    name: 'Engr. Utpal Tanchangya',
    role: 'President',
    type: 'former',
    term: '2022 - 2023',
    department: 'Civil Engineering',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    order: 3
  },
  // Former General Secretaries
  {
    id: 'ldr-past-04',
    name: 'Engr. Bishwajit Barua',
    role: 'General Secretary',
    type: 'former',
    term: '2024 - 2025',
    department: 'Electrical & Electronic Engineering',
    photoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
    order: 1
  },
  {
    id: 'ldr-past-05',
    name: 'Engr. Sushanta Marma',
    role: 'General Secretary',
    type: 'former',
    term: '2023 - 2024',
    department: 'Textile Engineering',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    order: 2
  },
  {
    id: 'ldr-past-06',
    name: 'Engr. Amitava Tanchangya',
    role: 'General Secretary',
    type: 'former',
    term: '2022 - 2023',
    department: 'Electrical & Electronic Engineering',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    order: 3
  }
];

export const INITIAL_MEDIA: MediaItem[] = [
  {
    id: 'med-01',
    albumId: 'alb-purnima',
    albumTitle: 'Buddha Purnima 2569 B.E. Celebration',
    title: 'Peace Rally and Lighting of 1000 Butter Lamps at DUET',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
    date: '2025-05-23'
  },
  {
    id: 'med-02',
    albumId: 'alb-purnima',
    albumTitle: 'Buddha Purnima 2569 B.E. Celebration',
    title: 'Venerable Bhikkhu Sangha offering blessings to DUET students',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    date: '2025-05-23'
  },
  {
    id: 'med-03',
    albumId: 'alb-kathina',
    albumTitle: 'Kathina Chibar Dana 2025',
    title: 'Procession of Holy Chibar with DUET alumni and students',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80',
    date: '2025-11-08'
  },
  {
    id: 'med-04',
    albumId: 'alb-reception',
    albumTitle: 'Freshers Reception & Orientation',
    title: '22nd Batch Freshers Welcome ceremony at DUET auditorium',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    date: '2025-02-14'
  },
  {
    id: 'med-05',
    albumId: 'alb-welfare',
    albumTitle: 'Charity & Blood Donation Drive',
    title: 'Voluntary Blood Donation Camp organized by BSWA DUET',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=800&q=80',
    date: '2025-09-12'
  }
];

export const INITIAL_GALLERY: GalleryPhoto[] = [
  {
    id: 'gal-01',
    title: 'Buddha Purnima Peace Procession',
    caption: 'Students and faculty light 1000 butter lamps across the DUET campus.',
    category: 'Buddha Purnima',
    url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1000&q=80',
    date: '2025-05-23',
    year: '2025',
    uploadedBy: 'BSWA Media Team'
  },
  {
    id: 'gal-02',
    title: 'Kathina Chibar Dana Ceremony',
    caption: 'Offering of the holy robe with alumni and current students.',
    category: 'Kathina',
    url: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1000&q=80',
    date: '2025-11-08',
    year: '2025',
    uploadedBy: 'BSWA Media Team'
  },
  {
    id: 'gal-03',
    title: 'Merit Scholarship Award Ceremony',
    caption: 'Stipend certificates handed to top-performing Buddhist undergraduates.',
    category: 'Scholarship',
    url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80',
    date: '2024-12-15',
    year: '2024',
    uploadedBy: 'BSWA Media Team'
  },
  {
    id: 'gal-04',
    title: 'Voluntary Blood Donation Camp',
    caption: '85 bags collected for the DUET community and Gazipur Sadar Hospital.',
    category: 'Welfare',
    url: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=1000&q=80',
    date: '2024-09-12',
    year: '2024',
    uploadedBy: 'BSWA Media Team'
  }
];

export const BUDDHIST_HOLIDAYS_2026: BuddhistHoliday[] = [
  {
    name: 'Buddha Purnima (Vesak Day 2570 B.E.)',
    nameBn: 'পবিত্র বুদ্ধপূর্ণিমা (বৈশাখী পূর্ণিমা)',
    dateStr: 'May 12, 2026',
    significance: 'Commemoration of the Birth, Supreme Enlightenment, and Mahaparinirvana of Gautama Buddha.',
    significanceBn: 'তথাগত গৌতম বুদ্ধের ত্রি-স্মৃতিবিজড়িত জন্ম, বোধিলাভ ও মহাপরিনির্বাণ মহোৎসব।'
  },
  {
    name: 'Ashadhi Purnima (Dhammacakkappavattana Day)',
    nameBn: 'আষাঢ়ী পূর্ণিমা (বর্ষাবাস আরম্ভ ও ধর্মচক্র প্রবর্তন দিবস)',
    dateStr: 'July 10, 2026',
    significance: 'Commencement of the 3-month Rains Retreat (Vassa) and Buddha\'s first sermon at Sarnath.',
    significanceBn: 'ভিক্ষু সংঘের ত্রৈমাসিক বর্ষাবাস আরম্ভ ও সারনাথে প্রথম পঞ্চবর্গীয় শিষ্যের নিকট ধর্মদেশনা।'
  },
  {
    name: 'Madhu Purnima (Honey Offering Festival)',
    nameBn: 'মধু পূর্ণিমা',
    dateStr: 'September 08, 2026',
    significance: 'Celebrates unity and Parileyyaka forest episode where a monkey and elephant served Lord Buddha.',
    significanceBn: 'পারিল্যেয় বনে বানর ও হস্তী কর্তৃক ভগবান বুদ্ধকে মধুদানের ঐতিহাসিক মিলন মেলা।'
  },
  {
    name: 'Pavarana Purnima (End of Vassa)',
    nameBn: 'প্রবারণা পূর্ণিমা (আশ্বিনী পূর্ণিমা ও ফানুস উৎসব)',
    dateStr: 'October 25, 2026',
    significance: 'Conclusion of Vassa, mutual confession of faults, and festive release of colorful sky lanterns (Phanush).',
    significanceBn: 'বর্ষাবাস সমাপন, আত্মশুদ্ধির প্রবারণা এবং আকাশে মঙ্গল প্রদীপ ও ফানুস উড্ডয়ন।'
  },
  {
    name: 'Kathina Chibar Dana Season',
    nameBn: 'কঠিন চীবর দান কাল',
    dateStr: 'Oct 26 - Nov 24, 2026',
    significance: 'The supreme month of offering sacred saffron robes woven within 24 hours to Bhikkhu Sangha.',
    significanceBn: 'সর্বশ্রেষ্ঠ দান কঠিন চীবর দানের পুণ্যময় মাস।'
  },
  {
    name: 'Maghi Purnima (Ayusan-khara Ojjotthan)',
    nameBn: 'মাঘী পূর্ণিমা',
    dateStr: 'February 19, 2027',
    significance: 'Buddha announces his impending Parinirvana within three months at Chapala Shrine.',
    significanceBn: 'চাপাল চৈত্যে ভগবান বুদ্ধ কর্তৃক তাঁর আয়ু সংস্কার ত্যাগের ঐতিহাসিক ঘোষণা।'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-01',
    action: 'Scholarship Application Approved',
    performedBy: 'Prof. Sudatta Chakma (Super Admin)',
    userRole: 'admin',
    timestamp: '2026-03-01 11:20 AM',
    details: 'Approved scholarship grant of BDT 20,000 for student Ushasi Barua (DUET ID: 214045).'
  },
  {
    id: 'log-02',
    action: 'New Expense Voucher Created',
    performedBy: 'Noyon Chakma (General Secretary)',
    userRole: 'executive',
    timestamp: '2026-02-28 04:45 PM',
    details: 'Generated Expense Voucher VOUCH-2026-0011 for BDT 14,500 under Student Orientation category.'
  },
  {
    id: 'log-03',
    action: 'Member Registration Approved',
    performedBy: 'Executive Committee',
    userRole: 'executive',
    timestamp: '2026-02-10 09:15 AM',
    details: 'Approved running student registration for Ushasi Barua (CSE 21st).'
  },
  {
    id: 'log-04',
    action: 'Notice Published',
    performedBy: 'Admin Board',
    userRole: 'admin',
    timestamp: '2026-03-10 10:00 AM',
    details: 'Published notice: Applications Open for BSWA Merit Scholarship 2026.'
  }
];
