import LegalLayout from '@/components/legal/LegalLayout'

export const metadata = { title: 'Terms & Conditions | Panelopia' }

export default function TermsPage() {
  return (
    <LegalLayout eyebrow="Legal" title="Terms & Conditions">
      <p>
        Welcome to Panelopia. These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern all
        purchases and use of our website panelopia.com (the &ldquo;Site&rdquo;). By accessing
        or ordering from Panelopia, you agree to comply with these Terms and our Privacy
        Policy. Please review carefully before making a purchase.
      </p>
      <p>
        These Terms apply to purchases made within Canada. Orders placed outside of
        Canada may be subject to different policies.
      </p>

      <h2>1. Placing an Order</h2>
      <p>
        To make a purchase, you must be of legal age in your province and a consumer
        purchasing for personal or business use.
      </p>
      <p>Order Process:</p>
      <ul>
        <li>You will need a valid email address and/or phone number.</li>
        <li>Once you place an order, you may receive an acknowledgement email.</li>
        <li>
          A binding agreement (&ldquo;Contract&rdquo;) between you and Panelopia is created
          once your order is shipped and you receive a shipping confirmation.
        </li>
        <li>
          If an item is unavailable, mispriced, or otherwise cannot be supplied, we
          reserve the right to cancel your order and will notify you promptly.
        </li>
      </ul>

      <h2>2. Our Right to Decline or Cancel</h2>
      <p>Panelopia may refuse or cancel an order under circumstances including but not limited to:</p>
      <ul>
        <li>Product not available or out of stock</li>
        <li>Incorrect billing details or unverifiable information</li>
        <li>Suspected fraudulent activity</li>
        <li>Non-receipt of payment by the day of order placement</li>
        <li>Errors in pricing or product description</li>
        <li>Inability to deliver to the provided address</li>
        <li>Force majeure events beyond our control (see Section 8)</li>
      </ul>
      <p>In such cases, you will be refunded for any payments made.</p>

      <h2>3. Prices &amp; Payments</h2>
      <p>All prices are in Canadian Dollars (CAD) and subject to GST/HST as applicable.</p>
      <p>Shipping costs are calculated at checkout based on your delivery location.</p>
      <p>
        We accept the payment methods displayed during checkout. Payments via unlisted
        methods are not accepted.
      </p>
      <p>
        Orders must be paid in full before delivery or pick-up. Title to goods transfers
        only upon full payment.
      </p>

      <h2>4. Shipping &amp; Delivery</h2>
      <p>
        Deliveries are made to residential and business addresses within Panelopia&apos;s
        serviceable areas.
      </p>
      <p>
        We strive to ship all items together, but in some cases (e.g., customized
        panels), deliveries may be split. You will be notified if this occurs.
      </p>
      <p>
        Inspect all packages upon delivery. If visibly damaged, please refuse the
        shipment and notify us immediately.
      </p>
      <p>
        Estimated delivery timelines are provided for reference only. Delays due to
        carriers or events outside our control are not our responsibility.
      </p>

      <h2>5. Pre-Orders</h2>
      <p>
        Pre-order items may be offered before launch. Estimated delivery dates are
        provided as guidance only. Production or delivery delays may occur, and
        Panelopia will keep you informed. Orders will only be processed once full
        payment is received.
      </p>

      <h2>6. Product Information</h2>
      <p>We make every effort to display products accurately. However:</p>
      <ul>
        <li>Colours, textures, and sizes may appear differently on digital screens.</li>
        <li>Slight variations in patterns, finishes, or tones are natural and not considered defects.</li>
        <li>Panelopia reserves the right to correct pricing errors or update product details without prior notice.</li>
      </ul>

      <h2>7. Limitation of Liability</h2>
      <p>Panelopia is not responsible for:</p>
      <ul>
        <li>Delays caused by carriers or external events</li>
        <li>Variations in product appearance due to digital displays</li>
        <li>Misuse, improper installation, or modifications of our products</li>
      </ul>
      <p>Our maximum liability is limited to the purchase price of the product(s) in question.</p>

      <h2>8. Events Beyond Our Control</h2>
      <p>
        We are not liable for failure to fulfill obligations due to events outside our
        reasonable control, including but not limited to: natural disasters, strikes,
        transportation disruptions, government restrictions, pandemics, or supplier delays.
      </p>

      <h2>9. Use of Website</h2>
      <p>By using our website, you agree not to:</p>
      <ul>
        <li>Copy, modify, or distribute content without permission</li>
        <li>Engage in fraudulent or unlawful activity</li>
        <li>Attempt to bypass security measures or misuse our platform</li>
        <li>Post or transmit harmful software or malicious code</li>
      </ul>
      <p>
        Panelopia reserves the right to restrict access, suspend accounts, or cancel
        orders if misuse is detected.
      </p>

      <h2>10. Warranty Disclaimer</h2>
      <p>
        All products are provided &ldquo;as is.&rdquo; Except where required by law,
        Panelopia disclaims all express or implied warranties, including fitness for a
        particular purpose.
      </p>

      <h2>11. Indemnity</h2>
      <p>
        You agree to indemnify and hold harmless Panelopia, its affiliates, and
        employees from any claims, damages, or costs arising from misuse of our products
        or violation of these Terms.
      </p>

      <h2>12. Modifications</h2>
      <p>
        Panelopia may update these Terms from time to time. Changes take effect once
        posted on our website and apply prospectively. We encourage you to review them
        periodically.
      </p>

      <h2>13. Governing Law</h2>
      <p>
        These Terms are governed by the laws of Alberta, Canada. Any disputes will be
        handled in the jurisdiction of Alberta courts at Calgary only.
      </p>

      <h2>14. Contact Us</h2>
      <p>
        If you have questions about these Terms or your order, please reach out at{' '}
        <a href="mailto:info@panelopia.com">info@panelopia.com</a> or call{' '}
        <a href="tel:5874335187">587-433-5187</a>.
      </p>
    </LegalLayout>
  )
}