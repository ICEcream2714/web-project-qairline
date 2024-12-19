import { CalendarIcon, ClockIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { useState } from 'react';

const TimePicker = ({ time, setTime }) => {
  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  return (
    <div className="flex items-center gap-2 p-2">
      <ClockIcon className="h-4 w-4" />
      <select
        value={time}
        onChange={handleTimeChange}
        className="rounded border p-1 text-sm"
      >
        {Array.from({ length: 24 }, (_, hour) =>
          Array.from({ length: 2 }, (_, half) => {
            const minute = half * 30;
            const value = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
            return (
              <option key={value} value={value}>
                {value}
              </option>
            );
          })
        )}
      </select>
    </div>
  );
};

const DateTimePicker = ({
  dateTime,
  setDateTime,
  title = 'Pick a date and time',
}) => {
  const [time, setTime] = useState('00:00');

  const setDate = (selectedDate) => {
    if (selectedDate) {
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      setDateTime(`${year}-${month}-${day}T${time}`);
    } else {
      setDateTime('');
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-left font-normal"
        >
          {dateTime ? format(new Date(dateTime), 'PPP p') : title}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={dateTime ? new Date(dateTime) : undefined}
          onSelect={(selectedDate) => setDate(selectedDate)}
          initialFocus
        />
        <TimePicker
          time={time}
          setTime={(newTime) => {
            setTime(newTime);
            if (dateTime) {
              const selectedDate = new Date(dateTime);
              setDateTime(
                `${selectedDate.toISOString().split('T')[0]}T${newTime}`
              );
            }
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateTimePicker;
