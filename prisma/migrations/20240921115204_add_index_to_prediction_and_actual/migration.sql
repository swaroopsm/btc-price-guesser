-- AlterTable
ALTER TABLE "Guess" ALTER COLUMN "actual" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Guess_prediction_actual_idx" ON "Guess"("prediction", "actual");
