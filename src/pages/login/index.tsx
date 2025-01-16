import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LoginDefaultValues } from './default-values';
import { useLogin } from '@/react-query/mutation';

type FormValues = {
  email: string;
  password: string;
};
function Login() {
  const { t } = useTranslation();
  const { lang } = useParams();
  const navigate = useNavigate();

  const { control, handleSubmit, formState } = useForm<FormValues>({
    defaultValues: LoginDefaultValues,
  });

  const { mutate: handleLogin } = useLogin(() => {
    navigate('/');
  });

  const onSubmit = (data: { email: string; password: string }) => {
    const { email, password } = data;

    handleLogin({ email, password });
  };

  return (
    <div className="flex h-screen items-center justify-center ">
      <div className="max-w-md rounded border-2 bg-card p-8 shadow">
        <div className="mb-8 flex flex-col items-center justify-center text-foreground">
          <h1 className="mb-4 text-center text-2xl font-bold">
            {t('sign-in-title')}
          </h1>
          <p>{t('sign-in-subtitle')}</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 text-muted-foreground">
          <label htmlFor="email">{t('email')}</label>
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'validation.email-required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'validation.email-invalid',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <div className="w-full">
                <Input
                  placeholder={t('email')}
                  onChange={onChange}
                  value={value}
                  className="border border-muted-foreground"
                />
                {formState.errors?.email && (
                  <p className="text-red-500">
                    {t(
                      formState.errors?.email?.message ??
                        'validation.default-error'
                    )}
                  </p>
                )}
              </div>
            )}
          />

          <label htmlFor="password">{t('password')}</label>
          <Controller
            name="password"
            control={control}
            rules={{
              required: 'validation.password-required',
              minLength: {
                value: 6,
                message: 'validation.password-min-length',
              },
              maxLength: {
                value: 20,
                message: 'validation.password-max-length',
              },
            }}
            render={({ field, fieldState }) => (
              <div className="w-full">
                <Input
                  {...field}
                  type="password"
                  placeholder={t('password-placeholder')}
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
            {t('sign-in')}
          </Button>
        </div>

        {/* Link to Register */}
        <p className="mt-4 text-center text-sm text-foreground">
          {t('no-account')}{' '}
          <Link to={`/${lang}/register`} className="text-logo">
            {t('sign-up')}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
