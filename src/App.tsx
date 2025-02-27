import './App.css';
import { ThemeProvider } from './components/theme-provider';
import './index.css';
import AppRoutes from './routes';
import { supabase } from './supabase';
import { useEffect } from 'react';
import { useAuthContext } from './context/hooks/use-auth-context';
import { Toaster } from './components/ui/toaster';
function App() {
  const { handleSetUser } = useAuthContext();
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleSetUser(session);
      localStorage.setItem('userSession', JSON.stringify(session));
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log(session);
      handleSetUser(session);
      if (session) {
        localStorage.setItem('userSession', JSON.stringify(session));
      } else {
        localStorage.removeItem('userSession');
      }
    });

    return () => subscription.unsubscribe();
  }, []);
  return (
    <>
      <ThemeProvider>
        <Toaster />
        <AppRoutes />
      </ThemeProvider>
    </>
  );
}

export default App;
