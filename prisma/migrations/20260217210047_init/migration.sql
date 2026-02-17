/*
  Warnings:

  - A unique constraint covering the columns `[id,authorId]` on the table `questions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `questions_id_authorId_key` ON `questions`(`id`, `authorId`);
