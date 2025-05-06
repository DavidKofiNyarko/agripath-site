import React from "react";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

const AgripathFooter = () => {
  return (
    <footer className="bg-primary border-t-4 border-green-950 text-gray-100 text-sm">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start w-full md:w-1/3 mb-6 md:mb-0">
            <div className="flex items-center gap-3">
              <div className="bg-primary shadow-lg rounded-lg  flex items-center gap-2 rounded-r-full">
              <img
                src="/logo.png"
                alt="AgriPath Logo"
                className="h-20 w-20"
              />
                <span className="text-xs">
                  Connecting investors with <br />
                  sustainable agriculture <br />
                  opportunities across Africa.
                </span>
              </div>
            </div>
          </div>
          {/* Quick Links */}
          <div className="flex flex-col md:w-1/5 mb-6 md:mb-0">
            <h4 className="text-green-200 font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-1">
              <li><a href="/about" className="hover:text-green-400 transition">Who We Are</a></li>
              <li><a href="/invest" className="hover:text-green-400 transition">Investment Opportunities</a></li>
              <li><a href="/how-it-works" className="hover:text-green-400 transition">How It Works</a></li>
              <li><a href="/faqs" className="hover:text-green-400 transition">FAQs</a></li>
              <li><a href="/contact" className="hover:text-green-400 transition">Contact</a></li>
            </ul>
          </div>
          {/* Legal Pages */}
          <div className="flex flex-col md:w-1/5 mb-6 md:mb-0">
            <h4 className="text-green-200 font-semibold mb-2">Legal Pages</h4>
            <ul className="space-y-1">
              <li><a href="/legal/terms-and-conditions" className="hover:text-green-400 transition">Terms & Conditions</a></li>
              <li><a href="/legal/terms-of-service" className="hover:text-green-400 transition">Terms of Service</a></li>
              <li><a href="/legal/privacy-policy" className="hover:text-green-400 transition">Privacy Policy</a></li>
              <li><a href="/legal/refund-policy" className="hover:text-green-400 transition">Refund Policy</a></li>
            </ul>
          </div>
          {/* Contact Info */}
          <div className="flex flex-col md:w-1/5 mb-6 md:mb-0">
            <h4 className="text-green-200 font-semibold mb-2">Contact Info</h4>
            <ul className="space-y-1">
              <li>
                <span className="inline-block w-5">✉️</span>
                <a href="mailto:info@agripath.co" className="hover:underline ml-1">info@agripath.co</a>
              </li>
              <li>
                <span className="inline-block w-5">✉️</span>
                <a href="mailto:invest@agripath.co" className="hover:underline ml-1">invest@agripath.co</a>
              </li>
              <li>
                <span className="inline-block w-5">📞</span>
                <a href="tel:+233598491339" className="hover:underline ml-1">+233 598 491 339</a>
              </li>
              <li>
                <span className="inline-block w-5">📞</span>
                <a href="tel:+233206662019" className="hover:underline ml-1">+233 206 662 019</a>
              </li>
              <li>
                <span className="inline-block w-5">📍</span>
                Akuse - Ghana
              </li>
            </ul>
          </div>
          {/* Social Media */}
          <div className="flex flex-col md:w-1/5">
            <h4 className="text-green-200 font-semibold mb-2">Follow Us</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Facebook size={18} /> <a href="#" className="hover:underline">Facebook</a>
              </li>
              <li className="flex items-center gap-2">
                <Instagram size={18} /> <a href="#" className="hover:underline">Instagram</a>
              </li>
              <li className="flex items-center gap-2">
                <Linkedin size={18} /> <a href="#" className="hover:underline">LinkedIn</a>
              </li>
              <li className="flex items-center gap-2">
                <Youtube size={18} /> <a href="#" className="hover:underline">Youtube</a>
              </li>
            </ul>
          </div>
        </div>
        {/* Divider Line */}
        <div className="border-t border-gray-600 my-6"></div>
        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-center md:text-left">
          <div>
            Copyright <span className="text-green-400 font-semibold">AgriPath</span> © 2025 All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AgripathFooter;
