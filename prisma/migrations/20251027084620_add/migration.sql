-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "photoMimeType" TEXT;

-- AlterTable
ALTER TABLE "Plant" ALTER COLUMN "sortId" DROP NOT NULL;
