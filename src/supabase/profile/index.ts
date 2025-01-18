import { MessagesType } from '@/pages/home/components/messages/index.types';
import { supabase } from '..';
import { FillProfileInfoPayload } from './index.types';

export const fillProfileInfo = async (payload: FillProfileInfoPayload) => {
  const { error } = await supabase.from('profiles').upsert(payload);
  if (error) throw error;
  return { success: true };
};

export const getProfileInfo = async (id: string | number) => {
  return supabase.from('profiles').select('*').eq('id', id);
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
  searchText: string
): Promise<{ messages: MessagesType[]; totalCount: number }> => {
  const offset = (page - 1) * pageSize;

  const { data, error, count } = await supabase
    .from('messages')
    .select('*', { count: 'exact' })
    .or(
      `message.ilike.%${searchText}%,from.ilike.%${searchText}%,to.ilike.%${searchText}%`
    )
    .range(offset, offset + pageSize - 1)
    .order('created_at', { ascending: false });

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
