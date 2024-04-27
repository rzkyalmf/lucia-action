import { prisma } from "@/db/utils/prisma";
import { Argon2id } from "oslo/password";
import { NextRequest } from "next/server";
import { generateId } from "lucia";

export async function POST(req: NextRequest) {
  const { fullname, email, password } = await req.json();

  try {
    const argon = new Argon2id();
    const hashedPassword = await argon.hash(password);

    const createUser = await prisma.user.create({
      data: {
        id: generateId(16),
        fullname,
        email,
        password: hashedPassword,
      },
    });

    return Response.json({ data: createUser });
  } catch (error) {
    return Response.json({ message: error });
  }
}
