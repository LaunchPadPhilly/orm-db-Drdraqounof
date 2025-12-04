-- AlterTable: Remove CHECK constraint that was breaking queries
ALTER TABLE "Project" DROP CONSTRAINT IF EXISTS "Project_technologies_not_empty";
