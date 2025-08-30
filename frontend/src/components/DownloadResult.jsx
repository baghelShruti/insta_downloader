import React, { useState } from 'react';
import { Download, Image, Video, Music, User, Calendar, Eye, Heart, Share2, X } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { mockInstagramContent, mockDownloadFormats } from '../mock/mockData';
import { useToast } from '../hooks/use-toast';

const DownloadResult = ({ url, onClose }) => {
  const [selectedQuality, setSelectedQuality] = useState(0);
  const { toast } = useToast();

  // Determine content type based on URL (mock logic)
  const getContentType = (url) => {
    if (url.includes('/reel/') || url.includes('reels')) return 'reel';
    if (url.includes('/stories/')) return 'story';
    if (url.includes('/p/')) return Math.random() > 0.5 ? 'video' : 'photo';
    return 'photo'; // default
  };

  const contentType = getContentType(url);
  const content = mockInstagramContent[contentType];
  const formats = mockDownloadFormats[contentType === 'reel' ? 'video' : contentType] || mockDownloadFormats.photo;

  const handleDownload = (format) => {
    toast({
      title: "Download Started",
      description: `Downloading ${content.title} in ${format.quality} quality...`,
    });
    
    // Simulate download
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: `${content.title} has been downloaded successfully!`,
      });
    }, 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: content.title,
        text: content.caption,
        url: url,
      });
    } else {
      navigator.clipboard.writeText(url);
      toast({
        title: "Link Copied",
        description: "Instagram link has been copied to clipboard.",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {contentType === 'video' || contentType === 'reel' ? (
            <Video className="h-6 w-6 text-blue-600" />
          ) : contentType === 'photo' ? (
            <Image className="h-6 w-6 text-green-600" />
          ) : (
            <User className="h-6 w-6 text-purple-600" />
          )}
          <h3 className="text-lg font-semibold text-gray-900">Download Ready</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Preview */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              {contentType === 'video' || contentType === 'reel' ? (
                <div className="relative w-full h-full">
                  <img 
                    src={content.thumbnail} 
                    alt={content.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                    <div className="bg-white bg-opacity-90 rounded-full p-4">
                      <Video className="h-8 w-8 text-gray-800" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                    {content.duration}
                  </div>
                </div>
              ) : (
                <img 
                  src={content.imageUrl || content.thumbnail} 
                  alt={content.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Content Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">{content.type.toUpperCase()}</Badge>
                <Badge variant="outline">{content.quality}</Badge>
                <Badge variant="outline">{content.size}</Badge>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900">{content.username}</h4>
                <p className="text-gray-600 text-sm mt-1">{content.caption}</p>
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-500">
                {content.likes && (
                  <div className="flex items-center space-x-1">
                    <Heart className="h-4 w-4" />
                    <span>{content.likes}</span>
                  </div>
                )}
                {content.views && (
                  <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>{content.views}</span>
                  </div>
                )}
                {content.timestamp && (
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{content.timestamp}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Download Options */}
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Download Options</h4>
              <div className="space-y-3">
                {formats.map((format, index) => (
                  <div 
                    key={index}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedQuality === index 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedQuality(index)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">{format.quality}</span>
                          <Badge variant="outline">{format.format}</Badge>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {format.resolution} • {format.size}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {format.format === 'MP3' && <Music className="h-4 w-4 text-gray-400" />}
                        {format.format === 'MP4' && <Video className="h-4 w-4 text-gray-400" />}
                        {format.format === 'JPG' && <Image className="h-4 w-4 text-gray-400" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                onClick={() => handleDownload(formats[selectedQuality])}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                size="lg"
              >
                <Download className="h-4 w-4 mr-2" />
                Download {formats[selectedQuality].quality}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleShare}
                className="w-full"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>

            {/* Disclaimer */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-yellow-800 text-xs">
                <strong>Note:</strong> This is a demo version. In the actual application, 
                content would be downloaded from Instagram's servers. Please respect 
                copyright and privacy policies when downloading content.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadResult;