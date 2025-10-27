import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Privacy Policy | API0',
  description: 'Privacy policy for API0 services provided by Mayorana',
  robots: 'noindex, nofollow', // Legal pages typically not indexed
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-foreground">Privacy Policy</h1>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-muted-foreground mb-8">
          <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>
            This Privacy Policy describes how Mayorana (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), a company located in Saint-Prex, Switzerland,
            collects, uses, and protects your information when you use our API0 service (&quot;Service&quot;) accessible at api0.ai.
          </p>
          <p>
            By using our Service, you agree to the collection and use of information in accordance with this policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>

          <h3 className="text-xl font-medium mb-3">2.1 Information You Provide</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Account information (email address, company name)</li>
            <li>API configurations and endpoint definitions</li>
            <li>Usage data and API calls made through our service</li>
            <li>Support communications and feedback</li>
          </ul>

          <h3 className="text-xl font-medium mb-3">2.2 Automatically Collected Information</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Log data (IP addresses, browser type, access times)</li>
            <li>Usage metrics (API call frequency, response times)</li>
            <li>Device and browser information</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>

          <h3 className="text-xl font-medium mb-3">2.3 API Data</h3>
          <p>
            When you use our API routing service, we may process the content of API requests and responses
            to provide routing, analysis, and debugging capabilities. This data is processed according to
            your specific configuration and retention settings.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
          <ul className="list-disc pl-6">
            <li>Provide and maintain our API routing service</li>
            <li>Process API requests and route them to appropriate endpoints</li>
            <li>Monitor service performance and debug issues</li>
            <li>Communicate with you about your account and our services</li>
            <li>Improve our service functionality and user experience</li>
            <li>Comply with legal obligations and protect our rights</li>
            <li>Prevent fraud and ensure service security</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Data Sharing and Disclosure</h2>
          <p>We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:</p>

          <h3 className="text-xl font-medium mb-3">4.1 Service Providers</h3>
          <p>
            We may share information with trusted third-party service providers who assist us in operating
            our service, such as cloud hosting providers, analytics services, and payment processors.
          </p>

          <h3 className="text-xl font-medium mb-3">4.2 Legal Requirements</h3>
          <p>
            We may disclose your information if required by law, regulation, legal process, or governmental request.
          </p>

          <h3 className="text-xl font-medium mb-3">4.3 Business Transfers</h3>
          <p>
            In the event of a merger, acquisition, or sale of assets, your information may be transferred
            as part of the business transaction.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Data Retention</h2>
          <p>
            We retain your personal information for as long as necessary to provide our services and comply
            with legal obligations. API logs and usage data are typically retained for 90 days unless
            longer retention is required for debugging or compliance purposes.
          </p>
          <p>
            You may request deletion of your data at any time, subject to our legal and contractual obligations.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your information against
            unauthorized access, alteration, disclosure, or destruction. These measures include:
          </p>
          <ul className="list-disc pl-6">
            <li>Encryption of data in transit and at rest</li>
            <li>Regular security assessments and updates</li>
            <li>Access controls and authentication mechanisms</li>
            <li>Employee training on data protection practices</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Your Rights</h2>
          <p>Depending on your location, you may have the following rights regarding your personal information:</p>
          <ul className="list-disc pl-6">
            <li>Access to your personal information</li>
            <li>Correction of inaccurate information</li>
            <li>Deletion of your information</li>
            <li>Restriction of processing</li>
            <li>Data portability</li>
            <li>Objection to processing</li>
          </ul>
          <p>
            To exercise these rights, please contact us at the information provided below.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. International Data Transfers</h2>
          <p>
            Your information may be processed and stored in countries other than your own. We ensure that
            any international transfers comply with applicable data protection laws and provide appropriate
            safeguards for your information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Cookies and Tracking</h2>
          <p>
            We use cookies and similar technologies to enhance your experience and analyze service usage.
            You can control cookie settings through your browser preferences, though some functionality
            may be limited if cookies are disabled.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. Children&apos;s Privacy</h2>
          <p>
            Our service is not intended for individuals under the age of 13. We do not knowingly collect
            personal information from children under 13. If we become aware of such collection, we will
            take steps to delete the information promptly.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">11. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any material changes
            by posting the new policy on our website and updating the &quot;Last updated&quot; date above. Your
            continued use of the service after changes constitutes acceptance of the updated policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">12. Contact Information</h2>
          <p>
            If you have any questions about this Privacy Policy or our data practices, please contact us:
          </p>
          <div className="bg-muted p-4 rounded-lg mt-4">
            <p><strong>Mayorana</strong></p>
            <p>Saint-Prex, Switzerland</p>
            <p>Email: privacy@api0.ai</p>
            <p>Website: https://api0.ai</p>
          </div>
        </section>
      </div>
    </div>
  );
}
