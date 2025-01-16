import { MessagesType } from '@/pages/home/components/messages/index.types';
import { getMessages, getProfileInfo } from '@/supabase/profile';
import { useQuery } from '@tanstack/react-query';

export const useGetProfileInfo = (userId: string | number | undefined) => {
  return useQuery({
    queryKey: ['get-profile-info', userId],
    queryFn: () => getProfileInfo(userId || ''),
    enabled: !!userId, // Ensures the query runs only when userId is defined
  });
};
type MessagesData = {
  messages: MessagesType[]; // Array of messages
  totalCount: number; // Total count of messages
};

export const useMessages = (page: number, pageSize: number) => {
  return useQuery<MessagesData>({
    queryKey: ['get-messages', page, pageSize],
    queryFn: () => getMessages(page, pageSize),
    //   keepPreviousData: true, // Keeps the previous page's data while fetching new data
  });
};
