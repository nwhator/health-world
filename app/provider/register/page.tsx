'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { 
  User, Mail, Phone, MapPin, Briefcase, Upload, 
  CheckCircle, FileText, Award, Shield, Calendar, DollarSign, Users 
} from 'lucide-react'
import { toast } from 'sonner'
import { useCurrency } from '@/contexts/CurrencyContext'

export default function ProviderRegisterPage() {
  const { formatPrice } = useCurrency()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    
    // Professional Information
    profession: '',
    specialization: '',
    yearsOfExperience: '',
    bio: '',
    
    // Credentials
    licenseNumber: '',
    licenseIssueDate: '',
    licenseExpiryDate: '',
    
    // Service Details
    serviceTypes: [] as string[],
    consultationFee: '',
    homeVisitFee: '',
    availability: '',
    
    // Documents (would be file uploads in production)
    medicalLicense: null as File | null,
    certifications: null as File | null,
    identification: null as File | null,
    proofOfAddress: null as File | null,
  })

  const serviceOptions = [
    'General Consultation',
    'Dental Care',
    'Physiotherapy',
    'Blood Pressure Monitoring',
    'Diabetes Management',
    'Wound Care',
    'Elderly Care',
    'Mental Health Counseling',
    'Nutrition & Dietetics',
    'Pediatric Care',
  ]

  const professionOptions = [
    'Medical Doctor',
    'Dentist',
    'Physiotherapist',
    'Nurse',
    'Pharmacist',
    'Psychologist',
    'Nutritionist',
    'Other Healthcare Professional',
  ]

  const handleFileChange = (field: string, file: File | null) => {
    setFormData({ ...formData, [field]: file })
  }

  const handleServiceToggle = (service: string) => {
    const updated = formData.serviceTypes.includes(service)
      ? formData.serviceTypes.filter(s => s !== service)
      : [...formData.serviceTypes, service]
    setFormData({ ...formData, serviceTypes: updated })
  }

  const handleNext = () => {
    // Validate current step
    if (currentStep === 1) {
      if (!formData.fullName || !formData.email || !formData.phone || !formData.address) {
        toast.error('Please fill all required fields')
        return
      }
    } else if (currentStep === 2) {
      if (!formData.profession || !formData.yearsOfExperience || !formData.bio) {
        toast.error('Please fill all required fields')
        return
      }
    } else if (currentStep === 3) {
      if (!formData.licenseNumber || !formData.licenseIssueDate) {
        toast.error('Please fill all required fields')
        return
      }
    }
    
    setCurrentStep(currentStep + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBack = () => {
    setCurrentStep(currentStep - 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.serviceTypes.length === 0) {
      toast.error('Please select at least one service type')
      return
    }

    if (!formData.medicalLicense || !formData.identification) {
      toast.error('Please upload required documents')
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      toast.success('Application submitted successfully! We\'ll review your credentials within 48 hours.')
      setIsLoading(false)
      // In production, redirect to a confirmation page
    }, 2000)
  }

  const steps = [
    { number: 1, title: 'Personal Info', icon: User },
    { number: 2, title: 'Professional', icon: Briefcase },
    { number: 3, title: 'Credentials', icon: Award },
    { number: 4, title: 'Services', icon: Shield },
    { number: 5, title: 'Documents', icon: FileText },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary-50/30 py-12">
      <div className="container-custom max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Become a Healthcare Provider
          </h1>
          <p className="text-xl text-gray-600">
            Join our network of verified healthcare professionals
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${
                      currentStep >= step.number
                        ? 'bg-primary-500 border-primary-500 text-white'
                        : 'bg-white border-gray-300 text-gray-400'
                    }`}
                  >
                    {currentStep > step.number ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <step.icon className="w-6 h-6" />
                    )}
                  </div>
                  <div className="text-xs mt-2 font-medium text-gray-600 hidden md:block">
                    {step.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 transition-colors ${
                      currentStep > step.number ? 'bg-primary-500' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <Card className="p-8">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      placeholder="Dr. John Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      placeholder="john.doe@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <Input
                      type="tel"
                      placeholder="+234 800 000 0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <Input
                      type="text"
                      placeholder="Lagos"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <Input
                    type="text"
                    placeholder="123 Medical Center Street"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State/Region *
                  </label>
                  <Input
                    type="text"
                    placeholder="Lagos State"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 2: Professional Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Professional Information</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profession *
                  </label>
                  <select
                    value={formData.profession}
                    onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select your profession</option>
                    {professionOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specialization (if applicable)
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g., Cardiology, Orthopedics"
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience *
                  </label>
                  <Input
                    type="number"
                    placeholder="5"
                    min="0"
                    value={formData.yearsOfExperience}
                    onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Professional Bio *
                  </label>
                  <Textarea
                    placeholder="Tell us about your experience, qualifications, and what makes you passionate about healthcare..."
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={5}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This will be displayed on your profile to help patients learn about you.
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Credentials */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Professional Credentials</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Medical License Number *
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g., MED-123456"
                    value={formData.licenseNumber}
                    onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      License Issue Date *
                    </label>
                    <Input
                      type="date"
                      value={formData.licenseIssueDate}
                      onChange={(e) => setFormData({ ...formData, licenseIssueDate: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      License Expiry Date
                    </label>
                    <Input
                      type="date"
                      value={formData.licenseExpiryDate}
                      onChange={(e) => setFormData({ ...formData, licenseExpiryDate: e.target.value })}
                    />
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-1">Verification Process</h4>
                      <p className="text-sm text-blue-700">
                        All credentials will be verified with the appropriate medical boards 
                        and regulatory bodies. This process typically takes 24-48 hours.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Services & Pricing */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Services & Pricing</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Services You Offer * (Select all that apply)
                  </label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {serviceOptions.map((service) => (
                      <label
                        key={service}
                        className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={formData.serviceTypes.includes(service)}
                          onChange={() => handleServiceToggle(service)}
                          className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-700">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Virtual Consultation Fee (USD)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        type="number"
                        placeholder="50"
                        min="0"
                        step="0.01"
                        value={formData.consultationFee}
                        onChange={(e) => setFormData({ ...formData, consultationFee: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.consultationFee && formatPrice(parseFloat(formData.consultationFee))}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Home Visit Fee (USD)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        type="number"
                        placeholder="100"
                        min="0"
                        step="0.01"
                        value={formData.homeVisitFee}
                        onChange={(e) => setFormData({ ...formData, homeVisitFee: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.homeVisitFee && formatPrice(parseFloat(formData.homeVisitFee))}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Availability
                  </label>
                  <Textarea
                    placeholder="e.g., Monday-Friday 9AM-5PM, Weekends by appointment"
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                    rows={3}
                  />
                </div>
              </div>
            )}

            {/* Step 5: Document Upload */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Required Documents</h2>
                
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">Medical License *</h4>
                        <p className="text-sm text-gray-600">Upload a clear copy of your medical license</p>
                      </div>
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileChange('medicalLicense', e.target.files?.[0] || null)}
                          className="hidden"
                          required
                        />
                        <div className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                          <Upload className="w-5 h-5" />
                        </div>
                      </label>
                    </div>
                    {formData.medicalLicense && (
                      <div className="mt-2 text-sm text-green-600 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        {formData.medicalLicense.name}
                      </div>
                    )}
                  </div>

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <Award className="w-6 h-6 text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">Professional Certifications</h4>
                        <p className="text-sm text-gray-600">Additional certifications or training documents</p>
                      </div>
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileChange('certifications', e.target.files?.[0] || null)}
                          className="hidden"
                        />
                        <div className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                          <Upload className="w-5 h-5" />
                        </div>
                      </label>
                    </div>
                    {formData.certifications && (
                      <div className="mt-2 text-sm text-green-600 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        {formData.certifications.name}
                      </div>
                    )}
                  </div>

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <User className="w-6 h-6 text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">Government ID *</h4>
                        <p className="text-sm text-gray-600">Passport, National ID, or Driver's License</p>
                      </div>
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileChange('identification', e.target.files?.[0] || null)}
                          className="hidden"
                          required
                        />
                        <div className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                          <Upload className="w-5 h-5" />
                        </div>
                      </label>
                    </div>
                    {formData.identification && (
                      <div className="mt-2 text-sm text-green-600 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        {formData.identification.name}
                      </div>
                    )}
                  </div>

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">Proof of Address</h4>
                        <p className="text-sm text-gray-600">Utility bill or official document (last 3 months)</p>
                      </div>
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileChange('proofOfAddress', e.target.files?.[0] || null)}
                          className="hidden"
                        />
                        <div className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                          <Upload className="w-5 h-5" />
                        </div>
                      </label>
                    </div>
                    {formData.proofOfAddress && (
                      <div className="mt-2 text-sm text-green-600 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        {formData.proofOfAddress.name}
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-900 mb-1">Document Requirements</h4>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        <li>• All documents must be clear and legible</li>
                        <li>• Accepted formats: PDF, JPG, PNG</li>
                        <li>• Maximum file size: 5MB per document</li>
                        <li>• Documents must be valid and not expired</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              {currentStep > 1 && (
                <Button type="button" variant="outline" onClick={handleBack}>
                  Back
                </Button>
              )}
              
              {currentStep < 5 ? (
                <Button type="button" variant="primary" onClick={handleNext} className="ml-auto">
                  Next Step
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isLoading}
                  className="ml-auto"
                >
                  Submit Application
                </Button>
              )}
            </div>
          </form>
        </Card>

        {/* Info Section */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <Card className="p-6 text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Quick Verification</h3>
            <p className="text-sm text-gray-600">
              Most applications are reviewed within 48 hours
            </p>
          </Card>
          
          <Card className="p-6 text-center">
            <Shield className="w-12 h-12 text-blue-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Secure Platform</h3>
            <p className="text-sm text-gray-600">
              Your documents are encrypted and stored securely
            </p>
          </Card>
          
          <Card className="p-6 text-center">
            <Users className="w-12 h-12 text-purple-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Join 500+ Providers</h3>
            <p className="text-sm text-gray-600">
              Connect with thousands of patients across Africa
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
