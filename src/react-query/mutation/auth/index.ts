import { login, register } from '@/supabase/auth';
import { useMutation } from '@tanstack/react-query';
import { t } from 'i18next';
import { toast } from 'sonner';

export const useLogin = (onSuccessCallback: () => void) => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: login,
    onSuccess: () => {
      onSuccessCallback();
    },
    onError: () => {
      toast(t('invalid-credentials'));
    },
  });
};

export const useRegister = (onSuccessCallback: () => void) => {
  return useMutation({
    mutationKey: ['register'],
    mutationFn: register,
    onSuccess: () => {
      onSuccessCallback();
    },
    onError: (error) => {
      console.error('Error registering user:', error);
    },
  });
};
