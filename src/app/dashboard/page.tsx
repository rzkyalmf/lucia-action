import { lucia } from "@/db/utils/lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const cookieStore = cookies().get(lucia.sessionCookieName)?.value;
  if (!cookieStore) redirect("/login");

  const { session, user } = await lucia.validateSession(cookieStore as string);
  if (!session) redirect("/login");

  // console.log(user);

  return (
    <div className="bg-slate-300 p-4 flex justify-between items-center">
      <div>Dashboard</div>
      <div>{user.fullname}</div>
    </div>
  );
}
