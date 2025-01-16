import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useUpdateMessage } from '@/react-query/mutation';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { MessagesType } from '../messages/index.types';

const UpdateMessage = ({ message }: { message: MessagesType }) => {
  const { t } = useTranslation();
  console.log('message', message);
  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      from: message.from,
      to: message.to,
      message: message.message,
      avatar: message.avatar,
      user_id: message.user_id,
    },
  });

  const onSuccess = () => {
    console.log('Message updated successfully');
  };

  const onError = () => {
    console.error('Failed to update message');
  };

  const { mutate: updateMessageMutate } = useUpdateMessage(onSuccess, onError);

  const onSubmit = (values: {
    from: string;
    to: string;
    message: string;
    avatar: string;
    user_id: string;
  }) => {
    console.log(values);
    updateMessageMutate({
      messageId: message.id,
      data: values,
    });
  };
  return (
    <div>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col gap-3">
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
                  <div className="">
                    <Input
                      placeholder={t('from-placeholder')}
                      onChange={onChange}
                      value={value}
                      className="border border-muted-foreground"
                    />
                    {formState.errors?.from && (
                      <p className="text-red-500">
                        {t(
                          typeof formState.errors.from.message === 'string'
                            ? formState.errors.from.message
                            : 'validation.default-error'
                        )}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
            <div className="flex justify-start items-center gap-1">
              <label
                htmlFor="to"
                className="w-24 text-start
          "
              >
                {t('to')}
              </label>
              <Controller
                name="to"
                control={control}
                rules={{
                  required: 'validation.to-required',
                }}
                render={({ field: { onChange, value } }) => (
                  <div className="">
                    <Input
                      onChange={onChange}
                      value={value}
                      placeholder={t('to-placeholder')}
                      type="text"
                      className={`border ${
                        formState.errors?.to
                          ? 'border-red-500'
                          : 'border-muted-foreground'
                      }`}
                    />
                    {formState.errors?.to && (
                      <p className="text-red-500">
                        {t(
                          typeof formState.errors.to.message === 'string'
                            ? formState.errors.to.message
                            : 'validation.default-error'
                        )}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
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
                          typeof formState.errors.message.message === 'string'
                            ? formState.errors.message.message
                            : 'validation.default-error'
                        )}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            type="button"
            onClick={() => {
              handleSubmit(onSubmit)();
              setTimeout(() => {
                window.location.reload();
              }, 500); // Delay for 1 second
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </div>
  );
};

export default UpdateMessage;
