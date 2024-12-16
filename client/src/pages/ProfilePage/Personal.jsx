import React from 'react';
import DetailUser from './DetailUser';
import TravelDoc from './TravelDoc';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pencil } from 'lucide-react';

const Personal = () => {
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
              <AvatarImage src="https://via.placeholder.com/150" />
              <AvatarFallback>HN</AvatarFallback>
            </Avatar>
            <button className="absolute bottom-0 right-0 rounded-full bg-white p-1 shadow">
              <Pencil className="h-4 w-4 text-primary" />
            </button>
          </div>

          {/* Thông tin chi tiết */}
          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              Mr. Hoang Nguyen Tran Cong
            </h1>
            <p className="text-gray-600">Born: 27 January 2004</p>
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
