import { boolean, pgEnum, pgTable, text } from "drizzle-orm/pg-core";

export const roleEnums = pgEnum("role", ["admin", "user", "manager"]);

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull().unique(),
  isApproved: boolean("isApproved").notNull().default(false),
  role: roleEnums("role").notNull().default("user"),
  avatar: text("avatar"),
});
