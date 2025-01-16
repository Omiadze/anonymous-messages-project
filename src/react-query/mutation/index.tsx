import { deleteMessage, postMessages, updateMessage } from '@/supabase/profile';
import { useMutation } from '@tanstack/react-query';

export const usePostMessages = (onSuccess: () => void, onError: () => void) => {
  return useMutation({
    mutationKey: ['post-message'],
    mutationFn: (payload: {
      from: string;
      to: string;
      message: string;
      avatar: string;
      user_id: string;
    }) =>
      postMessages(
        payload.from,
        payload.to,
        payload.message,
        payload.avatar,
        payload.user_id
      ),
    onSuccess,
    onError,
  });
};

export const useDeleteMessage = (
  onSuccess: () => void,
  onError: () => void
) => {
  return useMutation({
    mutationKey: ['delete-message'],
    mutationFn: (messageId: string | number) => deleteMessage(messageId),
    onSuccess,
    onError,
  });
};

export const useUpdateMessage = (
  onSuccess: () => void,
  onError: () => void
) => {
  return useMutation({
    mutationKey: ['update-message'],
    mutationFn: (payload: {
      messageId: string | number;
      data: Partial<{ from: string; to: string; message: string }>;
    }) => updateMessage(payload.messageId, payload.data),
    onSuccess,
    onError,
  });
};
