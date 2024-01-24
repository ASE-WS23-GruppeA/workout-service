const express = require('express');
const workoutService = require('./workoutService');
const cors = require("cors");

const app = express();
const port = process.env.PORT;

// Middleware to parse JSON in request bodies
app.use(express.json());
app.use(cors());

// Create a new workout
app.post('/workouts/create', workoutService.setWorkoutHandler);

// Retrieve a specific workout by its ID
app.get('/workouts/:workoutID', workoutService.getWorkoutById);

// Retrieve all workouts associated with the specified user
app.get('/workouts/user/:userID', workoutService.getAllWorkoutsByUserId);

// Retrieve the last workout associated with the specified user
app.get('/workouts/last/:userID', workoutService.getLastWorkoutByUserId);

// Retrieve the workout with the specified name associated with the specified user 
app.get('/workouts/user/:userID/:workoutName', workoutService.getWorkoutByUserIdAndByWorkoutName);

// Delete a specific workout and its associated workoutSets
app.delete('/workouts/:workoutID', workoutService.deleteWorkoutById);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;