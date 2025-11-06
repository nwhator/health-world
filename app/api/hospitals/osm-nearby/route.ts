import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { location, radius = 15000 } = await request.json()
    
    // Convert radius from meters to degrees (approximate)
    const radiusInDegrees = radius / 111320
    
    // Build Overpass API query to find hospitals
    // Overpass API is OpenStreetMap's query API
    const query = `
      [out:json][timeout:25];
      (
        node["amenity"="hospital"](around:${radius},${location.lat},${location.lng});
        way["amenity"="hospital"](around:${radius},${location.lat},${location.lng});
        relation["amenity"="hospital"](around:${radius},${location.lat},${location.lng});
        node["amenity"="clinic"](around:${radius},${location.lat},${location.lng});
        way["amenity"="clinic"](around:${radius},${location.lat},${location.lng});
        node["healthcare"="hospital"](around:${radius},${location.lat},${location.lng});
        way["healthcare"="hospital"](around:${radius},${location.lat},${location.lng});
      );
      out body;
      >;
      out skel qt;
    `
    
    // Use Overpass API (free and open-source)
    const overpassUrl = 'https://overpass-api.de/api/interpreter'
    
    const response = await fetch(overpassUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `data=${encodeURIComponent(query)}`,
    })

    if (!response.ok) {
      throw new Error('Failed to fetch from Overpass API')
    }

    const data = await response.json()
    
    // Process the data
    const hospitals = data.elements
      .filter((element: any) => element.tags && element.tags.name)
      .map((element: any) => {
        // Calculate center for ways (polygons)
        let lat = element.lat
        let lng = element.lon
        
        if (!lat || !lng) {
          // For ways, calculate centroid
          if (element.center) {
            lat = element.center.lat
            lng = element.center.lon
          }
        }
        
        return {
          id: element.id.toString(),
          type: element.type,
          name: element.tags.name || 'Unnamed Hospital',
          address: element.tags['addr:street'] 
            ? `${element.tags['addr:street']}${element.tags['addr:housenumber'] ? ' ' + element.tags['addr:housenumber'] : ''}, ${element.tags['addr:city'] || ''}`
            : element.tags['addr:full'] || 'Address not available',
          location: {
            lat: lat,
            lng: lng,
          },
          phone: element.tags.phone || element.tags['contact:phone'],
          website: element.tags.website || element.tags['contact:website'],
          openingHours: element.tags.opening_hours,
          emergency: element.tags.emergency === 'yes' || element.tags['emergency:service'] === 'yes',
          beds: element.tags.beds,
          operator: element.tags.operator,
          healthcare: element.tags.healthcare,
          amenity: element.tags.amenity,
          wheelchair: element.tags.wheelchair === 'yes',
          email: element.tags.email || element.tags['contact:email'],
          osmId: element.id,
          osmType: element.type,
        }
      })
      .filter((h: any) => h.location.lat && h.location.lng)

    return NextResponse.json({ results: hospitals })
  } catch (error) {
    console.error('Error fetching hospitals from OSM:', error)
    return NextResponse.json(
      { error: 'Failed to fetch hospitals from OpenStreetMap', results: [] },
      { status: 500 }
    )
  }
}
