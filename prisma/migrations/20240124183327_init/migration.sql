-- CreateTable
CREATE TABLE "workouts" (
    "workoutID" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "workoutName" TEXT NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "workouts_pkey" PRIMARY KEY ("workoutID")
);

-- CreateTable
CREATE TABLE "workout_sets" (
    "workoutSetsID" SERIAL NOT NULL,
    "workoutID" INTEGER NOT NULL,
    "exerciseID" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "weights" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "workout_sets_pkey" PRIMARY KEY ("workoutSetsID")
);

-- AddForeignKey
ALTER TABLE "workout_sets" ADD CONSTRAINT "workout_sets_workoutID_fkey" FOREIGN KEY ("workoutID") REFERENCES "workouts"("workoutID") ON DELETE RESTRICT ON UPDATE CASCADE;
