/*
  Warnings:

  - You are about to drop the column `bar_code` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `sku` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sku]` on the table `ProductVariation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[bar_code]` on the table `ProductVariation` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "bar_code",
DROP COLUMN "sku";

-- AlterTable
ALTER TABLE "ProductVariation" ADD COLUMN     "bar_code" TEXT,
ADD COLUMN     "sku" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "ProductVariation_sku_key" ON "ProductVariation"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "ProductVariation_bar_code_key" ON "ProductVariation"("bar_code");
