/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('none', 'inProgress', 'complete', 'bad', 'wait');

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Game" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'none',
    "gameSeriesId" BIGINT NOT NULL,
    "themeId" BIGINT,
    "statsId" BIGINT,
    "showcaseId" BIGINT,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameStats" (
    "id" BIGSERIAL NOT NULL,
    "duration" INTEGER NOT NULL,
    "episodesCount" INTEGER NOT NULL,

    CONSTRAINT "GameStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameSeries" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "GameSeries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Theme" (
    "id" BIGSERIAL NOT NULL,
    "coverart" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "Theme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Showcase" (
    "id" BIGINT NOT NULL,

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
ALTER TABLE "Game" ADD CONSTRAINT "Game_gameSeriesId_fkey" FOREIGN KEY ("gameSeriesId") REFERENCES "GameSeries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "Theme"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_statsId_fkey" FOREIGN KEY ("statsId") REFERENCES "GameStats"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_showcaseId_fkey" FOREIGN KEY ("showcaseId") REFERENCES "Showcase"("id") ON DELETE SET NULL ON UPDATE CASCADE;
