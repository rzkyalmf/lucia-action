import { Register } from "@/components/register";
import { prisma } from "@/db/utils/prisma";

export default async function Page() {
  const user = await prisma.user.findMany();

  return (
    <>
      <Register user={user} />
    </>
  );
}
