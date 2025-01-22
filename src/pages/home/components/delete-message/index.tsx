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
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

const DeleteMessage = ({ messageId }: { messageId: number }) => {
  const { t } = useTranslation();
  const onDeleteSuccess = () => {
    toast('Deleted');
    setTimeout(() => {
      window.location.reload();
    }, 500);
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
          <AlertDialogTitle>{t('are-you-sure')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('action-undo-warning')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete(messageId)}>
            {t('delete')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteMessage;
