"use client";
import { useState } from "react";
import { motion } from "framer-motion"; // You'll need to install framer-motion
import { useLogin } from "@/services/api/authApi";
import LoadingPopup from "@/components/LoadingPopup";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isPending } = useLogin({
    onSuccess: () => {
      setEmail("");
      setPassword("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center   p-4">
      <LoadingPopup isLoading={isPending} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 space-y-6 bg-white/80 dark:bg-card backdrop-blur-lg rounded-2xl shadow-2xl dark:shadow-gray-800"
      >
        {/* Header with animation */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-gray-500 dark:text-white mt-2">
            Sign in to continue to your account
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            className="space-y-2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <label className="text-sm font-medium text-gray-700 dark:text-white">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 outline-none hover:border-purple-400"
              placeholder="Enter your email"
              required
            />
          </motion.div>

          <motion.div
            className="space-y-2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <label className="text-sm font-medium text-gray-700 dark:text-white">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 outline-none hover:border-purple-400"
              placeholder="Enter your password"
              required
            />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isPending}
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg transition-all duration-300"
          >
            Log In
          </motion.button>
        </form>

        {/* <div className="flex items-center gap-4 mt-6">
          <div className="flex-1 h-[1px] bg-gray-300"></div>
          <p className="text-sm text-gray-500">or continue with</p>
          <div className="flex-1 h-[1px] bg-gray-300"></div>
        </div> */}
        {/* 
        <div className="grid grid-cols-2 gap-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300 group"
          >
            <Image
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              height={500}
              width={500}
              alt="Google"
              className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300"
            />
            Google
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300 group"
          >
            <Image
              height={500}
              width={500}
              src="https://www.svgrepo.com/show/475647/facebook-color.svg"
              alt="Facebook"
              className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300"
            />
            Facebook
          </motion.button>
        </div> */}

        {/* <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-purple-600 hover:text-purple-800 font-medium transition-colors duration-300"
          >
            Sign up
          </Link>
        </p> */}
      </motion.div>
    </div>
  );
};

export default LoginPage;
