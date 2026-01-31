import { Card, CardContent } from '@/components/ui/card'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/terms-of-service')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='min-h-screen flex flex-col'>
      {/* Header */}
      <header className='flex items-center justify-between px-6 py-4 border-b'>
        <Link to='/' className='text-lg font-semibold hover:underline'>
          Health Tracker
        </Link>
        <div className='flex gap-3'>
          <Link to='/login'>
            <span className='text-sm text-muted-foreground hover:underline'>Log in</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className='flex-1 px-6 py-12 max-w-4xl mx-auto w-full'>
        <Card>
          <CardContent className='pt-6'>
            <h1 className='text-3xl font-bold mb-6'>Terms of Service</h1>
            <p className='text-sm text-muted-foreground mb-8'>
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className='space-y-6 text-sm leading-relaxed'>
              <section>
                <h2 className='text-xl font-semibold mb-3'>1. Acceptance of Terms</h2>
                <p className='text-muted-foreground mb-4'>
                  By accessing and using Health Tracker, you accept and agree to be bound by the terms and provision of
                  this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section>
                <h2 className='text-xl font-semibold mb-3'>2. Description of Service</h2>
                <p className='text-muted-foreground mb-4'>
                  Health Tracker is a web-based application that allows users to track and monitor various health metrics
                  including blood pressure, weight, exercise activities, and water intake. The service is provided "as is"
                  and "as available" without warranties of any kind.
                </p>
              </section>

              <section>
                <h2 className='text-xl font-semibold mb-3'>3. User Accounts</h2>
                <p className='text-muted-foreground mb-3'>To use our service, you must:</p>
                <ul className='list-disc list-inside text-muted-foreground space-y-2 ml-4'>
                  <li>Provide accurate, current, and complete information during registration</li>
                  <li>Maintain and promptly update your account information</li>
                  <li>Maintain the security of your password and identification</li>
                  <li>Accept all responsibility for activities that occur under your account</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                </ul>
              </section>

              <section>
                <h2 className='text-xl font-semibold mb-3'>4. User Responsibilities</h2>
                <p className='text-muted-foreground mb-3'>You agree to:</p>
                <ul className='list-disc list-inside text-muted-foreground space-y-2 ml-4'>
                  <li>Use the service only for lawful purposes</li>
                  <li>Not use the service to violate any laws or regulations</li>
                  <li>Not attempt to gain unauthorized access to the service or its related systems</li>
                  <li>Not interfere with or disrupt the service or servers</li>
                  <li>Not transmit any viruses, malware, or harmful code</li>
                </ul>
              </section>

              <section>
                <h2 className='text-xl font-semibold mb-3'>5. Health Information Disclaimer</h2>
                <p className='text-muted-foreground mb-4'>
                  <strong className='text-foreground'>Important:</strong> Health Tracker is not a medical device and is not
                  intended to diagnose, treat, cure, or prevent any disease. The information provided by this application
                  is for informational and tracking purposes only and should not be used as a substitute for professional
                  medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health
                  provider with any questions you may have regarding a medical condition.
                </p>
              </section>

              <section>
                <h2 className='text-xl font-semibold mb-3'>6. Intellectual Property</h2>
                <p className='text-muted-foreground mb-4'>
                  The service and its original content, features, and functionality are owned by Health Tracker and are
                  protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                  You may not reproduce, distribute, modify, or create derivative works of the service without our express
                  written permission.
                </p>
              </section>

              <section>
                <h2 className='text-xl font-semibold mb-3'>7. Limitation of Liability</h2>
                <p className='text-muted-foreground mb-4'>
                  To the maximum extent permitted by law, Health Tracker shall not be liable for any indirect, incidental,
                  special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly
                  or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of
                  the service.
                </p>
              </section>

              <section>
                <h2 className='text-xl font-semibold mb-3'>8. Service Modifications</h2>
                <p className='text-muted-foreground mb-4'>
                  We reserve the right to modify or discontinue, temporarily or permanently, the service (or any part
                  thereof) with or without notice. We shall not be liable to you or to any third party for any modification,
                  suspension, or discontinuance of the service.
                </p>
              </section>

              <section>
                <h2 className='text-xl font-semibold mb-3'>9. Termination</h2>
                <p className='text-muted-foreground mb-4'>
                  We may terminate or suspend your account and access to the service immediately, without prior notice or
                  liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon
                  termination, your right to use the service will immediately cease.
                </p>
              </section>

              <section>
                <h2 className='text-xl font-semibold mb-3'>10. Governing Law</h2>
                <p className='text-muted-foreground mb-4'>
                  These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which Health
                  Tracker operates, without regard to its conflict of law provisions.
                </p>
              </section>

              <section>
                <h2 className='text-xl font-semibold mb-3'>11. Changes to Terms</h2>
                <p className='text-muted-foreground mb-4'>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision
                  is material, we will try to provide at least 30 days notice prior to any new terms taking effect. What
                  constitutes a material change will be determined at our sole discretion.
                </p>
              </section>

              <section>
                <h2 className='text-xl font-semibold mb-3'>12. Contact Information</h2>
                <p className='text-muted-foreground mb-4'>
                  If you have any questions about these Terms of Service, please contact us through the application or using
                  the contact information provided in our Privacy Policy.
                </p>
              </section>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className='border-t px-6 py-4 text-center text-xs text-muted-foreground'>
        <div className='flex justify-center gap-6'>
          <Link to='/privacy-policy' className='hover:underline'>
            Privacy Policy
          </Link>
          <Link to='/terms-of-service' className='hover:underline'>
            Terms of Service
          </Link>
        </div>
      </footer>
    </div>
  )
}
