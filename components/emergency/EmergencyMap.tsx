'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
// @ts-ignore: side-effect import of CSS without type declarations
import 'leaflet/dist/leaflet.css'
import { EmergencyType } from '@/types'

interface EmergencyMapProps {
  center: { lat: number; lng: number }
  activeEmergency?: EmergencyType | null
}

export default function EmergencyMap({ center, activeEmergency }: EmergencyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const markerRef = useRef<L.Marker | null>(null)

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    // Initialize map
    const map = L.map(mapRef.current).setView([center.lat, center.lng], 15)
    mapInstanceRef.current = map

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map)

    // Fix marker icon issue
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    })

    // Add user location marker
    const marker = L.marker([center.lat, center.lng])
      .addTo(map)
      .bindPopup('Your Location')
      .openPopup()
    
    markerRef.current = marker

    // Add circle around user location
    L.circle([center.lat, center.lng], {
      color: activeEmergency ? '#FF3B30' : '#1E90FF',
      fillColor: activeEmergency ? '#FF3B30' : '#1E90FF',
      fillOpacity: 0.2,
      radius: 500,
    }).addTo(map)

    return () => {
      map.remove()
      mapInstanceRef.current = null
    }
  }, [])

  useEffect(() => {
    if (mapInstanceRef.current && markerRef.current) {
      // Update marker position
      markerRef.current.setLatLng([center.lat, center.lng])
      mapInstanceRef.current.setView([center.lat, center.lng], 15)
    }
  }, [center])

  return (
    <div 
      ref={mapRef} 
      className="w-full h-96 rounded-lg overflow-hidden shadow-md"
    />
  )
}
