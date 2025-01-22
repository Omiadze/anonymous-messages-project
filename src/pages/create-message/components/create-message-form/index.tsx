import { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch'; // Import your Switch and Label
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '@/context/hooks/use-auth-context';
import { Textarea } from '@/components/ui/textarea';
import { usePostMessages } from '@/react-query/mutation';
import { useGetProfileInfo } from '@/react-query/query';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { messageSchema } from './schema';
import { toast } from 'sonner';

const CreateMessageForm = () => {
  const { t } = useTranslation();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const { data, isSuccess } = useGetProfileInfo(user?.user.id);

  const { control, handleSubmit, formState, reset } = useForm({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      from: '',
      to: '',
      message: '',
      avatar: data?.avatar_url || 'none',
      user_id: user?.user?.id || '',
    },
  });

  useEffect(() => {
    if (isSuccess && data?.avatar_url) {
      reset((formValues) => ({
        ...formValues,
        avatar: data.avatar_url || 'none',
      }));
    }
  }, [data, isSuccess, reset]);

  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleToggleAnonymous = (checked: boolean) => {
    setIsAnonymous(checked);
    if (checked) {
      reset((formValues) => ({
        ...formValues,
        from: 'Anonymous',
      }));
    } else {
      reset((formValues) => ({
        ...formValues,
        from: '',
      }));
    }
  };

  const onSuccess = () => {
    toast('created');
    setTimeout(() => {
      navigate('/');
    }, 500);
  };

  const onError = () => {
    alert('Failed to send the message. Please try again.');
  };

  const { mutate: handlePostMessages } = usePostMessages(onSuccess, onError);

  const onSubmit = (values: {
    from: string;
    to: string;
    message: string;
    avatar: string;
    user_id: string;
  }) => {
    if (!user?.user.id) {
      console.log('user id is undefined!');
      return;
    }

    handlePostMessages(values);
  };

  return (
    <Card className="w-full ">
      <CardHeader className="space-y-1 text-center flex flex-row gap-6"></CardHeader>
      <CardContent className="grid gap-6">
        {/* Anonymous Toggle */}
        <div className="flex items-center gap-4">
          <Switch
            id="anonymous-toggle"
            onCheckedChange={handleToggleAnonymous}
            checked={isAnonymous}
          />
          <Label htmlFor="anonymous-toggle">{t('Send as Anonymous')}</Label>
        </div>

        {/* From Input */}
        <div className="flex justify-start items-center gap-1">
          <label htmlFor="from" className="w-24 text-start">
            {t('from')}
          </label>
          <Controller
            name="from"
            control={control}
            rules={{
              required: 'validation.from-required',
            }}
            render={({ field: { onChange, value } }) => (
              <div>
                <Input
                  placeholder={t('from-placeholder')}
                  onChange={onChange}
                  value={value}
                  disabled={isAnonymous} // Disable when anonymous
                  className="border border-muted-foreground"
                />
                {formState.errors?.from && (
                  <p className="text-red-500">
                    {t(
                      formState.errors?.from?.message ??
                        'validation.default-error'
                    )}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        {/* To Input */}
        <div className="flex justify-start items-center gap-1">
          <label htmlFor="to" className="w-24 text-start">
            {t('to')}
          </label>
          <Controller
            name="to"
            control={control}
            rules={{
              required: 'validation.to-required',
            }}
            render={({ field: { onChange, value } }) => (
              <div>
                <Input
                  placeholder={t('to-placeholder')}
                  onChange={onChange}
                  value={value}
                  className={`border ${
                    formState.errors?.to
                      ? 'border-red-500'
                      : 'border-muted-foreground'
                  }`}
                />
                {formState.errors?.to && (
                  <p className="text-red-500">
                    {t(
                      formState.errors?.to?.message ??
                        'validation.default-error'
                    )}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        {/* Message Input */}
        <div className="grid gap-2 text-start">
          <label htmlFor="message">{t('message')}</label>
          <Controller
            name="message"
            control={control}
            rules={{
              required: t('validation.message-required'),
            }}
            render={({ field: { onChange, value } }) => (
              <div className="w-full flex gap-2">
                <Textarea
                  id="message"
                  placeholder={t('message-placeholder')}
                  onChange={onChange}
                  value={value}
                  className="border border-muted-foreground"
                />
                {formState.errors?.message && (
                  <p className="text-red-500">
                    {t(
                      formState.errors.message.message ??
                        'validation.default-error'
                    )}
                  </p>
                )}
                <Button onClick={handleSubmit(onSubmit)} className="h-full">
                  {t('send')}
                </Button>
              </div>
            )}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2"></CardFooter>
    </Card>
  );
};

export default CreateMessageForm;
