import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuthContext } from '@/context/hooks/use-auth-context';
import DeleteMessage from '@/pages/home/components/delete-message';
import { MessagesType } from '@/pages/home/components/messages/index.types';
import { setMessageCreationTime } from '@/pages/home/components/messages/message-creation-time';
import UpdateMessage from '@/pages/home/components/update-message';
import { useGetPersonalMessages } from '@/react-query/query';
import { MailQuestion, PencilIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

const PersonalMessages = () => {
  const { t } = useTranslation();
  const { lang } = useParams();
  const { user } = useAuthContext();
  console.log(user?.user?.id);
  const { data } = useGetPersonalMessages(user?.user?.id);
  console.log(data ? data : 'll');
  return (
    <div className="h-[650px] overflow-auto pb-4">
      {data?.map((message: MessagesType) => (
        <div key={message.id}>
          <Card className="flex justify-between relative min-w-[350]">
            <div>
              {message?.user_id == user?.user?.id ? (
                <div className="absolute bottom-1 right-1 flex gap-2">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <PencilIcon className="w-4 cursor-pointer text-logo" />
                    </AlertDialogTrigger>

                    <UpdateMessage message={message} />
                  </AlertDialog>
                  {message.id != null && (
                    <DeleteMessage messageId={message.id} />
                  )}
                </div>
              ) : null}
              <CardHeader className="max-w-[270px]">
                <CardTitle className="text-start text-xs flex flex-col gap-2 mb-2">
                  <p>
                    <span className="text-primary ">{t('from')}</span>{' '}
                    {message.from}
                  </p>
                  <p>
                    <span className="text-logo">{t('to')}</span> {message.to}
                  </p>
                </CardTitle>
                <CardDescription className="text-start max-w-[270px] h-full break-words ">
                  {message.message}
                </CardDescription>
              </CardHeader>
              <div className="flex justify-between p-1">
                <p className="text-xs text-start text-muted-foreground  pt-5">
                  <span className="font-bold">{t('created-at')}</span>{' '}
                  {setMessageCreationTime(message.created_at || '', lang || '')}
                </p>
              </div>
            </div>

            <CardFooter className="flex mt-8 flex-col justify-between">
              <Avatar className="h-12 w-12 border-2 border-primary cursor-pointer rounded-full p-2 text-center flex justify-center items-center">
                {message.from === 'Anonymous' || message.avatar === 'none' ? (
                  <div className="flex justify-center items-center">
                    <MailQuestion className="w-4" />
                  </div>
                ) : (
                  <AvatarImage
                    src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${message.avatar}`}
                    alt="avatar"
                  />
                )}
              </Avatar>
            </CardFooter>
          </Card>
          <div className="h-3 w-full bg-primary rounded-b-md mb-6"></div>
        </div>
      ))}
      {/* <Button onClick={handlePreviousPage} disabled={page === 1}>
prev
</Button>
<Button
onClick={handleNextPage}
disabled={messages ? messages?.length < pageSize : false}
>
next
</Button> */}
      {/* <Pagination>
        <PaginationContent className="flex justify-between items-center w-full  ">
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={handlePreviousPage}
              className={`${
                page === 1 ? 'cursor-not-allowed opacity-50  ' : ''
              }`}
              aria-disabled={page === 1}
            >
              "Previous"
            </PaginationPrevious>
          </PaginationItem>
          <div className="overflow-x-scroll pb-2 mt-3 flex justify-center items-center ">
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(index + 1);
                  }}
                  className={page === index + 1 ? 'text-primary' : ''}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          </div>
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={handleNextPage}
              className={`${
                page === totalPages ? 'cursor-not-allowed opacity-50 p-0' : ''
              } `}
              aria-disabled={page === totalPages}
            >
              "Next"
            </PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </Pagination> */}
    </div>
  );
};

export default PersonalMessages;
