import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction(async (tx) => {
    const hashPassword = bcrypt.hashSync("saad", 12);
    await tx.superAdmin.create({
      data: {
        name: "saad",
        email: "saad1101shaikh@gmail.com",
        password: hashPassword,
      },
    });
    await tx.permissions.createMany({
      data: [
        {
          name: "permission01",
        },
        {
          name: "permission02",
        },
        {
          name: "permission03",
        },
      ],
    });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    // process.exit(1);
  });
