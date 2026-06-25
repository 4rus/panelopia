"use client";

import { useState } from "react";

// Panelopia client's WhatsApp Business number (no +, no dashes, no spaces)
const WHATSAPP_NUMBER = "15874335187";

// Edit this anytime — it's just the pre-filled text that shows up in the chat
const PREFILLED_MESSAGE =
  "Hi there — I'd love to learn more about Panelopia's wall panels for my space.";

export default function WhatsAppFloat() {
  const [hovered, setHovered] = useState(false);

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    PREFILLED_MESSAGE
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Chat with Panelopia on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 shadow-lg shadow-black/30 transition-all duration-300 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1814]"
    >
      <svg
        viewBox="0 0 32 32"
        className="h-7 w-7 flex-shrink-0 fill-white"
        aria-hidden="true"
      >
        <path d="M16.04 2.67C8.6 2.67 2.6 8.66 2.6 16.1c0 2.62.74 5.07 2.02 7.16L2 30l6.92-2.55a13.4 13.4 0 0 0 7.12 2.04h.01c7.44 0 13.44-5.99 13.44-13.43 0-3.59-1.4-6.96-3.94-9.5a13.36 13.36 0 0 0-9.51-3.9Zm0 24.55h-.01a11.1 11.1 0 0 1-5.66-1.55l-.41-.24-4.1 1.51 1.53-3.99-.27-.41a11.08 11.08 0 0 1-1.71-5.94c0-6.14 5-11.14 11.15-11.14 2.98 0 5.78 1.16 7.89 3.27a11.06 11.06 0 0 1 3.26 7.88c0 6.14-5 11.14-11.14 11.14Zm6.1-8.34c-.33-.17-1.97-.97-2.28-1.08-.3-.11-.53-.17-.75.17-.22.33-.86 1.08-1.06 1.3-.2.22-.39.25-.72.08-1.95-.97-3.23-1.73-4.51-3.93-.34-.59.34-.55.97-1.83.11-.22.06-.41-.06-.58-.11-.17-.5-1.2-.69-1.66-.18-.44-.37-.38-.5-.39h-.43c-.15 0-.39.06-.6.28-.2.22-.78.76-.78 1.85s.8 2.16.91 2.31c.11.15 1.55 2.37 3.76 3.23 1.86.74 2.24.6 2.65.56.4-.04 1.29-.53 1.47-1.04.18-.5.18-.94.13-1.04-.06-.1-.22-.16-.55-.32Z" />
      </svg>
      <span
        className={`overflow-hidden whitespace-nowrap text-sm font-medium text-white transition-all duration-300 ${
          hovered ? "max-w-[140px] opacity-100" : "max-w-0 opacity-0"
        }`}
      >
        Chat on WhatsApp
      </span>
    </a>
  );
}