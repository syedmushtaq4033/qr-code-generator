'use client';

import { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode';
import { Download, ArrowRight, Grid2x2, Palette, ChevronRight } from 'lucide-react';
import { Navigation } from '@/components/navigation';

interface QRTypeOption {
  id: string;
  label: string;
  category: string;
  icon: string;
  description: string;
}

const QR_TYPES: QRTypeOption[] = [
  // Basic
  { id: 'website', label: 'Website / URL', category: 'Basic', icon: '🌐', description: 'Share any website link' },
  { id: 'whatsapp', label: 'WhatsApp Chat', category: 'Basic', icon: '💬', description: 'Direct message on WhatsApp' },
  { id: 'email', label: 'Email', category: 'Basic', icon: '✉️', description: 'Send email with subject' },
  { id: 'phone', label: 'Phone Call', category: 'Basic', icon: '☎️', description: 'One-tap phone call' },
  
  // Business & Professional
  { id: 'vcard', label: 'Digital Business Card', category: 'Business', icon: '💼', description: 'vCard with all details' },
  { id: 'payment', label: 'Payment Links', category: 'Business', icon: '💳', description: 'UPI, PayPal, Stripe' },
  { id: 'review', label: 'Google Review', category: 'Business', icon: '⭐', description: 'Get customer reviews' },
  { id: 'appointment', label: 'Appointment Booking', category: 'Business', icon: '📅', description: 'Calendly, Google Calendar' },
  
  // Social Media & Entertainment
  { id: 'social', label: 'Social Media', category: 'Social', icon: '📱', description: 'All social platforms' },
  { id: 'youtube', label: 'YouTube Channel', category: 'Social', icon: '🎥', description: 'Link to YouTube channel' },
  { id: 'spotify', label: 'Spotify Playlist', category: 'Social', icon: '🎵', description: 'Music playlist link' },
  
  // Restaurant & Retail
  { id: 'menu', label: 'Restaurant Menu', category: 'Retail', icon: '🍽️', description: 'Café/hotel/restaurant menu' },
  { id: 'discount', label: 'Discount / Coupon', category: 'Retail', icon: '🎟️', description: 'Share promo codes' },
  { id: 'loyalty', label: 'Loyalty Program', category: 'Retail', icon: '🏆', description: 'Rewards & points' },
  
  // Location & Travel
  { id: 'location', label: 'Location (Google Maps)', category: 'Travel', icon: '📍', description: 'Address or coordinates' },
  { id: 'wifi', label: 'WiFi Access', category: 'Travel', icon: '📡', description: 'WiFi SSID + password' },
  
  // Events
  { id: 'event', label: 'Event Details', category: 'Events', icon: '🎪', description: 'Date, time, location' },
  { id: 'rsvp', label: 'RSVP / Attendance', category: 'Events', icon: '✅', description: 'Event confirmation' },
  
  // Apps
  { id: 'app', label: 'App Download', category: 'Apps', icon: '📲', description: 'App Store / Play Store' },
];

export default function QRGenerator() {
  const [page, setPage] = useState<'landing' | 'typeSelection' | 'editor'>('landing');
  const [selectedType, setSelectedType] = useState<string>('');
  
  // Form states for different types
  const [formData, setFormData] = useState<Record<string, string>>({});
  
  // Customization states
  const [codeColor, setCodeColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [qrCodeName, setQrCodeName] = useState('Untitled QR code');

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrValue, setQrValue] = useState('');

  // Build QR value based on type and form data
  useEffect(() => {
    let value = '';

    switch (selectedType) {
      case 'website':
        value = formData.url || '';
        break;
      case 'whatsapp':
        if (formData.whatsappPhone) {
          const message = encodeURIComponent(formData.whatsappMessage || '');
          value = `https://wa.me/${formData.whatsappPhone}?text=${message}`;
        }
        break;
      case 'email':
        if (formData.emailAddress) {
          const subject = encodeURIComponent(formData.emailSubject || '');
          const body = encodeURIComponent(formData.emailBody || '');
          value = `mailto:${formData.emailAddress}?subject=${subject}&body=${body}`;
        }
        break;
      case 'phone':
        value = formData.phoneNumber ? `tel:${formData.phoneNumber}` : '';
        break;
      case 'vcard':
        const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${formData.vcardName || ''}
TEL:${formData.vcardPhone || ''}
EMAIL:${formData.vcardEmail || ''}
ORG:${formData.vcardCompany || ''}
END:VCARD`;
        value = vcard;
        break;
      case 'location':
        if (formData.latitude && formData.longitude) {
          value = `https://maps.google.com/?q=${formData.latitude},${formData.longitude}`;
        } else if (formData.address) {
          value = `https://maps.google.com/?q=${encodeURIComponent(formData.address)}`;
        }
        break;
      case 'event':
        if (formData.eventDate) {
          const date = formData.eventDate.replace(/-/g, '');
          const time = (formData.eventTime || '000000').replace(/:/g, '');
          const summary = encodeURIComponent(formData.eventName || 'Event');
          const location = encodeURIComponent(formData.eventLocation || '');
          value = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${date}T${time}00Z
SUMMARY:${formData.eventName || 'Event'}
LOCATION:${formData.eventLocation || ''}
END:VEVENT
END:VCALENDAR`;
        }
        break;
      case 'youtube':
        value = formData.youtubeUrl || '';
        break;
      case 'social':
        if (formData.socialPlatform && formData.socialHandle) {
          const platforms: Record<string, string> = {
            instagram: 'https://instagram.com/',
            facebook: 'https://facebook.com/',
            linkedin: 'https://linkedin.com/in/',
            twitter: 'https://twitter.com/',
            telegram: 'https://t.me/',
            snapchat: 'https://snapchat.com/add/',
            threads: 'https://threads.net/@',
          };
          value = `${platforms[formData.socialPlatform] || ''}${formData.socialHandle}`;
        }
        break;
      case 'wifi':
        if (formData.wifiSSID) {
          const security = formData.wifiSecurity || 'WPA';
          value = `WIFI:T:${security};S:${formData.wifiSSID};P:${formData.wifiPassword || ''};H:${formData.wifiHidden === 'true' ? 'true' : 'false'};;`;
        }
        break;
      case 'menu':
        value = formData.menuUrl || '';
        break;
      case 'discount':
        const coupon = `DISCOUNT: ${formData.discountCode || ''}`;
        value = formData.discountUrl || coupon;
        break;
      case 'app':
        value = formData.appUrl || '';
        break;
      case 'payment':
        value = formData.paymentLink || '';
        break;
      case 'review':
        value = formData.reviewLink || '';
        break;
      case 'appointment':
        value = formData.appointmentUrl || '';
        break;
      case 'spotify':
        value = formData.spotifyUrl || '';
        break;
      case 'loyalty':
        value = formData.loyaltyUrl || '';
        break;
      case 'rsvp':
        value = formData.rsvpUrl || '';
        break;
    }

    setQrValue(value);
  }, [selectedType, formData]);

  // Generate QR code
  useEffect(() => {
    if (!qrValue || !canvasRef.current) return;

    const generateQR = async () => {
      try {
        const canvas = canvasRef.current;
        if (canvas) {
          await QRCode.toCanvas(canvas, qrValue, {
            errorCorrectionLevel: 'H',
            type: 'image/png',
            width: 300,
            margin: 2,
            color: {
              dark: codeColor,
              light: bgColor,
            },
          });
        }
      } catch (err) {
        console.error('Error generating QR code:', err);
      }
    };

    generateQR();
  }, [qrValue, codeColor, bgColor]);

  const downloadQR = () => {
    const canvas = canvasRef.current;
    if (!canvas || !qrValue) return;

    const link = document.createElement('a');
    link.download = `${qrCodeName || 'qrcode'}-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const resetForm = () => {
    setFormData({});
    setCodeColor('#000000');
    setBgColor('#FFFFFF');
    setQrCodeName('Untitled QR code');
    setSelectedType('');
    setPage('landing');
  };

  const updateFormData = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const renderFormInputs = () => {
    const typeData = QR_TYPES.find(t => t.id === selectedType);
    if (!typeData) return null;

    const commonInputs = (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">QR code name (optional)</label>
          <input
            type="text"
            value={qrCodeName}
            onChange={(e) => setQrCodeName(e.target.value)}
            placeholder="Untitled QR code"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
          />
        </div>
      </div>
    );

    switch (selectedType) {
      case 'website':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Website URL *</label>
              <input
                type="url"
                value={formData.url || ''}
                onChange={(e) => updateFormData('url', e.target.value)}
                placeholder="https://example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            {commonInputs}
          </div>
        );
      
      case 'whatsapp':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number * (with country code)</label>
              <input
                type="text"
                value={formData.whatsappPhone || ''}
                onChange={(e) => updateFormData('whatsappPhone', e.target.value)}
                placeholder="+1234567890"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message (optional)</label>
              <textarea
                value={formData.whatsappMessage || ''}
                onChange={(e) => updateFormData('whatsappMessage', e.target.value)}
                placeholder="Pre-fill message..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                rows={3}
              />
            </div>
            {commonInputs}
          </div>
        );
      
      case 'email':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
              <input
                type="email"
                value={formData.emailAddress || ''}
                onChange={(e) => updateFormData('emailAddress', e.target.value)}
                placeholder="name@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject (optional)</label>
              <input
                type="text"
                value={formData.emailSubject || ''}
                onChange={(e) => updateFormData('emailSubject', e.target.value)}
                placeholder="Email subject..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message (optional)</label>
              <textarea
                value={formData.emailBody || ''}
                onChange={(e) => updateFormData('emailBody', e.target.value)}
                placeholder="Email body..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                rows={3}
              />
            </div>
            {commonInputs}
          </div>
        );
      
      case 'phone':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
              <input
                type="tel"
                value={formData.phoneNumber || ''}
                onChange={(e) => updateFormData('phoneNumber', e.target.value)}
                placeholder="+1234567890"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            {commonInputs}
          </div>
        );
      
      case 'vcard':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                value={formData.vcardName || ''}
                onChange={(e) => updateFormData('vcardName', e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                value={formData.vcardPhone || ''}
                onChange={(e) => updateFormData('vcardPhone', e.target.value)}
                placeholder="+1234567890"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={formData.vcardEmail || ''}
                onChange={(e) => updateFormData('vcardEmail', e.target.value)}
                placeholder="email@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
              <input
                type="text"
                value={formData.vcardCompany || ''}
                onChange={(e) => updateFormData('vcardCompany', e.target.value)}
                placeholder="Your Company"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            {commonInputs}
          </div>
        );
      
      case 'location':
        return (
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 rounded-lg text-sm text-blue-700">
              Enter either address or GPS coordinates
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <input
                type="text"
                value={formData.address || ''}
                onChange={(e) => updateFormData('address', e.target.value)}
                placeholder="123 Main St, City, State"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="text-sm text-gray-500 text-center">OR</div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Latitude</label>
                <input
                  type="text"
                  value={formData.latitude || ''}
                  onChange={(e) => updateFormData('latitude', e.target.value)}
                  placeholder="40.7128"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Longitude</label>
                <input
                  type="text"
                  value={formData.longitude || ''}
                  onChange={(e) => updateFormData('longitude', e.target.value)}
                  placeholder="-74.0060"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
            {commonInputs}
          </div>
        );
      
      case 'event':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Event Name *</label>
              <input
                type="text"
                value={formData.eventName || ''}
                onChange={(e) => updateFormData('eventName', e.target.value)}
                placeholder="Conference 2024"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
              <input
                type="date"
                value={formData.eventDate || ''}
                onChange={(e) => updateFormData('eventDate', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
              <input
                type="time"
                value={formData.eventTime || ''}
                onChange={(e) => updateFormData('eventTime', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={formData.eventLocation || ''}
                onChange={(e) => updateFormData('eventLocation', e.target.value)}
                placeholder="Address or venue name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            {commonInputs}
          </div>
        );
      
      case 'wifi':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Network Name (SSID) *</label>
              <input
                type="text"
                value={formData.wifiSSID || ''}
                onChange={(e) => updateFormData('wifiSSID', e.target.value)}
                placeholder="MyWiFi"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="text"
                value={formData.wifiPassword || ''}
                onChange={(e) => updateFormData('wifiPassword', e.target.value)}
                placeholder="WiFi password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Security</label>
              <select
                value={formData.wifiSecurity || 'WPA'}
                onChange={(e) => updateFormData('wifiSecurity', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              >
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">No Password</option>
              </select>
            </div>
            {commonInputs}
          </div>
        );
      
      case 'social':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Platform *</label>
              <select
                value={formData.socialPlatform || ''}
                onChange={(e) => updateFormData('socialPlatform', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              >
                <option value="">Select platform</option>
                <option value="instagram">Instagram</option>
                <option value="facebook">Facebook</option>
                <option value="linkedin">LinkedIn</option>
                <option value="twitter">Twitter / X</option>
                <option value="telegram">Telegram</option>
                <option value="snapchat">Snapchat</option>
                <option value="threads">Threads</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username / Handle *</label>
              <input
                type="text"
                value={formData.socialHandle || ''}
                onChange={(e) => updateFormData('socialHandle', e.target.value)}
                placeholder="username"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            {commonInputs}
          </div>
        );
      
      case 'youtube':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">YouTube URL *</label>
              <input
                type="url"
                value={formData.youtubeUrl || ''}
                onChange={(e) => updateFormData('youtubeUrl', e.target.value)}
                placeholder="https://youtube.com/@channelname"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            {commonInputs}
          </div>
        );
      
      case 'menu':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Menu URL or Link *</label>
              <input
                type="url"
                value={formData.menuUrl || ''}
                onChange={(e) => updateFormData('menuUrl', e.target.value)}
                placeholder="https://example.com/menu"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            {commonInputs}
          </div>
        );
      
      case 'discount':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Coupon Code *</label>
              <input
                type="text"
                value={formData.discountCode || ''}
                onChange={(e) => updateFormData('discountCode', e.target.value)}
                placeholder="SAVE50"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Discount URL (optional)</label>
              <input
                type="url"
                value={formData.discountUrl || ''}
                onChange={(e) => updateFormData('discountUrl', e.target.value)}
                placeholder="https://shop.com/offer"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            {commonInputs}
          </div>
        );
      
      case 'app':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">App Store URL *</label>
              <input
                type="url"
                value={formData.appUrl || ''}
                onChange={(e) => updateFormData('appUrl', e.target.value)}
                placeholder="https://apps.apple.com/... or https://play.google.com/..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            {commonInputs}
          </div>
        );
      
      case 'payment':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Link *</label>
              <input
                type="url"
                value={formData.paymentLink || ''}
                onChange={(e) => updateFormData('paymentLink', e.target.value)}
                placeholder="UPI/PayPal/Stripe link"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            {commonInputs}
          </div>
        );
      
      case 'review':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Google Review Link *</label>
              <input
                type="url"
                value={formData.reviewLink || ''}
                onChange={(e) => updateFormData('reviewLink', e.target.value)}
                placeholder="https://g.page/..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            {commonInputs}
          </div>
        );
      
      case 'appointment':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Booking URL *</label>
              <input
                type="url"
                value={formData.appointmentUrl || ''}
                onChange={(e) => updateFormData('appointmentUrl', e.target.value)}
                placeholder="https://calendly.com/... or Google Calendar link"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            {commonInputs}
          </div>
        );
      
      case 'spotify':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Spotify Playlist URL *</label>
              <input
                type="url"
                value={formData.spotifyUrl || ''}
                onChange={(e) => updateFormData('spotifyUrl', e.target.value)}
                placeholder="https://open.spotify.com/playlist/..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            {commonInputs}
          </div>
        );
      
      case 'loyalty':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Loyalty Program URL *</label>
              <input
                type="url"
                value={formData.loyaltyUrl || ''}
                onChange={(e) => updateFormData('loyaltyUrl', e.target.value)}
                placeholder="https://rewards.example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            {commonInputs}
          </div>
        );
      
      case 'rsvp':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">RSVP Form URL *</label>
              <input
                type="url"
                value={formData.rsvpUrl || ''}
                onChange={(e) => updateFormData('rsvpUrl', e.target.value)}
                placeholder="https://forms.google.com/..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            {commonInputs}
          </div>
        );
      
      default:
        return commonInputs;
    }
  };

  // Landing Page
  if (page === 'landing') {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />

        <main className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Free Unlimited Dynamic QR Code Generator
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Create dynamic QR codes for free and update them anytime without changing the design. Get a simple, fast, and secure way to generate QR codes that work everywhere—from marketing materials to menus, product packaging, online ads and more.
              </p>
              
              <button
                onClick={() => setPage('typeSelection')}
                className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-shadow flex items-center gap-2"
              >
                Generate QR code
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-12 flex items-center justify-center min-h-96">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl blur-xl opacity-50" />
                <div className="relative bg-white rounded-xl p-6 shadow-2xl">
                  <div className="grid grid-cols-2 gap-4">
                    {[0, 1, 2, 3].map((i) => (
                      <div key={i} className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">QR</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mt-24 pt-16 border-t">
            <div className="text-center">
              <div className="text-4xl mb-3">📝</div>
              <p className="font-semibold text-gray-900">Easy customization</p>
              <p className="text-sm text-gray-600 mt-2">Colors, patterns, corners & logos</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🔄</div>
              <p className="font-semibold text-gray-900">Update Anytime</p>
              <p className="text-sm text-gray-600 mt-2">Change links without reprinting</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">📊</div>
              <p className="font-semibold text-gray-900">Track Analytics</p>
              <p className="text-sm text-gray-600 mt-2">See scans and performance data</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🎨</div>
              <p className="font-semibold text-gray-900">Brand Matching</p>
              <p className="text-sm text-gray-600 mt-2">Match your colors and logo</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Type Selection Page
  if (page === 'typeSelection') {
    const categories = Array.from(new Set(QR_TYPES.map(t => t.category)));
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => setPage('landing')}
              className="text-gray-600 hover:text-gray-900 font-medium flex items-center gap-1"
            >
              ← Back
            </button>
            <h2 className="text-2xl font-bold text-gray-900">Select QR Code Type</h2>
            <div className="w-32" />
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-12">
          {categories.map((category) => (
            <div key={category} className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{category}</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {QR_TYPES.filter(t => t.category === category).map((type) => (
                  <button
                    key={type.id}
                    onClick={() => {
                      setSelectedType(type.id);
                      setPage('editor');
                    }}
                    className="bg-white border-2 border-gray-200 hover:border-purple-500 rounded-lg p-6 text-left transition-all hover:shadow-lg hover:bg-purple-50"
                  >
                    <div className="text-3xl mb-3">{type.icon}</div>
                    <h4 className="font-semibold text-gray-900 mb-1">{type.label}</h4>
                    <p className="text-sm text-gray-600">{type.description}</p>
                    <ChevronRight className="w-4 h-4 text-purple-500 mt-3" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </main>
      </div>
    );
  }

  // Editor Page
  const typeData = QR_TYPES.find(t => t.id === selectedType);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setPage('typeSelection')}
            className="text-gray-600 hover:text-gray-900 font-medium flex items-center gap-1"
          >
            ← Back
          </button>
          <h2 className="text-2xl font-bold text-gray-900">Create a dynamic QR code</h2>
          <button
            onClick={downloadQR}
            disabled={!qrValue}
            className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Grid2x2 className="w-5 h-5 text-gray-700" />
                  <h3 className="font-semibold text-gray-900">
                    {typeData?.label}
                  </h3>
                </div>
                {renderFormInputs()}
              </div>

              {/* Customize */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Palette className="w-5 h-5 text-gray-700" />
                  <h3 className="font-semibold text-gray-900">Customise how it looks</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-3">Code colour</label>
                    <div className="flex gap-2 flex-wrap mb-3">
                      {['#000000', '#EF4444', '#F97316', '#22C55E', '#3B82F6', '#8B5CF6', '#EC4899'].map((color) => (
                        <button
                          key={color}
                          onClick={() => setCodeColor(color)}
                          className={`w-10 h-10 rounded-lg border-2 transition-all ${
                            codeColor === color ? 'border-gray-800 ring-2 ring-offset-2 ring-gray-800' : 'border-gray-200 hover:border-gray-400'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <input
                      type="color"
                      value={codeColor}
                      onChange={(e) => setCodeColor(e.target.value)}
                      className="w-full h-10 rounded-lg cursor-pointer border border-gray-300"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-3">Background colour</label>
                    <div className="flex gap-2 flex-wrap mb-3">
                      {['#FFFFFF', '#EF4444', '#F97316', '#22C55E', '#3B82F6', '#8B5CF6', '#EC4899'].map((color) => (
                        <button
                          key={color}
                          onClick={() => setBgColor(color)}
                          className={`w-10 h-10 rounded-lg border-2 transition-all ${
                            bgColor === color ? 'border-gray-800 ring-2 ring-offset-2 ring-gray-800' : 'border-gray-200 hover:border-gray-400'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-full h-10 rounded-lg cursor-pointer border border-gray-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-12 shadow-sm sticky top-20">
              <div className="flex flex-col items-center justify-center gap-8">
                <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-xl p-12 w-full flex items-center justify-center">
                  {qrValue ? (
                    <div className="bg-white rounded-lg p-6 shadow-lg">
                      <canvas
                        ref={canvasRef}
                        className="w-64 h-64"
                      />
                    </div>
                  ) : (
                    <div className="bg-white rounded-lg p-12 shadow-lg text-center">
                      <div className="w-40 h-40 bg-gray-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                        <div className="text-gray-400 text-center">
                          <Grid2x2 className="w-12 h-12 mx-auto mb-2" />
                          <p className="text-sm">Fill in the form to see preview</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="w-full space-y-3">
                  <button
                    onClick={downloadQR}
                    disabled={!qrValue}
                    className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition"
                  >
                    <Download className="w-5 h-5" />
                    Download QR Code
                  </button>
                  <button
                    onClick={resetForm}
                    className="w-full bg-gray-200 text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                  >
                    Create New QR
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
