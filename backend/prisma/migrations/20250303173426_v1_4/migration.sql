/*
  Warnings:

  - A unique constraint covering the columns `[external_id]` on the table `cities` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[external_id]` on the table `places` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[external_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "cities_external_id_key" ON "cities"("external_id");

-- CreateIndex
CREATE UNIQUE INDEX "places_external_id_key" ON "places"("external_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_external_id_key" ON "users"("external_id");
