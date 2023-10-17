# Use official Node image as a base image
FROM node:18.16.0-slim AS base

# Set the working directory in the image
WORKDIR /app

# Set environment to 'staging'
ENV NODE_ENV=staging

# Install ca-certificates and update the certificate list
RUN apt-get update && apt-get install -y ca-certificates && update-ca-certificates

# Copy package.json and package-lock.json for installing dependencies
COPY package*.json ./

# Install node modules
RUN npm install --only=production

# Copy over the rest of the code
COPY . .

# Expose the port the app runs on
EXPOSE 8090

# Specify the command to run when the container starts
CMD [ "./src/backend/pb/linux_amd64_pocketbase", "serve", "--http", "0.0.0.0:8090" ]
