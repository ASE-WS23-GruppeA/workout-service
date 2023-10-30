const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT;

// Middleware to parse JSON in request bodies
app.use(express.json());

// Create a new workout
app.post('/workouts', async (req, res) => {
    try {
        // Get workout data from the request body
        const { userID, workoutName, workoutSets } = req.body;

        // Create the workout in the database
        const workout = await prisma.workouts.create({
            data: {
                userID,
                workoutName,
                workout_sets: {
                    create: workoutSets, // workoutSets is an array of objects
                },
            },
        });

        res.json(workout);
    } catch (error) {
        console.error('Error creating workout:', error);
        res.status(500).json({ error: 'Failed to create workout' });
    }
});

// Retrieve a specific workout by its ID
app.get('/workouts/:workoutID', async (req, res) => {
    try {
        const workoutID = parseInt(req.params.workoutID);

        // Query the database to find the workout by ID and include its workoutSets
        const workout = await prisma.workouts.findUnique({
            where: { workoutID },
            include: { workout_sets: true },
        });

        if (workout) {
            res.json(workout);
        } else {
            res.status(404).json({ error: 'Workout not found' });
        }
    } catch (error) {
        console.error('Error fetching workout:', error);
        res.status(500).json({ error: 'Failed to fetch workout' });
    }
});

// Retrieve all workouts associated with the specified user
app.get('/workouts/user/:userID', async (req, res) => {
    try {
        const userID = parseInt(req.params.userID);

        // Query the database to find all workouts associated with the specified user
        const workouts = await prisma.workouts.findMany({
            where: { userID },
            include: { workout_sets: true },
        });

        res.json(workouts);
    } catch (error) {
        console.error('Error fetching user workouts:', error);
        res.status(500).json({ error: 'Failed to fetch user workouts' });
    }
});

// Retrieve the last workout associated with the specified user
app.get('/workouts/last/:userID', async (req, res) => {
    try {
        const userID = parseInt(req.params.userID);

        // Query the database to find the last workout associated with the specified user
        const lastWorkout = await prisma.workouts.findFirst({
            where: { userID },
            orderBy: { createdDate: 'desc' }, // Order by createdDate in descending order to get the latest workout
            include: { workout_sets: true },
        });

        if (lastWorkout) {
            res.json(lastWorkout);
        } else {
            res.status(404).json({ error: 'No workouts found for the user' });
        }
    } catch (error) {
        console.error('Error fetching last workout:', error);
        res.status(500).json({ error: 'Failed to fetch last workout' });
    }
});

// Retrieve the workout with the specified name associated with the specified user 
app.get('/workouts/user/:userID/:workoutName', async (req, res) => {
    try {
        const userID = parseInt(req.params.userID);
        const workoutName = req.params.workoutName;

        // Query the database to find the workout with the specified name associated with the specified user
        const workout = await prisma.workouts.findFirst({
            where: { userID, workoutName },
            include: { workout_sets: true },
        });

        if (workout) {
            res.json(workout);
        } else {
            res.status(404).json({ error: 'Workout not found for the user' });
        }
    } catch (error) {
        console.error('Error fetching workout by name:', error);
        res.status(500).json({ error: 'Failed to fetch workout by name' });
    }
});

// Delete a specific workout and its associated workoutSets
app.delete('/workouts/:workoutID', async (req, res) => {
    try {
        const workoutID = parseInt(req.params.workoutID);

        // Delete the workout and associated workoutSets in a transaction
        await prisma.$transaction([
            prisma.workout_sets.deleteMany({
                where: { workoutID },
            }),
            prisma.workouts.delete({
                where: { workoutID },
            })
        ]);

        res.json({ message: 'Workout and associated sets deleted successfully' });
    } catch (error) {
        console.error('Error deleting workout and associated sets:', error);
        res.status(500).json({ error: 'Failed to delete workout and associated sets' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});