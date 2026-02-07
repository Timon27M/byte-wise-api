/*
  Warnings:

  - You are about to drop the `question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `question` DROP FOREIGN KEY `Question_authorId_fkey`;

-- DropTable
DROP TABLE `question`;

-- DropTable
DROP TABLE `user`;
