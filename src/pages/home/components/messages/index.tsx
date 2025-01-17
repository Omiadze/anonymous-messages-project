import { AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuthContext } from '@/context/hooks/use-auth-context';
import { Avatar } from '@radix-ui/react-avatar';
import { MessagesType } from './index.types';
import { PencilIcon, ShieldQuestion } from 'lucide-react';
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import UpdateMessage from '../update-message';
import DeleteMessage from '../delete-message';
import { setMessageCreationTime } from './message-creation-time';
import { useMessages } from '@/react-query/query';
import { useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';

import { useSearchParams } from 'react-router-dom';
import qs from 'qs';
import debounce from 'lodash.debounce';

type MessagesSearchDefaultValue = {
  searchText: string;
};

const Messages = () => {
  const { user } = useAuthContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const parsedQueryParams = qs.parse(searchParams.toString());

  const searchTextFromParams =
    typeof parsedQueryParams.searchText === 'string'
      ? parsedQueryParams.searchText
      : '';

  const { control, watch } = useForm<MessagesSearchDefaultValue>({
    defaultValues: {
      searchText: searchTextFromParams || '',
    },
  });

  const [page, setPage] = useState(1);
  const pageSize = 5;

  const { data, isLoading, error } = useMessages(
    page,
    pageSize,
    searchTextFromParams
  );

  const messages = data?.messages || [];
  const totalCount = data?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  const updateSearch = debounce((value: string) => {
    setSearchParams(qs.stringify({ searchText: value }, { skipNulls: true }));
  }, 300);

  // Watch for searchText changes but delay updates
  watch((value) => {
    const { searchText } = value;
    if (searchText && searchText !== searchTextFromParams) {
      updateSearch(searchText);
    }
  });

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePreviousPage = () => setPage((prev) => Math.max(prev - 1, 1));
  const handlePageChange = (newPage: number) => setPage(newPage);

  if (error) return <p>Failed to load messages</p>;

  return (
    <div className="flex flex-col gap  ">
      <div className="flex gap-2 mb-2">
        <Controller
          control={control}
          name="searchText"
          render={({ field: { onChange, value } }) => {
            return (
              <>
                <Input
                  className="border-2 "
                  onChange={(e) => {
                    onChange(e); // Update form state
                    updateSearch(e.target.value); // Trigger debounce
                  }}
                  value={value}
                  placeholder="Search..."
                />
              </>
            );
          }}
        />
        {/* <Button onClick={handleSubmit(onSubmit)}>Search</Button> */}
      </div>
      {isLoading ? (
        <p>Loading messages...</p>
      ) : messages.length === 0 ? (
        <p>No Messaes found</p>
      ) : (
        <div>
          {messages?.map((message: MessagesType) => (
            <>
              <Card
                key={message.id}
                className="flex justify-between relative min-w-[350]"
              >
                <div>
                  {message?.user_id == user?.user.id ? (
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
                        <span className="text-primary ">FROM:</span>{' '}
                        {message.from}
                      </p>
                      <p>
                        <span className="text-logo">TO:</span> {message.to}
                      </p>
                    </CardTitle>
                    <CardDescription className="text-start max-w-[270px] h-full break-words ">
                      {message.message}
                    </CardDescription>
                  </CardHeader>
                  <div className="flex justify-between p-1">
                    <p className="text-xs text-start text-muted-foreground  pt-5">
                      <span className="font-bold">Created at:</span>{' '}
                      {setMessageCreationTime(message.created_at || '')}
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
          {/* <Button onClick={handlePreviousPage} disabled={page === 1}>
        prev
      </Button>
      <Button
        onClick={handleNextPage}
        disabled={messages ? messages?.length < pageSize : false}
      >
        next
      </Button> */}
          <Pagination>
            <PaginationContent className="  h-20 flex justify-center w-full">
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
              <div className="overflow-x-scroll pb-2 mt-3  flex   justify-center align-middle ">
                {[...Array(totalPages)].map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(index + 1);
                      }}
                      className={page === index + 1 ? 'font-bold' : ''}
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
                    page === totalPages
                      ? 'cursor-not-allowed opacity-50 p-0'
                      : ''
                  } `}
                  aria-disabled={page === totalPages}
                >
                  "Next"
                </PaginationNext>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default Messages;
