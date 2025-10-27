import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Terms of Service | API0',
  description: 'Terms of service for API0 services provided by Mayorana',
  robots: 'noindex, nofollow', // Legal pages typically not indexed
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-foreground">Terms of Service</h1>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-muted-foreground mb-8">
          <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
          <p>
            These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you and Mayorana,
            a company located in Saint-Prex, Switzerland (&quot;Company,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), concerning your
            use of the API0 service and website located at api0.ai (&quot;Service&quot;).
          </p>
          <p>
            By accessing or using our Service, you agree to be bound by these Terms. If you do not agree
            to these Terms, you may not access or use the Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
          <p>
            API0 is an intelligent API routing and management platform that enables applications to understand
            natural language and route requests to appropriate API endpoints. Our Service includes:
          </p>
          <ul className="list-disc pl-6">
            <li>Natural language processing and intent recognition</li>
            <li>API endpoint routing and management</li>
            <li>Real-time API analytics and monitoring</li>
            <li>Developer dashboard and configuration tools</li>
            <li>Integration support and documentation</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>

          <h3 className="text-xl font-medium mb-3">3.1 Account Creation</h3>
          <p>
            To access certain features of our Service, you must create an account. You agree to provide
            accurate, complete, and current information during registration and to update such information
            to keep it accurate, complete, and current.
          </p>

          <h3 className="text-xl font-medium mb-3">3.2 Account Security</h3>
          <p>
            You are responsible for safeguarding your account credentials and for all activities that occur
            under your account. You must notify us immediately of any unauthorized use of your account.
          </p>

          <h3 className="text-xl font-medium mb-3">3.3 Account Termination</h3>
          <p>
            We reserve the right to suspend or terminate your account at any time for violation of these
            Terms or for any other reason at our sole discretion.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Acceptable Use</h2>

          <h3 className="text-xl font-medium mb-3">4.1 Permitted Use</h3>
          <p>
            You may use our Service only for lawful purposes and in accordance with these Terms. You agree
            to use the Service in a manner consistent with any applicable laws and regulations.
          </p>

          <h3 className="text-xl font-medium mb-3">4.2 Prohibited Activities</h3>
          <p>You agree not to:</p>
          <ul className="list-disc pl-6">
            <li>Use the Service for any illegal or unauthorized purpose</li>
            <li>Transmit any harmful, threatening, abusive, or defamatory content</li>
            <li>Attempt to gain unauthorized access to our systems or networks</li>
            <li>Interfere with or disrupt the Service or servers</li>
            <li>Use the Service to spam, phish, or distribute malware</li>
            <li>Reverse engineer, decompile, or attempt to extract source code</li>
            <li>Exceed rate limits or attempt to overwhelm our infrastructure</li>
            <li>Use the Service to compete with or replicate our offerings</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. API Usage and Limits</h2>

          <h3 className="text-xl font-medium mb-3">5.1 API Access</h3>
          <p>
            Subject to these Terms and your subscription plan, we grant you a limited, non-exclusive,
            non-transferable right to access and use our API during the term of your agreement.
          </p>

          <h3 className="text-xl font-medium mb-3">5.2 Usage Limits</h3>
          <p>
            Your use of the Service is subject to usage limits based on your subscription plan. Exceeding
            these limits may result in additional charges or temporary suspension of access.
          </p>

          <h3 className="text-xl font-medium mb-3">5.3 Data Processing</h3>
          <p>
            You grant us the right to process API requests and responses as necessary to provide the Service,
            including for routing, analysis, debugging, and service improvement purposes.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Payment Terms</h2>

          <h3 className="text-xl font-medium mb-3">6.1 Subscription Fees</h3>
          <p>
            Access to certain features of the Service requires payment of subscription fees. Fees are charged
            in advance on a monthly or annual basis as specified in your chosen plan.
          </p>

          <h3 className="text-xl font-medium mb-3">6.2 Payment Processing</h3>
          <p>
            All payments are processed through third-party payment providers. You agree to provide valid
            payment information and authorize us to charge the applicable fees to your payment method.
          </p>

          <h3 className="text-xl font-medium mb-3">6.3 Refunds</h3>
          <p>
            Refunds are generally not provided except as required by law or as specified in your subscription agreement.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Intellectual Property</h2>

          <h3 className="text-xl font-medium mb-3">7.1 Our Rights</h3>
          <p>
            The Service and all related technology, including software, algorithms, and documentation,
            are owned by Mayorana and protected by intellectual property laws.
          </p>

          <h3 className="text-xl font-medium mb-3">7.2 Your Content</h3>
          <p>
            You retain ownership of content you submit to the Service. However, you grant us a license
            to use, process, and analyze such content as necessary to provide the Service.
          </p>

          <h3 className="text-xl font-medium mb-3">7.3 Feedback</h3>
          <p>
            Any feedback, suggestions, or improvements you provide may be used by us without restriction
            or compensation to you.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Privacy and Data Protection</h2>
          <p>
            Our collection and use of your information is governed by our Privacy Policy, which is
            incorporated into these Terms by reference. By using the Service, you consent to the
            collection and use of your information as described in the Privacy Policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Service Availability</h2>

          <h3 className="text-xl font-medium mb-3">9.1 Uptime</h3>
          <p>
            While we strive to maintain high availability, we do not guarantee that the Service will be
            available 100% of the time. The Service may be subject to planned and unplanned downtime.
          </p>

          <h3 className="text-xl font-medium mb-3">9.2 Maintenance</h3>
          <p>
            We reserve the right to perform maintenance on our systems, which may temporarily affect
            Service availability. We will provide reasonable notice of planned maintenance when possible.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. Disclaimers and Limitations of Liability</h2>

          <h3 className="text-xl font-medium mb-3">10.1 Disclaimer of Warranties</h3>
          <p>
            THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, WHETHER
            EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY,
            FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
          </p>

          <h3 className="text-xl font-medium mb-3">10.2 Limitation of Liability</h3>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, MAYORANA SHALL NOT BE LIABLE FOR ANY INDIRECT,
            INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS
            OF PROFITS, DATA, OR USE, ARISING OUT OF OR RELATING TO THESE TERMS OR THE SERVICE.
          </p>

          <h3 className="text-xl font-medium mb-3">10.3 Maximum Liability</h3>
          <p>
            Our total liability for any claims arising out of or relating to these Terms or the Service
            shall not exceed the amount paid by you for the Service in the twelve months preceding the claim.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">11. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless Mayorana and its officers, directors, employees,
            and agents from and against any claims, damages, obligations, losses, liabilities, costs, or debt,
            and expenses (including attorney&apos;s fees) arising from your use of the Service or violation of these Terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">12. Governing Law and Dispute Resolution</h2>

          <h3 className="text-xl font-medium mb-3">12.1 Governing Law</h3>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of Switzerland,
            without regard to conflict of law principles.
          </p>

          <h3 className="text-xl font-medium mb-3">12.2 Jurisdiction</h3>
          <p>
            Any disputes arising out of or relating to these Terms or the Service shall be subject to
            the exclusive jurisdiction of the courts of Switzerland.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">13. Termination</h2>
          <p>
            These Terms remain in effect until terminated by either party. You may terminate your account
            at any time by contacting us. We may terminate or suspend your access to the Service immediately,
            without prior notice, for any breach of these Terms.
          </p>
          <p>
            Upon termination, your right to use the Service will cease immediately, and we may delete
            your account and associated data.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">14. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. We will notify you of any material
            changes by posting the updated Terms on our website and updating the &quot;Last updated&quot; date.
            Your continued use of the Service after changes constitutes acceptance of the updated Terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">15. Severability</h2>
          <p>
            If any provision of these Terms is held to be invalid or unenforceable, the remaining
            provisions will remain in full force and effect.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">16. Contact Information</h2>
          <p>
            If you have any questions about these Terms, please contact us:
          </p>
          <div className="bg-muted p-4 rounded-lg mt-4">
            <p><strong>Mayorana</strong></p>
            <p>Saint-Prex, Switzerland</p>
            <p>Email: legal@api0.ai</p>
            <p>Website: https://api0.ai</p>
          </div>
        </section>
      </div>
    </div>
  );
}
