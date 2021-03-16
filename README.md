## About
Simple to-do list to capture everyday tasks.

## How To Run
You would need a few tools installed in your system to run this app. I will detail everything, so that the process is smooth for you.

Please make sure you have installed:
- **Docker** - The container management system. You can install docker from https://www.docker.com/. It required to be installed globally.
- **NodeJS** - Along with it npm (download [here](https://nodejs.org/en/)).

## Running Docker-Compose
Either run app separately using command ```npm start``` and then interact with the application or use docker-compose to run the app. All you need to do is to navigate to the root of the application and run ```docker-compose up -d --build``` and it will spin up service.

After a few minutes if you ```docker ps``` you should see running containers.

Now you have web app running that you can access with the server's url ```localhost:3000```

## Supported Browsers
Tested on Chrome only.

## Tests
Tests can be run locally:
```npm test```

## Directory Structure
Skeleton of the app:

```bash
├── checklist
│   └── src
│   |   ├── __tests__
│   |   ├── pages
│   |   |   ├── body
│   |   |   ├── context
│   |   |   ├── header
│   |   |   ├── nav         # left navigation
│   |   |   ├── store
│   |   |   ├── task
│   |   |   ├── style.js
│   |   |   └── index.js
│   |   ├── App.js
│   |   ├── index.js        # entry point
│   |   └── setupTests.js   # configure Enzyme for testing
│   ├── .dockerignore
│   ├── .eslintrc.js
│   ├── .gitignore
│   ├── docker-compose.yml
│   ├── Dockerfile
│   ├── package.json
│   └── README.md
```