import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { MAIN_PATHS } from '@/routes/messages/index.enum';
import { DiamondPlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const CreateMessageBtn = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleOnCLick = () => {
    navigate(MAIN_PATHS.MESSAGES_CREATE);
  };
  return (
    <Button
      onClick={handleOnCLick}
      variant={'outline'}
      className="border-dotted border-2 border-logo text-primary hover:text-primary"
    >
      <DiamondPlus />
      {t('add-your-message')}
    </Button>
  );
};

export default CreateMessageBtn;
