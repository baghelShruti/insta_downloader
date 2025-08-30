import React from 'react';
import { Camera, TrendingUp, BookOpen, Users, BarChart3, Database } from 'lucide-react';

const UseCasesSection = () => {
  const useCases = [
    {
      title: "Content Creator on Instagram",
      icon: Camera,
      color: "bg-pink-100 text-pink-600 border-pink-200",
      points: [
        {
          title: "Store and back up images and videos",
          description: "If you regularly post to Instagram (Reels, Stories or regular posts), saving all your content will help you have a safely stored content warehouse to use for future projects."
        },
        {
          title: "Reshare content",
          description: "You can download other people's videos or images (public accounts only) to reference, learn how to present, or refresh your ideas. Always respect copyright and cite sources when sharing."
        }
      ]
    },
    {
      title: "Content Managers and Marketers",
      icon: TrendingUp,
      color: "bg-blue-100 text-blue-600 border-blue-200",
      points: [
        {
          title: "Content analytics",
          description: "Marketing professionals can use ClipDown to collect content from brands or Instagram celebrities. Thereby, analyze trends, learn how to present and create content effectively."
        },
        {
          title: "Building a visual database",
          description: "Having a library of images and videos available from a variety of sources will help the process of comparing, researching and planning communication campaigns become faster and more professional."
        }
      ]
    },
    {
      title: "Students and researchers",
      icon: BookOpen,
      color: "bg-green-100 text-green-600 border-green-200",
      points: [
        {
          title: "Learning resources",
          description: "Students or researchers majoring in communication, marketing or culture can download sample images and videos from Instagram to analyze, research trends or evaluate the impact of a campaign."
        },
        {
          title: "Support academic projects",
          description: "Collecting and storing content from Instagram also helps supplement information and data for dissertations, reports or in-depth research on digital media."
        }
      ]
    }
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            In what cases do you need to use ClipDown - Instagram Downloader?
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            With ClipDown, accessing and downloading Instagram content becomes fast, convenient and reliable, 
            helping you keep up with the latest trends and ideas on the world's leading social networking platform.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              {/* Header */}
              <div className={`p-6 border-b-2 ${useCase.color}`}>
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${useCase.color}`}>
                    <useCase.icon className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      #{index + 1} {useCase.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="space-y-6">
                  {useCase.points.map((point, pointIndex) => (
                    <div key={pointIndex}>
                      <h4 className="font-semibold text-gray-800 mb-2">
                        {pointIndex + 1}. {point.title}
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Take full advantage of this tool for work, study and content creation every day!
            </h3>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Whether you're a content creator, marketer, or researcher, ClipDown provides the tools you need 
              to download and manage Instagram content efficiently.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseCasesSection;