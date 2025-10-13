# Use official Node image to build the app
FROM node:18 AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Use Nginx to serve the static files
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
