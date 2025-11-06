'use client'

import { useState, useEffect, useMemo } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { GoogleMap } from '@/components/maps/GoogleMap'
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
} from 'lucide-react'

interface Hospital {
  id: string
  name: string
  address: string
  location: { lat: number; lng: number }
  phone?: string
  rating?: number
  totalRatings?: number
  openNow?: boolean
  placeId: string
  types?: string[]
  website?: string
  businessStatus?: string
  photos?: string[]
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
    openNow: false,
    highRated: false, // 4+ stars
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
      const response = await fetch('/api/hospitals/nearby', {
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
        const hospitalData: Hospital[] = data.results.map((place: any) => ({
          id: place.place_id,
          name: place.name,
          address: place.vicinity || place.formatted_address,
          location: {
            lat: place.geometry.location.lat,
            lng: place.geometry.location.lng,
          },
          rating: place.rating,
          totalRatings: place.user_ratings_total,
          openNow: place.opening_hours?.open_now,
          placeId: place.place_id,
          types: place.types,
          businessStatus: place.business_status,
          photos: place.photos?.slice(0, 3).map((photo: any) => photo.photo_reference),
        }))

        setHospitals(hospitalData)
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
    if (filters.openNow) {
      filtered = filtered.filter((h) => h.openNow === true)
    }
    if (filters.highRated) {
      filtered = filtered.filter((h) => h.rating && h.rating >= 4.0)
    }

    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter(
        (h) =>
          h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          h.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
          h.types?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
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
      icon: hospital.openNow
        ? 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
        : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
      onClick: () => setSelectedHospital(hospital),
    }))

    // Add user location marker
    if (userLocation) {
      markers.push({
        position: userLocation,
        title: 'Your Location',
        icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        onClick: () => {},
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
              Locate hospitals and medical centers near you with real-time data from Google Maps
            </p>
          </div>
        </div>

        <div className="container-custom py-8">
          {/* API Key Warning */}
          {!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && (
            <Card className="p-4 mb-6 bg-amber-50 border-amber-200">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-amber-900 mb-1">Google Maps API Key Required</h3>
                  <p className="text-sm text-amber-800">
                    Please add <code className="bg-amber-100 px-1 py-0.5 rounded">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> to your environment variables. See <code className="bg-amber-100 px-1 py-0.5 rounded">GOOGLE_MAPS_SETUP.md</code> for setup instructions.
                  </p>
                </div>
              </div>
            </Card>
          )}

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
                          const location = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                          }
                          setUserLocation(location)
                          setLocationStatus('success')
                          fetchNearbyHospitals(location)
                        },
                        () => setLocationStatus('error'),
                        { enableHighAccuracy: true }
                      )
                    }
                  }}
                  className="w-full"
                  disabled={locationStatus === 'loading' || loading}
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
                          checked={filters.openNow}
                          onChange={(e) =>
                            setFilters({ ...filters, openNow: e.target.checked })
                          }
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm">Open Now</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.highRated}
                          onChange={(e) =>
                            setFilters({ ...filters, highRated: e.target.checked })
                          }
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm">Highly Rated (4+ stars)</span>
                      </label>
                    </div>

                    <Button
                      variant="outline"
                      onClick={() =>
                        setFilters({
                          openNow: false,
                          highRated: false,
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
                  <Card className="p-8 text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary-600" />
                    <p className="text-gray-600">Finding nearby hospitals...</p>
                  </Card>
                ) : (
                  filteredHospitals.map((hospital) => (
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

                      {hospital.rating && (
                        <div className="flex items-center gap-1 mb-3">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          <span className="text-sm font-medium">{hospital.rating.toFixed(1)}</span>
                          {hospital.totalRatings && (
                            <span className="text-xs text-gray-500">
                              ({hospital.totalRatings} reviews)
                            </span>
                          )}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2">
                        {hospital.openNow !== undefined && (
                          <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                            hospital.openNow
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            <Clock className="w-3 h-3" />
                            {hospital.openNow ? 'Open Now' : 'Closed'}
                          </span>
                        )}
                        {hospital.businessStatus === 'OPERATIONAL' && (
                          <span className="inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                            <Activity className="w-3 h-3" />
                            Operational
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
                      {selectedHospital.rating && (
                        <div className="flex items-center gap-1 mb-2">
                          <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                          <span className="font-semibold">{selectedHospital.rating.toFixed(1)}</span>
                          {selectedHospital.totalRatings && (
                            <span className="text-gray-500">
                              ({selectedHospital.totalRatings} reviews)
                            </span>
                          )}
                        </div>
                      )}
                      {selectedHospital.openNow !== undefined && (
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                          selectedHospital.openNow
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          <Clock className="w-4 h-4" />
                          {selectedHospital.openNow ? 'Open Now' : 'Closed'}
                        </span>
                      )}
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

                  {/* Categories/Types */}
                  {selectedHospital.types && selectedHospital.types.length > 0 && (
                    <div className="mb-6">
                      <h3 className="font-semibold mb-3">Categories</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedHospital.types.slice(0, 10).map((type, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm capitalize"
                          >
                            {type.replace(/_/g, ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button
                      onClick={() => {
                        const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedHospital.location.lat},${selectedHospital.location.lng}&destination_place_id=${selectedHospital.placeId}`
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
                        const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedHospital.name)}&query_place_id=${selectedHospital.placeId}`
                        window.open(url, '_blank')
                      }}
                    >
                      View on Google Maps
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
