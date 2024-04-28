import { Argon2id } from "oslo/password";
import { lucia } from "@/db/utils/lucia";
import { prisma } from "@/db/utils/prisma";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    const argon = new Argon2id();
    const findUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!findUser) {
      return Response.json({ message: "Invalid Credentials" });
    }

    const passwordMatch = await argon.verify(findUser.password, password);

    if (passwordMatch) {
      // Logic Creating Session

      const session = await lucia.createSession(findUser.id, {}); // sessionId => database
      const sessionStore = lucia.createSessionCookie(session.id); // seriallize cookie dari session
      cookies().set(
        sessionStore.name,
        sessionStore.value,
        sessionStore.attributes
      );

      return Response.json({ message: "login good" });
    }
  } catch (error) {
    console.log(error);
  }
}
