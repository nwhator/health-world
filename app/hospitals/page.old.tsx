'use client'

import { useState, useEffect, useMemo } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { GoogleMap } from '@/components/maps/GoogleMap'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { mockHospitals, Hospital } from '@/lib/mock-data'
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Star,
  Search,
  Navigation,
  Ambulance,
  Activity,
  Clock,
  Filter,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'

// Calculate distance between two coordinates (Haversine formula)
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371 // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export default function HospitalsPage() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    type: 'all' as 'all' | 'government' | 'private' | 'specialized',
    emergencyOnly: false,
    icuOnly: false,
    ambulanceOnly: false,
  })
  const [locationStatus, setLocationStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      setLocationStatus('loading')
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          setLocationStatus('success')
        },
        (error) => {
          console.error('Error getting location:', error)
          // Default to Addis Ababa center if location fails
          setUserLocation({ lat: 9.0320, lng: 38.7469 })
          setLocationStatus('error')
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      )
    } else {
      setUserLocation({ lat: 9.0320, lng: 38.7469 })
      setLocationStatus('error')
    }
  }, [])

  // Filter and sort hospitals
  const filteredHospitals = useMemo(() => {
    let filtered = mockHospitals

    // Apply type filter
    if (filters.type !== 'all') {
      filtered = filtered.filter((h) => h.type === filters.type)
    }

    // Apply service filters
    if (filters.emergencyOnly) {
      filtered = filtered.filter((h) => h.emergencyAvailable)
    }
    if (filters.icuOnly) {
      filtered = filtered.filter((h) => h.icu)
    }
    if (filters.ambulanceOnly) {
      filtered = filtered.filter((h) => h.ambulance)
    }

    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter(
        (h) =>
          h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          h.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
          h.services.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Calculate distance and sort by distance if user location is available
    if (userLocation) {
      return filtered
        .map((hospital) => ({
          ...hospital,
          distance: calculateDistance(
            userLocation.lat,
            userLocation.lng,
            hospital.location.lat,
            hospital.location.lng
          ),
        }))
        .sort((a, b) => a.distance - b.distance)
    }

    return filtered.map((h) => ({ ...h, distance: 0 }))
  }, [filters, searchQuery, userLocation])

  // Prepare markers for the map
  const mapMarkers = useMemo(() => {
    const markers = filteredHospitals.map((hospital) => ({
      position: hospital.location,
      title: hospital.name,
      icon: hospital.emergencyAvailable
        ? 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
        : 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
      onClick: () => setSelectedHospital(hospital),
    }))

    // Add user location marker
    if (userLocation) {
      markers.push({
        position: userLocation,
        title: 'Your Location',
        icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
        onClick: () => {},
      })
    }

    return markers
  }, [filteredHospitals, userLocation])

  const mapCenter = selectedHospital
    ? selectedHospital.location
    : userLocation || { lat: 9.0320, lng: 38.7469 }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-12">
          <div className="container-custom">
            <h1 className="text-4xl font-bold mb-4">Find Nearby Hospitals</h1>
            <p className="text-lg text-primary-100">
              Locate hospitals and medical centers near you with real-time directions
            </p>
          </div>
        </div>

        <div className="container-custom py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sidebar - Search & Filters */}
            <div className="lg:col-span-1 space-y-6">
              {/* Search */}
              <Card className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search hospitals, services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </Card>

              {/* Get Location */}
              <Card className="p-4">
                <Button
                  onClick={() => {
                    if (navigator.geolocation) {
                      setLocationStatus('loading')
                      navigator.geolocation.getCurrentPosition(
                        (position) => {
                          setUserLocation({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                          })
                          setLocationStatus('success')
                        },
                        () => setLocationStatus('error'),
                        { enableHighAccuracy: true }
                      )
                    }
                  }}
                  className="w-full"
                  disabled={locationStatus === 'loading'}
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  {locationStatus === 'loading'
                    ? 'Getting Location...'
                    : locationStatus === 'success'
                    ? 'Update Location'
                    : 'Get My Location'}
                </Button>
                {locationStatus === 'error' && (
                  <p className="text-xs text-amber-600 mt-2">
                    Location access denied. Showing all hospitals.
                  </p>
                )}
              </Card>

              {/* Filters */}
              <Card className="p-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center justify-between w-full mb-4"
                >
                  <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    <span className="font-semibold">Filters</span>
                  </div>
                  {showFilters ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                {showFilters && (
                  <div className="space-y-4">
                    {/* Type Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hospital Type
                      </label>
                      <select
                        value={filters.type}
                        onChange={(e) =>
                          setFilters({ ...filters, type: e.target.value as any })
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="all">All Types</option>
                        <option value="government">Government</option>
                        <option value="private">Private</option>
                        <option value="specialized">Specialized</option>
                      </select>
                    </div>

                    {/* Service Filters */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Services
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.emergencyOnly}
                          onChange={(e) =>
                            setFilters({ ...filters, emergencyOnly: e.target.checked })
                          }
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm">Emergency Available</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.icuOnly}
                          onChange={(e) =>
                            setFilters({ ...filters, icuOnly: e.target.checked })
                          }
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm">ICU Available</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.ambulanceOnly}
                          onChange={(e) =>
                            setFilters({ ...filters, ambulanceOnly: e.target.checked })
                          }
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm">Ambulance Service</span>
                      </label>
                    </div>

                    <Button
                      variant="outline"
                      onClick={() =>
                        setFilters({
                          type: 'all',
                          emergencyOnly: false,
                          icuOnly: false,
                          ambulanceOnly: false,
                        })
                      }
                      className="w-full"
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </Card>

              {/* Results Count */}
              <div className="text-sm text-gray-600 px-2">
                Found {filteredHospitals.length} hospital{filteredHospitals.length !== 1 ? 's' : ''}
              </div>

              {/* Hospital List */}
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {filteredHospitals.map((hospital) => (
                  <Card
                    key={hospital.id}
                    className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
                      selectedHospital?.id === hospital.id ? 'ring-2 ring-primary-500' : ''
                    }`}
                    onClick={() => setSelectedHospital(hospital)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{hospital.name}</h3>
                      {hospital.distance > 0 && (
                        <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full font-medium">
                          {hospital.distance.toFixed(1)} km
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>{hospital.address}</span>
                    </div>

                    <div className="flex items-center gap-1 mb-3">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-medium">{hospital.rating}</span>
                      <span className="text-xs text-gray-500">
                        ({hospital.totalReviews} reviews)
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {hospital.emergencyAvailable && (
                        <span className="inline-flex items-center gap-1 text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                          <Activity className="w-3 h-3" />
                          Emergency
                        </span>
                      )}
                      {hospital.icu && (
                        <span className="inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          ICU
                        </span>
                      )}
                      {hospital.ambulance && (
                        <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          <Ambulance className="w-3 h-3" />
                          Ambulance
                        </span>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Main Content - Map & Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Map */}
              <Card className="p-0 overflow-hidden">
                <GoogleMap
                  center={mapCenter}
                  zoom={13}
                  markers={mapMarkers}
                  className="w-full h-[500px]"
                />
              </Card>

              {/* Selected Hospital Details */}
              {selectedHospital && (
                <Card className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">{selectedHospital.name}</h2>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          selectedHospital.type === 'government'
                            ? 'bg-blue-100 text-blue-700'
                            : selectedHospital.type === 'private'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-teal-100 text-teal-700'
                        }`}>
                          {selectedHospital.type.charAt(0).toUpperCase() + selectedHospital.type.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <span className="font-semibold">{selectedHospital.rating}</span>
                        <span className="text-gray-500">
                          ({selectedHospital.totalReviews} reviews)
                        </span>
                      </div>
                    </div>
                    {selectedHospital.distance > 0 && (
                      <div className="text-right">
                        <div className="text-3xl font-bold text-primary-600">
                          {selectedHospital.distance.toFixed(1)}
                        </div>
                        <div className="text-sm text-gray-600">km away</div>
                      </div>
                    )}
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <div className="text-sm font-medium text-gray-700">Address</div>
                        <div className="text-sm text-gray-600">{selectedHospital.address}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <div className="text-sm font-medium text-gray-700">Phone</div>
                        <a
                          href={`tel:${selectedHospital.phone}`}
                          className="text-sm text-primary-600 hover:underline"
                        >
                          {selectedHospital.phone}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <div className="text-sm font-medium text-gray-700">Email</div>
                        <a
                          href={`mailto:${selectedHospital.email}`}
                          className="text-sm text-primary-600 hover:underline"
                        >
                          {selectedHospital.email}
                        </a>
                      </div>
                    </div>
                    {selectedHospital.website && (
                      <div className="flex items-start gap-3">
                        <Globe className="w-5 h-5 text-gray-400 mt-1" />
                        <div>
                          <div className="text-sm font-medium text-gray-700">Website</div>
                          <a
                            href={selectedHospital.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary-600 hover:underline"
                          >
                            Visit Website
                          </a>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Operating Hours */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="w-5 h-5 text-gray-700" />
                      <h3 className="font-semibold">Operating Hours</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="font-medium text-gray-700">Weekdays</div>
                        <div className="text-gray-600">{selectedHospital.operatingHours.weekdays}</div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-700">Weekends</div>
                        <div className="text-gray-600">{selectedHospital.operatingHours.weekends}</div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-700">Emergency</div>
                        <div className={`font-medium ${
                          selectedHospital.emergencyAvailable ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {selectedHospital.operatingHours.emergency}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Services */}
                  <div className="mb-6">
                    <h3 className="font-semibold mb-3">Available Services</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedHospital.services.map((service, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Insurance */}
                  <div className="mb-6">
                    <h3 className="font-semibold mb-3">Accepted Insurance</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedHospital.insurance.map((ins, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm"
                        >
                          {ins}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button
                      onClick={() => {
                        const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedHospital.location.lat},${selectedHospital.location.lng}`
                        window.open(url, '_blank')
                      }}
                      className="flex-1"
                    >
                      <Navigation className="w-4 h-4 mr-2" />
                      Get Directions
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => window.open(`tel:${selectedHospital.phone}`)}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </Button>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
