-- AlterTable: Add CHECK constraint to ensure technologies array is not empty
ALTER TABLE "Project" ADD CONSTRAINT "Project_technologies_not_empty" CHECK (array_length("technologies", 1) > 0);
