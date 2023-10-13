'use client';
import React, { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { cn } from 'lib/utils';
import { Button } from 'components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from 'components/ui/command';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover';
import axios from 'axios';
const FormSchema = z.object({
  bolum: z.string({
    required_error: 'Please select a bolum.',
  }),
});

export function ComboboxForm({ form, valueNameId, name }) {
  const [open, setOpen] = React.useState(false);
  const [list, setList] = React.useState([]);
  useEffect(() => {
    axios
      .get(`/api/secenekler/getSecenekler/alfabetik/${valueNameId}`)
      .then((res) => {
        setList(res.data);
      });
  }, []);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className=" m-2 md:w-1/4 w-full min-w-[300px]">
          <FormLabel>{valueNameId} Seçiniz</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className={cn(
                    'w-full justify-between',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  {field.value
                    ? list.find((list) => list.value === field.value)?.value
                    : `${valueNameId} Seçiniz`}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-72 p-0">
              <Command>
                <CommandInput placeholder={`${valueNameId} Arayınız...`} />
                <CommandEmpty>{valueNameId} Bulunamadı.</CommandEmpty>
                <CommandGroup>
                  {list.map((list) => (
                    <CommandItem
                      value={list.value}
                      key={list.value}
                      onSelect={() => {
                        form.setValue(name, list.value);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          list.value === field.value
                            ? 'opacity-100'
                            : 'opacity-0'
                        )}
                      />
                      {list.value}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
