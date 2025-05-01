import React from "react";
import { Facebook, Instagram, Linkedin, Youtube, Twitter } from "lucide-react";

const AgripathFooter = () => {
  return (
    <footer className="bg-green-900 text-white px-4 sm:px-6 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
        {/* Top Section: Logo and Contact Info */}
        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-8 items-center md:items-start">
          {/* Logo */}
          <div className="flex justify-center md:justify-start">
            <img
              src="/footer-logo.png"
              alt="AgriPath Logo"
              className="h-12 sm:h-16 w-auto"
            />
          </div>

          {/* Contact Information */}
          <div className="space-y-3 sm:space-y-4 text-sm flex flex-col md:flex-row gap-4 text-center md:text-left">
            <h4 className="font-semibold text-base sm:text-lg">Contact Us</h4>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2">
              <span className="text-red-500">📍</span>
              <div>
                <div>Location: Akuse - Ghana (Farm)</div>
                <div>Tantra Hills - Accra (Office)</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2">
              <span>📧</span>
              <div>
                <div>Email: info@agripath.co (General Enquiry)</div>
                <div>invest@agripath.co (Investment Enquiry)</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2">
              <span>📞</span>
              <div>
                <div>Phone: +233 535 670 002</div>
                <div>+233 535 670 002</div>
              </div>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center md:justify-end gap-4 sm:gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-300">
              <Facebook size={20} className="sm:w-6 sm:h-6" />
            </a>
            <a href="#" className="hover:text-gray-300">
              <Instagram size={20} className="sm:w-6 sm:h-6" />
            </a>
            <a href="#" className="hover:text-gray-300">
              <Twitter size={20} className="sm:w-6 sm:h-6" />
            </a>
            <a href="#" className="hover:text-gray-300">
              <Linkedin size={20} className="sm:w-6 sm:h-6" />
            </a>
            <a href="#" className="hover:text-gray-300">
              <Youtube size={20} className="sm:w-6 sm:h-6" />
            </a>
          </div>
        </div>

        {/* Divider Line */}
        <div className="border-t border-gray-600"></div>

        {/* Bottom Section: Copyright and Policies */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-center md:text-left">
          <div>© 2025 AgriPath. All Rights Reserved.</div>
          <div className="flex flex-wrap justify-center md:justify-end gap-2 sm:gap-4 mt-4 md:mt-0">
            <a href="/legal/refund-policy" className="hover:underline">
              Refund Policy
            </a>
            <a href="/legal/privacy-policy" className="hover:underline">
              Privacy Policy
            </a>
            <a href="/legal/terms-of-service" className="hover:underline">
              Terms of Service
            </a>
            <a href="/legal/terms-and-conditions" className="hover:underline">
              Terms & Conditions
            </a>
            <a href="/legal/data-protection-policy" className="hover:underline">
              Data Protection Policy
            </a>
            <a href="/legal/cookie-settings" className="hover:underline">
              Cookie Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AgripathFooter;
