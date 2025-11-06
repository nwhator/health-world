# OpenStreetMap Setup Guide

This guide explains how Health World uses **OpenStreetMap (OSM)** - a free, open-source alternative to Google Maps.

## Why OpenStreetMap?

✅ **100% Free** - No API keys, no billing, no usage limits  
✅ **Open Source** - Community-driven, transparent data  
✅ **No Dependencies** - Works out of the box  
✅ **Privacy-Friendly** - No tracking, no data collection  
✅ **Accurate** - Over 1 million contributors worldwide  
✅ **Offline Capable** - Can be used offline with tile caching  

## How It Works

### 1. **Map Display: Leaflet**

- Open-source JavaScript library for interactive maps
- Lightweight and mobile-friendly
- Used by: GitHub, Facebook, Pinterest, and more

### 2. **Map Tiles: OpenStreetMap**

- Free map tiles from OpenStreetMap Foundation
- Rendered from community-contributed data
- Updated regularly by volunteers worldwide

### 3. **Hospital Data: Overpass API**

- OSM's query API for extracting map data
- Free and public (no API key needed)
- Real-time data from OpenStreetMap database

### 4. **Geocoding: Nominatim**

- Free geocoding service by OpenStreetMap
- Converts coordinates to addresses and vice versa
- No API key required

## Installation

The required packages are already included in `package.json`:

```bash
npm install leaflet react-leaflet @types/leaflet --legacy-peer-deps
```

**Note**: Use `--legacy-peer-deps` if you encounter React 19 compatibility issues.

## Components

### OpenStreetMap Component

**File**: `components/maps/OpenStreetMap.tsx`

Features:

- Interactive map with zoom/pan
- Custom colored markers (red, blue, green, orange)
- Marker popups with hospital info
- Auto-fit bounds to show all markers
- Click handlers for markers

Usage:

```tsx
<OpenStreetMap
  center={{ lat: 9.0320, lng: 38.7469 }}
  zoom={13}
  markers={[
    {
      position: { lat: 9.0320, lng: 38.7469 },
      title: 'Hospital Name',
      icon: 'red',
      popup: '<strong>Hospital Name</strong><br/>Address',
      onClick: () => console.log('Clicked!')
    }
  ]}
  className="w-full h-96"
/>
```

## API Routes

### Nearby Hospitals

**Endpoint**: `/api/hospitals/osm-nearby`

Fetches hospitals from OpenStreetMap using Overpass API.

**Request**:

```json
{
  "location": { "lat": 9.0320, "lng": 38.7469 },
  "radius": 15000  // in meters
}
```

**Response**:

```json
{
  "results": [
    {
      "id": "123456",
      "name": "St. Paul's Hospital",
      "address": "Gulele Subcity, Addis Ababa",
      "location": { "lat": 9.0320, "lng": 38.7469 },
      "phone": "+251-11-...",
      "website": "https://...",
      "emergency": true,
      "wheelchair": true,
      "beds": "300",
      "operator": "Government",
      "openingHours": "24/7",
      "osmId": 123456,
      "osmType": "way"
    }
  ]
}
```

### What Data Can OSM Provide?

OpenStreetMap data includes:

- ✅ Hospital name
- ✅ Address (street, city, postal code)
- ✅ GPS coordinates (latitude/longitude)
- ✅ Phone number
- ✅ Website
- ✅ Email
- ✅ Opening hours
- ✅ Emergency services availability
- ✅ Number of beds
- ✅ Operator (government, private, NGO)
- ✅ Wheelchair accessibility
- ✅ Specialties (surgery, maternity, etc.)

**Note**: Data quality depends on community contributions. Some hospitals may have incomplete information.

## Features

### Hospital Finder (`/hospitals`)

- **Real-time Data**: Fetches hospitals from OSM Overpass API
- **15km Radius Search**: Finds hospitals within 15km of your location
- **Smart Filters**:
  - Emergency services only
  - Wheelchair accessible only
- **Distance Calculation**: Shows distance from your location
- **Sorting**: Nearest hospitals appear first
- **Interactive Map**: Click markers to see details
- **Directions**: Opens OpenStreetMap directions in new tab

### Emergency Page (`/emergency`)

- **GPS Tracking**: Shows your current location
- **High Accuracy**: Multiple attempts for better accuracy
- **Reverse Geocoding**: Converts GPS to human-readable address
- **Color-Coded Marker**:
  - Green = Normal mode
  - Red = Emergency activated

## Data Sources

### Overpass API

