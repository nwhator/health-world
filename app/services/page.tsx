'use client'

import { useState } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/Card'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { 
  Stethoscope, 
  Activity, 
  Heart,
  UserCheck,
  Clock,
  DollarSign,
  Star,
  Calendar,
  MapPin,
  CheckCircle2
} from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'
import { Service, ServiceType } from '@/types'
import { useCurrency } from '@/contexts/CurrencyContext'

const services: Service[] = [
  {
    id: '1',
    name: 'Dental Checkup',
    type: 'dental-checkup',
    description: 'Comprehensive dental examination and cleaning at your home',
    price: 30, // USD base price
    subscriptionPrice: 100,
    duration: 60,
    icon: 'UserCheck',
    category: 'Dental Care',
  },
  {
    id: '2',
    name: 'Blood Pressure Monitoring',
    type: 'blood-pressure-monitoring',
    description: 'Regular BP checks with health monitoring and reports',
    price: 10,
    subscriptionPrice: 30,
    duration: 30,
    icon: 'Activity',
    category: 'Health Monitoring',
  },
  {
    id: '3',
    name: 'Physiotherapy Session',
    type: 'physiotherapy',
    description: 'Professional physiotherapy and rehabilitation at home',
    price: 40,
    subscriptionPrice: 140,
    duration: 90,
    icon: 'Heart',
    category: 'Physical Therapy',
  },
  {
    id: '4',
    name: 'General Consultation',
    type: 'general-consultation',
    description: 'Talk to experienced doctors from the comfort of your home',
    price: 20,
    subscriptionPrice: 70,
    duration: 45,
    icon: 'Stethoscope',
    category: 'Medical Consultation',
  },
]

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [isSubscription, setIsSubscription] = useState(false)
  const { formatPrice } = useCurrency()
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    address: '',
    notes: '',
  })

  const handleBooking = (service: Service, subscription: boolean = false) => {
    setSelectedService(service)
    setIsSubscription(subscription)
    setShowBookingModal(true)
  }

  const submitBooking = async () => {
    if (!selectedService) return

    // Validation
    if (!bookingData.date || !bookingData.time || !bookingData.address) {
      toast.error('Please fill in all required fields')
      return
    }

    // Mock API call
    toast.success(`Booking confirmed for ${selectedService.name}!`, {
      description: `Scheduled for ${bookingData.date} at ${bookingData.time}`,
    })

    setShowBookingModal(false)
    setBookingData({ date: '', time: '', address: '', notes: '' })
  }

  const getIcon = (iconName: string) => {
    const icons: Record<string, any> = {
      UserCheck,
      Activity,
      Heart,
      Stethoscope,
    }
    return icons[iconName] || Stethoscope
  }

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="container-custom">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-poppins">
              At-Home Healthcare Services
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional healthcare services delivered to your doorstep. 
              Choose from one-time services or subscription plans.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {services.map((service) => {
              const Icon = getIcon(service.icon)
              
              return (
                <Card key={service.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center">
                        <Icon className="text-primary-500" size={28} />
                      </div>
                      <div className="flex items-center gap-1 bg-accent-50 px-3 py-1 rounded-full">
                        <Star className="text-accent-500 fill-accent-500" size={16} />
                        <span className="text-sm font-semibold text-accent-700">4.8</span>
                      </div>
                    </div>
                    <CardTitle>{service.name}</CardTitle>
                    <p className="text-sm text-primary-500 font-medium">{service.category}</p>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock size={16} />
                        <span>{service.duration} minutes</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <DollarSign size={16} />
                        <span>{formatPrice(service.price)} per session</span>
                      </div>
                    </div>

                    {service.subscriptionPrice && (
                      <div className="bg-accent-50 rounded-lg p-3 mb-4">
                        <p className="text-sm font-semibold text-accent-700 mb-1">
                          Monthly Subscription
                        </p>
                        <p className="text-2xl font-bold text-accent-600">
                          {formatPrice(service.subscriptionPrice)}/month
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          Save up to 30% with unlimited visits
                        </p>
                      </div>
                    )}
                  </CardContent>

                  <CardFooter>
                    <div className="flex gap-3 w-full">
                      <Button
                        variant="outline"
                        fullWidth
                        onClick={() => handleBooking(service, false)}
                      >
                        Book Once
                      </Button>
                      <Button
                        variant="primary"
                        fullWidth
                        onClick={() => handleBooking(service, true)}
                      >
                        Subscribe
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              )
            })}
          </div>

          {/* How It Works */}
          <Card className="bg-gradient-to-br from-primary-50 to-white">
            <CardHeader>
              <CardTitle className="text-center">How It Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    step: 1,
                    title: 'Choose Service',
                    description: 'Select the healthcare service you need',
                    icon: Calendar,
                  },
                  {
                    step: 2,
                    title: 'Book Appointment',
                    description: 'Pick your preferred date, time, and location',
                    icon: MapPin,
                  },
                  {
                    step: 3,
                    title: 'Get Care',
                    description: 'Professional arrives at your doorstep',
                    icon: CheckCircle2,
                  },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.step} className="text-center">
                      <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                        {item.step}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Booking Modal */}
      <Modal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        title={`Book ${selectedService?.name}`}
        size="lg"
      >
        <div className="space-y-4">
          {isSubscription && (
            <div className="bg-accent-50 border border-accent-200 rounded-lg p-4">
              <p className="font-semibold text-accent-700">Monthly Subscription</p>
              <p className="text-2xl font-bold text-accent-600 my-1">
                {formatPrice(selectedService?.subscriptionPrice || 0)}/month
              </p>
              <p className="text-sm text-gray-600">Unlimited visits included</p>
            </div>
          )}

          <Input
            type="date"
            label="Preferred Date"
            value={bookingData.date}
            onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
            required
          />

          <Input
            type="time"
            label="Preferred Time"
            value={bookingData.time}
            onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
            required
          />

          <Textarea
            label="Address"
            placeholder="Enter your full address"
            value={bookingData.address}
            onChange={(e) => setBookingData({ ...bookingData, address: e.target.value })}
            rows={3}
            required
          />

          <Textarea
            label="Additional Notes (Optional)"
            placeholder="Any specific requirements or health concerns"
            value={bookingData.notes}
            onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
            rows={3}
          />

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              fullWidth
              onClick={() => setShowBookingModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              fullWidth
              onClick={submitBooking}
            >
              Confirm Booking
            </Button>
          </div>
        </div>
      </Modal>

      <Footer />
    </>
  )
}
