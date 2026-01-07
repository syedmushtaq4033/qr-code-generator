import React, { useState, useEffect, useRef } from 'react';
import { Download, Link, MessageSquare, Mail, Phone, Copy, RefreshCw, Loader2 } from 'lucide-react';

const QRCodeGenerator = () => {
  const [qrType, setQrType] = useState('url');
  const [qrData, setQrData] = useState('');
  const [qrGenerated, setQrGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [qrLibLoaded, setQrLibLoaded] = useState(false);
  const canvasRef = useRef(null);

  const qrTypes = [
    { id: 'url', label: 'URL/Link', icon: Link, placeholder: 'https://example.com' },
    { id: 'text', label: 'Text', icon: MessageSquare, placeholder: 'Your text here' },
    { id: 'email', label: 'Email', icon: Mail, placeholder: 'email@example.com' },
    { id: 'phone', label: 'Phone', icon: Phone, placeholder: '+91 1234567890' },
    { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare, placeholder: '+91 1234567890' },
  ];

  // Load QRCode library
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
    script.async = true;
    script.onload = () => setQrLibLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const generateQRCode = () => {
    if (!qrData.trim() || !qrLibLoaded) return;
    
    setLoading(true);
    
    setTimeout(() => {
      let finalData = qrData;
      
      // Format data based on type
      if (qrType === 'email') {
        finalData = `mailto:${qrData}`;
      } else if (qrType === 'phone') {
        finalData = `tel:${qrData}`;
      } else if (qrType === 'whatsapp') {
        const cleanNumber = qrData.replace(/[^0-9]/g, '');
        finalData = `https://wa.me/${cleanNumber}`;
      }
      
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      // Clear previous QR code
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create a temporary container for QRCode library
      const tempDiv = document.createElement('div');
      tempDiv.style.display = 'none';
      document.body.appendChild(tempDiv);
      
      try {
        // Generate QR code using QRCode.js
        const qr = new window.QRCode(tempDiv, {
          text: finalData,
          width: 400,
          height: 400,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: window.QRCode.CorrectLevel.H
        });
        
        // Wait for QR code to render
        setTimeout(() => {
          const qrCanvas = tempDiv.querySelector('canvas');
          if (qrCanvas) {
            // Copy to our canvas with padding
            canvas.width = 440;
            canvas.height = 440;
            
            // White background
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw QR code centered with margin
            ctx.drawImage(qrCanvas, 20, 20, 400, 400);
            
            setQrGenerated(true);
          }
          
          // Cleanup
          document.body.removeChild(tempDiv);
          setLoading(false);
        }, 100);
        
      } catch (error) {
        console.error('QR generation error:', error);
        document.body.removeChild(tempDiv);
        setLoading(false);
      }
    }, 100);
  };

  const downloadQR = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = `qrcode-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const copyToClipboard = () => {
    if (!qrData) return;
    navigator.clipboard.writeText(qrData);
  };

  const resetQR = () => {
    setQrData('');
    setQrGenerated(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            QR Code Generator
          </h1>
          <p className="text-gray-600 mt-1">Create scannable QR codes instantly - Free & Fast</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Panel - Input */}
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select QR Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {qrTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setQrType(type.id)}
                      className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                        qrType === type.id
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{type.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Enter {qrTypes.find(t => t.id === qrType)?.label}
              </label>
              <div className="relative">
                <textarea
                  value={qrData}
                  onChange={(e) => setQrData(e.target.value)}
                  placeholder={qrTypes.find(t => t.id === qrType)?.placeholder}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none resize-none"
                  rows="4"
                />
                {qrData && (
                  <button
                    onClick={copyToClipboard}
                    className="absolute top-2 right-2 p-2 text-gray-400 hover:text-purple-600 transition-colors"
                    title="Copy to clipboard"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={generateQRCode}
                disabled={!qrData.trim() || loading || !qrLibLoaded}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : !qrLibLoaded ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Loading...
                  </>
                ) : (
                  'Generate QR Code'
                )}
              </button>
              {qrGenerated && !loading && (
                <button
                  onClick={resetQR}
                  className="px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
                  title="Reset"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Quick Examples */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-purple-900 mb-2">💡 Quick Examples:</p>
              <div className="space-y-1 text-xs text-purple-700">
                <p>• URL: https://google.com</p>
                <p>• WhatsApp: +919876543210</p>
                <p>• Email: hello@example.com</p>
              </div>
            </div>

            {/* Ad Space */}
            <div className="bg-gray-100 rounded-lg p-6 text-center border-2 border-dashed border-gray-300">
              <p className="text-gray-500 text-sm">Advertisement Space</p>
              <p className="text-gray-400 text-xs mt-1">300x250</p>
            </div>
          </div>

          {/* Right Panel - QR Display */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800">Your QR Code</h2>
              
              {qrGenerated ? (
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                      <canvas 
                        ref={canvasRef}
                        className="max-w-full h-auto"
                      />
                    </div>
                  </div>
                  
                  <button
                    onClick={downloadQR}
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 shadow-md"
                  >
                    <Download className="w-5 h-5" />
                    Download QR Code
                  </button>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-sm text-green-800">
                      ✅ <strong>QR Code Ready!</strong> Scan with your phone - 100% working!
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      <strong>💡 Tip:</strong> High error correction enabled - works even if partially damaged!
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 flex flex-col items-center justify-center h-96">
                  <canvas ref={canvasRef} className="hidden" />
                  <div className="w-40 h-40 border-4 border-dashed border-gray-300 rounded-xl flex items-center justify-center mb-6 bg-white">
                    <span className="text-6xl">📱</span>
                  </div>
                  <p className="text-gray-600 text-center text-lg font-medium mb-2">
                    {!qrLibLoaded ? 'Loading QR Generator...' : 'Ready to Generate!'}
                  </p>
                  <p className="text-gray-500 text-center text-sm">
                    Enter your data and click<br />
                    <strong className="text-purple-600">Generate QR Code</strong>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Why Use Our QR Generator?</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg hover:bg-purple-50 transition-colors">
              <div className="text-3xl mb-2">⚡</div>
              <h4 className="font-semibold text-gray-800">Instant</h4>
              <p className="text-sm text-gray-600">Generate in seconds</p>
            </div>
            <div className="text-center p-4 rounded-lg hover:bg-purple-50 transition-colors">
              <div className="text-3xl mb-2">🆓</div>
              <h4 className="font-semibold text-gray-800">100% Free</h4>
              <p className="text-sm text-gray-600">No limits or charges</p>
            </div>
            <div className="text-center p-4 rounded-lg hover:bg-purple-50 transition-colors">
              <div className="text-3xl mb-2">📱</div>
              <h4 className="font-semibold text-gray-800">Scannable</h4>
              <p className="text-sm text-gray-600">Works on all devices</p>
            </div>
            <div className="text-center p-4 rounded-lg hover:bg-purple-50 transition-colors">
              <div className="text-3xl mb-2">🔒</div>
              <h4 className="font-semibold text-gray-800">Secure</h4>
              <p className="text-sm text-gray-600">No data stored</p>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Popular Use Cases</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">🏪 Business</h4>
              <p className="text-sm text-gray-600">Menu cards, payment links, contact info</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">🎉 Events</h4>
              <p className="text-sm text-gray-600">Invitations, tickets, registration forms</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-green-50 to-yellow-50 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">📱 Social</h4>
              <p className="text-sm text-gray-600">WhatsApp, Instagram, website links</p>
            </div>
          </div>
        </div>

        {/* Bottom Ad Space */}
        <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
          <div className="bg-gray-100 rounded-lg p-8 text-center border-2 border-dashed border-gray-300">
            <p className="text-gray-500">Advertisement Space - Leaderboard</p>
            <p className="text-gray-400 text-xs mt-1">728x90</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;