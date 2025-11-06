import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { location, radius = 10000 } = await request.json()
    
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Google Maps API key not configured' },
        { status: 500 }
      )
    }

    // Call Google Places API Nearby Search
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=${radius}&type=hospital&key=${apiKey}`
    
    const response = await fetch(url)
    const data = await response.json()

    if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
      console.error('Google Places API error:', data)
      return NextResponse.json(
        { error: `Google Places API error: ${data.status}`, results: [] },
        { status: data.status === 'ZERO_RESULTS' ? 200 : 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching nearby hospitals:', error)
    return NextResponse.json(
      { error: 'Failed to fetch hospitals', results: [] },
      { status: 500 }
    )
  }
}
