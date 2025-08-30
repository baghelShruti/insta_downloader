import React from 'react';
import { Download, Shield, Smartphone, Image, Video, Camera, Star } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Video,
      title: "Video and Photo",
      description: "Save and download photos and videos in the best quality."
    },
    {
      icon: Camera,
      title: "Reels",
      description: "Easily download unique short videos from Instagram Reels."
    },
    {
      icon: Star,
      title: "Story and Highlights",
      description: "Download stories or highlights with one click."
    },
    {
      icon: Image,
      title: "Insta DP",
      description: "View and download profile photos in HD quality for free."
    },
    {
      icon: Shield,
      title: "Private accounts",
      description: "Supports downloading content from private accounts or restricted posts."
    }
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            ClipDown - Best Instagram Video & Photo Downloader
          </h2>
          <div className="max-w-4xl mx-auto text-gray-600 space-y-4">
            <p>
              <strong>ClipDown</strong> (also known as IG Downloader) is the best Instagram downloader tool available today. 
              It allows users to easily download videos, photos, reels, stories, highlights, and Insta DP from Instagram 
              to their phone or computer. All downloaded content is guaranteed to retain the highest quality. Additionally, 
              you can choose the desired quality and size before saving it to your device.
            </p>
            <p>
              ClipDown.com uses PWA (Progressive Web App) technology, which helps operate smoothly on all devices, 
              from phones to computers. This tool stands out for its stability, fast loading speed, and high content quality. 
              Try today to download videos, photos, reels, stories and all content from Instagram easily, quickly and completely free!
            </p>
          </div>
        </div>

        {/* Feature Image */}
        <div className="text-center mb-16">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
            <div className="max-w-md mx-auto">
              <Download className="h-16 w-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Online Instagram Downloader</h3>
              <p className="text-blue-100">
                With just one tap, this tool will help you download your favorite photos and videos from Instagram 
                easily in the highest quality, up to 4K.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose ClipDown */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Why should you use ClipDown - Instagram Downloader?
          </h3>
          
          {/* Feature 1: Content Types */}
          <div className="mb-12">
            <h4 className="text-xl font-semibold text-gray-800 mb-6">
              1. Supports downloading all types of Instagram content
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                      <feature.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">{feature.title}</h5>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feature 2: Compatibility */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 mb-8">
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Smartphone className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">
                  2. Compatible with all devices and browsers
                </h4>
                <p className="text-gray-600">
                  ClipDown's Instagram downloader works smoothly on all popular browsers like Chrome, Firefox, Safari and Edge. 
                  Whether you use a PC, tablet, or iPhone or Android phone, ClipDown supports it and works well.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 3: Security */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-start space-x-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">
                  3. Absolute security and privacy
                </h4>
                <p className="text-gray-600">
                  ClipDown is committed to protecting user data. We do not collect user information nor do we save content 
                  that users have downloaded. Your privacy always comes first.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;