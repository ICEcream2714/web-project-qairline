import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const ConfirmDialog = ({ isOpen, onConfirm, onCancel, title, message }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent
        className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl p-4 sm:p-6 md:p-8 rounded-lg"
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-bold md:text-xl">
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="p-4 text-sm md:text-base">
          <p>{message}</p>
        </div>
        <DialogFooter className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
          <Button
            onClick={onCancel}
            className="w-full sm:w-auto bg-gray-500 text-white hover:bg-gray-600"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700"
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
