import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CheckCircle, XCircle } from 'lucide-react'; // Import icon

const AlertDialog = ({
  open,
  onClose,
  title = 'QAirline',
  message,
  isSuccess,
}) => {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    let timer;
    if (isSuccess) {
      timer = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0)); // Giảm countdown
      }, 1000);

      // Xử lý điều hướng sau khi countdown kết thúc
      if (countdown === 0) {
        onClose(); // Gọi hàm đóng hoặc điều hướng khi countdown bằng 0
      }
    }

    return () => clearInterval(timer); // Dọn dẹp interval khi component bị unmounted
  }, [isSuccess, countdown, onClose]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[400px] rounded-lg text-center">
        <DialogHeader>
          <DialogTitle className="text-sm text-muted-foreground">
            {title}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="py-4 text-base text-foreground">
          <div className="flex justify-center py-4">
            {isSuccess ? (
              <CheckCircle className="h-16 w-16 text-green-500" /> // Tích xanh
            ) : (
              <XCircle className="h-16 w-16 text-red-500" /> // Dấu X đỏ
            )}
          </div>
          {message}
        </DialogDescription>
        <div className="flex justify-center">
          {!isSuccess ? (
            <Button
              onClick={onClose}
              className="min-w-[100px] bg-[#693e52] text-white hover:bg-[#693e52]/90"
            >
              OK
            </Button>
          ) : (
            <p className="text-center text-gray-600">
              The page will be redirected in <strong>{countdown}</strong>{' '}
              seconds.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AlertDialog;
