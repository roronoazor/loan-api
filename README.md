# Loan API

This is a demo loan API application built using NestJS and TypeORM.

## Getting Started

Follow the instructions below to set up and run the application.

### Prerequisites

- Git
- Node.js
- Postgres 13
- Docker (optional)

### Installation

1. Clone the repository from GitHub:

git clone https://github.com/roronoazor/loan-api.git


2. Install the dependencies:

npm install


### Database Setup

1. If you don't have Postgres installed on your machine, you can use Docker to run a Postgres container. Run the following command to start the container:

docker compose up dev-db -d

2. Create a `.env` file at the root of the project. You can use the `.env.example` file as a template. Replace the values of each key with your own environment variables. If you are using the Docker Postgres database, make sure to set the `DB_PORT` value to `5434` as the Docker Compose file uses port forwarding.

3. Run the following command to run the migrations:

npm run typeorm:run-migrations


If you encounter any errors, delete any previous migrations from the `migrations` folder, generate new migrations using the command `npm run typeorm:generate-migration`, move any generated migrations into the `migrations` folder, and then try running `npm run typeorm:run-migrations` again.

4. Check your database to ensure that all the entities defined have their tables respectively.

### Running the Application

Run the following command to start the development server on port 5000:

npm run start:dev


Note that the port 5000 is hard coded, which is not ideal. A suggestion would be that the port for the application should be specified in the `.env` file.

### Documentation

Once the application has launched, you can access the swagger documentation by going to http://localhost:5000/docs#/ in your web browser.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- This project was created as an assessment for a job application.
