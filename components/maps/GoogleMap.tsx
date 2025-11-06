'use client'

import { useEffect, useRef } from 'react'

interface GoogleMapProps {
  center: { lat: number; lng: number }
  zoom?: number
  markers?: Array<{
    position: { lat: number; lng: number }
    title: string
    icon?: string
    onClick?: () => void
  }>
  className?: string
}

declare global {
  interface Window {
    google: any
    initMap?: () => void
  }
}

export function GoogleMap({ 
  center, 
  zoom = 13, 
  markers = [], 
  className = 'w-full h-96 rounded-lg' 
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

    if (!apiKey) {
      console.error('Google Maps API key is not set. Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your environment variables.')
      return
    }

    // Check if Google Maps script is already loaded
    if (window.google && window.google.maps) {
      initializeMap()
      return
    }

    // Load Google Maps script
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
    script.async = true
    script.defer = true
    script.onload = () => {
      initializeMap()
    }
    script.onerror = () => {
      console.error('Failed to load Google Maps script')
    }
    document.head.appendChild(script)

    return () => {
      // Cleanup markers
      markersRef.current.forEach(marker => marker.setMap(null))
      markersRef.current = []
    }
  }, [])

  useEffect(() => {
    if (mapInstanceRef.current) {
      // Update center
      mapInstanceRef.current.setCenter(center)
      
      // Update markers
      updateMarkers()
    }
  }, [center, markers])

  const initializeMap = () => {
    if (!mapRef.current || !window.google) return

    // Create map
    const map = new window.google.maps.Map(mapRef.current, {
      center,
      zoom,
      styles: [
        {
          featureType: 'poi.medical',
          elementType: 'labels',
          stylers: [{ visibility: 'on' }]
        }
      ],
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true,
    })

    mapInstanceRef.current = map

    // Add markers
    updateMarkers()
  }

  const updateMarkers = () => {
    if (!mapInstanceRef.current || !window.google) return

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null))
    markersRef.current = []

    // Add new markers
    markers.forEach(markerData => {
      const marker = new window.google.maps.Marker({
        position: markerData.position,
        map: mapInstanceRef.current,
        title: markerData.title,
        icon: markerData.icon || undefined,
      })

      if (markerData.onClick) {
        marker.addListener('click', markerData.onClick)
      }

      markersRef.current.push(marker)
    })

    // Fit bounds if multiple markers
    if (markers.length > 1) {
      const bounds = new window.google.maps.LatLngBounds()
      markers.forEach(marker => {
        bounds.extend(marker.position)
      })
      mapInstanceRef.current.fitBounds(bounds)
    }
  }

  return (
    <div className={className}>
      <div ref={mapRef} className="w-full h-full rounded-lg" />
      {!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="text-center p-4">
            <p className="text-red-600 font-semibold mb-2">Google Maps Not Configured</p>
            <p className="text-sm text-gray-600">
              Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your environment variables.
            </p>
            <p className="text-xs text-gray-500 mt-2">
              See GOOGLE_MAPS_SETUP.md for instructions.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
