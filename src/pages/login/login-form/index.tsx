import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LoginSchema } from './schema';
import { useLogin } from '@/react-query/mutation/auth';
import { LoginFormValues } from './types';
import { AUTH_PATHS, MAIN_PATHS } from '@/routes/messages/index.enum';
import { LoginDefaultValues } from '../default-values';
import Logo from '@/assets/logo.png';

function Login() {
  const { t } = useTranslation();
  const { lang } = useParams();
  const navigate = useNavigate();

  const { control, handleSubmit, formState } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: LoginDefaultValues,
  });

  const { mutate: handleLogin } = useLogin(() => {
    setTimeout(() => {
      navigate(`/${lang}/${MAIN_PATHS.PROFILE}`);
    }, 0);
  });

  const onSubmit = (data: LoginFormValues) => {
    const { email, password } = data;
    handleLogin({ email, password });
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="max-w-md rounded border-2 bg-card p-8 shadow">
        <div className="mb-8 flex flex-col items-center justify-center text-foreground">
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
          <p>{t('sign-in-subtitle')}</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 text-muted-foreground">
          <label htmlFor="email">{t('email')}</label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <div className="w-full">
                <Input
                  {...field}
                  placeholder={t('email')}
                  className={`border ${
                    formState.errors?.email
                      ? 'border-red-500'
                      : 'border-muted-foreground'
                  }`}
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
            render={({ field }) => (
              <div className="w-full">
                <Input
                  {...field}
                  type="password"
                  placeholder={t('password-placeholder')}
                  className={`border ${
                    formState.errors?.password
                      ? 'border-red-500'
                      : 'border-muted-foreground'
                  }`}
                />
                {formState.errors?.password && (
                  <p className="text-sm text-red-500">
                    {t(
                      formState.errors?.password?.message ??
                        'validation.default-error'
                    )}
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
          <Link to={`/${lang}/${AUTH_PATHS.REGISTER}`} className="text-logo">
            {t('sign-up')}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
