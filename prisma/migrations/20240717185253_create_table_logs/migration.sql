-- CreateTable
CREATE TABLE "logs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "loginDate" DATETIME NOT NULL,
    "loginHour" DATETIME NOT NULL,
    "logoutDate" DATETIME NOT NULL,
    "logoutHour" DATETIME NOT NULL
);
