'use client';
import React from 'react';
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

const bolumler = [
  { label: 'English', value: 'English' },
  { label: 'French', value: 'French' },
  { label: 'German', value: 'German' },
  { label: 'Spanish', value: 'Spanish' },
  { label: 'Portuguese', value: 'Portuguese' },
  { label: 'Russian', value: 'Russian' },
  { label: 'Japanese', value: 'Japanese' },
  { label: 'Korean', value: 'Korean' },
  { label: 'Chinese', value: 'Chinese' },
] as const;

const FormSchema = z.object({
  bolum: z.string({
    required_error: 'Please select a bolum.',
  }),
});

export function ComboboxForm({ form }) {
  const [open, setOpen] = React.useState(false);

  return (
    <FormField
      control={form.control}
      name="bolum"
      render={({ field }) => (
        <FormItem className=" m-2 md:w-1/4 w-full min-w-[300px]">
        <FormLabel>Bölüm Seçiniz</FormLabel>
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
                    ? bolumler.find((bolum) => bolum.value === field.value)
                        ?.label
                    : 'Select bolum'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-72 p-0">
              <Command>
                <CommandInput placeholder="Search bolum..." />
                <CommandEmpty>No bolum found.</CommandEmpty>
                <CommandGroup>
                  {bolumler.map((bolum) => (
                    <CommandItem
                      value={bolum.label}
                      key={bolum.value}
                      onSelect={() => {
                        form.setValue('bolum', bolum.value);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          bolum.value === field.value
                            ? 'opacity-100'
                            : 'opacity-0'
                        )}
                      />
                      {bolum.label}
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
