"use client";

import { redirect } from "next/navigation";

export const Register = () => {
  //   const router = useRouter();

  async function handleRegister(formData: FormData) {
    const fullname = formData.get("fullname");
    const email = formData.get("email");
    const password = formData.get("password");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ fullname, email, password }),
    });

    // const data = await res.json();
    redirect("/login");
    // console.log({ data });
  }

  return (
    <main className="flex h-screen justify-center items-center">
      <form action={handleRegister}>
        <div className="w-[340px]">
          <input
            name="fullname"
            className="block w-full p-2 border rounded-lg mb-2"
            placeholder="Full Name"
          />
          <input
            name="email"
            className="block w-full p-2 border rounded-lg mb-2"
            placeholder="Email"
          />
          <input
            name="password"
            type="password"
            className="block w-full p-2 border rounded-lg mb-2"
            placeholder="Password"
          />
          <button
            type="submit"
            className="block w-full p-2 bg-blue-500 text-white"
          >
            Register
          </button>
        </div>
      </form>
    </main>
  );
};
