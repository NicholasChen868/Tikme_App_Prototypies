#!/bin/bash
# Script to open TikMe HTML file

# Try to open with available browsers
if command -v xdg-open &> /dev/null; then
    xdg-open "/home/user/TikmeApp_Prototypies/tikme-v5-ultimate.html"
elif command -v google-chrome &> /dev/null; then
    google-chrome "/home/user/TikmeApp_Prototypies/tikme-v5-ultimate.html"
elif command -v firefox &> /dev/null; then
    firefox "/home/user/TikmeApp_Prototypies/tikme-v5-ultimate.html"
elif command -v chromium &> /dev/null; then
    chromium "/home/user/TikmeApp_Prototypies/tikme-v5-ultimate.html"
else
    echo "Không tìm thấy trình duyệt. Vui lòng mở file thủ công:"
    echo "/home/user/TikmeApp_Prototypies/tikme-v5-ultimate.html"
fi
