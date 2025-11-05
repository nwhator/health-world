'use client'

import { useState } from 'react'
import { Video, Phone, Calendar, Clock, User, MessageSquare, Star, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { useCurrency } from '@/contexts/CurrencyContext'

interface Doctor {
  id: string
  name: string
  specialty: string
  rating: number
  experience: number
  image: string
  availability: string
  price: number
  languages: string[]
}

const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'General Physician',
    rating: 4.8,
    experience: 12,
    image: '👩‍⚕️',
    availability: 'Available Now',
    price: 50,
    languages: ['English', 'Spanish']
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Cardiologist',
    rating: 4.9,
    experience: 15,
    image: '👨‍⚕️',
    availability: 'Available in 30 mins',
    price: 75,
    languages: ['English', 'Mandarin']
  },
  {
    id: '3',
    name: 'Dr. Aisha Patel',
    specialty: 'Pediatrician',
    rating: 4.7,
    experience: 10,
    image: '👩‍⚕️',
    availability: 'Available Now',
    price: 60,
    languages: ['English', 'Hindi']
  },
  {
    id: '4',
    name: 'Dr. James Williams',
    specialty: 'Dermatologist',
    rating: 4.6,
    experience: 8,
    image: '👨‍⚕️',
    availability: 'Available in 1 hour',
    price: 65,
    languages: ['English']
  }
]

export default function TelemedicinePage() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [consultationType, setConsultationType] = useState<'video' | 'audio' | null>(null)
  const [showBooking, setShowBooking] = useState(false)
  const { formatPrice } = useCurrency()

  const handleBooking = (doctor: Doctor, type: 'video' | 'audio') => {
    setSelectedDoctor(doctor)
    setConsultationType(type)
    setShowBooking(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary-100 rounded-lg">
              <Video className="h-8 w-8 text-primary-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Telemedicine</h1>
              <p className="text-gray-600 mt-1">Connect with doctors from anywhere</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="p-4 bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-500 rounded-lg">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Available Doctors</p>
                  <p className="text-2xl font-bold text-gray-900">150+</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-accent-50 to-accent-100 border-accent-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent-500 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Successful Consultations</p>
                  <p className="text-2xl font-bold text-gray-900">10k+</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-500 rounded-lg">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Average Rating</p>
                  <p className="text-2xl font-bold text-gray-900">4.8</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {showBooking && selectedDoctor && consultationType ? (
          /* Booking Form */
          <Card className="max-w-2xl mx-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Book Consultation</h2>
              
              <div className="mb-6 p-4 bg-primary-50 rounded-lg flex items-center gap-4">
                <div className="text-4xl">{selectedDoctor.image}</div>
                <div>
                  <h3 className="font-semibold text-gray-900">{selectedDoctor.name}</h3>
                  <p className="text-sm text-gray-600">{selectedDoctor.specialty}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {consultationType === 'video' ? (
                        <Video className="h-4 w-4 text-primary-600" />
                      ) : (
                        <Phone className="h-4 w-4 text-primary-600" />
                      )}
                      <span className="text-sm font-medium text-primary-600">
                        {consultationType === 'video' ? 'Video' : 'Audio'} Consultation - {formatPrice(selectedDoctor.price)}
                      </span>
                    </div>
                </div>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <Input type="text" placeholder="Enter your full name" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <Input type="email" placeholder="your.email@example.com" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <Input type="tel" placeholder="+1 (555) 000-0000" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Date
                    </label>
                    <Input type="date" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Time
                    </label>
                    <Input type="time" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Consultation
                  </label>
                  <textarea
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    rows={4}
                    placeholder="Briefly describe your symptoms or reason for consultation..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    fullWidth
                    onClick={() => setShowBooking(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" fullWidth>
                    Confirm Booking
                  </Button>
                </div>
              </form>
            </div>
          </Card>
        ) : (
          /* Doctors List */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {mockDoctors.map(doctor => (
              <Card key={doctor.id} className="hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-5xl">{doctor.image}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900">{doctor.name}</h3>
                      <p className="text-gray-600">{doctor.specialty}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-semibold text-gray-900">{doctor.rating}</span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-600">{doctor.experience} years exp.</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className={`font-medium ${
                        doctor.availability.includes('Now') ? 'text-accent-600' : 'text-primary-600'
                      }`}>
                        {doctor.availability}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <MessageSquare className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{doctor.languages.join(', ')}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900">{formatPrice(doctor.price)}</span>
                      <span className="text-sm text-gray-500">per consultation</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="primary"
                      fullWidth
                      onClick={() => handleBooking(doctor, 'video')}
                      className="gap-2"
                    >
                      <Video className="h-4 w-4" />
                      Video Call
                    </Button>
                    <Button
                      variant="outline"
                      fullWidth
                      onClick={() => handleBooking(doctor, 'audio')}
                      className="gap-2"
                    >
                      <Phone className="h-4 w-4" />
                      Audio Call
                    </Button>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors">
                      View Profile & Reviews →
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
