import { ModeToggle } from '@/components/mode-toggle';
import LanguageSwitcher from './components/language';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/context/hooks/use-auth-context';
import { NavLink, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { logout } from '@/supabase/auth';
import Logo from '@/assets/logo.png';

const Header = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { mutate: handleLogout } = useMutation({
    mutationKey: ['login'],
    mutationFn: logout,
    onSuccess: () => {
      navigate('login');
    },
  });

  const handleOnClickLog = () => {
    navigate('/');
  };

  return (
    <div className="flex justify-between items-center shadow-lg dark:bg-bg p-3">
      <img
        src={Logo}
        alt="Logo"
        className="w-20 h-20 hover:cursor-pointer"
        onClick={() => {
          handleOnClickLog();
        }}
      />
      <div className="flex gap-3">
        {user ? (
          <>
            <Button
              onClick={() => {
                handleLogout();
              }}
            >
              LogOut
            </Button>
          </>
        ) : (
          <>
            <NavLink to={'login'}>
              <Button>Login</Button>
            </NavLink>
          </>
        )}

        <LanguageSwitcher />
        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;
