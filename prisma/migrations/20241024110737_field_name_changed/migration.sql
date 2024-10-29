/*
  Warnings:

  - You are about to drop the column `pass` on the `SuperAdmin` table. All the data in the column will be lost.
  - Added the required column `password` to the `SuperAdmin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SuperAdmin" RENAME COLUMN "pass" TO "password";
