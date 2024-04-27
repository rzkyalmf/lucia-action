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
}); // Instance lucia
