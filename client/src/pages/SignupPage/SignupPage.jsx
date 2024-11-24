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
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-sm rounded-lg bg-card p-6 text-card-foreground shadow-md sm:max-w-md md:max-w-lg">
        <CardHeader className="flex flex-col items-center space-y-2">
          <img
            src="https://i.pinimg.com/control2/736x/b2/63/62/b2636225a15957cad9babd1bd8272e06.jpg"
            alt="logo"
            className="w-14"
          />
          <h2 className="text-center text-xl font-semibold md:text-2xl">
            Register for your account
          </h2>
        </CardHeader>

        <CardContent>
          {/* Name Input */}
          <div className="flex justify-center text-center">
            <div className="relative flex-1">
              <Input
                type="text"
                id="username"
                className="peer block h-11 w-full rounded-lg border border-border bg-transparent px-3 pb-2 pt-5 text-sm text-foreground focus:border-primary focus:outline-none"
                placeholder=""
                required
              />
              <label
                htmlFor="username"
                className="peer-placeholder-shown:top-2.2 absolute left-3 top-2.5 max-w-full truncate pr-4 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-muted-foreground peer-valid:top-0 peer-valid:text-sm peer-valid:text-primary peer-focus:top-0 peer-focus:text-sm peer-focus:text-primary"
              >
                Family Name*
              </label>
            </div>
            <div className="relative ml-3 flex-1">
              <Input
                type="text"
                id="givenname"
                className="peer block h-11 w-full rounded-lg border border-border bg-transparent px-3 pb-2 pt-5 text-sm text-foreground focus:border-primary focus:outline-none"
                placeholder=""
                required
              />
              <label
                htmlFor="givenname"
                className="peer-placeholder-shown:top-2.2 absolute left-3 top-2.5 max-w-full truncate pr-4 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-muted-foreground peer-valid:top-0 peer-valid:text-sm peer-valid:text-primary peer-focus:top-0 peer-focus:text-sm peer-focus:text-primary"
              >
                Given Name*
              </label>
            </div>
          </div>
          <p className="mb-4 text-sm text-muted-foreground">
            Please provide your name matched with your personal legal document.
            For example: if your name is John Doe. You enter DOE as “family
            name” and JOHN as “given name”.
          </p>

          {/* Email Input */}
          <div className="relative mb-4">
            <Input
              type="text"
              id="email"
              className="peer block h-11 w-full rounded-lg border border-border bg-transparent px-3 pb-2 pt-5 text-sm text-foreground focus:border-primary focus:outline-none"
              placeholder=""
              required
            />
            <label
              htmlFor="email"
              className="peer-placeholder-shown:top-2.2 absolute left-3 top-2.5 max-w-full truncate pr-4 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-muted-foreground peer-valid:top-0 peer-valid:text-sm peer-valid:text-primary peer-focus:top-0 peer-focus:text-sm peer-focus:text-primary"
            >
              Enter your email*
            </label>
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                className="peer block h-11 w-full rounded-lg border border-border bg-transparent px-3 pb-2 pt-5 text-sm text-foreground focus:border-primary focus:outline-none"
                placeholder=""
                required
              />
              <label
                htmlFor="password"
                className="peer-placeholder-shown:top-2.2 absolute left-3 top-2.5 max-w-full truncate pr-12 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-muted-foreground peer-valid:top-0 peer-valid:text-sm peer-valid:text-primary peer-focus:top-0 peer-focus:text-sm peer-focus:text-primary"
              >
                Enter your password
              </label>
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-6 w-6" />
                ) : (
                  <EyeIcon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Re-Password Input */}
          <div className="mb-4">
            <div className="relative">
              <Input
                type={showRePassword ? "text" : "password"}
                id="password"
                className="peer block h-11 w-full rounded-lg border border-border bg-transparent px-3 pb-2 pt-5 text-sm text-foreground focus:border-primary focus:outline-none"
                placeholder=""
                required
              />
              <label
                htmlFor="password"
                className="peer-placeholder-shown:top-2.2 absolute left-3 top-2.5 max-w-full truncate pr-12 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-muted-foreground peer-valid:top-0 peer-valid:text-sm peer-valid:text-primary peer-focus:top-0 peer-focus:text-sm peer-focus:text-primary"
              >
                Confirm your password
              </label>
              <button
                type="button"
                onClick={toggleRePasswordVisibility}
                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
              >
                {showRePassword ? (
                  <EyeSlashIcon className="h-6 w-6" />
                ) : (
                  <EyeIcon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start space-x-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms" className="text-sm text-muted-foreground">
              I agree to{" "}
              <a href="#" className="text-primary underline">
                Terms and Conditions
              </a>
              , and understand that my information will be processed in
              accordance with the QAirline{" "}
              <a href="#" className="text-primary underline">
                Privacy Notice
              </a>
              .
            </Label>
          </div>

          {/* Sign up Button */}
          <div className="mt-5">
            <Button className="w-full rounded-lg bg-primary py-2 text-primary-foreground hover:bg-primary/90">
              Sign up
            </Button>
          </div>
        </CardContent>

        <CardFooter className="flex flex-row justify-center text-center">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-muted-foreground underline">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignupPage;
