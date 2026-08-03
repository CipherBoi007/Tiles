#!/bin/sh

# Start Nginx in the background
nginx

# Start Node backend
cd /app/backend
npm start
