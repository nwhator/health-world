// Currency configurations for African countries
export interface CurrencyConfig {
  code: string
  symbol: string
  name: string
  country: string
  countryCode: string
}

export const currencies: Record<string, CurrencyConfig> = {
  NG: {
    code: 'NGN',
    symbol: '₦',
    name: 'Nigerian Naira',
    country: 'Nigeria',
    countryCode: 'NG'
  },
  GH: {
    code: 'GHS',
    symbol: '₵',
    name: 'Ghanaian Cedi',
    country: 'Ghana',
    countryCode: 'GH'
  },
  KE: {
    code: 'KES',
    symbol: 'KSh',
    name: 'Kenyan Shilling',
    country: 'Kenya',
    countryCode: 'KE'
  },
  ZA: {
    code: 'ZAR',
    symbol: 'R',
    name: 'South African Rand',
    country: 'South Africa',
    countryCode: 'ZA'
  },
  EG: {
    code: 'EGP',
    symbol: 'E£',
    name: 'Egyptian Pound',
    country: 'Egypt',
    countryCode: 'EG'
  },
  ET: {
    code: 'ETB',
    symbol: 'Br',
    name: 'Ethiopian Birr',
    country: 'Ethiopia',
    countryCode: 'ET'
  },
  TZ: {
    code: 'TZS',
    symbol: 'TSh',
    name: 'Tanzanian Shilling',
    country: 'Tanzania',
    countryCode: 'TZ'
  },
  UG: {
    code: 'UGX',
    symbol: 'USh',
    name: 'Ugandan Shilling',
    country: 'Uganda',
    countryCode: 'UG'
  },
  RW: {
    code: 'RWF',
    symbol: 'FRw',
    name: 'Rwandan Franc',
    country: 'Rwanda',
    countryCode: 'RW'
  },
  // Default fallback to Nigeria
  DEFAULT: {
    code: 'NGN',
    symbol: '₦',
    name: 'Nigerian Naira',
    country: 'Nigeria',
    countryCode: 'NG'
  }
}

// Exchange rates relative to USD (approximate)
export const exchangeRates: Record<string, number> = {
  NGN: 1650,    // 1 USD = 1650 NGN
  GHS: 12,      // 1 USD = 12 GHS
  KES: 150,     // 1 USD = 150 KES
  ZAR: 18,      // 1 USD = 18 ZAR
  EGP: 31,      // 1 USD = 31 EGP
  ETB: 56,      // 1 USD = 56 ETB
  TZS: 2500,    // 1 USD = 2500 TZS
  UGX: 3700,    // 1 USD = 3700 UGX
  RWF: 1300,    // 1 USD = 1300 RWF
}

export async function detectUserCountry(): Promise<string> {
  try {
    // Try IP-based geolocation first
    const response = await fetch('https://ipapi.co/json/')
    const data = await response.json()
    
    if (data.country_code && currencies[data.country_code]) {
      return data.country_code
    }
    
    // Fallback to Nigeria
    return 'NG'
  } catch (error) {
    console.error('Error detecting country:', error)
    // Default to Nigeria
    return 'NG'
  }
}

export async function detectUserCountryFromCoords(lat: number, lng: number): Promise<string> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=3&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'HealthWorld/1.0'
        }
      }
    )
    const data = await response.json()
    
    if (data.address?.country_code) {
      const countryCode = data.address.country_code.toUpperCase()
      if (currencies[countryCode]) {
        return countryCode
      }
    }
    
    return 'NG'
  } catch (error) {
    console.error('Error detecting country from coordinates:', error)
    return 'NG'
  }
}

export function formatCurrency(amount: number, currencyConfig: CurrencyConfig): string {
  // Format with appropriate decimal places and thousands separators
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
  
  return `${currencyConfig.symbol}${formatted}`
}

export function convertFromUSD(usdAmount: number, targetCurrency: string): number {
  const rate = exchangeRates[targetCurrency] || exchangeRates.NGN
  return usdAmount * rate
}

export function convertToUSD(amount: number, fromCurrency: string): number {
  const rate = exchangeRates[fromCurrency] || exchangeRates.NGN
  return amount / rate
}
