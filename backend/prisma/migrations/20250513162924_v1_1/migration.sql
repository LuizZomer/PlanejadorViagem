/*
  Warnings:

  - A unique constraint covering the columns `[external_id]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Organization_external_id_key" ON "Organization"("external_id");
