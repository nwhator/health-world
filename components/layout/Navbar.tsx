'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Bell, Menu, X, User, LogOut } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '../ui/Button'
import { CurrencySelector } from './CurrencySelector'

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { data: session } = useSession()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Telemedicine', href: '/telemedicine' },
    { name: 'Pharmacy', href: '/pharmacy' },
    { name: 'Appointments', href: '/appointments' },
    { name: 'Emergency', href: '/emergency' },
  ]

  return (
    <nav className="bg-white shadow-md sticky top-0 z-30">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">H</span>
            </div>
            <span className="text-xl font-bold text-gray-900 font-poppins">
              Health World
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-primary-500 transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Currency Selector */}
            <CurrencySelector />

            {/* Notifications */}
            <Link
              href="/notifications"
              className="relative p-2 text-gray-600 hover:text-primary-500 transition-colors"
              aria-label="Notifications"
            >
              <Bell size={24} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-secondary-500 rounded-full"></span>
            </Link>

            {/* User Menu */}
            {session ? (
              <div className="flex items-center space-x-2">
                <Link href="/profile">
                  <Button variant="ghost" size="sm">
                    <User size={20} />
                    Profile
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => signOut()}
                >
                  <LogOut size={20} />
                </Button>
              </div>
            ) : (
              <Link href="/auth/signin">
                <Button variant="primary" size="sm">
                  Sign In
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-primary-500"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden py-4 border-t border-gray-100 animate-in slide-in-from-top-2 fade-in duration-200"
          >
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-primary-500 transition-colors font-medium px-4 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
