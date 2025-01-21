import { Toaster } from '@/components/ui/sonner';
import { PropsWithChildren } from 'react';

const MainSection: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="p-1 sm:p-10 flex items-center justify-center ">
      {children}
      <Toaster />
    </div>
  );
};

export default MainSection;
