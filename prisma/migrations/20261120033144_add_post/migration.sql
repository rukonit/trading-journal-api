/*
  Warnings:

  - You are about to drop the column `date` on the `Trade` table. All the data in the column will be lost.
  - You are about to drop the column `grossProceeds` on the `Trade` table. All the data in the column will be lost.
  - You are about to drop the column `netProceeds` on the `Trade` table. All the data in the column will be lost.
  - You are about to drop the column `side` on the `Trade` table. All the data in the column will be lost.
  - Added the required column `commission` to the `Trade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `commodityType` to the `Trade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventType` to the `Trade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `executedAt` to the `Trade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fee` to the `Trade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `source` to the `Trade` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CommodityType" AS ENUM ('EQUITY', 'OPTION', 'FUTURE', 'FOREX', 'CRYPTO');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('SELL', 'SHORT', 'COVER', 'DIVIDEND', 'INTEREST', 'FEE', 'DEPOSIT', 'WITHDRAWAL');

-- AlterTable
ALTER TABLE "Trade" DROP COLUMN "date",
DROP COLUMN "grossProceeds",
DROP COLUMN "netProceeds",
DROP COLUMN "side",
ADD COLUMN     "commission" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "commodityType" "CommodityType" NOT NULL,
ADD COLUMN     "eventType" "EventType" NOT NULL,
ADD COLUMN     "executedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "fee" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "source" TEXT NOT NULL;
