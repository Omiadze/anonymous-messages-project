import { MessagesType } from '@/pages/home/components/messages/index.types';
import {
  getMessages,
  getPersonalMessages,
  getProfileInfo,
} from '@/supabase/profile';
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';

export type MessagesData = {
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

export const useGetPersonalMessages = (
  userId: string | undefined,
  queryOptions?: Omit<
    UseQueryOptions<MessagesType[] | undefined, unknown, MessagesType[]>,
    'queryKey'
  >
): UseQueryResult<MessagesType[] | undefined, unknown> => {
  return useQuery<MessagesType[] | undefined, unknown>({
    queryKey: ['get-personal-messages', userId],
    queryFn: () => getPersonalMessages(userId || ''),
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
