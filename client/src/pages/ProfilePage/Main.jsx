
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  CreditCard,
  User,
  Settings2,
  UserPlus,
  UsersRound,
  Pencil,
} from 'lucide-react';

const Main = () => {
  return (
    <div className="max-w-3xl">
      {/* Accordion visible on mobile*/}
      <div className="block md:hidden">
        <Accordion
          className="mx-3"
          type="single"
          defaultValue="personalDetails"
          collapsible
        >
          <AccordionItem value="personalDetails">
            <AccordionTrigger className="flex items-center justify-start gap-4 [&[data-state=open]>svg]:rotate-0">
              <User className="h-6 w-6" />
              <span className="flex-1">Personal details</span>
            </AccordionTrigger>
            <AccordionContent>
              <h1 className="text-2xl font-bold">More about you</h1>
              <p>
                Fill in your details to complete your profile. For a smooth
                travel experience, ensure your passport number and expiry date
                are valid.
              </p>
              {/* Thông tin cá nhân */}
              <div className="mb-6 mt-6 flex items-center gap-4 border-b border-gray-300 pb-6 md:gap-6">
                {/* Avatar */}
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="https://via.placeholder.com/150" />
                    <AvatarFallback>HN</AvatarFallback>
                  </Avatar>
                  <button className="absolute bottom-0 right-0 rounded-full bg-white p-1 shadow">
                    <Pencil className="h-4 w-4 text-purple-600" />
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
              <div className="mb-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-700">
                    Your contact details
                  </h2>
                  <button className="flex items-center gap-1 text-purple-600">
                    <Pencil className="h-4 w-4" />
                    Edit
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-gray-800">Home address</p>
                    <p className="text-gray-600">Vietnam</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Email</p>
                    <p className="text-gray-600">mtchoang271@gmail.com</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Mobile</p>
                    <p className="text-gray-600">(84) 793258778</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      Home/work phone
                    </p>
                    <p className="text-gray-600">N/A</p>
                  </div>
                </div>
              </div>

              {/* Tài liệu du lịch */}
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-700">
                    Your travel documents
                  </h2>
                  <button className="flex items-center gap-1 text-purple-600">
                    <Pencil className="h-4 w-4" />
                    Edit
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-gray-800">
                      Passport Details
                    </p>
                    <p className="text-gray-600">N/A</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Nationality</p>
                    <p className="text-gray-600">N/A</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      Passport number
                    </p>
                    <p className="text-gray-600">N/A</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Expiry date</p>
                    <p className="text-gray-600">N/A</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      National ID number
                    </p>
                    <p className="text-gray-600">N/A</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      Redress number
                    </p>
                    <p className="text-gray-600">N/A</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      Known traveler number
                    </p>
                    <p className="text-gray-600">N/A</p>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="paymentMethods">
            <AccordionTrigger className="flex items-center justify-start gap-4 [&[data-state=open]>svg]:rotate-0">
              <CreditCard className="h-6 w-6" />
              <span className="flex-1">Payment methods</span>
            </AccordionTrigger>
            <AccordionContent>Payment methods content</AccordionContent>
          </AccordionItem>
          <AccordionItem value="preferences">
            <AccordionTrigger className="flex items-center justify-start gap-4 [&[data-state=open]>svg]:rotate-0">
              <Settings2 className="h-6 w-6" />
              <span className="flex-1">Preferences</span>
            </AccordionTrigger>
            <AccordionContent>Preferences content</AccordionContent>
          </AccordionItem>
          <AccordionItem value="travelCompanion">
            <AccordionTrigger className="flex items-center justify-start gap-4 [&[data-state=open]>svg]:rotate-0">
              <UserPlus className="h-6 w-6" />
              <span className="flex-1">Travel Companion</span>
            </AccordionTrigger>
            <AccordionContent>Travel Companion content</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Tabs visible on desktop*/}
      <div className="hidden md:block">
        <Tabs
          defaultValue="personalDetails"
          className="h-screen-plus max-w-screen-2xl bg-background"
        >
          <TabsList className="m-0 flex h-auto flex-row rounded-none p-0">
            <TabsTrigger
              value="personalDetails"
              className="flex h-32 w-40 flex-col items-center justify-center"
            >
              <User className="mb-2 h-10 w-10" />
              Personal details
            </TabsTrigger>
            <TabsTrigger
              value="paymentMethods"
              className="flex h-32 w-40 flex-col items-center justify-center"
            >
              <CreditCard className="mb-2 h-10 w-10" />
              Payment methods
            </TabsTrigger>
            <TabsTrigger
              value="preferences"
              className="flex h-32 w-40 flex-col items-center justify-center"
            >
              <Settings2 className="mb-2 h-10 w-10" />
              Preferences
            </TabsTrigger>
            <TabsTrigger
              value="travelCompanion"
              className="flex h-32 w-40 flex-col items-center justify-center"
            >
              <UserPlus className="mb-2 h-10 w-10" />
              Travel Companion
            </TabsTrigger>
            <TabsTrigger
              value="myFamily"
              className="flex h-32 w-40 flex-col items-center justify-center"
            >
              <UsersRound className="mb-2 h-10 w-10" />
              My Family
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="personalDetails"
            className="mt-3 max-w-full content-center overflow-x-hidden px-4"
          >
            <h1 className="text-2xl font-bold">More about you</h1>
            <p>
              Fill in your details to complete your profile. For a smooth travel
              experience, ensure your passport number and expiry date are valid.
            </p>
            {/* Thông tin cá nhân */}
            <div className="mb-6 mt-6 flex items-center gap-4 border-b border-gray-300 pb-6 md:gap-6">
              {/* Avatar */}
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="https://via.placeholder.com/150" />
                  <AvatarFallback>HN</AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 rounded-full bg-white p-1 shadow">
                  <Pencil className="h-4 w-4 text-purple-600" />
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
            <div className="mb-6 border-b border-gray-300 pb-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-700">
                  Your contact details
                </h2>
                <button className="flex items-center gap-1 text-purple-600">
                  <Pencil className="h-4 w-4" />
                  Edit
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold text-gray-800">Home address</p>
                  <p className="text-gray-600">Vietnam</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Email</p>
                  <p className="text-gray-600">mtchoang271@gmail.com</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Mobile</p>
                  <p className="text-gray-600">(84) 793258778</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Home/work phone</p>
                  <p className="text-gray-600">N/A</p>
                </div>
              </div>
            </div>

            {/* Tài liệu du lịch */}
            <div className="border-b border-gray-300 pb-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-700">
                  Your travel documents
                </h2>
                <button className="flex items-center gap-1 text-purple-600">
                  <Pencil className="h-4 w-4" />
                  Edit
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold text-gray-800">
                    Passport Details
                  </p>
                  <p className="text-gray-600">N/A</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Nationality</p>
                  <p className="text-gray-600">N/A</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Passport number</p>
                  <p className="text-gray-600">N/A</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Expiry date</p>
                  <p className="text-gray-600">N/A</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">
                    National ID number
                  </p>
                  <p className="text-gray-600">N/A</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Redress number</p>
                  <p className="text-gray-600">N/A</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">
                    Known traveler number
                  </p>
                  <p className="text-gray-600">N/A</p>
                </div>
              </div>
            </div>
            {/*  */}
            <div className="mb-6 mt-6 flex flex-col gap-4 pb-6 md:gap-6">
              <h2 className="text-lg font-semibold text-gray-700">
                Account settings
              </h2>
              <p>
                <strong>Delete account:</strong> Any bookings linked to this
                account will remain valid, even if you delete your account.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="paymentMethods">
            Payment methods content
          </TabsContent>
          <TabsContent value="preferences">Preferences content</TabsContent>
          <TabsContent value="travelCompanion">
            Travel Companion content
          </TabsContent>
          <TabsContent value="myFamily">My Family content</TabsContent>
          <TabsContent value="myTravelCoordinators">
            My travel coordinators content
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Main;
