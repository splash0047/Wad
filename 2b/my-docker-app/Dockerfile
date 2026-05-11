# Use official Nginx image as base
FROM nginx:alpine

# Copy custom HTML to Nginx web root
COPY index.html /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Start Nginx when container launches
CMD ["nginx", "-g", "daemon off;"]
