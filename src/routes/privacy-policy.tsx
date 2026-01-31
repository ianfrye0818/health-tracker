import { Card, CardContent } from '@/components/ui/card'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/privacy-policy')({
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
            <h1 className='text-3xl font-bold mb-6'>Privacy Policy</h1>
            <p className='text-sm text-muted-foreground mb-8'>
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className='space-y-6 text-sm leading-relaxed'>
              <section>
                <h2 className='text-xl font-semibold mb-3'>1. Introduction</h2>
                <p className='text-muted-foreground mb-4'>
                  Welcome to Health Tracker. We are committed to protecting your personal information and your right to privacy.
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our
                  health tracking application.
                </p>
              </section>

              <section>
                <h2 className='text-xl font-semibold mb-3'>2. Information We Collect</h2>
                <p className='text-muted-foreground mb-3'>
                  We collect information that you provide directly to us, including:
                </p>
                <ul className='list-disc list-inside text-muted-foreground space-y-2 ml-4'>
                  <li>Account information (email address, username, password)</li>
                  <li>Health data (blood pressure readings, weight entries, exercise logs, water intake)</li>
                  <li>Profile information (age, gender, height, and other optional details)</li>
                  <li>Usage data and preferences</li>
                </ul>
              </section>

              <section>
                <h2 className='text-xl font-semibold mb-3'>3. How We Use Your Information</h2>
                <p className='text-muted-foreground mb-3'>We use the information we collect to:</p>
                <ul className='list-disc list-inside text-muted-foreground space-y-2 ml-4'>
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process and complete transactions</li>
                  <li>Send you technical notices and support messages</li>
                  <li>Respond to your comments and questions</li>
                  <li>Monitor and analyze usage patterns</li>
                </ul>
              </section>

              <section>
                <h2 className='text-xl font-semibold mb-3'>4. Data Storage and Security</h2>
                <p className='text-muted-foreground mb-4'>
                  We implement appropriate technical and organizational security measures to protect your personal information.
                  Your data is stored securely and encrypted. However, no method of transmission over the Internet or
                  electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className='text-xl font-semibold mb-3'>5. Data Sharing and Disclosure</h2>
                <p className='text-muted-foreground mb-4'>
                  We do not sell, trade, or rent your personal information to third parties. We may share your information
                  only in the following circumstances:
                </p>
                <ul className='list-disc list-inside text-muted-foreground space-y-2 ml-4'>
                  <li>With your explicit consent</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and safety</li>
                  <li>In connection with a business transfer or merger</li>
                </ul>
              </section>

              <section>
                <h2 className='text-xl font-semibold mb-3'>6. Your Rights</h2>
                <p className='text-muted-foreground mb-3'>You have the right to:</p>
                <ul className='list-disc list-inside text-muted-foreground space-y-2 ml-4'>
                  <li>Access and receive a copy of your personal data</li>
                  <li>Rectify inaccurate or incomplete data</li>
                  <li>Request deletion of your personal data</li>
                  <li>Object to processing of your personal data</li>
                  <li>Request restriction of processing</li>
                  <li>Data portability</li>
                </ul>
              </section>

              <section>
                <h2 className='text-xl font-semibold mb-3'>7. Cookies and Tracking Technologies</h2>
                <p className='text-muted-foreground mb-4'>
                  We may use cookies and similar tracking technologies to track activity on our application and store certain
                  information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                </p>
              </section>

              <section>
                <h2 className='text-xl font-semibold mb-3'>8. Children's Privacy</h2>
                <p className='text-muted-foreground mb-4'>
                  Our service is not intended for children under the age of 13. We do not knowingly collect personal
                  information from children under 13. If you become aware that a child has provided us with personal
                  information, please contact us.
                </p>
              </section>

              <section>
                <h2 className='text-xl font-semibold mb-3'>9. Changes to This Privacy Policy</h2>
                <p className='text-muted-foreground mb-4'>
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                  Privacy Policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <section>
                <h2 className='text-xl font-semibold mb-3'>10. Contact Us</h2>
                <p className='text-muted-foreground mb-4'>
                  If you have any questions about this Privacy Policy, please contact us through the application or by using
                  the contact information provided in our Terms of Service.
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
