"use server";
import { db } from "@/db";
import { users } from "@/db/schemas/users";
import { userRoles } from "@/types";
import { eq } from "drizzle-orm";

export const assignRole = async (email: string, role: userRoles) => {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!user) {
    return;
  }
  await db.update(users).set({
    role,
  });
};
