#!/bin/bash
echo "Starting Docker containers..."
docker-compose up --build -d

echo "Setting up the backend..."
cd backend || exit
npm install
npx prisma migrate dev --name init
npx tsx prisma/seed.ts
npm start run &

echo "Setting up the frontend..."
cd ../frontend || exit
npm install
npm run dev
