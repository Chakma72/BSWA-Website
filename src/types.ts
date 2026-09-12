export type SupportedLanguage = 'en-GB' | 'en-US' | 'bn' | 'hi';

export type UserRole = 'guest' | 'student' | 'alumni' | 'executive' | 'admin' | 'superadmin';

export type UserStatus = 'pending' | 'approved' | 'rejected';

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  userType: 'student' | 'alumni' | 'admin' | 'guest';
  // Running Student fields
  duetId?: string;
  department?: string;
  batch?: string;
  hall?: string;
  phone?: string;
  bloodGroup?: string;
  photoUrl?: string;
  // Alumni fields
  graduationBatch?: string;
  currentProfession?: string;
  company?: string;
  currentLocation?: string;
  // Governance & Metadata
  createdAt: string;
  verifiedOtp: boolean;
  isAdmin?: boolean;
  isSuperAdmin?: boolean;
  isSystemOwner?: boolean;
  leadershipRole?: 'President' | 'Publicity Secretary' | 'General Secretary' | 'Advisor' | 'Member' | 'None';
  isVerified?: boolean;
  consentForHallOfAppreciation?: boolean;
  graduatedAt?: string;
  revertedAt?: string;
  revertReason?: string;
}

export interface Notice {
  id: string;
  title: string;
  titleBn?: string;
  content: string;
  date: string;
  author?: string;
  publishedBy?: string;
  category: 'General' | 'Scholarship' | 'Event' | 'Events' | 'Religious' | 'Urgent' | 'Academic' | 'Cultural' | string;
  pinned: boolean;
  attachmentName?: string;
  attachmentUrl?: string;
  priority?: 'high' | 'normal';
}

export interface EventVolunteer {
  userId: string;
  name: string;
  role: string;
  phone?: string;
}

export interface EventAttendee {
  userId: string;
  name: string;
  duetId?: string;
  registeredAt: string;
  checkedIn: boolean;
  checkedInAt?: string;
}

export interface EventItem {
  id: string;
  title: string;
  titleBn?: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: 'buddha_purnima' | 'sanghadana' | 'kathina_chibar_dana' | 'fresher_reception' | 'farewell' | 'blood_donation' | 'religious' | 'welfare' | 'cultural' | 'prayer' | string;
  bannerUrl: string;
  goalAttendees: number;
  registeredCount: number;
  registeredUserIds?: string[];
  volunteers?: EventVolunteer[];
  attendees?: EventAttendee[];
  status: 'upcoming' | 'ongoing' | 'completed' | 'past';
  report?: string;
}

export type CampaignStatus = 'draft' | 'active' | 'paused' | 'completed' | 'archived';

export interface DonationCampaign {
  id: string;
  title: string;
  titleBn?: string;
  description: string;
  goalAmount: number;
  raisedAmount: number;
  deadline: string;
  category: 'Welfare' | 'Kathina' | 'Scholarship' | 'Temple' | 'Emergency' | 'Religious' | string;
  status: CampaignStatus;
  donorsCount: number;
}

export interface DonationRecord {
  id: string;
  campaignId?: string;
  campaignName?: string;
  campaignTitle?: string;
  donorName: string;
  donorEmail?: string;
  donorPhone?: string;
  donorType?: 'student' | 'alumni' | 'guest';
  amount: number;
  date: string;
  paymentMethod: 'bKash' | 'Nagad' | 'Rocket' | 'Bank' | 'Cash' | string;
  refNumber?: string;
  transactionId?: string;
  notes?: string;
  receiptNumber?: string;
  receiptNo?: string;
  verified?: boolean;
  isAnonymous?: boolean;
  consentForHallOfAppreciation?: boolean;
}

export type Donation = DonationRecord;

export type ScholarshipCategory = 'merit' | 'financial_need' | 'special_hardship';
export type ScholarshipStatus = 'submitted' | 'under_review' | 'approved' | 'rejected' | 'pending';

export interface ScholarshipApplication {
  id: string;
  userId?: string;
  fullName?: string;
  applicantName?: string;
  duetId: string;
  department: string;
  batch?: string;
  semester: string;
  cgpa: number;
  phone?: string;
  email?: string;
  fatherName?: string;
  motherName?: string;
  presentAddress?: string;
  permanentAddress?: string;
  familyIncome?: number;
  familyMonthlyIncome?: number;
  category?: ScholarshipCategory;
  scholarshipType?: string;
  motivationStatement?: string;
  reasonForApplying?: string;
  studentIdFile?: string;
  transcriptFile?: string;
  documentsFile?: string;
  marksheetUrl?: string;
  idCardUrl?: string;
  recommendationUrl?: string;
  status: ScholarshipStatus;
  submittedAt?: string;
  appliedAt?: string;
  reviewedBy?: string;
  notes?: string;
  awardAmount?: number;
}

