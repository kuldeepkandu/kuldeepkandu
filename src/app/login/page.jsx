"use client";

import { useState } from "react";
import { login } from "../../services/auth.api";
import { useTransitionRouter } from "next-view-transitions";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const router = useTransitionRouter();

  function slideInOut() {
    try {
      document.documentElement.animate(
        [
          { opacity: 1, scale: 1, transform: "translateY(0)" },
          { opacity: 0.5, scale: 0.9, transform: "translateY(-100px)" },
        ],
        {
          duration: 1500,
          easing: "cubic-bezier(0.76, 0, 0.24, 1)",
          fill: "forwards",
          pseudoElement: "::view-transition-old(root)",
        },
      );

      document.documentElement.animate(
        [{ transform: "translateY(100%)" }, { transform: "translateY(0)" }],
        {
          duration: 1500,
          easing: "cubic-bezier(0.76, 0, 0.24, 1)",
          fill: "forwards",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    } catch (err) {
      console.warn("view-transition animation failed", err);
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted: ", form);
    try {
      const response = await login(form);
      console.log("Login response: ", response);
      alert(response.message);
      router.push(`/`, {
      onTransitionReady: slideInOut,
    });

    } catch (error) {
      console.error("Login error: ", error);
      alert(error.message || "Login failed");
    }
  };

  return (
    <div className="section-shell-tight flex justify-center items-center p-4 md:p-0 py-8 md:py-12 lg:py-16">
      <div className="relative w-full min-h-[100px] md:min-h-[300px] lg:min-h-[400px] mt-6 md:mt-10 rounded-2xl overflow-hidden border border-gray-500 bg-gradient-to-r from-gray-500 to-gray-800 md:p-8 max-w-4xl">
        <div
          className="absolute top-0 right-0 w-[55%] h-full bg-gradient-to-br from-gray-200 to-gray-800"
          style={{ clipPath: "polygon(5% 0, 100% 0, 100% 100%, 15% 100%)" }}
        />
        <div className="relative z-10 flex h-full">
          <div className="hidden md:w-1/2 md:flex flex-col justify-center items-center text-center px-8 lg:px-10">
            <h2 className="text-white text-3xl lg:text-4xl font-extrabold uppercase leading-tight mb-4 drop-shadow-lg text-start">
              Welcome Back!
            </h2>
            <p className="text-gray-300 text-sm lg:text-base leading-relaxed max-w-[280px] text-start">
              Please enter your credentials to access your account
            </p>
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-8 md:px-10 lg:px-12 py-10 md:py-0">
            <h1 className="text-white md:text-3xl text-2xl lg:text-4xl font-bold mb-8">Login</h1>
            <form
              action=""
              className="flex flex-col gap-6"
              onSubmit={handleSubmit}
            >
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder=""
                  className="peer w-full border-b border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder-transparent"
                />
                <label
                  htmlFor="email"
                  className="md:text-sm text-xs text-gray-100 absolute top-2 left-3 transform peer-focus:-translate-y-7 transition-all duration-300 pointer-events-none peer-focus:text-xs peer-focus:text-gray-600 peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-600"
                >
                  Email
                </label>
              </div>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder=""
                  className="peer w-full border-b border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-gray-400 placeholder-transparent"
                />
                <label
                  htmlFor="password"
                  className="md:text-sm text-xs text-gray-100 absolute top-2 left-3 transform peer-focus:-translate-y-7 transition-all duration-300 pointer-events-none peer-focus:text-xs peer-focus:text-gray-600 peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-600"
                >
                  Password
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-gray-200 to-gray-300 text-black py-2 px-4 rounded-md hover:from-gray-800 hover:to-gray-200 hover:text-white transition duration-300 cursor-pointer text-sm font-medium md:text-base md:text-lg"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
