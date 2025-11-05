'use client'

import { useState } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { User, Mail, Phone, MapPin, Calendar, Star, Clock, CheckCircle } from 'lucide-react'
import { mockAppointments, mockReviews } from '@/lib/mock-data'
import { formatDate, getStatusColor } from '@/lib/utils'

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState({
    name: 'John Patient',
    email: 'patient@healthworld.com',
    phone: '+251-911-123456',
    address: 'Bole, Addis Ababa',
  })

  const appointments = mockAppointments
  const reviews = mockReviews

  const handleSave = () => {
    setIsEditing(false)
    // In production, make API call here
  }

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="container-custom">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2 font-poppins">
              My Profile
            </h1>
            <p className="text-gray-600">Manage your account and view your activity</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Info */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Profile Information</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    >
                      {isEditing ? 'Save' : 'Edit'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                      <User className="text-primary-500" size={48} />
                    </div>
                    <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center -mt-8 mb-4 border-4 border-white">
                      <CheckCircle className="text-white" size={28} />
                    </div>
                    <span className="text-sm text-accent-600 font-medium">Verified Account</span>
                  </div>

                  <div className="space-y-4">
                    {isEditing ? (
                      <>
                        <Input
                          label="Name"
                          leftIcon={<User size={20} />}
                          value={userData.name}
                          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                        />
                        <Input
                          label="Email"
                          type="email"
                          leftIcon={<Mail size={20} />}
                          value={userData.email}
                          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        />
                        <Input
                          label="Phone"
                          leftIcon={<Phone size={20} />}
                          value={userData.phone}
                          onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                        />
                        <Input
                          label="Address"
                          leftIcon={<MapPin size={20} />}
                          value={userData.address}
                          onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                        />
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-3 text-gray-700">
                          <User size={20} className="text-gray-400" />
                          <span>{userData.name}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-700">
                          <Mail size={20} className="text-gray-400" />
                          <span>{userData.email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-700">
                          <Phone size={20} className="text-gray-400" />
                          <span>{userData.phone}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-700">
                          <MapPin size={20} className="text-gray-400" />
                          <span>{userData.address}</span>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Stats */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Activity Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-primary-50 rounded-lg">
                      <div className="text-3xl font-bold text-primary-600">
                        {appointments.length}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">Appointments</div>
                    </div>
                    <div className="text-center p-4 bg-accent-50 rounded-lg">
                      <div className="text-3xl font-bold text-accent-600">
                        {reviews.length}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">Reviews</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Appointments & Reviews */}
            <div className="lg:col-span-2 space-y-6">
              {/* Appointments */}
              <Card>
                <CardHeader>
                  <CardTitle>My Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-gray-900">Service #{appointment.serviceId}</h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {appointment.isSubscription && (
                                <span className="inline-block bg-accent-100 text-accent-700 px-2 py-0.5 rounded text-xs font-medium mr-2">
                                  Subscription
                                </span>
                              )}
                              {appointment.address}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar size={16} />
                            {formatDate(appointment.date)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={16} />
                            {appointment.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Reviews */}
              <Card>
                <CardHeader>
                  <CardTitle>My Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">
                            {formatDate(review.createdAt)}
                          </span>
                        </div>
                        {review.comment && (
                          <p className="text-gray-700">{review.comment}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
