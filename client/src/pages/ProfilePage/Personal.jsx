import React, { useState, useRef, useEffect } from 'react';
import DetailUser from './DetailUser';
import TravelDoc from './TravelDoc';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pencil, X, Save } from 'lucide-react';
import { Input } from '@/components/ui/input';
import DatePicker from '@/components/DatePicker';

const Personal = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [avatar, setAvatar] = useState('');
  const fileInputRef = useRef(null);

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
        setTitle(data.title);
        setFirstName(data.first_name);
        setMiddleName(data.middle_name);
        setLastName(data.last_name);
        setDob(
          data.date_of_birth
            ? new Date(data.date_of_birth).toLocaleDateString()
            : ''
        );
        setAvatar(data.profilePictureUrl);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
        saveAvatarToServer(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveAvatarToServer = async (avatarData) => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/customer/update-profile',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ profilePicture: avatarData }),
        }
      );
      if (!response.ok) {
        throw new Error('Failed to update avatar');
      }
      const data = await response.json();
      setAvatar(data.profilePicture);
      console.log('Avatar updated successfully');
    } catch (error) {
      console.error('Error updating avatar:', error);
    }
  };

  const handleSaveProfile = async () => {
    const profileData = {
      title,
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      date_of_birth: dob,
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
          body: JSON.stringify(profileData),
        }
      );
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      const data = await response.json();
      console.log('Profile updated successfully', data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const fullName = `${title} ${firstName} ${middleName} ${lastName}`;
  const shortName = `${firstName.charAt(0)}${lastName.charAt(0)}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl text-primary">More about you</CardTitle>
        <p>
          Fill in your details to complete your profile. For a smooth travel
          experience, ensure your passport number and expiry date are valid.
        </p>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex items-center gap-4 border-b border-gray-300 pb-6 md:gap-6">
          {/* Avatar */}
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src={avatar} />
              <AvatarFallback>{shortName}</AvatarFallback>
            </Avatar>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              className="absolute bottom-0 right-0 rounded-full bg-white p-1 shadow"
              onClick={handleAvatarClick}
            >
              <Pencil className="h-4 w-4 text-primary" />
            </button>
          </div>

          {/* Thông tin chi tiết */}
          <div>
            {isEditing ? (
              <>
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mb-2 w-[300px]"
                />
                <Input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="mb-2 w-[300px]"
                />
                <Input
                  type="text"
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                  className="mb-2 w-[300px]"
                />
                <Input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="mb-2 w-[300px]"
                />
                <DatePicker
                date={dob}
                setDate={(e) => setDob(e.target.value)}
                />
              </>
            ) : (
              <>
                <h1 className="text-xl font-semibold text-gray-800">
                  {fullName}
                </h1>
                <p className="text-gray-600">Born: {dob}</p>
              </>
            )}
          </div>
          <div className="ml-auto flex flex-col items-center gap-1">
            <button
              onClick={handleEditClick}
              className={`flex items-center gap-1 ${isEditing ? 'text-red-600' : 'text-primary'}`}
            >
              {isEditing ? (
                <X className="h-4 w-4 text-red-600" />
              ) : (
                <Pencil className="h-4 w-4 text-primary" />
              )}
              {isEditing ? 'Exit' : 'Edit'}
            </button>
            {isEditing && (
              <button
                onClick={handleSaveProfile}
                className="mt-4 flex items-center gap-1 text-primary"
              >
                <Save className="h-4 w-4 text-primary" />
                Save
              </button>
            )}
          </div>
        </div>

        {/* Liên hệ */}
        <DetailUser />

        {/* Tài liệu du lịch */}
        <TravelDoc />
        {/*  */}
        <div className="mb-6 mt-6 flex flex-col gap-4 pb-6 md:gap-6">
          <h2 className="text-lg font-semibold text-gray-700">
            Account settings
          </h2>
          <p>
            <strong>Delete account:</strong> Any bookings linked to this account
            will remain valid, even if you delete your account.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Personal;
