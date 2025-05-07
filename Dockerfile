# Use official Node.js image as a base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (if it exists) into the container
COPY package*.json ./

# Install dependencies inside the container
RUN npm install

# Copy the rest of your application into the container
COPY . .

# Build the app (this assumes you have a "build" script in your package.json)
RUN npm run build

# Expose the port that your app will run on (adjust if needed)
EXPOSE 3000

# Command to start your application (adjust based on your app's start command)
CMD ["npm", "start"]
