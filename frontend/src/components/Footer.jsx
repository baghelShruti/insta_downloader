import React from 'react';
import { Shield, Lock, FileText, Mail, Twitter, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">ClipDown</h3>
            <p className="text-gray-300 mb-6 max-w-md">
              The best Instagram downloader tool available today. Download videos, photos, reels, 
              stories, highlights, and profile pictures from Instagram easily and for free.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Instagram Video Downloader
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Instagram Photo Downloader
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Instagram Reels Downloader
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Instagram Stories Downloader
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  InstaDP - Profile Picture
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  How to Use
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Bug Report
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Privacy & Copyright Section */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Copyright & Privacy */}
            <div>
              <h4 className="text-lg font-semibold mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-green-400" />
                Copyright and Privacy
              </h4>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-start space-x-3">
                  <Lock className="h-4 w-4 mt-0.5 text-blue-400 flex-shrink-0" />
                  <div>
                    <h5 className="font-medium text-white mb-1">Does not collect or store user data</h5>
                    <p>We promise not to collect any personal information or data from users. The tool does not require logging in or providing personal information.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="h-4 w-4 mt-0.5 text-green-400 flex-shrink-0" />
                  <div>
                    <h5 className="font-medium text-white mb-1">Data is encrypted in transit</h5>
                    <p>All transferred data is encrypted via HTTPS protocol, ensuring information is not stolen or interfered with by third parties.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div>
              <h4 className="text-lg font-semibold mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-yellow-400" />
                Important Notice
              </h4>
              <div className="text-sm text-gray-300 space-y-3">
                <p>
                  <strong className="text-white">ClipDown is an independent website</strong>, developed by the ClipDown team. 
                  WE DO NOT HAVE ANY AFFILIATION WITH INSTAGRAM OR META.
                </p>
                <p>
                  ClipDown only supports downloading public content on Instagram. For private content, 
                  users must have legal permission from the account holder.
                </p>
                <p>
                  This tool was developed to support and enhance user experience. We do not encourage 
                  and are not responsible for any behavior that violates Instagram's regulations or related laws.
                </p>
              </div>
            </div>
          </div>

          {/* Disclaimer Box */}
          <div className="mt-8 bg-gray-800 border border-gray-700 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <FileText className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="text-gray-300">
                  <strong className="text-white">Important:</strong> This tool was developed to help you easily download videos or images posted by yourself. 
                  We reserve the right to refuse to provide service if you use this tool to violate copyright or violate the privacy rights of others.
                </p>
                <p className="mt-2">
                  <a href="#" className="text-blue-400 hover:text-blue-300 underline">
                    Read our Terms of Service 👉here👈
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 ClipDown. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-2 sm:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;