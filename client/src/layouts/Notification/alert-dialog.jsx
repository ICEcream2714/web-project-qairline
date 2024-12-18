import React from 'react';
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
          <Button
            onClick={onClose}
            className="min-w-[100px] bg-[#693e52] text-white hover:bg-[#693e52]/90"
          >
            OK
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AlertDialog;
