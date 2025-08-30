from pydantic import BaseModel, Field, HttpUrl
from typing import List, Optional, Dict, Any
from datetime import datetime
from enum import Enum

class ContentType(str, Enum):
    PHOTO = "photo"
    VIDEO = "video" 
    REEL = "reel"
    STORY = "story"
    PROFILE = "profile"
    CAROUSEL = "carousel"

class MediaFormat(str, Enum):
    MP4 = "MP4"
    JPG = "JPG"
    PNG = "PNG"
    MP3 = "MP3"

class MediaQuality(str, Enum):
    HD = "HD"
    SD = "SD"
    ORIGINAL = "Original"

class MediaUrl(BaseModel):
    quality: MediaQuality
    format: MediaFormat
    url: str
    size: str  # e.g., "12.5 MB"
    resolution: str  # e.g., "1080x1080"
    bitrate: Optional[str] = None  # for videos

class ContentMetadata(BaseModel):
    likes: Optional[str] = None
    views: Optional[str] = None
    comments: Optional[str] = None
    duration: Optional[str] = None  # for videos
    upload_date: Optional[datetime] = None
    followers: Optional[str] = None  # for profiles

class InstagramContent(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    type: ContentType
    title: str
    username: str
    caption: Optional[str] = None
    thumbnail: Optional[str] = None
    media_urls: List[MediaUrl]
    metadata: ContentMetadata
    original_url: str
    processed_at: datetime = Field(default_factory=datetime.utcnow)

class ProcessUrlRequest(BaseModel):
    url: HttpUrl
    user_agent: Optional[str] = None

class ProcessUrlResponse(BaseModel):
    success: bool
    data: Optional[InstagramContent] = None
    error: Optional[str] = None
    message: Optional[str] = None

class DownloadHistoryItem(BaseModel):
    id: str
    url: str
    type: ContentType
    username: str
    title: str
    processed_at: datetime
    download_count: int = 0

import uuid