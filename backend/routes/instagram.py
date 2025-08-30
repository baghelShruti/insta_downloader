from fastapi import APIRouter, HTTPException, Response, Query
from fastapi.responses import StreamingResponse, RedirectResponse
import httpx
import asyncio
from typing import Optional
import logging

from models.instagram import ProcessUrlRequest, ProcessUrlResponse, InstagramContent
from services.instagram_service import InstagramService

router = APIRouter(prefix="/instagram", tags=["instagram"])
instagram_service = InstagramService()

# In-memory storage for demo purposes (use Redis in production)
processed_content = {}

@router.post("/process", response_model=ProcessUrlResponse)
async def process_instagram_url(request: ProcessUrlRequest):
    """Process Instagram URL and extract content information"""
    try:
        url = str(request.url)
        
        # Validate URL
        if not instagram_service.is_valid_instagram_url(url):
            return ProcessUrlResponse(
                success=False,
                error="INVALID_URL",
                message="Please provide a valid Instagram URL"
            )
        
        # Process the URL
        content = await instagram_service.process_instagram_url(url, request.user_agent)
        
        # Store processed content temporarily
        processed_content[content.id] = content
        
        return ProcessUrlResponse(
            success=True,
            data=content,
            message="Content processed successfully"
        )
        
    except ValueError as e:
        return ProcessUrlResponse(
            success=False,
            error="VALIDATION_ERROR",
            message=str(e)
        )
    except Exception as e:
        logging.error(f"Error processing Instagram URL: {str(e)}")
        return ProcessUrlResponse(
            success=False,
            error="PROCESSING_ERROR", 
            message="Failed to process Instagram content. Please try again."
        )

@router.get("/download/{content_id}")
async def download_content(
    content_id: str,
    quality: str = Query(default="HD", description="Quality: HD, SD, Original"),
    format: str = Query(default="JPG", description="Format: MP4, JPG, PNG, MP3")
):
    """Download Instagram content with specified quality and format"""
    try:
        # Get content from storage
        content = processed_content.get(content_id)
        if not content:
            raise HTTPException(status_code=404, detail="Content not found or expired")
        
        # Find matching media URL
        matching_media = None
        for media in content.media_urls:
            if media.quality.value.upper() == quality.upper() and media.format.value.upper() == format.upper():
                matching_media = media
                break
        
        if not matching_media:
            # Fallback to first available media
            if content.media_urls:
                matching_media = content.media_urls[0]
            else:
                raise HTTPException(status_code=404, detail="No media found for specified quality/format")
        
        # Get download URL
        download_url = await instagram_service.get_download_url(content_id, quality, format)
        
        if not download_url:
            raise HTTPException(status_code=404, detail="Download URL not available")
        
        # For direct URLs, redirect to the media
        if download_url.startswith('http'):
            return RedirectResponse(url=download_url)
        
        # For local files or when we need to stream
        # This would be used for files stored locally
        raise HTTPException(status_code=501, detail="File streaming not implemented")
        
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error downloading content: {str(e)}")
        raise HTTPException(status_code=500, detail="Download failed")

@router.get("/content/{content_id}")
async def get_content_info(content_id: str):
    """Get content information by ID"""
    content = processed_content.get(content_id)
    if not content:
        raise HTTPException(status_code=404, detail="Content not found")
    
    return {
        "success": True,
        "data": content
    }

@router.delete("/content/{content_id}")
async def delete_content(content_id: str):
    """Delete processed content from temporary storage"""
    if content_id in processed_content:
        del processed_content[content_id]
        return {"success": True, "message": "Content deleted"}
    else:
        raise HTTPException(status_code=404, detail="Content not found")

@router.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "instagram-downloader",
        "processed_items": len(processed_content)
    }