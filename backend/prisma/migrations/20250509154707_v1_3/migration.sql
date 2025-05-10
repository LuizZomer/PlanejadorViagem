/*
  Warnings:

  - You are about to drop the column `name` on the `user_preferences` table. All the data in the column will be lost.
  - Added the required column `preferencesId` to the `user_preferences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `user_preferences` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Preferences" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "external_id" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user_preferences" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "external_id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "preferencesId" INTEGER NOT NULL,
    CONSTRAINT "user_preferences_preferencesId_fkey" FOREIGN KEY ("preferencesId") REFERENCES "Preferences" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "user_preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_user_preferences" ("external_id", "id") SELECT "external_id", "id" FROM "user_preferences";
DROP TABLE "user_preferences";
ALTER TABLE "new_user_preferences" RENAME TO "user_preferences";
CREATE UNIQUE INDEX "user_preferences_external_id_key" ON "user_preferences"("external_id");
CREATE TABLE "new_users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "external_id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userPreferencesId" INTEGER NOT NULL
);
INSERT INTO "new_users" ("email", "external_id", "id", "password", "userPreferencesId", "username") SELECT "email", "external_id", "id", "password", "userPreferencesId", "username" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_external_id_key" ON "users"("external_id");
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Preferences_external_id_key" ON "Preferences"("external_id");
