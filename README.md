
# General Notes
Before Running with Docker Compose
Ensure that the Docker service is running on your system:

Windows/Mac: Launch Docker Desktop and ensure it is active.
Linux: Run sudo systemctl start docker to start the Docker service if it is not already running.
Ensure that node with version atleast 20 is installed in the system.


## Running with Docker Compose
To run the database and backend services using Docker Compose:
```bash
docker-compose up --build
```

After starting the backend, manually run the following in the `backend` directory:
```bash
npx prisma migrate dev --name init
npx tsx prisma/seed.ts
npm start run
```

Then navigate to the `frontend` directory and start the frontend server:
```bash
npm run dev
```

Alternately you can open Git Bash and navigate to the root folder and run the automatic script which does all the above steps in one-go:
But before that check the permissions on the file run.sh and change their permission to include execute permission to everyone using any command like chmod + x run.sh or something that works on your OS.
Later, run the following command.
```bash
./run.sh
```

