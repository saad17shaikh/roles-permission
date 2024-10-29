import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { ApiError } from "./ApiError";
// import type { Prisma } from "@prisma/client";

// export class SuperAdminPrismaOperation {
//   private prisma: PrismaClient;

//   constructor(prisma: PrismaClient) {
//     this.prisma = prisma;
//   }

//   async findFirst({
//     whereCondition,
//     select,
//   }: {
//     whereCondition: Prisma.SuperAdminWhereInput;
//     select?: Prisma.SuperAdminSelect;
//   }): Promise<Prisma.SuperAdminGetPayload<{ select?: typeof select }> | null> {
//     return await this.prisma.superAdmin.findFirst({
//       where: whereCondition,
//       select,
//     });
//   }

//   async findUnique({
//     whereCondition,
//     select,
//   }: {
//     whereCondition: Prisma.SuperAdminWhereUniqueInput;
//     select?: Prisma.SuperAdminSelect;
//   }): Promise<Prisma.SuperAdminGetPayload<{ select?: typeof select }> | null> {
//     return await this.prisma.superAdmin.findUnique({
//       where: whereCondition,
//       select,
//     });
//   }
// }
// Define the FindFirstResult type at the top
type FindFirstResult<T> = T | null;

export class BasePrismaOperation<
  Model extends keyof PrismaClient,
  WhereInput,
  Select,
  Result,
  CreateInput
> {
  protected prisma: PrismaClient;
  private model: Model;

  constructor(prisma: PrismaClient, model: Model) {
    this.prisma = prisma;
    this.model = model;
  }

  // Find First
  async findFirst({
    whereCondition,
    select,
  }: {
    whereCondition: WhereInput;
    select?: Select;
  }): Promise<FindFirstResult<Result>> {
    return await (this.prisma[this.model] as any).findFirst({
      where: whereCondition,
      select,
    });
  }
  // Create Data
  async create({ data, select }: { data: CreateInput; select?: Select }) {
    return await (this.prisma[this.model] as any).create({ data, select });
  }
  async createWithTransaction({
    data,
    select,
    tx,
  }: {
    data: CreateInput;
    select?: Select;
    tx: Omit<
      PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
      "$on" | "$connect" | "$disconnect" | "$use" | "$transaction" | "$extends"
    >;
  }): Promise<FindFirstResult<Result>> {
    return await (tx[this.model] as any).create({ data, select });
  }
}

export class SuperAdminOperation extends BasePrismaOperation<
  "superAdmin",
  Prisma.SuperAdminWhereInput,
  Prisma.SuperAdminSelect,
  Prisma.SuperAdminGetPayload<{}>,
  Prisma.SuperAdminCreateInput
> {
  constructor(prisma: PrismaClient) {
    super(prisma, "superAdmin");
  }
}

export class AdminOperation extends BasePrismaOperation<
  "admins",
  Prisma.AdminsWhereInput,
  Prisma.AdminsSelect,
  Prisma.AdminsGetPayload<{}>,
  Prisma.AdminsCreateInput
> {
  constructor(prisma: PrismaClient) {
    super(prisma, "admins");
  }
}

export class UserOperation extends BasePrismaOperation<
  "users",
  Prisma.UsersWhereInput,
  Prisma.UsersSelect,
  Prisma.UsersGetPayload<{}>,
  Prisma.UsersCreateInput
> {
  constructor(prisma: PrismaClient) {
    super(prisma, "users");
  }
}
// Creating role and permissions

/**
 * Creates a role with specified permissions, handling admin and non-admin permissions.
 *
 * @param {Object} params - The parameters for creating the role and setting permissions.
 * @param {Object} params.tx - A PrismaClient transactionoperations.
 * @param {boolean} [params.isAdmin=false] - Flag indicating if the role being created is an admin role. Default is false.
 * @param {string} params.role_name - The name of the role to be created.
 * @param {string} [params.admin_id] - ID of the admin creating the role (applies to non-admin roles only).
 * @param {string[]} [params.permissions] - Array of permission IDs to associate with the role (required for non-admin roles).
 *
 * @throws {ApiError} If `permissions` are not provided for non-admin roles.
 *
 * @returns {Promise<Object>} An object containing the newly created `role`.
 *
 * @example
 * Create an admin role with all permissions
 * const result = await rolePermissions({
 *   tx,
 *   isAdmin: true,
 *   role_name: "Super Admin"
 * });
 *
 * @example
 * Create a non-admin role with specified permissions
 * const result = await rolePermissions({
 *   tx,
 *   role_name: "Editor",
 *   admin_id: "admin123",
 *   permissions: ["perm_read", "perm_write"]
 * });
 */
export const rolePermissions = async ({
  tx,
  isAdmin = false,
  role_name,
  permissions,
  admin_id,
}: {
  tx: Omit<
    PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    "$on" | "$connect" | "$disconnect" | "$use" | "$transaction" | "$extends"
  >;
  isAdmin?: boolean;
  role_name: string;
  admin_id?: string;
  permissions?: string[];
}) => {
  const role = await tx.roles.create({
    data: {
      name: role_name,
      is_primary: isAdmin,
      admin_id: !isAdmin ? admin_id : null,
    },
  });
  if (isAdmin) {
    const fetched_permissions = await tx.permissions.findMany({
      select: { permission_id: true },
    });

    for (let i = 0; i < fetched_permissions.length; i++) {
      await tx.rolePermissions.create({
        data: {
          role_id: role.role_id,
          permission_id: fetched_permissions[i].permission_id,
        },
      });
    }
  } else {
    if (!permissions || permissions?.length === 0) {
      throw new ApiError(400, "Please provide permissions", null, false);
    } else {
      for (let i = 0; i < permissions.length; i++) {
        await tx.rolePermissions.create({
          data: {
            role_id: role.role_id,
            permission_id: permissions[i],
          },
        });
      }
    }
  }

  return { role };
};
