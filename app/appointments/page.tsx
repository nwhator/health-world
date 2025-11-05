'use client'

import { useState } from 'react'
import { Calendar, Clock, User, MapPin, Phone, CheckCircle, XCircle, AlertCircle, Filter, Search } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { useCurrency } from '@/contexts/CurrencyContext'

interface Appointment {
  id: string
  type: 'telemedicine' | 'home-visit' | 'emergency' | 'pharmacy'
  service: string
  provider: string
  date: Date
  time: string
  status: 'upcoming' | 'completed' | 'cancelled' | 'in-progress'
  location?: string
  phone: string
  price: number
  notes?: string
}

const mockAppointments: Appointment[] = [
  {
    id: '1',
    type: 'telemedicine',
    service: 'Video Consultation - General Physician',
    provider: 'Dr. Sarah Johnson',
    date: new Date('2024-11-07'),
    time: '10:00 AM',
    status: 'upcoming',
    phone: '+1 (555) 123-4567',
    price: 50,
    notes: 'Follow-up consultation for blood pressure'
  },
  {
    id: '2',
    type: 'home-visit',
    service: 'Dental Checkup',
    provider: 'Dr. Michael Chen',
    date: new Date('2024-11-08'),
    time: '2:30 PM',
    status: 'upcoming',
    location: '123 Main St, Apt 4B',
    phone: '+1 (555) 234-5678',
    price: 75,
  },
  {
    id: '3',
    type: 'pharmacy',
    service: 'Medicine Delivery',
    provider: 'Health World Pharmacy',
    date: new Date('2024-11-05'),
    time: '4:00 PM',
    status: 'in-progress',
    location: '123 Main St, Apt 4B',
    phone: '+1 (555) 345-6789',
    price: 45.50,
  },
  {
    id: '4',
    type: 'home-visit',
    service: 'Physiotherapy Session',
    provider: 'Dr. James Williams',
    date: new Date('2024-11-01'),
    time: '11:00 AM',
    status: 'completed',
    location: '123 Main St, Apt 4B',
    phone: '+1 (555) 456-7890',
    price: 80,
  },
  {
    id: '5',
    type: 'telemedicine',
    service: 'Dermatology Consultation',
    provider: 'Dr. Aisha Patel',
    date: new Date('2024-10-28'),
    time: '3:00 PM',
    status: 'completed',
    phone: '+1 (555) 567-8901',
    price: 60,
  },
  {
    id: '6',
    type: 'emergency',
    service: 'Emergency Ambulance',
    provider: 'Emergency Services',
    date: new Date('2024-10-15'),
    time: '9:45 PM',
    status: 'completed',
    location: '123 Main St, Apt 4B',
    phone: '911',
    price: 0,
    notes: 'Emergency response - chest pain'
  }
]

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState(mockAppointments)
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const { formatPrice } = useCurrency()

  const getStatusDetails = (status: Appointment['status']) => {
    switch (status) {
      case 'upcoming':
        return {
          icon: <Clock className="h-5 w-5" />,
          color: 'bg-primary-100 text-primary-700 border-primary-200',
          label: 'Upcoming'
        }
      case 'in-progress':
        return {
          icon: <AlertCircle className="h-5 w-5" />,
          color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
          label: 'In Progress'
        }
      case 'completed':
        return {
          icon: <CheckCircle className="h-5 w-5" />,
          color: 'bg-accent-100 text-accent-700 border-accent-200',
          label: 'Completed'
        }
      case 'cancelled':
        return {
          icon: <XCircle className="h-5 w-5" />,
          color: 'bg-red-100 text-red-700 border-red-200',
          label: 'Cancelled'
        }
    }
  }

  const getTypeColor = (type: Appointment['type']) => {
    switch (type) {
      case 'telemedicine':
        return 'bg-blue-500'
      case 'home-visit':
        return 'bg-green-500'
      case 'emergency':
        return 'bg-red-500'
      case 'pharmacy':
        return 'bg-purple-500'
    }
  }

  const filteredAppointments = appointments.filter(apt => {
    const matchesFilter = filter === 'all' || apt.status === filter
    const matchesSearch = apt.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         apt.provider.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const upcomingCount = appointments.filter(a => a.status === 'upcoming').length
  const completedCount = appointments.filter(a => a.status === 'completed').length

  const cancelAppointment = (id: string) => {
    setAppointments(prev =>
      prev.map(apt => apt.id === id ? { ...apt, status: 'cancelled' as const } : apt)
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary-100 rounded-lg">
                <Calendar className="h-8 w-8 text-primary-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Appointments</h1>
                <p className="text-gray-600 mt-1">Track and manage all your bookings</p>
              </div>
            </div>
            <Button className="gap-2">
              <Calendar className="h-5 w-5" />
              Book New
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="p-4 bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-500 rounded-lg">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Upcoming</p>
                  <p className="text-2xl font-bold text-gray-900">{upcomingCount}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-accent-50 to-accent-100 border-accent-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent-500 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{completedCount}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-gray-900">{appointments.length}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search appointments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {(['all', 'upcoming', 'completed', 'cancelled'] as const).map(status => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    filter === status
                      ? 'bg-primary-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {filteredAppointments.length === 0 ? (
            <Card className="text-center py-12">
              <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery ? 'Try adjusting your search' : 'Book your first appointment to get started'}
              </p>
              <Button>Book Appointment</Button>
            </Card>
          ) : (
            filteredAppointments.map(appointment => {
              const statusDetails = getStatusDetails(appointment.status)
              return (
                <Card key={appointment.id} className="hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-1.5 h-full ${getTypeColor(appointment.type)} rounded-full`}></div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{appointment.service}</h3>
                            <div className="flex items-center gap-2 text-gray-600">
                              <User className="h-4 w-4" />
                              <span>{appointment.provider}</span>
                            </div>
                          </div>
                          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 ${statusDetails.color}`}>
                            {statusDetails.icon}
                            <span className="font-medium text-sm">{statusDetails.label}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{appointment.date.toLocaleDateString()}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{appointment.time}</span>
                          </div>

                          {appointment.location && (
                            <div className="flex items-center gap-2 text-gray-600">
                              <MapPin className="h-4 w-4 text-gray-400" />
                              <span className="text-sm truncate">{appointment.location}</span>
                            </div>
                          )}

                          <div className="flex items-center gap-2 text-gray-600">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{appointment.phone}</span>
                          </div>
                        </div>

                        {appointment.notes && (
                          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-700">
                              <strong>Notes:</strong> {appointment.notes}
                            </p>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                          <div>
                            <p className="text-sm text-gray-500">Total Amount</p>
                            <p className="text-2xl font-bold text-gray-900">
                              {appointment.price === 0 ? 'Free' : formatPrice(appointment.price)}
                            </p>
                          </div>

                          <div className="flex gap-2">
                            {appointment.status === 'upcoming' && (
                              <>
                                <Button variant="outline" size="sm">
                                  Reschedule
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => cancelAppointment(appointment.id)}
                                  className="text-red-600 hover:text-red-700 border-red-300 hover:border-red-400"
                                >
                                  Cancel
                                </Button>
                              </>
                            )}
                            {appointment.status === 'completed' && (
                              <Button variant="outline" size="sm">
                                View Receipt
                              </Button>
                            )}
                            {appointment.status === 'in-progress' && (
                              <Button variant="primary" size="sm">
                                Track Status
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
