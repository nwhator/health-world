'use client'

import { Card } from '@/components/ui/Card'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Shield, Lock, Eye, Database, UserCheck, AlertCircle } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-white to-primary-50/30 py-12">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600">Last updated: November 5, 2025</p>
        </div>

        {/* Quick Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 text-center">
            <Shield className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Data Protection</h3>
            <p className="text-sm text-gray-600">
              Your data is encrypted and securely stored
            </p>
          </Card>
          
          <Card className="p-6 text-center">
            <Lock className="w-12 h-12 text-blue-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Medical Privacy</h3>
            <p className="text-sm text-gray-600">
              We follow strict healthcare privacy standards
            </p>
          </Card>
          
          <Card className="p-6 text-center">
            <Eye className="w-12 h-12 text-purple-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Transparency</h3>
            <p className="text-sm text-gray-600">
              You control how your data is used
            </p>
          </Card>
        </div>

        <Card className="p-8 md:p-12">
          <div className="prose prose-blue max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-600 mb-4">
                Health World ("we," "our," or "us") is committed to protecting your privacy and 
                ensuring the security of your personal and medical information. This Privacy Policy 
                explains how we collect, use, disclose, and safeguard your information when you use 
                our healthcare marketplace platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">2.1 Personal Information</h3>
              <p className="text-gray-600 mb-4">We collect the following personal information:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Name, email address, phone number</li>
                <li>Physical address and location data</li>
                <li>Date of birth and gender</li>
                <li>Payment and billing information</li>
                <li>Profile photo (optional)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">2.2 Medical Information</h3>
              <p className="text-gray-600 mb-4">When you use our healthcare services, we may collect:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Medical history and health records</li>
                <li>Symptoms and health concerns</li>
                <li>Prescription and medication information</li>
                <li>Appointment notes and treatment records</li>
                <li>Health insurance information</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">2.3 Usage Information</h3>
              <p className="text-gray-600 mb-4">We automatically collect:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Device information and IP address</li>
                <li>Browser type and operating system</li>
                <li>Pages visited and features used</li>
                <li>Time and date of visits</li>
                <li>GPS location data (with permission)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-600 mb-4">We use your information to:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Provide and improve our healthcare services</li>
                <li>Connect you with verified healthcare providers</li>
                <li>Process payments and manage billing</li>
                <li>Send appointment reminders and notifications</li>
                <li>Coordinate emergency assistance when needed</li>
                <li>Maintain and secure your health records</li>
                <li>Comply with legal and regulatory requirements</li>
                <li>Improve platform functionality and user experience</li>
                <li>Prevent fraud and ensure platform security</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Information Sharing</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">4.1 With Healthcare Providers</h3>
              <p className="text-gray-600 mb-4">
                We share relevant medical information with healthcare providers you choose to consult 
                or book services with. This includes your medical history, symptoms, and appointment details.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">4.2 With Service Providers</h3>
              <p className="text-gray-600 mb-4">
                We may share information with trusted third-party service providers who help us operate 
                the platform, including:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Payment processors</li>
                <li>Cloud storage providers</li>
                <li>Analytics services</li>
                <li>Customer support tools</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">4.3 Legal Requirements</h3>
              <p className="text-gray-600 mb-4">
                We may disclose information when required by law, court order, or to protect the 
                rights, property, or safety of Health World, our users, or others.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">4.4 What We DON'T Share</h3>
              <p className="text-gray-600 mb-4">
                We NEVER sell your personal or medical information to third parties for marketing purposes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
              <p className="text-gray-600 mb-4">
                We implement industry-standard security measures to protect your information:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>End-to-end encryption for sensitive data</li>
                <li>Secure HTTPS connections</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication</li>
                <li>Secure cloud storage with encryption at rest</li>
                <li>Employee training on data privacy</li>
              </ul>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <p className="text-sm text-yellow-700">
                    While we implement strong security measures, no system is 100% secure. Please 
                    use strong passwords and keep your account credentials confidential.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights and Choices</h2>
              <p className="text-gray-600 mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your data (subject to legal requirements)</li>
                <li><strong>Portability:</strong> Receive your data in a portable format</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>Restrict Processing:</strong> Limit how we use your data</li>
              </ul>
              <p className="text-gray-600 mt-4">
                To exercise these rights, contact us at privacy@healthworld.com
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Location Data</h2>
              <p className="text-gray-600 mb-4">
                We collect location data only when necessary for specific features:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Emergency assistance to dispatch help to your location</li>
                <li>Finding nearby healthcare providers</li>
                <li>Coordinating at-home service visits</li>
              </ul>
              <p className="text-gray-600 mt-4">
                You can control location permissions in your device settings. Disabling location 
                may limit certain features like emergency assistance.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Cookies and Tracking</h2>
              <p className="text-gray-600 mb-4">
                We use cookies and similar technologies to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Remember your preferences and settings</li>
                <li>Keep you logged in</li>
                <li>Analyze platform usage and performance</li>
                <li>Personalize your experience</li>
              </ul>
              <p className="text-gray-600 mt-4">
                You can control cookies through your browser settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Children's Privacy</h2>
              <p className="text-gray-600 mb-4">
                Health World is not intended for children under 13. We do not knowingly collect 
                information from children. If you're a parent and believe your child has provided 
                us with information, please contact us immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. International Data Transfers</h2>
              <p className="text-gray-600 mb-4">
                Your information may be transferred to and stored in countries outside your country 
                of residence. We ensure appropriate safeguards are in place to protect your data 
                in compliance with applicable laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Data Retention</h2>
              <p className="text-gray-600 mb-4">
                We retain your information for as long as necessary to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Provide our services</li>
                <li>Comply with legal obligations</li>
                <li>Resolve disputes</li>
                <li>Maintain medical records as required by law</li>
              </ul>
              <p className="text-gray-600 mt-4">
                Medical records are typically retained for 7 years after your last interaction, 
                or as required by local healthcare regulations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Changes to This Policy</h2>
              <p className="text-gray-600 mb-4">
                We may update this Privacy Policy from time to time. We'll notify you of significant 
                changes via email or platform notification. Continued use after changes indicates 
                acceptance of the updated policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Us</h2>
              <p className="text-gray-600 mb-4">
                If you have questions or concerns about this Privacy Policy or our data practices:
              </p>
              <div className="bg-gray-50 rounded-lg p-6 mt-4">
                <p className="text-gray-700">
                  <strong>Email:</strong> privacy@healthworld.com<br />
                  <strong>Phone:</strong> +234 800 123 4567<br />
                  <strong>Address:</strong> Health World Privacy Team, Lagos, Nigeria
                </p>
              </div>
            </section>
          </div>
        </Card>
      </div>
    </div>
    <Footer />
    </>
  )
}
