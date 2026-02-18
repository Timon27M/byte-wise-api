/*
  Warnings:

  - You are about to alter the column `category` on the `questions` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - A unique constraint covering the columns `[text]` on the table `questions` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `questions` MODIFY `category` ENUM('JAVASCRIPT', 'NETWORK', 'REACT', 'REST') NOT NULL DEFAULT 'REST';

-- CreateIndex
CREATE UNIQUE INDEX `questions_text_key` ON `questions`(`text`);
