'use client'

import { Card } from '@/components/ui/Card'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-white to-primary-50/30 py-12">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-600">Last updated: November 5, 2025</p>
        </div>

        <Card className="p-8 md:p-12">
          <div className="prose prose-blue max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600 mb-4">
                By accessing and using Health World, you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to these terms, please do not 
                use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Service Description</h2>
              <p className="text-gray-600 mb-4">
                Health World is a healthcare marketplace platform that connects patients with verified 
                healthcare providers. We facilitate:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>At-home healthcare services</li>
                <li>Virtual telemedicine consultations</li>
                <li>Emergency assistance coordination</li>
                <li>Online pharmacy services</li>
                <li>Appointment scheduling and management</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Responsibilities</h2>
              <p className="text-gray-600 mb-4">As a user of Health World, you agree to:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Provide accurate and truthful information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Use the platform only for lawful purposes</li>
                <li>Respect the privacy and rights of other users</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Healthcare Provider Verification</h2>
              <p className="text-gray-600 mb-4">
                All healthcare providers on Health World undergo verification processes including:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Professional license verification</li>
                <li>Credential and certification checks</li>
                <li>Background screening</li>
                <li>Identity verification</li>
              </ul>
              <p className="text-gray-600 mt-4">
                While we make reasonable efforts to verify providers, users should exercise their own 
                judgment and due diligence when selecting healthcare services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Payment Terms</h2>
              <p className="text-gray-600 mb-4">
                Payment for services is processed through our secure payment platform. By using our 
                services, you agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Pay for all services you book or receive</li>
                <li>Provide valid payment information</li>
                <li>Accept our cancellation and refund policies</li>
                <li>Pay any applicable fees or charges</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cancellation and Refunds</h2>
              <p className="text-gray-600 mb-4">
                Cancellation policies vary by service type:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Cancellations 24+ hours before appointment: Full refund</li>
                <li>Cancellations 12-24 hours before: 50% refund</li>
                <li>Cancellations less than 12 hours: No refund</li>
                <li>Provider cancellations: Full refund and possible credit</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Emergency Services</h2>
              <p className="text-gray-600 mb-4">
                While Health World provides emergency assistance coordination, we are not a 
                substitute for official emergency services. In life-threatening situations, 
                always call your local emergency number first (e.g., 911, 112, etc.).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-600 mb-4">
                Health World acts as a marketplace platform connecting patients and providers. 
                We are not responsible for:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>The quality or outcome of healthcare services provided</li>
                <li>Actions or omissions of healthcare providers</li>
                <li>Medical advice or treatment decisions</li>
                <li>Delays in service delivery</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Privacy and Data Protection</h2>
              <p className="text-gray-600 mb-4">
                Your privacy is important to us. Please review our Privacy Policy to understand 
                how we collect, use, and protect your personal and medical information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Intellectual Property</h2>
              <p className="text-gray-600 mb-4">
                All content, trademarks, and intellectual property on Health World are owned by 
                or licensed to us. You may not use, copy, or distribute our content without 
                explicit permission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Termination</h2>
              <p className="text-gray-600 mb-4">
                We reserve the right to suspend or terminate your account if you violate these 
                terms or engage in fraudulent, abusive, or illegal activities.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Changes to Terms</h2>
              <p className="text-gray-600 mb-4">
                We may update these terms from time to time. Continued use of Health World after 
                changes constitutes acceptance of the updated terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Information</h2>
              <p className="text-gray-600 mb-4">
                If you have questions about these terms, please contact us at:
              </p>
              <p className="text-gray-600">
                Email: legal@healthworld.com<br />
                Phone: +234 800 123 4567
              </p>
            </section>
          </div>
        </Card>
      </div>
    </div>
    <Footer />
    </>
  )
}
