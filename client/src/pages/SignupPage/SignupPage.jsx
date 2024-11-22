import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import "tailwindcss/tailwind.css";

const SignupPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="flex w-full max-w-4xl rounded-lg bg-white shadow-lg">
        <div className="hidden w-1/3 rounded-l-lg bg-cover bg-center md:block">
          <img
            src="https://www.bambooairways.com/o/com.bav.register/assets/images/slogan.png"
            alt="slogan image"
            className="h-auto w-full"
          />
          <img
            src="https://i.pinimg.com/control2/736x/c6/fd/d7/c6fdd767aea73dfd55476c8cdeb1f3ef.jpg"
            alt="banner"
            className="h-auto w-full"
          />
        </div>
        <div className="flex w-full flex-col p-6 lg:w-2/3">
          <CardHeader className="flex flex-row">
            <div className="flex-1">
              <CardTitle className="text-xl font-bold text-blue-400">
                Ready to join QAirline Club? Let's get started
              </CardTitle>
              <CardDescription>
                We need a few details about you to create your account profile.
              </CardDescription>
            </div>
            <div className="ml-10 justify-center text-center">
              <img
                src="https://i.pinimg.com/control2/736x/37/23/84/3723841a0ef8f703256f6e6a11150d65.jpg"
                alt="kaka"
                className="w-14"
              />
            </div>
          </CardHeader>
          <CardContent>
            {/* preferred language */}
            <div>
              <label>PREFERRED LANGUAGE</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Vietnamese" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vietnamese">Vietnamese</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default SignupPage;
