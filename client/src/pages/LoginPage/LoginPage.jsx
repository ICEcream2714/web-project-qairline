import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import Navbar from '@/layouts/Navbar/Navbar';
import 'tailwindcss/tailwind.css';
import AlertDialog from '@/layouts/Notification/alert-dialog';

const LoginPage = () => {
  const navigate = useNavigate();

  //alert dialog state
  const [alert, setAlert] = useState({
    open: false,
    title: '',
    message: '',
    isSuccess: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const payload = {
      email,
      password,
    };

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login ok', data);
        localStorage.setItem('token', data.token); // Lưu token vào localStorage
        // alert('Login successfully!');
        setAlert({
          open: true,
          title: 'QAirline',
          message: 'Login successfully!',
          isSuccess: true,
        });

        //
        setTimeout(() => {
          navigate('/'); // Điều hướng đến trang chính sau khi hiển thị thông báo
        }, 3000);
      } else {
        const error = await response.json();
        const errorMessage =
          error.errors && error.errors.length > 0
            ? error.errors[0].msg
            : 'Login failed!';
        console.log('Login failed', error);
        // alert('Lỗi đăng nhập: ', errorMessage);
        setAlert({
          open: true,
          title: 'QAirline',
          message: `Login failed: + ${errorMessage}`,
          isSuccess: false,
        });
      }
    } catch (error) {
      console.error('Lỗi kết nối:', error);
      // alert('Lỗi kết nối, vui lòng thử lại sau.');
      setAlert({
        open: true,
        title: 'QAirline',
        message: `Connect failed: + ${error}  + . Please try again!`,
        isSuccess: false,
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-gray-700 to-gray-300 px-3">
      <Navbar />
      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Log in</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <Card className="w-full max-w-sm rounded-lg bg-card shadow-md sm:max-w-md md:max-w-lg">
        <CardHeader className="flex flex-col items-center space-y-2">
          <img
            src="https://i.pinimg.com/control2/736x/56/ed/da/56edda40a95cab939a8cc5f04b5b2109.jpg"
            alt="logo"
            className="w-20"
          />
          <h2 className="text-center text-xl font-semibold text-primary md:text-2xl">
            Log in to your account
          </h2>
        </CardHeader>
        <CardContent>
          {/* Input Text (Changed from Email) */}
          <div className="relative mb-4 max-w-full">
            <Input
              type="text"
              id="username"
              className="peer block h-11 w-full rounded-lg border border-border bg-transparent px-3 pb-2 pt-5 text-sm text-muted-foreground focus:border-primary focus:outline-none"
              placeholder=""
              required
              onChange={handleEmailChange}
            />
            <label
              htmlFor="username"
              className="peer-placeholder-shown:top-2.2 absolute left-3 top-2.5 max-w-full truncate whitespace-nowrap pr-4 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-muted-foreground peer-valid:top-0 peer-valid:text-sm peer-valid:text-primary peer-focus:top-0 peer-focus:text-sm peer-focus:text-primary"
            >
              Enter your email or membership number
            </label>
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="peer block h-11 w-full rounded-lg border border-border bg-transparent pb-2 pl-3 pr-10 pt-5 text-sm text-muted-foreground focus:border-primary focus:outline-none"
                placeholder=""
                required
                onChange={handlePasswordChange}
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
            <div className="mt-2 text-right">
              <a
                href="#"
                className="text-sm font-bold text-primary/80 underline hover:text-primary/50"
              >
                Forgot Password?
              </a>
            </div>
          </div>

          {/* Log in Button */}
          <div className="mt-4">
            <Button
              className="w-full rounded-lg bg-primary py-2 text-primary-foreground hover:bg-primary/50"
              onClick={handleLogin}
            >
              Log in
            </Button>
            <AlertDialog
              open={alert.open}
              onClose={() => setAlert({ ...alert, open: false })}
              title={alert.title}
              message={alert.message}
              isSuccess={alert.isSuccess}
            />
          </div>

          <div className="my-5 flex items-center">
            <hr className="flex-1 border-muted-foreground" />
            <span className="px-4 text-sm text-muted-foreground">
              or log in with
            </span>
            <hr className="flex-1 border-muted-foreground" />
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
            Haven't got an account yet?{' '}
            <Link to="/signup" className="text-primary/80 underline">
              Sign up now!
            </Link>{' '}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
