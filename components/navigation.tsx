'use client';

import { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';

interface NavItem {
  label: string;
  info: string;
  icon?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const NAV_SECTIONS: Record<string, NavSection> = {
  design: {
    title: 'Design',
    items: [
      { label: 'Create QR Code', info: 'User different types ke QR Codes (URL, WhatsApp, Menu, Location etc.) easily create kar sakta hai.' },
      { label: 'Customize QR', info: 'User QR code ka color, shape, gradient aur logo change karke brand ke hisaab se design kar sakta hai.' },
      { label: 'Templates', info: 'Ready-made professional templates jo business cards, menus, events aur promotions ke liye use ho sakti hain.' },
      { label: 'Bulk QR Creation', info: 'Ek hi time me multiple QR Codes generate karne ka option using file upload, large businesses ke liye useful.' },
      { label: 'Download & Print', info: 'High-quality formats (PNG, JPG, SVG, PDF) me QR code download aur print karne ka option.' },
      { label: 'Saved Designs', info: 'Pehle banaye gaye saare QR Codes ko save, edit aur reuse kar sakte hain.' },
    ],
  },
  product: {
    title: 'Product',
    items: [
      { label: 'QR Code Types', info: 'Website, WhatsApp, Email, Menu, Location, Events, Social Media aur 10+ zyada types.' },
      { label: 'Dynamic QR Codes', info: 'QR print hone ke baad bhi content update kar sakte hain bina QR change kiye.' },
      { label: 'Scan Analytics', info: 'QR scans ka data jaise total scans, location aur device track kar sakte hain.' },
      { label: 'Smart Features', info: 'Password protection, expiry date, time-based aur location-based access jaise advanced features.' },
      { label: 'NFC + QR', info: 'NFC tap aur QR scan dono ko ek smart solution me combine karta hai.' },
    ],
  },
  plans: {
    title: 'Plans',
    items: [
      { label: 'Free Plan', info: 'Basic features ke saath free QR code generation personal use ke liye.' },
      { label: 'Starter Plan', info: 'Small businesses ke liye customization aur limited analytics ke saath.' },
      { label: 'Business Plan', info: 'Advanced features jaise dynamic QR, analytics, bulk creation aur branding.' },
      { label: 'Enterprise', info: 'Large organizations ke liye custom solutions, API access aur dedicated support.' },
      { label: 'Compare Plans', info: 'Sab plans ka comparison table taake best plan choose kiya ja sake.' },
      { label: 'Custom / White Label', info: 'Apne brand name, logo aur domain ke saath QR Code use karne ka option.' },
    ],
  },
  help: {
    title: 'Help',
    items: [
      { label: 'How It Works', info: 'Step-by-step guide jo batata hai ke QR Code kaise create aur use hota hai.' },
      { label: 'FAQs', info: 'Common questions ke quick answers.' },
      { label: 'Tutorials', info: 'Video aur written tutorials beginners aur advanced users ke liye.' },
      { label: 'User Guide', info: 'Detailed documentation covering saare features.' },
      { label: 'Contact Support', info: 'Email ya chat ke zariye support team se connect kar sakte hain.' },
      { label: 'Report an Issue', info: 'Bugs ya technical problems report karne ka option.' },
      { label: 'Terms & Privacy', info: 'Terms of service aur privacy policy details.' },
    ],
  },
};

export function Navigation() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<{ section: string; label: string; info: string } | null>(null);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              QR Code
            </h1>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-1">
            {Object.entries(NAV_SECTIONS).map(([key, section]) => (
              <div key={key} className="relative group">
                <button
                  onClick={() => setOpenDropdown(openDropdown === key ? null : key)}
                  className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 font-medium flex items-center gap-2 transition-colors"
                >
                  {section.title}
                  <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
                </button>

                {/* Dropdown Menu */}
                <div
                  className={`absolute left-0 mt-0 w-56 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transition-all opacity-0 invisible group-hover:opacity-100 group-hover:visible duration-200 ${
                    openDropdown === key ? 'opacity-100 visible' : ''
                  }`}
                >
                  {section.items.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedItem({ section: key, label: item.label, info: item.info });
                        setOpenDropdown(null);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-purple-50 border-b border-gray-100 last:border-b-0 transition-colors group/item"
                    >
                      <p className="font-medium text-gray-900 group-hover/item:text-purple-600">{item.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{item.info}</p>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Sign In Button */}
          <div className="hidden md:flex items-center gap-3">
            <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors">
              Sign In
            </button>
            <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg transition-shadow">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Info Panel */}
      {selectedItem && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-b border-purple-200 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto py-4 flex items-start justify-between gap-4">
            <div>
              <h3 className="font-bold text-gray-900 text-lg">{selectedItem.label}</h3>
              <p className="text-gray-700 text-sm mt-1 max-w-2xl">{selectedItem.info}</p>
            </div>
            <button
              onClick={() => setSelectedItem(null)}
              className="p-1 hover:bg-white rounded-lg transition-colors flex-shrink-0"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
