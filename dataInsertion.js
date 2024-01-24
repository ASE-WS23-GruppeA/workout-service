const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs').promises;
const path = require('path');

async function main() {
    const workoutsData = await fs.readFile(path.join(__dirname, 'workoutsData.json'), 'utf-8');
    const workouts = JSON.parse(workoutsData);

    for (const workout of workouts) {
        const createdWorkout = await prisma.workouts.create({
            data: {
                workoutID: workout.workoutID,
                userID: workout.userID,
                workoutName: workout.workoutName,
                createdDate: new Date(workout.createdDate),
                workout_sets: {
                    create: workout.workout_sets.map(set => ({
                        workoutSetsID: set.workoutSetsID,
                        exerciseID: set.exerciseID,
                        reps: set.reps,
                        weights: set.weights
                    }))
                }
            }
        });

        console.log(`Inserted workout with ID: ${createdWorkout.workoutID}`);
    }
}

main()
    .catch(e => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    });
