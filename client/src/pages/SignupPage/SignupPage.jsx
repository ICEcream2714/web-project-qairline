import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import Navbar from '@/layouts/Navbar';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import 'tailwindcss/tailwind.css';

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [isCheckedTerm, setIsCheckedTerm] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [title, setTitle] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');
  const [promoCode, setPromoCode] = useState('');

  const [familyName, setFamilyName] = useState('');
  const [givenName, setGivenName] = useState('');

  const togglePasswordVisibility = () =>
    setShowPassword((prevState) => !prevState);
  const toggleRePasswordVisibility = () =>
    setShowRePassword((prevState) => !prevState);
  const toggleCheckedTerm = () => setIsCheckedTerm((prevState) => !prevState);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleAddressChange = (e) => setAddress(e.target.value);
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleMiddleNameChange = (e) => setMiddleName(e.target.value);
  const handleDateOfBirthChange = (e) => setDateOfBirth(e.target.value);
  const handleGenderChange = (e) => setGender(e.target.value);
  const handleCountryChange = (value) => setCountry(value);
  const handlePromoCode = (e) => setPromoCode(e.target.value);

  const handleFamilyNameChange = (e) => setFamilyName(e.target.value);
  const handleGivenNameChange = (e) => setGivenName(e.target.value);

  const isLoginBtnValid =
    email.length > 0 &&
    familyName.length > 0 &&
    givenName.length > 0 &&
    isCheckedTerm;

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log({
      email,
      password,
      title,
      firstName,
      lastName,
      middleName,
      dateOfBirth,
      gender,
      country,
      promoCode,
    });
    const payload = {
      email,
      password,
      title,
      firstName,
      lastName,
      middleName,
      dateOfBirth,
      gender,
      country,
      promoCode,
    };
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Đăng ký thành công:', data);
        history.push('/login'); // Chuyển hướng người dùng về trang login
      } else {
        const error = await response.json();
        console.error('Lỗi đăng ký:', error);
        alert('Lỗi đăng ký: ' + error.message);
      }
    } catch (error) {
      console.error('Lỗi kết nối:', error);
      alert('Lỗi kết nối, vui lòng thử lại sau.');
    }
  };

  return (
    <div className="flex min-w-[300px] flex-col items-center overflow-x-hidden bg-background">
      <Navbar />
      <div className="mb-6 w-full">
        <img
          src="https://i.pinimg.com/736x/db/ab/6a/dbab6a956301ae1bf0c218f438d6f094.jpg"
          alt="bg-img"
          className="h-64 w-full object-cover object-center"
        />
      </div>

      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Sign up</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Form Signup */}
      <Card className="mb-10 w-full max-w-5xl rounded-lg bg-slate-100 p-8 text-card-foreground shadow-md sm:max-w-2xl md:max-w-3xl lg:max-w-4xl">
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

        <CardContent className="rounded-lg bg-card">
          <div className="grid grid-cols-6 md:gap-4">
            {/* credentials card */}
            <div className="col-span-full md:col-span-2">
              <p className="text-primary">Let&apos;s create your credentials</p>
            </div>
            <div className="col-span-full mb-4 md:col-span-4 md:mb-0">
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
                or join by filling up the form below or join by filling up the
                form below
              </p>

              {/* Email Input */}
              <div className="relative my-3">
                <Input
                  type="text"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
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
              <div className="grid w-full grid-cols-2">
                <div className="relative col-span-full md:col-span-1">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    className="peer block h-11 w-full rounded-lg border border-border bg-transparent px-3 pb-2 pt-5 text-sm text-foreground focus:border-primary focus:outline-none"
                    placeholder=""
                    required
                    onChange={handlePasswordChange}
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

                {/* Re-Password Input */}
                <div className="relative col-span-full mt-3 md:col-span-1 md:ml-3 md:mt-0">
                  <Input
                    type={showRePassword ? 'text' : 'password'}
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
            <hr className="col-span-full" />

            {/* detail */}
            <div className="col-span-full mt-3 md:col-span-2 md:mt-0">
              <p className="text-primary">Your personal details</p>
            </div>
            <div className="col-span-full mb-4 md:col-span-4 md:mb-0">
              <Select>
                <SelectTrigger className="mb-3 w-full sm:w-1/2">
                  <SelectValue
                    placeholder="Title"
                    onChange={handleTitleChange}
                  />
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

              <div className="grid w-full grid-cols-2 justify-center text-center">
                {/* Name Input */}
                <div className="relative col-span-full md:col-span-1">
                  <Input
                    type="text"
                    id="username"
                    value={familyName}
                    onChange={handleFamilyNameChange}
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
                <div className="relative col-span-full mt-3 md:col-span-1 md:ml-3 md:mt-0">
                  <Input
                    type="text"
                    id="givenname"
                    value={givenName}
                    onChange={handleGivenNameChange}
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

                {/* date */}
                <div className="relative col-span-full mt-3 md:col-span-1">
                  <Input
                    type="date"
                    id="date-birth"
                    className="peer block h-11 w-full rounded-lg border border-border bg-transparent px-3 pb-2 pt-5 text-sm text-foreground focus:border-primary focus:outline-none"
                    placeholder=""
                    required
                    onChange={handleDateOfBirthChange}
                  />
                  <label
                    htmlFor="date-birth"
                    className="peer-placeholder-shown:top-2.2 absolute left-3 top-0.5 max-w-full truncate pr-4 text-sm/5 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-muted-foreground peer-valid:top-0 peer-valid:text-sm peer-valid:text-primary peer-focus:top-0 peer-focus:text-sm peer-focus:text-primary"
                  >
                    Date of birth
                  </label>
                </div>

                {/* gender */}
                <div className="col-span-full mt-3 md:col-span-1 md:ml-3">
                  <p className="w-full">Gender</p>
                  <RadioGroup
                    defaultValue="option-one"
                    className="grid grid-cols-2"
                    onChange={handleGenderChange}
                  >
                    <div className="flex justify-end space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex justify-start space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
            <hr className="col-span-full" />

            {/* country */}
            <div className="col-span-full mt-3 md:col-span-2 md:mt-0">
              {' '}
              <p className="text-primary">Where do you live?</p>
            </div>
            <div className="col-span-full mb-4 md:col-span-4 md:mb-0">
              <Select className="w-full" onValueChange={handleCountryChange}>
                <SelectTrigger>
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
            </div>
            <hr className="col-span-full" />

            {/* promocode */}
            <div className="col-span-full mt-3 md:col-span-2 md:mt-0">
              {' '}
              <p className="text-primary">Enrolment promo code</p>
            </div>
            <div className="col-span-full mb-4 md:col-span-4 md:mb-0">
              <div className="relative w-full sm:w-1/2">
                <Input
                  type={showRePassword ? 'text' : 'password'}
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
            </div>
            <hr className="col-span-full" />

            {/* news & offer */}
            <div className="col-span-full mt-3 md:col-span-2 md:mt-0">
              <p className="text-primary">Sign up for our news and offers</p>
            </div>
            <div className="col-span-full mb-4 md:col-span-4 md:mb-0">
              <p className="mb-2 text-primary">
                I would like to receive news and offers from:
              </p>
              <div className="flex items-center space-x-2">
                <Checkbox id="entities" />
                <label
                  htmlFor="entities"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Other{' '}
                  <a href="#" className="cursor-pointer text-primary underline">
                    Q Airways group entities
                  </a>
                </label>
              </div>
              <div className="mt-2 flex items-center space-x-2">
                <Checkbox id="partners" />
                <label
                  htmlFor="partners"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  QAirline Club partners
                </label>
              </div>
            </div>
            <hr className="col-span-full" />
          </div>

          {/* Terms Checkbox */}
          <div className="mt-4 flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={isCheckedTerm}
              onClick={toggleCheckedTerm}
            />
            <Label htmlFor="terms" className="text-sm text-muted-foreground">
              I agree to{' '}
              <a href="#" className="text-primary underline">
                Terms and Conditions
              </a>
              , and understand that my information will be processed in
              accordance with the QAirline{' '}
              <a href="#" className="text-primary underline">
                Privacy Notice
              </a>
              .
            </Label>
          </div>

          {/* Sign up Button */}
          <div className="mt-5">
            <Button
              className="w-full rounded-lg bg-primary py-2 text-primary-foreground hover:bg-primary/50"
              disabled={!isLoginBtnValid}
              onClick={handleSignup}
            >
              Sign up
            </Button>
          </div>
        </CardContent>

        <CardFooter className="flex flex-row justify-center text-center">
          <p>
            Already have an account?{' '}
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
