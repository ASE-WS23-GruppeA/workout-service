const { PrismaClient } = require('@prisma/client');
const workoutService = require('../workoutService');

jest.mock('@prisma/client', () => {
  const originalModule = jest.requireActual('@prisma/client');

  // Mock the entire PrismaClient with a custom implementation
  return {
    ...originalModule,
    PrismaClient: jest.fn().mockImplementation(() => ({
      workouts: {
        create: jest.fn(),
      },
    })),
  };
});


const prisma = new PrismaClient();

describe('setWorkoutHandler', () => {
  // Mock response object
  let mockRes;

  beforeEach(() => {
    prisma.workouts.create.mockClear();
    mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  it('should create a new workout successfully', async () => {
    // Mock request object
    const mockReq = {
      body: {
        userID: 1,
        workoutName: 'Morning Run',
      },
    };

    // Mock implementation of prisma.workouts.create
    prisma.workouts.create.mockResolvedValue({
      workoutID: 1,
      ...mockReq.body,
      createdDate: new Date(),
    });

    await workoutService.setWorkoutHandler(mockReq, mockRes);

    expect(prisma.workouts.create).toHaveBeenCalledWith({
      data: mockReq.body,
    });
    expect(mockRes.json).toHaveBeenCalledWith(expect.any(Object));
    expect(mockRes.status).not.toHaveBeenCalledWith(500);
  });
});