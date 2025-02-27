import { ModeToggle } from '@/components/mode-toggle';
import LanguageSwitcher from './components/language';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/context/hooks/use-auth-context';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { logout } from '@/supabase/auth';
import Logo from '@/assets/logo.png';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { AUTH_PATHS, MAIN_PATHS } from '@/routes/messages/index.enum';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, MailQuestion, ShieldQuestion } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useGetProfileInfo } from '@/react-query/query';

const Header = () => {
  const { t } = useTranslation();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { lang } = useParams();

  const { mutate: handleLogout } = useMutation({
    mutationKey: ['logout'],
    mutationFn: logout,
    onSuccess: () => {
      navigate(AUTH_PATHS.LOGIN);
    },
  });

  const handleOnClickLogo = () => {
    navigate(`/${lang}/`);
  };

  const navigateToProfile = () => {
    navigate(MAIN_PATHS.PROFILE);
  };

  const { data } = useGetProfileInfo(user?.user.id, {
    enabled: !!user?.user.id,
  });

  return (
    <div className="flex justify-between items-center shadow-lg dark:bg-bg p-3">
      <img
        src={Logo}
        alt="Logo"
        className="w-20 h-20 hover:cursor-pointer"
        onClick={() => {
          handleOnClickLogo();
        }}
      />
      <div className="flex gap-3">
        {user ? (
          <div className="hidden md:block">
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center    justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-neutral-300 border border-neutral-200 bg-white shadow-sm hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800  dark:hover:bg-neutral-800 dark:hover:text-neutral-50 h-9 w-9 hover:scale-105  duration-300 dark:bg-black">
                <Avatar className="h-12 w-12 border-2 border-primary cursor-pointer rounded-full p-2 text-center">
                  {data?.avatar_url ? (
                    <AvatarImage
                      src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${data?.avatar_url || 'ANONYMOUS'}`}
                      alt="Profile Picture"
                    />
                  ) : (
                    <div className="flex justify-center items-center w-full">
                      <ShieldQuestion className="text-center" />
                    </div>
                  )}
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="shadow-md rounded-md p-2 mt-7 bg-white  dark:bg-black">
                <DropdownMenuItem onClick={navigateToProfile}>
                  <Button
                    variant="ghost"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-neutral-300 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 h-9 py-2 w-full px-6"
                  >
                    {t('profile')}
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  <LogOut className="text-primary" />
                  <Button
                    variant="ghost"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-neutral-300 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 h-9 py-2 w-full px-6"
                  >
                    {t('sign-out')}
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <>
            <NavLink className="hidden md:block text-center" to={'login'}>
              <Button className="text-center">{t('sign-in')}</Button>
            </NavLink>
          </>
        )}

        <LanguageSwitcher />
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger className="block md:hidden ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-align-justify"
            >
              <path d="M3 12h18" />
              <path d="M3 18h18" />
              <path d="M3 6h18" />
            </svg>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSeparator />
            {!user ? (
              <NavLink className="flex justify-center" to="login">
                <DropdownMenuItem className="flex justify-center w-full cursor-pointer">
                  {t('sign-in')}
                </DropdownMenuItem>
              </NavLink>
            ) : (
              <>
                <DropdownMenuItem onClick={navigateToProfile}>
                  <Avatar className="h-12 w-12 border-2 border-primary cursor-pointer rounded-full p-2 text-center">
                    {data?.avatar_url ? (
                      <AvatarImage
                        src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${data?.avatar_url || 'ANONYMOUS'}`}
                        alt="Profile Picture"
                      />
                    ) : (
                      <div className="flex justify-center items-center w-full">
                        <MailQuestion className="w-4" />
                      </div>
                    )}
                  </Avatar>
                  <Button
                    variant="ghost"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-neutral-300 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 h-9 py-2 w-full px-6"
                  >
                    {t('profile')}
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  <LogOut className="text-primary" />
                  <Button
                    variant="ghost"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-neutral-300 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 h-9 py-2 w-full px-6"
                  >
                    {t('sign-out')}
                  </Button>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
