/*
  Warnings:

  - You are about to drop the column `plan_id` on the `tourist_spots` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tourist_spots" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "external_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "latitude" DECIMAL NOT NULL,
    "longitude" DECIMAL NOT NULL,
    "photo_path" TEXT,
    "tripDayId" INTEGER,
    CONSTRAINT "tourist_spots_tripDayId_fkey" FOREIGN KEY ("tripDayId") REFERENCES "trip_days" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_tourist_spots" ("description", "external_id", "id", "latitude", "longitude", "name", "photo_path", "tripDayId") SELECT "description", "external_id", "id", "latitude", "longitude", "name", "photo_path", "tripDayId" FROM "tourist_spots";
DROP TABLE "tourist_spots";
ALTER TABLE "new_tourist_spots" RENAME TO "tourist_spots";
CREATE UNIQUE INDEX "tourist_spots_external_id_key" ON "tourist_spots"("external_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