export interface ScholarshipRecipient {
  id: string;
  name: string;
  department: string;
  batch: string;
  year: number;
  scholarshipType: string;
  photoUrl?: string;
  awardAmount: number;
  meritRank?: string;
}

export type DonorTier = 'Monthly' | 'Yearly' | 'Lifetime';
export type RecognitionBadge = 'Diamond' | 'Gold' | 'Silver' | 'Bronze' | 'Patron';

export interface ScholarshipDonor {
  id: string;
  tier: DonorTier;
  donorName: string;
  contributionAmount: number;
  annualAmount?: number;
  startDate?: string;
  contributionYear?: number;
  totalContribution?: number;
  recognitionBadge?: RecognitionBadge;
  activeStatus: boolean;
  contact?: string;
  email?: string;
  profession?: string;
}

export interface ExpenseCategory {
  id: string;
  name: string;
  budget?: number;
  isDefault?: boolean;
}

export interface ExpenseRecord {
  id: string;
  amount: number;
  date: string;
  categoryId?: string;
  categoryName?: string;
  category?: string;
  description?: string;
  title?: string;
  attachmentName?: string;
  invoiceNumber?: string;
  approvedBy: string;
  voucherNumber?: string;
  voucherNo?: string;
  type?: 'expense';
  voucherFileUrl?: string;
}

export interface IncomeRecord {
  id: string;
  source?: 'donation' | 'membership_fee' | 'event_collection' | 'sponsorship' | 'scholarship_donation' | 'other' | string;
  sourceLabel?: string;
  title?: string;
  category?: string;
  amount: number;
  date: string;
  description?: string;
  receiptNumber?: string;
  voucherNo?: string;
  recordedBy?: string;
  approvedBy?: string;
  type?: 'income';
  voucherFileUrl?: string;
}

export interface FinanceRecord {
  id: string;
  title: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  voucherNo?: string;
  approvedBy: string;
  date: string;
  voucherFileUrl?: string;
}

export interface LeaderRecord {
  id: string;
  name: string;
  nameBn?: string;
  role: 'President' | 'General Secretary' | 'Chief Patron' | 'Faculty Advisor' | 'Vice President' | 'Treasurer' | 'Organizing Secretary' | string;
  type: 'current' | 'former' | 'past' | 'advisor';
  term: string;
  photoUrl: string;
  message?: string;
  messageBn?: string;
  contact?: string;
  email?: string;
  department?: string;
  order?: number;
}

export type Leader = LeaderRecord;

export interface MediaItem {
  id: string;
  albumId: string;
  albumTitle: string;
  title: string;
  type: 'photo' | 'video';
  url: string;
  date: string;
}

export interface AuditLog {
  id: string;
  action: string;
  performedBy?: string;
  user?: string;
  userRole?: string;
  timestamp: string;
  details: string;
  ipAddress?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  date: string;
  type: 'notice' | 'event' | 'scholarship' | 'donation' | 'admin';
  read: boolean;
  linkTab?: string;
}

export interface BuddhistHoliday {
  name: string;
  nameBn: string;
  dateStr: string;
  significance: string;
  significanceBn: string;
}

export interface SeniorAdvisor {
  id: string;
  role: string;
  name: string;
  designation: string;
  photoUrl: string;
  message?: string;
  order: number;
  isVisible: boolean;
}

export interface ActivityItem {
  id: string;
  title: string;
  titleBn?: string;
  date: string;
  caption: string;
  imageUrl: string;
  category: string;
  featured: boolean;
  order: number;
}

export interface TopContributor {
  id: string;
  name: string;
  photoUrl?: string;
  totalContribution: number;
  featured: boolean;
  badge: string;
  donorType: 'student' | 'alumni' | 'guest';
}

export interface BiharMember {
  id: string;
  fullName: string;
  mobileNumber: string;
  address?: string;
  gender?: 'Male' | 'Female' | 'Other';
  status: 'pending' | 'approved' | 'rejected';
  registeredAt: string;
}

export interface BiharNotice {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string;
  pinned?: boolean;
}

export interface BiharEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  bannerUrl?: string;
}
