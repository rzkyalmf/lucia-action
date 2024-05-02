"use client";

import { CreateUser } from "@/action/createUser";
import { User } from "@prisma/client";

interface userRegisterProps {
  user: User[];
}

export const Register: React.FC<userRegisterProps> = ({ user }) => {
  console.log(user);

  return (
    <main className="flex h-screen justify-center items-center">
      <form action={CreateUser}>
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
