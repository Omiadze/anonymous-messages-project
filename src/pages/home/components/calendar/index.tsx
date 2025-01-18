import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';

export function CalendarComponent() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  console.log();
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border shadow w-full flex justify-center text-logo"
    />
  );
}
