import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const Side = () => {
  return (
    <aside className="w-full px-3 md:w-64 md:max-w-sm md:px-0">
      <Card className="rounded-md border-none bg-purple-700 pb-5 text-center text-white">
        <CardHeader>
          <Avatar className="mx-auto h-24 w-24">
            <AvatarImage
              src="https://randomuser.me/api/portraits"
              alt="Hoang Nguyen"
            />
            <AvatarFallback className="text-3xl text-gray-700">
              HN
            </AvatarFallback>
          </Avatar>
          <CardTitle className="mt-4">Hoang Nguyen</CardTitle> {/* Name */}
        </CardHeader>
        <CardContent className="p-0">
          <p className="text-sm">
            Membership number: <strong>681897319</strong>
          </p>
          <div className="mt-4 space-y-1 text-sm">
            <p>Avios: 0</p>
            <p>Qpoints: 0</p>
            <p>Qcredits: 0</p>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
};

export default Side;
