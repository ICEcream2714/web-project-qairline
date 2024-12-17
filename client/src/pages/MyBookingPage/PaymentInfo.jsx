import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CreditCard } from 'lucide-react';

const PaymentInfo = ({ payment }) => {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="mb-2 text-lg font-semibold">Payment Information</h3>
        <div className="space-y-2">
          <p>Status: {payment.payment_status}</p>
          <p>Method: {payment.payment_method}</p>
          <div className="flex items-center">
            <CreditCard className="mr-2" size={20} />
            <span>**** **** **** {payment.card_number.slice(-4)}</span>
          </div>
          <p>Cardholder: {payment.cardholder_name}</p>
          <p>Expiry: {payment.expiry_date}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentInfo;
