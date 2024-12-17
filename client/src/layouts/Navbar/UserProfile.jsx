import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CircleUserRound } from 'lucide-react';

const UserProfile = ({
  name,
  id,
  tier,
  avios,
  qpoints,
  onLogout,
  isScrolled = false,
}) => {
  const navigate = useNavigate();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="link"
          className="p-0 font-semibold hover:text-purple-600 [&_svg]:size-auto"
        >
          <CircleUserRound
            size={24}
            className={`${isScrolled ? 'text-gray-800' : 'text-white'}`}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <div className="rounded-md bg-gradient-to-r from-[#3c1053] to-[#ad5389] p-6">
          <div className="space-y-1 text-white">
            <h4 className="text-xl font-semibold">{name}</h4>
            <p className="text-sm opacity-90">
              {id} | {tier}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 bg-white p-4 pl-8">
          <div>
            <div className="text-2xl font-bold">{avios}</div>
            <div className="text-sm text-gray-500">Avios</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{qpoints}</div>
            <div className="text-sm text-gray-500">Qpoints</div>
          </div>
        </div>

        <div className="flex justify-self-center border-t p-4">
          <Button
            variant="link"
            className="text-gray-700 hover:text-purple-600"
            onClick={() => navigate('/mybooking')}
          >
            My bookings
          </Button>
          <Button
            variant="link"
            onClick={() => navigate('/profile')}
            className="text-gray-700 hover:text-purple-600"
          >
            Edit profile
          </Button>
          <Button
            variant="link"
            onClick={onLogout}
            className="text-gray-700 hover:text-purple-600"
          >
            Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserProfile;
