-- CreateTable
CREATE TABLE "presetPack" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageLink1" TEXT,
    "imageLink2" TEXT,
    "imageLink3" TEXT,
    "imageLink4" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "discountedPrice" DOUBLE PRECISION,
    "downloadLink" TEXT NOT NULL,
    "thumbnailLink" TEXT NOT NULL,

    CONSTRAINT "presetPack_pkey" PRIMARY KEY ("id")
);
