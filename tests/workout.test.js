const { createWorkout } = require('./workoutController');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

jest.mock(prisma);

describe('createWorkout', () => {
  it('should create a workout and return the created workout', async () => {
    const mockWorkout = { id: '111111', workoutName: 'Test', workout_sets: [] };
    await prisma.workouts.create.mockResolvedValue(mockWorkout);

    const result = await createWorkout(mockWorkout);

    expect(prisma.workouts.create).toHaveBeenCalledWith(mockWorkout);
    expect(result).toEqual(mockWorkout);
  });
});