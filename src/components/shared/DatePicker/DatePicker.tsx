'use client';

import { addDays, subDays } from 'date-fns';

import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { mapIntervalToWeekDays } from '@/utils/helper';
import { useState } from 'react';

export function DatePicker({
  rangeInDays = 7,
  selectedDay,
  onSelectDay,
}: {
  rangeInDays: number;
  selectedDay: string;
  onSelectDay: (day: string) => void;
}) {
  const selectedDayAsDate: Date = new Date(selectedDay);

  const [windowAnchor, setWindowAnchor] = useState<Date>(
    () => new Date(selectedDay),
  );

  const startInterval = subDays(windowAnchor, rangeInDays);
  const endInterval = addDays(windowAnchor, rangeInDays);

  const mappedWeekDays = mapIntervalToWeekDays(
    startInterval,
    endInterval,
    selectedDayAsDate,
  );

  function onPreviousClick(): void {
    setWindowAnchor((prev) => subDays(prev, rangeInDays));
  }

  function onNextClick(): void {
    setWindowAnchor((prev) => addDays(prev, rangeInDays));
  }

  return (
    <Card className="flex h-40 w-full flex-row items-center px-20">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="h-full items-center">
          {mappedWeekDays.map((day) => (
            <CarouselItem
              key={day.date}
              className="basis-1/2 pl-4 lg:basis-1/7"
            >
              <label
                className={`group flex h-full cursor-pointer flex-col items-center justify-center rounded-lg p-2 transition-colors has-checked:border-transparent has-checked:bg-gray-900 ${day.isToday ? 'border-brand border' : ''}`}
              >
                <input
                  type="radio"
                  name="selected-day"
                  value={day.date}
                  checked={selectedDay === day.date}
                  onChange={() => onSelectDay(day.date)}
                  className="sr-only"
                />
                <span className="text-fg-muted text-sm group-has-checked:text-white">
                  {day.dayName.substring(0, 3)}
                </span>
                <span
                  className={`text-base font-semibold group-has-checked:text-white ${day.isToday ? 'text-brand' : 'text-fg'}`}
                >
                  {day.dayNumber}
                </span>
                {!day.isWeekend && (
                  <span className="bg-brand h-1.5 w-1.5 rounded-full group-has-checked:bg-white"></span>
                )}
              </label>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious onClick={onPreviousClick} disabled={false} />
        <CarouselNext onClick={onNextClick} disabled={false} />
      </Carousel>
    </Card>
  );
}
