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
import DetailUser from './DetailUser';
import TravelDoc from './TravelDoc';
import PaymentMed from './PaymentMed';
import Preferences from './Preferences';
import Companion from './Companion';
import Family from './Family';
import Personal from './Personal';

const Main = () => {
  return (
    <div className="max-w-4xl">
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
              <span className="flex-1">Personfal details</span>
            </AccordionTrigger>
            <AccordionContent>
              <Personal />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="paymentMethods">
            <AccordionTrigger className="flex items-center justify-start gap-4 [&[data-state=open]>svg]:rotate-0">
              <CreditCard className="h-6 w-6" />
              <span className="flex-1">Payment methods</span>
            </AccordionTrigger>
            <AccordionContent>
              <PaymentMed />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="preferences">
            <AccordionTrigger className="flex items-center justify-start gap-4 [&[data-state=open]>svg]:rotate-0">
              <Settings2 className="h-6 w-6" />
              <span className="flex-1">Preferences</span>
            </AccordionTrigger>
            <AccordionContent>
              <Preferences />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="travelCompanion">
            <AccordionTrigger className="flex items-center justify-start gap-4 [&[data-state=open]>svg]:rotate-0">
              <UserPlus className="h-6 w-6" />
              <span className="flex-1">Travel Companion</span>
            </AccordionTrigger>
            <AccordionContent>
              <Companion />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="myFamily">
            <AccordionTrigger className="flex items-center justify-start gap-4 [&[data-state=open]>svg]:rotate-0">
              <UsersRound className="h-6 w-6" />
              <span className="flex-1">My Family</span>
            </AccordionTrigger>
            <AccordionContent>
              <Family />
            </AccordionContent>
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
            <Personal />
          </TabsContent>
          <TabsContent
            value="paymentMethods"
            className="mt-3 max-w-full content-center overflow-x-hidden px-4"
          >
            <PaymentMed />
          </TabsContent>
          <TabsContent
            value="preferences"
            className="mt-3 max-w-full content-center overflow-x-hidden px-4"
          >
            <Preferences />
          </TabsContent>
          <TabsContent
            value="travelCompanion"
            className="mt-3 max-w-full content-center overflow-x-hidden px-4"
          >
            <Companion />
          </TabsContent>
          <TabsContent
            value="myFamily"
            className="mt-3 max-w-full content-center overflow-x-hidden px-4"
          >
            <Family />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Main;
