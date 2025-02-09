FROM node:21-slim as build
WORKDIR /app
COPY package*.json  .
RUN ls -la
#COPY ./healthui/package*.json /app/
RUN ls -la
RUN npm install
COPY . .
RUN npm install -g @angular/cli@17
RUN ls -la
RUN ng build

# Stage 2: Serve the app with nginx
# FROM nginx:1-alpine-slim
# COPY --from=build /app/dist/healthui /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

# # Stage 1: Build the Angular application
# FROM node:16-alpine as build

# WORKDIR /app

# # Copy the package.json and install dependencies
# COPY package.json package-lock.json ./
# RUN npm install

# # Copy the project files into the container
# COPY . .

# # Expose the port the app runs on
# this is dev
EXPOSE "4200:4200"

# Start the application
# CMD ["ng", "serve", "--host", "0.0.0.0"]

# Start the Angular app
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200", "--disable-host-check"]
