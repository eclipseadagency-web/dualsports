/*
  Warnings:

  - You are about to drop the column `price` on the `ProductVariation` table. All the data in the column will be lost.
  - Added the required column `regular_price` to the `ProductVariation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sale_price` to the `ProductVariation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductVariation" DROP COLUMN "price",
ADD COLUMN     "regular_price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "sale_price" DOUBLE PRECISION NOT NULL;
