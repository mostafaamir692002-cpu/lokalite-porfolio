#!/bin/bash
cd "$(dirname "$0")"
# Kill anything already on port 3000
lsof -ti:3000 | xargs kill -9 2>/dev/null
sleep 1
echo "Starting portfolio server on http://localhost:3000"
echo "Open: http://localhost:3000/index.html"
python3 -m http.server 3000
