import requests
import os
from urllib.parse import urlparse

# Create images directory if it doesn't exist
if not os.path.exists('images'):
    os.makedirs('images')

# Professional image URLs (using Unsplash for high-quality images)
images = {
    'profile.jpg': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    'project1.jpg': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
    'project2.jpg': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
    'project3.jpg': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop',
    'hero-bg.jpg': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop',
    'about-bg.jpg': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1920&h=1080&fit=crop',
    'contact-bg.jpg': 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1920&h=1080&fit=crop'
}

def download_image(url, filename):
    """Download image from URL and save to images folder"""
    try:
        response = requests.get(url, stream=True)
        response.raise_for_status()
        
        filepath = os.path.join('images', filename)
        with open(filepath, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        
        print(f"✅ Downloaded: {filename}")
        return True
    except Exception as e:
        print(f"❌ Failed to download {filename}: {e}")
        return False

def main():
    print("🚀 Downloading professional images for portfolio...")
    print("=" * 50)
    
    success_count = 0
    total_count = len(images)
    
    for filename, url in images.items():
        if download_image(url, filename):
            success_count += 1
    
    print("=" * 50)
    print(f"📊 Download complete: {success_count}/{total_count} images downloaded successfully!")
    
    if success_count == total_count:
        print("🎉 All images downloaded successfully!")
    else:
        print("⚠️  Some images failed to download. Check your internet connection.")

if __name__ == "__main__":
    main() 