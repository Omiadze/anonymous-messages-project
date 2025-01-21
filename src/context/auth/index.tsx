import { createContext, PropsWithChildren, useState } from 'react';

import { Session } from '@supabase/supabase-js';

type AuthContextType = {
  user: Session | null;
  handleSetUser: (user: Session | null) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<Session | null>(null);

  const handleSetUser = (user: Session | null) => {
    setUser(user);
  };

  return (
    <AuthContext.Provider value={{ user, handleSetUser }}>
      {children}
    </AuthContext.Provider>
  );
};
