import React from 'react';
import { Smartphone } from 'lucide-react';

const AppDownloadSection = () => {
  return (
    <div className="bg-gradient-to-r from-purple-100 to-blue-100 py-12 px-4 sm:px-6 lg:px-8 my-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-purple-100 p-4 rounded-full">
              <Smartphone className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Download the Instagram Downloader app for Android
          </h3>
          
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Explore our app - Tool to help you download Instagram photos and videos easily. 
            Experience fast, convenient and HD quality!
          </p>
          
          <div className="flex justify-center">
            <a 
              href="#" 
              className="inline-block transition-transform hover:scale-105"
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                alt="Get it on Google Play" 
                className="h-14"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppDownloadSection;