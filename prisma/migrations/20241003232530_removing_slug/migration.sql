/*
  Warnings:

  - You are about to drop the column `slug` on the `events` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_events" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "event_creator" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "hour" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "hosts" TEXT NOT NULL,
    "modality" TEXT NOT NULL,
    "location" TEXT,
    "plattform" TEXT,
    "event_creator_id" TEXT NOT NULL,
    CONSTRAINT "events_event_creator_id_fkey" FOREIGN KEY ("event_creator_id") REFERENCES "employees" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_events" ("date", "event_creator", "event_creator_id", "hosts", "hour", "id", "location", "modality", "name", "plattform") SELECT "date", "event_creator", "event_creator_id", "hosts", "hour", "id", "location", "modality", "name", "plattform" FROM "events";
DROP TABLE "events";
ALTER TABLE "new_events" RENAME TO "events";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
