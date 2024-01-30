# Use the latest Node.js image
FROM node:latest

WORKDIR /app

# Copy files and directories from the context directory to the image
COPY package.json ./
COPY tsconfig.base.json ./
COPY nx.json ./
COPY apps/operation-stacked-dashboard/ ./apps/operation-stacked-dashboard/
COPY libs/ ./libs/

# Install the npm dependencies
RUN npm install

# Build the operation-stacked-dashboard project
RUN npx nx build operation-stacked-dashboard

# Expose port 3000 for the application
EXPOSE 3000

# Define the command to run the application
CMD ["npx", "nx", "serve", "operation-stacked-dashboard"]
