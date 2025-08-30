# ClipDown Instagram Downloader - Backend Integration Contracts

## API Endpoints

### 1. Process Instagram URL
**Endpoint:** `POST /api/instagram/process`
**Request Body:**
```json
{
  "url": "https://www.instagram.com/p/sample123/",
  "user_agent": "optional browser user agent"
}
```
**Response:**
```json
{
  "success": true,
  "data": {
    "id": "unique_content_id",
    "type": "photo|video|reel|story|profile",
    "title": "Content title",
    "username": "@username",
    "caption": "Post caption",
    "thumbnail": "thumbnail_url",
    "media_urls": [
      {
        "quality": "HD|SD|Original",
        "format": "MP4|JPG|PNG|MP3",
        "url": "direct_download_url",
        "size": "file_size_mb",
        "resolution": "1080x1080"
      }
    ],
    "metadata": {
      "likes": "count",
      "views": "count",
      "duration": "for videos",
      "upload_date": "timestamp"
    }
  }
}
```

### 2. Download Content
**Endpoint:** `GET /api/instagram/download/{content_id}`
**Query Parameters:**
- `quality`: HD|SD|Original
- `format`: MP4|JPG|PNG|MP3
**Response:** Direct file download stream

### 3. Content History (Optional)
**Endpoint:** `GET /api/instagram/history`
**Response:** List of recently processed URLs (without storing personal data)

## Mock Data Replacement

### Current Mock Data in `/app/frontend/src/mock/mockData.js`:
1. **mockInstagramContent** - Replace with actual Instagram API responses
2. **mockDownloadFormats** - Replace with real format options based on content type
3. **mockFaqData** - Keep as static content (no backend needed)

## Backend Implementation Requirements

### 1. Instagram Content Extraction
- **Challenge**: Instagram has anti-scraping measures
- **Solutions**:
  - Use Instagram Basic Display API (requires app approval)
  - Implement web scraping with rotating proxies/user agents
  - Use third-party services like RapidAPI Instagram scrapers
  - For demo: Use oembed endpoint for public posts

### 2. File Processing & Storage
- Extract media URLs from Instagram responses
- Handle different content types (photos, videos, carousels)
- Temporary file storage for processing
- Direct streaming for downloads (no permanent storage)

### 3. Download Management
- Generate unique download tokens
- Stream files directly to users
- Handle large file downloads with proper headers
- Rate limiting and abuse prevention

### 4. Error Handling
- Invalid URLs
- Private/restricted content
- Rate limiting from Instagram
- Network timeouts
- File processing errors

## Frontend Integration Changes

### Files to Update:
1. **HeroSection.jsx**: Replace mock download with real API call
2. **DownloadResult.jsx**: Use real data from API response
3. **Remove mock imports** from components

### API Integration Flow:
1. User pastes Instagram URL
2. Frontend calls `POST /api/instagram/process`
3. Backend processes URL and returns content info
4. Frontend displays DownloadResult with real data
5. User clicks download → Frontend calls `GET /api/instagram/download/{id}`

## Security & Compliance

### Privacy Protection:
- No user data storage
- No login required
- Temporary processing only
- Clear content after download

### Legal Compliance:
- Only public content
- Respect robots.txt
- Rate limiting
- Copyright notices
- Terms of service compliance

## Technical Stack

### Backend Dependencies to Add:
- `requests` - HTTP requests to Instagram
- `beautifulsoup4` - HTML parsing
- `python-multipart` - File uploads
- `aiofiles` - Async file handling
- `httpx` - Async HTTP client

### Database Models:
- **Optional**: Temporary content cache (Redis)
- **No permanent storage** of user content

## Development Phases

### Phase 1: Basic URL Processing ✅
- Create API endpoints structure
- Implement basic Instagram URL validation
- Mock response with realistic data structure

### Phase 2: Content Extraction 🔄
- Implement Instagram content scraping
- Handle different content types
- Extract media URLs and metadata

### Phase 3: Download System 🔄
- File streaming endpoints
- Download token generation
- Progress tracking

### Phase 4: Frontend Integration 🔄
- Replace mock data with API calls
- Error handling and loading states
- User feedback and notifications

## Notes
- Instagram's ToS limits automated access
- Consider using official APIs where possible
- Implement fallback methods for reliability
- Focus on public content only for legal compliance