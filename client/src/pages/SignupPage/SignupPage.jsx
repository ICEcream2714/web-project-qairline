import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import Navbar from '@/layouts/Navbar/Navbar';
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
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showValidPassword, setShowValidPassword] = useState(true);
  const [showRePassword, setShowRePassword] = useState(false);
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    number: false,
    specialChar: false,
    upperCase: false,
    lowerCase: false,
  });
  const [isCheckedTerm, setIsCheckedTerm] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');
  const [title, setTitle] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');
  const [promoCode, setPromoCode] = useState('');

  // Criteria for password
  const minLength = 8;
  const hasNumber = /\d/;
  const hasUpperCase = /[A-Z]/;
  const hasLowerCase = /[a-z]/;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

  const togglePasswordVisibility = () =>
    setShowPassword((prevState) => !prevState);

  const toggleRePasswordVisibility = () => {
    setShowRePassword((prevState) => !prevState);
  };

  const toggleCheckedTerm = () => {
    setIsCheckedTerm((prevState) => !prevState);
  };

  const validatePassword = (password) => {
    const lengthValid = password.length >= minLength;
    const numberValid = hasNumber.test(password);
    const specialCharValid = hasSpecialChar.test(password);
    const upperCaseValid = hasUpperCase.test(password);
    const lowerCaseValid = hasLowerCase.test(password);
    const isValid =
      lengthValid &&
      numberValid &&
      specialCharValid &&
      upperCaseValid &&
      lowerCaseValid;

    setPasswordCriteria({
      length: lengthValid,
      number: numberValid,
      specialChar: specialCharValid,
      upperCase: upperCaseValid,
      lowerCase: lowerCaseValid,
    });
    if (password.length === 0) {
      setPasswordCriteria({
        length: false,
        number: false,
        specialChar: false,
        upperCase: false,
        lowerCase: false,
      });
      setShowValidPassword(false); // Đặt lại trạng thái khi mật khẩu rỗng
    } else {
      // Cập nhật trạng thái hiển thị kết quả hợp lệ
      setShowValidPassword(isValid);
    }
  };

  const handlePasswordChange = (e) => {
    const newPass = e.target.value;
    setPassword(newPass);
    validatePassword(newPass);
  };

  const handleRePasswordChange = (e) => {
    const newRePass = e.target.value;
    setRePassword(newRePass);
  };

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleTitleChange = (value) => setTitle(value);
  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleMiddleNameChange = (e) => setMiddleName(e.target.value);
  const handleDateOfBirthChange = (e) => setDateOfBirth(e.target.value);
  const handleGenderChange = (value) => setGender(value);
  const handleCountryChange = (value) => setCountry(value);
  const handlePromoCode = (e) => setPromoCode(e.target.value);

  const isLoginBtnValid =
    email.length > 0 &&
    firstName.length > 0 &&
    lastName.length > 0 &&
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
      first_name: firstName,
      last_name: lastName,
      middle_name: middleName,
      date_of_birth: dateOfBirth,
      gender,
      country_name: country,
      promo_code: promoCode,
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
        alert('Register successfully, please login to continue.');
        navigate('/login'); // Chuyển hướng người dùng về trang login
      } else {
        // Xử lý lỗi trả về từ server
        const error = await response.json();
        const errorMessage =
          error.errors && error.errors.length > 0
            ? error.errors[0].msg
            : 'Lỗi đăng ký';
        console.error('Lỗi đăng ký:', error);
        alert('Lỗi đăng ký: ' + errorMessage);
      }
    } catch (error) {
      console.error('Lỗi kết nối:', error);
      alert('Lỗi kết nối, vui lòng thử lại sau.');
    }
  };

  return (
    <div className="flex min-w-[300px] flex-col items-center overflow-x-hidden bg-background">
      <Navbar />
      <div className="mb-6 h-[350px] w-full bg-gradient-to-r from-gray-700 to-gray-300"></div>

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
      <Card className="mb-10 w-full max-w-5xl rounded-lg bg-slate-100 px-3 py-6 text-card-foreground shadow-md sm:max-w-2xl md:max-w-3xl lg:max-w-4xl">
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
            <div className="col-span-full mb-4 md:col-span-4 md:mb-0 md:mt-3">
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
                or join by filling up the form below
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

              {/* pass & re-pass label */}
              <div className="grid w-full grid-cols-2">
                <div className="col-span-full grid md:col-span-1">
                  {/* Password Input */}
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      className="peer block h-11 w-full rounded-lg border border-border bg-transparent px-3 pb-2 pr-10 pt-5 text-sm text-foreground focus:border-primary focus:outline-none"
                      value={password}
                      onChange={handlePasswordChange}
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

                  {/* warning pass */}
                  {!showValidPassword && password != '' && (
                    <div
                      className={`col-span-full rounded border border-red-600 border-t-white bg-red-200 text-sm md:col-span-1`}
                    >
                      <ul
                        className={`rounded border py-1 text-[12px] text-gray-600`}
                      >
                        <li className="pl-2">Password criteria:</li>
                        <li className="flex items-center">
                          <span className={`ml-2 w-5 items-center`}>
                            {passwordCriteria.length ? '✔' : '○'}
                          </span>
                          Minimum length {minLength} characters
                        </li>
                        <li className="flex items-center">
                          <span className={`ml-2 w-5 items-center`}>
                            {passwordCriteria.upperCase ? '✔' : '○'}
                          </span>
                          Contains at least one uppercase letter
                        </li>
                        <li className="flex items-center">
                          <span className={`ml-2 w-5 items-center`}>
                            {passwordCriteria.lowerCase ? '✔' : '○'}
                          </span>
                          Contains at least one lowercase letter
                        </li>
                        <li className="flex items-center">
                          <span className={`ml-2 w-5 items-center`}>
                            {passwordCriteria.number ? '✔' : '○'}
                          </span>
                          Contains at least one number
                        </li>
                        <li className="flex items-center">
                          <span className={`ml-2 w-5 items-center`}>
                            {passwordCriteria.specialChar ? '✔' : '○'}
                          </span>
                          Contains at least one special character
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

                <div className="col-span-full grid md:col-span-1">
                  {/* Re-Password Input */}
                  <div className="relative mt-3 md:ml-3 md:mt-0">
                    <Input
                      type={showRePassword ? 'text' : 'password'}
                      id="re-password"
                      className="peer block h-11 w-full rounded-lg border border-border bg-transparent px-3 pb-2 pr-10 pt-5 text-sm text-foreground focus:border-primary focus:outline-none"
                      value={repassword}
                      onChange={handleRePasswordChange}
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

                  {/* wanring re-pass */}
                  {showValidPassword &&
                    repassword != '' &&
                    (repassword.length > password.length ? (
                      <div className="rounded border border-red-600 border-t-white bg-red-200 text-sm">
                        Password Not Matching
                      </div>
                    ) : null)}
                </div>
              </div>
            </div>
            <hr className="col-span-full" />

            {/* detail */}
            <div className="col-span-full mt-3 md:col-span-2 md:mt-0">
              <p className="text-primary">Your personal details</p>
            </div>
            <div className="col-span-full mb-4 md:col-span-4 md:mb-0">
              <Select onValueChange={handleTitleChange}>
                <SelectTrigger className="mb-3 w-full sm:w-1/2">
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

              <div className="grid w-full grid-cols-3 justify-center text-center">
                {/* Name Input */}
                <div className="relative col-span-full md:col-span-1">
                  <Input
                    type="text"
                    id="firstname"
                    value={firstName}
                    onChange={handleFirstNameChange}
                    className="peer block h-11 w-full rounded-lg border border-border bg-transparent px-3 pb-2 pt-5 text-sm text-foreground focus:border-primary focus:outline-none"
                    placeholder=""
                    required
                  />
                  <label
                    htmlFor="firstname"
                    className="peer-placeholder-shown:top-2.2 absolute left-3 top-2.5 max-w-full truncate pr-4 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-muted-foreground peer-valid:top-0 peer-valid:text-sm peer-valid:text-primary peer-focus:top-0 peer-focus:text-sm peer-focus:text-primary"
                  >
                    First Name*
                  </label>
                </div>
                <div className="relative col-span-full mt-3 md:col-span-1 md:ml-3 md:mt-0">
                  <Input
                    type="text"
                    id="middlename"
                    value={middleName}
                    onChange={handleMiddleNameChange}
                    className="peer block h-11 w-full rounded-lg border border-border bg-transparent px-3 pb-2 pt-5 text-sm text-foreground focus:border-primary focus:outline-none"
                    placeholder=""
                    required
                  />
                  <label
                    htmlFor="middlename"
                    className="peer-placeholder-shown:top-2.2 absolute left-3 top-2.5 max-w-full truncate pr-4 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-muted-foreground peer-valid:top-0 peer-valid:text-sm peer-valid:text-primary peer-focus:top-0 peer-focus:text-sm peer-focus:text-primary"
                  >
                    Middle Name
                  </label>
                </div>
                <div className="relative col-span-full mt-3 md:col-span-1 md:ml-3 md:mt-0">
                  <Input
                    type="text"
                    id="lastname"
                    value={lastName}
                    onChange={handleLastNameChange}
                    className="peer block h-11 w-full rounded-lg border border-border bg-transparent px-3 pb-2 pt-5 text-sm text-foreground focus:border-primary focus:outline-none"
                    placeholder=""
                    required
                  />
                  <label
                    htmlFor="lastname"
                    className="peer-placeholder-shown:top-2.2 absolute left-3 top-2.5 max-w-full truncate pr-4 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-muted-foreground peer-valid:top-0 peer-valid:text-sm peer-valid:text-primary peer-focus:top-0 peer-focus:text-sm peer-focus:text-primary"
                  >
                    Last Name*
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
                    onValueChange={handleGenderChange}
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
                  <SelectItem value="United States">United States</SelectItem>
                  <SelectItem value="Canada">Canada</SelectItem>
                  <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                  <SelectItem value="France">France</SelectItem>
                  <SelectItem value="Germany">Germany</SelectItem>
                  <SelectItem value="India">India</SelectItem>
                  <SelectItem value="Japan">Japan</SelectItem>
                  <SelectItem value="Australia">Australia</SelectItem>
                  <SelectItem value="Brazil">Brazil</SelectItem>
                  <SelectItem value="South Africa">South Africa</SelectItem>
                  <SelectItem value="Mexico">Mexico</SelectItem>
                  <SelectItem value="Italy">Italy</SelectItem>
                  <SelectItem value="Spain">Spain</SelectItem>
                  <SelectItem value="China">China</SelectItem>
                  <SelectItem value="Russia">Russia</SelectItem>
                  <SelectItem value="South Korea">South Korea</SelectItem>
                  <SelectItem value="Vietnam">Vietnam</SelectItem>
                  <SelectItem value="Singapore">Singapore</SelectItem>
                  <SelectItem value="Thailand">Thailand</SelectItem>
                  <SelectItem value="Philippines">Philippines</SelectItem>
                  <SelectItem value="Malaysia">Malaysia</SelectItem>
                  <SelectItem value="Indonesia">Indonesia</SelectItem>
                  <SelectItem value="Pakistan">Pakistan</SelectItem>
                  <SelectItem value="Nigeria">Nigeria</SelectItem>
                  <SelectItem value="Egypt">Egypt</SelectItem>
                  <SelectItem value="United Arab Emirates">
                    United Arab Emirates
                  </SelectItem>
                  <SelectItem value="Sweden">Sweden</SelectItem>
                  <SelectItem value="Norway">Norway</SelectItem>
                  <SelectItem value="Denmark">Denmark</SelectItem>
                  <SelectItem value="Finland">Finland</SelectItem>
                  <SelectItem value="Greece">Greece</SelectItem>
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
                  onChange={handlePromoCode}
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
