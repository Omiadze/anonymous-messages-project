import { CalendarComponent } from '../components/calendar';
import Messages from '../components/messages';

const HomeView = () => {
  return (
    <>
      <div className="flex justify-around w-full">
        <div className="w-2/4">
          <Messages />
        </div>
        <div className="stiky">
          <CalendarComponent />
        </div>
      </div>
    </>
  );
};

export default HomeView;
