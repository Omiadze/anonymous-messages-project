import { Controller, useForm } from 'react-hook-form';
import { ProfileDefaultValues } from '../components/default-values';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { useAuthContext } from '@/context/hooks/use-auth-context';
import { useEffect } from 'react';
import { Select } from '@radix-ui/react-select';
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetProfileInfo } from '@/react-query/query';
import { useFillProfileInfo } from '@/react-query/mutation';

const ProfilePage = () => {
  const { user } = useAuthContext();

  const { data, isSuccess } = useGetProfileInfo(user?.user.id);

  const { mutate: handleFillProfileInfo } = useFillProfileInfo();

  const { control, handleSubmit, formState, reset } = useForm({
    defaultValues: ProfileDefaultValues,
  });

  useEffect(() => {
    if (isSuccess && data?.data?.length) {
      reset({
        username: data.data[0]?.username || '',
        full_name: data.data[0]?.full_name || '',
        avatar_url: data.data[0]?.avatar_url || '',
      });
    }
  }, [isSuccess, data, reset]);

  const { t } = useTranslation();

  const onSubmit = (values: {
    username: string;
    full_name: string;
    avatar_url: string;
  }) => {
    const { username, full_name, avatar_url } = values;
    if (!user?.user.id) {
      console.log('user id is undefined!');
      return;
    }
    console.log(username, full_name, avatar_url, user.user.id);
    handleFillProfileInfo({ ...values, id: user.user.id });
  };
  return (
    <Card className="w-full mb- ">
      <CardHeader className="space-y-1 text-center flex flex-row gap-6 ">
        <div className="flex flex-col items-center gap-4">
          <Avatar className="h-20 w-20 border-2 border-primary">
            <AvatarImage
              src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${data?.data?.[0]?.avatar_url}`}
              alt="Profile Picture"
            />
            <AvatarFallback>
              {data?.data?.[0]?.username || 'ANONYMOUS'}
            </AvatarFallback>
          </Avatar>
        </div>
        <div>
          <CardTitle className="text-2xl mb-4">{t('profile')}</CardTitle>
          <CardDescription>{t('personal-info')}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-2 text-start">
          <label htmlFor="username">{t('your-username')}</label>
          <Controller
            name="username"
            control={control}
            rules={{
              required: 'validation.username-required',
            }}
            render={({ field: { onChange, value } }) => (
              <div className="w-full">
                <Input
                  placeholder={t('username')}
                  onChange={onChange}
                  value={value}
                  className="border border-muted-foreground"
                />
                {formState.errors?.username && (
                  <p className="text-red-500">
                    {t(
                      formState.errors?.username?.message ??
                        'validation.default-error'
                    )}
                  </p>
                )}
              </div>
            )}
          />
        </div>
        <div className="grid gap-2 text-start">
          <label htmlFor="">{t('your-full_name')}</label>
          <Controller
            name="full_name"
            control={control}
            rules={{
              required: 'validation.full_name-required',
            }}
            render={({ field: { onChange, value } }) => (
              <div className="w-full">
                <Input
                  onChange={onChange}
                  value={value}
                  placeholder={t('full_name-placeholder')}
                  type="text"
                  className={`border ${
                    formState.errors?.full_name
                      ? 'border-red-500'
                      : 'border-muted-foreground'
                  }`}
                />
                {formState.errors?.full_name && (
                  <p className="text-red-500">
                    {t(
                      formState.errors?.full_name?.message ??
                        'validation.default-error'
                    )}
                  </p>
                )}
              </div>
            )}
          />
        </div>
        <div className="grid gap-2 text-start">
          <label htmlFor="">{t('choose-avatar')}</label>
          <Controller
            name="avatar_url"
            control={control}
            rules={{
              required: 'Avatar selection is required',
            }}
            render={({ field: { onChange, value } }) => (
              <div className="w-full ">
                <Select
                  onValueChange={(selectedValue) => onChange(selectedValue)} // Correctly binds to onChange
                  value={value} // Synchronizes with the controlled field value
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an avatar" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      { value: 'Eden', label: 'Eden' },
                      { value: 'Sadie', label: 'Sadie' },
                      { value: 'Sara', label: 'Sara' },
                      { value: 'Oliver', label: 'Oliver' },
                      { value: 'Mason', label: 'Mason' },
                      { value: 'Amaya', label: 'Amaya' },
                      { value: 'Alexander', label: 'Alexander' },
                      { value: 'Jameson', label: 'Jameson' },
                      { value: 'Brian', label: 'Brian' },
                      { value: 'Brooklynn', label: 'Brooklynn' },
                      { value: 'Aiden', label: 'Aiden' },
                      { value: 'Sawyer', label: 'Sawyer' },
                      { value: 'Sophia', label: 'Sophia' },
                      { value: 'Destiny', label: 'Destiny' },
                      { value: 'Kingston', label: 'Kingston' },
                      { value: 'Caleb', label: 'Caleb' },
                      { value: 'Chase', label: 'Chase' },
                      { value: 'Aidan', label: 'Aidan' },
                      { value: 'Adrian', label: 'Adrian' },
                      { value: 'Leo', label: 'Leo' },
                    ].map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex justify-center items-center gap-4 text-logo">
                          <img
                            className="w-9"
                            src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${option.value}`}
                            alt="avatar"
                          />
                          {option.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formState.errors?.avatar_url && (
                  <p className="text-red-500">
                    {t(
                      formState.errors.avatar_url.message ??
                        'validation.default-error'
                    )}
                  </p>
                )}
              </div>
            )}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button
          className="w-full rounded-2xl bg-primary"
          onClick={handleSubmit(onSubmit)}
        >
          {t('submit')}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfilePage;
