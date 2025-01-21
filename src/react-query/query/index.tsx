import { MessagesType } from '@/pages/home/components/messages/index.types';
import { getMessages, getProfileInfo } from '@/supabase/profile';
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';

type MessagesData = {
  messages: MessagesType[];
  totalCount: number;
};

export type ProfileInfo = {
  avatar_url: string | null;
  full_name: string | null;
  id: string | null;
  updated_at: string | null;
  username: string | null;
  website: string | null;
};

export const useGetProfileInfo = (
  userId: string | number | undefined,
  queryOptions?: Omit<
    UseQueryOptions<ProfileInfo | undefined, unknown, ProfileInfo>,
    'queryKey'
  >
): UseQueryResult<ProfileInfo | undefined, unknown> => {
  return useQuery<ProfileInfo | undefined, unknown>({
    queryKey: ['get-profile-info', userId],
    queryFn: () => getProfileInfo(userId || ''),
    ...queryOptions,
  });
};

export const useMessages = (
  page: number,
  pageSize: number,
  searchText: string,
  date: string,
  queryOptions?: Omit<
    UseQueryOptions<MessagesData, unknown, MessagesData>,
    'queryKey'
  >
): UseQueryResult<MessagesData, unknown> => {
  return useQuery<MessagesData, unknown>({
    queryKey: ['get-messages', page, pageSize, searchText, date],
    queryFn: () => getMessages(page, pageSize, searchText, date),
    ...queryOptions,
  });
};
