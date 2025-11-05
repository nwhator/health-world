'use client'

import { useState } from 'react'
import { Globe, Check } from 'lucide-react'
import { useCurrency } from '@/contexts/CurrencyContext'
import { currencies } from '@/lib/currency'

export function CurrencySelector() {
  const { currency, setCurrency } = useCurrency()
  const [isOpen, setIsOpen] = useState(false)

  const africanCountries = Object.entries(currencies).filter(([key]) => key !== 'DEFAULT')

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-primary-500 transition-colors rounded-lg hover:bg-gray-100"
        aria-label="Select currency"
      >
        <Globe className="h-5 w-5" />
        <span className="font-medium hidden sm:inline">{currency.symbol}</span>
        <span className="text-xs text-gray-500 hidden md:inline">{currency.code}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-20 max-h-96 overflow-y-auto">
            <div className="p-3 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Select Currency</h3>
              <p className="text-xs text-gray-500 mt-1">Choose your country</p>
            </div>
            <div className="py-2">
              {africanCountries.map(([code, config]) => (
                <button
                  key={code}
                  onClick={() => {
                    setCurrency(code)
                    setIsOpen(false)
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between group"
                >
                  <div>
                    <p className="font-medium text-gray-900 group-hover:text-primary-600">
                      {config.country}
                    </p>
                    <p className="text-sm text-gray-500">
                      {config.symbol} {config.code}
                    </p>
                  </div>
                  {currency.countryCode === code && (
                    <Check className="h-5 w-5 text-accent-500" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
