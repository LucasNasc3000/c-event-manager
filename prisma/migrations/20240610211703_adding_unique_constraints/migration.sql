/*
  Warnings:

  - A unique constraint covering the columns `[admin_user]` on the table `AdminLogin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_email]` on the table `UserLogin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `employees` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AdminLogin_admin_user_key" ON "AdminLogin"("admin_user");

-- CreateIndex
CREATE UNIQUE INDEX "UserLogin_user_email_key" ON "UserLogin"("user_email");

-- CreateIndex
CREATE UNIQUE INDEX "employees_name_key" ON "employees"("name");
