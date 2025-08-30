// Mock data for ClipDown Instagram Downloader

export const mockInstagramContent = {
  video: {
    id: "mock_video_1",
    type: "video",
    title: "Amazing Instagram Video",
    thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=400&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    duration: "0:45",
    quality: "HD",
    size: "12.5 MB",
    username: "@demo_user",
    caption: "This is a mock Instagram video for demonstration purposes.",
    likes: "1,234",
    views: "10.5K"
  },
  photo: {
    id: "mock_photo_1",
    type: "photo",
    title: "Beautiful Instagram Photo",
    imageUrl: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=600&h=600&fit=crop",
    quality: "HD",
    size: "2.1 MB",
    username: "@photo_user",
    caption: "Amazing sunset capture! #photography #nature",
    likes: "856",
    resolution: "1080x1080"
  },
  reel: {
    id: "mock_reel_1",
    type: "reel",
    title: "Trending Instagram Reel",
    thumbnail: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=400&h=600&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    duration: "0:30",
    quality: "HD",
    size: "8.3 MB",
    username: "@reel_creator",
    caption: "Check out this amazing reel! #viral #trending",
    likes: "5.2K",
    views: "45.8K"
  },
  story: {
    id: "mock_story_1",
    type: "story",
    title: "Instagram Story",
    imageUrl: "https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=400&h=700&fit=crop",
    quality: "HD",
    size: "1.8 MB",
    username: "@story_user",
    timestamp: "2 hours ago",
    views: "156"
  },
  profile: {
    id: "mock_profile_1",
    type: "profile",
    title: "Profile Picture",
    imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop",
    quality: "HD",
    size: "850 KB",
    username: "@profile_user",
    fullName: "Demo User",
    followers: "10.2K",
    resolution: "400x400"
  }
};

export const mockDownloadFormats = {
  video: [
    { quality: "HD", format: "MP4", size: "12.5 MB", resolution: "1080x1920" },
    { quality: "SD", format: "MP4", size: "6.2 MB", resolution: "720x1280" },
    { quality: "Audio Only", format: "MP3", size: "2.1 MB", resolution: "Audio" }
  ],
  photo: [
    { quality: "Original", format: "JPG", size: "2.1 MB", resolution: "1080x1080" },
    { quality: "HD", format: "JPG", size: "1.2 MB", resolution: "720x720" },
    { quality: "Medium", format: "JPG", size: "650 KB", resolution: "480x480" }
  ]
};

export const mockFaqData = [
  {
    question: "What is ClipDown?",
    answer: "ClipDown is an online tool that helps you download videos, photos, Reels, Stories and Highlights from Instagram. Easily save any Instagram content to your phone or computer quickly, without needing to install software."
  },
  {
    question: "Can it work on mobile?",
    answer: "Of course. We apply PWA technology to ClipDown, so it can work well on any device including iPhone or Android."
  },
  {
    question: "Do I have to install software to use it?",
    answer: "No. Our Instagram downloader is an online tool, accessed through a web browser. You do not need to install any other software."
  },
  {
    question: "Does ClipDown limit the download file size?",
    answer: "No. We don't limit file size, you can download any content from Instagram without any restrictions on size, duration or number of downloads."
  },
  {
    question: "What are the file formats when downloading?",
    answer: "For images, you can download them in popular formats such as JPG and PNG. For video and audio, we support MP4 and MP3 formats - globally popular formats, ensuring high quality and optimal capacity."
  },
  {
    question: "Do I have to pay or upgrade account?",
    answer: "No. All of our services are completely free and do not require you to upgrade your account or pay any fees. You can download unlimited content from Instagram without worrying about paying any fees or purchasing a subscription."
  },
  {
    question: "Can I download multiple links at the same time?",
    answer: "Currently, ClipDown only supports downloading one link at a time to ensure the most stable quality and download speed."
  },
  {
    question: "Does ClipDown store links or content that I've downloaded?",
    answer: "No. ClipDown undertakes not to store any information or content that you download. Your privacy and security are our top priority."
  }
];

export const mockUseCases = [
  {
    title: "Content Creator on Instagram",
    icon: "camera",
    points: [
      "Store and back up images and videos: If you regularly post to Instagram (Reels, Stories or regular posts), saving all your content will help you have a safely stored content warehouse to use for future projects.",
      "Reshare content: You can download other people's videos or images (public accounts only) to reference, learn how to present, or refresh your ideas. Always respect copyright and cite sources when sharing."
    ]
  },
  {
    title: "Content Managers and Marketers",
    icon: "trending-up",
    points: [
      "Content analytics: Marketing professionals can use ClipDown to collect content from brands or Instagram celebrities. Thereby, analyze trends, learn how to present and create content effectively.",
      "Building a visual database: Having a library of images and videos available from a variety of sources will help the process of comparing, researching and planning communication campaigns become faster and more professional."
    ]
  },
  {
    title: "Students and researchers",
    icon: "book-open",
    points: [
      "Learning resources: Students or researchers majoring in communication, marketing or culture can download sample images and videos from Instagram to analyze, research trends or evaluate the impact of a campaign.",
      "Support academic projects: Collecting and storing content from Instagram also helps supplement information and data for dissertations, reports or in-depth research on digital media."
    ]
  }
];