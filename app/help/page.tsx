'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { 
  Search, HelpCircle, MessageCircle, Phone, Mail, 
  ChevronDown, ChevronUp, Shield, CreditCard, Calendar,
  Users, MapPin, Clock
} from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const categories = [
    {
      icon: Calendar,
      title: 'Booking & Appointments',
      description: 'How to book and manage your appointments',
    },
    {
      icon: CreditCard,
      title: 'Payments & Billing',
      description: 'Payment methods, refunds, and invoices',
    },
    {
      icon: Shield,
      title: 'Safety & Privacy',
      description: 'Data security and privacy protection',
    },
    {
      icon: Users,
      title: 'Provider Verification',
      description: 'How we verify healthcare providers',
    },
    {
      icon: MapPin,
      title: 'Emergency Services',
      description: 'Using emergency assistance features',
    },
    {
      icon: Clock,
      title: 'Service Hours',
      description: 'Availability and response times',
    },
  ]

  const faqs = [
    {
      category: 'General',
      question: 'What is Health World?',
      answer: 'Health World is a healthcare marketplace that connects patients with verified healthcare providers for at-home services, telemedicine consultations, emergency assistance, and pharmacy services across Africa.',
    },
    {
      category: 'Booking',
      question: 'How do I book a healthcare service?',
      answer: 'Browse our services page, select the service you need, choose a verified provider, pick your preferred date and time, and confirm your booking. You\'ll receive instant confirmation and reminders.',
    },
    {
      category: 'Providers',
      question: 'How do you verify healthcare providers?',
      answer: 'All providers undergo thorough verification including license checks with medical boards, credential validation, background screening, and identity verification. Only verified professionals can offer services on our platform.',
    },
    {
      category: 'Payments',
      question: 'What payment methods do you accept?',
      answer: 'We accept credit/debit cards, bank transfers, and mobile money payments across all supported African countries. All payments are processed securely through encrypted payment gateways.',
    },
    {
      category: 'Booking',
      question: 'Can I cancel or reschedule my appointment?',
      answer: 'Yes! Cancellations 24+ hours before get a full refund. Cancellations 12-24 hours before get 50% refund. Less than 12 hours notice receives no refund. You can reschedule anytime through your appointments page.',
    },
    {
      category: 'Emergency',
      question: 'How does emergency assistance work?',
      answer: 'Click the emergency button, share your location, and we\'ll dispatch the nearest ambulance or emergency responder. Response times vary by location. For life-threatening emergencies, always call your local emergency number (911, 112, etc.) first.',
    },
    {
      category: 'Providers',
      question: 'How can I become a healthcare provider on Health World?',
      answer: 'Visit our provider registration page, submit your credentials and required documents (medical license, certifications, ID), and our team will verify your information within 48 hours. Once approved, you can start offering services.',
    },
    {
      category: 'Telemedicine',
      question: 'How do virtual consultations work?',
      answer: 'Book a telemedicine appointment, receive a link to the video call at your scheduled time, and consult with your doctor remotely. You\'ll need a device with camera and microphone and stable internet connection.',
    },
    {
      category: 'Payments',
      question: 'Are there any platform fees?',
      answer: 'Health World charges a small service fee on each booking to maintain the platform, verify providers, and ensure quality service. All fees are transparently displayed before you confirm your booking.',
    },
    {
      category: 'Privacy',
      question: 'Is my medical information secure?',
      answer: 'Yes! We use end-to-end encryption, secure cloud storage, and follow strict healthcare privacy standards. Your medical data is only shared with providers you choose to consult and is never sold to third parties.',
    },
    {
      category: 'General',
      question: 'Which countries do you serve?',
      answer: 'Health World currently operates in Nigeria, Ghana, Kenya, South Africa, Egypt, Ethiopia, Tanzania, Uganda, and Rwanda. We\'re expanding to more African countries soon.',
    },
    {
      category: 'Pharmacy',
      question: 'How does the online pharmacy work?',
      answer: 'Browse medications, add to cart, upload prescriptions if required, checkout securely, and get delivery to your doorstep. Delivery is free for orders above the minimum threshold in your country.',
    },
  ]

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary-50/30 py-12">
      <div className="container-custom max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            How can we help you?
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Find answers to common questions or contact our support team
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-4 text-lg"
              />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {categories.map((category) => (
            <Card key={category.title} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <category.icon className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{category.title}</h3>
              <p className="text-sm text-gray-600">{category.description}</p>
            </Card>
          ))}
        </div>

        {/* FAQs */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <Card key={index} className="overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start gap-4 text-left">
                    <HelpCircle className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                    <div>
                      <span className="inline-block px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded mb-2">
                        {faq.category}
                      </span>
                      <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                    </div>
                  </div>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 ml-9">{faq.answer}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No results found. Try a different search term.</p>
            </div>
          )}
        </div>

        {/* Contact Support */}
        <Card className="p-8 bg-gradient-to-br from-primary-50 to-accent-50">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Still need help?</h2>
            <p className="text-gray-600">Our support team is available 24/7 to assist you</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <MessageCircle className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
              <p className="text-sm text-gray-600 mb-4">
                Chat with our support team in real-time
              </p>
              <Button variant="outline" size="sm">
                Start Chat
              </Button>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Phone className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
              <p className="text-sm text-gray-600 mb-4">
                +234 800 123 4567
              </p>
              <Button variant="outline" size="sm">
                <a href="tel:+2348001234567">Call Now</a>
              </Button>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Mail className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
              <p className="text-sm text-gray-600 mb-4">
                support@healthworld.com
              </p>
              <Button variant="outline" size="sm">
                <a href="mailto:support@healthworld.com">Send Email</a>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
