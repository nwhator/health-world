'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { 
  CurrencyConfig, 
  currencies, 
  detectUserCountry, 
  formatCurrency as formatCurrencyUtil,
  convertFromUSD 
} from '@/lib/currency'
import { toast } from 'sonner'

interface CurrencyContextType {
  currency: CurrencyConfig
  setCurrency: (countryCode: string) => void
  formatPrice: (usdAmount: number) => string
  convertPrice: (usdAmount: number) => number
  isLoading: boolean
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyConfig>(currencies.DEFAULT)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if currency is stored in localStorage
    const storedCurrency = localStorage.getItem('selectedCurrency')
    
    if (storedCurrency && currencies[storedCurrency]) {
      setCurrencyState(currencies[storedCurrency])
      setIsLoading(false)
    } else {
      // Auto-detect user's country
      detectUserCountry().then(countryCode => {
        const detectedCurrency = currencies[countryCode] || currencies.DEFAULT
        setCurrencyState(detectedCurrency)
        localStorage.setItem('selectedCurrency', countryCode)
        setIsLoading(false)
        
        // Show toast notification
        toast.success(`Currency set to ${detectedCurrency.name} (${detectedCurrency.symbol})`, {
          description: `Detected location: ${detectedCurrency.country}`,
          duration: 4000,
        })
      }).catch(() => {
        setCurrencyState(currencies.DEFAULT)
        setIsLoading(false)
      })
    }
  }, [])

  const setCurrency = (countryCode: string) => {
    const newCurrency = currencies[countryCode] || currencies.DEFAULT
    setCurrencyState(newCurrency)
    localStorage.setItem('selectedCurrency', countryCode)
    
    // Show toast notification
    toast.success(`Currency changed to ${newCurrency.name}`, {
      description: `All prices will be shown in ${newCurrency.symbol} ${newCurrency.code}`,
      duration: 3000,
    })
  }

  const formatPrice = (usdAmount: number): string => {
    const localAmount = convertFromUSD(usdAmount, currency.code)
    return formatCurrencyUtil(localAmount, currency)
  }

  const convertPrice = (usdAmount: number): number => {
    return convertFromUSD(usdAmount, currency.code)
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, convertPrice, isLoading }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider')
  }
  return context
}
