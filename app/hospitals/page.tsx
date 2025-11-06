'use client'

import { useState, useEffect, useMemo, KeyboardEvent } from 'react'
import dynamic from 'next/dynamic'
import { toast } from 'sonner'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import {
  MapPin,
  Phone,
  Globe,
  Star,
  Search,
  Navigation,
  Activity,
  Clock,
  Filter,
  ChevronDown,
  ChevronUp,
  Loader2,
  AlertCircle,
  Mail,
  Building,
} from 'lucide-react'
import { HospitalListSkeleton } from '@/components/ui/Skeleton'

// Dynamically import OpenStreetMap to avoid SSR issues with Leaflet
const OpenStreetMap = dynamic(
  () => import('@/components/maps/OpenStreetMap').then((mod) => mod.OpenStreetMap),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-[500px] rounded-lg bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    )
  }
)

interface Hospital {
  id: string
  type: string
  name: string
  address: string
  location: { lat: number; lng: number }
  phone?: string
  website?: string
  openingHours?: string
  emergency?: boolean
  beds?: string
  operator?: string
  healthcare?: string
  amenity?: string
  wheelchair?: boolean
  email?: string
  osmId: number
  osmType: string
  distance?: number
}

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
    emergencyOnly: false,
    wheelchairAccessible: false,
  })
  const [hospitals, setHospitals] = useState<Hospital[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const [locationStatus, setLocationStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')

  useEffect(() => {
    // Get user's current location and fetch hospitals
    if (navigator.geolocation) {
      setLocationStatus('loading')
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          setUserLocation(location)
          setLocationStatus('success')
          fetchNearbyHospitals(location)
        },
        (error) => {
          console.error('Error getting location:', error)
          // Default to Addis Ababa center if location fails
          const defaultLocation = { lat: 9.0320, lng: 38.7469 }
          setUserLocation(defaultLocation)
          setLocationStatus('error')
          fetchNearbyHospitals(defaultLocation)
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      )
    } else {
      const defaultLocation = { lat: 9.0320, lng: 38.7469 }
      setUserLocation(defaultLocation)
      setLocationStatus('error')
      fetchNearbyHospitals(defaultLocation)
    }
  }, [])

  const fetchNearbyHospitals = async (location: { lat: number; lng: number }) => {
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch('/api/hospitals/osm-nearby', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          location, 
          radius: 15000 // 15km radius
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch hospitals')
      }

      if (data.results && data.results.length > 0) {
        setHospitals(data.results)
      } else {
        setError('No hospitals found in your area. Try expanding your search radius.')
        setHospitals([])
      }
    } catch (error: any) {
      console.error('Error fetching hospitals:', error)
      setError(error.message || 'Failed to load hospitals. Please try again later.')
      setHospitals([])
    } finally {
      setLoading(false)
    }
  }

  // Filter and sort hospitals
  const filteredHospitals = useMemo(() => {
    let filtered = hospitals

    // Apply filters
    if (filters.emergencyOnly) {
      filtered = filtered.filter((h) => h.emergency === true)
    }
    if (filters.wheelchairAccessible) {
      filtered = filtered.filter((h) => h.wheelchair === true)
    }

    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter(
        (h) =>
          h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          h.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
          h.operator?.toLowerCase().includes(searchQuery.toLowerCase())
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
  }, [filters, searchQuery, userLocation, hospitals])

  // Prepare markers for the map
  const mapMarkers = useMemo(() => {
    const markers = filteredHospitals.map((hospital) => ({
      position: hospital.location,
      title: hospital.name,
      icon: hospital.emergency ? 'red' : 'blue' as 'red' | 'blue' | 'green' | 'orange',
      onClick: () => setSelectedHospital(hospital),
      popup: `<strong>${hospital.name}</strong><br/>${hospital.address}`,
    }))

    // Add user location marker
    if (userLocation) {
      markers.push({
        position: userLocation,
        title: 'Your Location',
        icon: 'green' as 'red' | 'blue' | 'green' | 'orange',
        onClick: () => {},
        popup: '<strong>Your Location</strong>',
      })
    }

    return markers
  }, [filteredHospitals, userLocation])

  const mapCenter = selectedHospital
    ? selectedHospital.location
    : userLocation || { lat: 9.0320, lng: 38.7469 }

  const retryFetch = () => {
    if (userLocation) {
      fetchNearbyHospitals(userLocation)
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-12">
          <div className="container-custom">
            <h1 className="text-4xl font-bold mb-4">Find Nearby Hospitals</h1>
            <p className="text-lg text-primary-100">
              Locate hospitals and medical centers near you using OpenStreetMap data
            </p>
            <p className="text-sm text-primary-200 mt-2">
              🗺️ Powered by OpenStreetMap - Free, open-source, and community-driven
            </p>
          </div>
        </div>

        <div className="container-custom py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sidebar - Search & Filters */}
            <div className="lg:col-span-1 space-y-6">
              {/* Search */}
              <Card className="p-4 shadow-sm hover:shadow-md transition-shadow">
                <h2 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Search className="w-5 h-5 text-primary-600" />
                  Search Hospitals
                </h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors" />
                  <Input
                    type="text"
                    placeholder="Search hospitals..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 focus:ring-2 focus:ring-primary-500 transition-all"
                    aria-label="Search hospitals by name"
                  />
                </div>
              </Card>

              {/* Get Location */}
              <Card className="p-4 shadow-sm hover:shadow-md transition-shadow">
                <h2 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary-600" />
                  Your Location
                </h2>
                <Button
                  onClick={() => {
                    if (navigator.geolocation) {
                      setLocationStatus('loading')
                      toast.loading('Getting your location...', { id: 'location' })
                      navigator.geolocation.getCurrentPosition(
                        (position) => {
                          const location = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                          }
                          setUserLocation(location)
                          setLocationStatus('success')
                          toast.success('Location updated!', { id: 'location' })
                          fetchNearbyHospitals(location)
                        },
                        () => {
                          setLocationStatus('error')
                          toast.error('Failed to get location', { id: 'location' })
                        },
                        { enableHighAccuracy: true }
                      )
                    }
                  }}
                  className="w-full"
                  disabled={locationStatus === 'loading' || loading}
                  isLoading={locationStatus === 'loading' || loading}
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  {locationStatus === 'loading' || loading
                    ? 'Getting Location...'
                    : locationStatus === 'success'
                    ? 'Update Location'
                    : 'Get My Location'}
                </Button>
                {locationStatus === 'error' && (
                  <p className="text-xs text-amber-600 mt-2">
                    Location access denied. Showing hospitals in Addis Ababa.
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
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.emergencyOnly}
                          onChange={(e) =>
                            setFilters({ ...filters, emergencyOnly: e.target.checked })
                          }
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm">Emergency Services</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.wheelchairAccessible}
                          onChange={(e) =>
                            setFilters({ ...filters, wheelchairAccessible: e.target.checked })
                          }
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm">Wheelchair Accessible</span>
                      </label>
                    </div>

                    <Button
                      variant="outline"
                      onClick={() =>
                        setFilters({
                          emergencyOnly: false,
                          wheelchairAccessible: false,
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
                {loading ? (
                  'Loading...'
                ) : error ? (
                  <div className="text-red-600">{error}</div>
                ) : (
                  <>
                    Found {filteredHospitals.length} hospital{filteredHospitals.length !== 1 ? 's' : ''}
                  </>
                )}
              </div>

              {/* Error State with Retry */}
              {error && (
                <Card className="p-4">
                  <Button onClick={retryFetch} className="w-full">
                    Retry
                  </Button>
                </Card>
              )}

              {/* Hospital List */}
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {loading ? (
                  <HospitalListSkeleton />
                ) : (
                  filteredHospitals.map((hospital) => (
                    <Card
                      key={hospital.id}
                      className={`p-4 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                        selectedHospital?.id === hospital.id 
                          ? 'ring-2 ring-primary-500 shadow-lg border-primary-500' 
                          : 'border border-gray-200'
                      }`}
                      onClick={() => setSelectedHospital(hospital)}
                      role="button"
                      tabIndex={0}
                      onKeyPress={(e: KeyboardEvent<HTMLDivElement>) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          setSelectedHospital(hospital)
                        }
                      }}
                      aria-label={`Select ${hospital.name}`}
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

                      {hospital.operator && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                          <Building className="w-4 h-4" />
                          <span>{hospital.operator}</span>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2">
                        {hospital.emergency && (
                          <span className="inline-flex items-center gap-1 text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                            <Activity className="w-3 h-3" />
                            Emergency
                          </span>
                        )}
                        {hospital.wheelchair && (
                          <span className="inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                            ♿ Accessible
                          </span>
                        )}
                        {hospital.beds && (
                          <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                            🛏️ {hospital.beds} beds
                          </span>
                        )}
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </div>

            {/* Main Content - Map & Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Map - Sticky on desktop */}
              <div className="lg:sticky lg:top-6">
                <Card className="p-0 overflow-hidden">
                  <OpenStreetMap
                    center={mapCenter}
                    zoom={13}
                    markers={mapMarkers}
                    className="w-full h-[400px] md:h-[500px]"
                    enableClustering={filteredHospitals.length > 10}
                  />
                </Card>
              </div>

              {/* Selected Hospital Details */}
              {selectedHospital && (
                <Card className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">{selectedHospital.name}</h2>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {selectedHospital.emergency && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-700">
                            <Activity className="w-4 h-4" />
                            Emergency Services
                          </span>
                        )}
                        {selectedHospital.wheelchair && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                            ♿ Wheelchair Accessible
                          </span>
                        )}
                      </div>
                    </div>
                    {selectedHospital.distance && selectedHospital.distance > 0 && (
                      <div className="text-right">
                        <div className="text-3xl font-bold text-primary-600">
                          {selectedHospital.distance?.toFixed(1)}
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
                    {selectedHospital.phone && (
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
                    )}
                    {selectedHospital.email && (
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
                    )}
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

                  {/* Additional Info */}
                  {(selectedHospital.operator || selectedHospital.beds || selectedHospital.openingHours) && (
                    <div className="mb-6">
                      <h3 className="font-semibold mb-3">Additional Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        {selectedHospital.operator && (
                          <div>
                            <div className="font-medium text-gray-700">Operator</div>
                            <div className="text-gray-600">{selectedHospital.operator}</div>
                          </div>
                        )}
                        {selectedHospital.beds && (
                          <div>
                            <div className="font-medium text-gray-700">Beds</div>
                            <div className="text-gray-600">{selectedHospital.beds}</div>
                          </div>
                        )}
                        {selectedHospital.openingHours && (
                          <div className="md:col-span-2">
                            <div className="font-medium text-gray-700 flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              Opening Hours
                            </div>
                            <div className="text-gray-600 mt-1">{selectedHospital.openingHours}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* OSM Attribution */}
                  <div className="mb-6 p-3 bg-gray-50 rounded-lg text-xs text-gray-600">
                    <p>
                      📍 Data from{' '}
                      <a
                        href={`https://www.openstreetmap.org/${selectedHospital.osmType}/${selectedHospital.osmId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:underline"
                      >
                        OpenStreetMap
                      </a>
                      {' '}• Community-maintained and open-source
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button
                      onClick={() => {
                        const url = `https://www.openstreetmap.org/directions?from=${userLocation?.lat},${userLocation?.lng}&to=${selectedHospital.location.lat},${selectedHospital.location.lng}`
                        window.open(url, '_blank')
                      }}
                      className="flex-1"
                    >
                      <Navigation className="w-4 h-4 mr-2" />
                      Get Directions
                    </Button>
                    {selectedHospital.phone && (
                      <Button
                        variant="outline"
                        onClick={() => window.open(`tel:${selectedHospital.phone}`)}
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call Now
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      onClick={() => {
                        const url = `https://www.openstreetmap.org/${selectedHospital.osmType}/${selectedHospital.osmId}`
                        window.open(url, '_blank')
                      }}
                    >
                      View on OSM
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
