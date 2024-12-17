/*
  Warnings:

  - Added the required column `password` to the `Admins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role_id` to the `Admins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `super_admin_id` to the `Admins` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RolePermissions" DROP CONSTRAINT "RolePermissions_role_id_fkey";

-- AlterTable
ALTER TABLE "Admins" ADD COLUMN     "password" VARCHAR NOT NULL,
ADD COLUMN     "role_id" VARCHAR NOT NULL,
ADD COLUMN     "super_admin_id" VARCHAR NOT NULL,
ALTER COLUMN "address" SET DATA TYPE VARCHAR;

-- AlterTable
ALTER TABLE "Roles" ADD COLUMN     "admin_id" VARCHAR,
ADD COLUMN     "is_primary" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Users" (
    "user_id" TEXT NOT NULL,
    "admin_id" VARCHAR NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "email" VARCHAR(30) NOT NULL,
    "password" VARCHAR NOT NULL,
    "role_id" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("user_id")
);

-- AddForeignKey
ALTER TABLE "Admins" ADD CONSTRAINT "Admins_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Roles"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admins" ADD CONSTRAINT "Admins_super_admin_id_fkey" FOREIGN KEY ("super_admin_id") REFERENCES "SuperAdmin"("super_admin_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "RolePermissions" ADD CONSTRAINT "RolePermissions_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Roles"("role_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "Admins"("admin_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Roles"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;
