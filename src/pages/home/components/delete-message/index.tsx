import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useDeleteMessage } from '@/react-query/mutation';
import { Trash2 } from 'lucide-react';

const DeleteMessage = ({ messageId }: { messageId: number }) => {
  const onDeleteSuccess = () => {
    console.log('Message deleted successfully');
    setTimeout(() => {
      window.location.reload();
    }, 500);
    // Optionally trigger a refetch or update local state
  };

  const onDeleteError = () => {
    console.error('Failed to delete the message');
  };
  const { mutate: deleteMessage } = useDeleteMessage(
    onDeleteSuccess,
    onDeleteError
  );

  const handleDelete = (id: number) => {
    deleteMessage(id);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash2 className="w-4 cursor-pointer text-destructive" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            message and remove data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete(messageId)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteMessage;
