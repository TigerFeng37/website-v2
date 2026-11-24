#!/bin/bash

# Video Optimization Script for Mobile Performance
# This script compresses large video files to prevent mobile crashes

echo "🎬 Video Optimization for Mobile Performance"
echo "============================================"

# Check if ffmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "❌ FFmpeg is not installed. Please install it first:"
    echo "   macOS: brew install ffmpeg"
    echo "   Ubuntu: sudo apt install ffmpeg"
    echo "   Windows: Download from https://ffmpeg.org"
    exit 1
fi

# Create optimized versions directory
mkdir -p src/assets/optimized

# Function to compress video
compress_video() {
    local input_file="$1"
    local output_file="$2"
    local quality="$3"
    local scale="$4"
    
    echo "📹 Compressing: $(basename "$input_file")"
    echo "   Quality: $quality, Scale: $scale"
    
    ffmpeg -i "$input_file" \
        -c:v libx264 \
        -preset medium \
        -crf "$quality" \
        -vf "scale=$scale" \
        -c:a aac \
        -b:a 64k \
        -movflags +faststart \
        -y "$output_file"
        
    if [ $? -eq 0 ]; then
        echo "✅ Created: $(basename "$output_file")"
        echo "   Original: $(du -h "$input_file" | cut -f1)"
        echo "   Optimized: $(du -h "$output_file" | cut -f1)"
        echo ""
    else
        echo "❌ Failed to compress: $(basename "$input_file")"
        echo ""
    fi
}

# Compress the largest files first
echo "🔄 Processing large video files..."

# Filmic.webm (19MB) - Main background video
if [ -f "src/assets/Filmic.webm" ]; then
    # Create mobile version (very compressed)
    compress_video "src/assets/Filmic.webm" "src/assets/optimized/Filmic-mobile.webm" 35 "854:480"
    
    # Create tablet version (medium compression)
    compress_video "src/assets/Filmic.webm" "src/assets/optimized/Filmic-tablet.webm" 28 "1280:720"
fi

# landing-hero-lg.webm (8.7MB)
if [ -f "src/assets/landing-hero-lg.webm" ]; then
    # Optimize existing large version
    compress_video "src/assets/landing-hero-lg.webm" "src/assets/optimized/landing-hero-lg-opt.webm" 30 "1280:720"
    
    # Create ultra-light mobile version
    compress_video "src/assets/landing-hero-lg.webm" "src/assets/optimized/landing-hero-mobile.webm" 35 "640:360"
fi

# WebGL Tool Video (5).webm (8.6MB)
if [ -f "src/assets/WebGL Tool Video (5).webm" ]; then
    compress_video "src/assets/WebGL Tool Video (5).webm" "src/assets/optimized/webgl-tool-mobile.webm" 32 "854:480"
fi

# Eclair-Hero.png (7.5MB) - Convert to optimized video
if [ -f "src/assets/Eclair-Hero.png" ]; then
    echo "📸 Converting large PNG to optimized video..."
    # Create a static video from the image (much smaller than PNG)
    ffmpeg -loop 1 -i "src/assets/Eclair-Hero.png" \
        -c:v libx264 \
        -t 10 \
        -pix_fmt yuv420p \
        -vf "scale=1280:720" \
        -y "src/assets/optimized/Eclair-Hero-mobile.mp4"
fi

# about-hero.webm (2.8MB)
if [ -f "src/assets/about-hero.webm" ]; then
    compress_video "src/assets/about-hero.webm" "src/assets/optimized/about-hero-mobile.webm" 32 "854:480"
fi

echo "🎉 Video optimization complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Update your components to use the optimized videos"
echo "2. Test on actual mobile devices"
echo "3. Consider using the OptimizedVideo component"
echo ""
echo "💡 Mobile Optimization Tips:"
echo "• Use the 'mobile' versions on phones (< 768px width)"
echo "• Use the 'tablet' versions on tablets (768px - 1024px)"
echo "• Load only one video at a time"
echo "• Consider using static images on very low-end devices" 