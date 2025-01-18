import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@radix-ui/react-dropdown-menu';
import { Languages } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useLocation, useNavigate } from 'react-router-dom';
import i18n from '@/i18n';

const LanguageSwitcher = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const changeLanguage = (lang: string) => {
    const currentPath = location.pathname.split('/').slice(2).join('/'); // Remove the language code
    const newPath = `/${lang}/${currentPath}`; // Add the new language code
    navigate(newPath, { replace: true }); // Update the URL
    i18n.changeLanguage(lang); // Update i18next language
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex items-center    justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-neutral-300 border border-neutral-200 bg-white shadow-sm hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800  dark:hover:bg-neutral-800 dark:hover:text-neutral-50 h-9 w-9 hover:scale-105  duration-300 dark:bg-black">
        <Languages className="w-5 h-5 text-gray-700 dark:text-white " />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="shadow-md rounded-md p-2 mt-7 bg-white  dark:bg-black">
        <DropdownMenuItem onClick={() => changeLanguage('en')}>
          <Button
            variant="ghost"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-neutral-300 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 h-9 py-2 w-full px-6"
          >
            {t('language.english')}
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('ka')}>
          <Button
            variant="ghost"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-neutral-300 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 h-9 py-2 w-full px-6 "
          >
            {t('language.georgian')}
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
