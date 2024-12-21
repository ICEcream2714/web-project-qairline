import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

const PaymentMed = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>
          <h1 className="text-2xl text-secondary">Manage payment methods</h1>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-start space-x-4 text-muted-foreground">
          <AlertCircle className="mt-1 h-5 w-5 flex-shrink-0" />
          <div>
            <p>You don't have any preferred payment details.</p>
            <p className="mt-2">
              Remember to select the checkbox the next time you make a payment
              so that your card and billing address details can be saved.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentMed;
