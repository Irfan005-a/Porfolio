import requests
import os

def download_profile_image():
    """Download a professional profile image"""
    
    # Professional profile image URL from Unsplash
    profile_url = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
    
    # Create images directory if it doesn't exist
    if not os.path.exists('images'):
        os.makedirs('images')
    
    try:
        print("Downloading professional profile image...")
        response = requests.get(profile_url, stream=True)
        response.raise_for_status()
        
        filepath = os.path.join('images', 'profile.jpg')
        with open(filepath, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        
        print("✅ Profile image downloaded successfully!")
        print(f"📁 Saved to: {filepath}")
        return True
        
    except Exception as e:
        print(f"❌ Failed to download profile image: {e}")
        return False

if __name__ == "__main__":
    download_profile_image() 