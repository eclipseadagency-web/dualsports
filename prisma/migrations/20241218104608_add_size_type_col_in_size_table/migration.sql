/*
  Warnings:

  - Added the required column `size_type` to the `Size` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SizeType" AS ENUM ('clothing', 'kids', 'shoes');

-- AlterTable
ALTER TABLE "Size" ADD COLUMN     "size_type" "SizeType" NOT NULL;
