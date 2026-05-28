/*
  Warnings:

  - A unique constraint covering the columns `[title,authorId]` on the table `categories` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "categories_title_key";

-- CreateIndex
CREATE UNIQUE INDEX "categories_title_authorId_key" ON "categories"("title", "authorId");
