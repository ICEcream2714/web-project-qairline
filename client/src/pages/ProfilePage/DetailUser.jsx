import React, { useState, useEffect } from 'react';
import { Pencil, X, Save } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const DetailUser = () => {
  const [isClickedEditBtn, setIsClickedEditBtn] = useState(false);
  const [homeAddress, setHomeAddress] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://localhost:5000/api/customer/my-info',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        const data = await response.json();
        setHomeAddress(data.address);
        setEmail(data.User.email);
        setCountryCode(data.country_code.toString()); // Convert to string
        setPhone(data.User.phone);
        setGender(data.gender);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const countryCodes = [
    { code: '1', country: 'United States' },
    { code: '44', country: 'United Kingdom' },
    { code: '91', country: 'India' },
    { code: '61', country: 'Australia' },
    { code: '84', country: 'Vietnam' },
    { code: '33', country: 'France' },
    { code: '49', country: 'Germany' },
    { code: '81', country: 'Japan' },
    { code: '55', country: 'Brazil' },
    { code: '39', country: 'Italy' },
    { code: '7', country: 'Russia' },
    { code: '34', country: 'Spain' },
    { code: '53', country: 'Cuba' },
    { code: '27', country: 'South Africa' },
    { code: '20', country: 'Egypt' },
    { code: '31', country: 'Netherlands' },
    { code: '82', country: 'South Korea' },
    { code: '46', country: 'Sweden' },
    { code: '62', country: 'Indonesia' },
    { code: '65', country: 'Singapore' },
  ];

  const handleEditBtnChange = () => {
    setIsClickedEditBtn((prevState) => !prevState);
  };

  const handleHomeAddressChange = (e) => setHomeAddress(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);
  const handleGenderChange = (value) => setGender(value);

  const handleSaveDetails = async () => {
    const detailsData = {
      address: homeAddress,
      email,
      country_code: countryCode,
      phone,
      gender,
    };

    try {
      const response = await fetch(
        'http://localhost:5000/api/customer/update-profile',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(detailsData),
        }
      );
      if (!response.ok) {
        throw new Error('Failed to update details');
      }
      const data = await response.json();
      console.log('Details updated successfully', data);
      setIsClickedEditBtn(false);
    } catch (error) {
      console.error('Error updating details:', error);
    }
  };

  return (
    <div className="mb-6 md:border-b md:border-gray-300 md:pb-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-700">
          Your contact details
        </h2>
        <button
          className={`flex items-center gap-1 ${isClickedEditBtn ? 'text-red-600' : 'text-primary'}`}
          onClick={handleEditBtnChange}
        >
          {isClickedEditBtn ? (
            <X className="h-4 w-4 text-red-600" />
          ) : (
            <Pencil className="h-4 w-4 text-primary" />
          )}

          {isClickedEditBtn ? 'Exit' : 'Edit'}
        </button>
        {isClickedEditBtn && (
          <button
            onClick={handleSaveDetails}
            className="ml-4 flex items-center gap-1 text-primary"
          >
            <Save className="h-4 w-4 text-primary" />
            Save
          </button>
        )}
      </div>
      {!isClickedEditBtn ? (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-semibold text-gray-800">Home address</p>
            <p className="text-gray-600">
              {homeAddress.length == 0 ? 'N/A' : homeAddress}
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-800">Email</p>
            <p className="text-gray-600">{email}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-800">Mobile</p>
            <p className="text-gray-600">
              {countryCode} {phone}
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-800">Gender</p>
            <p className="text-gray-600">{gender}</p>
          </div>
          {/* <div>
            <p className="font-semibold text-gray-800">Home/work phone</p>
            <p className="text-gray-600">N/A</p>
          </div> */}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-full md:col-span-2 md:w-[360px]">
            <div className="relative">
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
                className="peer-placeholder-shown:top-2.2 absolute left-3 top-2.5 max-w-full truncate pr-4 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-muted-foreground peer-valid:top-0.5 peer-valid:text-sm peer-valid:text-primary peer-focus:top-0 peer-focus:text-sm peer-focus:text-primary"
              >
                Email
              </label>
            </div>
          </div>

          <div className="col-span-full md:col-span-1">
            <div className="relative">
              <Select
                id="countrycode"
                onValueChange={(value) => {
                  setCountryCode(value);
                }}
                value={countryCode}
                className="peer w-full"
              >
                <SelectTrigger className="peer h-11 w-full rounded-lg border border-border bg-transparent px-3 pb-2 pt-5 text-sm text-foreground focus:border-primary focus:outline-none">
                  <SelectValue placeholder="Select country code" />
                </SelectTrigger>
                <SelectContent>
                  {countryCodes.map((item) => (
                    <SelectItem key={item.code} value={item.code}>
                      +{item.code} {item.country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <label
                htmlFor="countrycode"
                className="peer-placeholder-shown:top-2.2 absolute left-3 top-1 max-w-full truncate pr-4 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-muted-foreground peer-valid:top-0.5 peer-valid:text-sm peer-valid:text-primary peer-focus:top-0 peer-focus:text-sm peer-focus:text-primary"
              >
                Country Code
              </label>
            </div>
          </div>

          <div className="col-span-full md:col-span-1">
            <div className="relative">
              <Input
                type="text"
                id="phone"
                value={phone}
                onChange={handlePhoneChange}
                className="peer block h-11 w-full rounded-lg border border-border bg-transparent px-3 pb-2 pt-5 text-sm text-foreground focus:border-primary focus:outline-none"
                placeholder=""
                required
              />
              <label
                htmlFor="phone"
                className="peer-placeholder-shown:top-2.2 absolute left-3 top-2.5 max-w-full truncate pr-4 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-muted-foreground peer-valid:top-0.5 peer-valid:text-sm peer-valid:text-primary peer-focus:top-0 peer-focus:text-sm peer-focus:text-primary"
              >
                Phone number
              </label>
            </div>
          </div>

          <div className="col-span-full md:col-span-1">
            <div className="relative">
              <Select
                id="gender"
                onValueChange={handleGenderChange}
                value={gender}
                className="peer w-full"
              >
                <SelectTrigger className="peer h-11 w-full rounded-lg border border-border bg-transparent px-3 pb-2 pt-5 text-sm text-foreground focus:border-primary focus:outline-none">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <label
                htmlFor="gender"
                className="peer-placeholder-shown:top-2.2 absolute left-3 top-1 max-w-full truncate pr-4 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-muted-foreground peer-valid:top-0.5 peer-valid:text-sm peer-valid:text-primary peer-focus:top-0 peer-focus:text-sm peer-focus:text-primary"
              >
                Gender
              </label>
            </div>
          </div>

          <div className="col-span-full md:col-span-1">
            <div className="relative">
              <Input
                type="text"
                id="homeaddress"
                value={homeAddress}
                onChange={handleHomeAddressChange}
                className="peer block h-11 w-full rounded-lg border border-border bg-transparent px-3 pb-2 pt-5 text-sm text-foreground focus:border-primary focus:outline-none"
                placeholder=""
                required
              />
              <label
                htmlFor="homeaddress"
                className="peer-placeholder-shown:top-2.2 absolute left-3 top-2.5 max-w-full truncate pr-4 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-muted-foreground peer-valid:top-0.5 peer-valid:text-sm peer-valid:text-primary peer-focus:top-0 peer-focus:text-sm peer-focus:text-primary"
              >
                Home address
              </label>
            </div>
          </div>

          {/* <div className="col-span-full px-2.5 md:col-span-1">
            <p className="font-semibold text-primary">Home/work phone</p>
            <p className="text-primary">N/A</p>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default DetailUser;
