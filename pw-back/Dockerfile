# Use the official Node.js image as the base image
FROM node:21

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# update npm
RUN npm install -g npm@latest

# Install dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Build the SvelteKit project
RUN npm run build

# Expose the port that your application will run on
EXPOSE 3040

# Command to run your application
CMD ["npm", "run", "start"]