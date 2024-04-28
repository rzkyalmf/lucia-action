"use client";

import React from "react";

export const Login = () => {
  async function handleLogin(formData: FormData) {
    const email = formData.get("email");
    const password = formData.get("password");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log({ data });
  }

  return (
    <main className="flex h-screen justify-center items-center">
      <form action={handleLogin}>
        <div className="w-[340px]">
          <input name="email" className="block w-full p-2 border rounded-lg" />
          <input
            name="password"
            className="block w-full p-2 border rounded-lg"
          />
          <button className="block w-full p-2 bg-blue-500 text-white">
            login
          </button>
        </div>
      </form>
    </main>
  );
};
