-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_logs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "loginDate" TEXT NOT NULL,
    "loginHour" TEXT NOT NULL,
    "logoutDate" TEXT NOT NULL,
    "logoutHour" TEXT NOT NULL
);
INSERT INTO "new_logs" ("email", "id", "loginDate", "loginHour", "logoutDate", "logoutHour") SELECT "email", "id", "loginDate", "loginHour", "logoutDate", "logoutHour" FROM "logs";
DROP TABLE "logs";
ALTER TABLE "new_logs" RENAME TO "logs";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
