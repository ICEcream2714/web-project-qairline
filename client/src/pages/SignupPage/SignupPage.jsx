import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import "tailwindcss/tailwind.css";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleRePasswordVisibility = () => {
    setShowRePassword((prevState) => !prevState);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 px-4">
      <Card className="w-full max-w-sm rounded-lg bg-white p-6 shadow-md sm:max-w-md md:max-w-lg">
        <CardHeader className="flex flex-col items-center space-y-2">
          <img
            src="https://i.pinimg.com/control2/736x/b2/63/62/b2636225a15957cad9babd1bd8272e06.jpg"
            alt="logo"
            className="w-14"
          />
          <h2 className="text-center text-xl font-semibold text-gray-800 md:text-2xl">
            Register for your account
          </h2>
        </CardHeader>

        <CardContent>
          {/* name user */}
          <div className="relative flex justify-center text-center">
            <div className="flex-1">
              <Input
                type="text"
                id="username"
                className="peer block h-11 w-full rounded-lg border border-gray-500 bg-transparent px-3 pb-2 pt-5 text-sm text-gray-900 focus:border-blue-400 focus:outline-none"
                placeholder=""
                required
              />
              <label
                htmlFor="username"
                className="peer-placeholder-shown:top-2.2 absolute left-3 top-2.5 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-red-400 peer-valid:top-0 peer-valid:text-sm peer-valid:text-blue-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-400"
              >
                Family Name*
              </label>
            </div>
            <div className="ml-3 flex-1">
              <Input
                type="text"
                id="username"
                className="peer block h-11 w-full rounded-lg border border-gray-500 bg-transparent px-3 pb-2 pt-5 text-sm text-gray-900 focus:border-blue-400 focus:outline-none"
                placeholder=""
                required
              />
              <label
                htmlFor="username"
                className="peer-placeholder-shown:top-2.2 absolute right-24 top-2.5 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-red-400 peer-valid:left-52 peer-valid:top-0 peer-valid:text-sm peer-valid:text-blue-400 peer-focus:left-52 peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-400"
              >
                Given Name*
              </label>
            </div>
          </div>
          <p className="mb-4 text-sm text-green-950">
            Please provide your name matched with your personal legal document.
            For example: if your name is John Doe. You enter DOE as “family
            name” and JOHN as “given name”.
          </p>

          {/* Input Text (Changed from Email) */}
          <div className="relative mb-4">
            <Input
              type="text"
              id="username"
              className="peer block h-11 w-full rounded-lg border border-gray-500 bg-transparent px-3 pb-2 pt-5 text-sm text-gray-900 focus:border-blue-400 focus:outline-none"
              placeholder=""
              required
            />
            <label
              htmlFor="username"
              className="peer-placeholder-shown:top-2.2 absolute left-3 top-2.5 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-red-400 peer-valid:top-0 peer-valid:text-sm peer-valid:text-blue-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-400"
            >
              Enter your email*
            </label>
          </div>

          {/* Password Input label*/}
          <div className="mb-4">
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
                className="peer-placeholder-shown:top-2.2 absolute left-3 top-2.5 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-valid:top-0 peer-valid:text-sm peer-valid:text-blue-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-400"
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
          </div>

          {/* re-password input label */}
          <div className="mb-4">
            <div className="relative">
              <Input
                type={showRePassword ? "text" : "password"}
                id="password"
                className="peer block h-11 w-full rounded-lg border border-gray-500 bg-transparent px-3 pb-2 pt-5 text-sm text-gray-900 focus:border-blue-400 focus:outline-none"
                placeholder=""
                required
              />
              <label
                htmlFor="password"
                className="peer-placeholder-shown:top-2.2 absolute left-3 top-2.5 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-valid:top-0 peer-valid:text-sm peer-valid:text-blue-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-400"
              >
                Confirm your password
              </label>
              <button
                type="button"
                onClick={toggleRePasswordVisibility}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-6 w-6" />
                ) : (
                  <EyeIcon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* legal checkbox */}
          <div className="flex items-start space-x-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms">
              I agree to{" "}
              <a href="#" className="text-green-700 underline">
                Terms and Conditions
              </a>
              , and understand that my information will be processed in
              accordance with the QAirline
              <a href="#" className="text-green-700 underline">
                {" "}
                Privacy Notice
              </a>
              .
            </Label>
          </div>

          {/* Sign up Button */}
          <div className="mt-5">
            <Button className="w-full rounded-lg bg-black py-2 text-white hover:bg-gray-400">
              Sign up
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
        <CardFooter className="flex flex-row justify-center text-center">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-green-700 underline">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignupPage;
