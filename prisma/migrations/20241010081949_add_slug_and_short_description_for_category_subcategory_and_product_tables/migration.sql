/*
  Warnings:

  - Added the required column `short_description` to the `Category` table without a default value. This is not possible if the table is not empty.
  - The required column `slug` was added to the `Category` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `short_description` to the `Product` table without a default value. This is not possible if the table is not empty.
  - The required column `slug` was added to the `Product` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `short_description` to the `SubCategory` table without a default value. This is not possible if the table is not empty.
  - The required column `slug` was added to the `SubCategory` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "short_description" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "short_description" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SubCategory" ADD COLUMN     "short_description" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL;
