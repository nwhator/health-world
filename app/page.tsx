import Link from 'next/link'
import { 
  AlertCircle, 
  Stethoscope, 
  Activity, 
  Heart,
  Clock,
  Shield,
  Star,
  ArrowRight,
  Phone,
  Ambulance,
  FlameIcon as Fire,
  UserCheck,
  Video,
  Pill,
  FileText,
  Bell
} from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

export default function HomePage() {
  const quickAccessServices = [
    {
      title: 'Emergency Assistance',
      description: 'Immediate help for fire, ambulance, and police',
      icon: AlertCircle,
      color: 'secondary',
      href: '/emergency',
      bgColor: 'bg-secondary-50',
      iconColor: 'text-secondary-500',
    },
    {
      title: 'Ambulance Tracking',
      description: 'Real-time tracking of emergency ambulance',
      icon: Ambulance,
      color: 'secondary',
      href: '/ambulance',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
    },
    {
      title: 'Telemedicine',
      description: 'Virtual consultations with verified doctors',
      icon: Video,
      color: 'primary',
      href: '/telemedicine',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Online Pharmacy',
      description: 'Order medicines with home delivery',
      icon: Pill,
      color: 'accent',
      href: '/pharmacy',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      title: 'At-Home Care',
      description: 'Professional healthcare services at your doorstep',
      icon: Stethoscope,
      color: 'primary',
      href: '/services',
      bgColor: 'bg-primary-50',
      iconColor: 'text-primary-500',
    },
    {
      title: 'Health Records',
      description: 'Access and manage your medical records',
      icon: FileText,
      color: 'primary',
      href: '/health-records',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
  ]

  const services = [
    {
      name: 'Dental Checkups',
      description: 'Professional dental care at home',
      icon: UserCheck,
      href: '/services/dental',
    },
    {
      name: 'Blood Pressure Monitoring',
      description: 'Regular BP checks and monitoring',
      icon: Activity,
      href: '/services/blood-pressure',
    },
    {
      name: 'Physiotherapy',
      description: 'Expert physical therapy sessions',
      icon: Heart,
      href: '/services/physiotherapy',
    },
    {
      name: 'General Consultation',
      description: 'Talk to experienced doctors',
      icon: Stethoscope,
      href: '/services/consultation',
    },
  ]

  const features = [
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Round-the-clock access to emergency and healthcare services',
    },
    {
      icon: Shield,
      title: 'Verified Professionals',
      description: 'All healthcare providers are licensed and verified',
    },
    {
      icon: Star,
      title: 'Quality Service',
      description: 'Rated and reviewed by real patients',
    },
  ]

  return (
    <>
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 via-white to-accent-50 py-20">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-poppins">
                Professional Healthcare
                <span className="text-primary-500"> at Your Fingertips</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Emergency assistance and at-home healthcare services available 24/7. 
                Your health and safety are our priority.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/emergency">
                  <Button variant="secondary" size="lg">
                    <Phone size={20} />
                    Emergency Help
                  </Button>
                </Link>
                <Link href="/services">
                  <Button variant="primary" size="lg">
                    Browse Services
                    <ArrowRight size={20} />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Access */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="section-title text-center">Quick Access</h2>
            <p className="section-subtitle text-center">
              Get immediate help or book a service in seconds
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {quickAccessServices.map((service) => {
                const Icon = service.icon
                return (
                  <Link key={service.title} href={service.href}>
                    <Card hover className="h-full">
                      <CardHeader>
                        <div className={`w-16 h-16 ${service.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                          <Icon className={`${service.iconColor}`} size={32} />
                        </div>
                        <CardTitle>{service.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{service.description}</p>
                        <div className="mt-4 flex items-center text-primary-500 font-medium">
                          Access Now <ArrowRight size={16} className="ml-2" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="section-title text-center">Our Services</h2>
            <p className="section-subtitle text-center">
              Professional at-home healthcare services tailored to your needs
            </p>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service) => {
                const Icon = service.icon
                return (
                  <Link key={service.name} href={service.href}>
                    <Card hover className="h-full text-center">
                      <CardContent className="pt-6">
                        <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Icon className="text-primary-500" size={28} />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {service.name}
                        </h3>
                        <p className="text-sm text-gray-600">{service.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
            
            <div className="text-center mt-8">
              <Link href="/services">
                <Button variant="outline" size="lg">
                  View All Services
                  <ArrowRight size={20} />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="section-title text-center">Why Choose Health World?</h2>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <div key={feature.title} className="text-center">
                    <div className="w-16 h-16 bg-accent-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="text-accent-500" size={28} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary-500 to-primary-600 text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of users who trust Health World for their healthcare needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button variant="accent" size="lg">
                  Create Account
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost" size="lg" className="!text-white !hover:bg-white/10">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
