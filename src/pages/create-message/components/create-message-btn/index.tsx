import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { MAIN_PATHS } from '@/routes/messages/index.enum';
import { DiamondPlus } from 'lucide-react';

const CreateMessageBtn = () => {
  const navigate = useNavigate();
  const handleOnCLick = () => {
    navigate(MAIN_PATHS.MESSAGES_CREATE);
  };
  return (
    <Button
      onClick={handleOnCLick}
      variant={'outline'}
      className="border-dotted border-2 border-logo text-primary"
    >
      <DiamondPlus />
      ADD YOUR MESSAGE
    </Button>
  );
};

export default CreateMessageBtn;
