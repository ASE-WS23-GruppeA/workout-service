/*
  Warnings:

  - You are about to drop the `workout` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `workoutSet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "workoutSet" DROP CONSTRAINT "workoutSet_workoutID_fkey";

-- DropTable
DROP TABLE "workout";

-- DropTable
DROP TABLE "workoutSet";

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
