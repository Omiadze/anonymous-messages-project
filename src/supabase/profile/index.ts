import { MessagesType } from '@/pages/home/components/messages/index.types';
import { supabase } from '..';
import { FillProfileInfoPayload } from './index.types';
import dayjs from 'dayjs';
import { ProfileInfo } from '@/react-query/query';

export const fillProfileInfo = async (payload: FillProfileInfoPayload) => {
  const { error } = await supabase.from('profiles').upsert(payload);
  if (error) throw error;
  return { success: true };
};

export const getProfileInfo = async (
  id: string | number
): Promise<ProfileInfo | undefined> => {
  const { data } = await supabase.from('profiles').select('*').eq('id', id);
  const profile = data?.[0];

  if (profile) {
    return profile;
  }

  return undefined;
};

export const postMessages = async (
  from: string,
  to: string,
  message: string,
  avatar: string,
  user_id: string
) => {
  return supabase.from('messages').insert({
    from,
    to,
    message,
    avatar,
    user_id,
  });
};

export const getMessages = async (
  page: number,
  pageSize: number,
  searchText: string,
  date: string
): Promise<{ messages: MessagesType[]; totalCount: number }> => {
  const offset = (page - 1) * pageSize;
  const filters = `message.ilike.%${searchText}%,from.ilike.%${searchText}%,to.ilike.%${searchText}%`;

  // Initialize the query
  let query = supabase
    .from('messages')
    .select('*', { count: 'exact' })
    .or(filters)
    .range(offset, offset + pageSize - 1)
    .order('created_at', { ascending: false });

  // Add date filters if a date is provided
  if (date) {
    const todayStart = dayjs().startOf('day').toISOString();
    const todayEnd = dayjs().endOf('day').toISOString();
    query = query.gte('created_at', todayStart).lt('created_at', todayEnd);
  }

  // Execute the query
  const { data, error, count } = await query;

  if (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }

  console.log('Fetched messages:', data);

  return {
    messages: data,
    totalCount: count || 0,
  };
};

export const deleteMessage = async (messageId: string | number) => {
  await supabase.from('messages').delete().eq('id', messageId).throwOnError();
  return { success: true };
};

export const updateMessage = async (
  messageId: string | number,
  payload: Partial<{
    from: string;
    to: string;
    message: string;
    likes: number;
  }>
) => {
  await supabase
    .from('messages')
    .update(payload)
    .eq('id', messageId)
    .throwOnError();
  return { success: true };
};

// Mutation to handle liking a message
