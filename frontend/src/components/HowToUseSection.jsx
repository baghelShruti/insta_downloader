import React from 'react';
import { Instagram, Copy, Download, Save, ArrowRight } from 'lucide-react';

const HowToUseSection = () => {
  const steps = [
    {
      number: 1,
      title: "Open Instagram",
      description: "Open Instagram using the app or browser and select the post you want to download.",
      icon: Instagram,
      color: "bg-pink-100 text-pink-600"
    },
    {
      number: 2,
      title: "Copy link",
      description: "Tap the three-dot icon (●●●) on the post, then select \"Copy link\".",
      icon: Copy,
      color: "bg-blue-100 text-blue-600"
    },
    {
      number: 3,
      title: "Go to ClipDown",
      description: "Open the https://clipdown.com/ website in the browser.",
      icon: ArrowRight,
      color: "bg-green-100 text-green-600"
    },
    {
      number: 4,
      title: "Paste link",
      description: "Paste the copied link into the input box at the top of the page and press the \"Download\" button.",
      icon: Download,
      color: "bg-purple-100 text-purple-600"
    },
    {
      number: 5,
      title: "Save to device",
      description: "Press the \"Download\" button below the photo or video to save to your device.",
      icon: Save,
      color: "bg-orange-100 text-orange-600"
    }
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            How to download Videos, Photos from Instagram: 5 steps (details)
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Follow these simple steps to download any content from Instagram quickly and easily.
          </p>
        </div>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-start space-x-6 group">
              {/* Step Number */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {step.number}
                </div>
              </div>

              {/* Step Content */}
              <div className="flex-1 bg-gray-50 rounded-lg p-6 group-hover:bg-gray-100 transition-colors">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${step.color} flex-shrink-0`}>
                    <step.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Arrow (except for last step) */}
              {index < steps.length - 1 && (
                <div className="flex-shrink-0 hidden md:block">
                  <ArrowRight className="h-6 w-6 text-gray-400 mt-8" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
            <h4 className="font-semibold text-blue-800 mb-2">Pro Tip</h4>
            <p className="text-blue-700">
              Make sure the Instagram post is public or you have permission to download it. 
              ClipDown respects copyright and privacy policies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToUseSection;