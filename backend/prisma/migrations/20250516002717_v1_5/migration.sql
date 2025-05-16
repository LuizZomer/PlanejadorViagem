/*
  Warnings:

  - The primary key for the `user_preferences` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `external_id` on the `user_preferences` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `user_preferences` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user_preferences" (
    "user_id" INTEGER NOT NULL,
    "preferences_id" INTEGER NOT NULL,

    PRIMARY KEY ("user_id", "preferences_id"),
    CONSTRAINT "user_preferences_preferences_id_fkey" FOREIGN KEY ("preferences_id") REFERENCES "Preferences" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "user_preferences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_user_preferences" ("preferences_id", "user_id") SELECT "preferences_id", "user_id" FROM "user_preferences";
DROP TABLE "user_preferences";
ALTER TABLE "new_user_preferences" RENAME TO "user_preferences";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
