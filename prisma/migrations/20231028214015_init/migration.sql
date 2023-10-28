-- CreateTable
CREATE TABLE "workout" (
    "workoutID" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "workoutName" TEXT NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "workout_pkey" PRIMARY KEY ("workoutID")
);

-- CreateTable
CREATE TABLE "workoutSet" (
    "workoutSetsID" SERIAL NOT NULL,
    "workoutID" INTEGER NOT NULL,
    "exersiceID" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "weights" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "workoutSet_pkey" PRIMARY KEY ("workoutSetsID")
);

-- AddForeignKey
ALTER TABLE "workoutSet" ADD CONSTRAINT "workoutSet_workoutID_fkey" FOREIGN KEY ("workoutID") REFERENCES "workout"("workoutID") ON DELETE RESTRICT ON UPDATE CASCADE;
