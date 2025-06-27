-- CreateEnum
CREATE TYPE "Status" AS ENUM ('none', 'inProgress', 'complete', 'bad', 'wait');

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'none',
    "gameSeriesId" INTEGER,
    "themeId" INTEGER,
    "statsId" INTEGER,
    "showcaseId" INTEGER,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameStats" (
    "id" SERIAL NOT NULL,
    "duration" INTEGER NOT NULL,
    "episodesCount" INTEGER NOT NULL,

    CONSTRAINT "GameStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameSeries" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "GameSeries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Theme" (
    "id" SERIAL NOT NULL,
    "coverart" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "Theme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Showcase" (
    "id" INTEGER NOT NULL,

    CONSTRAINT "Showcase_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Game_statsId_key" ON "Game"("statsId");

-- CreateIndex
CREATE INDEX "Game_gameSeriesId_idx" ON "Game"("gameSeriesId");

-- CreateIndex
CREATE INDEX "Game_themeId_idx" ON "Game"("themeId");

-- CreateIndex
CREATE INDEX "Game_statsId_idx" ON "Game"("statsId");

-- CreateIndex
CREATE INDEX "Game_showcaseId_idx" ON "Game"("showcaseId");

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_gameSeriesId_fkey" FOREIGN KEY ("gameSeriesId") REFERENCES "GameSeries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "Theme"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_statsId_fkey" FOREIGN KEY ("statsId") REFERENCES "GameStats"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_showcaseId_fkey" FOREIGN KEY ("showcaseId") REFERENCES "Showcase"("id") ON DELETE SET NULL ON UPDATE CASCADE;
