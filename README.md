
## Prerequisites
 **Node.js** (v18.18 or higher)
 **npm**
 **Docker**
- Ensure that the Docker service is running on your system:
  Windows/Mac: Launch Docker Desktop and ensure it is active.
  Linux: Run sudo systemctl start docker to start the Docker service if it is not already running.

We are using Prisma in this project, and Prisma is supported from versions starting 18.18
First check the version of node using the following command
```bash
node --version
```
The project is built using 20.12.2 version, Ideally it works without  compatibility issues when node version is 20.
You can get the latest version of node from the official installer at this link: https://nodejs.org/en/download/prebuilt-installer

After ensuring node version is above 18.18, Move to altametrics1 folder:


```bash
cd <your-project-folder>/altametrics1
```
## Setup Instructions

### 1. Build the PostGreSQL database using Docker
## Running with Docker Compose
To run the database and backend services using Docker Compose:
```bash
docker-compose up --build
```
The above command builds up a PostGreSQL database.

### 2. Download the required node dependencies for Nest.js and backend server

Next, navigate to the backend folder and do an npm install to 
```bash
cd <your-project-folder>/atlametrics1/backend
npm install
```

### 3. Initialize Prisma
After installing all the dependencies in package.json file through the above command, run the following commands
``` bash
npx prisma migrate dev --name init
npx tsx prisma/seed.ts
```

You can check the database and tables in any db client like HeidiSQL or DBeaver.
The authentication details are in the docker-compose.yml file, which are as follows:
      POSTGRES_USER: postgres       # Username for PostgreSQL
      POSTGRES_PASSWORD: password   # Password for PostgreSQL
      POSTGRES_DB: invoicedb 

Inside the database, go to public and then tables and you will find the User and Invoice Tables

### 4. Run the Backend Server
Finally, run the backend app while in the backend folder using the following command
```bash
cd <your-project-folder>/atlametrics1/backend
npm start run

```
### 5. Download the required node dependencies for the frontend web application

Now, switch to frontend directory navigate to the `frontend` directory 
```bash
cd <your-project-folder>/atlametrics1/frontend
```
Install the required dependencies using the following command
```bash
npm install
```
### 6. Run the Web Application
Finally, start the frontend server:
```bash
npm run dev
```
By default, the application is hosted in http://localhost:5143



