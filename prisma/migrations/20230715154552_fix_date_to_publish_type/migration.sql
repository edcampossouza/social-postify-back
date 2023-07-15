/*
  Warnings:

  - Changed the type of `dateToPublish` on the `Publication` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Publication" DROP COLUMN "dateToPublish",
ADD COLUMN     "dateToPublish" TIMESTAMP(3) NOT NULL;
