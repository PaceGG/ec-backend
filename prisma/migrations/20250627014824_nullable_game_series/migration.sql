-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_gameSeriesId_fkey";

-- AlterTable
ALTER TABLE "Game" ALTER COLUMN "gameSeriesId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_gameSeriesId_fkey" FOREIGN KEY ("gameSeriesId") REFERENCES "GameSeries"("id") ON DELETE SET NULL ON UPDATE CASCADE;
