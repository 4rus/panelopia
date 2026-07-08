import LegalLayout from '@/components/legal/LegalLayout'

export const metadata = { title: 'Privacy Policy | Panelopia' }

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout eyebrow="Legal" title="Privacy Policy">
      <p>
        At Panelopia, we value and respect your privacy. This statement explains the
        type of information we may collect when you visit our site, how that information
        is used, and the measures we take to protect it.
      </p>
      <p>
        If you have any questions or require further clarification regarding this Privacy
        Policy, please contact us at{' '}
        <a href="mailto:info@panelopia.com">info@panelopia.com</a> or call{' '}
        <a href="tel:5874335187">587-433-5187</a>.
      </p>
      <p>
        This policy applies strictly to information gathered through our website and its
        interactions. It does not cover data collected offline or through other online
        communication channels.
      </p>

      <h2>Your Agreement</h2>
      <p>
        By accessing and using our website, you acknowledge and accept the practices
        described in this Privacy Policy.
      </p>

      <h2>Information We May Collect</h2>
      <p>Depending on how you interact with our website, we may gather:</p>
      <ul>
        <li>Basic contact details (name, phone number, email address)</li>
        <li>Billing or shipping information when placing an order</li>
        <li>Any details you share when filling out forms, requesting samples, or contacting us</li>
        <li>Additional information provided in correspondence, such as inquiries, messages, or attachments</li>
      </ul>

      <h2>How We Use Collected Information</h2>
      <p>Your information is used for purposes such as:</p>
      <ul>
        <li>Managing and maintaining our website&apos;s functionality</li>
        <li>Processing your requests, orders, or service inquiries</li>
        <li>Personalizing and improving your browsing experience</li>
        <li>Developing and enhancing products and services</li>
        <li>Sending updates, offers, or promotional communications (optional)</li>
        <li>Responding to questions or providing customer support</li>
        <li>Detecting, preventing, and addressing security or fraudulent issues</li>
      </ul>

      <h2>Cookies and Tracking</h2>
      <p>
        Our website may use cookies to remember visitor preferences, monitor website
        activity, and enhance user experience. Cookies are small files stored on your
        device, which can be managed or disabled through your browser settings. Please
        note that disabling cookies may affect certain features of the site.
      </p>

      <h2>Third-Party Links</h2>
      <p>
        Panelopia may feature links to external websites. Please be aware that our
        Privacy Policy does not apply to these third-party platforms. We recommend
        reviewing their privacy policies for details about how your data is managed.
      </p>

      <h2>Your Privacy Rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Access the personal data we hold about you</li>
        <li>Request corrections to inaccurate or incomplete data</li>
        <li>Ask for the deletion of your personal information under certain conditions</li>
        <li>Restrict how your information is processed</li>
        <li>Object to specific uses of your personal information</li>
      </ul>
      <p>
        To exercise these rights, please reach out to us directly. We aim to respond
        within 30 days of receiving your request.
      </p>

      <h2>Pets Policy</h2>
      <p>
        For the comfort and safety of all our customers, pets are not permitted inside
        the Panelopia showroom and at job sites. Exceptions may be made for certified
        service animals in compliance with applicable laws.
      </p>
    </LegalLayout>
  )
}