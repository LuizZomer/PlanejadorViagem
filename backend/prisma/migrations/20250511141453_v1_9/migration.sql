-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_plans" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "external_id" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "spendingLevel" TEXT NOT NULL,
    "hosting" TEXT,
    "latitude" DECIMAL NOT NULL,
    "longitude" DECIMAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "plans_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_plans" ("country", "description", "destination", "endDate", "external_id", "hosting", "id", "latitude", "longitude", "spendingLevel", "startDate", "user_id") SELECT "country", "description", "destination", "endDate", "external_id", "hosting", "id", "latitude", "longitude", "spendingLevel", "startDate", "user_id" FROM "plans";
DROP TABLE "plans";
ALTER TABLE "new_plans" RENAME TO "plans";
CREATE UNIQUE INDEX "plans_external_id_key" ON "plans"("external_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
