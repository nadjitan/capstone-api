/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `Telemetry` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Telemetry_uuid_key" ON "Telemetry"("uuid");
