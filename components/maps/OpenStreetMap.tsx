'use client'

import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'

// Fix for default marker icons in Leaflet with Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

interface Marker {
  position: { lat: number; lng: number }
  title: string
  icon?: 'red' | 'blue' | 'green' | 'orange'
  onClick?: () => void
  popup?: string
}

interface OpenStreetMapProps {
  center: { lat: number; lng: number }
  zoom?: number
  markers?: Marker[]
  className?: string
}

const createCustomIcon = (color: string) => {
  const iconHtml = `
    <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 0C5.596 0 0 5.596 0 12.5c0 9.375 12.5 28.5 12.5 28.5S25 21.875 25 12.5C25 5.596 19.404 0 12.5 0z" 
            fill="${color}" stroke="#fff" stroke-width="1"/>
      <circle cx="12.5" cy="12.5" r="5" fill="#fff"/>
    </svg>
  `
  
  return L.divIcon({
    html: iconHtml,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    className: 'custom-marker-icon'
  })
}

const colorMap: Record<string, string> = {
  red: '#DC2626',
  blue: '#2563EB',
  green: '#16A34A',
  orange: '#EA580C',
}

export function OpenStreetMap({ center, zoom = 13, markers = [], className = '' }: OpenStreetMapProps) {
  const mapRef = useRef<L.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const markersLayerRef = useRef<L.LayerGroup | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return

    // Initialize map
    const map = L.map(mapContainerRef.current, {
      center: [center.lat, center.lng],
      zoom: zoom,
      zoomControl: true,
    })

    // Add OpenStreetMap tile layer (free and open-source)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map)

    // Create a layer group for markers
    const markersLayer = L.layerGroup().addTo(map)
    markersLayerRef.current = markersLayer

    mapRef.current = map
    setMapLoaded(true)

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  // Update center
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView([center.lat, center.lng], zoom)
    }
  }, [center.lat, center.lng, zoom])

  // Update markers
  useEffect(() => {
    if (!mapRef.current || !markersLayerRef.current) return

    // Clear existing markers
    markersLayerRef.current.clearLayers()

    // Add new markers
    markers.forEach((marker) => {
      const icon = marker.icon ? createCustomIcon(colorMap[marker.icon]) : undefined
      
      const leafletMarker = L.marker([marker.position.lat, marker.position.lng], {
        icon: icon,
        title: marker.title,
      })

      if (marker.popup || marker.title) {
        leafletMarker.bindPopup(marker.popup || marker.title)
      }

      if (marker.onClick) {
        leafletMarker.on('click', marker.onClick)
      }

      leafletMarker.addTo(markersLayerRef.current!)
    })

    // Fit bounds to show all markers
    if (markers.length > 1) {
      const bounds = L.latLngBounds(markers.map(m => [m.position.lat, m.position.lng]))
      mapRef.current.fitBounds(bounds, { padding: [50, 50] })
    }
  }, [markers])

  return (
    <div className={`relative ${className}`}>
      <div ref={mapContainerRef} className="w-full h-full rounded-lg" />
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-2"></div>
            <p className="text-gray-600">Loading map...</p>
          </div>
        </div>
      )}
    </div>
  )
}
