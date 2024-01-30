# Use a Node.js base image
FROM node:latest

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json from two directories up
COPY /package.json ./

# Install dependencies
RUN npm install

# Copy the test scripts
COPY . .

# Expose the port used by Playwright if necessary
EXPOSE 3000 8000 8001

# Default command to run tests
CMD ["npm", "run", "test:e2e"]
