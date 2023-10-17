'use client';
import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover';
import { CalendarIcon, Settings } from 'lucide-react';
import { Label } from 'components/ui/label';
import { RadioGroup, RadioGroupItem } from 'components/ui/radio-group';
import { Button } from 'components/ui/button';
import { Calendar } from 'components/ui/calendar';
import { cn } from 'lib/utils';
import { tr } from 'date-fns/locale';
import { format } from 'date-fns';

const CihazFiltreleme = ({ table, columns }) => {
  const [selectedRadio, setSelectedRadio] = useState('cihazAdi');
  const [seciliRadioYazisi, setSeciliRadioYazisi] = useState('Cihaz Adı');
  const [date, setDate] = useState<Date | null>(null);
  const onDeneme = (date) => {
    const calendarDate = new Date(date);
    const year = calendarDate.getUTCFullYear();
    const month = calendarDate.getUTCMonth() + 1;
    const day = calendarDate.getUTCDate();
    const hours = calendarDate.getUTCHours();
    const minutes = calendarDate.getUTCMinutes();
    const seconds = calendarDate.getUTCSeconds();
    const milliseconds = calendarDate.getUTCMilliseconds();

    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day
      .toString()
      .padStart(2, '0')}T${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds
      .toString()
      .padStart(3, '0')}Z`;

    setDate(date);
    console.log('formattedDate', formattedDate);
    if (formattedDate.toString() != 'NaN-NaN-NaNTNaN:NaN:NaN.NaNZ') {
      table.getColumn(selectedRadio)?.setFilterValue(formattedDate);
    }
  };
  return (
    <>
      <div className="flex items-center w-52 h-10 rounded-md border border-input bg-background  ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
        {(selectedRadio == 'cihazAdi' ||
          selectedRadio == 'demirbasNo' ||
          selectedRadio == 'marka' ||
          selectedRadio == 'model' ||
          selectedRadio == 'seriNo' ||
          selectedRadio == 'uretimYili' ||
          selectedRadio == 'mulkiyetDurumu' ||
          selectedRadio == 'kat' ||
          selectedRadio == 'bolum') && (
          <input
            className="flex ml-1 bg-background text-md ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder={`${seciliRadioYazisi} filtrele...`}
            value={
              (table.getColumn(selectedRadio)?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
              table.getColumn(selectedRadio)?.setFilterValue(event.target.value)
            }
          />
        )}
        {(selectedRadio == 'kalibrasyonTarihi' ||
          selectedRadio == 'sonrakiKalibrasyonTarihi') && (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                size={'sm'}
                className={cn(
                  'w-full  text-left font-normal border-0',
                  !false && 'text-muted-foreground'
                )}
              >
                {date
                  ? format(new Date(date), 'PPP', {
                      locale: tr,
                    })
                  : 'Tarih Seçiniz...'}

                <CalendarIcon className="ml-auto h-4 w-7 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                locale={tr}
                selected={new Date(date)}
                onSelect={(date) => onDeneme(date)}
                mode="single"
                initialFocus
              />
            </PopoverContent>
          </Popover>
        )}

        <Popover>
          <PopoverTrigger>
            <Settings />
          </PopoverTrigger>
          <PopoverContent>
            <RadioGroup defaultValue={selectedRadio}>
              {columns.map(
                (column) =>
                  column.accessorKey !== 'pdfURL' &&
                  column.accessorKey !== 'sonGuncellemeTarihi' && (
                    <div key={column.accessorKey}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={column.accessorKey}
                          id={column.accessorKey}
                          onClick={() => {
                            setSelectedRadio(column.accessorKey);
                            setSeciliRadioYazisi(column.yazılısı);
                          }}
                        />
                        <Label htmlFor={column.accessorKey}>
                          {column.yazılısı}
                        </Label>
                      </div>
                    </div>
                  )
              )}
            </RadioGroup>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

export default CihazFiltreleme;
