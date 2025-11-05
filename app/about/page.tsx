'use client'

import { Card } from '@/components/ui/Card'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Heart, Users, Award, Shield, Target, Zap } from 'lucide-react'

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Patient-Centered Care',
      description: 'We put patients first, ensuring accessible and quality healthcare for all.',
    },
    {
      icon: Shield,
      title: 'Trust & Safety',
      description: 'All healthcare providers are verified and certified professionals.',
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Leveraging technology to make healthcare more accessible and efficient.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building a trusted network of healthcare providers and patients.',
    },
  ]

  const stats = [
    { label: 'Verified Providers', value: '500+' },
    { label: 'Happy Patients', value: '10,000+' },
    { label: 'Services Completed', value: '25,000+' },
    { label: 'Cities Covered', value: '50+' },
  ]

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-white to-primary-50/30">
      {/* Hero Section */}
      <section className="container-custom py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Health World
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            We're on a mission to make quality healthcare accessible to everyone in Africa. 
            Health World connects patients with verified healthcare professionals for at-home 
            services, emergency assistance, and telemedicine consultations.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-primary-500 to-primary-600 py-12">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-primary-100 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container-custom py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Healthcare should be accessible, affordable, and convenient for everyone. 
              Health World is building a trusted marketplace that connects patients with 
              certified healthcare providers across Africa.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Whether you need emergency assistance, a dental checkup at home, physiotherapy, 
              or a virtual consultation, our platform ensures you get professional care when 
              and where you need it.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We verify every healthcare provider on our platform, ensuring they have the 
              proper certifications, licenses, and credentials to deliver quality care.
            </p>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary-100 to-accent-100 p-8 flex items-center justify-center">
              <Award className="w-48 h-48 text-primary-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do at Health World
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <Card key={value.title} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - C2C */}
      <section className="container-custom py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How Health World Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A trusted marketplace connecting patients with verified healthcare professionals
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-8 text-center">
            <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-accent-600">
              1
            </div>
            <h3 className="font-semibold text-gray-900 mb-3 text-lg">For Patients</h3>
            <p className="text-gray-600">
              Browse verified healthcare providers, compare reviews and prices, book services 
              at your convenience, and receive quality care at home or online.
            </p>
          </Card>
          <Card className="p-8 text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary-600">
              2
            </div>
            <h3 className="font-semibold text-gray-900 mb-3 text-lg">For Providers</h3>
            <p className="text-gray-600">
              Register as a healthcare provider, submit your credentials for verification, 
              set your availability and prices, and connect with patients who need your services.
            </p>
          </Card>
          <Card className="p-8 text-center">
            <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-secondary-600">
              3
            </div>
            <h3 className="font-semibold text-gray-900 mb-3 text-lg">We Verify</h3>
            <p className="text-gray-600">
              Every provider undergoes thorough verification including license checks, 
              credential validation, and background screening to ensure patient safety.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-500 to-primary-600 py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Join Our Healthcare Community
          </h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Whether you're looking for healthcare services or want to offer your professional 
            expertise, Health World is the platform for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/auth/signup"
              className="px-8 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Started as Patient
            </a>
            <a
              href="/provider/register"
              className="px-8 py-3 bg-primary-700 text-white rounded-lg font-semibold hover:bg-primary-800 transition-colors border-2 border-white"
            >
              Become a Provider
            </a>
          </div>
        </div>
      </section>
    </div>
    <Footer />
    </>
  )
}
