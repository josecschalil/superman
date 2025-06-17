-- CreateTable
CREATE TABLE "Downloads" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "presetId" TEXT,

    CONSTRAINT "Downloads_pkey" PRIMARY KEY ("id")
);
