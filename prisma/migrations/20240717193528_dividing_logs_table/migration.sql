/*
  Warnings:

  - You are about to drop the `logs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "logs";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "logsLogin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "loginDate" TEXT NOT NULL,
    "loginHour" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "logsLoguts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "logoutDate" TEXT NOT NULL,
    "logoutHour" TEXT NOT NULL
);
