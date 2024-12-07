import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';

const Family = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl text-primary">
          Nominate family member
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <p className="text-muted-foreground">
            You can nominate up to nine family members including and limited to
            your spouse, children older than 2 years, parents and the parents of
            your spouse to your Privilege Club membership.
          </p>
          <p className="text-primary">
            The higher your Privilege Club membership tier, the more Avios your
            family members will earn.
          </p>
        </div>

        <Button
          variant="outline"
          className="h-48 w-full border-2 border-dashed hover:border-muted-foreground hover:bg-primary/5"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Plus className="h-6 w-6" />
            </div>
            <span className="text-muted-foreground">Add family member</span>
          </div>
        </Button>

        <Button variant="link" className="text-primary hover:text-primary/80">
          → More about the family programme
        </Button>
      </CardContent>
    </Card>
  );
};

export default Family;
