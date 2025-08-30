import React, { useState } from 'react';
import { Download, Clipboard } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from '../hooks/use-toast';

const HeroSection = ({ onDownload }) => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      toast({
        title: "URL Pasted",
        description: "Instagram URL has been pasted successfully.",
      });
    } catch (err) {
      toast({
        title: "Paste Failed",
        description: "Unable to paste from clipboard. Please paste manually.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    if (!url.trim()) {
      toast({
        title: "URL Required",
        description: "Please paste an Instagram URL first.",
        variant: "destructive",
      });
      return;
    }

    if (!url.includes('instagram.com')) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid Instagram URL.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate processing time
    setTimeout(() => {
      setIsLoading(false);
      onDownload(url);
    }, 2000);
  };

  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-blue-600 mb-4">
          Instagram Downloader
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Download Instagram Videos, Photos, Stories, Highlights and Reels for free
        </p>

        {/* Download Form */}
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="Paste URL Instagram"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="h-12 text-base pr-12"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePaste}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <Clipboard className="h-4 w-4" />
                Paste
              </Button>
            </div>
            <Button
              onClick={handleDownload}
              disabled={isLoading}
              className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </>
              )}
            </Button>
          </div>

          {/* Processing Message */}
          {isLoading && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
              <p className="text-blue-800 font-medium">
                Retrieving data, please wait a few seconds!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;