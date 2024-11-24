import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import "tailwindcss/tailwind.css";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background bg-gradient-to-r px-4">
      <Card className="w-full max-w-sm rounded-lg bg-card p-6 shadow-md sm:max-w-md md:max-w-lg">
        <CardHeader>
          <h2 className="text-center text-xl font-semibold text-gray-800 md:text-2xl">
            Log in to your account
          </h2>
        </CardHeader>
        <CardContent>
          {/* Input Text (Changed from Email) */}
          <div className="relative mb-4 max-w-full">
            <Input
              type="text"
              id="username"
              className="peer block h-11 w-full rounded-lg border border-gray-500 bg-transparent px-3 pb-2 pt-5 text-sm text-gray-900 focus:border-blue-400 focus:outline-none"
              placeholder=""
              required
            />
            <label
              htmlFor="username"
              className="peer-placeholder-shown:top-2.2 absolute left-3 top-2.5 max-w-full truncate whitespace-nowrap pr-4 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-valid:top-0 peer-valid:text-sm peer-valid:text-blue-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-400"
            >
              Enter your email or membership number
            </label>
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                className="peer block h-11 w-full rounded-lg border border-gray-500 bg-transparent px-3 pb-2 pt-5 text-sm text-gray-900 focus:border-blue-400 focus:outline-none"
                placeholder=""
                required
              />
              <label
                htmlFor="password"
                className="peer-placeholder-shown:top-2.2 absolute left-3 top-2.5 max-w-full truncate pr-12 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-valid:top-0 peer-valid:text-sm peer-valid:text-blue-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-400"
              >
                Enter your password
              </label>
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-6 w-6" />
                ) : (
                  <EyeIcon className="h-6 w-6" />
                )}
              </button>
            </div>
            <div className="mt-2 text-right">
              <a
                href="#"
                className="text-sm font-bold text-blue-500 underline hover:text-blue-700"
              >
                Forgot Password?
              </a>
            </div>
          </div>

          {/* Log in Button */}
          <div className="mt-4">
            <Button className="w-full rounded-lg bg-black py-2 text-white hover:bg-gray-400">
              Log in
            </Button>
          </div>

          <div className="my-5 flex items-center">
            <hr className="flex-1 border-gray-300" />
            <span className="px-4 text-sm text-gray-500">or log in with</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* Social Login Buttons */}
          <div className="flex justify-center gap-4">
            <button className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100">
              <a href="https://accounts.google.com/v3/signin/identifier?authuser=0&continue=https%3A%2F%2Fwww.google.com%2F&ec=GAlAmgQ&hl=vi&flowName=GlifWebSignIn&flowEntry=AddSession&dsh=S252850339%3A1731953360109578&ddm=1">
                <img
                  src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-1024.png"
                  alt="Google"
                  className="h-6 w-6"
                />
              </a>
            </button>
            <button className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100">
              <a href="https://www.facebook.com/r.php">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                  alt="Facebook"
                  className="h-6 w-6"
                />
              </a>
            </button>
          </div>
        </CardContent>
        <CardFooter className="justify-center text-center">
          <p>
            Haven't got an account yet?{" "}
            <Link to="/signup" className="text-blue-500 underline">
              Sign up now!
            </Link>{" "}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
