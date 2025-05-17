-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_organization_users" (
    "organization_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    PRIMARY KEY ("user_id", "organization_id"),
    CONSTRAINT "organization_users_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "organization_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_organization_users" ("organization_id", "user_id") SELECT "organization_id", "user_id" FROM "organization_users";
DROP TABLE "organization_users";
ALTER TABLE "new_organization_users" RENAME TO "organization_users";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
