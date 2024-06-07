/*
  Warnings:

  - You are about to drop the column `event_creator_id` on the `employees` table. All the data in the column will be lost.
  - Added the required column `event_creator_id` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_employees" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_employees" ("created_at", "email", "id", "name") SELECT "created_at", "email", "id", "name" FROM "employees";
DROP TABLE "employees";
ALTER TABLE "new_employees" RENAME TO "employees";
CREATE UNIQUE INDEX "employees_email_key" ON "employees"("email");
CREATE TABLE "new_events" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "event_creator" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "hour" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "hosts" TEXT NOT NULL,
    "modality" TEXT NOT NULL,
    "location" TEXT,
    "plattform" TEXT,
    "slug" TEXT NOT NULL,
    "event_creator_id" TEXT NOT NULL,
    CONSTRAINT "events_event_creator_id_fkey" FOREIGN KEY ("event_creator_id") REFERENCES "employees" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_events" ("date", "event_creator", "hosts", "hour", "id", "location", "modality", "name", "plattform", "slug") SELECT "date", "event_creator", "hosts", "hour", "id", "location", "modality", "name", "plattform", "slug" FROM "events";
DROP TABLE "events";
ALTER TABLE "new_events" RENAME TO "events";
CREATE UNIQUE INDEX "events_slug_key" ON "events"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
