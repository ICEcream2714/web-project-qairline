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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
    <div className="mt-24 flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-5xl rounded-lg bg-card p-8 text-card-foreground shadow-md sm:max-w-2xl md:max-w-3xl lg:max-w-4xl">
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

        <CardContent className="rounded-lg bg-slate-100">
          {/* credentials card */}
          <table className="table-fixed">
            <thead>
              <th className="w-2/5"></th>
              <th className="w-3/5"></th>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="align-top">
                  <p className="text-primary">Let's create your credentials</p>
                </td>
                <td>
                  <div className="flex flex-col">
                    <p className="text-primary">Create an account using</p>
                    <div className="flex gap-4">
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
                    <p className="text-primary">
                      or join by filling up the form below or join by filling up
                      the form below
                    </p>
                    {/* Email Input */}
                    <div className="relative my-3">
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
                    <div className="flex">
                      <div className="mb-4 flex-1">
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
                            Type a password
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
                      <div className="mb-4 ml-3 flex-1">
                        <div className="relative">
                          <Input
                            type={showRePassword ? "text" : "password"}
                            id="re-password"
                            className="peer block h-11 w-full rounded-lg border border-border bg-transparent px-3 pb-2 pt-5 text-sm text-foreground focus:border-primary focus:outline-none"
                            placeholder=""
                            required
                          />
                          <label
                            htmlFor="re-password"
                            className="peer-placeholder-shown:top-2.2 absolute left-3 top-2.5 max-w-full truncate pr-12 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-muted-foreground peer-valid:top-0 peer-valid:text-sm peer-valid:text-primary peer-focus:top-0 peer-focus:text-sm peer-focus:text-primary"
                          >
                            Retype password
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
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-4 align-top">
                  <p className="text-primary">Your personal details</p>
                </td>
                <td className="py-4">
                  {/* title */}
                  <Select>
                    <SelectTrigger className="mb-3 w-1/2">
                      <SelectValue placeholder="Title" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mr">Mr</SelectItem>
                      <SelectItem value="Ms">Ms</SelectItem>
                      <SelectItem value="Mrs">Mrs</SelectItem>
                      <SelectItem value="Master">Master</SelectItem>
                      <SelectItem value="Sheikha">Sheikha</SelectItem>
                      <SelectItem value="Sheikh">Sheikh</SelectItem>
                      <SelectItem value="Dr">Dr</SelectItem>
                      <SelectItem value="Professor">Professor</SelectItem>
                      <SelectItem value="Brigadier">Brigadier</SelectItem>
                      <SelectItem value="Captain">Captain</SelectItem>
                      <SelectItem value="Colonel">Colonel</SelectItem>
                      <SelectItem value="General">General</SelectItem>
                    </SelectContent>
                  </Select>

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
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-4">
                  <p className="text-primary">Where do you live?</p>
                </td>
                <td className="py-4">
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Country/region of residence" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="US">United States</SelectItem>
                      <SelectItem value="CA">Canada</SelectItem>
                      <SelectItem value="GB">United Kingdom</SelectItem>
                      <SelectItem value="FR">France</SelectItem>
                      <SelectItem value="DE">Germany</SelectItem>
                      <SelectItem value="IN">India</SelectItem>
                      <SelectItem value="JP">Japan</SelectItem>
                      <SelectItem value="AU">Australia</SelectItem>
                      <SelectItem value="BR">Brazil</SelectItem>
                      <SelectItem value="ZA">South Africa</SelectItem>
                      <SelectItem value="MX">Mexico</SelectItem>
                      <SelectItem value="IT">Italy</SelectItem>
                      <SelectItem value="ES">Spain</SelectItem>
                      <SelectItem value="CN">China</SelectItem>
                      <SelectItem value="RU">Russia</SelectItem>
                      <SelectItem value="KR">South Korea</SelectItem>
                      <SelectItem value="VN">Vietnam</SelectItem>
                      <SelectItem value="SG">Singapore</SelectItem>
                      <SelectItem value="TH">Thailand</SelectItem>
                      <SelectItem value="PH">Philippines</SelectItem>
                      <SelectItem value="MY">Malaysia</SelectItem>
                      <SelectItem value="ID">Indonesia</SelectItem>
                      <SelectItem value="PK">Pakistan</SelectItem>
                      <SelectItem value="NG">Nigeria</SelectItem>
                      <SelectItem value="EG">Egypt</SelectItem>
                      <SelectItem value="AE">United Arab Emirates</SelectItem>
                      <SelectItem value="SE">Sweden</SelectItem>
                      <SelectItem value="NO">Norway</SelectItem>
                      <SelectItem value="DK">Denmark</SelectItem>
                      <SelectItem value="FI">Finland</SelectItem>
                      <SelectItem value="GR">Greece</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-4">
                  <p className="text-primary">Enrolment promo code</p>
                </td>
                <td className="py-4">
                  <div className="relative w-1/2">
                    <Input
                      type={showRePassword ? "text" : "password"}
                      id="enrolment-code"
                      className="peer block h-11 w-full rounded-lg border border-border bg-transparent px-3 pb-2 pt-5 text-sm text-foreground focus:border-primary focus:outline-none"
                      placeholder=""
                      required
                    />
                    <label
                      htmlFor="enrolment-code"
                      className="peer-placeholder-shown:top-2.2 absolute left-3 top-2.5 max-w-full truncate pr-12 pr-3 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-muted-foreground peer-valid:top-0 peer-valid:text-sm peer-valid:text-primary peer-focus:top-0 peer-focus:text-sm peer-focus:text-primary"
                    >
                      Enrolment code (optional)
                    </label>
                  </div>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-4">
                  <p>Sign up for our news and offers</p>
                </td>
                <td className="py-4">
                  <p className="mb-2 text-primary">
                    I would like to receive news and offers from:
                  </p>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Other{" "}
                      <a
                        href="#"
                        className="cursor-pointer text-primary underline"
                      >
                        Q Airways group entities
                      </a>
                    </label>
                  </div>
                  <div className="mt-2 flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      QAirline Club partners
                    </label>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Terms Checkbox */}
          <div className="mt-4 flex items-start space-x-2">
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
            <Button className="w-full rounded-lg bg-primary py-2 text-primary-foreground hover:bg-primary/50">
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
