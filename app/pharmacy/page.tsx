'use client'

import { useState } from 'react'
import { Pill, ShoppingCart, Search, Filter, MapPin, Clock, Star, Truck, Plus, Minus } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { useCurrency } from '@/contexts/CurrencyContext'

interface Medicine {
  id: string
  name: string
  genericName: string
  category: string
  price: number
  inStock: boolean
  manufacturer: string
  description: string
  dosage: string
  prescription: boolean
  rating: number
  image: string
}

interface CartItem extends Medicine {
  quantity: number
}

const mockMedicines: Medicine[] = [
  {
    id: '1',
    name: 'Paracetamol',
    genericName: 'Acetaminophen',
    category: 'Pain Relief',
    price: 5.99,
    inStock: true,
    manufacturer: 'PharmaCorp',
    description: 'Effective pain relief and fever reducer',
    dosage: '500mg',
    prescription: false,
    rating: 4.5,
    image: '💊'
  },
  {
    id: '2',
    name: 'Lisinopril',
    genericName: 'ACE Inhibitor',
    category: 'Blood Pressure',
    price: 24.99,
    inStock: true,
    manufacturer: 'MediLabs',
    description: 'Blood pressure control medication',
    dosage: '10mg',
    prescription: true,
    rating: 4.7,
    image: '💊'
  },
  {
    id: '3',
    name: 'Vitamin D3',
    genericName: 'Cholecalciferol',
    category: 'Vitamins',
    price: 12.99,
    inStock: true,
    manufacturer: 'HealthPlus',
    description: 'Essential vitamin D supplement',
    dosage: '2000 IU',
    prescription: false,
    rating: 4.8,
    image: '💊'
  },
  {
    id: '4',
    name: 'Amoxicillin',
    genericName: 'Antibiotic',
    category: 'Antibiotics',
    price: 18.50,
    inStock: true,
    manufacturer: 'BioMed',
    description: 'Broad-spectrum antibiotic',
    dosage: '500mg',
    prescription: true,
    rating: 4.6,
    image: '💊'
  },
  {
    id: '5',
    name: 'Ibuprofen',
    genericName: 'NSAID',
    category: 'Pain Relief',
    price: 8.99,
    inStock: true,
    manufacturer: 'PharmaCorp',
    description: 'Anti-inflammatory pain reliever',
    dosage: '400mg',
    prescription: false,
    rating: 4.4,
    image: '💊'
  },
  {
    id: '6',
    name: 'Metformin',
    genericName: 'Biguanide',
    category: 'Diabetes',
    price: 15.99,
    inStock: false,
    manufacturer: 'DiabCare',
    description: 'Type 2 diabetes medication',
    dosage: '500mg',
    prescription: true,
    rating: 4.5,
    image: '💊'
  }
]

export default function PharmacyPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [cart, setCart] = useState<CartItem[]>([])
  const [showCart, setShowCart] = useState(false)
  const { formatPrice, convertPrice } = useCurrency()

  const categories = ['all', 'pain relief', 'vitamins', 'antibiotics', 'blood pressure', 'diabetes']

  const addToCart = (medicine: Medicine) => {
    const existingItem = cart.find(item => item.id === medicine.id)
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === medicine.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart([...cart, { ...medicine, quantity: 1 }])
    }
  }

  const removeFromCart = (id: string) => {
    const existingItem = cart.find(item => item.id === id)
    if (existingItem && existingItem.quantity > 1) {
      setCart(cart.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ))
    } else {
      setCart(cart.filter(item => item.id !== id))
    }
  }

  const filteredMedicines = mockMedicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         medicine.genericName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || medicine.category.toLowerCase() === selectedCategory.toLowerCase()
    return matchesSearch && matchesCategory
  })

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const deliveryThreshold = convertPrice(50) // Convert $50 to local currency
  const deliveryFee = convertPrice(5) // Convert $5 to local currency

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-accent-100 rounded-lg">
                <Pill className="h-8 w-8 text-accent-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Online Pharmacy</h1>
                <p className="text-gray-600 mt-1">Order medicines with free home delivery</p>
              </div>
            </div>
            <div className="relative">
              <Button
                variant="primary"
                onClick={() => setShowCart(!showCart)}
                className="gap-2 relative"
              >
                <ShoppingCart className="h-5 w-5" />
                Cart
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-secondary-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Delivery Banner */}
          <Card className="bg-gradient-to-r from-accent-50 to-primary-50 border-accent-200">
            <div className="p-4 flex items-center gap-4">
              <Truck className="h-8 w-8 text-accent-600" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Free Delivery on orders over {formatPrice(50)}</h3>
                <p className="text-sm text-gray-600">Expected delivery: 30-45 minutes</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>Deliver to: Home</span>
              </div>
            </div>
          </Card>
        </div>

        {showCart ? (
          /* Cart View */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart</h2>
                  {cart.length === 0 ? (
                    <div className="text-center py-12">
                      <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                      <p className="text-gray-600 mb-4">Add medicines to your cart to continue</p>
                      <Button onClick={() => setShowCart(false)}>
                        Continue Shopping
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cart.map(item => (
                        <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                          <div className="text-4xl">{item.image}</div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{item.name}</h3>
                            <p className="text-sm text-gray-600">{item.dosage}</p>
                            <p className="text-lg font-bold text-primary-600 mt-1">{formatPrice(item.price)}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="p-1 rounded-lg bg-white border border-gray-300 hover:bg-gray-50"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="font-semibold text-gray-900 w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => addToCart(item)}
                              className="p-1 rounded-lg bg-white border border-gray-300 hover:bg-gray-50"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <p className="font-bold text-gray-900 w-24 text-right">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            </div>

            <div>
              <Card className="sticky top-4">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal ({cartItemsCount} items)</span>
                      <span>{formatPrice(cartTotal)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Delivery Fee</span>
                      <span>{cartTotal >= deliveryThreshold ? 'FREE' : formatPrice(deliveryFee)}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between text-xl font-bold text-gray-900">
                        <span>Total</span>
                        <span>{formatPrice(cartTotal + (cartTotal >= deliveryThreshold ? 0 : deliveryFee))}</span>
                      </div>
                    </div>
                  </div>

                  <Button fullWidth className="mb-3" disabled={cart.length === 0}>
                    Proceed to Checkout
                  </Button>
                  <Button
                    fullWidth
                    variant="outline"
                    onClick={() => setShowCart(false)}
                  >
                    Continue Shopping
                  </Button>

                  {cartTotal < deliveryThreshold && cartTotal > 0 && (
                    <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <p className="text-sm text-yellow-800">
                        Add {formatPrice(deliveryThreshold - cartTotal)} more for free delivery!
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        ) : (
          /* Products View */
          <>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search medicines..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </Button>
            </div>

            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? 'bg-accent-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMedicines.map(medicine => (
                <Card key={medicine.id} className="hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-5xl">{medicine.image}</div>
                      {medicine.prescription && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded">
                          Rx Required
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-1">{medicine.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{medicine.genericName}</p>
                    <p className="text-xs text-gray-500 mb-3">{medicine.manufacturer} • {medicine.dosage}</p>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-medium text-gray-900">{medicine.rating}</span>
                      </div>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-600">{medicine.category}</span>
                    </div>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{medicine.description}</p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{formatPrice(medicine.price)}</p>
                        <p className={`text-xs ${medicine.inStock ? 'text-accent-600' : 'text-secondary-600'}`}>
                          {medicine.inStock ? 'In Stock' : 'Out of Stock'}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        disabled={!medicine.inStock}
                        onClick={() => addToCart(medicine)}
                        className="gap-2"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Add
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
