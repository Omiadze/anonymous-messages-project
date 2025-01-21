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
    const loadSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        handleSetUser(session);
        localStorage.setItem('userSession', JSON.stringify(session));
      }
    };

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
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
