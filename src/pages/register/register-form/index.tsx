import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Controller, useForm } from 'react-hook-form';
import Logo from '@/assets/logo.png';
import { RegisterDefaultValues } from '../default-values';
import { useNavigate, useParams } from 'react-router-dom';
import { useRegister } from '@/react-query/mutation/auth';
import { AUTH_PATHS } from '@/routes/messages/index.enum';
import { RegisterSchema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

function Register() {
  const { t } = useTranslation();
  const { lang } = useParams();
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: RegisterDefaultValues,
  });

  const { mutate: handleRegister } = useRegister(() => {
    toast(t('check-email'));
    navigate(`/${lang}/${AUTH_PATHS.LOGIN}`);
  });

  const onSubmit = (data: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    const { email, password, confirmPassword } = data;

    if (password !== confirmPassword) {
      toast(t('passwords-dont-match'));
      return;
    }
    handleRegister({ email, password });
  };

  return (
    <div className="flex h-screen items-center justify-center ">
      <div className="w-full max-w-md rounded border-2 bg-card p-8 shadow">
        <div className="mb-8 flex flex-col items-center justify-center text-foreground ">
          <div className="flex justify-center items-center">
            <img
              src={Logo}
              alt="Logo"
              className="w-10 h-10 hover:cursor-pointer"
            />
            <h1 className=" text-center text-2xl font-bold text-primary">
              {t('unspoken-words')}
            </h1>
            <img
              src={Logo}
              alt="Logo"
              className="w-10 h-10 hover:cursor-pointer"
            />
          </div>
          <p>{t('sign-up-subtitle')}</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 text-muted-foreground">
          <label htmlFor="email">{t('email')}</label>
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <div className="w-full">
                <Input
                  placeholder={t('email')}
                  {...field}
                  className={`border ${
                    fieldState.error
                      ? 'border-red-500'
                      : 'border-muted-foreground'
                  }`}
                />
                {fieldState.error && (
                  <p className="text-red-500">
                    {t(fieldState.error.message ?? 'validation.default-error')}
                  </p>
                )}
              </div>
            )}
          />

          <label htmlFor="">{t('password')}</label>
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <div className="w-full">
                <Input
                  {...field}
                  placeholder={t('password-placeholder')}
                  type="password"
                  className={`border ${
                    fieldState.error
                      ? 'border-red-500'
                      : 'border-muted-foreground'
                  }`}
                />
                {fieldState.error && (
                  <p className="text-sm text-red-500">
                    {t(fieldState.error.message ?? 'validation.default-error')}
                  </p>
                )}
              </div>
            )}
          />

          <label htmlFor="">{t('confirm-password')}</label>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field, fieldState }) => (
              <div className="w-full">
                <Input
                  {...field}
                  placeholder={t('confirm-password-placeholder')}
                  type="password"
                  className={`border ${
                    fieldState.error
                      ? 'border-red-500'
                      : 'border-muted-foreground'
                  }`}
                />
                {fieldState.error && (
                  <p className="text-sm text-red-500">
                    {t(fieldState.error.message ?? 'validation.default-error')}
                  </p>
                )}
              </div>
            )}
          />

          <Button
            className="w-full rounded-2xl bg-primary"
            onClick={handleSubmit(onSubmit)}
          >
            {t('sign-up')}
          </Button>
        </div>

        {/* Link to Login */}
        <p className="mt-4 text-center text-sm text-foreground">
          {t('already-have-account')}{' '}
          <a href={`/${lang}/${AUTH_PATHS.LOGIN}`} className="text-logo">
            {t('sign-in')}
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