- **URL**: `https://overpass-api.de/api/interpreter`
- **Rate Limit**: Fair use policy (don't abuse)
- **Query Language**: Overpass QL
- **Response Time**: Usually 1-5 seconds

**Query Example**:

```
[out:json][timeout:25];
(
  node["amenity"="hospital"](around:15000,9.0320,38.7469);
  way["amenity"="hospital"](around:15000,9.0320,38.7469);
);
out body;
```

### Nominatim (Geocoding)

- **URL**: `https://nominatim.openstreetmap.org/reverse`
- **Rate Limit**: 1 request per second (enforced)
- **User-Agent Required**: Must set `User-Agent` header
- **Response Time**: Usually < 1 second

**Example**:

```
https://nominatim.openstreetmap.org/reverse?
  format=json&
  lat=9.0320&
  lon=38.7469&
  zoom=18
```

## Best Practices

### 1. Rate Limiting

```typescript
// Add delay between requests
await new Promise(resolve => setTimeout(resolve, 1000))
```

### 2. User-Agent Header

```typescript
fetch(url, {
  headers: {
    'User-Agent': 'HealthWorld/1.0 (your-email@example.com)'
  }
})
```

### 3. Caching

```typescript
// Cache results in localStorage
localStorage.setItem('hospitals', JSON.stringify(data))
```

### 4. Error Handling

```typescript
try {
  const response = await fetch(overpassUrl)
  if (!response.ok) throw new Error('API error')
  const data = await response.json()
} catch (error) {
  console.error('Failed to fetch:', error)
  // Show cached data or error message
}
```

## Advantages Over Google Maps

| Feature | OpenStreetMap | Google Maps |
|---------|--------------|-------------|
| **Cost** | 100% Free | $200/month free, then paid |
| **API Key** | Not required | Required |
| **Usage Limits** | Fair use | Strict quotas |
| **Data Ownership** | Open data | Google proprietary |
| **Privacy** | No tracking | Tracks users |
| **Offline** | Possible | Limited |
| **Customization** | Full control | Limited |
| **Community** | Open source | Closed |

## Limitations

❌ **No Street View** - OSM doesn't have Street View equivalent  
❌ **No Traffic Data** - Real-time traffic not available  
❌ **Data Quality Varies** - Depends on community contributions  
❌ **No Indoor Maps** - Limited indoor mapping  
❌ **Geocoding Rate Limits** - 1 request/second for Nominatim  

## Improving Data Quality

### How to Contribute to OSM

1. **Create Account**: <https://www.openstreetmap.org/user/new>
2. **Edit Hospital Data**: Click "Edit" on any hospital
3. **Add Missing Info**: Phone, hours, services, etc.
4. **Verify Existing Data**: Check if info is up-to-date

### Tags to Add for Hospitals

```
amenity=hospital
name=Hospital Name
addr:street=Street Name
addr:city=Addis Ababa
phone=+251-11-xxx-xxxx
website=https://...
opening_hours=24/7
emergency=yes
beds=300
operator=Government
wheelchair=yes
healthcare=hospital
```

## Troubleshooting

### Map Not Loading

**Problem**: Blank map or tiles not loading  
**Solution**:

- Check internet connection
- Clear browser cache
- Try different tile server:

  ```tsx
  L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png')
  ```

### No Hospitals Found

**Problem**: "No hospitals found in your area"  
**Solution**:

- Increase search radius in API route
- Check if hospitals are mapped in OSM for your area
- Try searching in a more populated area

### Overpass API Timeout

**Problem**: "Failed to fetch hospitals"  
**Solution**:

- Reduce search radius
- Simplify Overpass query
- Try again (server may be busy)
- Use alternative Overpass endpoint:

  ```
  https://overpass.kumi.systems/api/interpreter
  ```

### Geocoding Rate Limit

**Problem**: Address not showing for location  
**Solution**:

- Add delay between requests
- Cache results
- Use self-hosted Nominatim instance

## Alternative Tile Servers

If default OSM tiles are slow, try these alternatives:

```tsx
// French OSM style
'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png'

// German OSM style
'https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png'

// Humanitarian style (good for emergency services)
'https://tile-{s}.openstreetmap.fr/hot/{z}/{x}/{y}.png'

// CartoDB (clean style)
'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png'
```

## Self-Hosting (Advanced)

For high-traffic applications, consider self-hosting:

1. **Tile Server**: Set up your own tile server
   - [OpenMapTiles](https://openmaptiles.org/)
   - [Mapnik](https://mapnik.org/)

2. **Overpass Instance**: Run your own Overpass API
   - [Overpass API Documentation](https://wiki.openstreetmap.org/wiki/Overpass_API)

3. **Nominatim Instance**: Self-host geocoding
   - [Nominatim Documentation](https://nominatim.org/)

## Resources

- [OpenStreetMap](https://www.openstreetmap.org/) - Main website
- [Leaflet Documentation](https://leafletjs.com/) - Map library docs
- [Overpass Turbo](https://overpass-turbo.eu/) - Query builder
- [OSM Wiki](https://wiki.openstreetmap.org/) - Comprehensive documentation
- [TagInfo](https://taginfo.openstreetmap.org/) - Tag statistics
- [OSM Help](https://help.openstreetmap.org/) - Community support

## Summary

✅ **No setup required** - Works out of the box  
✅ **No API keys** - Completely free  
✅ **No billing** - No credit card needed  
✅ **No tracking** - Privacy-friendly  
✅ **Open source** - Full transparency  
✅ **Community-driven** - Better together  

Health World now uses **100% free and open-source mapping** with no external dependencies or costs! 🗺️

---

**Questions?** Check the OSM Wiki or open an issue on GitHub.
