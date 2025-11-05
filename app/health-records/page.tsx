'use client'

import { useState } from 'react'
import { FileText, Download, Upload, Eye, Calendar, Activity, Heart, Droplet, Plus, Search } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'

interface HealthRecord {
  id: string
  type: 'lab-result' | 'prescription' | 'medical-report' | 'vaccination' | 'imaging'
  title: string
  date: Date
  doctor: string
  facility: string
  fileSize: string
  category: string
}

interface VitalSign {
  type: string
  value: string
  unit: string
  status: 'normal' | 'warning' | 'critical'
  lastUpdated: Date
  icon: any
}

const mockRecords: HealthRecord[] = [
  {
    id: '1',
    type: 'lab-result',
    title: 'Complete Blood Count',
    date: new Date('2024-11-01'),
    doctor: 'Dr. Sarah Johnson',
    facility: 'Health World Lab',
    fileSize: '245 KB',
    category: 'Laboratory'
  },
  {
    id: '2',
    type: 'prescription',
    title: 'Blood Pressure Medication',
    date: new Date('2024-10-28'),
    doctor: 'Dr. Michael Chen',
    facility: 'Health World Clinic',
    fileSize: '128 KB',
    category: 'Prescription'
  },
  {
    id: '3',
    type: 'imaging',
    title: 'Chest X-Ray',
    date: new Date('2024-10-15'),
    doctor: 'Dr. James Williams',
    facility: 'Imaging Center',
    fileSize: '1.2 MB',
    category: 'Radiology'
  },
  {
    id: '4',
    type: 'vaccination',
    title: 'Flu Vaccine 2024',
    date: new Date('2024-09-20'),
    doctor: 'Dr. Aisha Patel',
    facility: 'Health World Clinic',
    fileSize: '98 KB',
    category: 'Immunization'
  }
]

const vitalSigns: VitalSign[] = [
  {
    type: 'Blood Pressure',
    value: '120/80',
    unit: 'mmHg',
    status: 'normal',
    lastUpdated: new Date(),
    icon: Activity
  },
  {
    type: 'Heart Rate',
    value: '72',
    unit: 'bpm',
    status: 'normal',
    lastUpdated: new Date(),
    icon: Heart
  },
  {
    type: 'Blood Sugar',
    value: '95',
    unit: 'mg/dL',
    status: 'normal',
    lastUpdated: new Date(),
    icon: Droplet
  },
  {
    type: 'Temperature',
    value: '98.6',
    unit: '°F',
    status: 'normal',
    lastUpdated: new Date(),
    icon: Activity
  }
]

export default function HealthRecordsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const getTypeIcon = (type: HealthRecord['type']) => {
    return <FileText className="h-5 w-5" />
  }

  const getTypeColor = (type: HealthRecord['type']) => {
    switch (type) {
      case 'lab-result':
        return 'bg-blue-100 text-blue-700'
      case 'prescription':
        return 'bg-green-100 text-green-700'
      case 'medical-report':
        return 'bg-purple-100 text-purple-700'
      case 'vaccination':
        return 'bg-yellow-100 text-yellow-700'
      case 'imaging':
        return 'bg-pink-100 text-pink-700'
    }
  }

  const getStatusColor = (status: VitalSign['status']) => {
    switch (status) {
      case 'normal':
        return 'bg-accent-100 text-accent-700 border-accent-200'
      case 'warning':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'critical':
        return 'bg-red-100 text-red-700 border-red-200'
    }
  }

  const filteredRecords = mockRecords.filter(record => {
    const matchesSearch = record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.doctor.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || record.category.toLowerCase() === selectedCategory.toLowerCase()
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary-100 rounded-lg">
                <FileText className="h-8 w-8 text-primary-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Health Records</h1>
                <p className="text-gray-600 mt-1">Manage your medical documents and vital signs</p>
              </div>
            </div>
            <Button className="gap-2">
              <Upload className="h-5 w-5" />
              Upload Record
            </Button>
          </div>
        </div>

        {/* Vital Signs */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Vital Signs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {vitalSigns.map((vital, index) => (
              <Card key={index} className={`border-2 ${getStatusColor(vital.status)}`}>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <vital.icon className="h-6 w-6" />
                    <span className="text-xs font-medium uppercase px-2 py-1 rounded-full bg-white">
                      {vital.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{vital.type}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-gray-900">{vital.value}</span>
                    <span className="text-sm text-gray-500">{vital.unit}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Updated {vital.lastUpdated.toLocaleTimeString()}
                  </p>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-4">
            <Button variant="outline" className="gap-2">
              <Plus className="h-4 w-4" />
              Add New Vital Signs
            </Button>
          </div>
        </div>

        {/* Records Section */}
        <div>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search records by title or doctor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {['all', 'laboratory', 'prescription', 'radiology', 'immunization'].map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filteredRecords.length === 0 ? (
              <Card className="text-center py-12">
                <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No records found</h3>
                <p className="text-gray-600 mb-4">
                  {searchQuery ? 'Try adjusting your search criteria' : 'Upload your first health record to get started'}
                </p>
                <Button className="gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Record
                </Button>
              </Card>
            ) : (
              filteredRecords.map(record => (
                <Card key={record.id} className="hover:shadow-lg transition-shadow">
                  <div className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${getTypeColor(record.type)}`}>
                        {getTypeIcon(record.type)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-semibold text-gray-900">{record.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{record.doctor}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(record.type)}`}>
                            {record.category}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {record.date.toLocaleDateString()}
                          </div>
                          <span>•</span>
                          <span>{record.facility}</span>
                          <span>•</span>
                          <span>{record.fileSize}</span>
                        </div>

                        <div className="flex gap-2 mt-4">
                          <Button size="sm" variant="outline" className="gap-2">
                            <Eye className="h-4 w-4" />
                            View
                          </Button>
                          <Button size="sm" variant="outline" className="gap-2">
                            <Download className="h-4 w-4" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
