-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "technologies" SET DEFAULT ARRAY[]::TEXT[];
