import re
import json
import requests
import asyncio
from typing import Optional, Dict, Any, List
from urllib.parse import urlparse, parse_qs
import uuid
from datetime import datetime
import httpx
from bs4 import BeautifulSoup

from models.instagram import (
    InstagramContent, ContentType, MediaUrl, ContentMetadata, 
    MediaFormat, MediaQuality
)

class InstagramService:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
        })

    def is_valid_instagram_url(self, url: str) -> bool:
        """Validate if URL is a valid Instagram URL"""
        instagram_patterns = [
            r'https?://(?:www\.)?instagram\.com/p/([^/?]+)',  # Post
            r'https?://(?:www\.)?instagram\.com/reel/([^/?]+)',  # Reel
            r'https?://(?:www\.)?instagram\.com/stories/([^/?]+)',  # Story
            r'https?://(?:www\.)?instagram\.com/([^/?]+)/?$',  # Profile
        ]
        
        return any(re.match(pattern, url) for pattern in instagram_patterns)

    def extract_content_id(self, url: str) -> str:
        """Extract content ID from Instagram URL"""
        patterns = [
            r'/p/([^/?]+)',
            r'/reel/([^/?]+)', 
            r'/stories/([^/?]+)',
        ]
        
        for pattern in patterns:
            match = re.search(pattern, url)
            if match:
                return match.group(1)
        
        # For profile URLs, use username as ID
        profile_match = re.match(r'https?://(?:www\.)?instagram\.com/([^/?]+)/?$', url)
        if profile_match:
            return profile_match.group(1)
            
        return str(uuid.uuid4())

    def determine_content_type(self, url: str) -> ContentType:
        """Determine content type from URL"""
        if '/p/' in url:
            return ContentType.PHOTO  # Could be photo or video, we'll determine later
        elif '/reel/' in url:
            return ContentType.REEL
        elif '/stories/' in url:
            return ContentType.STORY
        elif re.match(r'https?://(?:www\.)?instagram\.com/[^/?]+/?$', url):
            return ContentType.PROFILE
        else:
            return ContentType.PHOTO

    async def get_oembed_data(self, url: str) -> Optional[Dict[Any, Any]]:
        """Get public post data using Instagram oEmbed endpoint"""
        try:
            oembed_url = f"https://api.instagram.com/oembed/?url={url}"
            
            async with httpx.AsyncClient() as client:
                response = await client.get(oembed_url, timeout=10.0)
                
            if response.status_code == 200:
                return response.json()
            else:
                print(f"oEmbed failed with status: {response.status_code}")
                return None
                
        except Exception as e:
            print(f"oEmbed error: {str(e)}")
            return None

    def create_mock_content(self, url: str, content_type: ContentType) -> InstagramContent:
        """Create realistic mock content for demo purposes"""
        content_id = self.extract_content_id(url)
        
        # Generate realistic usernames and titles
        mock_usernames = ["@travel_explorer", "@foodie_life", "@art_creator", "@fitness_guru", "@tech_reviews"]
        mock_titles = [
            "Amazing sunset capture!",
            "Delicious homemade recipe",
            "Creative art project", 
            "Morning workout routine",
            "Latest tech review"
        ]
        
        username = mock_usernames[hash(content_id) % len(mock_usernames)]
        title = mock_titles[hash(content_id) % len(mock_titles)]
        
        # Create different media URLs based on content type
        if content_type == ContentType.VIDEO or content_type == ContentType.REEL:
            media_urls = [
                MediaUrl(
                    quality=MediaQuality.HD,
                    format=MediaFormat.MP4,
                    url="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                    size="15.2 MB",
                    resolution="1080x1920",
                    bitrate="2.5 Mbps"
                ),
                MediaUrl(
                    quality=MediaQuality.SD,
                    format=MediaFormat.MP4,
                    url="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
                    size="8.7 MB",
                    resolution="720x1280",
                    bitrate="1.2 Mbps"
                ),
                MediaUrl(
                    quality=MediaQuality.HD,
                    format=MediaFormat.MP3,
                    url="https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3",
                    size="2.1 MB",
                    resolution="Audio Only"
                )
            ]
            
            metadata = ContentMetadata(
                likes="1.2K",
                views="15.8K",
                comments="89",
                duration="0:45",
                upload_date=datetime.utcnow()
            )
            
            thumbnail = "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=600&fit=crop"
            
        else:  # Photo, Story, Profile
            media_urls = [
                MediaUrl(
                    quality=MediaQuality.ORIGINAL,
                    format=MediaFormat.JPG,
                    url="https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=1080&h=1080&fit=crop",
                    size="2.8 MB",
                    resolution="1080x1080"
                ),
                MediaUrl(
                    quality=MediaQuality.HD,
                    format=MediaFormat.JPG,
                    url="https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=720&h=720&fit=crop",
                    size="1.5 MB",
                    resolution="720x720"
                ),
                MediaUrl(
                    quality=MediaQuality.SD,
                    format=MediaFormat.JPG,
                    url="https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=480&h=480&fit=crop",
                    size="850 KB",
                    resolution="480x480"
                )
            ]
            
            metadata = ContentMetadata(
                likes="856",
                comments="23",
                upload_date=datetime.utcnow()
            )
            
            thumbnail = "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=400&h=400&fit=crop"

        return InstagramContent(
            id=content_id,
            type=content_type,
            title=title,
            username=username,
            caption=f"{title} #instagram #content #demo",
            thumbnail=thumbnail,
            media_urls=media_urls,
            metadata=metadata,
            original_url=url
        )

    async def process_instagram_url(self, url: str, user_agent: Optional[str] = None) -> InstagramContent:
        """Process Instagram URL and extract content information"""
        
        if not self.is_valid_instagram_url(url):
            raise ValueError("Invalid Instagram URL")
        
        content_type = self.determine_content_type(url)
        
        # Try to get real data from oEmbed for public posts
        if content_type in [ContentType.PHOTO, ContentType.VIDEO]:
            oembed_data = await self.get_oembed_data(url)
            
            if oembed_data:
                # Extract real data from oEmbed response
                content_id = self.extract_content_id(url)
                
                # Parse username from author_name
                username = oembed_data.get('author_name', '@unknown_user')
                if not username.startswith('@'):
                    username = f'@{username}'
                
                title = oembed_data.get('title', 'Instagram Post')
                thumbnail_url = oembed_data.get('thumbnail_url')
                
                # For real implementation, we would need to extract actual media URLs
                # For now, we'll use the mock data structure with some real metadata
                mock_content = self.create_mock_content(url, content_type)
                mock_content.username = username
                mock_content.title = title
                if thumbnail_url:
                    mock_content.thumbnail = thumbnail_url
                
                return mock_content
        
        # Fallback to mock data for demo/development
        return self.create_mock_content(url, content_type)

    async def get_download_url(self, content_id: str, quality: str, format: str) -> Optional[str]:
        """Get direct download URL for specific quality and format"""
        # In a real implementation, this would:
        # 1. Look up the content by ID
        # 2. Find the matching quality/format
        # 3. Return the direct download URL
        
        # For demo purposes, return mock URLs
        if format.upper() == "MP4":
            if quality.upper() == "HD":
                return "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            else:
                return "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
        elif format.upper() in ["JPG", "PNG"]:
            if quality.upper() == "HD":
                return "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=1080&h=1080&fit=crop"
            else:
                return "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=720&h=720&fit=crop"
        elif format.upper() == "MP3":
            return "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3"
        
        return None