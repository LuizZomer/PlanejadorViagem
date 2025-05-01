-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "external_id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "cities" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "external_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "spendingLevel" TEXT NOT NULL,
    "latitude" DECIMAL NOT NULL,
    "longitude" DECIMAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "cities_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "places" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "external_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "latitude" DECIMAL NOT NULL,
    "longitude" DECIMAL NOT NULL,
    "photo_path" TEXT,
    "city_id" INTEGER NOT NULL,
    CONSTRAINT "places_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_external_id_key" ON "users"("external_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "cities_external_id_key" ON "cities"("external_id");

-- CreateIndex
CREATE UNIQUE INDEX "places_external_id_key" ON "places"("external_id");
