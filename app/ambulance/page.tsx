'use client'

import { useState, useEffect } from 'react'
import { Ambulance, MapPin, Phone, Clock, Navigation, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

interface AmbulanceStatus {
  id: string
  status: 'dispatched' | 'en-route' | 'arrived' | 'completed'
  estimatedTime: number // minutes
  driver: {
    name: string
    phone: string
    vehicleNumber: string
  }
  location: {
    lat: number
    lng: number
  }
  distance: number // km
}

export default function AmbulancePage() {
  const [ambulanceStatus, setAmbulanceStatus] = useState<AmbulanceStatus>({
    id: 'AMB-2024-001',
    status: 'en-route',
    estimatedTime: 8,
    driver: {
      name: 'Michael Anderson',
      phone: '+1 (555) 123-4567',
      vehicleNumber: 'AMB-457'
    },
    location: {
      lat: 9.0320,
      lng: 38.7469
    },
    distance: 3.2
  })

  const [currentLocation, setCurrentLocation] = useState({ lat: 9.0192, lng: 38.7525 })

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setAmbulanceStatus(prev => ({
        ...prev,
        estimatedTime: Math.max(0, prev.estimatedTime - 1),
        distance: Math.max(0, prev.distance - 0.2),
        location: {
          lat: prev.location.lat + 0.001,
          lng: prev.location.lng + 0.001
        }
      }))
    }, 10000) // Update every 10 seconds

    return () => clearInterval(interval)
  }, [])

  const getStatusDetails = (status: AmbulanceStatus['status']) => {
    switch (status) {
      case 'dispatched':
        return {
          icon: <AlertCircle className="h-6 w-6" />,
          color: 'text-yellow-600 bg-yellow-100',
          message: 'Ambulance has been dispatched'
        }
      case 'en-route':
        return {
          icon: <Navigation className="h-6 w-6" />,
          color: 'text-primary-600 bg-primary-100',
          message: 'Ambulance is on the way'
        }
      case 'arrived':
        return {
          icon: <CheckCircle className="h-6 w-6" />,
          color: 'text-accent-600 bg-accent-100',
          message: 'Ambulance has arrived'
        }
      case 'completed':
        return {
          icon: <CheckCircle className="h-6 w-6" />,
          color: 'text-accent-600 bg-accent-100',
          message: 'Emergency response completed'
        }
    }
  }

  const statusDetails = getStatusDetails(ambulanceStatus.status)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-secondary-100 rounded-lg">
              <Ambulance className="h-8 w-8 text-secondary-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Ambulance Tracking</h1>
              <p className="text-gray-600 mt-1">Real-time ambulance location and status</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <div className="h-96 bg-gradient-to-br from-primary-100 to-accent-100 relative">
                {/* Map Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 text-primary-400 mx-auto mb-4 animate-bounce" />
                    <p className="text-gray-600 font-medium">Live Map View</p>
                    <p className="text-sm text-gray-500 mt-2">Tracking ambulance in real-time</p>
                  </div>
                </div>

                {/* Mock ambulance marker */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-secondary-500 rounded-full animate-ping opacity-75" style={{ width: '60px', height: '60px', left: '-10px', top: '-10px' }}></div>
                    <Ambulance className="h-10 w-10 text-secondary-600 relative z-10" />
                  </div>
                </div>

                {/* Mock destination marker */}
                <div className="absolute bottom-20 right-20">
                  <MapPin className="h-8 w-8 text-accent-600 animate-pulse" />
                </div>

                {/* Distance indicator */}
                <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg px-4 py-2">
                  <p className="text-sm text-gray-600">Distance to destination</p>
                  <p className="text-2xl font-bold text-gray-900">{ambulanceStatus.distance.toFixed(1)} km</p>
                </div>
              </div>
            </Card>

            {/* Timeline */}
            <Card className="mt-6">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Timeline</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-accent-600" />
                      </div>
                      <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                    </div>
                    <div className="flex-1 pb-6">
                      <p className="font-medium text-gray-900">Emergency call received</p>
                      <p className="text-sm text-gray-500">Request ID: {ambulanceStatus.id}</p>
                      <p className="text-xs text-gray-400 mt-1">2 minutes ago</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-accent-600" />
                      </div>
                      <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                    </div>
                    <div className="flex-1 pb-6">
                      <p className="font-medium text-gray-900">Ambulance dispatched</p>
                      <p className="text-sm text-gray-500">Vehicle: {ambulanceStatus.driver.vehicleNumber}</p>
                      <p className="text-xs text-gray-400 mt-1">5 minutes ago</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center animate-pulse">
                        <Navigation className="h-5 w-5 text-primary-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">En route to location</p>
                      <p className="text-sm text-gray-500">ETA: {ambulanceStatus.estimatedTime} minutes</p>
                      <p className="text-xs text-gray-400 mt-1">In progress...</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Info Section */}
          <div className="space-y-6">
            {/* Status Card */}
            <Card>
              <div className="p-6">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${statusDetails.color} mb-4`}>
                  {statusDetails.icon}
                  <span className="font-medium capitalize">{ambulanceStatus.status.replace('-', ' ')}</span>
                </div>
                <p className="text-gray-600 mb-4">{statusDetails.message}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Clock className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Estimated arrival</p>
                      <p className="font-semibold">{ambulanceStatus.estimatedTime} minutes</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-700">
                    <Navigation className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Distance</p>
                      <p className="font-semibold">{ambulanceStatus.distance.toFixed(1)} km away</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Driver Info Card */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Driver Information</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium text-gray-900">{ambulanceStatus.driver.name}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Vehicle Number</p>
                    <p className="font-medium text-gray-900">{ambulanceStatus.driver.vehicleNumber}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Contact</p>
                    <p className="font-medium text-gray-900">{ambulanceStatus.driver.phone}</p>
                  </div>

                  <Button
                    variant="accent"
                    fullWidth
                    className="mt-4 gap-2"
                    onClick={() => window.location.href = `tel:${ambulanceStatus.driver.phone}`}
                  >
                    <Phone className="h-5 w-5" />
                    Call Driver
                  </Button>
                </div>
              </div>
            </Card>

            {/* Emergency Actions */}
            <Card className="border-2 border-secondary-200">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Actions</h3>
                <div className="space-y-3">
                  <Button
                    variant="secondary"
                    fullWidth
                    className="gap-2"
                    onClick={() => window.location.href = 'tel:911'}
                  >
                    <Phone className="h-5 w-5" />
                    Call Emergency Services
                  </Button>
                  
                  <Button
                    variant="outline"
                    fullWidth
                    className="gap-2"
                  >
                    <MapPin className="h-5 w-5" />
                    Share My Location
                  </Button>
                </div>

                <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-sm text-yellow-800">
                    <strong>Important:</strong> Stay calm and follow the dispatcher's instructions. Help is on the way.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
