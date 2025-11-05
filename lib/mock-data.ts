import { User, Service, Appointment, Review, Notification } from '@/types'

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'patient@healthworld.com',
    name: 'John Patient',
    role: 'patient',
    phone: '+251-911-123456',
    address: 'Bole, Addis Ababa',
    isVerified: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    email: 'doctor@healthworld.com',
    name: 'Dr. Sarah Medical',
    role: 'doctor',
    phone: '+251-911-234567',
    isVerified: true,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },
]

export const mockServices: Service[] = [
  {
    id: '1',
    name: 'Dental Checkup',
    type: 'dental-checkup',
    description: 'Comprehensive dental examination and cleaning at your home',
    price: 1500,
    subscriptionPrice: 5000,
    duration: 60,
    icon: 'UserCheck',
    category: 'Dental Care',
  },
  {
    id: '2',
    name: 'Blood Pressure Monitoring',
    type: 'blood-pressure-monitoring',
    description: 'Regular BP checks with health monitoring and reports',
    price: 500,
    subscriptionPrice: 1500,
    duration: 30,
    icon: 'Activity',
    category: 'Health Monitoring',
  },
  {
    id: '3',
    name: 'Physiotherapy Session',
    type: 'physiotherapy',
    description: 'Professional physiotherapy and rehabilitation at home',
    price: 2000,
    subscriptionPrice: 7000,
    duration: 90,
    icon: 'Heart',
    category: 'Physical Therapy',
  },
]

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientId: '1',
    providerId: '2',
    serviceId: '1',
    date: new Date('2024-11-15T10:00:00'),
    time: '10:00 AM',
    address: 'Bole, Addis Ababa',
    location: { lat: 9.0192, lng: 38.7525 },
    status: 'confirmed',
    isSubscription: false,
    createdAt: new Date('2024-11-05'),
    updatedAt: new Date('2024-11-05'),
  },
  {
    id: '2',
    patientId: '1',
    providerId: '2',
    serviceId: '2',
    date: new Date('2024-11-20T14:00:00'),
    time: '2:00 PM',
    address: 'Bole, Addis Ababa',
    status: 'pending',
    isSubscription: true,
    createdAt: new Date('2024-11-05'),
    updatedAt: new Date('2024-11-05'),
  },
]

export const mockReviews: Review[] = [
  {
    id: '1',
    appointmentId: '1',
    patientId: '1',
    providerId: '2',
    rating: 5,
    comment: 'Excellent service! Very professional and caring.',
    isModerated: true,
    createdAt: new Date('2024-11-06'),
  },
]

export const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    type: 'appointment-reminder',
    title: 'Appointment Reminder',
    message: 'Your dental checkup is scheduled for tomorrow at 10:00 AM',
    isRead: false,
    actionUrl: '/appointments/1',
    createdAt: new Date('2024-11-05'),
  },
  {
    id: '2',
    userId: '1',
    type: 'health-tip',
    title: 'Daily Health Tip',
    message: 'Remember to stay hydrated! Drink at least 8 glasses of water today.',
    isRead: true,
    createdAt: new Date('2024-11-04'),
  },
]
