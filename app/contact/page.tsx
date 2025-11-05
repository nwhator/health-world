'use client'

import { Card } from '@/components/ui/Card'
import { Mail, Phone, MapPin, MessageCircle, Clock } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { useState } from 'react'
import { toast } from 'sonner'

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      toast.success('Message sent successfully! We\'ll get back to you soon.')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setIsLoading(false)
    }, 1500)
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'support@healthworld.com',
      link: 'mailto:support@healthworld.com',
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+234 800 123 4567',
      link: 'tel:+2348001234567',
    },
    {
      icon: MapPin,
      title: 'Address',
      content: 'Lagos, Nigeria',
      link: null,
    },
    {
      icon: Clock,
      title: 'Hours',
      content: '24/7 Support',
      link: null,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary-50/30">
      {/* Hero Section */}
      <section className="container-custom py-16 md:py-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600">
            Have questions? We're here to help. Reach out to our support team 24/7.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info) => (
            <Card key={info.title} className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <info.icon className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{info.title}</h3>
              {info.link ? (
                <a
                  href={info.link}
                  className="text-gray-600 hover:text-primary-600 transition-colors text-sm"
                >
                  {info.content}
                </a>
              ) : (
                <p className="text-gray-600 text-sm">{info.content}</p>
              )}
            </Card>
          ))}
        </div>

        {/* Contact Form */}
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Send us a Message</h2>
            <p className="text-gray-600 mb-6">
              Fill out the form and our team will get back to you within 24 hours.
            </p>
            
            <Card className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more about your inquiry..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" variant="primary" fullWidth isLoading={isLoading}>
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </form>
            </Card>
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 mb-6">
              Quick answers to common questions about Health World.
            </p>

            <div className="space-y-4">
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">How do I book a service?</h3>
                <p className="text-sm text-gray-600">
                  Simply browse our services, select a provider, choose your preferred time, 
                  and confirm your booking. You'll receive instant confirmation.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Are all providers verified?</h3>
                <p className="text-sm text-gray-600">
                  Yes! Every healthcare provider on our platform is thoroughly verified. We check 
                  licenses, certifications, and conduct background screening.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">How do I become a provider?</h3>
                <p className="text-sm text-gray-600">
                  Visit our provider registration page, submit your credentials and documents 
                  for verification, and once approved, you can start offering your services.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">What payment methods do you accept?</h3>
                <p className="text-sm text-gray-600">
                  We accept all major payment methods including cards, bank transfers, and 
                  mobile money across all supported African countries.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Is emergency service available 24/7?</h3>
                <p className="text-sm text-gray-600">
                  Yes! Our emergency assistance is available round the clock. We'll dispatch 
                  the nearest ambulance or emergency responder to your location.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
