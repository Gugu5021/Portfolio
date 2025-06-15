FROM nginx:alpine

# Copy all files from project root to the NGINX html directory
COPY . /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]