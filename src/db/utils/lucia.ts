import { Lucia } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { prisma } from "./prisma";

// function untuk lucin bisa read-write ke db lewat prisma
const dbAdapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(dbAdapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production", // https
    },
  },
  getUserAttributes: (attributes) => {
    return {
      fullname: attributes.fullname,
      avatar: attributes.avatar,
    };
  },
}); // Instance lucia

// untuk extend external library types
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  fullname: string;
  avatar: string;
}
