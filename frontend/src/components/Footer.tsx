import { useState } from "react";

export default function Footer() {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showReturn, setShowReturn] = useState(false);

  return (
    <footer className="bg-primary-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">🍬 Premium Sweet Shop</h3>
            <p className="text-gray-400 text-sm">
              Your trusted destination for premium sweets and chocolates. 
              Fresh, authentic, and made with love.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => setShowPrivacy(!showPrivacy)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setShowReturn(!showReturn)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Return Policy
                </button>
              </li>
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  Shop
                </a>
              </li>
              <li>
                <a href="/history" className="hover:text-white transition-colors">
                  Order History
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-400">Email: nahariamanik@gmail.com</li>
              <li className="text-gray-400">Phone: +91 9041037067</li>
              <li className="text-gray-400">Hours: Mon-Sat 9AM-8PM</li>
            </ul>
          </div>
        </div>

        {/* Policies Modal */}
        {showPrivacy && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-primary-900">Privacy Policy</h2>
                <button
                  onClick={() => setShowPrivacy(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="text-gray-700 space-y-4 text-sm">
                <p><strong>Last Updated:</strong> December 2024</p>
                <p>
                  At Premium Sweet Shop, we are committed to protecting your privacy. 
                  This Privacy Policy explains how we collect, use, and safeguard your information.
                </p>
                <div>
                  <h3 className="font-semibold mb-2">Information We Collect</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Name and contact information</li>
                    <li>Order history and preferences</li>
                    <li>Payment information (processed securely)</li>
                    <li>Website usage data</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">How We Use Your Information</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Process and fulfill your orders</li>
                    <li>Improve our services and user experience</li>
                    <li>Send order confirmations and updates</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Data Security</h3>
                  <p>
                    We implement industry-standard security measures to protect your personal information. 
                    All data is encrypted and stored securely.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Your Rights</h3>
                  <p>
                    You have the right to access, update, or delete your personal information at any time. 
                    Contact us for assistance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {showReturn && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-primary-900">Return & Refund Policy</h2>
                <button
                  onClick={() => setShowReturn(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="text-gray-700 space-y-4 text-sm">
                <p><strong>Last Updated:</strong> December 2024</p>
                <div>
                  <h3 className="font-semibold mb-2">Return Policy</h3>
                  <p>
                    We want you to be completely satisfied with your purchase. If you're not happy, 
                    we're here to help.
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Returns accepted within 7 days of delivery</li>
                    <li>Items must be unopened and in original packaging</li>
                    <li>Perishable items cannot be returned for safety reasons</li>
                    <li>Contact us within 48 hours of delivery for damaged items</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Refund Process</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Refunds processed within 5-7 business days</li>
                    <li>Original payment method will be credited</li>
                    <li>Shipping costs are non-refundable unless item is defective</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Exchanges</h3>
                  <p>
                    We offer exchanges for items of equal or greater value. 
                    Contact our customer service team to initiate an exchange.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Contact</h3>
                  <p>
                    For returns, refunds, or exchanges, please contact us at 
                    nahariamanik@gmail.com or call +91 9041037067.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Copyright */}
        <div className="border-t border-primary-800 pt-8 text-center text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} Premium Sweet Shop. All rights reserved.
          </p>
          <p className="mt-2">
            Made with ❤️ for sweet lovers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}

