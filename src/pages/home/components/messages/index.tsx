import { AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuthContext } from '@/context/hooks/use-auth-context';
import { getMessages } from '@/supabase/profile';
import { Avatar } from '@radix-ui/react-avatar';
import { useQuery } from '@tanstack/react-query';
import { MessagesType } from './index.types';
import { PencilIcon, ShieldQuestion } from 'lucide-react';
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import UpdateMessage from '../update-message';

import DeleteMessage from '../delete-message';
import { setMessageCreationTime } from './message-creation-time';

const Messages = () => {
  const { user } = useAuthContext();

  const { data: messages } = useQuery<MessagesType[]>({
    queryKey: ['get-messages'],
    queryFn: getMessages,
  });
  console.log('messages', messages);
  console.log('ids', user?.user.id);

  return (
    <div className="flex flex-col gap ">
      {messages?.map((message: MessagesType) => (
        <>
          <Card key={message.id} className="flex justify-between relative">
            <div>
              {message?.user_id == user?.user.id ? (
                <div className="absolute bottom-1 right-1 flex gap-2">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <PencilIcon className="w-4 cursor-pointer text-logo" />
                    </AlertDialogTrigger>

                    <UpdateMessage message={message} />
                  </AlertDialog>
                  <DeleteMessage messageId={message.id} />
                </div>
              ) : null}
              <CardHeader>
                <CardTitle className="text-start flex flex-col gap-2 mb-2">
                  <p>
                    <span className="text-primary">FROM:</span> {message.from}
                  </p>
                  <p>
                    <span className="text-logo">TO:</span> {message.to}
                  </p>
                </CardTitle>
                <CardDescription className="text-start   ">
                  {message.message}
                </CardDescription>
              </CardHeader>
              <div className="flex justify-between p-1">
                <p className="text-xs text-start text-muted-foreground  pt-5">
                  <span className="font-bold">Created at:</span>{' '}
                  {setMessageCreationTime(message.created_at)}
                </p>
              </div>
            </div>

            <CardFooter className="flex mt-8 flex-col justify-between">
              <Avatar className="h-12 w-12 border-2 border-primary cursor-pointer rounded-full p-2 text-center">
                {message.from === 'Anonymous' ? (
                  <div className="flex justify-center items-center">
                    <ShieldQuestion className="text-center" />
                  </div>
                ) : (
                  <AvatarImage
                    src={
                      message.avatar
                        ? `https://api.dicebear.com/9.x/adventurer/svg?seed=${
                            message.avatar
                          }`
                        : 'anonimous'
                    }
                    alt="avatar"
                  />
                )}

                {/* <AvatarFallback className="text-xs">ANONYMOUS</AvatarFallback> */}
              </Avatar>
            </CardFooter>
          </Card>
          <div className="h-3 w-full bg-primary rounded-b-md mb-6"></div>
        </>
      ))}
    </div>
  );
};

export default Messages;
