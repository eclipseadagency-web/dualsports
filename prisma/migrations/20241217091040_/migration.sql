/*
  Warnings:

  - You are about to drop the column `colorId` on the `ProductVariation` table. All the data in the column will be lost.
  - You are about to drop the `Color` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `color` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductVariation" DROP CONSTRAINT "ProductVariation_colorId_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "color" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProductVariation" DROP COLUMN "colorId";

-- DropTable
DROP TABLE "Color";
