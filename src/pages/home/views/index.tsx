import CreateMessageBtn from '@/pages/create-message/components/create-message-btn';
import { CalendarComponent } from '../components/calendar';
import Messages from '../components/messages';

const HomeView = () => {
  return (
    <>
      <div className="flex flex-col justify-around w-full md:flex-row  ">
        <div className="flex-col gap-3 flex md:hidden mb-5 mt-3">
          <CreateMessageBtn />
          <CalendarComponent />
        </div>
        <div>
          <Messages />
        </div>
        <div className="hidden flex-col gap-3 sticky top-20 h-screen md:flex">
          <CreateMessageBtn />
          <div className="flex justify-center">
            <CalendarComponent />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeView;
