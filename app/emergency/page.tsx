'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Modal } from '@/components/ui/Modal'
import { OpenStreetMap } from '@/components/maps/OpenStreetMap'
import { Phone, AlertCircle, MapPin, Check } from 'lucide-react'
import { toast } from 'sonner'
import { EmergencyType } from '@/types'

export default function EmergencyPage() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [address, setAddress] = useState<string>('')
  const [accuracy, setAccuracy] = useState<number | null>(null)
  const [isLocating, setIsLocating] = useState(false)
  const [activeEmergency, setActiveEmergency] = useState<EmergencyType | null>(null)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [selectedEmergency, setSelectedEmergency] = useState<EmergencyType | null>(null)

  const emergencyServices = [
    {
      type: 'fire' as EmergencyType,
      title: 'Fire Department',
      number: '101',
      icon: '🔥',
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600',
    },
    {
      type: 'ambulance' as EmergencyType,
      title: 'Ambulance',
      number: '102',
      icon: '🚑',
      color: 'bg-secondary-500',
      hoverColor: 'hover:bg-secondary-600',
    },
    {
      type: 'police' as EmergencyType,
      title: 'Police',
      number: '100',
      icon: '👮',
      color: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700',
    },
  ]

  useEffect(() => {
    getCurrentLocation()
  }, [])

  const getCurrentLocation = () => {
    setIsLocating(true)
    
    if ('geolocation' in navigator) {
      // Try to get location with high accuracy multiple times
      let attempts = 0
      const maxAttempts = 3
      
      const tryGetLocation = () => {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude, accuracy } = position.coords
            
            // If accuracy is poor and we haven't exhausted attempts, try again
            if (accuracy > 500 && attempts < maxAttempts) {
              attempts++
              setTimeout(tryGetLocation, 1000)
              return
            }
            
            setLocation({ lat: latitude, lng: longitude })
            setAccuracy(accuracy)
            
            // Get human-readable address using reverse geocoding
            try {
              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
                {
                  headers: {
                    'User-Agent': 'HealthWorld/1.0'
                  }
                }
              )
              const data = await response.json()
              
              if (data.display_name) {
                setAddress(data.display_name)
              } else {
                setAddress(`Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}`)
              }
            } catch (error) {
              console.error('Error getting address:', error)
              setAddress(`Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}`)
            }
            
            setIsLocating(false)
            
            if (accuracy > 500) {
              toast.warning(`Location detected with ±${accuracy.toFixed(0)}m accuracy. For better accuracy, ensure GPS is enabled.`)
            } else {
              toast.success(`Location detected with ±${accuracy.toFixed(0)}m accuracy`)
            }
          },
          (error) => {
            console.error('Error getting location:', error)
            let errorMessage = 'Could not get your location.'
            
            switch (error.code) {
              case error.PERMISSION_DENIED:
                errorMessage = 'Location access denied. Please enable location permissions in your browser settings.'
                break
              case error.POSITION_UNAVAILABLE:
                errorMessage = 'Location information unavailable. Make sure GPS/Location services are enabled on your device.'
                break
              case error.TIMEOUT:
                errorMessage = 'Location request timed out. Please try again.'
                break
            }
            
            toast.error(errorMessage)
            setIsLocating(false)
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          }
        )
      }
      
      tryGetLocation()
    } else {
      toast.error('Geolocation is not supported by your browser')
      setIsLocating(false)
    }
  }

  const handleEmergencyCall = (type: EmergencyType) => {
    setSelectedEmergency(type)
    setShowConfirmModal(true)
  }

  const confirmEmergencyCall = async () => {
    if (!selectedEmergency || !location) return

    setActiveEmergency(selectedEmergency)
    setShowConfirmModal(false)

    // Mock API call
    toast.success('Emergency request sent! Help is on the way.', {
      duration: 5000,
    })

    // In production, this would make an actual API call
    // await fetch('/api/emergency', {
    //   method: 'POST',
    //   body: JSON.stringify({ type: selectedEmergency, location, address }),
    // })
  }

  const cancelEmergency = () => {
    setActiveEmergency(null)
    toast.info('Emergency request cancelled')
  }

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="container-custom">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary-100 rounded-full mb-4">
              <AlertCircle className="text-secondary-500" size={32} />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4 font-poppins">
              Emergency Assistance
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get immediate help in emergency situations. Your location is automatically shared.
            </p>
          </div>

          {/* Active Emergency Alert */}
          {activeEmergency && (
            <Card className="mb-8 border-2 border-secondary-500 bg-secondary-50">
              <CardContent className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-secondary-500 rounded-full flex items-center justify-center animate-pulse">
                      <AlertCircle className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Emergency Active</h3>
                      <p className="text-sm text-gray-600">
                        {emergencyServices.find(s => s.type === activeEmergency)?.title} has been notified
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" onClick={cancelEmergency}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Location Card */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="text-primary-500" size={24} />
                  Your Location
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={getCurrentLocation}
                  isLoading={isLocating}
                >
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {location ? (
                <>
                  <div className="mb-4">
                    <p className="text-gray-900 font-medium mb-2">{address}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>Lat: {location.lat.toFixed(6)}</span>
                      <span>Lng: {location.lng.toFixed(6)}</span>
                      {accuracy && (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          accuracy < 100 ? 'bg-green-100 text-green-700' :
                          accuracy < 500 ? 'bg-yellow-100 text-yellow-700' :
                          accuracy < 1000 ? 'bg-orange-100 text-orange-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          ±{accuracy.toFixed(0)}m accuracy
                        </span>
                      )}
                    </div>
                    {accuracy && accuracy > 500 && (
                      <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <strong>💡 Tip:</strong> For better accuracy:
                        </p>
                        <ul className="text-xs text-blue-700 mt-2 ml-4 list-disc space-y-1">
                          <li>Enable GPS/Location services on your device</li>
                          <li>Move to an area with clear sky view</li>
                          <li>Ensure location permissions are granted in browser</li>
                          <li>Wait a moment for GPS to calibrate</li>
                        </ul>
                      </div>
                    )}
                  </div>
                  <OpenStreetMap 
                    center={location} 
                    zoom={15}
                    markers={[
                      {
                        position: location,
                        title: 'Your Location',
                        icon: activeEmergency ? 'red' : 'green',
                        popup: '<strong>Your Current Location</strong>'
                      }
                    ]}
                    className="w-full h-96 rounded-lg"
                  />
                </>
              ) : (
                <p className="text-gray-500">Detecting your location...</p>
              )}
            </CardContent>
          </Card>

          {/* Emergency Services */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {emergencyServices.map((service) => (
              <Card
                key={service.type}
                hover
                className="cursor-pointer"
              >
                <CardContent className="text-center py-8">
                  <div className="text-6xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-3xl font-bold text-gray-700 mb-4">
                    {service.number}
                  </p>
                  <Button
                    variant="secondary"
                    fullWidth
                    className={`${service.color} ${service.hoverColor}`}
                    onClick={() => handleEmergencyCall(service.type)}
                  >
                    <Phone size={20} />
                    Call Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Panic Button */}
          <Card className="bg-gradient-to-br from-secondary-50 to-secondary-100 border-2 border-secondary-200">
            <CardContent className="text-center py-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Universal Panic Button
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Press this button in any life-threatening emergency. All emergency services will be notified.
              </p>
              <button
                onClick={() => {
                  toast.error('All emergency services have been alerted!', {
                    duration: 5000,
                  })
                }}
                className="w-32 h-32 bg-secondary-500 hover:bg-secondary-600 rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center mx-auto"
              >
                <span className="text-white text-5xl font-bold">!</span>
              </button>
            </CardContent>
          </Card>

          {/* Safety Tips */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Safety Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[
                  'Stay calm and provide clear information',
                  'Share your exact location when possible',
                  'Follow the dispatcher\'s instructions',
                  'Keep your phone charged and accessible',
                  'Save emergency contacts in your phone',
                ].map((tip, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="text-accent-500 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Confirmation Modal */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Confirm Emergency Call"
      >
        <div className="text-center py-4">
          <div className="text-6xl mb-4">
            {emergencyServices.find(s => s.type === selectedEmergency)?.icon}
          </div>
          <p className="text-lg text-gray-700 mb-6">
            Are you sure you want to call{' '}
            <strong>{emergencyServices.find(s => s.type === selectedEmergency)?.title}</strong>?
          </p>
          <p className="text-sm text-gray-600 mb-6">
            Your location will be shared with emergency services.
          </p>
          <div className="flex gap-4">
            <Button
              variant="outline"
              fullWidth
              onClick={() => setShowConfirmModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="secondary"
              fullWidth
              onClick={confirmEmergencyCall}
            >
              Confirm Call
            </Button>
          </div>
        </div>
      </Modal>

      <Footer />
    </>
  )
}
