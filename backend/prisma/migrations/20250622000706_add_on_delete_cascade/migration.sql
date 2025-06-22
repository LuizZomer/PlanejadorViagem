-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_trip_days" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "external_id" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "expense" TEXT NOT NULL,
    "weather" TEXT,
    "average_temp" DECIMAL,
    "plan_id" INTEGER NOT NULL,
    CONSTRAINT "trip_days_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "plans" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_trip_days" ("average_temp", "date", "expense", "external_id", "id", "plan_id", "weather") SELECT "average_temp", "date", "expense", "external_id", "id", "plan_id", "weather" FROM "trip_days";
DROP TABLE "trip_days";
ALTER TABLE "new_trip_days" RENAME TO "trip_days";
CREATE UNIQUE INDEX "trip_days_external_id_key" ON "trip_days"("external_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
