/*
  Warnings:

  - You are about to drop the column `uuid` on the `Telemetry` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Telemetry_uuid_key";

-- AlterTable
ALTER TABLE "Telemetry" DROP COLUMN "uuid";
