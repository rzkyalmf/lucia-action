"use server";

import { Argon2id } from "oslo/password";
import { lucia } from "@/db/utils/lucia";
import { prisma } from "@/db/utils/prisma";
import { cookies } from "next/headers";

export async function UserLogin(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const argon = new Argon2id();
    const findUser = await prisma.user.findFirst({
      where: {
        email: email as string,
      },
    });

    if (!findUser) {
      return { message: "User not found" };
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

      return { message: "login good" };
    }
  } catch (error) {
    console.log(error);
  }
}
