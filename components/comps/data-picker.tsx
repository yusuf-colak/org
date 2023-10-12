'use client';

import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';

import { cn } from 'lib/utils';
import { Button } from 'components/ui/button';
import { Calendar } from 'components/ui/calendar';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover';

export function DatePickerForm({ form, name, formLabel }) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="m-2 md:w-1/4 w-full min-w-[300px]">
          <FormLabel>{formLabel}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-full pl-3 text-left font-normal',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  {field.value ? (
                    (console.log(field),
                    //format(field.value, 'PPP', { locale: tr })),
                    format(new Date(field.value), 'PPP', { locale: tr }))
                  ) : (
                    <span>Tarih Seçiniz</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                locale={tr}
                mode="single"
                selected={new Date(field.value)}
                onSelect={field.onChange}
                disabled={(date) =>
                  (name == 'kalibrasyonTarihi' && date > new Date()) ||
                  date < new Date('2000-01-01') ||
                  (name == 'sonrakiKalibrasyonTarihi' && date < new Date())
                }
                initialFocus
              />
            </PopoverContent>
            <FormMessage />
          </Popover>
        </FormItem>
      )}
    />
  );
}
