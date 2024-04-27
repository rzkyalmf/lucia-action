import { prisma } from "./prisma";
import { lucia } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";

// function untuk lucin bisa read-write ke db lewat prisma
const dbAdapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new lucia(dbAdapter, {
  sessionCookie: {
    expired: false,
    attributes: {
      secure: proscess.env.NODE_ENV === "production", // https
    },
  },
}); // Instance lucin

export const lucia = new Lucia();
