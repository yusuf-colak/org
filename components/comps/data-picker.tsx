'use client';

import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';

import { cn } from 'lib/utils';
import { Button } from 'components/ui/button';
import { Calendar } from 'components/ui/calendar';

import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover';
import { FormLabel } from 'components/ui/form';

export function DatePickerForm({
  name,
  kalibrasyonDate,
  setKalibrasyonDate,
  sonrakiKalibrasyonDate,
  setSonrakiKalibrasyonDate,
  formLabel,
}) {
  if (kalibrasyonDate) console.log('kalibrasyonDate', kalibrasyonDate);
  return (
    <div className="m-2 md:w-1/4 w-full min-w-[300px]">
      <FormLabel>{formLabel}</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-full pl-3 text-left font-normal',
              !false && 'text-muted-foreground'
            )}
          >
            {(kalibrasyonDate &&
              name == 'kalibrasyonTarihi' &&
              format(new Date(kalibrasyonDate), 'PPP', { locale: tr })) ||
              (sonrakiKalibrasyonDate &&
                name == 'sonrakiKalibrasyonTarihi' &&
                format(new Date(sonrakiKalibrasyonDate), 'PPP', {
                  locale: tr,
                })) ||
              'Tarih Seçiniz'}

            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            locale={tr}
            mode="single"
            selected={
              (name == 'kalibrasyonTarihi' && new Date(kalibrasyonDate)) ||
              (name == 'sonrakiKalibrasyonTarihi' &&
                new Date(sonrakiKalibrasyonDate))
            }
            onSelect={
              (name == 'kalibrasyonTarihi' && setKalibrasyonDate) ||
              (name == 'sonrakiKalibrasyonTarihi' && setSonrakiKalibrasyonDate)
            }
            disabled={(date) =>
              (name == 'kalibrasyonTarihi' && date > new Date()) ||
              (name == 'sonrakiKalibrasyonTarihi' && date < new Date())
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
