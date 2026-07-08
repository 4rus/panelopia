import LegalLayout from '@/components/legal/LegalLayout'

export const metadata = { title: 'Return Policy | Panelopia' }

export default function ReturnPolicyPage() {
  return (
    <LegalLayout eyebrow="Legal" title="Return Policy">
      <p>
        At Panelopia, we want your purchase to add the perfect touch to your home or
        business. While we stand behind the quality of our wall panels and décor
        products, we understand that situations may arise where a return is required.
        If you are not completely satisfied with your purchase, please get in touch with
        us at <a href="mailto:info@panelopia.com">info@panelopia.com</a>.
      </p>

      <h2>1. Eligibility for Returns</h2>
      <ul>
        <li>The original purchase must be from Panelopia, not a third party.</li>
        <li>Products may be returned within 10 days of delivery if you are not fully satisfied.</li>
        <li>Items must be unused, uninstalled, and in their original packaging with all tags, attachments, and protective wrapping intact.</li>
        <li>Any product that has been installed, cut, or altered will not be eligible for return.</li>
      </ul>

      <h2>2. Shipping &amp; Restocking Fees</h2>
      <ul>
        <li>All returns are subject to shipping charges and restocking fees.</li>
        <li>These costs will be deducted from your refund amount.</li>
      </ul>

      <h2>3. Damaged or Defective Products</h2>
      <ul>
        <li>If you receive a product that is defective or damaged upon arrival, please contact us immediately.</li>
        <li>Shipping-related damages must be reported directly to the carrier upon delivery.</li>
        <li>Eligible defective/damaged items will be replaced or refunded promptly.</li>
      </ul>

      <h2>4. Refund Process</h2>
      <ul>
        <li>Refunds will only be issued once the returned product has been inspected and approved.</li>
        <li>Approved refunds will be processed back to the original payment method within 7–10 business days.</li>
      </ul>

      <h2>5. Exclusions</h2>
      <ul>
        <li>Final sale, clearance, and customized/personalized panels are non-refundable and cannot be returned.</li>
        <li>Returns that do not comply with our policy may be refused or subject to additional charges.</li>
      </ul>

      <h2>6. How to Initiate a Return</h2>
      <p>
        To begin a return, please email us at{' '}
        <a href="mailto:info@panelopia.com">info@panelopia.com</a> with your order
        details and the reason for the return. Returns that do not comply with our
        policy may be refused or subject to additional fees at the company&apos;s
        discretion.
      </p>
      <p>If you have further questions about this policy or your order, please contact us.</p>
    </LegalLayout>
  )
}