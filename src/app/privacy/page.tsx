import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for API0 services provided by Mayorana',
  robots: 'noindex, nofollow', // Legal pages typically not indexed
};

// Written from what the gateway, store and messaging bridge actually keep.
// When one of them starts storing something new, this page changes with it.
export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-foreground">Privacy Policy</h1>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-muted-foreground mb-8">
          {/* A fixed date: change it whenever the policy below changes. */}
          <strong>Last updated:</strong> October 6, 2026
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>
            This Privacy Policy describes how Mayorana (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), a company located in Saint-Prex,
            Switzerland, collects, uses and protects personal data when you use api0 (the &quot;Service&quot;): the website
            api0.ai, the dashboard at app.api0.ai, the MCP gateway, the SDK and CLI, and the WhatsApp and Telegram assistant.
          </p>
          <p className="mt-4">
            api0 sits between AI clients and the APIs that you, or the company that invited you, connect to it. That
            company decides which APIs are connected and who may use them. For the data inside those APIs, it is
            responsible for its own systems; this policy covers what api0 itself handles.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>

          <h3 className="text-xl font-medium mb-3">2.1 Account and workspace</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Your email address and name, from Google sign-in or your company&apos;s identity provider (such as Microsoft Entra ID)</li>
            <li>The workspaces you belong to and your role in each</li>
            <li>
              API keys you create. We store a hash that lets us check a key, not the key itself. A key you link to WhatsApp
              or Telegram is the exception: the assistant has to use it on your behalf, so it is stored encrypted.
            </li>
            <li>Your credit balance and credit transactions</li>
          </ul>

          <h3 className="text-xl font-medium mb-3">2.2 What you configure</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>The API specifications you upload, and the tools and endpoints made from them</li>
            <li>The instructions you write for the model</li>
            <li>
              Credentials for your backends: bearer tokens, headers, OAuth client secrets, and the personal secrets or
              connected accounts of individual users. These are encrypted with AES-256-GCM before they are stored.
            </li>
          </ul>

          <h3 className="text-xl font-medium mb-3">2.3 Tool calls</h3>
          <p className="mb-4">
            When a client calls one of your tools, the gateway passes the arguments to your backend and the result back to
            the client. It does not store the content of either. For each call it logs: who made it (email and API key),
            the tool or endpoint, the time, the response status and duration, request and response sizes, the caller&apos;s
            IP address and user agent, and, where they apply, token counts and the model used.
          </p>

          <h3 className="text-xl font-medium mb-3">2.4 WhatsApp and Telegram</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Your phone number or Telegram identifier, and the api0 account you linked it to</li>
            <li>
              The recent conversation history, so the assistant can follow the conversation. It is deleted after 30 days
              without activity.
            </li>
            <li>Messages that could not be processed, kept for 90 days so we can find the cause</li>
          </ul>

          <h3 className="text-xl font-medium mb-3">2.5 Purchases</h3>
          <p className="mb-4">
            When you buy credits or a licence, Stripe handles the payment. We receive your email address, the amount and
            Stripe&apos;s payment references, and for a licence the key issued to you. Card details never reach us.
          </p>

          <h3 className="text-xl font-medium mb-3">2.6 Website and dashboard</h3>
          <p>
            We use Plausible Analytics on api0.ai and app.api0.ai. It does not use cookies and does not collect personal
            data. The dashboard stores your sign-in session and display preferences, such as the theme, in your browser.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
          <ul className="list-disc pl-6">
            <li>To run the Service: authenticate callers, route tool calls, attach the right credential, and bill credits</li>
            <li>To show workspace owners their usage and call logs</li>
            <li>To send account emails: welcome, payment receipts, low-credit warnings, API key changes, workspace invites and licences</li>
            <li>
              To send occasional emails about using the Service: a monthly usage summary, tips if you have not made a call
              yet, and news about new features. Each of these has an unsubscribe link; account emails do not stop.
            </li>
            <li>To find and fix problems, and to prevent abuse</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Service Providers</h2>
          <p className="mb-4">
            We do not sell, trade or rent your personal data. We share it only with the providers the Service depends on,
            each under its own privacy policy:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Google (Firebase Authentication), and your company&apos;s identity provider if it uses one, for sign-in</li>
            <li>Stripe, for payments</li>
            <li>An AI model provider, which receives WhatsApp and Telegram messages in order to answer them</li>
            <li>An AI model provider, which receives the API specifications you upload in order to turn them into tools</li>
            <li>Meta (WhatsApp) and Telegram, which carry messages to and from the assistant</li>
            <li>Our email provider, for the emails described above</li>
            <li>Plausible Analytics, for website and dashboard statistics</li>
          </ul>
          <p className="mb-4">
            Your own backends, and services you connect (for example Azure DevOps), receive the tool calls and credentials
            you configure them to receive.
          </p>
          <p>
            We may also disclose data when the law requires it, to protect our rights or safety, or as part of a merger,
            acquisition or sale of assets.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Data Retention</h2>
          <ul className="list-disc pl-6">
            <li>Account, workspace and configuration data: until you delete your account or workspace</li>
            <li>Tool call logs: until the account or workspace they belong to is deleted</li>
            <li>WhatsApp and Telegram conversation history: 30 days after the last message</li>
            <li>Messages the assistant could not process: 90 days</li>
            <li>Purchase records: as long as the law requires us to keep them</li>
          </ul>
          <p className="mt-4">You can ask us to delete your data at any time, subject to our legal obligations.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Data Security</h2>
          <ul className="list-disc pl-6">
            <li>All traffic to the Service is encrypted in transit (HTTPS)</li>
            <li>Backend credentials and users&apos; secrets are encrypted with AES-256-GCM before they are stored</li>
            <li>Workspaces are separated in the database with row-level security</li>
            <li>Connectors such as Claude sign in with OAuth 2.1 and PKCE; authorization codes work once</li>
          </ul>
          <p className="mt-4">No method of transmission or storage is completely secure, but we work to protect your data.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Your Rights</h2>
          <p className="mb-4">
            Under the Swiss Federal Act on Data Protection and, where it applies, the EU General Data Protection
            Regulation, you have the right to:
          </p>
          <ul className="list-disc pl-6">
            <li>Access your personal data</li>
            <li>Have inaccurate data corrected</li>
            <li>Have your data deleted</li>
            <li>Restrict or object to processing, including the emails about using the Service (each has an unsubscribe link)</li>
            <li>Receive your data in a portable format</li>
          </ul>
          <p className="mt-4">
            To exercise these rights, contact us at the address below. If you use api0 through your employer&apos;s
            workspace, some requests may also need to go to your employer.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. International Data Transfers</h2>
          <p>
            We are based in Switzerland. Several of the providers above, including Google, Stripe, Meta and our AI model
            providers, may process data outside Switzerland and the European Economic Area, including in the United
            States. Such transfers rely on the safeguards those providers offer under applicable data protection law.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Cookies</h2>
          <p>
            We use no advertising or tracking cookies. The dashboard keeps your sign-in session and preferences in your
            browser, which it needs in order to work.
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
            <p>Email: contact@mayorana.ch</p>
            <p>Website: https://api0.ai</p>
          </div>
        </section>
      </div>
    </div>
  );
}
