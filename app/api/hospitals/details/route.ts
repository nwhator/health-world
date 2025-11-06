import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { placeId } = await request.json()
    
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Google Maps API key not configured' },
        { status: 500 }
      )
    }

    // Call Google Places API Place Details
    const fields = 'name,formatted_address,formatted_phone_number,opening_hours,rating,user_ratings_total,website,geometry,place_id,photos,types,business_status'
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${apiKey}`
    
    const response = await fetch(url)
    const data = await response.json()

    if (data.status !== 'OK') {
      console.error('Google Places API error:', data)
      return NextResponse.json(
        { error: `Google Places API error: ${data.status}` },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching hospital details:', error)
    return NextResponse.json(
      { error: 'Failed to fetch hospital details' },
      { status: 500 }
    )
  }
}
