"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TypeAnimation } from "react-type-animation";
const signIn = () => {
  const router= useRouter();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const onSubmit = async(e) => {
    e.preventDefault();
    console.log(credentials);
    const response = await fetch("api/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    let authStorageToken = json.authToken;
    localStorage.setItem("authStorageToken", authStorageToken);
    // console.log(json)
    // console.log(response.status)
    // const statusCode = response.status;
    if (response.status===201) {
      console.log(json.message);
      setTimeout(() => router.push("/dashboard"), 3000);
    } else {
      console.log(json.message);
    } 
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 h-screen">
      <div className="bg-gradient-to-r from-purple-800 via-indigo-500 to-violet-200 min-h-[20%] w-[100%] md:min-h-screen  md:flex col-span-5 self-start">
        <div className="self-center" >
          <h1 className="text-2xl font-serif font-extrabold p-2 md:p-4 text-white">
            CarsFlow
          </h1>
          <h1 className="text-5xl font-serif font-extrabold p-2 md:p-4 text-indigo-800">
            <TypeAnimation
              sequence={["Buy", 1000, "Sell", 1000, "Rent", 1000]}
              wrapper="span"
              speed={50}
              style={{ fontSize: "1em", display: "inline-block" }}
              repeat={Infinity}
            />
            <span>Automobiles.</span>
          </h1>
          <h1 className="text-2xl font-serif font-extrabold p-2 md:p-4 ">
            Anytime, Anywhere.
          </h1>
        </div>
      </div>
      <div className="col-span-7 h-full w-full px-6 py-12 lg:px-8 bg-violet-200 flex justify-center items-center flex-col">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
          <div className="flex gap-1 justify-center items-center mt-10 text-center text-4xl font-bold leading-9 tracking-tight  ">
            {/* <Image src={"/images/logo.png"} alt="logo" height={40} width={40} /> */}
            <h2>Log in to your account</h2>
          </div>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm md:text-lg font-medium leading-6  "
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email"
                  autoComplete="email"
                  value={credentials.email}
                  onChange={onChange}
                  required
                  className="block w-full rounded-md border-0 p-1.5   shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm md:text-lg  sm:leading-6 text-black"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm md:text-lg  font-medium leading-6  "
                >
                  Password
                </label>
                <div className="text-sm">
                  <button
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                    onClick={() => toast.error("this feature is not available")}
                  >
                    Forgot password?
                  </button>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="password"
                  autoComplete="current-password"
                  value={credentials.password}
                  onChange={onChange}
                  className="block w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm md:text-lg  sm:leading-6 text-black"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={onSubmit}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm md:text-lg  font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Log in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm md:text-lg  text-gray-500">
            Not a member?
            <Link
              href={"/signUp"}
              className="font-semibold leading-6 text-indigo-600
         hover:text-indigo-500 ml-1"
            >
              Create a new account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default signIn;
