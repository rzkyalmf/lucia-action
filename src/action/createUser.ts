"use server";

import { redirect } from "next/navigation";
import { generateId } from "lucia";
import { prisma } from "@/db/utils/prisma";
import { Argon2id } from "oslo/password";

export async function CreateUser(formData: FormData) {
  const fullname = formData.get("fullname");
  const email = formData.get("email");
  const password = formData.get("password");

  const argon = new Argon2id();
  const hashedPassword = await argon.hash(password);

  await prisma.user.create({
    data: {
      id: generateId(16),
      fullname: fullname as string,
      email: email as string,
      password: hashedPassword,
    },
  });

  redirect("/login");
}
