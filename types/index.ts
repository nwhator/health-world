// User roles
export type UserRole = 'patient' | 'doctor' | 'nurse' | 'physiotherapist' | 'pharmacy' | 'admin';

// User types
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  address?: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Patient extends User {
  role: 'patient';
  medicalHistory?: string[];
  emergencyContact?: string;
}

export interface HealthcareProvider extends User {
  role: 'doctor' | 'nurse' | 'physiotherapist';
  specialization?: string;
  license: string;
  credentials: Credential[];
  rating: number;
  reviewCount: number;
  availability: Availability[];
  bio?: string;
}

export interface Pharmacy extends User {
  role: 'pharmacy';
  license: string;
  medicines: Medicine[];
  rating: number;
  reviewCount: number;
  operatingHours?: string;
}

// Credential verification
export interface Credential {
  id: string;
  userId: string;
  type: 'license' | 'certificate' | 'degree' | 'id';
  documentUrl: string;
  verificationStatus: 'pending' | 'approved' | 'rejected';
  uploadedAt: Date;
  verifiedAt?: Date;
  verifiedBy?: string;
  rejectionReason?: string;
}

// Services
export type ServiceType = 
  | 'dental-checkup' 
  | 'blood-pressure-monitoring' 
  | 'physiotherapy'
  | 'general-consultation'
  | 'nursing-care'
  | 'medicine-delivery';

export interface Service {
  id: string;
  name: string;
  type: ServiceType;
  description: string;
  price: number;
  subscriptionPrice?: number;
  duration: number; // in minutes
  icon: string;
  category: string;
}

// Appointments
export type AppointmentStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'en-route' 
  | 'arrived' 
  | 'in-progress'
  | 'completed' 
  | 'cancelled';

export interface Appointment {
  id: string;
  patientId: string;
  providerId: string;
  serviceId: string;
  date: Date;
  time: string;
  address: string;
  location?: {
    lat: number;
    lng: number;
  };
  status: AppointmentStatus;
  isSubscription: boolean;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Emergency
export type EmergencyType = 'fire' | 'ambulance' | 'police';

export interface EmergencyRequest {
  id: string;
  userId: string;
  type: EmergencyType;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  status: 'active' | 'dispatched' | 'resolved' | 'cancelled';
  timestamp: Date;
  notes?: string;
  responderId?: string;
}

// Payments
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type PaymentType = 'one-time' | 'subscription';

export interface Payment {
  id: string;
  userId: string;
  appointmentId?: string;
  amount: number;
  currency: string;
  type: PaymentType;
  status: PaymentStatus;
  paymentMethod: string;
  stripePaymentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Reviews and Ratings
export interface Review {
  id: string;
  appointmentId: string;
  patientId: string;
  providerId: string;
  rating: number; // 1-5
  comment?: string;
  isModerated: boolean;
  createdAt: Date;
}

// Notifications
export type NotificationType = 
  | 'appointment-reminder' 
  | 'appointment-update'
  | 'emergency-alert'
  | 'health-tip'
  | 'promotion'
  | 'system';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  actionUrl?: string;
  createdAt: Date;
}

// Medicine
export interface Medicine {
  id: string;
  pharmacyId: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  prescriptionRequired: boolean;
  imageUrl?: string;
}

// Availability
export interface Availability {
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
}

// Tracking
export interface TrackingLocation {
  lat: number;
  lng: number;
  timestamp: Date;
  heading?: number;
}
