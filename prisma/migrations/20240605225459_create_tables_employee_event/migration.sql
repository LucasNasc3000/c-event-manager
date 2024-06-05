-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "event_creator" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "hour" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "hosts" TEXT NOT NULL,
    "modality" TEXT NOT NULL,
    "location" TEXT,
    "plattform" TEXT,
    "slug" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "employees" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "event_creator_id" TEXT NOT NULL,
    CONSTRAINT "employees_event_creator_id_fkey" FOREIGN KEY ("event_creator_id") REFERENCES "events" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "events_slug_key" ON "events"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "employees_event_creator_id_email_key" ON "employees"("event_creator_id", "email");
