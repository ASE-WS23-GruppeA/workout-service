# Workouts Service Documentation

This documentation provides information about the "Workouts Service" microservice, which allows users to manage their workouts and exercise sets.

## Table of Contents

- [Installation](#installation)
- [Database Configuration](#database-configuration)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Examples](#examples)

## Installation

To run the "Workouts Service," follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/ASE-WS23-GruppeA/workout-service.git
   ```
2. Change to the project directory:
    ```bash
   cd workouts-service
   ```
3. Install the required dependencies:
    ```bash
    npm install
    ```
4. Start the server:
    ```bash
    npm run devStart
    ```
The service should now be accessible at http://localhost:3000 by default.

## Database and Prisma Configuration

The "Workouts Service" uses a PostgreSQL database for storing workout and exercise set data, and it utilizes Prisma as an ORM (Object-Relational Mapping) tool. Follow these steps to configure the database and Prisma:

### Database Setup

1. Ensure you have PostgreSQL installed and running on your system.

2. Create a database named "workouts" in PostgreSQL. This can typically be done using a PostgreSQL command line tool or a GUI tool like pgAdmin.

3. Create a `.env` file in the project directory.

4. Add the following configuration to the `.env` file with your PostgreSQL database connection URL:
    ```env
    DATABASE_URL=your_postgresql_database_url_here
    ```
   Replace `your_postgresql_database_url_here` with the actual URL for your PostgreSQL database. The URL usually follows the format: `postgresql://username:password@localhost:5432/workouts`

5. Save the `.env` file.

### Prisma Configuration

1. Generate Prisma Client, which is used to access your database in your code:
    ```
    npx prisma generate
    ```

2. Create and apply a new migration to your database. This will set up the initial schema as defined in `schema.prisma`:
    ```
    npx prisma migrate dev --name init
    ```

6. After running the migration, verify that the tables have been created in your "workouts" database.


## API Endpoints

The "Workouts Service" provides the following API endpoints:

- `POST /workouts`: Create a new workout with exercise sets.
- `GET /workouts/user/:userID`: Retrieve all workouts for a specific user.
- `GET /workouts/last/:userID`: Retrieve the last workout for a specific user.
- `GET /workouts/user/:userID/:workoutName`: Retrieve a specific workout by name for a user.
- `DELETE /workouts/:workoutID`: Delete a workout and its associated sets by workout ID.

## Usage

To use the "Workouts Service," make HTTP requests to the provided API endpoints as described in the API documentation. Here's a high-level overview of how to use the service:

1. **Create a Workout**: To create a new workout with exercise sets, make a POST request to the `/workouts` endpoint with a JSON request body containing the user's ID, workout name, and exercise sets.

2. **Retrieve Workouts**: To retrieve workouts for a specific user, you can make a GET request to the `/workouts/user/:userID` endpoint, where `:userID` is the user's ID.

3. **Retrieve the Last Workout**: To retrieve the last workout for a specific user, make a GET request to the `/workouts/last/:userID` endpoint, specifying the user's ID.

4. **Retrieve a Specific Workout by Name**: To retrieve a specific workout by name for a user, make a GET request to the `/workouts/user/:userID/:workoutName` endpoint, providing the user's ID and the workout name.

5. **Delete a Workout**: To delete a workout and its associated sets, make a DELETE request to the `/workouts/:workoutID` endpoint, where `:workoutID` is the workout's unique identifier.

You can interact with the service using your preferred API client (e.g., Insomnia, Postman) or by integrating it into your web application.

## Examples

### Create a Workout

To create a new workout, make a POST request to the `/workouts` endpoint with the following JSON request body:

```json
{
  "userID": 1,
  "workoutName": "Chest Day",
  "workoutSets": [
    { "exerciseID": 1, "reps": 12, "weights": 60 },
    { "exerciseID": 2, "reps": 10, "weights": 50 }
  ]
}
```
This request creates a workout named "Chest Day" for user ID 1 with two exercise sets.

### Retrieve All Workouts for a User

To retrieve all workouts for a specific user (e.g., user ID 1), make a GET request to the `/workouts/user/1` endpoint.

### Retrieve the Last Workout for a User

To retrieve the last workout for a specific user (e.g., user ID 2), make a GET request to the `/workouts/last/2` endpoint.

### Retrieve a Specific Workout by Name

To retrieve a specific workout by name for a user (e.g., user ID 3 and workout name "Leg Day"), make a GET request to the `/workouts/user/3/Leg%20Day` endpoint.

### Delete a Workout

To delete a workout and its associated sets, make a DELETE request to the `/workouts/:workoutID` endpoint, where `:workoutID` is the workout's unique identifier.

These examples demonstrate how to perform common actions using the "Workouts Service" API endpoints. You can use these as a reference for interacting with the service.