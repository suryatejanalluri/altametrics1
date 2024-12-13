# Use the official Node.js image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies inside the container
RUN npm install
RUN npm install -g tsx

# Copy the rest of the application files to the container
COPY . .

# Run Prisma generate to create the Prisma client
RUN npx prisma generate

# Build the application (optional if you need a production build)
RUN npm run build

# Expose the port the app will run on
EXPOSE 3000

# Command to run the application in production mode
CMD ["npm", "run", "start:prod"]
