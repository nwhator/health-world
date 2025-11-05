'use client'

import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { 
  Briefcase, Heart, Users, TrendingUp, Globe, 
  Code, Stethoscope, Megaphone, DollarSign, 
  Shield
} from 'lucide-react'

export default function CareersPage() {
  const benefits = [
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive health insurance and wellness programs',
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Clear career paths and professional development opportunities',
    },
    {
      icon: Globe,
      title: 'Remote Work',
      description: 'Flexible work arrangements and remote-first culture',
    },
    {
      icon: DollarSign,
      title: 'Competitive Pay',
      description: 'Market-leading salaries and performance bonuses',
    },
  ]

  const openPositions = [
    {
      icon: Code,
      title: 'Senior Full-Stack Developer',
      department: 'Engineering',
      location: 'Lagos, Nigeria (Remote)',
      type: 'Full-time',
      description: 'Build and scale our healthcare platform using Next.js, TypeScript, and modern cloud technologies.',
    },
    {
      icon: Stethoscope,
      title: 'Medical Operations Manager',
      department: 'Healthcare',
      location: 'Lagos, Nigeria',
      type: 'Full-time',
      description: 'Oversee provider verification, quality assurance, and medical compliance across our platform.',
    },
    {
      icon: Users,
      title: 'Customer Success Specialist',
      department: 'Support',
      location: 'Remote',
      type: 'Full-time',
      description: 'Help patients and providers get the most out of Health World with exceptional support.',
    },
    {
      icon: Megaphone,
      title: 'Marketing Manager',
      department: 'Marketing',
      location: 'Lagos, Nigeria (Hybrid)',
      type: 'Full-time',
      description: 'Drive user growth and brand awareness across African markets through creative campaigns.',
    },
    {
      icon: Shield,
      title: 'Data Security Engineer',
      department: 'Security',
      location: 'Remote',
      type: 'Full-time',
      description: 'Protect patient data and ensure HIPAA compliance with robust security infrastructure.',
    },
    {
      icon: Code,
      title: 'Product Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      description: 'Create intuitive user experiences that make healthcare accessible for everyone.',
    },
  ]

  const values = [
    {
      title: 'Patient First',
      description: 'Every decision we make prioritizes patient safety, privacy, and experience.',
    },
    {
      title: 'Innovation',
      description: 'We embrace new technologies to solve Africa\'s healthcare challenges.',
    },
    {
      title: 'Integrity',
      description: 'We operate with transparency, honesty, and ethical standards.',
    },
    {
      title: 'Collaboration',
      description: 'We work together across teams to achieve our mission.',
    },
  ]

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-white to-primary-50/30">
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary-500 to-primary-600 py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Join Us in Transforming Healthcare
          </h1>
          <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
            Be part of a mission-driven team making quality healthcare accessible 
            across Africa. We're building the future of healthcare, together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
              <Briefcase className="w-5 h-5 mr-2" />
              View Open Positions
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container-custom py-12 -mt-12">
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="p-6 text-center bg-white shadow-lg">
            <div className="text-3xl font-bold text-primary-600 mb-2">50+</div>
            <div className="text-gray-600">Team Members</div>
          </Card>
          <Card className="p-6 text-center bg-white shadow-lg">
            <div className="text-3xl font-bold text-primary-600 mb-2">9</div>
            <div className="text-gray-600">Countries</div>
          </Card>
          <Card className="p-6 text-center bg-white shadow-lg">
            <div className="text-3xl font-bold text-primary-600 mb-2">500+</div>
            <div className="text-gray-600">Providers</div>
          </Card>
          <Card className="p-6 text-center bg-white shadow-lg">
            <div className="text-3xl font-bold text-primary-600 mb-2">10K+</div>
            <div className="text-gray-600">Patients Served</div>
          </Card>
        </div>
      </section>

      {/* Our Values */}
      <section className="container-custom py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            These core values guide how we work and the decisions we make every day
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) => (
            <Card key={value.title} className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2 text-lg">{value.title}</h3>
              <p className="text-sm text-gray-600">{value.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Join Health World?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We invest in our team with competitive benefits and a supportive work environment
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </Card>
            ))}
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <Card className="p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">More Benefits</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span>25 days paid vacation + public holidays</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span>Parental leave for new parents</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span>Learning & development budget</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span>Home office setup allowance</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span>Team retreats and social events</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span>Stock options for senior roles</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-primary-50 to-accent-50">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Culture</h3>
              <p className="text-gray-600 mb-4">
                At Health World, we believe in creating an inclusive, collaborative environment 
                where everyone can do their best work. We celebrate diversity, encourage innovation, 
                and support work-life balance.
              </p>
              <p className="text-gray-600">
                Whether you're working remotely or from our Lagos office, you'll be part of a 
                tight-knit team passionate about improving healthcare access across Africa.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="container-custom py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Open Positions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join our growing team and help us build the future of African healthcare
          </p>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          {openPositions.map((position) => (
            <Card key={position.title} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <position.icon className="w-8 h-8 text-primary-600" />
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{position.title}</h3>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                      {position.type}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      {position.department}
                    </span>
                    <span className="flex items-center gap-1">
                      <Globe className="w-4 h-4" />
                      {position.location}
                    </span>
                  </div>
                  <p className="text-gray-600">{position.description}</p>
                </div>

                <Button variant="primary" className="md:ml-auto">
                  Apply Now
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Don't see a position that fits? We're always looking for talented people!
          </p>
          <Button variant="outline">
            Send us your resume
          </Button>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary-500 to-primary-600 py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Make an Impact?
          </h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Join our mission to transform healthcare accessibility across Africa. 
            Apply today and be part of something meaningful.
          </p>
          <Button variant="primary" size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
            <Briefcase className="w-5 h-5 mr-2" />
            View All Openings
          </Button>
        </div>
      </section>
    </div>
    <Footer />
    </>
  )
}
