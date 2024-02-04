# Use the official Node.js image as the base image
FROM node:21

# Set build-time environment variables
ARG PUBLIC_SERVER_URL
ARG PUBLIC_PALDEX_API_URL

# Set environment variables directly
ENV PUBLIC_SERVER_URL=$PUBLIC_SERVER_URL
ENV PUBLIC_PALDEX_API_URL=$PUBLIC_PALDEX_API_URL

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# update npm
RUN npm install -g npm@latest

# Install dependencies
RUN npm install

# Copy .env.docker and rename it to .env for npm run build
COPY .env.docker .env

# Copy the entire project to the working directory
COPY . .

# Install dotenv as a runtime dependency
RUN npm install dotenv

# Source .env and build the SvelteKit project
RUN npm run build

# Expose the port that your application will run on
EXPOSE 3000

# Command to run your application
CMD ["npm", "run", "start"]