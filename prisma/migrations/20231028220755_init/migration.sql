/*
  Warnings:

  - You are about to drop the column `exersiceID` on the `workoutSet` table. All the data in the column will be lost.
  - Added the required column `exerciseID` to the `workoutSet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "workoutSet" DROP COLUMN "exersiceID",
ADD COLUMN     "exerciseID" INTEGER NOT NULL;
