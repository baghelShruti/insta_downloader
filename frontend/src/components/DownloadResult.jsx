import React, { useState } from 'react';
import { Download, Image, Video, Music, User, Calendar, Eye, Heart, Share2, X } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useToast } from '../hooks/use-toast';

const DownloadResult = ({ contentData, onClose }) => {
  const [selectedQuality, setSelectedQuality] = useState(0);
  const { toast } = useToast();

  // Use the actual content data passed from the API
  const content = contentData;
  const formats = content.media_urls || [];

  const handleDownload = async (format) => {
    try {
      toast({
        title: "Download Started",
        description: `Downloading ${content.title} in ${format.quality} quality...`,
      });

      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
      const downloadUrl = `${BACKEND_URL}/api/instagram/download/${content.id}?quality=${format.quality}&format=${format.format}`;
      
      // Open download URL in a new tab
      window.open(downloadUrl, '_blank');
      
      setTimeout(() => {
        toast({
          title: "Download Complete",
          description: `${content.title} has been downloaded successfully!`,
        });
      }, 2000);
      
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download Error",
        description: "Failed to download content. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: content.title,
        text: content.caption,
        url: content.original_url,
      });
    } else {
      navigator.clipboard.writeText(content.original_url);
      toast({
        title: "Link Copied",
        description: "Instagram link has been copied to clipboard.",
      });
    }
  };

  const getContentIcon = () => {
    switch (content.type) {
      case 'video':
      case 'reel':
        return <Video className="h-6 w-6 text-blue-600" />;
      case 'photo':
        return <Image className="h-6 w-6 text-green-600" />;
      case 'story':
        return <User className="h-6 w-6 text-purple-600" />;
      default:
        return <Image className="h-6 w-6 text-gray-600" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {getContentIcon()}
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
              {content.type === 'video' || content.type === 'reel' ? (
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
                  {content.metadata?.duration && (
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                      {content.metadata.duration}
                    </div>
                  )}
                </div>
              ) : (
                <img 
                  src={content.thumbnail || formats[0]?.url} 
                  alt={content.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Content Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">{content.type.toUpperCase()}</Badge>
                <Badge variant="outline">{formats[0]?.quality || 'HD'}</Badge>
                <Badge variant="outline">{formats[0]?.size || 'N/A'}</Badge>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900">{content.username}</h4>
                <p className="text-gray-600 text-sm mt-1">{content.caption}</p>
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-500">
                {content.metadata?.likes && (
                  <div className="flex items-center space-x-1">
                    <Heart className="h-4 w-4" />
                    <span>{content.metadata.likes}</span>
                  </div>
                )}
                {content.metadata?.views && (
                  <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>{content.metadata.views}</span>
                  </div>
                )}
                {content.processed_at && (
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Just now</span>
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
                        {(format.format === 'JPG' || format.format === 'PNG') && <Image className="h-4 w-4 text-gray-400" />}
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
                Download {formats[selectedQuality]?.quality || 'HD'}
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
                <strong>Note:</strong> Content is downloaded from Instagram's servers. 
                Please respect copyright and privacy policies when downloading content. 
                Only download content you have permission to use.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadResult;