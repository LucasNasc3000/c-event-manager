/*
  Warnings:

  - Added the required column `password` to the `employees` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "AdminLogin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "admin_user" TEXT NOT NULL,
    "admin_password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UserLogin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_email" TEXT NOT NULL,
    "user_password" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_employees" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_employees" ("created_at", "email", "id", "name") SELECT "created_at", "email", "id", "name" FROM "employees";
DROP TABLE "employees";
ALTER TABLE "new_employees" RENAME TO "employees";
CREATE UNIQUE INDEX "employees_email_key" ON "employees"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
