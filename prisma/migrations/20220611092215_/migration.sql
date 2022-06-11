-- CreateTable
CREATE TABLE "Telemetry" (
    "id" STRING NOT NULL,
    "app" STRING NOT NULL,
    "uuid" STRING NOT NULL,
    "data" STRING NOT NULL,

    CONSTRAINT "Telemetry_pkey" PRIMARY KEY ("id")
);
